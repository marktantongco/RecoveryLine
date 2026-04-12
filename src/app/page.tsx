'use client';

import React from 'react';
import { useRecoveryState } from '@/hooks/use-recovery-state';
import Dashboard from '@/components/recovery/Dashboard';
import CheckIn from '@/components/recovery/CheckIn';
import History from '@/components/recovery/History';
import Analytics from '@/components/recovery/Analytics';
import Clipboard from '@/components/recovery/Clipboard';
import SafetyTools from '@/components/recovery/SafetyTools';
import Resources from '@/components/recovery/Resources';
import Settings from '@/components/recovery/Settings';
import Calculator from '@/components/recovery/Calculator';
import BottomNav from '@/components/recovery/BottomNav';
import ActionFab from '@/components/recovery/ActionFab';
import { ToastProvider } from '@/components/recovery/Toast';
import { SectionName, CheckinType, MoodKey } from '@/lib/recovery-types';

function AppContent() {
  const {
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
  } = useRecoveryState();

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-[#0a0f1a] flex items-center justify-center">
        <div className="text-center animate-fadeUp">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-sky-500 to-emerald-500 flex items-center justify-center shadow-2xl shadow-sky-500/20 mx-auto mb-4">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
            </svg>
          </div>
          <p className="text-sm text-slate-400 font-medium">Loading RecoveryLine...</p>
        </div>
      </div>
    );
  }

  // Calculator camouflage mode
  if (state.calcMode) {
    return <Calculator onExit={toggleCalcMode} />;
  }

  const stats = getStats();
  const insights = getInsights();

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
    switch (state.currentSection) {
      case 'home':
        return <Dashboard stats={stats} insights={insights} onNavigate={setSection} />;
      case 'checkin':
        return <CheckIn onSubmit={handleCheckinSubmit} dailyAvgSpending={state.dailyAvgSpending} />;
      case 'history':
        return <History checkins={state.checkins} onDelete={deleteCheckin} onExport={exportData} />;
      case 'stats':
        return <Analytics stats={stats} insights={insights} onNavigate={setSection} />;
      case 'notes':
        return <Clipboard items={state.clipboard} onAdd={addClipboardItem} onDelete={deleteClipboardItem} />;
      case 'safety':
        return (
          <SafetyTools
            selectedMeds={state.selectedMeds}
            selectedSupplements={state.selectedSupplements}
            onToggleMed={toggleMed}
            onToggleSupplement={toggleSupplement}
            onNavigate={setSection}
          />
        );
      case 'resources':
        return <Resources onNavigate={setSection} />;
      default:
        return <Dashboard stats={stats} insights={insights} onNavigate={setSection} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0f1a] pb-safe">
      {/* Header */}
      <header className="sticky top-0 z-20 bg-[#0a0f1a]/90 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-md mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-sky-500 to-emerald-500 flex items-center justify-center shadow-lg shadow-sky-500/15">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
              </svg>
            </div>
            <div>
              <h1 className="text-sm font-bold text-white leading-none">RecoveryLine</h1>
              <p className="text-[10px] text-slate-500 mt-0.5">Biochemical Recovery</p>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setSection('safety')}
              className={`p-2 rounded-lg transition-all active:scale-90 ${
                state.currentSection === 'safety'
                  ? 'text-purple-400 bg-purple-500/10'
                  : 'text-slate-500 hover:text-slate-300 hover:bg-white/5'
              }`}
              title="Safety Tools"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
              </svg>
            </button>
            <button
              onClick={() => setSection('resources')}
              className={`p-2 rounded-lg transition-all active:scale-90 ${
                state.currentSection === 'resources'
                  ? 'text-emerald-400 bg-emerald-500/10'
                  : 'text-slate-500 hover:text-slate-300 hover:bg-white/5'
              }`}
              title="Resources"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-md mx-auto px-4 pt-4">
        {renderSection()}
      </main>

      {/* Bottom Navigation */}
      <BottomNav
        currentSection={state.currentSection as SectionName}
        onNavigate={setSection as (s: SectionName) => void}
        onSettings={toggleSettings}
        showSettings={state.showSettings}
      />

      {/* Action FAB */}
      <ActionFab
        onNavigate={setSection}
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
      <AppContent />
    </ToastProvider>
  );
}
