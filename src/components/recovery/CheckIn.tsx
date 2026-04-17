'use client';

import React, { useState, useEffect, useRef, useMemo } from 'react';
import { MOODS, UNIVERSAL_MOODS, CURRENCY } from '@/lib/recovery-constants';
import { MoodKey, CheckinType } from '@/lib/recovery-types';
import { getLocalDateString } from '@/lib/utils';
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
  preselect: 'sober' | 'use' | 'mood' | null;
  onPreselectConsumed: () => void;
}

const MAX_NOTES_LENGTH = 500;

interface ValidationErrors {
  mood?: string;
  spending?: string;
  notes?: string;
}

export default function CheckIn({ onSubmit, dailyAvgSpending, preselect, onPreselectConsumed }: CheckInProps) {
  const { showToast } = useToast();
  const [mode, setMode] = useState<'sober' | 'use'>('sober');
  const [selectedMood, setSelectedMood] = useState<MoodKey | null>(null);
  const [notes, setNotes] = useState('');
  const [money, setMoney] = useState('');
  const [quantity, setQuantity] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const moodRef = useRef<HTMLDivElement>(null);
  const prevPreselectRef = useRef(preselect);

  // ─── Validation Logic ─────────────────────────────────────────────────────────

  const errors = useMemo<ValidationErrors>(() => {
    const e: ValidationErrors = {};

    if (touched.mood && !selectedMood) {
      e.mood = 'Please select how you\'re feeling';
    }

    if (touched.spending && money !== '') {
      const val = parseFloat(money);
      if (isNaN(val) || val < 0) {
        e.spending = 'Amount must be 0 or greater';
      }
    }

    if (touched.notes && notes.length > MAX_NOTES_LENGTH) {
      e.notes = `Notes must be ${MAX_NOTES_LENGTH} characters or fewer`;
    }

    return e;
  }, [selectedMood, money, notes, touched]);

  const isFormValid = useMemo(() => {
    return (
      selectedMood !== null &&
      (money === '' || (parseFloat(money) >= 0 && !isNaN(parseFloat(money)))) &&
      notes.length <= MAX_NOTES_LENGTH
    );
  }, [selectedMood, money, notes]);

  const markTouched = (field: string) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  // ─── Preselect Handling ──────────────────────────────────────────────────────

  useEffect(() => {
    if (!preselect || preselect === prevPreselectRef.current) return;

    prevPreselectRef.current = preselect;

    if (preselect === 'sober') {
      setMode('sober');
      setSelectedMood(null);
      showToast('Sober day check-in ready', 'success');
    } else if (preselect === 'use') {
      setMode('use');
      setSelectedMood(null);
      showToast('Use log check-in ready', 'info');
    } else if (preselect === 'mood') {
      // Stay on current mode but scroll to mood selector
      setSelectedMood(null);
      setTimeout(() => {
        moodRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 200);
    }

    // Tell parent we consumed it
    onPreselectConsumed();
  }, [preselect, onPreselectConsumed]);

  // Sync prevPreselectRef when preselect is externally cleared
  useEffect(() => {
    prevPreselectRef.current = preselect;
  }, [preselect]);

  // Universal moods — same for both sober and use
  const moods = UNIVERSAL_MOODS;

  const handleSubmit = () => {
    // Mark all fields as touched for validation display
    setTouched({ mood: true, spending: true, notes: true });

    if (!selectedMood) {
      showToast('Please select how you\'re feeling first', 'warning');
      return;
    }

    if (money !== '') {
      const val = parseFloat(money);
      if (isNaN(val) || val < 0) {
        showToast('Amount must be 0 or greater', 'warning');
        return;
      }
    }

    if (notes.length > MAX_NOTES_LENGTH) {
      showToast(`Notes must be ${MAX_NOTES_LENGTH} characters or fewer`, 'warning');
      return;
    }

    setIsSubmitting(true);

    const data: Record<string, unknown> = {
      type: mode,
      mood: selectedMood,
      date: getLocalDateString(),
    };

    if (notes.trim()) data.notes = notes.trim();
    if (mode === 'sober' && money) data.saved = parseInt(money) || 0;
    if (mode === 'use') {
      if (money) data.spent = parseInt(money) || 0;
      if (quantity) data.quantity = parseInt(quantity) || 0;
    }

    setShowSuccess(true);
    const message = mode === 'sober'
      ? 'Sober day logged! Stay strong, warrior.'
      : 'Use entry saved safely. No judgment, honesty is strength.';
    showToast(message, mode === 'sober' ? 'success' : 'info');

    setTimeout(() => {
      onSubmit(data as Parameters<typeof onSubmit>[0]);
      setSelectedMood(null);
      setNotes('');
      setMoney('');
      setQuantity('');
      setIsSubmitting(false);
      setShowSuccess(false);
      setTouched({});
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
        <p className="text-xs text-slate-400 mt-0.5">How are you feeling today?</p>
      </div>

      {/* Mode Toggle */}
      <div className="glass-card p-1.5 flex animate-fadeUp stagger-1" style={{ opacity: 0 }}>
        <button
          onClick={() => { setMode('sober'); setSelectedMood(null); setTouched({}); }}
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
          onClick={() => { setMode('use'); setSelectedMood(null); setTouched({}); }}
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

      {/* Mood Selector — UNIVERSAL (same for both modes) */}
      <div ref={moodRef} className="glass-card p-4 animate-fadeUp stagger-2" style={{ opacity: 0 }}>
        <label className="block text-xs font-semibold text-slate-400 mb-3">
          How are you feeling? <span className="text-red-400">*</span>
        </label>
        <div className="grid grid-cols-4 gap-2">
          {moods.map((key) => {
            const mood = MOODS[key];
            if (!mood) return null;
            const isSelected = selectedMood === key;
            return (
              <button
                key={key}
                onClick={() => { setSelectedMood(key); markTouched('mood'); }}
                className={`flex flex-col items-center gap-1 p-2.5 rounded-xl transition-all active:scale-95 ${
                  isSelected
                    ? 'bg-sky-500/15 border-2 border-sky-500/60 mood-btn-selected shadow-lg shadow-sky-500/10'
                    : touched.mood && !selectedMood
                      ? 'border-2 border-red-500/30 hover:bg-white/5'
                      : 'border border-transparent hover:bg-white/5'
                }`}
              >
                <span className="text-2xl transition-transform duration-200" style={{ transform: isSelected ? 'scale(1.15)' : 'scale(1)' }}>{mood.emoji}</span>
                <span className="text-[10px] text-slate-400">{mood.label}</span>
              </button>
            );
          })}
        </div>
        {errors.mood && (
          <p className="text-xs text-red-400 mt-2 flex items-center gap-1">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
            {errors.mood}
          </p>
        )}
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
            min="0"
            value={money}
            onChange={(e) => { setMoney(e.target.value); markTouched('spending'); }}
            onBlur={() => markTouched('spending')}
            placeholder={mode === 'sober' ? 'e.g., 500' : String(dailyAvgSpending)}
            className={`w-full bg-white/5 border rounded-xl px-3 pl-8 py-3 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:ring-1 transition-colors ${
              errors.spending
                ? 'border-red-500/50 focus:border-red-500/50 focus:ring-red-500/25'
                : 'border-white/10 focus:border-sky-500/50 focus:ring-sky-500/25'
            }`}
          />
        </div>
        {errors.spending && (
          <p className="text-xs text-red-400 mt-1.5 flex items-center gap-1">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
            {errors.spending}
          </p>
        )}
        {mode === 'sober' && !money && (
          <p className="text-xs text-slate-500 mt-1.5">Based on your daily average: {CURRENCY}{dailyAvgSpending}</p>
        )}
      </div>

      {/* Quantity (use mode only) */}
      {mode === 'use' && (
        <div className="glass-card p-4 animate-fadeUp stagger-4" style={{ opacity: 0 }}>
          <label className="block text-xs font-semibold text-slate-400 mb-3">Quantity / Details</label>
          <input
            type="number"
            min="0"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            placeholder="e.g., 0.5g, 2 pills, 1 sachet"
            className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-3 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-sky-500/50 focus:ring-1 focus:ring-sky-500/25 transition-colors"
          />
        </div>
      )}

      {/* Notes */}
      <div className="glass-card p-4 animate-fadeUp stagger-5" style={{ opacity: 0 }}>
        <div className="flex items-center justify-between mb-3">
          <label className="block text-xs font-semibold text-slate-400">Notes (optional)</label>
          <span className={`text-[10px] font-medium tabular-nums ${
            notes.length > MAX_NOTES_LENGTH ? 'text-red-400' : notes.length > MAX_NOTES_LENGTH * 0.8 ? 'text-amber-400' : 'text-slate-600'
          }`}>
            {notes.length}/{MAX_NOTES_LENGTH}
          </span>
        </div>
        <textarea
          value={notes}
          onChange={(e) => { setNotes(e.target.value); markTouched('notes'); }}
          onBlur={() => markTouched('notes')}
          placeholder="How's your day going? Any triggers or wins?"
          rows={3}
          maxLength={MAX_NOTES_LENGTH + 50}
          className={`w-full bg-white/5 border rounded-xl px-3 py-3 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:ring-1 transition-colors resize-none ${
            errors.notes
              ? 'border-red-500/50 focus:border-red-500/50 focus:ring-red-500/25'
              : 'border-white/10 focus:border-sky-500/50 focus:ring-sky-500/25'
          }`}
        />
        {errors.notes && (
          <p className="text-xs text-red-400 mt-1.5 flex items-center gap-1">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
            {errors.notes}
          </p>
        )}
      </div>

      {/* Submit */}
      <button
        onClick={handleSubmit}
        disabled={!isFormValid || isSubmitting}
        className={`w-full py-4 rounded-2xl text-sm font-bold transition-all animate-fadeUp stagger-6 ${
          isFormValid && !isSubmitting
            ? mode === 'sober'
              ? 'bg-gradient-to-r from-emerald-500 to-emerald-600 text-white shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/35 active:scale-[0.98]'
              : 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-lg shadow-amber-500/25 hover:shadow-amber-500/35 active:scale-[0.98]'
            : 'bg-white/5 text-slate-600 cursor-not-allowed'
        }`}
        style={{ opacity: isFormValid ? undefined : 0 }}
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
