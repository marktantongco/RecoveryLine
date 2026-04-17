'use client';

import React, { useMemo } from 'react';
import { MOODS, CURRENCY } from '@/lib/recovery-constants';
import { RECOVERY_QUOTES } from '@/lib/recovery-content';
import { Checkin, MoodKey } from '@/lib/recovery-types';
import ProgressRing from './ProgressRing';

// ─── Brain Recovery Phase Helpers ─────────────────────────────────────────────

interface BrainPhase {
  minDay: number;
  maxDay: number;
  minPct: number;
  maxPct: number;
  label: string;
  color: string;
  glowColor: string;
  description: string;
}

const BRAIN_PHASES: BrainPhase[] = [
  {
    minDay: 1,
    maxDay: 3,
    minPct: 5,
    maxPct: 10,
    label: 'Acute Phase',
    color: '#ef4444',
    glowColor: 'rgba(239,68,68,0.3)',
    description: 'Your brain is beginning the earliest stages of withdrawal detox. Acute symptoms are strongest here — hang in there, it gets better.',
  },
  {
    minDay: 4,
    maxDay: 14,
    minPct: 15,
    maxPct: 35,
    label: 'Early Recovery',
    color: '#f97316',
    glowColor: 'rgba(249,115,22,0.3)',
    description: 'Dopamine receptors are starting to stabilize. Sleep and mood may still fluctuate, but real neural repair is underway.',
  },
  {
    minDay: 15,
    maxDay: 30,
    minPct: 40,
    maxPct: 60,
    label: 'Neurotransmitter Upregulation',
    color: '#eab308',
    glowColor: 'rgba(234,179,8,0.3)',
    description: 'Your brain is actively rebuilding dopamine and serotonin pathways. Cognitive clarity and emotional regulation are improving.',
  },
  {
    minDay: 31,
    maxDay: 90,
    minPct: 65,
    maxPct: 80,
    label: 'Significant Healing',
    color: '#22c55e',
    glowColor: 'rgba(34,197,94,0.3)',
    description: 'Neuroplasticity is in full effect. Gray matter volume is recovering and prefrontal cortex function is measurably improving.',
  },
  {
    minDay: 91,
    maxDay: Infinity,
    minPct: 85,
    maxPct: 95,
    label: 'Near-Full Recovery',
    color: '#10b981',
    glowColor: 'rgba(16,185,129,0.3)',
    description: 'Your brain has achieved remarkable healing. Reward circuitry is largely restored and long-term cognitive gains continue to compound.',
  },
];

function getBrainPhase(streak: number): BrainPhase & { pct: number } {
  const phase = BRAIN_PHASES.find(p => streak >= p.minDay && streak <= p.maxDay) ?? BRAIN_PHASES[BRAIN_PHASES.length - 1];
  // Linear interpolation within the phase range
  const range = phase.maxDay === Infinity ? 30 : phase.maxDay - phase.minDay;
  const progress = phase.maxDay === Infinity
    ? Math.min((streak - phase.minDay) / range, 1)
    : (streak - phase.minDay) / range;
  const pct = Math.round(phase.minPct + progress * (phase.maxPct - phase.minPct));
  return { ...phase, pct };
}

// ─── Motivational Quotes (imported from centralized data) ───────────────────

// ─── Mood Color Helper ───────────────────────────────────────────────────────

function getMoodColor(mood: MoodKey): string {
  const color = MOODS[mood]?.color;
  if (!color) return '#64748b';
  // Map mood colors to green/amber/red categories
  const green = ['#22c55e', '#10b981', '#06b6d4'];
  const amber = ['#eab308', '#f59e0b'];
  if (green.includes(color)) return '#22c55e';
  if (amber.includes(color)) return '#f59e0b';
  return '#ef4444';
}

// ─── Weekly Stats Computation ────────────────────────────────────────────────

function getStartOfWeek(): Date {
  const d = new Date();
  const day = d.getDay();
  d.setDate(d.getDate() - day);
  d.setHours(0, 0, 0, 0);
  return d;
}

function computeWeeklyStats(checkins: Checkin[]) {
  const weekStart = getStartOfWeek().getTime();
  const thisWeekCheckins = checkins.filter(c => c.timestamp >= weekStart);

  // Last week
  const lastWeekStart = weekStart - 7 * 24 * 60 * 60 * 1000;
  const lastWeekCheckins = checkins.filter(c => c.timestamp >= lastWeekStart && c.timestamp < weekStart);

  // Check-in count
  const checkinCount = thisWeekCheckins.length;

  // Money saved this week
  const moneySaved = thisWeekCheckins.reduce((sum, c) => sum + (c.saved || 0), 0);

  // Best mood this week
  let bestMood: MoodKey | null = null;
  let bestMoodScore = -1;
  const moodScores: Record<string, number> = {
    great: 5, happy: 5, good: 4, relieved: 4, okay: 3, neutral: 3,
    anxious: 2, guilty: 2, bad: 1, terrible: 0, high: 3,
  };
  for (const c of thisWeekCheckins) {
    const score = moodScores[c.mood] ?? 0;
    if (score > bestMoodScore) {
      bestMoodScore = score;
      bestMood = c.mood;
    }
  }

  // Streak comparison: sober days this week vs last week
  const soberThisWeek = thisWeekCheckins.filter(c => c.type === 'sober').length;
  const soberLastWeek = lastWeekCheckins.filter(c => c.type === 'sober').length;
  const streakDiff = soberThisWeek - soberLastWeek;

  return { checkinCount, moneySaved, bestMood, soberThisWeek, soberLastWeek, streakDiff };
}

// ─── 7-Day Mood Data ─────────────────────────────────────────────────────────

function getLast7DaysMoods(checkins: Checkin[]): Array<{ day: string; mood: MoodKey | null; type: 'sober' | 'use' | null }> {
  const result: Array<{ day: string; mood: MoodKey | null; type: 'sober' | 'use' | null }> = [];
  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  for (let i = 6; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    const dateStr = d.toISOString().slice(0, 10);
    const checkin = checkins.find(c => c.date === dateStr);
    result.push({
      day: dayNames[d.getDay()],
      mood: checkin?.mood ?? null,
      type: checkin?.type ?? null,
    });
  }
  return result;
}

// ─── Brain Recovery Arc (SVG) ────────────────────────────────────────────────

function BrainRecoveryArc({ pct, color, glowColor }: { pct: number; color: string; glowColor: string }) {
  const size = 56;
  const strokeWidth = 5;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (pct / 100) * circumference;

  return (
    <div className="relative flex-shrink-0" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="transform -rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="rgba(255,255,255,0.06)"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className="transition-all duration-1000 ease-out"
          style={{ filter: `drop-shadow(0 0 6px ${glowColor})` }}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        {/* Brain icon */}
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="opacity-80">
          <path d="M12 2C8.5 2 6 4.5 6 7c0 1.5.5 2.5 1 3.5-.5.5-1 1.5-1 3 0 2.5 2 4.5 4.5 4.5.5 0 1-.1 1.5-.2V21h1v-3.2c.5.1 1 .2 1.5.2 2.5 0 4.5-2 4.5-4.5 0-1.5-.5-2.5-1-3 .5-1 1-2 1-3.5 0-2.5-2.5-5-6-5z" />
          <path d="M12 2v19" />
          <path d="M9 8c-1 0-2 .5-2 1.5S8 11 9 11" />
          <path d="M15 8c1 0 2 .5 2 1.5S16 11 15 11" />
        </svg>
      </div>
    </div>
  );
}

// ─── Main Dashboard Component ────────────────────────────────────────────────

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
  // ─── Enhanced Greeting ─────────────────────────────────────────────────────
  const getGreeting = () => {
    const h = new Date().getHours();
    if (h >= 5 && h < 12) return { text: 'Good morning, Warrior', icon: 'sun' };
    if (h >= 12 && h < 17) return { text: 'Good afternoon, Warrior', icon: 'sun' };
    if (h >= 17 && h < 21) return { text: 'Good evening, Warrior', icon: 'sunset' };
    return { text: 'Rest well, Warrior', icon: 'moon' };
  };

  const greeting = useMemo(() => getGreeting(), []);

  const getMotivationColor = () => {
    if (stats.sobrietyRate >= 80) return 'from-emerald-500 to-teal-500';
    if (stats.sobrietyRate >= 50) return 'from-sky-500 to-blue-500';
    if (stats.sobrietyRate >= 20) return 'from-amber-500 to-orange-500';
    return 'from-slate-500 to-slate-400';
  };

  // ─── Brain Recovery ────────────────────────────────────────────────────────
  const brainPhase = useMemo(() => getBrainPhase(stats.streak), [stats.streak]);

  // ─── Mood Trend Data ───────────────────────────────────────────────────────
  const moodTrend = useMemo(() => getLast7DaysMoods(stats.recentCheckins), [stats.recentCheckins]);

  // ─── Weekly Stats ──────────────────────────────────────────────────────────
  const weeklyStats = useMemo(() => computeWeeklyStats(stats.recentCheckins), [stats.recentCheckins]);

  // ─── Motivational Quote (deterministic from streak) ────────────────────────
  const quote = useMemo(() => {
    const index = stats.streak % RECOVERY_QUOTES.length;
    return RECOVERY_QUOTES[index];
  }, [stats.streak]);

  return (
    <div className="space-y-5 pb-6">
      {/* ═══════════════════════════════════════════════════════════════════════
          HERO: Greeting + Progress Ring + Enhanced Time Greeting
          ═══════════════════════════════════════════════════════════════════════ */}
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
            <p className="text-sm text-slate-400 mb-0.5 flex items-center gap-1.5">
              {greeting.icon === 'moon' && (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#a78bfa" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="inline">
                  <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
                </svg>
              )}
              {greeting.icon === 'sun' && new Date().getHours() < 12 && (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fbbf24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="inline">
                  <circle cx="12" cy="12" r="4" /><path d="M12 2v2" /><path d="M12 20v2" /><path d="m4.93 4.93 1.41 1.41" /><path d="m17.66 17.66 1.41 1.41" /><path d="M2 12h2" /><path d="M20 12h2" /><path d="m6.34 17.66-1.41 1.41" /><path d="m19.07 4.93-1.41 1.41" />
                </svg>
              )}
              {greeting.icon === 'sun' && new Date().getHours() >= 12 && (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fb923c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="inline">
                  <circle cx="12" cy="12" r="4" /><path d="M12 2v2" /><path d="M12 20v2" /><path d="m4.93 4.93 1.41 1.41" /><path d="m17.66 17.66 1.41 1.41" /><path d="M2 12h2" /><path d="M20 12h2" /><path d="m6.34 17.66-1.41 1.41" /><path d="m19.07 4.93-1.41 1.41" />
                </svg>
              )}
              {greeting.icon === 'sunset' && (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#f97316" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="inline">
                  <path d="M12 10V2" /><path d="m4.93 10.93 1.41 1.41" /><path d="M2 18h2" /><path d="M20 18h2" /><path d="m19.07 10.93-1.41 1.41" /><path d="M22 22H2" /><path d="m8 6 4-4 4 4" /><path d="M16 18a4 4 0 0 0-8 0" />
                </svg>
              )}
              {greeting.text}
            </p>
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

      {/* ═══════════════════════════════════════════════════════════════════════
          BRAIN RECOVERY SCORE WIDGET
          ═══════════════════════════════════════════════════════════════════════ */}
      <div className="glass-card-hero p-5 animate-fadeUp stagger-1 relative overflow-hidden" style={{ opacity: 0 }}>
        {/* Subtle background glow */}
        <div
          className="absolute -top-12 -right-12 w-36 h-36 rounded-full blur-3xl pointer-events-none opacity-30"
          style={{ backgroundColor: brainPhase.glowColor }}
        />

        <div className="relative">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: brainPhase.color, boxShadow: `0 0 8px ${brainPhase.glowColor}` }}
              />
              <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">Brain Recovery Score</span>
            </div>
            <span
              className="text-[10px] font-semibold px-2 py-0.5 rounded-full border"
              style={{
                color: brainPhase.color,
                borderColor: brainPhase.color + '33',
                backgroundColor: brainPhase.color + '12',
              }}
            >
              {brainPhase.label}
            </span>
          </div>

          <div className="flex items-center gap-4">
            {/* Recovery arc */}
            <BrainRecoveryArc
              pct={brainPhase.pct}
              color={brainPhase.color}
              glowColor={brainPhase.glowColor}
            />

            <div className="flex-1 min-w-0">
              {/* Percentage with animated feel */}
              <div className="flex items-baseline gap-1.5">
                <span
                  className="text-3xl font-black tabular-nums leading-none"
                  style={{ color: brainPhase.color }}
                >
                  {brainPhase.pct}%
                </span>
                <span className="text-[10px] text-slate-500 font-medium">estimated recovery</span>
              </div>

              {/* Phase description */}
              <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                {brainPhase.description}
              </p>

              {/* Phase milestone dots */}
              <div className="flex items-center gap-1.5 mt-3">
                {BRAIN_PHASES.map((phase, i) => {
                  const isActive = phase.label === brainPhase.label;
                  const isPast = BRAIN_PHASES.indexOf(BRAIN_PHASES.find(p => p.label === brainPhase.label)!) > i;
                  return (
                    <div key={phase.label} className="flex items-center gap-1.5">
                      <div
                        className="w-2 h-2 rounded-full transition-all duration-500"
                        style={{
                          backgroundColor: isPast || isActive ? phase.color : 'rgba(255,255,255,0.1)',
                          boxShadow: isActive ? `0 0 8px ${phase.glowColor}` : 'none',
                          transform: isActive ? 'scale(1.4)' : 'scale(1)',
                        }}
                      />
                      {i < BRAIN_PHASES.length - 1 && (
                        <div className="w-4 h-px" style={{ backgroundColor: isPast ? phase.color + '40' : 'rgba(255,255,255,0.06)' }} />
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════════════════════
          7-DAY MOOD TREND MINI-CHART
          ═══════════════════════════════════════════════════════════════════════ */}
      <div className="glass-card p-4 animate-fadeUp stagger-2" style={{ opacity: 0 }}>
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">7-Day Mood Trend</span>
          <span className="text-[10px] text-slate-500 font-medium">Last 7 days</span>
        </div>

        {/* SVG mood timeline */}
        <div className="relative">
          <svg width="100%" height="60" viewBox="0 0 280 60" preserveAspectRatio="xMidYMid meet">
            {/* Background track line */}
            <line x1="20" y1="20" x2="260" y2="20" stroke="rgba(255,255,255,0.06)" strokeWidth="2" strokeLinecap="round" />

            {moodTrend.map((entry, i) => {
              const x = 20 + i * 40;
              const hasData = entry.mood !== null;
              const color = hasData ? getMoodColor(entry.mood!) : '#334155';
              const isUse = entry.type === 'use';
              const isToday = i === moodTrend.length - 1;

              // Bar height based on mood quality
              const moodScores: Record<string, number> = {
                great: 5, happy: 5, good: 4, relieved: 4, okay: 3, neutral: 3,
                anxious: 2, guilty: 2, bad: 1, terrible: 0, high: 3,
              };
              const score = hasData ? (moodScores[entry.mood!] ?? 0) : 0;
              const barHeight = hasData ? 8 + score * 6 : 4;
              const barY = 20 - barHeight;

              return (
                <g key={i}>
                  {/* Bar */}
                  <rect
                    x={x - 8}
                    y={barY}
                    width={16}
                    height={barHeight}
                    rx={4}
                    fill={color}
                    opacity={hasData ? 0.85 : 0.2}
                    className="transition-all duration-500"
                  />
                  {/* Dot on top */}
                  <circle
                    cx={x}
                    cy={barY}
                    r={isToday ? 5 : 3.5}
                    fill={color}
                    stroke="rgba(15,23,42,0.8)"
                    strokeWidth={isToday ? 2 : 1}
                    className="transition-all duration-500"
                    style={isToday ? { filter: `drop-shadow(0 0 4px ${color})` } : {}}
                  />
                  {/* Use indicator — small "×" */}
                  {isUse && (
                    <text x={x} y={barY - 6} textAnchor="middle" fontSize="8" fill="#ef4444" fontWeight="bold">×</text>
                  )}
                  {/* Day label */}
                  <text
                    x={x}
                    y={42}
                    textAnchor="middle"
                    fontSize="9"
                    fill={isToday ? '#94a3b8' : '#475569'}
                    fontWeight={isToday ? '600' : '400'}
                    fontFamily="system-ui"
                  >
                    {entry.day}
                  </text>
                  {/* Today underline */}
                  {isToday && (
                    <line x1={x - 6} y1={46} x2={x + 6} y2={46} stroke="#64748b" strokeWidth="1.5" strokeLinecap="round" />
                  )}
                </g>
              );
            })}

            {/* Legend */}
            <circle cx="20" cy="56" r="3" fill="#22c55e" />
            <text x="27" y="59" fontSize="8" fill="#64748b" fontFamily="system-ui">Good</text>
            <circle cx="70" cy="56" r="3" fill="#f59e0b" />
            <text x="77" y="59" fontSize="8" fill="#64748b" fontFamily="system-ui">Neutral</text>
            <circle cx="130" cy="56" r="3" fill="#ef4444" />
            <text x="137" y="59" fontSize="8" fill="#64748b" fontFamily="system-ui">Bad/Use</text>
            <rect x="200" y="53" width="8" height="6" rx="2" fill="none" stroke="#475569" strokeWidth="0.8" strokeDasharray="2 1" />
            <text x="212" y="59" fontSize="8" fill="#64748b" fontFamily="system-ui">No data</text>
          </svg>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════════════════════
          QUICK STATS GRID — Clickable
          ═══════════════════════════════════════════════════════════════════════ */}
      <div className="grid grid-cols-2 gap-3 animate-fadeUp stagger-3" style={{ opacity: 0 }}>
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

      {/* ═══════════════════════════════════════════════════════════════════════
          TODAY'S STATUS — Clickable
          ═══════════════════════════════════════════════════════════════════════ */}
      <div className="glass-card p-4 animate-fadeUp stagger-4" style={{ opacity: 0 }}>
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

      {/* ═══════════════════════════════════════════════════════════════════════
          WEEKLY SUMMARY CARD
          ═══════════════════════════════════════════════════════════════════════ */}
      <div className="glass-card p-4 animate-fadeUp stagger-5" style={{ opacity: 0 }}>
        <div className="flex items-center gap-2 mb-4">
          {/* Calendar icon */}
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
          </svg>
          <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">This Week</span>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {/* Check-ins */}
          <div className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.03] border border-white/[0.05]">
            <div className="w-9 h-9 rounded-lg bg-sky-500/12 flex items-center justify-center flex-shrink-0">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0ea5e9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><path d="m9 11 3 3L22 4" />
              </svg>
            </div>
            <div className="min-w-0">
              <p className="text-base font-bold text-white tabular-nums">{weeklyStats.checkinCount}</p>
              <p className="text-[10px] text-slate-500 font-medium">Check-ins</p>
            </div>
          </div>

          {/* Best Mood */}
          <div className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.03] border border-white/[0.05]">
            <div className="w-9 h-9 rounded-lg bg-emerald-500/12 flex items-center justify-center flex-shrink-0 text-lg">
              {weeklyStats.bestMood ? MOODS[weeklyStats.bestMood]?.emoji : '—'}
            </div>
            <div className="min-w-0">
              <p className="text-sm font-bold text-white truncate">
                {weeklyStats.bestMood ? MOODS[weeklyStats.bestMood]?.label : 'No data'}
              </p>
              <p className="text-[10px] text-slate-500 font-medium">Best Mood</p>
            </div>
          </div>

          {/* Money Saved */}
          <div className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.03] border border-white/[0.05]">
            <div className="w-9 h-9 rounded-lg bg-emerald-500/12 flex items-center justify-center flex-shrink-0 text-sm">
              {'\ud83d\udcb0'}
            </div>
            <div className="min-w-0">
              <p className="text-base font-bold text-emerald-400 tabular-nums">{CURRENCY}{weeklyStats.moneySaved.toLocaleString()}</p>
              <p className="text-[10px] text-slate-500 font-medium">Saved</p>
            </div>
          </div>

          {/* Streak vs Last Week */}
          <div className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.03] border border-white/[0.05]">
            <div className="w-9 h-9 rounded-lg bg-amber-500/12 flex items-center justify-center flex-shrink-0">
              {weeklyStats.streakDiff > 0 ? (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m18 15-6-6-6 6" />
                </svg>
              ) : weeklyStats.streakDiff < 0 ? (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m6 9 6 6 6-6" />
                </svg>
              ) : (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14" />
                </svg>
              )}
            </div>
            <div className="min-w-0">
              <div className="flex items-baseline gap-1">
                <p className="text-base font-bold text-white tabular-nums">{weeklyStats.soberThisWeek}</p>
                <span className="text-[10px] text-slate-500">sober days</span>
              </div>
              <p className="text-[10px] font-medium flex items-center gap-1">
                {weeklyStats.streakDiff > 0 ? (
                  <span className="text-emerald-400">+{weeklyStats.streakDiff} vs last week</span>
                ) : weeklyStats.streakDiff < 0 ? (
                  <span className="text-red-400">{weeklyStats.streakDiff} vs last week</span>
                ) : (
                  <span className="text-slate-500">Same as last week</span>
                )}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════════════════════
          QUICK ACTIONS
          ═══════════════════════════════════════════════════════════════════════ */}
      <div className="animate-fadeUp stagger-6" style={{ opacity: 0 }}>
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

      {/* ═══════════════════════════════════════════════════════════════════════
          AI INSIGHT CARD
          ═══════════════════════════════════════════════════════════════════════ */}
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

      {/* ═══════════════════════════════════════════════════════════════════════
          RECENT ACTIVITY
          ═══════════════════════════════════════════════════════════════════════ */}
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

      {/* ═══════════════════════════════════════════════════════════════════════
          MOTIVATIONAL QUOTE
          ═══════════════════════════════════════════════════════════════════════ */}
      <div className="glass-card p-5 animate-fadeUp stagger-6 relative overflow-hidden" style={{ opacity: 0 }}>
        {/* Subtle decorative quote mark */}
        <div className="absolute -top-4 -left-2 text-6xl text-white/[0.03] font-serif leading-none pointer-events-none select-none">
          &ldquo;
        </div>

        <div className="relative flex items-start gap-3">
          {/* Sparkle icon */}
          <div className="w-8 h-8 rounded-lg bg-amber-500/10 flex items-center justify-center flex-shrink-0 mt-0.5">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-70">
              <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
            </svg>
          </div>

          <div className="flex-1 min-w-0">
            <p className="text-sm text-slate-400 italic leading-relaxed">
              {quote}
            </p>
            <p className="text-[10px] text-slate-600 mt-2.5 font-medium">
              Daily inspiration &middot; Day {stats.streak}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
});
