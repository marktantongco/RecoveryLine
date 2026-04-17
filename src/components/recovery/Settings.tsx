'use client';

import React, { useState, useRef, useCallback } from 'react';
import { CURRENCY } from '@/lib/recovery-constants';
import { useToast } from './Toast';
import ConfirmDialog from './ConfirmDialog';

interface SettingsProps {
  dailyAvgSpending: number;
  spiritualEnabled: boolean;
  onSetDailySpending: (amount: number) => void;
  onToggleSpiritual: () => void;
  onExport: () => void;
  onReset: () => void;
  onClose: () => void;
}

const Settings = React.memo(function Settings({
  dailyAvgSpending,
  spiritualEnabled,
  onSetDailySpending,
  onToggleSpiritual,
  onExport,
  onReset,
  onClose,
}: SettingsProps) {
  const { showToast } = useToast();
  const [spending, setSpending] = useState(String(dailyAvgSpending));
  const [confirmReset, setConfirmReset] = useState(false);
  const resetTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleReset = useCallback(() => {
    setConfirmReset(false);
    onReset();
    onClose();
    showToast('All data has been reset', 'info');
  }, [onReset, onClose, showToast]);

  // Cleanup timer on unmount
  React.useEffect(() => {
    return () => {
      if (resetTimerRef.current) clearTimeout(resetTimerRef.current);
    };
  }, []);

  const handleSaveSpending = () => {
    const val = parseInt(spending);
    if (val && val > 0) {
      onSetDailySpending(val);
      showToast(`Daily average set to ${CURRENCY}${val}`, 'success');
    } else {
      showToast('Please enter a valid amount', 'warning');
    }
  };

  const handleExport = () => {
    onExport();
    showToast('Data exported successfully', 'success');
  };

  const handleSpiritualToggle = () => {
    onToggleSpiritual();
    showToast(spiritualEnabled ? 'Spiritual track disabled' : 'Spiritual track enabled', 'info');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center" role="dialog" aria-modal="true" aria-label="Settings">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-md bg-[#111827] border border-white/10 rounded-t-3xl sm:rounded-3xl p-6 pb-[calc(1.5rem+80px+env(safe-area-inset-bottom,0px))] max-h-[85vh] overflow-y-auto custom-scrollbar animate-fadeUp" style={{ overscrollBehavior: 'contain' }}>
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-bold text-white">Settings</h2>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg hover:bg-white/5 flex items-center justify-center text-slate-400 hover:text-white transition-colors active:scale-90"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        <div className="space-y-5">
          {/* Daily Average Spending */}
          <div>
            <p className="text-xs font-semibold text-slate-400 mb-2">Daily Average Spending</p>
            <div className="flex gap-2">
              <div className="relative flex-1">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">{CURRENCY}</span>
                <input
                  type="number"
                  value={spending}
                  onChange={(e) => setSpending(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-3 pl-8 py-2.5 text-sm text-white focus:outline-none focus:border-sky-500/50 transition-colors"
                />
              </div>
              <button
                onClick={handleSaveSpending}
                className="px-4 py-2.5 rounded-xl bg-sky-500 text-white text-sm font-medium hover:bg-sky-600 active:scale-95 transition-all shadow-lg shadow-sky-500/20"
              >
                Save
              </button>
            </div>
            <p className="text-[10px] text-slate-500 mt-1.5">Used to auto-calculate savings on sober days</p>
          </div>

          {/* Spiritual Track */}
          <div>
            <p className="text-xs font-semibold text-slate-400 mb-2">Spiritual Recovery Track</p>
            <button
              type="button"
              onClick={handleSpiritualToggle}
              className="flex items-center justify-between p-3.5 rounded-xl bg-white/5 hover:bg-white/8 transition-colors w-full active:scale-[0.99]"
            >
              <div className="text-left">
                <p className="text-sm text-white font-medium">Show spiritual insights</p>
                <p className="text-xs text-slate-500">Faith-based recovery messages on dashboard</p>
              </div>
              <div className={`w-11 h-6 rounded-full transition-all flex items-center flex-shrink-0 ml-3 ${spiritualEnabled ? 'bg-sky-500' : 'bg-slate-600'}`}>
                <div className={`w-5 h-5 rounded-full bg-white shadow-md transition-transform ${spiritualEnabled ? 'translate-x-[22px]' : 'translate-x-[2px]'}`} />
              </div>
            </button>
          </div>

          {/* FAB Behavior Info */}
          <div className="glass-card p-4">
            <p className="text-xs font-semibold text-slate-400 mb-2">FAB Button (Bottom Right)</p>
            <div className="space-y-2 text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded bg-sky-500/20 flex items-center justify-center flex-shrink-0">
                  <span className="text-[10px] font-bold text-sky-400">{'\ud83d\udd04'}</span>
                </div>
                <span>Tap once to open quick actions (Sober, Mood, Use)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded bg-red-500/20 flex items-center justify-center flex-shrink-0">
                  <span className="text-[10px] font-bold text-red-400">{'\ud83d\udd12'}</span>
                </div>
                <span>Press 5 times quickly to enter calculator camouflage</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded bg-purple-500/20 flex items-center justify-center flex-shrink-0">
                  <span className="text-[10px] font-bold text-purple-400">{'\ud83d\udd10'}</span>
                </div>
                <span>Type the secret code to exit calculator mode</span>
              </div>
            </div>
          </div>

          {/* Export */}
          <div>
            <p className="text-xs font-semibold text-slate-400 mb-2">Data Management</p>
            <button
              onClick={handleExport}
              className="w-full p-3.5 rounded-xl bg-white/5 text-sm text-slate-300 hover:bg-white/8 active:scale-[0.99] transition-colors text-left flex items-center gap-3"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-slate-400">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              Export all data as JSON file
            </button>
          </div>

          {/* Reset */}
          <div>
            <button
              onClick={() => setConfirmReset(true)}
              className="w-full p-3.5 rounded-xl text-sm font-medium transition-all text-left bg-white/5 text-slate-400 hover:bg-red-500/10 hover:text-red-400 border border-transparent"
            >
              {'\ud83d\uddd1\ufe0f Reset all data'}
            </button>
          </div>

          {/* Confirm Reset Dialog */}
          <ConfirmDialog
            open={confirmReset}
            title="Reset All Data"
            message="This will permanently delete all check-ins, notes, and settings. Export your data first if you want to keep it. This action cannot be undone."
            confirmLabel="Yes, Reset Everything"
            cancelLabel="Cancel"
            variant="danger"
            onConfirm={handleReset}
            onCancel={() => setConfirmReset(false)}
          />

          {/* App Info */}
          <div className="pt-3 border-t border-white/5">
            <p className="text-[10px] text-slate-600 text-center">
              RecoveryLine v3.0 {'\u00b7'} Your data stays on this device only
            </p>
          </div>
        </div>
      </div>
    </div>
  );
});

export default Settings;
