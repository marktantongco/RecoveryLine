'use client';

import React, { useState, useMemo, useCallback } from 'react';
import { Checkin, CheckinType, MoodKey, ClipboardItem } from '@/lib/recovery-types';
import { MOODS, CURRENCY } from '@/lib/recovery-constants';
import { AFFIRMATIONS, JOURNAL_PROMPTS } from '@/lib/recovery-content';
import { getLocalDateString, copyToClipboard, haptic } from '@/lib/utils';
import CheckIn from './CheckIn';
import Clipboard from './Clipboard';
import { useToast } from './Toast';

type SubTab = 'checkin' | 'history' | 'analytics';
type FilterType = 'all' | 'sober' | 'use';

interface RecoveryHubProps {
  stats: {
    soberDays: number;
    useDays: number;
    totalMoneySaved: number;
    totalMoneySpent: number;
    totalCheckins: number;
    daysSinceStart: number;
    streak: number;
    sobrietyRate: number;
    thirtyDayProgress: number;
    todayCheckin?: Checkin;
    recentCheckins: Checkin[];
    moodDistribution: Record<string, number>;
  };
  insights: string[];
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
  checkins: Checkin[];
  onDelete: (id: string) => void;
  onExport: () => void;
  onNavigate: (section: string) => void;
  clipboard: ClipboardItem[];
  onAddClipboard: (text: string) => void;
  onDeleteClipboard: (id: string) => void;
}

export default function RecoveryHub({
  stats,
  insights,
  onSubmit,
  dailyAvgSpending,
  preselect,
  onPreselectConsumed,
  checkins,
  onDelete,
  onExport,
  onNavigate,
  clipboard,
  onAddClipboard,
  onDeleteClipboard,
}: RecoveryHubProps) {
  const [activeTab, setActiveTab] = useState<SubTab>('checkin');
  const [filter, setFilter] = useState<FilterType>('all');
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);
  const { showToast } = useToast();

  const sorted = useMemo(() => [...checkins].sort((a, b) => b.timestamp - a.timestamp), [checkins]);
  const filtered = useMemo(() => filter === 'all' ? sorted : sorted.filter((c) => c.type === filter), [sorted, filter]);

  const grouped = useMemo(() => {
    const g: Record<string, Checkin[]> = {};
    filtered.forEach((c) => {
      if (!g[c.date]) g[c.date] = [];
      g[c.date].push(c);
    });
    return g;
  }, [filtered]);

  const sortedMoods = useMemo(
    () => Object.entries(stats.moodDistribution).sort((a, b) => b[1] - a[1]).slice(0, 6),
    [stats.moodDistribution],
  );

  const soberCount = useMemo(() => checkins.filter((c) => c.type === 'sober').length, [checkins]);
  const useCount = useMemo(() => checkins.filter((c) => c.type === 'use').length, [checkins]);

  const netBalance = stats.totalMoneySaved - stats.totalMoneySpent;

  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr + 'T00:00:00');
    const todayStr = getLocalDateString();
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = getLocalDateString(yesterday);
    if (dateStr === todayStr) return 'Today';
    if (dateStr === yesterdayStr) return 'Yesterday';
    return d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
  };

  const handleDelete = useCallback((id: string) => {
    haptic('light');
    onDelete(id);
    setConfirmDeleteId(null);
    showToast('Entry deleted', 'info');
  }, [onDelete, showToast]);

  const handleExport = useCallback(() => {
    haptic('medium');
    onExport();
    showToast('Data exported as JSON', 'success');
  }, [onExport, showToast]);

  const tabs: { key: SubTab; label: string; icon: React.ReactNode }[] = [
    {
      key: 'checkin',
      label: 'Check-In',
      icon: (
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 5v14M5 12h14" />
        </svg>
      ),
    },
    {
      key: 'history',
      label: 'History',
      icon: (
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
        </svg>
      ),
    },
    {
      key: 'analytics',
      label: 'Analytics',
      icon: (
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="18" y1="20" x2="18" y2="10" /><line x1="12" y1="20" x2="12" y2="4" /><line x1="6" y1="20" x2="6" y2="14" />
        </svg>
      ),
    },
  ];

  return (
    <div className="space-y-4 pb-6">
      {/* Header */}
      <div className="glass-card-hero p-5 animate-fadeUp relative overflow-hidden">
        <div className="absolute -top-16 -right-16 w-40 h-40 rounded-full bg-emerald-500/5 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-12 -left-12 w-32 h-32 rounded-full bg-sky-500/5 blur-3xl pointer-events-none" />
        <div className="relative">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-sky-500 to-emerald-500 flex items-center justify-center shadow-lg shadow-sky-500/20">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><path d="m9 11 3 3L22 4" />
              </svg>
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">Recovery</h1>
              <p className="text-xs text-slate-400">Track your progress, stay accountable</p>
            </div>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-[11px] px-2.5 py-1 rounded-full bg-amber-500/15 text-amber-400 border border-amber-500/20 font-medium flex items-center gap-1">
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
              </svg>
              {stats.streak} day streak
            </span>
            <span className="text-[11px] px-2.5 py-1 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/20 font-medium">
              {stats.sobrietyRate}% sober
            </span>
            <span className="text-[11px] px-2.5 py-1 rounded-full bg-sky-500/15 text-sky-400 border border-sky-500/20 font-medium">
              {stats.totalCheckins} check-ins
            </span>
          </div>
        </div>
      </div>

      {/* ── Daily Affirmation ─────────────────────────────────── */}
      <DailyAffirmation />

      {/* ── Journal Prompt (copy-ready) ────────────────────────── */}
      <JournalPrompt />

      {/* ── Quick Notes ────────────────────────────────────────── */}
      <div className="animate-fadeUp stagger-2" style={{ opacity: 0 }}>
        <Clipboard
          items={clipboard}
          onAdd={onAddClipboard}
          onDelete={onDeleteClipboard}
        />
      </div>

      {/* Sub-navigation Tabs */}
      <div className="glass-card p-1.5 flex animate-fadeUp stagger-1" style={{ opacity: 0 }}>
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`flex-1 py-2.5 rounded-xl text-xs font-medium transition-all flex items-center justify-center gap-1.5 ${
              activeTab === tab.key
                ? 'bg-sky-500/15 text-sky-400 border border-sky-500/20 shadow-sm shadow-sky-500/10'
                : 'text-slate-400 hover:text-slate-300'
            }`}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </div>

      {/* Check-In Tab */}
      {activeTab === 'checkin' && (
        <div className="animate-fadeUp">
          <CheckIn
            onSubmit={onSubmit}
            dailyAvgSpending={dailyAvgSpending}
            preselect={preselect}
            onPreselectConsumed={onPreselectConsumed}
          />
        </div>
      )}

      {/* History Tab */}
      {activeTab === 'history' && (
        <div className="space-y-4">
          {/* Header with Export */}
          <div className="flex items-center justify-between animate-fadeUp">
            <div>
              <h2 className="text-lg font-bold text-white">Check-In History</h2>
              <p className="text-xs text-slate-400 mt-0.5">{checkins.length} total entries</p>
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

          {/* Filter Chips */}
          <div className="flex gap-2 animate-fadeUp stagger-1" style={{ opacity: 0 }}>
            {(['all', 'sober', 'use'] as FilterType[]).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`toggle-chip ${filter === f ? 'toggle-chip-active' : ''}`}
              >
                {f === 'all' ? `All (${checkins.length})` : f === 'sober' ? `Sober (${soberCount})` : `Use (${useCount})`}
              </button>
            ))}
          </div>

          {/* Timeline */}
          {Object.keys(grouped).length > 0 ? (
            <div className="space-y-5 max-h-[40vh] overflow-y-auto custom-scrollbar pr-1">
              {Object.entries(grouped).map(([date, items]) => (
                <div key={date} className="animate-fadeUp" style={{ opacity: 0 }}>
                  <p className="text-xs font-semibold text-slate-500 mb-2 px-1">{formatDate(date)} &middot; {date}</p>
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
                                <span className="text-xs text-emerald-400 flex items-center gap-1">
                                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" /><polyline points="17 6 23 6 23 12" />
                                  </svg>
                                  Saved {CURRENCY}{checkin.saved}
                                </span>
                              )}
                              {checkin.spent !== undefined && checkin.spent > 0 && (
                                <span className="text-xs text-amber-400 flex items-center gap-1">
                                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                    <line x1="12" y1="1" x2="12" y2="23" /><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                                  </svg>
                                  Spent {CURRENCY}{checkin.spent}
                                </span>
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
              <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-4">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#475569" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /><polyline points="10 9 9 9 8 9" />
                </svg>
              </div>
              <p className="text-sm text-slate-500 font-medium">No entries yet</p>
              <p className="text-xs text-slate-600 mt-1">Start logging your recovery journey</p>
              <button
                onClick={() => setActiveTab('checkin')}
                className="mt-4 px-5 py-2.5 rounded-xl bg-gradient-to-r from-sky-500 to-blue-500 text-white text-xs font-semibold shadow-lg shadow-sky-500/20 active:scale-95 transition-all"
              >
                Log First Check-In
              </button>
            </div>
          )}
        </div>
      )}

      {/* Analytics Tab */}
      {activeTab === 'analytics' && (
        <div className="space-y-4">
          {/* Overview Cards */}
          <div className="grid grid-cols-2 gap-3 animate-fadeUp stagger-1" style={{ opacity: 0 }}>
            <div className="glass-card p-4">
              <p className="text-xs text-slate-400 mb-1">Total Check-ins</p>
              <p className="text-2xl font-bold text-white">{stats.totalCheckins}</p>
              <div className="mt-2 h-1 rounded-full bg-white/5 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-sky-500 to-sky-400 rounded-full"
                  style={{ width: `${Math.min(100, stats.totalCheckins * 2)}%`, transition: 'width 0.7s ease' }}
                />
              </div>
            </div>
            <div className="glass-card p-4">
              <p className="text-xs text-slate-400 mb-1">Days Tracked</p>
              <p className="text-2xl font-bold text-white">{stats.daysSinceStart}</p>
              <div className="mt-2 h-1 rounded-full bg-white/5 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-purple-500 to-purple-400 rounded-full"
                  style={{ width: `${Math.min(100, (stats.daysSinceStart / 30) * 100)}%`, transition: 'width 0.7s ease' }}
                />
              </div>
            </div>
            <div className="glass-card p-4">
              <p className="text-xs text-slate-400 mb-1">Money Saved</p>
              <p className="text-lg font-bold text-emerald-400">{CURRENCY}{stats.totalMoneySaved.toLocaleString()}</p>
              <p className="text-[10px] text-emerald-500/60 mt-1 flex items-center gap-1">
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" /><polyline points="17 6 23 6 23 12" />
                </svg>
                Growing savings
              </p>
            </div>
            <div className="glass-card p-4">
              <p className="text-xs text-slate-400 mb-1">Money Spent</p>
              <p className="text-lg font-bold text-amber-400">{CURRENCY}{stats.totalMoneySpent.toLocaleString()}</p>
              <p className="text-[10px] text-amber-500/60 mt-1">{stats.totalCheckins > 0 ? 'Track progress' : 'No entries yet'}</p>
            </div>
          </div>

          {/* Sobriety Rate */}
          <div className="glass-card p-4 animate-fadeUp stagger-2" style={{ opacity: 0 }}>
            <p className="text-xs font-semibold text-slate-300 mb-3">Sober / Use Ratio</p>
            <div className="flex items-center gap-3">
              <div className="flex-1 h-5 rounded-full bg-white/5 overflow-hidden">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-emerald-600 via-emerald-500 to-emerald-400 transition-all duration-700"
                  style={{ width: `${stats.sobrietyRate}%` }}
                />
              </div>
              <span className="text-sm font-bold text-white w-12 text-right">{stats.sobrietyRate}%</span>
            </div>
            <div className="flex justify-between mt-2 text-xs text-slate-500">
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                {stats.soberDays} sober
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-amber-500" />
                {stats.useDays} use
              </span>
            </div>
          </div>

          {/* Money Saved vs Spent */}
          <div className="glass-card p-4 animate-fadeUp stagger-3" style={{ opacity: 0 }}>
            <p className="text-xs font-semibold text-slate-300 mb-3">Financial Summary</p>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-400 flex items-center gap-2">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" /><polyline points="17 6 23 6 23 12" />
                  </svg>
                  Saved
                </span>
                <span className="text-sm font-bold text-emerald-400">{CURRENCY}{stats.totalMoneySaved.toLocaleString()}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-400 flex items-center gap-2">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="12" y1="1" x2="12" y2="23" /><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                  </svg>
                  Spent
                </span>
                <span className="text-sm font-bold text-amber-400">{CURRENCY}{stats.totalMoneySpent.toLocaleString()}</span>
              </div>
              <div className="pt-2 border-t border-white/5">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-300 font-medium">Net Balance</span>
                  <span className={`text-sm font-bold ${netBalance >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                    {netBalance >= 0 ? '+' : ''}{CURRENCY}{netBalance.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Streak Chart */}
          <div className="glass-card p-4 animate-fadeUp stagger-4" style={{ opacity: 0 }}>
            <p className="text-xs font-semibold text-slate-300 mb-3">Streak Progress</p>
            <div className="flex items-center gap-4">
              <div className="flex-1">
                <div className="flex items-end gap-1 h-20">
                  {[7, 14, 30, 60, 90].map((milestone) => {
                    const pct = Math.min(100, (stats.streak / milestone) * 100);
                    const achieved = stats.streak >= milestone;
                    return (
                      <div key={milestone} className="flex-1 flex flex-col items-center gap-1">
                        <div className="w-full flex-1 flex items-end">
                          <div
                            className={`w-full rounded-t-md transition-all duration-500 ${
                              achieved
                                ? 'bg-gradient-to-t from-amber-500 to-amber-400'
                                : 'bg-gradient-to-t from-white/5 to-white/10'
                            }`}
                            style={{ height: `${Math.max(pct, 5)}%` }}
                          />
                        </div>
                        <span className={`text-[9px] ${achieved ? 'text-amber-400 font-semibold' : 'text-slate-600'}`}>{milestone}d</span>
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="text-center flex-shrink-0">
                <p className="text-3xl font-bold text-amber-400">{stats.streak}</p>
                <p className="text-[10px] text-slate-400 mt-0.5">day streak</p>
                <p className="text-[10px] text-amber-500/60 mt-1">
                  {stats.streak >= 30 ? 'Champion!' : stats.streak >= 14 ? 'Two weeks!' : stats.streak >= 7 ? 'One week!' : 'Keep going!'}
                </p>
              </div>
            </div>
          </div>

          {/* Mood Distribution */}
          <div className="glass-card p-4 animate-fadeUp stagger-5" style={{ opacity: 0 }}>
            <p className="text-xs font-semibold text-slate-300 mb-3">Mood Distribution</p>
            {sortedMoods.length > 0 ? (
              <div className="space-y-2.5 max-h-64 overflow-y-auto custom-scrollbar">
                {sortedMoods.map(([mood, count]) => {
                  const info = MOODS[mood];
                  if (!info) return null;
                  const maxCount = sortedMoods[0][1];
                  const width = maxCount > 0 ? (count / maxCount) * 100 : 0;
                  return (
                    <div key={mood} className="flex items-center gap-2.5">
                      <span className="text-lg w-8 text-center">{info.emoji}</span>
                      <div className="flex-1">
                        <div className="flex justify-between mb-0.5">
                          <span className="text-xs text-slate-300">{info.label}</span>
                          <span className="text-xs text-slate-400">{count}x</span>
                        </div>
                        <div className="h-2 rounded-full bg-white/5 overflow-hidden">
                          <div
                            className="h-full rounded-full transition-all duration-500"
                            style={{ width: `${width}%`, backgroundColor: info.color }}
                          />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <p className="text-sm text-slate-500 text-center py-4">No mood data yet</p>
            )}
          </div>

          {/* Insights */}
          {insights.length > 0 && (
            <div className="glass-card-insight p-4 animate-fadeUp stagger-6" style={{ opacity: 0 }}>
              <div className="flex items-center gap-2.5 mb-3">
                <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-sky-500 to-emerald-500 flex items-center justify-center shadow-lg shadow-sky-500/20">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 2a10 10 0 1 0 10 10H12V2z" /><path d="M20 12a8 8 0 1 1-8-8" />
                  </svg>
                </div>
                <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">Recovery Insights</span>
              </div>
              <div className="space-y-2.5">
                {insights.map((insight, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <div className="w-1 h-1 rounded-full bg-sky-400/60 mt-2 flex-shrink-0" />
                    <p className="text-sm text-slate-300 leading-relaxed">{insight}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* CTA */}
          <button
            onClick={() => setActiveTab('checkin')}
            className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-sky-500 to-blue-500 text-white text-sm font-semibold shadow-lg shadow-sky-500/20 hover:shadow-sky-500/30 active:scale-[0.98] transition-all flex items-center justify-center gap-2 animate-fadeUp stagger-6"
            style={{ opacity: 0 }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 5v14M5 12h14" />
            </svg>
            Log a Check-In
          </button>
        </div>
      )}
    </div>
  );
}

// ─── Helpers for Affirmation + Journal ────────────────────────────────────────

function getDayOfYear(): number {
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 0);
  const diff = now.getTime() - start.getTime();
  return Math.floor(diff / (1000 * 60 * 60 * 24));
}


// ─── Daily Affirmation Component ─────────────────────────────────────────────

function DailyAffirmation() {
  const affirmation = useMemo(() => {
    const dayIndex = getDayOfYear() % AFFIRMATIONS.length;
    return AFFIRMATIONS[dayIndex];
  }, []);

  const todayStr = useMemo(
    () => new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' }),
    [],
  );

  return (
    <div className="glass-card p-4 animate-fadeUp" style={{ opacity: 0 }}>
      <div className="flex items-center gap-2.5 mb-3">
        <div className="w-7 h-7 rounded-lg bg-violet-500/10 flex items-center justify-center flex-shrink-0">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#a78bfa" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z" />
            <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z" />
          </svg>
        </div>
        <div>
          <h3 className="text-xs font-bold text-white uppercase tracking-wider">Daily Affirmation</h3>
          <p className="text-[10px] text-slate-400 mt-0.5">{todayStr}</p>
        </div>
      </div>

      <div className="rounded-xl bg-violet-500/[0.05] border border-violet-500/10 p-3.5">
        <div className="flex items-start gap-3">
          <svg className="w-5 h-5 text-violet-500/30 flex-shrink-0 mt-0.5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z" />
          </svg>
          <p className="text-[13px] text-slate-200 italic leading-relaxed font-light">{affirmation}</p>
        </div>
      </div>
    </div>
  );
}

// ─── Journal Prompt Component (copy-ready) ─────────────────────────────────────

function JournalPrompt() {
  const { showToast } = useToast();
  const [promptOffset, setPromptOffset] = useState(0);
  const [copied, setCopied] = useState(false);

  const todaysPrompt = useMemo(() => {
    const dayIndex = getDayOfYear() % JOURNAL_PROMPTS.length;
    return JOURNAL_PROMPTS[(dayIndex + promptOffset) % JOURNAL_PROMPTS.length];
  }, [promptOffset]);

  const nextPrompt = () => setPromptOffset((prev) => prev + 1);

  const handleCopy = useCallback(async () => {
    const ok = await copyToClipboard(todaysPrompt);
    if (ok) {
      setCopied(true);
      showToast('Prompt copied to clipboard', 'success');
      setTimeout(() => setCopied(false), 2000);
    } else {
      showToast('Could not copy to clipboard', 'error');
    }
  }, [todaysPrompt, showToast]);

  return (
    <div className="glass-card p-4 animate-fadeUp" style={{ opacity: 0 }}>
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-emerald-500/10 flex items-center justify-center flex-shrink-0">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 20h9" />
              <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
            </svg>
          </div>
          <h3 className="text-xs font-bold text-white uppercase tracking-wider">Journal Prompt</h3>
        </div>
        <div className="flex gap-1.5">
          <button
            onClick={nextPrompt}
            className="px-2.5 py-1.5 rounded-lg text-[10px] text-emerald-400 font-medium bg-emerald-500/10 border border-emerald-500/15 hover:bg-emerald-500/15 transition-all active:scale-[0.98]"
          >
            New Prompt
          </button>
          <button
            onClick={handleCopy}
            className={`p-1.5 rounded-lg transition-all active:scale-90 ${
              copied
                ? 'bg-emerald-500/20 text-emerald-400'
                : 'bg-white/5 text-slate-500 hover:text-sky-400 hover:bg-white/10'
            }`}
            title="Copy prompt"
          >
            {copied ? (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 6 9 17l-5-5" />
              </svg>
            ) : (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
                <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
              </svg>
            )}
          </button>
        </div>
      </div>

      <div className="rounded-xl bg-emerald-500/[0.05] border border-emerald-500/10 p-3.5">
        <div className="flex items-start gap-3">
          <span className="text-base flex-shrink-0 mt-0.5 text-emerald-400/60">?</span>
          <p className="text-[13px] text-slate-200 leading-relaxed font-light">{todaysPrompt}</p>
        </div>
      </div>

      <p className="text-[10px] text-slate-500 mt-2 text-center">
        Take a few minutes to write your thoughts. There are no wrong answers.
      </p>
    </div>
  );
}
