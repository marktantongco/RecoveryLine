'use client';

import React from 'react';
import { MOODS, DAY_NAMES, CURRENCY } from '@/lib/recovery-constants';
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
  };
  insights: string[];
  onNavigate: (section: string) => void;
}

export default function Dashboard({ stats, insights, onNavigate }: DashboardProps) {
  return (
    <div className="space-y-4 pb-4">
      {/* Hero: Day Counter + Progress Ring */}
      <div className="glass-card p-6 animate-fadeUp">
        <div className="flex items-center gap-5">
          <ProgressRing
            percentage={stats.thirtyDayProgress}
            label={`${stats.streak}`}
            sublabel="day streak"
          />
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-white">Day {stats.daysSinceStart}</h2>
            <p className="text-sm text-slate-400 mt-1">Your Recovery Journey</p>
            <div className="flex items-center gap-2 mt-3">
              <span className="text-xs px-2.5 py-1 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/20">
                {stats.sobrietyRate}% sober
              </span>
              <span className="text-xs px-2.5 py-1 rounded-full bg-sky-500/15 text-sky-400 border border-sky-500/20">
                {stats.thirtyDayProgress}% to 30 days
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-2 gap-3 animate-fadeUp stagger-1" style={{ opacity: 0 }}>
        <div className="glass-card p-4">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/15 flex items-center justify-center text-sm">💰</div>
            <span className="text-xs text-slate-400">Saved</span>
          </div>
          <p className="text-lg font-bold text-emerald-400">{CURRENCY}{stats.totalMoneySaved.toLocaleString()}</p>
        </div>
        <div className="glass-card p-4">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 rounded-lg bg-sky-500/15 flex items-center justify-center text-sm">✅</div>
            <span className="text-xs text-slate-400">Check-ins</span>
          </div>
          <p className="text-lg font-bold text-sky-400">{stats.totalCheckins}</p>
        </div>
        <div className="glass-card p-4">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 rounded-lg bg-amber-500/15 flex items-center justify-center text-sm">🔥</div>
            <span className="text-xs text-slate-400">Streak</span>
          </div>
          <p className="text-lg font-bold text-amber-400">{stats.streak} days</p>
        </div>
        <div className="glass-card p-4">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 rounded-lg bg-purple-500/15 flex items-center justify-center text-sm">📊</div>
            <span className="text-xs text-slate-400">Sober/Use</span>
          </div>
          <p className="text-lg font-bold text-purple-400">
            {stats.soberDays}<span className="text-slate-500 font-normal">/</span>{stats.useDays}
          </p>
        </div>
      </div>

      {/* Today's Status */}
      <div className="glass-card p-4 animate-fadeUp stagger-2" style={{ opacity: 0 }}>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs text-slate-400 mb-1">Today&apos;s Status</p>
            {stats.todayCheckin ? (
              <div className="flex items-center gap-2">
                <span className="text-xl">{MOODS[stats.todayCheckin.mood]?.emoji}</span>
                <div>
                  <p className="text-sm font-medium text-white">
                    {stats.todayCheckin.type === 'sober' ? 'Sober Day' : 'Logged'} — {MOODS[stats.todayCheckin.mood]?.label}
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
          {!stats.todayCheckin && (
            <button
              onClick={() => onNavigate('checkin')}
              className="px-4 py-2 rounded-xl bg-sky-500/15 text-sky-400 text-sm font-medium border border-sky-500/20 hover:bg-sky-500/25 transition-colors"
            >
              Check In
            </button>
          )}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-3 gap-2 animate-fadeUp stagger-3" style={{ opacity: 0 }}>
        <button
          onClick={() => onNavigate('checkin')}
          className="glass-card p-3 flex flex-col items-center gap-1.5 hover:border-sky-500/30 transition-colors"
        >
          <span className="text-xl">📝</span>
          <span className="text-[11px] text-slate-400">Check In</span>
        </button>
        <button
          onClick={() => onNavigate('safety')}
          className="glass-card p-3 flex flex-col items-center gap-1.5 hover:border-purple-500/30 transition-colors"
        >
          <span className="text-xl">💊</span>
          <span className="text-[11px] text-slate-400">Safety</span>
        </button>
        <button
          onClick={() => onNavigate('resources')}
          className="glass-card p-3 flex flex-col items-center gap-1.5 hover:border-emerald-500/30 transition-colors"
        >
          <span className="text-xl">📞</span>
          <span className="text-[11px] text-slate-400">Resources</span>
        </button>
      </div>

      {/* AI Insight Card */}
      <div className="glass-card-elevated p-4 animate-fadeUp stagger-4" style={{ opacity: 0 }}>
        <div className="flex items-center gap-2 mb-3">
          <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-sky-500 to-emerald-500 flex items-center justify-center text-xs text-white font-bold">AI</div>
          <span className="text-xs font-semibold text-slate-300">Recovery Insights</span>
        </div>
        <div className="space-y-2">
          {insights.map((insight, i) => (
            <p key={i} className="text-sm text-slate-300 leading-relaxed">
              {insight}
            </p>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="animate-fadeUp stagger-5" style={{ opacity: 0 }}>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-semibold text-slate-300">Recent Activity</h3>
          <button
            onClick={() => onNavigate('history')}
            className="text-xs text-sky-400 hover:text-sky-300 transition-colors"
          >
            View All
          </button>
        </div>
        {stats.recentCheckins.length > 0 ? (
          <div className="space-y-2">
            {stats.recentCheckins.map((checkin) => (
              <div key={checkin.id} className="glass-card p-3 flex items-center gap-3">
                <div className={`timeline-dot ${checkin.type === 'sober' ? 'timeline-dot-sober' : 'timeline-dot-use'}`} />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-sm">{MOODS[checkin.mood]?.emoji}</span>
                    <span className="text-sm text-white truncate">
                      {checkin.type === 'sober' ? 'Sober' : 'Use'} — {MOODS[checkin.mood]?.label}
                    </span>
                  </div>
                  {checkin.notes && (
                    <p className="text-xs text-slate-500 truncate mt-0.5">{checkin.notes}</p>
                  )}
                </div>
                <span className="text-xs text-slate-500 whitespace-nowrap">{checkin.date}</span>
              </div>
            ))}
          </div>
        ) : (
          <div className="glass-card p-6 text-center">
            <p className="text-sm text-slate-500">No activity yet. Start your first check-in!</p>
          </div>
        )}
      </div>
    </div>
  );
}
