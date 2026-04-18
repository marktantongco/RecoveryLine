'use client';

import React, { useState, useMemo, useEffect, useRef, useCallback } from 'react';
import {
  COMPARATIVE_MINDSETS,
  WELLNESS_TOOLS,
  CONTEMPLATIVE_PRACTICES,
  CONTEMPLATIVE_THEMES,
} from '@/lib/mind-psychology-data';
import type { ComparativeMindset } from '@/lib/mind-psychology-data';
import type { WellnessTool } from '@/lib/mind-psychology-data';
import type { ContemplativePractice } from '@/lib/mind-psychology-data';

// ─── Types ────────────────────────────────────────────────────────────────────

type SubTab = 'comparative' | 'wellness' | 'contemplative';

// ─── Helpers ──────────────────────────────────────────────────────────────────

function getStaggerClass(idx: number): string {
  if (idx < 6) return `stagger-${idx + 1}`;
  return '';
}

function getDayOfYear(): number {
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 0);
  const diff = now.getTime() - start.getTime();
  return Math.floor(diff / (1000 * 60 * 60 * 24));
}

// ─── SVG Icons ────────────────────────────────────────────────────────────────

const BrainIcon = React.memo(function BrainIcon({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z" />
      <path d="M12 5a3 3 0 1 1 5.997.125 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A4 4 0 1 1 12 18Z" />
      <path d="M15 13a4.5 4.5 0 0 1-3-4 4.5 4.5 0 0 1-3 4" />
      <path d="M17.599 6.5a3 3 0 0 0 .399-1.375" />
      <path d="M6.003 5.125A3 3 0 0 0 6.401 6.5" />
      <path d="M3.477 10.896a4 4 0 0 1 .585-.396" />
      <path d="M19.938 10.5a4 4 0 0 1 .585.396" />
      <path d="M6 18a4 4 0 0 1-1.967-.516" />
      <path d="M19.967 17.484A4 4 0 0 1 18 18" />
    </svg>
  );
});

const HeartPulseIcon = React.memo(function HeartPulseIcon({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M19.5 12.572l-7.5 7.428-7.5-7.428A5 5 0 1 1 12 6.006a5 5 0 1 1 7.5 6.572" />
      <path d="M12 6l-1.5 4h3l-1.5 4" />
    </svg>
  );
});

const SparklesIcon = React.memo(function SparklesIcon({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
      <path d="M5 3v4" />
      <path d="M19 17v4" />
      <path d="M3 5h4" />
      <path d="M17 19h4" />
    </svg>
  );
});

const ChevronDownIcon = React.memo(function ChevronDownIcon({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
});

const ClockIcon = React.memo(function ClockIcon({ className = 'w-3.5 h-3.5' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
});

const ZapIcon = React.memo(function ZapIcon({ className = 'w-3.5 h-3.5' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
  );
});

const ArrowRightIcon = React.memo(function ArrowRightIcon({ className = 'w-3 h-3' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  );
});

const BookOpenIcon = React.memo(function BookOpenIcon({ className = 'w-3.5 h-3.5' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
      <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
    </svg>
  );
});

const GitBranchIcon = React.memo(function GitBranchIcon({ className = 'w-3.5 h-3.5' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <line x1="6" y1="3" x2="6" y2="15" />
      <circle cx="18" cy="6" r="3" />
      <circle cx="6" cy="18" r="3" />
      <path d="M18 9a9 9 0 0 1-9 9" />
    </svg>
  );
});

const FlameIcon = React.memo(function FlameIcon({ className = 'w-3.5 h-3.5' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z" />
    </svg>
  );
});

const FilterIcon = React.memo(function FilterIcon({ className = 'w-3.5 h-3.5' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
    </svg>
  );
});

// ─── Breathing Exercise ───────────────────────────────────────────────────────

type BreathingPhase = 'idle' | 'in' | 'hold' | 'out';

const BREATHING_PHASES: { phase: BreathingPhase; label: string; duration: number }[] = [
  { phase: 'in', label: 'Breathe In', duration: 4000 },
  { phase: 'hold', label: 'Hold', duration: 4000 },
  { phase: 'out', label: 'Breathe Out', duration: 4000 },
];

const BreathingExercise = React.memo(function BreathingExercise() {
  const [isActive, setIsActive] = useState(false);
  const [currentPhase, setCurrentPhase] = useState<BreathingPhase>('idle');
  const [cycles, setCycles] = useState(0);
  const [progress, setProgress] = useState(0);
  const [tick, setTick] = useState(0);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const startTimeRef = useRef<number>(0);
  const animFrameRef = useRef<number>(0);

  // Derived: current phase config
  const phaseConfig = useMemo(() => {
    if (currentPhase === 'idle') return null;
    return BREATHING_PHASES.find(p => p.phase === currentPhase) ?? BREATHING_PHASES[0];
  }, [currentPhase]);

  // Start/stop logic
  const start = useCallback(() => {
    setCycles(0);
    setCurrentPhase('in');
    setProgress(0);
    setIsActive(true);
    setTick(t => t + 1);
  }, []);

  const stop = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    if (animFrameRef.current) {
      cancelAnimationFrame(animFrameRef.current);
      animFrameRef.current = 0;
    }
    setIsActive(false);
    setCurrentPhase('idle');
    setProgress(0);
  }, []);

  // Phase transition effect
  useEffect(() => {
    if (!isActive || currentPhase === 'idle' || !phaseConfig) return;

    // Animate progress
    startTimeRef.current = performance.now();
    const duration = phaseConfig.duration;
    const tickAnim = (now: number) => {
      const elapsed = now - startTimeRef.current;
      const pct = Math.min(elapsed / duration, 1);
      setProgress(pct);
      if (pct < 1) {
        animFrameRef.current = requestAnimationFrame(tickAnim);
      }
    };
    animFrameRef.current = requestAnimationFrame(tickAnim);

    // Schedule next phase
    timerRef.current = setTimeout(() => {
      if (currentPhase === 'out') {
        setCycles(c => c + 1);
        setCurrentPhase('in');
      } else {
        const idx = BREATHING_PHASES.findIndex(p => p.phase === currentPhase);
        const nextPhase = BREATHING_PHASES[(idx + 1) % BREATHING_PHASES.length].phase;
        setCurrentPhase(nextPhase);
      }
      setProgress(0);
    }, duration);

    return () => {
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
        animFrameRef.current = 0;
      }
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [isActive, currentPhase, phaseConfig, tick]);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, []);

  // Circle size based on phase
  const getCircleScale = useMemo(() => {
    if (currentPhase === 'idle') return 0.6;
    if (currentPhase === 'in') return 0.6 + 0.4 * progress;
    if (currentPhase === 'hold') return 1.0;
    if (currentPhase === 'out') return 1.0 - 0.4 * progress;
    return 0.6;
  }, [currentPhase, progress]);

  const getPhaseColor = () => {
    switch (currentPhase) {
      case 'in': return 'text-emerald-400';
      case 'hold': return 'text-amber-400';
      case 'out': return 'text-sky-400';
      default: return 'text-slate-500';
    }
  };

  const getRingColor = () => {
    switch (currentPhase) {
      case 'in': return 'stroke-emerald-400';
      case 'hold': return 'stroke-amber-400';
      case 'out': return 'stroke-sky-400';
      default: return 'stroke-slate-700';
    }
  };

  const getGlowColor = () => {
    switch (currentPhase) {
      case 'in': return 'shadow-emerald-500/20';
      case 'hold': return 'shadow-amber-500/20';
      case 'out': return 'shadow-sky-500/20';
      default: return '';
    }
  };

  const circumference = 2 * Math.PI * 54;
  const strokeDashoffset = circumference * (1 - progress);

  return (
    <div className="glass-card p-5 animate-fadeUp stagger-2" style={{ opacity: 0 }}>
      <div className="flex items-center gap-2.5 mb-4">
        <div className="w-7 h-7 rounded-lg bg-sky-500/10 flex items-center justify-center flex-shrink-0">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#38bdf8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
            <path d="M12 6v6l4 2" />
          </svg>
        </div>
        <h3 className="text-xs font-bold text-white uppercase tracking-wider">Breathing Exercise</h3>
      </div>

      <p className="text-[11px] text-slate-400 leading-relaxed mb-5">
        A calming 4-4-4 breathing technique. Breathe in for 4 seconds, hold for 4 seconds, and breathe out for 4 seconds. Helps reduce anxiety and ground yourself.
      </p>

      {/* Breathing Circle */}
      <div className="flex flex-col items-center gap-4">
        <div className="relative w-40 h-40 flex items-center justify-center">
          {/* Background ring */}
          <svg className="absolute inset-0" viewBox="0 0 120 120" width="160" height="160" aria-hidden="true">
            <circle cx="60" cy="60" r="54" fill="none" strokeWidth="2" className={getRingColor()} opacity="0.15" />
            <circle
              cx="60" cy="60" r="54" fill="none" strokeWidth="2"
              className={getRingColor()}
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              transform="rotate(-90 60 60)"
              style={{ transition: 'stroke-dashoffset 0.1s linear' }}
            />
          </svg>

          {/* Animated circle */}
          <div
            className={`rounded-full flex items-center justify-center transition-transform duration-100 shadow-lg ${getGlowColor()}`}
            style={{
              width: `${100 * getCircleScale}px`,
              height: `${100 * getCircleScale}px`,
              background: currentPhase === 'idle'
                ? 'rgba(255,255,255,0.04)'
                : currentPhase === 'in'
                  ? 'rgba(16,185,129,0.12)'
                  : currentPhase === 'hold'
                    ? 'rgba(245,158,11,0.12)'
                    : 'rgba(56,189,248,0.12)',
              border: `2px solid ${
                currentPhase === 'idle'
                  ? 'rgba(255,255,255,0.08)'
                  : currentPhase === 'in'
                    ? 'rgba(16,185,129,0.3)'
                    : currentPhase === 'hold'
                      ? 'rgba(245,158,11,0.3)'
                      : 'rgba(56,189,248,0.3)'
              }`,
            }}
            role="img"
            aria-label={currentPhase === 'idle' ? 'Breathing exercise ready' : `Breathing phase: ${currentPhase}`}
          >
            <span className={`text-sm font-bold ${getPhaseColor()} transition-colors`} aria-hidden="true">
              {currentPhase === 'idle' ? (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                  <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
                  <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
                </svg>
              ) : (
                currentPhase === 'in' || currentPhase === 'out'
                  ? Math.ceil(progress * 4)
                  : '4'
              )}
            </span>
          </div>
        </div>

        {/* Phase Label */}
        <div className="text-center">
          <p className={`text-sm font-semibold ${getPhaseColor()} transition-colors`} aria-live="polite">
            {currentPhase === 'idle' ? 'Ready' : currentPhase === 'in' ? 'Breathe In' : currentPhase === 'hold' ? 'Hold' : 'Breathe Out'}
          </p>
          <p className="text-[10px] text-slate-500 mt-1">
            {isActive ? `${cycles} cycle${cycles !== 1 ? 's' : ''} completed` : 'Tap start to begin'}
          </p>
        </div>

        {/* Start / Stop Button */}
        <button
          onClick={isActive ? stop : start}
          aria-label={isActive ? 'Stop breathing exercise' : 'Start breathing exercise'}
          className={`mt-2 px-6 py-2.5 rounded-xl text-xs font-semibold transition-all active:scale-[0.98] ${
            isActive
              ? 'bg-red-500/15 text-red-400 border border-red-500/20 hover:bg-red-500/20'
              : 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/20 hover:bg-emerald-500/20'
          }`}
        >
          {isActive ? 'Stop' : 'Start'}
        </button>
      </div>
    </div>
  );
});

// ─── Daily Affirmation ────────────────────────────────────────────────────────

const AFFIRMATIONS: string[] = [
  "I am worthy of a healthy, vibrant life free from addiction.",
  "Every day in recovery is a victory worth celebrating.",
  "I have the strength to overcome any challenge that comes my way.",
  "My past does not define my future — I am creating a new story.",
  "I choose progress over perfection, one step at a time.",
  "I am surrounded by people who support my healing journey.",
  "My body is healing, my mind is clearing, and my spirit is growing.",
  "I am not alone in this journey — help is always available.",
  "Today, I choose self-compassion over self-criticism.",
  "I am resilient, and setbacks are temporary, not permanent.",
  "My recovery is a gift I give to myself and those who love me.",
  "I trust the process and honor my commitment to change.",
  "I deserve joy, peace, and fulfillment in my life.",
  "Every breath I take is a reminder of my strength to keep going.",
  "I am proud of how far I have come in my recovery journey.",
  "I release guilt and shame — they do not serve me anymore.",
  "New possibilities open for me as I continue to heal and grow.",
];

const DailyAffirmation = React.memo(function DailyAffirmation() {
  const affirmation = useMemo(() => {
    const dayIndex = getDayOfYear() % AFFIRMATIONS.length;
    return AFFIRMATIONS[dayIndex];
  }, []);

  return (
    <div className="glass-card p-5 animate-fadeUp stagger-3" style={{ opacity: 0 }}>
      <div className="flex items-center gap-2.5 mb-4">
        <div className="w-7 h-7 rounded-lg bg-violet-500/10 flex items-center justify-center flex-shrink-0">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#a78bfa" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z" />
            <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z" />
          </svg>
        </div>
        <div>
          <h3 className="text-xs font-bold text-white uppercase tracking-wider">Daily Affirmation</h3>
          <p className="text-[10px] text-slate-500 mt-0.5">
            {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}
          </p>
        </div>
      </div>

      <div className="rounded-xl bg-violet-500/[0.05] border border-violet-500/10 p-4">
        <div className="flex items-start gap-3">
          <svg className="w-6 h-6 text-violet-500/30 flex-shrink-0 mt-0.5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z" />
          </svg>
          <p className="text-sm text-slate-200 italic leading-relaxed font-light">
            {affirmation}
          </p>
        </div>
      </div>
    </div>
  );
});

// ─── Journaling Prompt ────────────────────────────────────────────────────────

const JOURNAL_PROMPTS: string[] = [
  "What triggered my desire to use today, and how did I respond?",
  "What are three things I am grateful for in my recovery journey?",
  "How has my body felt different since I started my recovery?",
  "What coping strategies worked well for me this week?",
  "Describe a moment this week when you felt proud of yourself.",
  "What relationships in my life support my recovery, and how can I nurture them?",
  "What emotions am I currently avoiding, and how can I face them safely?",
  "Write a letter to your future self, one year from now in recovery.",
  "What would I tell someone who is just starting their recovery journey?",
  "Identify a negative thought pattern and write a healthier alternative.",
  "What activities or hobbies bring me genuine joy without substances?",
  "How do I define 'recovery' for myself? Has this definition changed?",
  "What boundaries do I need to set to protect my sobriety?",
  "Describe your ideal sober day from morning to night.",
  "What lessons has addiction taught me that I can use positively?",
  "How can I be more patient and kind with myself during difficult moments?",
  "What role does community or support groups play in my recovery?",
  "What physical sensations in my body tell me I am stressed, and how can I respond?",
  "Write about a person who has inspired your recovery. What qualities do they have?",
  "What would my life look like in 5 years if I stay committed to recovery?",
  "Reflect on a craving you experienced. What helped you get through it?",
];

const JournalPrompt = React.memo(function JournalPrompt() {
  const [promptOffset, setPromptOffset] = useState(0);

  const todaysPrompt = useMemo(() => {
    const dayIndex = getDayOfYear() % JOURNAL_PROMPTS.length;
    return JOURNAL_PROMPTS[(dayIndex + promptOffset) % JOURNAL_PROMPTS.length];
  }, [promptOffset]);

  const nextPrompt = () => {
    setPromptOffset(prev => prev + 1);
  };

  return (
    <div className="glass-card p-5 animate-fadeUp stagger-4" style={{ opacity: 0 }}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-emerald-500/10 flex items-center justify-center flex-shrink-0">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M12 20h9" />
              <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
            </svg>
          </div>
          <h3 className="text-xs font-bold text-white uppercase tracking-wider">Journal Prompt</h3>
        </div>
        <button
          onClick={nextPrompt}
          aria-label="Show new journal prompt"
          className="px-3 py-1.5 rounded-lg text-[10px] text-emerald-400 font-medium bg-emerald-500/10 border border-emerald-500/15 hover:bg-emerald-500/15 transition-all active:scale-[0.98]"
        >
          New Prompt
        </button>
      </div>

      <div className="rounded-xl bg-emerald-500/[0.05] border border-emerald-500/10 p-4">
        <div className="flex items-start gap-3">
          <span className="text-lg flex-shrink-0 mt-0.5" aria-hidden="true">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
              <path d="M12 17h.01" />
            </svg>
          </span>
          <p className="text-sm text-slate-200 leading-relaxed font-light">
            {todaysPrompt}
          </p>
        </div>
      </div>

      <p className="text-[10px] text-slate-500 mt-3 text-center">
        Take a few minutes to write your thoughts. There are no wrong answers.
      </p>
    </div>
  );
});

// ─── SubTab Navigation ────────────────────────────────────────────────────────

const SubTabNav = React.memo(function SubTabNav({ active, onChange }: { active: SubTab; onChange: (tab: SubTab) => void }) {
  const tabs: { id: SubTab; label: string; icon: React.ReactNode }[] = [
    { id: 'comparative', label: 'Comparative Minds', icon: <GitBranchIcon className="w-3.5 h-3.5" /> },
    { id: 'wellness', label: 'Wellness Tools', icon: <HeartPulseIcon className="w-3.5 h-3.5" /> },
    { id: 'contemplative', label: 'Contemplative', icon: <SparklesIcon className="w-3.5 h-3.5" /> },
  ];

  return (
    <div className="glass-card p-1.5 flex animate-fadeUp stagger-1" style={{ opacity: 0 }} role="tablist" aria-label="Mind & Psychology sections">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          role="tab"
          aria-selected={active === tab.id}
          aria-label={tab.label}
          onClick={() => onChange(tab.id)}
          className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 px-2 rounded-xl text-xs font-medium transition-all active:scale-[0.99] ${
            active === tab.id
              ? 'bg-purple-500/15 text-purple-400 border border-purple-500/20 shadow-sm shadow-purple-500/10'
              : 'text-slate-400 hover:text-slate-300 border border-transparent'
          }`}
        >
          {tab.icon}
          <span className="hidden sm:inline">{tab.label}</span>
          <span className="sm:hidden">{tab.label.split(' ')[0]}</span>
        </button>
      ))}
    </div>
  );
});

// ─── Expandable Section ───────────────────────────────────────────────────────

const ExpandButton = React.memo(function ExpandButton({
  isExpanded,
  onClick,
  label,
  labelCollapsed,
}: {
  isExpanded: boolean;
  onClick: () => void;
  label: string;
  labelCollapsed?: string;
}) {
  return (
    <button
      onClick={onClick}
      aria-expanded={isExpanded}
      aria-label={isExpanded ? label : (labelCollapsed || label)}
      className="w-full flex items-center justify-center gap-1.5 py-2.5 border-t border-white/[0.05] text-[10px] text-slate-500 hover:text-purple-400 hover:bg-white/[0.02] transition-all active:scale-[0.99]"
    >
      {isExpanded ? label : (labelCollapsed || label)}
      <ChevronDownIcon className={`w-3 h-3 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`} />
    </button>
  );
});

// ─── Comparative Minds Tab ────────────────────────────────────────────────────

const ComparativeMindsTab = React.memo(function ComparativeMindsTab() {
  const [expandedCards, setExpandedCards] = useState<Set<string>>(new Set());
  const [expandedPractices, setExpandedPractices] = useState<Set<string>>(new Set());
  const [expandedScience, setExpandedScience] = useState<Set<string>>(new Set());

  const toggleCard = (id: string) => {
    setExpandedCards((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const togglePractices = (id: string) => {
    setExpandedPractices((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const toggleScience = (id: string) => {
    setExpandedScience((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <div className="space-y-4 pb-6">
      {/* Hero Intro */}
      <div className="glass-card-hero p-5 animate-fadeUp stagger-1" style={{ opacity: 0 }}>
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-violet-500 flex items-center justify-center shadow-lg shadow-purple-500/15">
            <BrainIcon className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white">Comparative Minds</h2>
            <p className="text-xs text-slate-400">Addiction vs. Recovery mindset shifts</p>
          </div>
        </div>
        <p className="text-[11px] text-slate-400 leading-relaxed">
          Understanding the fundamental mindset differences between active addiction and recovery is crucial for lasting change. Each card below contrasts these two worlds and provides actionable practices for transformation.
        </p>
      </div>

      {/* Mindset Cards */}
      <div className="space-y-4">
        {COMPARATIVE_MINDSETS.map((mindset: ComparativeMindset, idx: number) => {
          const isExpanded = expandedCards.has(mindset.id);
          const hasPracticesOpen = expandedPractices.has(mindset.id);
          const hasScienceOpen = expandedScience.has(mindset.id);
          const staggerClass = getStaggerClass(idx);

          return (
            <div
              key={mindset.id}
              className={`glass-card overflow-hidden animate-fadeUp ${staggerClass}`}
              style={staggerClass ? { opacity: 0 } : undefined}
            >
              {/* Card Header */}
              <div className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-lg font-bold text-white flex-1">{mindset.name}</h3>
                  <span className="text-[10px] text-slate-500 flex-shrink-0 mt-1.5">#{idx + 1}</span>
                </div>
                <p className="text-[11px] text-slate-400 leading-relaxed mb-4">{mindset.description}</p>

                {/* Side-by-side Comparison */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {/* Addiction Mindset */}
                  <div className="rounded-xl bg-red-500/[0.06] border border-red-500/15 p-3">
                    <p className="text-xs font-semibold text-red-400 mb-2 flex items-center gap-1.5">
                      <FlameIcon className="w-3.5 h-3.5" />
                      Addiction Mindset
                    </p>
                    <p className="text-[11px] text-slate-400 leading-relaxed italic">{mindset.addictionMindset}</p>
                  </div>

                  {/* Recovery Mindset */}
                  <div className="rounded-xl bg-emerald-500/[0.06] border border-emerald-500/15 p-3">
                    <p className="text-xs font-semibold text-emerald-400 mb-2 flex items-center gap-1.5">
                      <SparklesIcon className="w-3.5 h-3.5" />
                      Recovery Mindset
                    </p>
                    <p className="text-[11px] text-slate-400 leading-relaxed italic">{mindset.recoveryMindset}</p>
                  </div>
                </div>

                {/* Key Shift */}
                <div className="mt-3 rounded-xl bg-purple-500/[0.06] border border-purple-500/15 p-3">
                  <p className="text-xs font-semibold text-purple-400 mb-1.5 flex items-center gap-1.5">
                    <ArrowRightIcon className="w-3 h-3" />
                    Key Shift
                  </p>
                  <p className="text-[11px] text-slate-300 leading-relaxed">{mindset.keyShift}</p>
                </div>
              </div>

              {/* Expand: Practices + Science */}
              <ExpandButton
                isExpanded={isExpanded}
                onClick={() => toggleCard(mindset.id)}
                label="Less"
                labelCollapsed="Practices & Science"
              />

              {isExpanded && (
                <div id={`mindset-detail-${mindset.id}`} className="px-4 pb-4 space-y-3 border-t border-white/[0.05] pt-3 animate-fadeUp" style={{ opacity: 0 }}>
                  {/* Expandable Practices */}
                  <button
                    onClick={() => togglePractices(mindset.id)}
                    aria-expanded={hasPracticesOpen}
                    aria-controls={`mindset-practices-${mindset.id}`}
                    aria-label={`${hasPracticesOpen ? 'Hide' : 'Show'} practices for ${mindset.name}`}
                    className="w-full flex items-center justify-between p-3 rounded-xl bg-white/[0.03] border border-white/[0.06] hover:bg-white/[0.05] transition-all active:scale-[0.99]"
                  >
                    <span className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                      <ZapIcon className="w-3.5 h-3.5 text-purple-400" />
                      Practices ({mindset.practices.length})
                    </span>
                    <ChevronDownIcon className={`w-3 h-3 text-slate-500 transition-transform duration-200 ${hasPracticesOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {hasPracticesOpen && (
                    <div id={`mindset-practices-${mindset.id}`} className="space-y-2 pl-1 animate-fadeUp" style={{ opacity: 0 }}>
                      {mindset.practices.map((practice, i) => (
                        <div key={i} className="flex items-start gap-2">
                          <span className="w-5 h-5 rounded-md bg-purple-500/15 flex items-center justify-center flex-shrink-0 mt-0.5 text-[10px] font-bold text-purple-400">
                            {i + 1}
                          </span>
                          <p className="text-[11px] text-slate-400 leading-relaxed">{practice}</p>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Expandable Science */}
                  <button
                    onClick={() => toggleScience(mindset.id)}
                    aria-expanded={hasScienceOpen}
                    aria-controls={`mindset-science-${mindset.id}`}
                    aria-label={`${hasScienceOpen ? 'Hide' : 'Show'} science for ${mindset.name}`}
                    className="w-full flex items-center justify-between p-3 rounded-xl bg-white/[0.03] border border-white/[0.06] hover:bg-white/[0.05] transition-all active:scale-[0.99]"
                  >
                    <span className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                      <BookOpenIcon className="w-3.5 h-3.5 text-sky-400" />
                      The Science
                    </span>
                    <ChevronDownIcon className={`w-3 h-3 text-slate-500 transition-transform duration-200 ${hasScienceOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {hasScienceOpen && (
                    <div id={`mindset-science-${mindset.id}`} className="rounded-xl bg-sky-500/[0.04] border border-sky-500/10 p-3 animate-fadeUp" style={{ opacity: 0 }}>
                      <p className="text-[11px] text-slate-400 leading-relaxed">{mindset.science}</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
});

// ─── Wellness Tools Tab ───────────────────────────────────────────────────────

const WellnessToolsTab = React.memo(function WellnessToolsTab() {
  const [expandedCards, setExpandedCards] = useState<Set<string>>(new Set());
  const [expandedSteps, setExpandedSteps] = useState<Set<string>>(new Set());
  const [expandedBenefits, setExpandedBenefits] = useState<Set<string>>(new Set());

  const toggleCard = (id: string) => {
    setExpandedCards((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const toggleSteps = (id: string) => {
    setExpandedSteps((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const toggleBenefits = (id: string) => {
    setExpandedBenefits((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const getCategoryBadge = (category: WellnessTool['category']) => {
    switch (category) {
      case 'cognitive':
        return 'bg-sky-500/15 text-sky-400 border-sky-500/20';
      case 'somatic':
        return 'bg-emerald-500/15 text-emerald-400 border-emerald-500/20';
      case 'behavioral':
        return 'bg-amber-500/15 text-amber-400 border-amber-500/20';
      case 'social':
        return 'bg-violet-500/15 text-violet-400 border-violet-500/20';
      case 'spiritual':
        return 'bg-purple-500/15 text-purple-400 border-purple-500/20';
      default:
        return 'bg-slate-500/15 text-slate-400 border-slate-500/20';
    }
  };

  const getCategoryIcon = (category: WellnessTool['category']) => {
    switch (category) {
      case 'cognitive':
        return (
          <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M12 2a8 8 0 0 0-8 8c0 6 8 12 8 12s8-6 8-12a8 8 0 0 0-8-8Z" />
            <circle cx="12" cy="10" r="3" />
          </svg>
        );
      case 'somatic':
        return (
          <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M18 20V10" /><path d="M12 20V4" /><path d="M6 20v-6" />
          </svg>
        );
      case 'behavioral':
        return (
          <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
          </svg>
        );
      case 'social':
        return (
          <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
            <circle cx="9" cy="7" r="4" />
            <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
            <path d="M16 3.13a4 4 0 0 1 0 7.75" />
          </svg>
        );
      case 'spiritual':
        return (
          <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2Z" />
            <path d="M12 6v6l4 2" />
          </svg>
        );
      default:
        return null;
    }
  };

  const getDifficultyColor = (difficulty: WellnessTool['difficulty']) => {
    switch (difficulty) {
      case 'Beginner':
        return 'bg-emerald-500/15 text-emerald-400 border-emerald-500/20';
      case 'Intermediate':
        return 'bg-amber-500/15 text-amber-400 border-amber-500/20';
      case 'Advanced':
        return 'bg-red-500/15 text-red-400 border-red-500/20';
      default:
        return 'bg-slate-500/15 text-slate-400 border-slate-500/20';
    }
  };

  return (
    <div className="space-y-4 pb-6">
      {/* Hero Intro */}
      <div className="glass-card-hero p-5 animate-fadeUp stagger-1" style={{ opacity: 0 }}>
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center shadow-lg shadow-emerald-500/15">
            <HeartPulseIcon className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white">Wellness Tools</h2>
            <p className="text-xs text-slate-400">Evidence-based exercises for recovery</p>
          </div>
        </div>
        <p className="text-[11px] text-slate-400 leading-relaxed">
          Practical, scientifically-backed tools you can use right now to manage cravings, reduce anxiety, and build resilience. Each tool includes step-by-step instructions.
        </p>
      </div>

      {/* Tool Cards */}
      <div className="space-y-4">
        {WELLNESS_TOOLS.map((tool: WellnessTool, idx: number) => {
          const isExpanded = expandedCards.has(tool.id);
          const hasStepsOpen = expandedSteps.has(tool.id);
          const hasBenefitsOpen = expandedBenefits.has(tool.id);
          const staggerClass = getStaggerClass(idx);

          return (
            <div
              key={tool.id}
              className={`glass-card overflow-hidden animate-fadeUp ${staggerClass}`}
              style={staggerClass ? { opacity: 0 } : undefined}
            >
              {/* Card Header */}
              <div className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-lg font-bold text-white flex-1">{tool.name}</h3>
                </div>
                <p className="text-[11px] text-slate-400 leading-relaxed mb-3">{tool.description}</p>

                {/* Badges Row */}
                <div className="flex items-center gap-2 flex-wrap">
                  <span className={`inline-flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-full border font-medium ${getCategoryBadge(tool.category)}`}>
                    {getCategoryIcon(tool.category)}
                    {tool.category}
                  </span>
                  <span className="inline-flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-full bg-white/[0.04] text-slate-400 border border-white/[0.08]">
                    <ClockIcon className="w-3 h-3" />
                    {tool.duration}
                  </span>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full border font-medium ${getDifficultyColor(tool.difficulty)}`}>
                    {tool.difficulty}
                  </span>
                </div>

                {/* When to Use */}
                <div className="mt-3 rounded-lg bg-amber-500/[0.04] border border-amber-500/10 p-2.5">
                  <p className="text-[10px] font-semibold text-amber-400 mb-0.5">When to Use</p>
                  <p className="text-[11px] text-slate-400 leading-relaxed">{tool.whenToUse}</p>
                </div>
              </div>

              {/* Expand: Steps + Benefits */}
              <ExpandButton
                isExpanded={isExpanded}
                onClick={() => toggleCard(tool.id)}
                label="Less"
                labelCollapsed="Steps & Benefits"
              />

              {isExpanded && (
                <div id={`tool-detail-${tool.id}`} className="px-4 pb-4 space-y-3 border-t border-white/[0.05] pt-3 animate-fadeUp" style={{ opacity: 0 }}>
                  {/* Expandable Steps */}
                  <button
                    onClick={() => toggleSteps(tool.id)}
                    aria-expanded={hasStepsOpen}
                    aria-controls={`tool-steps-${tool.id}`}
                    aria-label={`${hasStepsOpen ? 'Hide' : 'Show'} steps for ${tool.name}`}
                    className="w-full flex items-center justify-between p-3 rounded-xl bg-white/[0.03] border border-white/[0.06] hover:bg-white/[0.05] transition-all active:scale-[0.99]"
                  >
                    <span className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                      <ZapIcon className="w-3.5 h-3.5 text-purple-400" />
                      Step-by-Step ({tool.steps.length} steps)
                    </span>
                    <ChevronDownIcon className={`w-3 h-3 text-slate-500 transition-transform duration-200 ${hasStepsOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {hasStepsOpen && (
                    <div id={`tool-steps-${tool.id}`} className="space-y-2 pl-1 animate-fadeUp" style={{ opacity: 0 }}>
                      {tool.steps.map((step, i) => (
                        <div key={i} className="flex items-start gap-2.5">
                          <span className="w-5 h-5 rounded-full bg-purple-500/15 flex items-center justify-center flex-shrink-0 mt-0.5 text-[10px] font-bold text-purple-400">
                            {i + 1}
                          </span>
                          <p className="text-[11px] text-slate-400 leading-relaxed">{step}</p>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Expandable Benefits */}
                  <button
                    onClick={() => toggleBenefits(tool.id)}
                    aria-expanded={hasBenefitsOpen}
                    aria-controls={`tool-benefits-${tool.id}`}
                    aria-label={`${hasBenefitsOpen ? 'Hide' : 'Show'} benefits for ${tool.name}`}
                    className="w-full flex items-center justify-between p-3 rounded-xl bg-white/[0.03] border border-white/[0.06] hover:bg-white/[0.05] transition-all active:scale-[0.99]"
                  >
                    <span className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                      <HeartPulseIcon className="w-3.5 h-3.5 text-emerald-400" />
                      Benefits ({tool.benefits.length})
                    </span>
                    <ChevronDownIcon className={`w-3 h-3 text-slate-500 transition-transform duration-200 ${hasBenefitsOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {hasBenefitsOpen && (
                    <div id={`tool-benefits-${tool.id}`} className="space-y-1.5 pl-1 animate-fadeUp" style={{ opacity: 0 }}>
                      {tool.benefits.map((benefit, i) => (
                        <div key={i} className="flex items-start gap-1.5">
                          <span className="text-emerald-500 mt-1.5 flex-shrink-0 text-[11px] leading-none">+</span>
                          <p className="text-[11px] text-slate-400 leading-relaxed">{benefit}</p>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Science (always visible in expanded) */}
                  <div className="rounded-xl bg-sky-500/[0.04] border border-sky-500/10 p-3">
                    <p className="text-[10px] font-semibold text-sky-400 mb-1">How It Works</p>
                    <p className="text-[11px] text-slate-400 leading-relaxed">{tool.science}</p>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
});

// ─── Contemplative Tab ────────────────────────────────────────────────────────

const ContemplativeTab = React.memo(function ContemplativeTab() {
  const [expandedCards, setExpandedCards] = useState<Set<string>>(new Set());
  const [activeTheme, setActiveTheme] = useState<string>('all');

  const toggleCard = (id: string) => {
    setExpandedCards((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const filteredPractices = useMemo(() => {
    if (activeTheme === 'all') return CONTEMPLATIVE_PRACTICES;
    return CONTEMPLATIVE_PRACTICES.filter((p) => p.theme === activeTheme);
  }, [activeTheme]);

  const getThemeBadge = (theme: ContemplativePractice['theme']) => {
    switch (theme) {
      case 'grace':
        return 'bg-violet-500/15 text-violet-400 border-violet-500/20';
      case 'love':
        return 'bg-pink-500/15 text-pink-400 border-pink-500/20';
      case 'mercy':
        return 'bg-sky-500/15 text-sky-400 border-sky-500/20';
      case 'forgiveness':
        return 'bg-amber-500/15 text-amber-400 border-amber-500/20';
      case 'gratitude':
        return 'bg-emerald-500/15 text-emerald-400 border-emerald-500/20';
      case 'surrender':
        return 'bg-purple-500/15 text-purple-400 border-purple-500/20';
      default:
        return 'bg-slate-500/15 text-slate-400 border-slate-500/20';
    }
  };

  const getThemeEmoji = (theme: ContemplativePractice['theme']) => {
    switch (theme) {
      case 'grace': return '\u2728';
      case 'love': return '\u2764\uFE0F';
      case 'mercy': return '\uD83C\uDF1F';
      case 'forgiveness': return '\uD83D\uDD4A';
      case 'gratitude': return '\uD83C\uDF1E';
      case 'surrender': return '\uD83C\uDF08';
      default: return '\u2728';
    }
  };

  return (
    <div className="space-y-4 pb-6">
      {/* Hero Intro */}
      <div className="glass-card-hero p-5 animate-fadeUp stagger-1" style={{ opacity: 0 }}>
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-purple-500 flex items-center justify-center shadow-lg shadow-violet-500/15">
            <SparklesIcon className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white">Contemplative Practices</h2>
            <p className="text-xs text-slate-400">Guided meditations for healing</p>
          </div>
        </div>
        <p className="text-[11px] text-slate-400 leading-relaxed">
          Contemplative practices draw from ancient wisdom traditions and modern psychology to cultivate inner peace, self-compassion, and spiritual resilience on your recovery journey.
        </p>
      </div>

      {/* Theme Filter */}
      <div className="animate-fadeUp stagger-2" style={{ opacity: 0 }}>
        <div className="flex items-center gap-1.5 mb-2">
          <FilterIcon className="w-3.5 h-3.5 text-slate-500" />
          <p className="text-[10px] font-semibold text-slate-500">Filter by Theme</p>
        </div>
        <div className="flex gap-1.5 overflow-x-auto pb-1 -mx-1 px-1 no-scrollbar" role="group" aria-label="Filter contemplative practices by theme">
          <button
            onClick={() => setActiveTheme('all')}
            aria-pressed={activeTheme === 'all'}
            aria-label="Show all contemplative practices"
            className={`flex-shrink-0 px-3 py-1.5 rounded-lg text-[11px] font-medium transition-all border active:scale-[0.99] ${
              activeTheme === 'all'
                ? 'bg-purple-500/15 text-purple-400 border-purple-500/25'
                : 'bg-white/[0.03] text-slate-500 border-white/[0.06] hover:text-slate-300 hover:border-white/[0.12]'
            }`}
          >
            All
          </button>
          {CONTEMPLATIVE_THEMES.map((theme) => (
            <button
              key={theme}
              onClick={() => setActiveTheme(theme)}
              aria-pressed={activeTheme === theme}
              aria-label={`Filter by ${theme}`}
              className={`flex-shrink-0 px-3 py-1.5 rounded-lg text-[11px] font-medium transition-all border active:scale-[0.99] capitalize ${
                activeTheme === theme
                  ? 'bg-purple-500/15 text-purple-400 border-purple-500/25'
                  : 'bg-white/[0.03] text-slate-500 border-white/[0.06] hover:text-slate-300 hover:border-white/[0.12]'
              }`}
            >
              {getThemeEmoji(theme)} {theme}
            </button>
          ))}
        </div>
      </div>

      {/* Results Count */}
      <div className="animate-fadeUp stagger-3" style={{ opacity: 0 }}>
        <p className="text-[10px] text-slate-500">{filteredPractices.length} practice{filteredPractices.length !== 1 ? 's' : ''} available</p>
      </div>

      {/* Practice Cards */}
      <div className="space-y-4">
        {filteredPractices.map((practice: ContemplativePractice, idx: number) => {
          const isExpanded = expandedCards.has(practice.id);
          const staggerClass = getStaggerClass(idx);

          return (
            <div
              key={practice.id}
              className={`glass-card overflow-hidden animate-fadeUp ${staggerClass}`}
              style={staggerClass ? { opacity: 0 } : undefined}
            >
              {/* Card Header */}
              <div className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-lg font-bold text-white flex-1">{practice.name}</h3>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full border font-medium capitalize flex-shrink-0 ml-2 ${getThemeBadge(practice.theme)}`}>
                    {getThemeEmoji(practice.theme)} {practice.theme}
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 leading-relaxed mb-3">{practice.description}</p>

                {/* Meta Row */}
                <div className="flex items-center gap-3 flex-wrap">
                  <span className="inline-flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-full bg-white/[0.04] text-slate-400 border border-white/[0.08]">
                    <ClockIcon className="w-3 h-3" />
                    {practice.duration}
                  </span>
                  <span className="text-[10px] text-slate-500">{practice.origin}</span>
                </div>
              </div>

              {/* Expand: Script + Benefits */}
              <ExpandButton
                isExpanded={isExpanded}
                onClick={() => toggleCard(practice.id)}
                label="Less"
                labelCollapsed="Read Meditation Script"
              />

              {isExpanded && (
                <div id={`practice-detail-${practice.id}`} className="px-4 pb-4 space-y-4 border-t border-white/[0.05] pt-4 animate-fadeUp" style={{ opacity: 0 }}>
                  {/* Meditation Script - Special Styled Box */}
                  <div className="rounded-xl border border-purple-500/15 p-4" style={{ background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.06) 0%, rgba(17, 24, 39, 0.8) 100%)' }}>
                    <p className="text-[10px] font-semibold text-purple-400 mb-2 flex items-center gap-1.5">
                      <BookOpenIcon className="w-3.5 h-3.5" />
                      Meditation Script
                    </p>
                    <div className="whitespace-pre-line text-[12px] text-slate-300 italic leading-relaxed font-light">
                      {practice.script}
                    </div>
                  </div>

                  {/* Benefits */}
                  <div>
                    <p className="text-xs font-semibold text-emerald-400 mb-2 flex items-center gap-1.5">
                      <HeartPulseIcon className="w-3.5 h-3.5" />
                      Benefits
                    </p>
                    <ul className="space-y-1.5">
                      {practice.benefits.map((benefit, i) => (
                        <li key={i} className="flex items-start gap-1.5">
                          <span className="text-emerald-500 mt-1 flex-shrink-0 text-[11px] leading-none">+</span>
                          <p className="text-[11px] text-slate-400 leading-relaxed">{benefit}</p>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>
          );
        })}

        {/* Empty state */}
        {filteredPractices.length === 0 && (
          <div className="glass-card p-8 text-center animate-fadeUp" style={{ opacity: 0 }}>
            <SparklesIcon className="w-8 h-8 text-slate-600 mx-auto mb-3" />
            <p className="text-sm text-slate-500 font-medium">No practices found</p>
            <p className="text-xs text-slate-600 mt-1">Try a different theme filter</p>
          </div>
        )}
      </div>
    </div>
  );
});

// ─── Main Component ───────────────────────────────────────────────────────────

const MindPsychology = React.memo(function MindPsychology() {
  const [activeTab, setActiveTab] = useState<SubTab>('comparative');

  return (
    <div className="space-y-4 pb-6">
      {/* Header */}
      <div className="animate-fadeUp" style={{ opacity: 0 }}>
        <h2 className="text-lg font-bold text-white flex items-center gap-2">
          <BrainIcon className="w-5 h-5 text-purple-400" />
          Mind & Psychology
        </h2>
        <p className="text-xs text-slate-400 mt-0.5">Mental wellness framework for recovery</p>
      </div>

      {/* Quick Wellness Widgets */}
      <BreathingExercise />
      <DailyAffirmation />
      <JournalPrompt />

      {/* Sub-tab Navigation */}
      <SubTabNav active={activeTab} onChange={setActiveTab} />

      {/* Tab Content */}
      {activeTab === 'comparative' && <ComparativeMindsTab />}
      {activeTab === 'wellness' && <WellnessToolsTab />}
      {activeTab === 'contemplative' && <ContemplativeTab />}
    </div>
  );
});

export default MindPsychology;
