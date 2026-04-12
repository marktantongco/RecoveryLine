'use client';

import React, { useState } from 'react';
import { MOODS, SOBER_MOODS, USE_MOODS, CURRENCY } from '@/lib/recovery-constants';
import { MoodKey, CheckinType } from '@/lib/recovery-types';

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
  const [mode, setMode] = useState<'sober' | 'use'>('sober');
  const [selectedMood, setSelectedMood] = useState<MoodKey | null>(null);
  const [notes, setNotes] = useState('');
  const [money, setMoney] = useState('');
  const [quantity, setQuantity] = useState('');

  const moods = mode === 'sober' ? SOBER_MOODS : USE_MOODS;

  const handleSubmit = () => {
    if (!selectedMood) return;

    const data: {
      type: CheckinType;
      mood: MoodKey;
      notes?: string;
      saved?: number;
      spent?: number;
      quantity?: number;
      date: string;
    } = {
      type: mode,
      mood: selectedMood,
      date: new Date().toISOString().split('T')[0],
    };

    if (notes.trim()) data.notes = notes.trim();
    if (mode === 'sober' && money) data.saved = parseInt(money) || 0;
    if (mode === 'use') {
      if (money) data.spent = parseInt(money) || 0;
      if (quantity) data.quantity = parseInt(quantity) || 0;
    }

    onSubmit(data);
    // Reset
    setSelectedMood(null);
    setNotes('');
    setMoney('');
    setQuantity('');
  };

  return (
    <div className="space-y-4 pb-4">
      {/* Mode Toggle */}
      <div className="glass-card p-1.5 flex animate-fadeUp">
        <button
          onClick={() => { setMode('sober'); setSelectedMood(null); }}
          className={`flex-1 py-2.5 rounded-xl text-sm font-medium transition-all ${
            mode === 'sober'
              ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/20'
              : 'text-slate-400 hover:text-slate-300'
          }`}
        >
          ✨ Sober Day
        </button>
        <button
          onClick={() => { setMode('use'); setSelectedMood(null); }}
          className={`flex-1 py-2.5 rounded-xl text-sm font-medium transition-all ${
            mode === 'use'
              ? 'bg-amber-500/15 text-amber-400 border border-amber-500/20'
              : 'text-slate-400 hover:text-slate-300'
          }`}
        >
          📋 Use Log
        </button>
      </div>

      {/* Non-judgmental message for use log */}
      {mode === 'use' && (
        <div className="glass-card p-4 border-amber-500/10 animate-fadeUp stagger-1" style={{ opacity: 0 }}>
          <p className="text-sm text-slate-300 leading-relaxed">
            💛 <span className="text-amber-400">This is a safe, judgment-free space.</span> Logging honestly helps you understand your patterns and build awareness. Every check-in is a step forward.
          </p>
        </div>
      )}

      {/* Mood Selector */}
      <div className="glass-card p-4 animate-fadeUp stagger-2" style={{ opacity: 0 }}>
        <p className="text-xs font-semibold text-slate-400 mb-3">How are you feeling?</p>
        <div className="grid grid-cols-4 gap-2">
          {moods.map((key) => {
            const mood = MOODS[key];
            if (!mood) return null;
            const isSelected = selectedMood === key;
            return (
              <button
                key={key}
                onClick={() => setSelectedMood(key)}
                className={`flex flex-col items-center gap-1 p-2.5 rounded-xl transition-all ${
                  isSelected
                    ? 'bg-sky-500/15 border-2 border-sky-500 mood-btn-selected'
                    : 'border border-transparent hover:bg-white/5'
                }`}
              >
                <span className="text-2xl">{mood.emoji}</span>
                <span className="text-[10px] text-slate-400">{mood.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Money */}
      <div className="glass-card p-4 animate-fadeUp stagger-3" style={{ opacity: 0 }}>
        <p className="text-xs font-semibold text-slate-400 mb-3">
          {mode === 'sober' ? '💰 Money Saved Today' : '💸 Money Spent Today'}
        </p>
        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">{CURRENCY}</span>
          <input
            type="number"
            value={money}
            onChange={(e) => setMoney(e.target.value)}
            placeholder={mode === 'sober' ? 'e.g., 500' : String(dailyAvgSpending)}
            className="w-full bg-white/5 border border-white/10 rounded-xl px-3 pl-8 py-3 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-sky-500/50 focus:ring-1 focus:ring-sky-500/25 transition-colors"
          />
        </div>
        {mode === 'sober' && !money && (
          <p className="text-xs text-slate-500 mt-1.5">
            Based on your daily average: {CURRENCY}{dailyAvgSpending}
          </p>
        )}
      </div>

      {/* Quantity (use mode only) */}
      {mode === 'use' && (
        <div className="glass-card p-4 animate-fadeUp stagger-4" style={{ opacity: 0 }}>
          <p className="text-xs font-semibold text-slate-400 mb-3">📊 Quantity / Amount</p>
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            placeholder="e.g., 3"
            className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-3 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-sky-500/50 focus:ring-1 focus:ring-sky-500/25 transition-colors"
          />
        </div>
      )}

      {/* Notes */}
      <div className="glass-card p-4 animate-fadeUp stagger-5" style={{ opacity: 0 }}>
        <p className="text-xs font-semibold text-slate-400 mb-3">📝 Notes (optional)</p>
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
        disabled={!selectedMood}
        className={`w-full py-3.5 rounded-2xl text-sm font-semibold transition-all animate-fadeUp stagger-6 ${
          selectedMood
            ? mode === 'sober'
              ? 'bg-emerald-500 text-white hover:bg-emerald-600 active:scale-[0.98]'
              : 'bg-amber-500 text-white hover:bg-amber-600 active:scale-[0.98]'
            : 'bg-white/5 text-slate-600 cursor-not-allowed'
        }`}
        style={{ opacity: selectedMood ? undefined : 0 }}
      >
        {mode === 'sober' ? '✨ Log Sober Day' : '📋 Log Use Entry'}
      </button>
    </div>
  );
}
