'use client';

import { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { Checkin, ClipboardItem, RecoveryState, SectionName, MoodKey } from '@/lib/recovery-types';
import { STORAGE_KEY } from '@/lib/recovery-constants';

function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substring(2, 9);
}

function getLocalDateString(d: Date = new Date()): string {
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

const defaultState: RecoveryState = {
  checkins: [],
  clipboard: [],
  selectedMeds: [],
  selectedSupplements: [],
  dailyAvgSpending: 500,
  spiritualEnabled: true,
  startDate: null,
  currentSection: 'home',
  showSettings: false,
  calcMode: false,
  checkinPreselect: null,
};

function loadState(): RecoveryState {
  if (typeof window === 'undefined') return defaultState;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      return { ...defaultState, ...parsed };
    }
  } catch {
    // ignore
  }
  return defaultState;
}

function saveState(state: RecoveryState): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // ignore quota errors
  }
}

export function useRecoveryState() {
  const [state, setState] = useState<RecoveryState>(defaultState);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const loaded = loadState();
    setState(loaded);
    setIsLoaded(true);
  }, []);

  // Debounced localStorage save — avoids synchronous writes on every keystroke
  const saveTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (!isLoaded) return;

    // Immediately save critical data (checkins, resets)
    if (state.checkins.length === 0 && !state.startDate) {
      saveState(state);
      return;
    }

    // Debounce other saves by 300ms
    if (saveTimerRef.current) clearTimeout(saveTimerRef.current);
    saveTimerRef.current = setTimeout(() => {
      saveState(state);
    }, 300);

    return () => {
      if (saveTimerRef.current) clearTimeout(saveTimerRef.current);
    };
  }, [state, isLoaded]);

  // Update document title for calculator mode
  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.title = state.calcMode ? 'Calculator' : 'RecoveryLine';
    }
  }, [state.calcMode]);

  const setSection = useCallback((section: SectionName) => {
    setState((prev) => ({ ...prev, currentSection: section, showSettings: false, checkinPreselect: null }));
  }, []);

  const setPreselect = useCallback((preselect: 'sober' | 'use' | 'mood' | null) => {
    setState((prev) => ({ ...prev, checkinPreselect: preselect }));
  }, []);

  const navigateWithPreselect = useCallback((section: string, preselect?: string) => {
    setState((prev) => ({
      ...prev,
      currentSection: section as SectionName,
      showSettings: false,
      checkinPreselect: (preselect as 'sober' | 'use' | 'mood' | null) || null,
    }));
  }, []);

  const toggleSettings = useCallback(() => {
    setState((prev) => ({ ...prev, showSettings: !prev.showSettings }));
  }, []);

  const toggleCalcMode = useCallback(() => {
    setState((prev) => ({ ...prev, calcMode: !prev.calcMode }));
  }, []);

  const enterCalcMode = useCallback(() => {
    setState((prev) => ({ ...prev, calcMode: true }));
  }, []);

  const addCheckin = useCallback(
    (data: Omit<Checkin, 'id' | 'timestamp'>) => {
      const newCheckin: Checkin = {
        ...data,
        id: generateId(),
        timestamp: Date.now(),
      };
      setState((prev) => {
        const newCheckins = [...prev.checkins, newCheckin];
        const newStartDate = prev.startDate || newCheckin.date;
        return {
          ...prev,
          checkins: newCheckins,
          startDate: newStartDate,
          currentSection: 'home',
          showSettings: false,
        };
      });
    },
    []
  );

  const deleteCheckin = useCallback((id: string) => {
    setState((prev) => ({
      ...prev,
      checkins: prev.checkins.filter((c) => c.id !== id),
    }));
  }, []);

  const addClipboardItem = useCallback((text: string) => {
    const item: ClipboardItem = { id: generateId(), text, timestamp: Date.now() };
    setState((prev) => ({
      ...prev,
      clipboard: [item, ...prev.clipboard],
    }));
  }, []);

  const deleteClipboardItem = useCallback((id: string) => {
    setState((prev) => ({
      ...prev,
      clipboard: prev.clipboard.filter((c) => c.id !== id),
    }));
  }, []);

  const toggleMed = useCallback((med: string) => {
    setState((prev) => ({
      ...prev,
      selectedMeds: prev.selectedMeds.includes(med)
        ? prev.selectedMeds.filter((m) => m !== med)
        : [...prev.selectedMeds, med],
    }));
  }, []);

  const toggleSupplement = useCallback((supp: string) => {
    setState((prev) => ({
      ...prev,
      selectedSupplements: prev.selectedSupplements.includes(supp)
        ? prev.selectedSupplements.filter((s) => s !== supp)
        : [...prev.selectedSupplements, supp],
    }));
  }, []);

  const setDailySpending = useCallback((amount: number) => {
    setState((prev) => ({ ...prev, dailyAvgSpending: amount }));
  }, []);

  const toggleSpiritual = useCallback(() => {
    setState((prev) => ({ ...prev, spiritualEnabled: !prev.spiritualEnabled }));
  }, []);

  const exportData = useCallback(() => {
    setState((current) => {
      const data = {
        exportDate: new Date().toISOString(),
        checkins: current.checkins,
        clipboard: current.clipboard,
        settings: {
          dailyAvgSpending: current.dailyAvgSpending,
          spiritualEnabled: current.spiritualEnabled,
          startDate: current.startDate,
        },
      };
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `recoveryline-export-${getLocalDateString()}.json`;
      a.click();
      URL.revokeObjectURL(url);
      return current;
    });
  }, []);

  const resetData = useCallback(() => {
    setState({ ...defaultState });
  }, []);

  // Computed statistics via useMemo
  const stats = useMemo(() => {
    const today = new Date();
    const todayStr = getLocalDateString(today);
    const checkins = state.checkins;

    const soberDays = checkins.filter((c) => c.type === 'sober').length;
    const useDays = checkins.filter((c) => c.type === 'use').length;
    const totalMoneySaved = checkins.reduce((sum, c) => sum + (c.saved || 0), 0);
    const totalMoneySpent = checkins.reduce((sum, c) => sum + (c.spent || 0), 0);
    const totalCheckins = checkins.length;

    // Days since start
    let daysSinceStart = 0;
    if (state.startDate) {
      const start = new Date(state.startDate);
      daysSinceStart = Math.max(0, Math.floor((today.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)));
    }

    // Current streak: consecutive days with checkins ending today or yesterday
    let streak = 0;
    const dateSet = new Set(checkins.map((c) => c.date));
    const checkDate = new Date(today);
    // Start from today, check backwards
    if (dateSet.has(todayStr)) {
      streak = 1;
      checkDate.setDate(checkDate.getDate() - 1);
      while (dateSet.has(getLocalDateString(checkDate))) {
        streak++;
        checkDate.setDate(checkDate.getDate() - 1);
      }
    } else {
      // Check from yesterday
      checkDate.setDate(checkDate.getDate() - 1);
      if (dateSet.has(getLocalDateString(checkDate))) {
        streak = 1;
        checkDate.setDate(checkDate.getDate() - 1);
        while (dateSet.has(getLocalDateString(checkDate))) {
          streak++;
          checkDate.setDate(checkDate.getDate() - 1);
        }
      }
    }

    const sobrietyRate = totalCheckins > 0 ? Math.round((soberDays / totalCheckins) * 100) : 0;

    // Progress towards 30-day goal
    const thirtyDayProgress = Math.min(100, Math.round((streak / 30) * 100));

    // Mood distribution
    const moodDistribution: Record<string, number> = {};
    checkins.forEach((c) => {
      moodDistribution[c.mood] = (moodDistribution[c.mood] || 0) + 1;
    });

    // Day-of-week pattern
    const dayPattern: Record<string, number> = { Sun: 0, Mon: 0, Tue: 0, Wed: 0, Thu: 0, Fri: 0, Sat: 0 };
    checkins.forEach((c) => {
      const day = new Date(c.date + 'T00:00:00').getDay();
      const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
      dayPattern[dayNames[day]]++;
    });

    // Today's checkin
    const todayCheckin = checkins.find((c) => c.date === todayStr);

    // Recent checkins (last 5)
    const recentCheckins = [...checkins].sort((a, b) => b.timestamp - a.timestamp).slice(0, 5);

    return {
      soberDays,
      useDays,
      totalMoneySaved,
      totalMoneySpent,
      totalCheckins,
      daysSinceStart,
      streak,
      sobrietyRate,
      thirtyDayProgress,
      moodDistribution,
      dayPattern,
      todayCheckin,
      recentCheckins,
    };
  }, [state.checkins, state.startDate]);

  // AI Insights via useMemo
  const insights = useMemo(() => {
    const result: string[] = [];

    if (stats.streak >= 7 && stats.streak < 14) {
      result.push(`🔥 ${stats.streak}-day streak! You're building real momentum. Keep going!`);
    } else if (stats.streak >= 14 && stats.streak < 30) {
      result.push(`💪 ${stats.streak} days strong! You're over halfway to your 30-day goal.`);
    } else if (stats.streak >= 30) {
      result.push(`🏆 ${stats.streak} days! You've exceeded your 30-day goal. Incredible!`);
    } else if (stats.streak > 0) {
      result.push(`🌱 ${stats.streak}-day streak. Every day counts.`);
    }

    if (stats.totalMoneySaved > 0) {
      result.push(`💰 You've saved ₱${stats.totalMoneySaved.toLocaleString()} so far!`);
    }

    const netBalance = stats.totalMoneySaved - stats.totalMoneySpent;
    if (netBalance > 0) {
      result.push(`📊 Net financial impact: +₱${netBalance.toLocaleString()} (saved vs spent)`);
    } else if (netBalance < 0) {
      result.push(`📊 Financial tip: Consider tracking your savings more closely.`);
    }

    // Weekend pattern
    const weekendActivity = (stats.dayPattern['Fri'] || 0) + (stats.dayPattern['Sat'] || 0);
    const weekdayActivity =
      (stats.dayPattern['Mon'] || 0) +
      (stats.dayPattern['Tue'] || 0) +
      (stats.dayPattern['Wed'] || 0) +
      (stats.dayPattern['Thu'] || 0);
    if (weekendActivity > weekdayActivity * 1.5 && stats.totalCheckins > 5) {
      result.push('📅 Pattern detected: More check-in activity on weekends. Plan ahead for triggers.');
    }

    if (state.spiritualEnabled) {
      if (stats.streak === 1) {
        result.push('🙏 Day 1 is the most important. You chose recovery today.');
      } else if (stats.streak === 3) {
        result.push('🙏 Three days in — your brain is already starting to heal.');
      } else if (stats.streak >= 7) {
        result.push('🙏 A week of growth. Your resilience is building.');
      }
    }

    if (result.length === 0) {
      result.push('👋 Welcome to RecoveryLine! Start by logging your first check-in.');
    }

    return result;
  }, [stats, state.spiritualEnabled]);

  return {
    state,
    isLoaded,
    setSection,
    navigateWithPreselect,
    setPreselect,
    toggleSettings,
    toggleCalcMode,
    enterCalcMode,
    addCheckin,
    deleteCheckin,
    addClipboardItem,
    deleteClipboardItem,
    toggleMed,
    toggleSupplement,
    setDailySpending,
    toggleSpiritual,
    exportData,
    resetData,
    stats,
    insights,
  };
}
