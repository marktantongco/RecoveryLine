'use client';

import React, { useState } from 'react';
import { CURRENCY } from '@/lib/recovery-constants';

interface SettingsProps {
  dailyAvgSpending: number;
  spiritualEnabled: boolean;
  onSetDailySpending: (amount: number) => void;
  onToggleSpiritual: () => void;
  onExport: () => void;
  onReset: () => void;
  onClose: () => void;
}

export default function Settings({
  dailyAvgSpending,
  spiritualEnabled,
  onSetDailySpending,
  onToggleSpiritual,
  onExport,
  onReset,
  onClose,
}: SettingsProps) {
  const [spending, setSpending] = useState(String(dailyAvgSpending));
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [showResetFinal, setShowResetFinal] = useState(false);

  const handleSaveSpending = () => {
    const val = parseInt(spending);
    if (val && val > 0) {
      onSetDailySpending(val);
    }
  };

  const handleReset = () => {
    if (!showResetConfirm) {
      setShowResetConfirm(true);
      return;
    }
    if (!showResetFinal) {
      setShowResetFinal(true);
      return;
    }
    onReset();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-md bg-[#111827] border border-white/10 rounded-t-3xl sm:rounded-3xl p-6 max-h-[85vh] overflow-y-auto custom-scrollbar animate-fadeUp">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-bold text-white">⚙️ Settings</h2>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg hover:bg-white/5 flex items-center justify-center text-slate-400 hover:text-white transition-colors"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        <div className="space-y-5">
          {/* Daily Average Spending */}
          <div>
            <p className="text-xs font-semibold text-slate-400 mb-2">💰 Daily Average Spending</p>
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
                className="px-4 py-2.5 rounded-xl bg-sky-500 text-white text-sm font-medium hover:bg-sky-600 transition-colors"
              >
                Save
              </button>
            </div>
            <p className="text-[10px] text-slate-500 mt-1">Used to auto-calculate savings on sober days</p>
          </div>

          {/* Spiritual Track */}
          <div>
            <p className="text-xs font-semibold text-slate-400 mb-2">🙏 Spiritual Recovery Track</p>
            <div
              onClick={onToggleSpiritual}
              className="flex items-center justify-between p-3 rounded-xl bg-white/5 cursor-pointer hover:bg-white/8 transition-colors"
            >
              <div>
                <p className="text-sm text-white">Show spiritual insights</p>
                <p className="text-xs text-slate-500">Display faith-based recovery messages</p>
              </div>
              <div className={`w-11 h-6 rounded-full transition-all flex items-center ${spiritualEnabled ? 'bg-sky-500' : 'bg-slate-600'}`}>
                <div className={`w-5 h-5 rounded-full bg-white shadow transition-transform ${spiritualEnabled ? 'translate-x-5.5 ml-0.5' : 'translate-x-0.5'}`} />
              </div>
            </div>
          </div>

          {/* Export */}
          <div>
            <p className="text-xs font-semibold text-slate-400 mb-2">📤 Export Data</p>
            <button
              onClick={onExport}
              className="w-full p-3 rounded-xl bg-white/5 text-sm text-slate-300 hover:bg-white/8 transition-colors text-left"
            >
              Download all data as JSON file
            </button>
          </div>

          {/* Reset */}
          <div>
            <p className="text-xs font-semibold text-slate-400 mb-2">🗑️ Reset All Data</p>
            <button
              onClick={handleReset}
              className={`w-full p-3 rounded-xl text-sm font-medium transition-colors text-left ${
                showResetFinal
                  ? 'bg-red-500/20 text-red-400 border border-red-500/30'
                  : showResetConfirm
                  ? 'bg-red-500/10 text-red-400 border border-red-500/20'
                  : 'bg-white/5 text-slate-400 hover:bg-red-500/10 hover:text-red-400'
              }`}
            >
              {!showResetConfirm
                ? 'Reset all data'
                : !showResetFinal
                ? '⚠️ Are you sure? This cannot be undone.'
                : '🔴 FINAL: Tap again to permanently delete all data'}
            </button>
          </div>

          {/* App Info */}
          <div className="pt-2 border-t border-white/5">
            <p className="text-[10px] text-slate-600 text-center">
              RecoveryLine v2.0 · Your data stays on this device only
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
