'use client';

import React, { useState, useEffect } from 'react';
import { MOODS, SOBER_MOODS, USE_MOODS, CURRENCY } from '@/lib/recovery-constants';
import { MoodKey, CheckinType } from '@/lib/recovery-types';
import { useToast } from './Toast';

interface CheckInProps {
  onSubmit: (data: {
    type: CheckinType;
    mood: MoodKey;
    notes?: string;
    saved?: number;
    spent?: number;
    quantity?: number;
    date: string;
  }) => void;
  dailyAvgSpending: number;
}

export default function CheckIn({ onSubmit, dailyAvgSpending }: CheckInProps) {
  const { showToast } = useToast();
  const [mode, setMode] = useState<'sober' | 'use'>('sober');
  const [selectedMood, setSelectedMood] = useState<MoodKey | null>(null);
  const [notes, setNotes] = useState('');
  const [money, setMoney] = useState('');
  const [quantity, setQuantity] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // Support preselect from FAB
  useEffect(() => {
    try {
      const preselect = sessionStorage.getItem('rl_preselect');
      if (preselect) {
        sessionStorage.removeItem('rl_preselect');
        if (preselect === 'sober') {
          setMode('sober');
        } else if (preselect === 'use') {
          setMode('use');
        } else if (preselect === 'mood') {
          // Just focus on mood selection - keep current mode
          // The mood selector will naturally get attention
        }
      }
    } catch {}
  }, []);

  const moods = mode === 'sober' ? SOBER_MOODS : USE_MOODS;

  const handleSubmit = () => {
    if (!selectedMood) {
      showToast('Please select how you\'re feeling first', 'warning');
      return;
    }

    setIsSubmitting(true);

    const data = {
      type: mode as CheckinType,
      mood: selectedMood,
      date: new Date().toISOString().split('T')[0],
    };

    if (notes.trim()) (data as Record<string, unknown>).notes = notes.trim();
    if (mode === 'sober' && money) (data as Record<string, unknown>).saved = parseInt(money) || 0;
    if (mode === 'use') {
      if (money) (data as Record<string, unknown>).spent = parseInt(money) || 0;
      if (quantity) (data as Record<string, unknown>).quantity = parseInt(quantity) || 0;
    }

    setShowSuccess(true);
    const message = mode === 'sober'
      ? 'Sober day logged! Stay strong, warrior.'
      : 'Use entry saved safely. No judgment, honesty is strength.';
    showToast(message, mode === 'sober' ? 'success' : 'info');

    setTimeout(() => {
      onSubmit(data);
      setSelectedMood(null);
      setNotes('');
      setMoney('');
      setQuantity('');
      setIsSubmitting(false);
      setShowSuccess(false);
    }, 800);
  };

  if (showSuccess) {
    return (
      <div className="flex flex-col items-center justify-center py-20 animate-scaleIn">
        <div className={`w-24 h-24 rounded-full flex items-center justify-center mb-6 ${
          mode === 'sober'
            ? 'bg-emerald-500/20 shadow-xl shadow-emerald-500/20'
            : 'bg-amber-500/20 shadow-xl shadow-amber-500/20'
        }`}>
          <span className="text-5xl">{MOODS[selectedMood!]?.emoji}</span>
        </div>
        <h3 className="text-xl font-bold text-white mb-2">
          {mode === 'sober' ? 'Sober Day Logged!' : 'Entry Saved'}
        </h3>
        <p className="text-sm text-slate-400 mb-4">
          {mode === 'sober' ? 'Your strength inspires others.' : 'Every honest entry builds awareness.'}
        </p>
        <div className="mt-2 w-32 h-1 rounded-full bg-slate-700 overflow-hidden">
          <div className="h-full bg-gradient-to-r from-sky-500 to-emerald-500 rounded-full animate-[shimmer_0.8s_ease-in-out]" style={{ width: '100%' }} />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4 pb-6">
      {/* Header */}
      <div className="animate-fadeUp">
        <h2 className="text-lg font-bold text-white">Daily Check-In</h2>
        <p className="text-xs text-slate-400 mt-0.5">Track your journey honestly</p>
      </div>

      {/* Mode Toggle */}
      <div className="glass-card p-1.5 flex animate-fadeUp stagger-1" style={{ opacity: 0 }}>
        <button
          onClick={() => { setMode('sober'); setSelectedMood(null); }}
          className={`flex-1 py-2.5 rounded-xl text-sm font-medium transition-all flex items-center justify-center gap-2 ${
            mode === 'sober'
              ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/20 shadow-sm shadow-emerald-500/10'
              : 'text-slate-400 hover:text-slate-300'
          }`}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><path d="m9 11 3 3L22 4" />
          </svg>
          Sober Day
        </button>
        <button
          onClick={() => { setMode('use'); setSelectedMood(null); }}
          className={`flex-1 py-2.5 rounded-xl text-sm font-medium transition-all flex items-center justify-center gap-2 ${
            mode === 'use'
              ? 'bg-amber-500/15 text-amber-400 border border-amber-500/20 shadow-sm shadow-amber-500/10'
              : 'text-slate-400 hover:text-slate-300'
          }`}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" /><path d="M12 6v6l4 2" />
          </svg>
          Use Log
        </button>
      </div>

      {/* Non-judgmental message for use log */}
      {mode === 'use' && (
        <div className="glass-card p-4 border-amber-500/10 animate-fadeUp" style={{ opacity: 0 }}>
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-amber-500/15 flex items-center justify-center flex-shrink-0 mt-0.5">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" /><path d="M12 6v6l4 2" />
              </svg>
            </div>
            <p className="text-sm text-slate-300 leading-relaxed">
              <span className="text-amber-400 font-medium">This is a safe, judgment-free space.</span> Logging honestly helps you understand patterns. Every check-in is a step forward.
            </p>
          </div>
        </div>
      )}

      {/* Mood Selector */}
      <div className="glass-card p-4 animate-fadeUp stagger-2" style={{ opacity: 0 }}>
        <label className="block text-xs font-semibold text-slate-400 mb-3">How are you feeling?</label>
        <div className="grid grid-cols-4 gap-2">
          {moods.map((key) => {
            const mood = MOODS[key];
            if (!mood) return null;
            const isSelected = selectedMood === key;
            return (
              <button
                key={key}
                onClick={() => setSelectedMood(key)}
                className={`flex flex-col items-center gap-1 p-2.5 rounded-xl transition-all active:scale-95 ${
                  isSelected
                    ? 'bg-sky-500/15 border-2 border-sky-500/60 mood-btn-selected shadow-lg shadow-sky-500/10'
                    : 'border border-transparent hover:bg-white/5'
                }`}
              >
                <span className="text-2xl transition-transform duration-200" style={{ transform: isSelected ? 'scale(1.15)' : 'scale(1)' }}>{mood.emoji}</span>
                <span className="text-[10px] text-slate-400">{mood.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Money */}
      <div className="glass-card p-4 animate-fadeUp stagger-3" style={{ opacity: 0 }}>
        <label className="block text-xs font-semibold text-slate-400 mb-3">
          {mode === 'sober' ? 'Money Saved Today' : 'Money Spent Today'}
        </label>
        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-medium">{CURRENCY}</span>
          <input
            type="number"
            value={money}
            onChange={(e) => setMoney(e.target.value)}
            placeholder={mode === 'sober' ? 'e.g., 500' : String(dailyAvgSpending)}
            className="w-full bg-white/5 border border-white/10 rounded-xl px-3 pl-8 py-3 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-sky-500/50 focus:ring-1 focus:ring-sky-500/25 transition-colors"
          />
        </div>
        {mode === 'sober' && !money && (
          <p className="text-xs text-slate-500 mt-1.5">Based on your daily average: {CURRENCY}{dailyAvgSpending}</p>
        )}
      </div>

      {/* Quantity (use mode only) */}
      {mode === 'use' && (
        <div className="glass-card p-4 animate-fadeUp stagger-4" style={{ opacity: 0 }}>
          <label className="block text-xs font-semibold text-slate-400 mb-3">Quantity / Details</label>
          <input
            type="text"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            placeholder="e.g., 0.5g, 2 pills, 1 sachet"
            className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-3 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-sky-500/50 focus:ring-1 focus:ring-sky-500/25 transition-colors"
          />
        </div>
      )}

      {/* Notes */}
      <div className="glass-card p-4 animate-fadeUp stagger-5" style={{ opacity: 0 }}>
        <label className="block text-xs font-semibold text-slate-400 mb-3">Notes (optional)</label>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="How's your day going? Any triggers or wins?"
          rows={3}
          className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-3 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-sky-500/50 focus:ring-1 focus:ring-sky-500/25 transition-colors resize-none"
        />
      </div>

      {/* Submit */}
      <button
        onClick={handleSubmit}
        disabled={!selectedMood || isSubmitting}
        className={`w-full py-4 rounded-2xl text-sm font-bold transition-all animate-fadeUp stagger-6 ${
          selectedMood && !isSubmitting
            ? mode === 'sober'
              ? 'bg-gradient-to-r from-emerald-500 to-emerald-600 text-white shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/35 active:scale-[0.98]'
              : 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-lg shadow-amber-500/25 hover:shadow-amber-500/35 active:scale-[0.98]'
            : 'bg-white/5 text-slate-600 cursor-not-allowed'
        }`}
        style={{ opacity: selectedMood ? undefined : 0 }}
      >
        {isSubmitting ? (
          <span className="flex items-center justify-center gap-2">
            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            Saving...
          </span>
        ) : (
          mode === 'sober' ? 'Log Sober Day' : 'Log Use Entry'
        )}
      </button>
    </div>
  );
}
