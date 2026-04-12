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
import CrisisFab from '@/components/recovery/CrisisFab';
import { SectionName, CheckinType, MoodKey } from '@/lib/recovery-types';

export default function Home() {
  const {
    state,
    isLoaded,
    setSection,
    toggleSettings,
    toggleCalcMode,
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
        <div className="text-center">
          <div className="w-12 h-12 rounded-full border-2 border-sky-500/30 border-t-sky-500 animate-spin mx-auto mb-3" />
          <p className="text-sm text-slate-400">Loading RecoveryLine...</p>
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

  const renderSection = () => {
    switch (state.currentSection) {
      case 'home':
        return <Dashboard stats={stats} insights={insights} onNavigate={setSection} />;
      case 'checkin':
        return <CheckIn onSubmit={handleCheckinSubmit} dailyAvgSpending={state.dailyAvgSpending} />;
      case 'history':
        return <History checkins={state.checkins} onDelete={deleteCheckin} onExport={exportData} />;
      case 'stats':
        return <Analytics stats={stats} insights={insights} />;
      case 'notes':
        return <Clipboard items={state.clipboard} onAdd={addClipboardItem} onDelete={deleteClipboardItem} />;
      case 'safety':
        return (
          <SafetyTools
            selectedMeds={state.selectedMeds}
            selectedSupplements={state.selectedSupplements}
            onToggleMed={toggleMed}
            onToggleSupplement={toggleSupplement}
          />
        );
      case 'resources':
        return <Resources />;
      default:
        return <Dashboard stats={stats} insights={insights} onNavigate={setSection} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0f1a] pb-safe">
      {/* Header */}
      <header className="sticky top-0 z-20 bg-[#0a0f1a]/90 backdrop-blur-lg border-b border-white/5">
        <div className="max-w-md mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-sky-500 to-emerald-500 flex items-center justify-center">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
              </svg>
            </div>
            <div>
              <h1 className="text-sm font-bold text-white leading-none">RecoveryLine</h1>
              <p className="text-[10px] text-slate-500 mt-0.5">Biochemical Recovery</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {state.currentSection !== 'safety' && state.currentSection !== 'resources' && (
              <button
                onClick={() => setSection('safety')}
                className="px-2.5 py-1.5 rounded-lg hover:bg-white/5 text-slate-400 hover:text-sky-400 transition-colors"
                title="Safety Tools"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
                </svg>
              </button>
            )}
            {state.currentSection !== 'resources' && state.currentSection !== 'safety' && (
              <button
                onClick={() => setSection('resources')}
                className="px-2.5 py-1.5 rounded-lg hover:bg-white/5 text-slate-400 hover:text-sky-400 transition-colors"
                title="Resources"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
                  <path d="M12 17h.01" />
                </svg>
              </button>
            )}
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
      />

      {/* Crisis FAB */}
      <CrisisFab onTripleTap={toggleCalcMode} />

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
