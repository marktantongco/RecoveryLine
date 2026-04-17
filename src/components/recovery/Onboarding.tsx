'use client';

import React, { useState, useCallback } from 'react';

// ─── Types ──────────────────────────────────────────────────────────────────────

interface OnboardingData {
  substances: string[];
  bodyWeight: number;
  medications: string[];
  healthConditions: string[];
  contemplativeEnabled: boolean;
}

const INITIAL_DATA: OnboardingData = {
  substances: [],
  bodyWeight: 0,
  medications: [],
  healthConditions: [],
  contemplativeEnabled: false,
};

// ─── Substance Options ──────────────────────────────────────────────────────────

const SUBSTANCES = [
  { id: 'meth', label: 'Methamphetamine', aliases: 'Shabu, Ice, Crystal' },
  { id: 'mdma', label: 'MDMA (Ecstasy)', aliases: 'E, Molly, X' },
  { id: 'cannabis', label: 'Cannabis', aliases: 'Weed, Pot, Mary Jane' },
  { id: 'ghb', label: 'GHB/GBL', aliases: 'G, Liquid E' },
  { id: 'cocaine', label: 'Cocaine', aliases: 'Coke, Crack, Blow' },
  { id: 'alcohol', label: 'Alcohol', aliases: 'Beer, Liquor, Ginebra' },
  { id: 'benzodiazepines', label: 'Benzodiazepines', aliases: 'Valium, Xanax, Rohypnol' },
  { id: 'ketamine', label: 'Ketamine', aliases: 'K, Special K' },
  { id: 'lsd', label: 'LSD', aliases: 'Acid, Tabs, Trips' },
  { id: 'nicotine', label: 'Nicotine', aliases: 'Cigarettes, Vape, Dip' },
  { id: 'heroin', label: 'Heroin', aliases: 'H, Smack, Brown' },
];

const MEDICATIONS = [
  { id: 'ssri', label: 'SSRI' },
  { id: 'maoi', label: 'MAOI' },
  { id: 'snri', label: 'SNRI' },
  { id: 'blood-thinners', label: 'Blood Thinners' },
  { id: 'seizure-med', label: 'Seizure Medication' },
];

const HEALTH_CONDITIONS = [
  { id: 'kidney', label: 'Kidney Disease' },
  { id: 'psychosis', label: 'Active Psychosis' },
  { id: 'liver', label: 'Liver Disease' },
  { id: 'heart', label: 'Heart Disease' },
  { id: 'bleeding', label: 'Bleeding Disorder' },
];

// ─── Screen Components ──────────────────────────────────────────────────────────

function Screen1_Welcome({ onNext }: { onNext: () => void }) {
  return (
    <div className="flex flex-col items-center text-center animate-fadeUp">
      {/* Shield Icon */}
      <div className="w-20 h-20 rounded-2xl flex items-center justify-center mb-6" style={{ backgroundColor: 'rgba(0, 170, 68, 0.15)' }}>
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#00AA44" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
          <path d="m9 12 2 2 4-4" />
        </svg>
      </div>

      <h1 className="text-3xl font-bold text-white mb-2 tracking-tight">RecoveryLine</h1>
      <p className="text-base text-emerald-400 font-medium mb-4">Your brain needs food, not judgment.</p>
      <p className="text-sm text-slate-400 leading-relaxed max-w-xs mb-8">
        Nutritional reconstruction for substance recovery. Evidence-based. Privacy-first. Made for the Philippines.
      </p>

      <button
        onClick={onNext}
        className="w-full max-w-xs py-3.5 rounded-xl bg-sky-500 text-white font-semibold text-sm shadow-lg shadow-sky-500/25 hover:bg-sky-400 active:scale-[0.98] transition-all"
      >
        Get Started
      </button>

      {/* Dot indicators */}
      <div className="flex items-center gap-2 mt-8" aria-live="polite">
        {[0, 1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${i === 0 ? 'bg-sky-400 w-6' : 'bg-white/15'}`}
          />
        ))}
      </div>
    </div>
  );
}

const Screen2_Substances = React.memo(function Screen2_Substances({ data, onChange, onBack, onNext }: {
  data: OnboardingData;
  onChange: (d: OnboardingData) => void;
  onBack: () => void;
  onNext: () => void;
}) {
  const toggleSubstance = (id: string) => {
    const updated = data.substances.includes(id)
      ? data.substances.filter((s) => s !== id)
      : [...data.substances, id];
    onChange({ ...data, substances: updated });
  };

  return (
    <div className="animate-fadeUp">
      <h2 className="text-xl font-bold text-white mb-1">What are you recovering from?</h2>
      <p className="text-xs text-slate-500 mb-5">Select all that apply. You can always update this later.</p>

      <div className="space-y-2 max-h-72 overflow-y-auto custom-scrollbar mb-5">
        {SUBSTANCES.map((sub) => {
          const isSelected = data.substances.includes(sub.id);
          return (
            <button
              key={sub.id}
              onClick={() => toggleSubstance(sub.id)}
              className={`w-full text-left p-3 rounded-xl border transition-all active:scale-[0.99] ${
                isSelected
                  ? 'bg-sky-500/10 border-sky-500/30 shadow-sm shadow-sky-500/10'
                  : 'bg-white/[0.03] border-white/[0.06] hover:border-white/15'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center flex-shrink-0 transition-all ${
                  isSelected ? 'bg-sky-500 border-sky-500' : 'border-white/20'
                }`}>
                  {isSelected && (
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <path d="m5 12 5 5L20 7" />
                    </svg>
                  )}
                </div>
                <div className="min-w-0">
                  <p className={`text-sm font-medium ${isSelected ? 'text-sky-300' : 'text-slate-300'}`}>{sub.label}</p>
                  <p className="text-[10px] text-slate-500">{sub.aliases}</p>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {data.substances.length === 0 && (
        <p className="text-[11px] text-amber-400/80 mb-4 flex items-center gap-1.5">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" /><path d="M12 8v4" /><path d="M12 16h.01" />
          </svg>
          Select at least one to continue
        </p>
      )}

      <div className="flex items-center gap-3">
        <button
          onClick={onBack}
          className="flex-1 py-3 rounded-xl bg-white/5 text-slate-400 border border-white/10 text-sm font-medium hover:bg-white/10 active:scale-[0.98] transition-all"
        >
          Back
        </button>
        <button
          onClick={onNext}
          disabled={data.substances.length === 0}
          className="flex-1 py-3 rounded-xl bg-sky-500 text-white text-sm font-semibold shadow-lg shadow-sky-500/25 hover:bg-sky-400 active:scale-[0.98] transition-all disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Next
        </button>
      </div>

      {/* Dot indicators */}
      <div className="flex items-center justify-center gap-2 mt-6" aria-live="polite">
        {[0, 1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${i === 1 ? 'bg-sky-400 w-6' : 'bg-white/15'}`}
          />
        ))}
      </div>
    </div>
  );
});

const Screen3_HealthProfile = React.memo(function Screen3_HealthProfile({ data, onChange, onBack, onNext }: {
  data: OnboardingData;
  onChange: (d: OnboardingData) => void;
  onBack: () => void;
  onNext: () => void;
}) {
  const toggleMedication = (id: string) => {
    const updated = data.medications.includes(id)
      ? data.medications.filter((m) => m !== id)
      : [...data.medications, id];
    onChange({ ...data, medications: updated });
  };

  const toggleCondition = (id: string) => {
    const updated = data.healthConditions.includes(id)
      ? data.healthConditions.filter((c) => c !== id)
      : [...data.healthConditions, id];
    onChange({ ...data, healthConditions: updated });
  };

  return (
    <div className="animate-fadeUp">
      <h2 className="text-xl font-bold text-white mb-1">Health Profile</h2>
      <p className="text-xs text-slate-500 mb-5">Helps us tailor safe nutritional recommendations.</p>

      {/* Body Weight */}
      <div className="mb-5">
        <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 block">Body Weight (kg)</label>
        <input
          type="number"
          inputMode="decimal"
          placeholder="e.g. 65"
          value={data.bodyWeight || ''}
          onChange={(e) => onChange({ ...data, bodyWeight: parseFloat(e.target.value) || 0 })}
          className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 text-white text-sm placeholder:text-slate-600 focus:outline-none focus:border-sky-500/40 focus:ring-1 focus:ring-sky-500/20 transition-all"
        />
      </div>

      {/* Current Medications */}
      <div className="mb-5">
        <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 block">Current Medications</label>
        <div className="space-y-2">
          {MEDICATIONS.map((med) => {
            const isSelected = data.medications.includes(med.id);
            return (
              <button
                key={med.id}
                onClick={() => toggleMedication(med.id)}
                className={`w-full text-left p-2.5 rounded-xl border transition-all active:scale-[0.99] flex items-center gap-3 ${
                  isSelected
                    ? 'bg-purple-500/10 border-purple-500/25'
                    : 'bg-white/[0.02] border-white/[0.05] hover:border-white/12'
                }`}
              >
                <div className={`w-4 h-4 rounded border-2 flex items-center justify-center flex-shrink-0 transition-all ${
                  isSelected ? 'bg-purple-500 border-purple-500' : 'border-white/20'
                }`}>
                  {isSelected && (
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <path d="m5 12 5 5L20 7" />
                    </svg>
                  )}
                </div>
                <span className={`text-sm ${isSelected ? 'text-purple-300' : 'text-slate-400'}`}>{med.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Health Conditions */}
      <div className="mb-5">
        <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 block">Health Conditions</label>
        <div className="space-y-2">
          {HEALTH_CONDITIONS.map((cond) => {
            const isSelected = data.healthConditions.includes(cond.id);
            return (
              <button
                key={cond.id}
                onClick={() => toggleCondition(cond.id)}
                className={`w-full text-left p-2.5 rounded-xl border transition-all active:scale-[0.99] flex items-center gap-3 ${
                  isSelected
                    ? 'bg-amber-500/10 border-amber-500/25'
                    : 'bg-white/[0.02] border-white/[0.05] hover:border-white/12'
                }`}
              >
                <div className={`w-4 h-4 rounded border-2 flex items-center justify-center flex-shrink-0 transition-all ${
                  isSelected ? 'bg-amber-500 border-amber-500' : 'border-white/20'
                }`}>
                  {isSelected && (
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <path d="m5 12 5 5L20 7" />
                    </svg>
                  )}
                </div>
                <span className={`text-sm ${isSelected ? 'text-amber-300' : 'text-slate-400'}`}>{cond.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button
          onClick={onBack}
          className="flex-1 py-3 rounded-xl bg-white/5 text-slate-400 border border-white/10 text-sm font-medium hover:bg-white/10 active:scale-[0.98] transition-all"
        >
          Back
        </button>
        <button
          onClick={onNext}
          className="flex-1 py-3 rounded-xl bg-sky-500 text-white text-sm font-semibold shadow-lg shadow-sky-500/25 hover:bg-sky-400 active:scale-[0.98] transition-all"
        >
          Next
        </button>
      </div>

      {/* Dot indicators */}
      <div className="flex items-center justify-center gap-2 mt-6" aria-live="polite">
        {[0, 1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${i === 2 ? 'bg-sky-400 w-6' : 'bg-white/15'}`}
          />
        ))}
      </div>
    </div>
  );
});

const Screen4_Contemplative = React.memo(function Screen4_Contemplative({ data, onChange, onBack, onNext }: {
  data: OnboardingData;
  onChange: (d: OnboardingData) => void;
  onBack: () => void;
  onNext: () => void;
}) {
  return (
    <div className="animate-fadeUp">
      <h2 className="text-xl font-bold text-white mb-1">Contemplative Track</h2>
      <p className="text-xs text-slate-500 mb-5">Optional. Enable secular mindfulness and reflection exercises.</p>

      <div className="glass-card-hero p-4 mb-5">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-xl bg-violet-500/15 flex items-center justify-center flex-shrink-0">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#a78bfa" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
            </svg>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-white mb-1">Secular CBT/ACT Exercises</h3>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              Mindfulness, meditation, and cognitive exercises based on Cognitive Behavioral Therapy (CBT) and Acceptance & Commitment Therapy (ACT). No religious content. Science-backed techniques for managing cravings, anxiety, and emotional regulation during recovery.
            </p>
          </div>
        </div>
      </div>

      {/* Toggle Switch */}
      <div className="flex items-center justify-between p-4 rounded-xl bg-white/[0.03] border border-white/[0.06] mb-5">
        <div>
          <p className="text-sm font-medium text-slate-300">Enable Contemplative Content</p>
          <p className="text-[10px] text-slate-500 mt-0.5">CBT grounding, meditation, journal prompts</p>
        </div>
        <button
          onClick={() => onChange({ ...data, contemplativeEnabled: !data.contemplativeEnabled })}
          className={`relative w-12 h-7 rounded-full transition-all duration-300 flex-shrink-0 active:scale-95 ${
            data.contemplativeEnabled ? 'bg-sky-500' : 'bg-white/15'
          }`}
          role="switch"
          aria-checked={data.contemplativeEnabled}
          aria-label="Toggle contemplative content"
        >
          <div
            className={`absolute top-0.5 w-6 h-6 rounded-full bg-white shadow-md transition-transform duration-300 ${
              data.contemplativeEnabled ? 'translate-x-5.5' : 'translate-x-0.5'
            }`}
            style={{ transform: data.contemplativeEnabled ? 'translateX(22px)' : 'translateX(2px)' }}
          />
        </button>
      </div>

      <div className="flex items-center gap-3">
        <button
          onClick={onBack}
          className="flex-1 py-3 rounded-xl bg-white/5 text-slate-400 border border-white/10 text-sm font-medium hover:bg-white/10 active:scale-[0.98] transition-all"
        >
          Back
        </button>
        <button
          onClick={onNext}
          className="flex-1 py-3 rounded-xl bg-sky-500 text-white text-sm font-semibold shadow-lg shadow-sky-500/25 hover:bg-sky-400 active:scale-[0.98] transition-all"
        >
          Next
        </button>
      </div>

      {/* Dot indicators */}
      <div className="flex items-center justify-center gap-2 mt-6" aria-live="polite">
        {[0, 1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${i === 3 ? 'bg-sky-400 w-6' : 'bg-white/15'}`}
          />
        ))}
      </div>
    </div>
  );
});

function Screen5_Completion({ onComplete }: { onComplete: () => void }) {
  return (
    <div className="flex flex-col items-center text-center animate-fadeUp">
      <div className="text-6xl mb-5">{'\ud83c\udf31'}</div>

      <h2 className="text-2xl font-bold text-white mb-2">You&apos;re all set</h2>
      <p className="text-sm text-slate-400 leading-relaxed max-w-xs mb-8">
        Your personalized recovery protocol is ready. We&apos;ve tailored nutritional guidance, wellness tools, and tracking based on your profile.
      </p>

      <button
        onClick={onComplete}
        className="w-full max-w-xs py-3.5 rounded-xl bg-sky-500 text-white font-semibold text-sm shadow-lg shadow-sky-500/25 hover:bg-sky-400 active:scale-[0.98] transition-all"
      >
        Start Recovery
      </button>

      {/* Dot indicators */}
      <div className="flex items-center gap-2 mt-8" aria-live="polite">
        {[0, 1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${i === 4 ? 'bg-sky-400 w-6' : 'bg-white/15'}`}
          />
        ))}
      </div>
    </div>
  );
}

// ─── Main Onboarding Component ──────────────────────────────────────────────────

export default function Onboarding() {
  const [screen, setScreen] = useState(0);
  const [data, setData] = useState<OnboardingData>(INITIAL_DATA);
  const [slideDir, setSlideDir] = useState<'right' | 'left'>('right');

  const goNext = useCallback(() => {
    setSlideDir('right');
    setScreen((s) => Math.min(s + 1, 4));
  }, []);

  const goBack = useCallback(() => {
    setSlideDir('left');
    setScreen((s) => Math.max(s - 1, 0));
  }, []);

  const handleComplete = useCallback(() => {
    // Save onboarding state and profile data to localStorage
    try {
      localStorage.setItem('recoveryline_onboarded', 'true');
      localStorage.setItem('recoveryline_profile', JSON.stringify(data));
    } catch (err) {
      console.error('[RecoveryLine] Failed to save onboarding data:', err);
    }
    // Force reload to re-evaluate onboarding gate
    window.location.reload();
  }, [data]);

  const renderScreen = () => {
    // Screen 0 uses fadeUp on initial mount, directional slides when navigating back
    const animClass = screen === 0 && slideDir === 'right'
      ? 'animate-fadeUp'
      : slideDir === 'right' ? 'animate-slideInRight' : 'animate-slideInLeft';

    switch (screen) {
      case 0:
        return (
          <div className={animClass}>
            <Screen1_Welcome onNext={goNext} />
          </div>
        );
      case 1:
        return (
          <div className={animClass}>
            <Screen2_Substances data={data} onChange={setData} onBack={goBack} onNext={goNext} />
          </div>
        );
      case 2:
        return (
          <div className={animClass}>
            <Screen3_HealthProfile data={data} onChange={setData} onBack={goBack} onNext={goNext} />
          </div>
        );
      case 3:
        return (
          <div className={animClass}>
            <Screen4_Contemplative data={data} onChange={setData} onBack={goBack} onNext={goNext} />
          </div>
        );
      case 4:
        return (
          <div className={animClass}>
            <Screen5_Completion onComplete={handleComplete} />
          </div>
        );
      default:
        return (
          <div className="animate-fadeUp">
            <Screen1_Welcome onNext={goNext} />
          </div>
        );
    }
  };

  return (
    <div className="min-h-[100dvh] min-h-screen bg-[#0a0f1a] flex items-center justify-center p-6 overflow-y-auto">
      {/* Background decorative elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-32 -right-32 w-64 h-64 rounded-full bg-sky-500/5 blur-3xl" />
        <div className="absolute -bottom-32 -left-32 w-64 h-64 rounded-full bg-emerald-500/5 blur-3xl" />
      </div>

      <div className="w-full max-w-sm glass-card-hero p-6 relative overflow-hidden" role="dialog" aria-label="Onboarding" aria-modal="true">
        <div className="relative">
          <div key={screen}>
            {renderScreen()}
          </div>
        </div>
      </div>
    </div>
  );
}
