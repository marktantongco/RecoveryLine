'use client';

import React from 'react';
import { MOODS, CURRENCY } from '@/lib/recovery-constants';
import { Checkin } from '@/lib/recovery-types';
import ProgressRing from './ProgressRing';

interface DashboardProps {
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
  onNavigate: (section: string) => void;
}

export default React.memo(function Dashboard({ stats, insights, onNavigate }: DashboardProps) {
  const getGreeting = () => {
    const h = new Date().getHours();
    if (h < 12) return 'Good morning';
    if (h < 17) return 'Good afternoon';
    return 'Good evening';
  };

  const getMotivationColor = () => {
    if (stats.sobrietyRate >= 80) return 'from-emerald-500 to-teal-500';
    if (stats.sobrietyRate >= 50) return 'from-sky-500 to-blue-500';
    if (stats.sobrietyRate >= 20) return 'from-amber-500 to-orange-500';
    return 'from-slate-500 to-slate-400';
  };

  return (
    <div className="space-y-5 pb-6">
      {/* Hero: Greeting + Progress Ring */}
      <div className="glass-card-hero p-5 animate-fadeUp relative overflow-hidden">
        <div className="absolute -top-20 -right-20 w-48 h-48 rounded-full bg-sky-500/5 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-16 -left-16 w-40 h-40 rounded-full bg-emerald-500/5 blur-3xl pointer-events-none" />

        <div className="relative flex items-center gap-5">
          <ProgressRing
            percentage={stats.thirtyDayProgress}
            label={`${stats.streak}`}
            sublabel="day streak"
          />
          <div className="flex-1">
            <p className="text-sm text-slate-400 mb-0.5">{getGreeting()}, Warrior</p>
            <h2 className="text-2xl font-bold text-white leading-tight">Day {stats.daysSinceStart || 1}</h2>
            <p className="text-xs text-slate-500 mt-1">Your Recovery Journey</p>
            <div className="flex items-center gap-2 mt-3 flex-wrap">
              <span className="text-[11px] px-2.5 py-1 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/20 font-medium">
                {stats.sobrietyRate}% sober
              </span>
              <span className="text-[11px] px-2.5 py-1 rounded-full bg-sky-500/15 text-sky-400 border border-sky-500/20 font-medium">
                {stats.thirtyDayProgress}% to 30 days
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats Grid - Clickable */}
      <div className="grid grid-cols-2 gap-3 animate-fadeUp stagger-1" style={{ opacity: 0 }}>
        <button
          onClick={() => onNavigate('recovery')}
          className="glass-card p-4 text-left hover:border-emerald-500/20 active:scale-[0.98] transition-all group"
        >
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/15 flex items-center justify-center text-sm group-hover:scale-110 transition-transform">{'\ud83d\udcb0'}</div>
            <span className="text-xs text-slate-400">Saved</span>
          </div>
          <p className="text-lg font-bold text-emerald-400">{CURRENCY}{stats.totalMoneySaved.toLocaleString()}</p>
          <p className="text-[10px] text-slate-600 mt-1 group-hover:text-slate-500 transition-colors">Tap for analytics {'\u2192'}</p>
        </button>
        <button
          onClick={() => onNavigate('recovery')}
          className="glass-card p-4 text-left hover:border-sky-500/20 active:scale-[0.98] transition-all group"
        >
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 rounded-lg bg-sky-500/15 flex items-center justify-center text-sm group-hover:scale-110 transition-transform">{'\u2705'}</div>
            <span className="text-xs text-slate-400">Check-ins</span>
          </div>
          <p className="text-lg font-bold text-sky-400">{stats.totalCheckins}</p>
          <p className="text-[10px] text-slate-600 mt-1 group-hover:text-slate-500 transition-colors">Tap for history {'\u2192'}</p>
        </button>
        <button
          onClick={() => onNavigate('recovery')}
          className="glass-card p-4 text-left hover:border-amber-500/20 active:scale-[0.98] transition-all group"
        >
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 rounded-lg bg-amber-500/15 flex items-center justify-center text-sm group-hover:scale-110 transition-transform">{'\ud83d\udd25'}</div>
            <span className="text-xs text-slate-400">Streak</span>
          </div>
          <p className="text-lg font-bold text-amber-400">{stats.streak} days</p>
          <p className="text-[10px] text-slate-600 mt-1 group-hover:text-slate-500 transition-colors">Tap for stats {'\u2192'}</p>
        </button>
        <button
          onClick={() => onNavigate('recovery')}
          className="glass-card p-4 text-left hover:border-purple-500/20 active:scale-[0.98] transition-all group"
        >
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 rounded-lg bg-purple-500/15 flex items-center justify-center text-sm group-hover:scale-110 transition-transform">{'\ud83d\udcc8'}</div>
            <span className="text-xs text-slate-400">Sober / Use</span>
          </div>
          <p className="text-lg font-bold text-purple-400">
            {stats.soberDays}<span className="text-slate-600 font-normal">/</span>{stats.useDays}
          </p>
          <p className="text-[10px] text-slate-600 mt-1 group-hover:text-slate-500 transition-colors">Tap for notes {'\u2192'}</p>
        </button>
      </div>

      {/* Today's Status - Clickable */}
      <div className="glass-card p-4 animate-fadeUp stagger-2" style={{ opacity: 0 }}>
        <div className="flex items-center justify-between">
          <div className="flex-1 min-w-0">
            <p className="text-xs text-slate-400 mb-1.5">Today&apos;s Status</p>
            {stats.todayCheckin ? (
              <div className="flex items-center gap-2.5">
                <span className="text-2xl">{MOODS[stats.todayCheckin.mood]?.emoji}</span>
                <div className="min-w-0">
                  <p className="text-sm font-medium text-white truncate">
                    {stats.todayCheckin.type === 'sober' ? 'Sober Day' : 'Logged'} {'\u2014'} {MOODS[stats.todayCheckin.mood]?.label}
                  </p>
                  {stats.todayCheckin.saved ? (
                    <p className="text-xs text-emerald-400">Saved {CURRENCY}{stats.todayCheckin.saved}</p>
                  ) : stats.todayCheckin.spent ? (
                    <p className="text-xs text-amber-400">Spent {CURRENCY}{stats.todayCheckin.spent}</p>
                  ) : null}
                </div>
              </div>
            ) : (
              <p className="text-sm text-slate-500">No check-in yet today</p>
            )}
          </div>
          {!stats.todayCheckin ? (
            <button
              onClick={() => onNavigate('recovery')}
              className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-sky-500 to-blue-500 text-white text-xs font-semibold shadow-lg shadow-sky-500/20 hover:shadow-sky-500/30 active:scale-95 transition-all flex-shrink-0 ml-3"
            >
              Check In Now
            </button>
          ) : (
            <button
              onClick={() => onNavigate('recovery')}
              className="px-3 py-2 rounded-xl bg-white/5 text-xs text-slate-400 border border-white/8 hover:bg-white/10 transition-colors flex-shrink-0 ml-3"
            >
              Update
            </button>
          )}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="animate-fadeUp stagger-3" style={{ opacity: 0 }}>
        <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3 px-1">Quick Actions</h3>
        <div className="grid grid-cols-4 gap-2">
          <button
            onClick={() => onNavigate('recovery')}
            className="glass-card p-3 flex flex-col items-center gap-1.5 hover:border-emerald-500/20 active:scale-95 transition-all group"
          >
            <div className="w-10 h-10 rounded-xl bg-emerald-500/15 flex items-center justify-center group-hover:scale-110 transition-transform">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><path d="m9 11 3 3L22 4" />
              </svg>
            </div>
            <span className="text-[10px] text-slate-400 font-medium">Check In</span>
          </button>
          <button
            onClick={() => onNavigate('biotools')}
            className="glass-card p-3 flex flex-col items-center gap-1.5 hover:border-purple-500/20 active:scale-95 transition-all group"
          >
            <div className="w-10 h-10 rounded-xl bg-purple-500/15 flex items-center justify-center group-hover:scale-110 transition-transform">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#a855f7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
              </svg>
            </div>
            <span className="text-[10px] text-slate-400 font-medium">Safety</span>
          </button>
          <button
            onClick={() => onNavigate('phguide')}
            className="glass-card p-3 flex flex-col items-center gap-1.5 hover:border-emerald-500/20 active:scale-95 transition-all group"
          >
            <div className="w-10 h-10 rounded-xl bg-emerald-500/15 flex items-center justify-center group-hover:scale-110 transition-transform">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72" />
              </svg>
            </div>
            <span className="text-[10px] text-slate-400 font-medium">Resources</span>
          </button>
          <button
            onClick={() => onNavigate('recovery')}
            className="glass-card p-3 flex flex-col items-center gap-1.5 hover:border-amber-500/20 active:scale-95 transition-all group"
          >
            <div className="w-10 h-10 rounded-xl bg-amber-500/15 flex items-center justify-center group-hover:scale-110 transition-transform">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
              </svg>
            </div>
            <span className="text-[10px] text-slate-400 font-medium">Notes</span>
          </button>
        </div>
      </div>

      {/* AI Insight Card */}
      <div className="glass-card-insight p-4 animate-fadeUp stagger-4" style={{ opacity: 0 }}>
        <div className="flex items-center gap-2.5 mb-3">
          <div className={`w-7 h-7 rounded-lg bg-gradient-to-br ${getMotivationColor()} flex items-center justify-center shadow-lg shadow-sky-500/20`}>
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
        {insights.length > 0 && (
          <button
            onClick={() => onNavigate('recovery')}
            className="mt-3 text-xs text-sky-400 hover:text-sky-300 transition-colors font-medium flex items-center gap-1"
          >
            View full analytics {'\u2192'}
          </button>
        )}
      </div>

      {/* Recent Activity */}
      <div className="animate-fadeUp stagger-5" style={{ opacity: 0 }}>
        <div className="flex items-center justify-between mb-3 px-1">
          <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Recent Activity</h3>
          <button
            onClick={() => onNavigate('recovery')}
            className="text-xs text-sky-400 hover:text-sky-300 active:text-sky-500 transition-colors font-medium"
          >
            View All {'\u2192'}
          </button>
        </div>
        {stats.recentCheckins.length > 0 ? (
          <div className="space-y-2">
            {stats.recentCheckins.map((checkin) => (
              <button
                key={checkin.id}
                onClick={() => onNavigate('recovery')}
                className="glass-card p-3 flex items-center gap-3 w-full text-left hover:border-white/15 active:scale-[0.99] transition-all"
              >
                <div className={`timeline-dot ${checkin.type === 'sober' ? 'timeline-dot-sober' : 'timeline-dot-use'}`} />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-sm">{MOODS[checkin.mood]?.emoji}</span>
                    <span className="text-sm text-white truncate">
                      {checkin.type === 'sober' ? 'Sober' : 'Use'} {'\u2014'} {MOODS[checkin.mood]?.label}
                    </span>
                  </div>
                  {checkin.notes && (
                    <p className="text-xs text-slate-500 truncate mt-0.5">{checkin.notes}</p>
                  )}
                </div>
                <span className="text-[10px] text-slate-600 whitespace-nowrap flex-shrink-0">{checkin.date}</span>
              </button>
            ))}
          </div>
        ) : (
          <div className="glass-card p-8 text-center">
            <div className="text-4xl mb-3">{'\ud83d\udcdd'}</div>
            <p className="text-sm text-slate-500 font-medium">No activity yet</p>
            <p className="text-xs text-slate-600 mt-1">Start your first check-in using the + button</p>
            <button
              onClick={() => onNavigate('recovery')}
              className="mt-4 px-5 py-2.5 rounded-xl bg-gradient-to-r from-sky-500 to-blue-500 text-white text-xs font-semibold shadow-lg shadow-sky-500/20 active:scale-95 transition-all"
            >
              First Check-In
            </button>
          </div>
        )}
      </div>
    </div>
  );
});