'use client';

import React, { useState } from 'react';
import { MOODS, CURRENCY } from '@/lib/recovery-constants';
import { Checkin } from '@/lib/recovery-types';

interface HistoryProps {
  checkins: Checkin[];
  onDelete: (id: string) => void;
  onExport: () => void;
}

type FilterType = 'all' | 'sober' | 'use';

export default function History({ checkins, onDelete, onExport }: HistoryProps) {
  const [filter, setFilter] = useState<FilterType>('all');
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);

  const sorted = [...checkins].sort((a, b) => b.timestamp - a.timestamp);
  const filtered = filter === 'all' ? sorted : sorted.filter((c) => c.type === filter);

  // Group by date
  const grouped: Record<string, Checkin[]> = {};
  filtered.forEach((c) => {
    if (!grouped[c.date]) grouped[c.date] = [];
    grouped[c.date].push(c);
  });

  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr + 'T00:00:00');
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (dateStr === today.toISOString().split('T')[0]) return 'Today';
    if (dateStr === yesterday.toISOString().split('T')[0]) return 'Yesterday';

    return d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
  };

  return (
    <div className="space-y-4 pb-4">
      {/* Header with Export */}
      <div className="flex items-center justify-between animate-fadeUp">
        <h2 className="text-lg font-bold text-white">History</h2>
        <button
          onClick={onExport}
          className="px-3 py-1.5 rounded-lg bg-white/5 text-xs text-slate-400 border border-white/8 hover:bg-white/10 transition-colors"
        >
          📤 Export
        </button>
      </div>

      {/* Filter */}
      <div className="glass-card p-1.5 flex animate-fadeUp stagger-1" style={{ opacity: 0 }}>
        {(['all', 'sober', 'use'] as FilterType[]).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`flex-1 py-2 rounded-xl text-xs font-medium transition-all ${
              filter === f
                ? 'bg-sky-500/15 text-sky-400 border border-sky-500/20'
                : 'text-slate-400 hover:text-slate-300'
            }`}
          >
            {f === 'all' ? 'All' : f === 'sober' ? '✨ Sober' : '📋 Use'} ({f === 'all' ? checkins.length : checkins.filter((c) => c.type === f).length})
          </button>
        ))}
      </div>

      {/* Timeline */}
      {Object.keys(grouped).length > 0 ? (
        <div className="space-y-4">
          {Object.entries(grouped).map(([date, items]) => (
            <div key={date} className="animate-fadeUp" style={{ opacity: 0 }}>
              <p className="text-xs font-semibold text-slate-500 mb-2 px-1">{formatDate(date)} · {date}</p>
              <div className="space-y-2">
                {items.map((checkin) => (
                  <div key={checkin.id} className="glass-card p-3.5">
                    <div className="flex items-start gap-3">
                      <div className={`timeline-dot mt-1 ${checkin.type === 'sober' ? 'timeline-dot-sober' : 'timeline-dot-use'}`} />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-lg">{MOODS[checkin.mood]?.emoji}</span>
                          <span className="text-sm font-medium text-white">
                            {checkin.type === 'sober' ? 'Sober Day' : 'Use Log'}
                          </span>
                          <span className="text-xs px-2 py-0.5 rounded-full bg-white/5 text-slate-400">
                            {MOODS[checkin.mood]?.label}
                          </span>
                        </div>
                        <div className="flex items-center gap-3 mt-1.5">
                          {checkin.saved !== undefined && checkin.saved > 0 && (
                            <span className="text-xs text-emerald-400">Saved {CURRENCY}{checkin.saved}</span>
                          )}
                          {checkin.spent !== undefined && checkin.spent > 0 && (
                            <span className="text-xs text-amber-400">Spent {CURRENCY}{checkin.spent}</span>
                          )}
                          {checkin.quantity !== undefined && checkin.quantity > 0 && (
                            <span className="text-xs text-slate-400">Qty: {checkin.quantity}</span>
                          )}
                        </div>
                        {checkin.notes && (
                          <p className="text-xs text-slate-400 mt-2 leading-relaxed">{checkin.notes}</p>
                        )}
                      </div>
                      {confirmDeleteId === checkin.id ? (
                        <div className="flex gap-1">
                          <button
                            onClick={() => { onDelete(checkin.id); setConfirmDeleteId(null); }}
                            className="px-2 py-1 rounded-lg bg-red-500/15 text-red-400 text-xs border border-red-500/20"
                          >
                            Yes
                          </button>
                          <button
                            onClick={() => setConfirmDeleteId(null)}
                            className="px-2 py-1 rounded-lg bg-white/5 text-slate-400 text-xs"
                          >
                            No
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => setConfirmDeleteId(checkin.id)}
                          className="p-1.5 rounded-lg hover:bg-white/5 text-slate-600 hover:text-red-400 transition-colors"
                        >
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M3 6h18" /><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" /><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                          </svg>
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="glass-card p-8 text-center animate-fadeUp">
          <p className="text-3xl mb-2">📭</p>
          <p className="text-sm text-slate-500">No entries yet. Start logging your journey!</p>
        </div>
      )}
    </div>
  );
}
