'use client';

import React, { useCallback, useEffect, useState, lazy, Suspense, useRef } from 'react';
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
function lazyWithLog<T extends React.ComponentType<any>>(factory: () => Promise<{ default: T }>, name: string) {
  return lazy<T>(() =>
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
  const isFirstRender = useRef(true);
  // Track previous section for directional transitions
  const prevSectionRef = useRef(state.currentSection);
  const [slideDirection, setSlideDirection] = useState<'right' | 'left'>('right');

  // Scroll to top + animate on section change (skip animation on first render for instant page load)
  useEffect(() => {
    const mainEl = document.getElementById('app-shell-main');
    if (mainEl) {
      mainEl.scrollTo({ top: 0, behavior: 'smooth' });
    }
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    // Determine slide direction
    const prevIdx = NAV_ORDER.indexOf(prevSectionRef.current);
    const nextIdx = NAV_ORDER.indexOf(state.currentSection);
    setSlideDirection(nextIdx >= prevIdx ? 'right' : 'left');
    prevSectionRef.current = state.currentSection;
    setSectionKey((k) => k + 1);
  }, [state.currentSection]);

  // Cleanup will-change on animated elements after animation ends (prevents mobile scroll blocking)
  useEffect(() => {
    const animClasses = ['animate-fadeUp', 'animate-slideInRight', 'animate-slideInLeft', 'animate-scaleIn'];
    const els = document.querySelectorAll(animClasses.map(c => `.${c}`).join(', '));
    els.forEach((el) => {
      (el as HTMLElement).style.willChange = 'transform, opacity';
      const handler = () => {
        (el as HTMLElement).style.willChange = 'auto';
        el.removeEventListener('animationend', handler);
      };
      el.addEventListener('animationend', handler);
    });
  }, [sectionKey]);

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
    const sectionWrapper = (key: string, sectionName: string, jsx: React.ReactNode) => (
      <ErrorBoundary fallback={
        <div className="flex flex-col items-center justify-center py-16 px-4">
          <div className="w-12 h-12 rounded-xl bg-red-500/10 flex items-center justify-center mb-4">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2"><path d="M12 9v4m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/></svg>
          </div>
          <p className="text-sm font-medium text-slate-300 mb-1">Section unavailable</p>
          <p className="text-xs text-slate-500 mb-4">The <strong>{sectionName}</strong> section encountered an error.</p>
          <button onClick={() => window.location.reload()} className="px-4 py-2 rounded-lg bg-white/5 text-xs text-slate-400 border border-white/10 hover:bg-white/10 active:scale-95 transition-all">Reload</button>
        </div>
      }>
        {jsx}
      </ErrorBoundary>
    );
    switch (state.currentSection) {
      case 'home':
        return sectionWrapper('home', 'Dashboard', <Dashboard stats={stats} insights={insights} onNavigate={handleNavigate} />);
      case 'substances':
        return sectionWrapper('substances', 'Substances', <Substances />);
      case 'biotools':
        return sectionWrapper('biotools', 'Bio Tools', (
          <BioTools
            selectedMeds={state.selectedMeds}
            selectedSupplements={state.selectedSupplements}
            onToggleMed={toggleMed}
            onToggleSupplement={toggleSupplement}
          />
        ));
      case 'recovery':
        return sectionWrapper('recovery', 'Recovery', (
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
        return sectionWrapper('nutrition', 'Nutrition', <NutritionJuices />);
      case 'mindpsych':
        return sectionWrapper('mindpsych', 'Mind & Psych', <MindPsychology />);
      case 'protocol':
        return sectionWrapper('protocol', 'Recovery Protocol', <RecoveryProtocol />);
      case 'phguide':
        return sectionWrapper('phguide', 'PH Guide', <PHGuide />);
      default:
        return sectionWrapper('default', 'Dashboard', <Dashboard stats={stats} insights={insights} onNavigate={handleNavigate} />);
    }
  };

  return (
    <div className="app-shell bg-[#0a0f1a]">
      {/* Header */}
      <header className="sticky top-0 z-20 bg-[#0a0f1a]/92 backdrop-blur-xl border-b border-white/[0.08] flex-shrink-0 pt-[env(safe-area-inset-top,0px)]" role="banner">
        <div className="h-px bg-gradient-to-r from-transparent via-sky-500/20 to-transparent" />
        <div className="max-w-md mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-sky-500 to-emerald-500 flex items-center justify-center shadow-lg shadow-sky-500/15" aria-hidden="true">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
              </svg>
            </div>
            <div>
              <h1 className="text-sm font-bold text-white leading-none tracking-tight text-hero">RecoveryLine</h1>
              <p className="text-[10px] text-slate-400 mt-0.5 text-label">Biochemical Recovery</p>
            </div>
          </div>
          <nav className="flex items-center gap-0.5" aria-label="Quick navigation">
            {/* Top 3 most-used shortcuts */}
            <button
              onClick={() => handleNavigate('substances')}
              className={`p-2.5 rounded-xl transition-all active:scale-90 min-w-[36px] min-h-[36px] flex items-center justify-center ${
                state.currentSection === 'substances'
                  ? 'text-amber-400 bg-amber-500/15 shadow-sm shadow-amber-500/10'
                  : 'text-slate-400 hover:text-slate-300 hover:bg-white/[0.06]'
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
              className={`p-2.5 rounded-xl transition-all active:scale-90 min-w-[36px] min-h-[36px] flex items-center justify-center ${
                state.currentSection === 'biotools'
                  ? 'text-purple-400 bg-purple-500/15 shadow-sm shadow-purple-500/10'
                  : 'text-slate-400 hover:text-slate-300 hover:bg-white/[0.06]'
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
              onClick={() => handleNavigate('recovery')}
              className={`p-2.5 rounded-xl transition-all active:scale-90 min-w-[36px] min-h-[36px] flex items-center justify-center ${
                state.currentSection === 'recovery'
                  ? 'text-rose-400 bg-rose-500/15 shadow-sm shadow-rose-500/10'
                  : 'text-slate-400 hover:text-slate-300 hover:bg-white/[0.06]'
              }`}
              title="Recovery"
              aria-label="Go to Recovery"
              aria-current={state.currentSection === 'recovery' ? 'page' : undefined}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
              </svg>
            </button>
            {/* More dropdown trigger */}
            <button
              onClick={() => handleNavigate('protocol')}
              className={`p-2.5 rounded-xl transition-all active:scale-90 min-w-[36px] min-h-[36px] flex items-center justify-center ${
                ['protocol', 'nutrition', 'mindpsych', 'phguide'].includes(state.currentSection)
                  ? 'text-sky-400 bg-sky-500/15 shadow-sm shadow-sky-500/10'
                  : 'text-slate-400 hover:text-slate-300 hover:bg-white/[0.06]'
              }`}
              title="More sections"
              aria-label="More sections"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="1" /><circle cx="12" cy="5" r="1" /><circle cx="12" cy="19" r="1" />
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
