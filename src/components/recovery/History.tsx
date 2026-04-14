'use client';

import React, { useState } from 'react';
import { MOODS, CURRENCY } from '@/lib/recovery-constants';
import { Checkin } from '@/lib/recovery-types';
import { useToast } from './Toast';

interface HistoryProps {
  checkins: Checkin[];
  onDelete: (id: string) => void;
  onExport: () => void;
}

type FilterType = 'all' | 'sober' | 'use';

export default function History({ checkins, onDelete, onExport }: HistoryProps) {
  const { showToast } = useToast();
  const [filter, setFilter] = useState<FilterType>('all');
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);

  const sorted = [...checkins].sort((a, b) => b.timestamp - a.timestamp);
  const filtered = filter === 'all' ? sorted : sorted.filter((c) => c.type === filter);

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

    const localToday = `${today.getFullYear()}-${String(today.getMonth()+1).padStart(2,'0')}-${String(today.getDate()).padStart(2,'0')}`;
    const localYesterday = `${yesterday.getFullYear()}-${String(yesterday.getMonth()+1).padStart(2,'0')}-${String(yesterday.getDate()).padStart(2,'0')}`;
    if (dateStr === localToday) return 'Today';
    if (dateStr === localYesterday) return 'Yesterday';

    return d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
  };

  const handleDelete = (id: string) => {
    onDelete(id);
    setConfirmDeleteId(null);
    showToast('Entry deleted', 'info');
  };

  const handleExport = () => {
    onExport();
    showToast('Data exported as JSON', 'success');
  };

  return (
    <div className="space-y-4 pb-6">
      {/* Header */}
      <div className="flex items-center justify-between animate-fadeUp">
        <div>
          <h2 className="text-lg font-bold text-white">History</h2>
          <p className="text-xs text-slate-400 mt-0.5">Your complete journey log</p>
        </div>
        {checkins.length > 0 && (
          <button
            onClick={handleExport}
            className="px-3 py-1.5 rounded-lg bg-white/5 text-xs text-slate-400 border border-white/8 hover:bg-white/10 active:scale-95 transition-all flex items-center gap-1.5"
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            Export
          </button>
        )}
      </div>

      {/* Filter */}
      <div className="glass-card p-1.5 flex animate-fadeUp stagger-1" style={{ opacity: 0 }}>
        {(['all', 'sober', 'use'] as FilterType[]).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`flex-1 py-2 rounded-xl text-xs font-medium transition-all ${
              filter === f
                ? f === 'sober'
                  ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/20 shadow-sm'
                  : f === 'use'
                  ? 'bg-amber-500/15 text-amber-400 border border-amber-500/20 shadow-sm'
                  : 'bg-sky-500/15 text-sky-400 border border-sky-500/20 shadow-sm'
                : 'text-slate-400 hover:text-slate-300'
            }`}
          >
            {f === 'all' ? 'All' : f === 'sober' ? '\u2705 Sober' : '\ud83d\udccb Use'} ({f === 'all' ? checkins.length : checkins.filter((c) => c.type === f).length})
          </button>
        ))}
      </div>

      {/* Timeline */}
      {Object.keys(grouped).length > 0 ? (
        <div className="space-y-5">
          {Object.entries(grouped).map(([date, items]) => (
            <div key={date} className="animate-fadeUp" style={{ opacity: 0 }}>
              <p className="text-xs font-semibold text-slate-500 mb-2 px-1">{formatDate(date)} {'\u00b7'} {date}</p>
              <div className="space-y-2">
                {items.map((checkin) => (
                  <div key={checkin.id} className="glass-card p-3.5">
                    <div className="flex items-start gap-3">
                      <div className={`timeline-dot mt-1.5 ${checkin.type === 'sober' ? 'timeline-dot-sober' : 'timeline-dot-use'}`} />
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
                        <div className="flex gap-1 flex-shrink-0">
                          <button
                            onClick={() => handleDelete(checkin.id)}
                            className="px-2 py-1 rounded-lg bg-red-500/15 text-red-400 text-xs border border-red-500/20 active:scale-95 transition-all"
                          >
                            Delete
                          </button>
                          <button
                            onClick={() => setConfirmDeleteId(null)}
                            className="px-2 py-1 rounded-lg bg-white/5 text-slate-400 text-xs active:scale-95 transition-all"
                          >
                            Cancel
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => setConfirmDeleteId(checkin.id)}
                          className="p-1.5 rounded-lg hover:bg-white/5 text-slate-600 hover:text-red-400 transition-colors flex-shrink-0"
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
          <div className="text-4xl mb-3">{'\ud83d\udced'}</div>
          <p className="text-sm text-slate-500 font-medium">No entries yet</p>
          <p className="text-xs text-slate-600 mt-1">Start logging your recovery journey</p>
        </div>
      )}
    </div>
  );
}
