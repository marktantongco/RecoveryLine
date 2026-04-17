'use client';

import React, { useCallback, useEffect, useState, lazy, Suspense, useMemo, useRef } from 'react';
import { useRecoveryState } from '@/hooks/use-recovery-state';
import BottomNav from '@/components/recovery/BottomNav';
import ActionFab from '@/components/recovery/ActionFab';
import Settings from '@/components/recovery/Settings';
import Calculator from '@/components/recovery/Calculator';
import ErrorBoundary from '@/components/recovery/ErrorBoundary';
import { ToastProvider } from '@/components/recovery/Toast';
import { SectionName, CheckinType, MoodKey } from '@/lib/recovery-types';
import { haptic } from '@/lib/utils';

// Navigation order for directional transitions
const NAV_ORDER: SectionName[] = ['home', 'substances', 'biotools', 'recovery', 'nutrition', 'mindpsych', 'protocol', 'phguide'];

// Dynamic imports for code splitting — only load section when needed
// Error logging wrapper for lazy imports to surface silent failures
function lazyWithLog(factory: () => Promise<{ default: React.ComponentType }>, name: string) {
  return lazy(() =>
    factory().catch((err) => {
      console.error(`[RecoveryLine] Failed to lazy-load "${name}":`, err);
      throw err;
    })
  );
}

const Dashboard = lazyWithLog(() => import('@/components/recovery/Dashboard'), 'Dashboard');
const Substances = lazyWithLog(() => import('@/components/recovery/Substances'), 'Substances');
const BioTools = lazyWithLog(() => import('@/components/recovery/BioTools'), 'BioTools');
const RecoveryHub = lazyWithLog(() => import('@/components/recovery/RecoveryHub'), 'RecoveryHub');
const NutritionJuices = lazyWithLog(() => import('@/components/recovery/NutritionJuices'), 'NutritionJuices');
const MindPsychology = lazyWithLog(() => import('@/components/recovery/MindPsychology'), 'MindPsychology');
const RecoveryProtocol = lazyWithLog(() => import('@/components/recovery/RecoveryProtocol'), 'RecoveryProtocol');
const PHGuide = lazyWithLog(() => import('@/components/recovery/PHGuide'), 'PHGuide');

// Skeleton loader for lazy sections
function SectionSkeleton() {
  return (
    <div className="space-y-4 pb-6" aria-busy="true">
      <div className="glass-card-hero p-5 animate-pulse">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-white/5" />
          <div className="flex-1 space-y-2">
            <div className="h-4 w-32 rounded bg-white/5" />
            <div className="h-3 w-48 rounded bg-white/5" />
            <div className="flex gap-2 mt-2">
              <div className="h-5 w-16 rounded-full bg-white/5" />
              <div className="h-5 w-20 rounded-full bg-white/5" />
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="glass-card p-4 animate-pulse">
            <div className="h-3 w-16 rounded bg-white/5 mb-3" />
            <div className="h-6 w-20 rounded bg-white/5" />
          </div>
        ))}
      </div>
      <div className="glass-card p-4 animate-pulse">
        <div className="h-3 w-24 rounded bg-white/5 mb-3" />
        <div className="space-y-2">
          <div className="h-3 w-full rounded bg-white/5" />
          <div className="h-3 w-3/4 rounded bg-white/5" />
        </div>
      </div>
    </div>
  );
}

function AppContent() {
  const {
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
  } = useRecoveryState();

  // Track section for animation key
  const [sectionKey, setSectionKey] = useState(0);
  // Track previous section for directional transitions
  const prevSectionRef = useRef(state.currentSection);
  const [slideDirection, setSlideDirection] = useState<'right' | 'left'>('right');

  // Loading timeout — if state doesn't load in 4s, force show
  const loadTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [forceLoad, setForceLoad] = useState(false);

  useEffect(() => {
    loadTimeoutRef.current = setTimeout(() => {
      if (!isLoaded) {
        console.warn('[RecoveryLine] State loading timed out, forcing render');
        setForceLoad(true);
      }
    }, 4000);
    return () => {
      if (loadTimeoutRef.current) clearTimeout(loadTimeoutRef.current);
    };
  }, []);

  const shouldShow = isLoaded || forceLoad;

  // Scroll to top + animate on section change
  useEffect(() => {
    const mainEl = document.getElementById('app-shell-main');
    if (mainEl) {
      mainEl.scrollTo({ top: 0, behavior: 'smooth' });
    }
    // Determine slide direction
    const prevIdx = NAV_ORDER.indexOf(prevSectionRef.current);
    const nextIdx = NAV_ORDER.indexOf(state.currentSection);
    setSlideDirection(nextIdx >= prevIdx ? 'right' : 'left');
    prevSectionRef.current = state.currentSection;
    setSectionKey((k) => k + 1);
  }, [state.currentSection]);

  // Standard navigate (no preselect)
  const handleNavigate = useCallback((section: string) => {
    const target = section as SectionName;
    if (target !== state.currentSection) {
      haptic('light');
    }
    setSection(target);
  }, [setSection, state.currentSection]);

  // FAB navigate — with preselect mode for check-in
  const handleFabNavigate = useCallback((section: string, preselect?: string) => {
    navigateWithPreselect(section, preselect);
  }, [navigateWithPreselect]);

  const handlePreselectConsumed = useCallback(() => {
    setPreselect(null);
  }, [setPreselect]);

  if (!shouldShow) {
    return (
      <div className="min-h-screen bg-[#0a0f1a] flex items-center justify-center">
        <div className="text-center animate-fadeUp">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-sky-500 to-emerald-500 flex items-center justify-center shadow-2xl shadow-sky-500/20 mx-auto mb-4 animate-pulse-glow">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
            </svg>
          </div>
          <p className="text-sm text-slate-400 font-medium">Loading RecoveryLine...</p>
          <p className="text-[10px] text-slate-600 mt-1">Preparing your recovery space</p>
          <div className="mt-3 flex items-center justify-center gap-1">
            <div className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-bounce" style={{ animationDelay: '0ms' }} />
            <div className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-bounce" style={{ animationDelay: '150ms' }} />
            <div className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-bounce" style={{ animationDelay: '300ms' }} />
          </div>
        </div>
      </div>
    );
  }

  // Calculator camouflage mode
  if (state.calcMode) {
    return <Calculator onExit={toggleCalcMode} />;
  }

  const handleCheckinSubmit = (data: {
    type: CheckinType;
    mood: MoodKey;
    notes?: string;
    saved?: number;
    spent?: number;
    quantity?: number;
    date: string;
  }) => {
    addCheckin(data);
  };

  const handleFabLongPress = () => {
    enterCalcMode();
  };

  const renderSection = () => {
    const directionClass = slideDirection === 'right' ? 'animate-slideInRight' : 'animate-slideInLeft';
    const sectionWrapper = (key: string, jsx: React.ReactNode) => (
      <ErrorBoundary fallback={
        <div className="text-center py-12">
          <p className="text-sm text-slate-500 mb-3">Section unavailable</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 rounded-lg bg-white/5 text-xs text-slate-400 border border-white/10 hover:bg-white/10 transition-colors"
          >
            Retry
          </button>
        </div>
      }>
        {jsx}
      </ErrorBoundary>
    );
    switch (state.currentSection) {
      case 'home':
        return sectionWrapper('home', <Dashboard stats={stats} insights={insights} onNavigate={handleNavigate} />);
      case 'substances':
        return sectionWrapper('substances', <Substances />);
      case 'biotools':
        return sectionWrapper('biotools', (
          <BioTools
            selectedMeds={state.selectedMeds}
            selectedSupplements={state.selectedSupplements}
            onToggleMed={toggleMed}
            onToggleSupplement={toggleSupplement}
          />
        ));
      case 'recovery':
        return sectionWrapper('recovery', (
          <RecoveryHub
            stats={stats}
            insights={insights}
            onSubmit={handleCheckinSubmit}
            dailyAvgSpending={state.dailyAvgSpending}
            preselect={state.checkinPreselect}
            onPreselectConsumed={handlePreselectConsumed}
            checkins={state.checkins}
            onDelete={deleteCheckin}
            onExport={exportData}
            onNavigate={handleNavigate}
            clipboard={state.clipboard}
            onAddClipboard={addClipboardItem}
            onDeleteClipboard={deleteClipboardItem}
          />
        ));
      case 'nutrition':
        return sectionWrapper('nutrition', <NutritionJuices />);
      case 'mindpsych':
        return sectionWrapper('mindpsych', <MindPsychology />);
      case 'protocol':
        return sectionWrapper('protocol', <RecoveryProtocol />);
      case 'phguide':
        return sectionWrapper('phguide', <PHGuide />);
      default:
        return sectionWrapper('default', <Dashboard stats={stats} insights={insights} onNavigate={handleNavigate} />);
    }
  };

  return (
    <div className="app-shell bg-[#0a0f1a]">
      {/* Header */}
      <header className="sticky top-0 z-20 bg-[#0a0f1a]/90 backdrop-blur-xl border-b border-white/5 flex-shrink-0" role="banner">
        <div className="max-w-md mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-sky-500 to-emerald-500 flex items-center justify-center shadow-lg shadow-sky-500/15" aria-hidden="true">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
              </svg>
            </div>
            <div>
              <h1 className="text-sm font-bold text-white leading-none tracking-tight">RecoveryLine</h1>
              <p className="text-[10px] text-slate-500 mt-0.5">Biochemical Recovery</p>
            </div>
          </div>
          <nav className="flex items-center gap-1" aria-label="Quick navigation">
            <button
              onClick={() => handleNavigate('substances')}
              className={`p-2 rounded-lg transition-all active:scale-90 ${
                state.currentSection === 'substances'
                  ? 'text-amber-400 bg-amber-500/10'
                  : 'text-slate-500 hover:text-slate-300 hover:bg-white/5'
              }`}
              title="Substances"
              aria-label="Go to Substances"
              aria-current={state.currentSection === 'substances' ? 'page' : undefined}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M8 2v4" /><path d="M16 2v4" /><rect x="2" y="6" width="20" height="16" rx="2" /><path d="M2 10h20" /><path d="M12 6v16" />
              </svg>
            </button>
            <button
              onClick={() => handleNavigate('biotools')}
              className={`p-2 rounded-lg transition-all active:scale-90 ${
                state.currentSection === 'biotools'
                  ? 'text-purple-400 bg-purple-500/10'
                  : 'text-slate-500 hover:text-slate-300 hover:bg-white/5'
              }`}
              title="Bio Tools"
              aria-label="Go to Bio Tools"
              aria-current={state.currentSection === 'biotools' ? 'page' : undefined}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
              </svg>
            </button>
            <button
              onClick={() => handleNavigate('nutrition')}
              className={`p-2 rounded-lg transition-all active:scale-90 ${
                state.currentSection === 'nutrition'
                  ? 'text-lime-400 bg-lime-500/10'
                  : 'text-slate-500 hover:text-slate-300 hover:bg-white/5'
              }`}
              title="Nutrition"
              aria-label="Go to Nutrition"
              aria-current={state.currentSection === 'nutrition' ? 'page' : undefined}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 8h1a4 4 0 0 1 0 8h-1" /><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z" /><path d="M2 12h16" /><path d="M6 1v3" /><path d="M18 1v3" /><path d="M10 1v3" /><path d="M14 1v3" />
              </svg>
            </button>
            <button
              onClick={() => handleNavigate('mindpsych')}
              className={`p-2 rounded-lg transition-all active:scale-90 ${
                state.currentSection === 'mindpsych'
                  ? 'text-purple-400 bg-purple-500/10'
                  : 'text-slate-500 hover:text-slate-300 hover:bg-white/5'
              }`}
              title="Mind & Psych"
              aria-label="Go to Mind and Psychology"
              aria-current={state.currentSection === 'mindpsych' ? 'page' : undefined}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" /><path d="m8 14 1.5-4.5L11 14" /><path d="m14 14 1.5 4.5L11 14" /><path d="M9 18h6" /><path d="M9 6h6" />
              </svg>
            </button>
            <button
              onClick={() => handleNavigate('protocol')}
              className={`p-2 rounded-lg transition-all active:scale-90 ${
                state.currentSection === 'protocol'
                  ? 'text-emerald-400 bg-emerald-500/10'
                  : 'text-slate-500 hover:text-slate-300 hover:bg-white/5'
              }`}
              title="Protocol"
              aria-label="Go to Recovery Protocol"
              aria-current={state.currentSection === 'protocol' ? 'page' : undefined}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><path d="m9 11 3 3L22 4" />
              </svg>
            </button>
            <button
              onClick={() => handleNavigate('phguide')}
              className={`p-2 rounded-lg transition-all active:scale-90 ${
                state.currentSection === 'phguide'
                  ? 'text-emerald-400 bg-emerald-500/10'
                  : 'text-slate-500 hover:text-slate-300 hover:bg-white/5'
              }`}
              title="PH Guide"
              aria-label="Go to Philippines Guide"
              aria-current={state.currentSection === 'phguide' ? 'page' : undefined}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" />
              </svg>
            </button>
          </nav>
        </div>
      </header>

      {/* Main Content — scrollable area */}
      <main id="app-shell-main" className="app-shell-main" role="main">
        <div className="max-w-md mx-auto px-4 pt-4">
          <ErrorBoundary>
            <Suspense fallback={<SectionSkeleton />}>
              <div key={sectionKey} className={slideDirection === 'right' ? 'animate-slideInRight' : 'animate-slideInLeft'}>
                {renderSection()}
              </div>
            </Suspense>
          </ErrorBoundary>
        </div>
      </main>

      {/* Bottom Navigation */}
      <BottomNav
        currentSection={state.currentSection as SectionName}
        onNavigate={handleNavigate as (s: SectionName) => void}
        onSettings={toggleSettings}
        showSettings={state.showSettings}
      />

      {/* Action FAB */}
      <ActionFab
        onNavigate={handleFabNavigate}
        onLongPress={handleFabLongPress}
      />

      {/* Settings Modal */}
      {state.showSettings && (
        <Settings
          dailyAvgSpending={state.dailyAvgSpending}
          spiritualEnabled={state.spiritualEnabled}
          onSetDailySpending={setDailySpending}
          onToggleSpiritual={toggleSpiritual}
          onExport={exportData}
          onReset={resetData}
          onClose={toggleSettings}
        />
      )}
    </div>
  );
}

export default function Home() {
  return (
    <ToastProvider>
      <ErrorBoundary>
        <AppContent />
      </ErrorBoundary>
    </ToastProvider>
  );
}
