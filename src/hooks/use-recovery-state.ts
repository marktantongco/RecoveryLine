'use client';

import { useState, useEffect, useCallback } from 'react';
import { Checkin, ClipboardItem, RecoveryState, SectionName, MoodKey } from '@/lib/recovery-types';
import { STORAGE_KEY } from '@/lib/recovery-constants';

function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substring(2, 9);
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
    // ignore
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

  useEffect(() => {
    if (isLoaded) {
      saveState(state);
    }
  }, [state, isLoaded]);

  // Update document title for calculator mode
  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.title = state.calcMode ? 'Calculator' : 'RecoveryLine';
    }
  }, [state.calcMode]);

  const setSection = useCallback((section: SectionName) => {
    setState((prev) => ({ ...prev, currentSection: section, showSettings: false }));
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
    const data = {
      exportDate: new Date().toISOString(),
      checkins: state.checkins,
      clipboard: state.clipboard,
      settings: {
        dailyAvgSpending: state.dailyAvgSpending,
        spiritualEnabled: state.spiritualEnabled,
        startDate: state.startDate,
      },
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `recoveryline-export-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }, [state]);

  const resetData = useCallback(() => {
    setState({ ...defaultState });
  }, []);

  // Computed statistics
  const getStats = useCallback(() => {
    const today = new Date();
    const todayStr = today.toISOString().split('T')[0];
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
      while (dateSet.has(checkDate.toISOString().split('T')[0])) {
        streak++;
        checkDate.setDate(checkDate.getDate() - 1);
      }
    } else {
      // Check from yesterday
      checkDate.setDate(checkDate.getDate() - 1);
      if (dateSet.has(checkDate.toISOString().split('T')[0])) {
        streak = 1;
        checkDate.setDate(checkDate.getDate() - 1);
        while (dateSet.has(checkDate.toISOString().split('T')[0])) {
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

  // AI Insights
  const getInsights = useCallback(() => {
    const stats = getStats();
    const insights: string[] = [];

    if (stats.streak >= 7 && stats.streak < 14) {
      insights.push(`🔥 ${stats.streak}-day streak! You're building real momentum. Keep going!`);
    } else if (stats.streak >= 14 && stats.streak < 30) {
      insights.push(`💪 ${stats.streak} days strong! You're over halfway to your 30-day goal.`);
    } else if (stats.streak >= 30) {
      insights.push(`🏆 ${stats.streak} days! You've exceeded your 30-day goal. Incredible!`);
    } else if (stats.streak > 0) {
      insights.push(`🌱 ${stats.streak}-day streak. Every day counts.`);
    }

    if (stats.totalMoneySaved > 0) {
      insights.push(`💰 You've saved ₱${stats.totalMoneySaved.toLocaleString()} so far!`);
    }

    const netBalance = stats.totalMoneySaved - stats.totalMoneySpent;
    if (netBalance > 0) {
      insights.push(`📊 Net financial impact: +₱${netBalance.toLocaleString()} (saved vs spent)`);
    } else if (netBalance < 0) {
      insights.push(`📊 Financial tip: Consider tracking your savings more closely.`);
    }

    // Weekend pattern
    const weekendActivity = (stats.dayPattern['Fri'] || 0) + (stats.dayPattern['Sat'] || 0);
    const weekdayActivity =
      (stats.dayPattern['Mon'] || 0) +
      (stats.dayPattern['Tue'] || 0) +
      (stats.dayPattern['Wed'] || 0) +
      (stats.dayPattern['Thu'] || 0);
    if (weekendActivity > weekdayActivity * 1.5 && stats.totalCheckins > 5) {
      insights.push('📅 Pattern detected: More check-in activity on weekends. Plan ahead for triggers.');
    }

    if (state.spiritualEnabled) {
      if (stats.streak === 1) {
        insights.push('🙏 Day 1 is the most important. You chose recovery today.');
      } else if (stats.streak === 3) {
        insights.push('🙏 Three days in — your brain is already starting to heal.');
      } else if (stats.streak >= 7) {
        insights.push('🙏 A week of growth. Your resilience is building.');
      }
    }

    if (insights.length === 0) {
      insights.push('👋 Welcome to RecoveryLine! Start by logging your first check-in.');
    }

    return insights;
  }, [getStats, state.spiritualEnabled]);

  return {
    state,
    isLoaded,
    setSection,
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
    getStats,
    getInsights,
  };
}
