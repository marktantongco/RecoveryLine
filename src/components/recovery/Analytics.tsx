'use client';

import React from 'react';
import { MOODS, DAY_NAMES, CURRENCY } from '@/lib/recovery-constants';
import { Checkin } from '@/lib/recovery-types';

interface AnalyticsProps {
  stats: {
    soberDays: number;
    useDays: number;
    totalMoneySaved: number;
    totalMoneySpent: number;
    totalCheckins: number;
    daysSinceStart: number;
    streak: number;
    sobrietyRate: number;
    moodDistribution: Record<string, number>;
    dayPattern: Record<string, number>;
  };
  insights: string[];
}

export default function Analytics({ stats, insights }: AnalyticsProps) {
  const netBalance = stats.totalMoneySaved - stats.totalMoneySpent;

  // Get top moods
  const sortedMoods = Object.entries(stats.moodDistribution)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);

  const maxDayCount = Math.max(...Object.values(stats.dayPattern), 1);

  return (
    <div className="space-y-4 pb-4">
      <h2 className="text-lg font-bold text-white animate-fadeUp">Analytics</h2>

      {/* Overview Cards */}
      <div className="grid grid-cols-2 gap-3 animate-fadeUp stagger-1" style={{ opacity: 0 }}>
        <div className="glass-card p-4">
          <p className="text-xs text-slate-400 mb-1">Total Check-ins</p>
          <p className="text-2xl font-bold text-white">{stats.totalCheckins}</p>
        </div>
        <div className="glass-card p-4">
          <p className="text-xs text-slate-400 mb-1">Days Tracked</p>
          <p className="text-2xl font-bold text-white">{stats.daysSinceStart}</p>
        </div>
        <div className="glass-card p-4">
          <p className="text-xs text-slate-400 mb-1">Money Saved</p>
          <p className="text-lg font-bold text-emerald-400">{CURRENCY}{stats.totalMoneySaved.toLocaleString()}</p>
        </div>
        <div className="glass-card p-4">
          <p className="text-xs text-slate-400 mb-1">Money Spent</p>
          <p className="text-lg font-bold text-amber-400">{CURRENCY}{stats.totalMoneySpent.toLocaleString()}</p>
        </div>
      </div>

      {/* Sobriety Rate */}
      <div className="glass-card p-4 animate-fadeUp stagger-2" style={{ opacity: 0 }}>
        <p className="text-xs font-semibold text-slate-400 mb-3">Sobriety Rate</p>
        <div className="flex items-center gap-3">
          <div className="flex-1 h-4 rounded-full bg-white/5 overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-emerald-400 transition-all duration-700"
              style={{ width: `${stats.sobrietyRate}%` }}
            />
          </div>
          <span className="text-sm font-bold text-white">{stats.sobrietyRate}%</span>
        </div>
        <div className="flex justify-between mt-2 text-xs text-slate-500">
          <span>✅ {stats.soberDays} sober</span>
          <span>📋 {stats.useDays} use</span>
        </div>
      </div>

      {/* Mood Distribution */}
      <div className="glass-card p-4 animate-fadeUp stagger-3" style={{ opacity: 0 }}>
        <p className="text-xs font-semibold text-slate-400 mb-3">Mood Distribution</p>
        {sortedMoods.length > 0 ? (
          <div className="space-y-2.5">
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
                      <span className="text-xs text-slate-500">{count}x</span>
                    </div>
                    <div className="h-2 rounded-full bg-white/5 overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-500"
                        style={{
                          width: `${width}%`,
                          backgroundColor: info.color,
                        }}
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

      {/* Day of Week Pattern */}
      <div className="glass-card p-4 animate-fadeUp stagger-4" style={{ opacity: 0 }}>
        <p className="text-xs font-semibold text-slate-400 mb-3">Activity by Day of Week</p>
        <div className="flex items-end gap-1.5 h-24">
          {DAY_NAMES.map((day) => {
            const count = stats.dayPattern[day] || 0;
            const height = maxDayCount > 0 ? (count / maxDayCount) * 100 : 0;
            return (
              <div key={day} className="flex-1 flex flex-col items-center gap-1">
                <span className="text-[10px] text-slate-400">{count}</span>
                <div className="w-full flex-1 flex items-end">
                  <div
                    className="w-full rounded-t-md bg-sky-500/60 transition-all duration-500"
                    style={{ height: `${Math.max(height, 4)}%` }}
                  />
                </div>
                <span className="text-[10px] text-slate-500">{day}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Connected Insights */}
      <div className="glass-card-elevated p-4 animate-fadeUp stagger-5" style={{ opacity: 0 }}>
        <p className="text-xs font-semibold text-slate-400 mb-3">Connected Insights</p>
        <div className="space-y-3">
          {/* Financial */}
          <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${netBalance >= 0 ? 'bg-emerald-500/15' : 'bg-red-500/15'}`}>
              <span className="text-lg">{netBalance >= 0 ? '📈' : '📉'}</span>
            </div>
            <div>
              <p className="text-xs text-slate-400">Financial Balance</p>
              <p className={`text-sm font-semibold ${netBalance >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                {netBalance >= 0 ? '+' : ''}{CURRENCY}{netBalance.toLocaleString()} net
              </p>
            </div>
          </div>
          {/* Streak */}
          <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5">
            <div className="w-10 h-10 rounded-xl bg-amber-500/15 flex items-center justify-center">
              <span className="text-lg">🔥</span>
            </div>
            <div>
              <p className="text-xs text-slate-400">Streak Milestone</p>
              <p className="text-sm font-semibold text-amber-400">
                {stats.streak >= 30 ? '🏆 30+ day champion!' :
                 stats.streak >= 14 ? '💪 Two weeks strong!' :
                 stats.streak >= 7 ? '⭐ One week down!' :
                 stats.streak >= 3 ? '🌱 Building momentum' :
                 stats.streak > 0 ? '🌱 Just getting started' :
                 '❓ No streak yet'}
              </p>
            </div>
          </div>
          {/* Top Mood */}
          {sortedMoods.length > 0 && (
            <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5">
              <div className="w-10 h-10 rounded-xl bg-purple-500/15 flex items-center justify-center">
                <span className="text-lg">{MOODS[sortedMoods[0][0]]?.emoji}</span>
              </div>
              <div>
                <p className="text-xs text-slate-400">Most Common Mood</p>
                <p className="text-sm font-semibold text-purple-400">
                  {MOODS[sortedMoods[0][0]]?.label} ({sortedMoods[0][1]}x)
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
