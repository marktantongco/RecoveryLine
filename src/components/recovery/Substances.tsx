'use client';

import React, { useState, useMemo, useRef, useEffect, useCallback } from 'react';
import { SUBSTANCES, SUBSTANCE_LIST } from '@/lib/substance-data';
import type { SubstanceData } from '@/lib/substance-data';
import { SYMBIOTIC_PROTOCOL } from '@/lib/recovery-protocol-data';

// --- Helpers ---

function getDangerGradient(level: number): string {
  switch (level) {
    case 5: return 'from-red-500 to-red-600';
    case 4: return 'from-orange-500 to-red-500';
    case 3: return 'from-amber-500 to-orange-500';
    case 2: return 'from-yellow-500 to-amber-500';
    default: return 'from-emerald-500 to-emerald-600';
  }
}

function getDangerDotColor(level: number): string {
  switch (level) {
    case 5: return 'bg-red-500';
    case 4: return 'bg-orange-500';
    case 3: return 'bg-amber-500';
    case 2: return 'bg-yellow-500';
    default: return 'bg-emerald-500';
  }
}

function getSeverityConfig(severity: string) {
  switch (severity) {
    case 'critical': return { color: 'text-red-400', bg: 'bg-red-500/15 border-red-500/25', label: 'CRITICAL' };
    case 'severe':   return { color: 'text-orange-400', bg: 'bg-orange-500/15 border-orange-500/25', label: 'SEVERE' };
    case 'moderate': return { color: 'text-amber-400', bg: 'bg-amber-500/15 border-amber-500/25', label: 'MODERATE' };
    case 'mild':     return { color: 'text-yellow-400', bg: 'bg-yellow-500/15 border-yellow-500/25', label: 'MILD' };
    default:         return { color: 'text-slate-400', bg: 'bg-white/5 border-white/10', label: severity.toUpperCase() };
  }
}

function getCategoryLabel(cat: string): string {
  switch (cat) {
    case 'stimulant': return 'Stimulant';
    case 'empathogen': return 'Empathogen';
    case 'depressant': return 'Depressant';
    case 'cannabinoid': return 'Cannabinoid';
    case 'dissociative': return 'Dissociative';
    default: return cat;
  }
}

// --- Section Header with SVG Icon ---

function SectionHeader({ icon, title }: { icon: React.ReactNode; title: string }) {
  return (
    <div className="flex items-center gap-2.5 mb-3">
      <div className="w-7 h-7 rounded-lg bg-white/5 flex items-center justify-center flex-shrink-0">
        {icon}
      </div>
      <h3 className="text-xs font-bold text-white uppercase tracking-wider">{title}</h3>
    </div>
  );
}

// --- SVG Icons (section headers) ---

const Icons = {
  damage: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
    </svg>
  ),
  pharmacology: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#a78bfa" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 3h6" /><path d="M10 9V3h4v6l5 8.5a2 2 0 0 1-1.7 3H6.7a2 2 0 0 1-1.7-3L10 9Z" />
    </svg>
  ),
  withdrawal: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2v4m0 12v4M4.93 4.93l2.83 2.83m8.48 8.48 2.83 2.83M2 12h4m12 0h4M4.93 19.07l2.83-2.83m8.48-8.48 2.83-2.83" />
    </svg>
  ),
  recovery: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <path d="m9 11 3 3L22 4" />
    </svg>
  ),
  philippines: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#f472b6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <path d="M2 12h20" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  ),
  harm: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#38bdf8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" />
    </svg>
  ),
  protocol: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  ),
  chevron: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m6 9 6 6 6-6" />
    </svg>
  ),
  brain: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#c084fc" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z" />
      <path d="M12 5a3 3 0 1 1 5.997.125 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A4 4 0 1 1 12 18Z" />
      <path d="M12 5v13" />
    </svg>
  ),
  search: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  ),
  x: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 6 6 18" /><path d="m6 6 12 12" />
    </svg>
  ),
};

// --- Header Card Tab Config ---
type HeaderTabId = 'damage' | 'reduction' | 'withdrawal';
const HEADER_TABS: { id: HeaderTabId; label: string; icon: string; count: string }[] = [
  { id: 'damage', label: '10 Damages', icon: '⚡', count: '10' },
  { id: 'reduction', label: '10 Reductions', icon: '🛡', count: '10' },
  { id: 'withdrawal', label: '10 Withdrawals', icon: '☀', count: '10' },
];
const DROPDOWN_AUTO_CLOSE_MS = 4000;

// --- Substance Detail View ---

const SubstanceDetail = React.memo(function SubstanceDetail({ substance }: { substance: SubstanceData }) {
  const [expandedDropdown, setExpandedDropdown] = useState<HeaderTabId | null>(null);
  const [supplementsExpanded, setSupplementsExpanded] = useState(false);
  const [protocolExpanded, setProtocolExpanded] = useState<string | null>(null);
  const autoCloseTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const sev = getSeverityConfig(substance.withdrawal.severity);

  // Auto-close dropdown after DROPDOWN_AUTO_CLOSE_MS
  const clearAutoClose = useCallback(() => {
    if (autoCloseTimer.current) {
      clearTimeout(autoCloseTimer.current);
      autoCloseTimer.current = null;
    }
  }, []);

  const scheduleAutoClose = useCallback(() => {
    clearAutoClose();
    autoCloseTimer.current = setTimeout(() => {
      setExpandedDropdown(null);
      autoCloseTimer.current = null;
    }, DROPDOWN_AUTO_CLOSE_MS);
  }, [clearAutoClose]);

  // Cleanup timer on unmount
  useEffect(() => {
    return () => clearAutoClose();
  }, [clearAutoClose]);

  const handleTabClick = useCallback((tabId: HeaderTabId) => {
    if (expandedDropdown === tabId) {
      // Same tab → collapse immediately
      clearAutoClose();
      setExpandedDropdown(null);
    } else {
      // Different tab → expand and start auto-close timer
      setExpandedDropdown(tabId);
      scheduleAutoClose();
    }
  }, [expandedDropdown, clearAutoClose, scheduleAutoClose]);

  return (
    <div className="space-y-4 pb-6">
      {/* --- Header Card with 3 Tabs --- */}
      <div className="glass-card-hero p-5 animate-fadeUp relative overflow-hidden">
        {/* Background danger accent */}
        <div className={`absolute top-0 right-0 w-32 h-32 rounded-full bg-gradient-to-br ${getDangerGradient(substance.dangerLevel)} opacity-[0.07] blur-2xl -translate-y-1/2 translate-x-1/2`} />

        <div className="relative">
          {/* Name + Category + Danger */}
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1 min-w-0">
              <h2 className="text-lg font-bold text-white leading-tight">{substance.name}</h2>
              <div className="flex items-center gap-2 mt-1.5 flex-wrap">
                <span className="px-2 py-0.5 rounded-md bg-white/10 text-[10px] font-semibold text-slate-300 uppercase tracking-wide border border-white/10">
                  {getCategoryLabel(substance.category)}
                </span>
                <div className="flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <span
                      key={i}
                      className={`w-2 h-2 rounded-full transition-all ${
                        i < substance.dangerLevel ? getDangerDotColor(substance.dangerLevel) : 'bg-white/10'
                      }`}
                    />
                  ))}
                  <span className="text-[10px] text-slate-500 ml-1">Danger {substance.dangerLevel}/5</span>
                </div>
              </div>
            </div>
            <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${getDangerGradient(substance.dangerLevel)} flex items-center justify-center shadow-lg flex-shrink-0`}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
                <line x1="12" y1="9" x2="12" y2="13" />
                <line x1="12" y1="17" x2="12.01" y2="17" />
              </svg>
            </div>
          </div>

          {/* Aliases */}
          <div className="mt-3 flex flex-wrap gap-1.5">
            {[...substance.aliases, ...substance.streetNames].slice(0, 8).map((name, i) => (
              <span key={i} className="px-2 py-0.5 rounded-md bg-white/5 text-[10px] text-slate-500 border border-white/5">
                {name}
              </span>
            ))}
          </div>

          {/* 3 Dropdown Tabs: Damages, Reductions, Withdrawals */}
          <div className="flex mt-4 gap-1.5">
            {HEADER_TABS.map((tab) => {
              const isOpen = expandedDropdown === tab.id;
              const tabColor = tab.id === 'damage'
                ? (isOpen ? 'bg-red-500/10 border-red-500/25 text-red-300' : 'bg-white/[0.04] border-white/[0.06] text-slate-400')
                : tab.id === 'reduction'
                ? (isOpen ? 'bg-sky-500/10 border-sky-500/25 text-sky-300' : 'bg-white/[0.04] border-white/[0.06] text-slate-400')
                : (isOpen ? 'bg-amber-500/10 border-amber-500/25 text-amber-300' : 'bg-white/[0.04] border-white/[0.06] text-slate-400');
              return (
                <button
                  key={tab.id}
                  onClick={() => handleTabClick(tab.id)}
                  className={`flex-1 py-2 px-2 rounded-xl text-[10px] font-medium transition-all border flex items-center justify-center gap-1 active:scale-[0.98] ${tabColor}`}
                >
                  <span className="text-xs">{tab.icon}</span>
                  <span className="leading-tight text-center">{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Dropdown Content — auto-reverts after 4s */}
          <div className="mt-3 relative overflow-hidden">
            {/* Damages Dropdown */}
            <div
              className={`transition-all duration-300 ease-in-out overflow-hidden ${
                expandedDropdown === 'damage'
                  ? 'max-h-[400px] opacity-100'
                  : 'max-h-0 opacity-0'
              }`}
            >
              <div className="max-h-48 overflow-y-auto custom-scrollbar space-y-1.5 mb-1">
                <p className="text-[10px] font-semibold text-red-400 uppercase tracking-wide mb-2">10 Damage Areas</p>
                {substance.primaryDamage.items.map((item, i) => (
                  <div key={i} className="flex items-start gap-2 p-2 rounded-lg bg-red-500/[0.04]">
                    <span className="w-5 h-5 rounded-md bg-red-500/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-[10px] font-bold text-red-400">{i + 1}</span>
                    </span>
                    <span className="text-[11px] text-slate-300 leading-relaxed">{item}</span>
                  </div>
                ))}
                <div className="rounded-xl bg-red-500/5 border border-red-500/10 p-3 mt-2">
                  <p className="text-[10px] font-semibold text-red-400 uppercase tracking-wide mb-1">Summary</p>
                  <p className="text-[11px] text-slate-400 leading-relaxed">{substance.primaryDamage.summary}</p>
                </div>
              </div>
            </div>

            {/* Reductions Dropdown */}
            <div
              className={`transition-all duration-300 ease-in-out overflow-hidden ${
                expandedDropdown === 'reduction'
                  ? 'max-h-[400px] opacity-100'
                  : 'max-h-0 opacity-0'
              }`}
            >
              <div className="max-h-48 overflow-y-auto custom-scrollbar space-y-1.5 mb-1">
                <p className="text-[10px] font-semibold text-sky-400 uppercase tracking-wide mb-2">10 Harm Reductions</p>
                {substance.harmReduction.map((tip, i) => (
                  <div key={i} className="flex items-start gap-2.5 p-2 rounded-lg bg-sky-500/[0.04]">
                    <span className="w-5 h-5 rounded-md bg-sky-500/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-[10px] font-bold text-sky-400">{i + 1}</span>
                    </span>
                    <p className="text-[11px] text-slate-300 leading-relaxed">{tip}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Withdrawals Dropdown */}
            <div
              className={`transition-all duration-300 ease-in-out overflow-hidden ${
                expandedDropdown === 'withdrawal'
                  ? 'max-h-[500px] opacity-100'
                  : 'max-h-0 opacity-0'
              }`}
            >
              <div className="max-h-56 overflow-y-auto custom-scrollbar mb-1">
                <p className="text-[10px] font-semibold text-amber-400 uppercase tracking-wide mb-2">10 Withdrawal Symptoms</p>
                {/* Timeline + Severity */}
                <div className="flex items-center gap-3 mb-2">
                  <div className="flex-1">
                    <p className="text-[10px] text-slate-500 uppercase tracking-wide mb-0.5">Timeline</p>
                    <p className="text-xs text-slate-300">{substance.withdrawal.timeline}</p>
                  </div>
                  <span className={`px-2.5 py-1 rounded-lg text-[10px] font-bold border ${sev.bg} ${sev.color}`}>
                    {sev.label}
                  </span>
                </div>
                {/* Symptoms */}
                <div className="space-y-1.5 mb-3">
                  {substance.withdrawal.symptoms.map((symptom, i) => (
                    <div key={i} className="flex items-start gap-2 p-2 rounded-lg bg-amber-500/[0.04]">
                      <span className="w-5 h-5 rounded-md bg-amber-500/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-[10px] font-bold text-amber-400">{i + 1}</span>
                      </span>
                      <span className="text-[11px] text-slate-300 leading-relaxed">{symptom}</span>
                    </div>
                  ))}
                </div>
                {/* PAWS */}
                <div className="rounded-xl bg-amber-500/5 border border-amber-500/10 p-3">
                  <p className="text-[10px] font-semibold text-amber-400 uppercase tracking-wide mb-1">Post-Acute Withdrawal (PAWS)</p>
                  <p className="text-[11px] text-slate-400 leading-relaxed">{substance.withdrawal.paws}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Description */}
          <p className="text-xs text-slate-400 leading-relaxed mt-1">{substance.description}</p>
        </div>
      </div>

      {/* --- RECOVERY FOCUS --- */}
      <div className="glass-card p-4 animate-fadeUp stagger-1" style={{ opacity: 0 }}>
        <SectionHeader icon={Icons.recovery} title="Recovery Focus" />

        {/* Neurotransmitters */}
        <div className="mb-3">
          <p className="text-[10px] text-slate-500 uppercase tracking-wide mb-1.5 flex items-center gap-1.5">
            {React.cloneElement(Icons.brain as React.ReactElement, { width: 11, height: 11 })}
            Neurotransmitters
          </p>
          <div className="flex flex-wrap gap-1.5">
            {substance.recoveryFocus.neurotransmitters.map((nt, i) => (
              <span key={i} className="px-2 py-0.5 rounded-md bg-emerald-500/10 text-[10px] text-emerald-400 border border-emerald-500/15 font-medium">
                {nt}
              </span>
            ))}
          </div>
        </div>

        {/* Organs */}
        <div className="mb-3">
          <p className="text-[10px] text-slate-500 uppercase tracking-wide mb-1.5">Organs & Systems</p>
          <div className="space-y-1">
            {substance.recoveryFocus.organs.map((organ, i) => (
              <div key={i} className="flex items-center gap-2">
                <span className="w-1 h-1 rounded-full bg-sky-500/60" />
                <span className="text-[11px] text-slate-400">{organ}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Priority Supplements - expandable */}
        <div className="mb-3">
          <button
            onClick={() => setSupplementsExpanded(!supplementsExpanded)}
            className="flex items-center justify-between w-full mb-1.5"
          >
            <p className="text-[10px] text-slate-500 uppercase tracking-wide">
              Priority Supplements ({substance.recoveryFocus.prioritySupplements.length})
            </p>
            <span className={`text-slate-500 transition-transform ${supplementsExpanded ? 'rotate-180' : ''}`}>
              {React.cloneElement(Icons.chevron as React.ReactElement, { width: 12, height: 12 })}
            </span>
          </button>
          {supplementsExpanded ? (
            <div className="space-y-1">
              {substance.recoveryFocus.prioritySupplements.map((supp, i) => (
                <div key={i} className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-white/5 transition-colors">
                  <span className="w-5 h-5 rounded-md bg-sky-500/10 flex items-center justify-center flex-shrink-0">
                    <span className="text-[10px] font-bold text-sky-400">{i + 1}</span>
                  </span>
                  <span className="text-[11px] text-slate-300 font-medium">{supp}</span>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-wrap gap-1.5">
              {substance.recoveryFocus.prioritySupplements.slice(0, 5).map((supp, i) => (
                <span key={i} className="px-2 py-0.5 rounded-md bg-sky-500/10 text-[10px] text-sky-400 border border-sky-500/15">
                  {supp}
                </span>
              ))}
              {substance.recoveryFocus.prioritySupplements.length > 5 && (
                <span className="px-2 py-0.5 rounded-md bg-white/5 text-[10px] text-slate-500 border border-white/5">
                  +{substance.recoveryFocus.prioritySupplements.length - 5} more
                </span>
              )}
            </div>
          )}
        </div>

        {/* Timeline */}
        <div className="rounded-xl bg-emerald-500/5 border border-emerald-500/10 p-3">
          <p className="text-[10px] font-semibold text-emerald-400 uppercase tracking-wide mb-1">Recovery Timeline</p>
          <p className="text-[11px] text-slate-400 leading-relaxed">{substance.recoveryFocus.timeline}</p>
        </div>
      </div>

      {/* --- RECOVERY PROTOCOL --- */}
      <div className="glass-card p-4 animate-fadeUp stagger-2" style={{ opacity: 0 }}>
        <SectionHeader icon={Icons.protocol} title="Recovery Protocol" />
        <p className="text-[11px] text-slate-400 leading-relaxed mb-3">
          The Symbiotic Protocol integrates neurochemical restoration, gut-brain axis repair, and lifestyle synergy into a comprehensive recovery framework.
        </p>
        <div className="space-y-2">
          {SYMBIOTIC_PROTOCOL.map((section) => {
            const isPillarOpen = protocolExpanded === section.id;
            return (
              <div key={section.id} className="rounded-xl border border-white/[0.06] overflow-hidden">
                {/* Pillar Header */}
                <button
                  onClick={() => setProtocolExpanded(isPillarOpen ? null : section.id)}
                  className="w-full p-3 text-left hover:bg-white/[0.02] transition-colors active:scale-[0.999]"
                >
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold text-white">{section.name}</p>
                      <p className="text-[10px] text-slate-500 mt-0.5">{section.subtitle}</p>
                      <div className="flex items-center gap-2 mt-1.5">
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/15 font-medium">
                          {section.phases.length} {section.phases.length === 1 ? 'phase' : 'phases'}
                        </span>
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/[0.04] text-slate-500 border border-white/[0.06] font-medium">
                          {section.principles.length} principles
                        </span>
                      </div>
                    </div>
                    <span className={`text-slate-500 transition-transform flex-shrink-0 ${isPillarOpen ? 'rotate-180' : ''}`}>
                      {React.cloneElement(Icons.chevron as React.ReactElement, { width: 14, height: 14 })}
                    </span>
                  </div>
                </button>

                {/* Expanded Pillar Content */}
                {isPillarOpen && (
                  <div className="border-t border-white/[0.06] p-3 space-y-3 max-h-72 overflow-y-auto custom-scrollbar">
                    {/* Description */}
                    <p className="text-[10px] text-slate-400 leading-relaxed">{section.description}</p>

                    {/* Principles (show first 3) */}
                    <div>
                      <p className="text-[10px] font-semibold text-slate-500 uppercase tracking-wide mb-1.5">Core Principles</p>
                      <div className="space-y-1">
                        {section.principles.slice(0, 3).map((principle, i) => (
                          <div key={i} className="flex items-start gap-1.5">
                            <span className="text-[10px] font-bold text-emerald-400 mt-0.5 flex-shrink-0 w-4 text-right">{i + 1}.</span>
                            <p className="text-[10px] text-slate-400 leading-relaxed">{principle}</p>
                          </div>
                        ))}
                        {section.principles.length > 3 && (
                          <p className="text-[10px] text-slate-600 pl-5">+{section.principles.length - 3} more principles</p>
                        )}
                      </div>
                    </div>

                    {/* Phases (collapsed) */}
                    <div>
                      <p className="text-[10px] font-semibold text-slate-500 uppercase tracking-wide mb-1.5">Recovery Phases</p>
                      <div className="space-y-1.5">
                        {section.phases.map((phase, idx) => (
                          <div key={idx} className="p-2.5 rounded-lg bg-white/[0.02] border border-white/[0.04]">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="w-5 h-5 rounded-md bg-emerald-500/10 flex items-center justify-center flex-shrink-0">
                                <span className="text-[10px] font-bold text-emerald-400">{idx + 1}</span>
                              </span>
                              <p className="text-[11px] font-medium text-white">{phase.name}</p>
                            </div>
                            <div className="flex items-center gap-2 ml-7">
                              <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/15 font-medium">
                                {phase.timeline}
                              </span>
                              <span className="text-[10px] text-slate-600">{phase.actions.length} actions</span>
                              <span className="text-[10px] text-slate-600">&middot;</span>
                              <span className="text-[10px] text-slate-600">{phase.supplements.length} supplements</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* --- PHARMACOLOGY --- */}
      <div className="glass-card p-4 animate-fadeUp stagger-3" style={{ opacity: 0 }}>
        <SectionHeader icon={Icons.pharmacology} title="Pharmacology" />

        <div className="space-y-2.5">
          <PharmRow label="Mechanism" value={substance.pharmacology.mechanism} />
          <PharmRow label="Half-life" value={substance.pharmacology.halfLife} />
          <PharmRow label="Onset" value={substance.pharmacology.onset} />
          <PharmRow label="Peak" value={substance.pharmacology.peak} />
          <PharmRow label="Duration" value={substance.pharmacology.duration} />
          <PharmRow label="Metabolites" value={substance.pharmacology.metabolites} />
        </div>
      </div>

      {/* --- PHILIPPINES --- */}
      <div className="glass-card p-4 animate-fadeUp stagger-4" style={{ opacity: 0 }}>
        <SectionHeader icon={Icons.philippines} title="Philippines" />

        <div className="space-y-2.5">
          <InfoRow label="Legality" value={substance.philippines.legality} />
          <InfoRow label="Penalties" value={substance.philippines.penalties} />
          <InfoRow label="Common Form" value={substance.philippines.commonForm} />
          <InfoRow label="Street Price" value={substance.philippines.streetPrice} highlight />
        </div>
      </div>

      {/* --- Disclaimer --- */}
      <div className="glass-card p-3 animate-fadeUp stagger-5" style={{ opacity: 0 }}>
        <p className="text-[10px] text-slate-500 leading-relaxed">
          <strong className="text-slate-400">Disclaimer:</strong> This information is for educational purposes only and is not medical advice. Always consult a healthcare professional for substance-related concerns.
        </p>
      </div>
    </div>
  );
});

// --- Sub-components ---

function PharmRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="p-2.5 rounded-xl bg-white/[0.03]">
      <p className="text-[10px] text-slate-500 uppercase tracking-wide mb-0.5">{label}</p>
      <p className="text-[11px] text-slate-300 leading-relaxed">{value}</p>
    </div>
  );
}

function InfoRow({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) {
  return (
    <div className="p-2.5 rounded-xl bg-white/[0.03]">
      <p className="text-[10px] text-slate-500 uppercase tracking-wide mb-0.5">{label}</p>
      <p className={`text-[11px] leading-relaxed ${highlight ? 'text-slate-200 font-medium' : 'text-slate-300'}`}>
        {value}
      </p>
    </div>
  );
}

// --- Main Component ---

// Data-driven tab config derived from SUBSTANCE_LIST
const TAB_CONFIG = SUBSTANCE_LIST.map((s) => ({
  id: s.id,
  label: s.name.replace(/\s*\(.*\)/, '').trim(),
  dangerLevel: s.dangerLevel,
}));

const Substances = React.memo(function Substances() {
  const [activeTab, setActiveTab] = useState(TAB_CONFIG[0]?.id ?? '');
  const [searchQuery, setSearchQuery] = useState('');

  const activeSubstance = SUBSTANCES[activeTab];

  const searchResults = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return [];
    return SUBSTANCE_LIST.filter((s) => {
      const nameMatch = s.name.toLowerCase().includes(q);
      const aliasMatch = s.aliases.some((a) => a.toLowerCase().includes(q));
      const streetMatch = s.streetNames.some((sn) => sn.toLowerCase().includes(q));
      return nameMatch || aliasMatch || streetMatch;
    });
  }, [searchQuery]);

  const isSearching = searchQuery.trim().length > 0;

  return (
    <div className="space-y-4 pb-6">
      {/* Header */}
      <div className="animate-fadeUp">
        <h2 className="text-lg font-bold text-white">Substance Info</h2>
        <p className="text-xs text-slate-400 mt-0.5">Detailed biochemical information</p>
      </div>

      {/* Search Input */}
      <div className="glass-card p-1.5 flex items-center gap-2 animate-fadeUp stagger-1" style={{ opacity: 0 }}>
        <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center flex-shrink-0">
          {React.cloneElement(Icons.search as React.ReactElement, { width: 14, height: 14, className: 'text-slate-500' })}
        </div>
        <input
          type="text"
          placeholder="Search substances, aliases..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="flex-1 bg-transparent text-xs text-white placeholder:text-slate-500 outline-none min-w-0"
        />
        {isSearching && (
          <button
            onClick={() => setSearchQuery('')}
            className="w-6 h-6 rounded-md bg-white/5 flex items-center justify-center flex-shrink-0 hover:bg-white/10 transition-colors"
          >
            {React.cloneElement(Icons.x as React.ReactElement, { width: 12, height: 12, className: 'text-slate-500' })}
          </button>
        )}
      </div>

      {/* Tab Navigation (hidden when searching) */}
      {!isSearching && (
        <div className="glass-card p-1.5 flex animate-fadeUp stagger-1" style={{ opacity: 0 }}>
          {TAB_CONFIG.map((tab) => {
            const isActive = activeTab === tab.id;
            const dotColor = getDangerDotColor(tab.dangerLevel);
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 py-2.5 rounded-xl text-xs font-medium transition-all flex items-center justify-center gap-1.5 ${
                  isActive
                    ? 'bg-white/[0.08] text-white border border-white/15 shadow-sm'
                    : 'text-slate-400 hover:text-slate-300 border border-transparent'
                }`}
              >
                <span className={`w-1.5 h-1.5 rounded-full ${isActive ? dotColor : 'bg-slate-600'}`} />
                {tab.label}
              </button>
            );
          })}
        </div>
      )}

      {/* Search Results (flat list) */}
      {isSearching && (
        <div className="space-y-3 animate-fadeUp">
          {searchResults.length > 0 ? (
            <>
              <p className="text-[10px] text-slate-500 px-1">{searchResults.length} result{searchResults.length !== 1 ? 's' : ''} found</p>
              {searchResults.map((substance) => (
                <button
                  key={substance.id}
                  onClick={() => {
                    setActiveTab(substance.id);
                    setSearchQuery('');
                  }}
                  className="glass-card p-3 w-full text-left hover:bg-white/[0.04] transition-all active:scale-[0.995] animate-fadeUp"
                  style={{ opacity: 0 }}
                >
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <h3 className="text-xs font-semibold text-white truncate">{substance.name}</h3>
                      <p className="text-[10px] text-slate-500 mt-0.5 truncate">
                        {substance.aliases.slice(0, 3).join(', ')}
                      </p>
                    </div>
                    <div className="flex items-center gap-1.5 flex-shrink-0">
                      <span className="text-[10px] text-slate-500">{substance.dangerLevel}/5</span>
                      <div className="flex items-center gap-0.5">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <span
                            key={i}
                            className={`w-1.5 h-1.5 rounded-full ${
                              i < substance.dangerLevel ? getDangerDotColor(substance.dangerLevel) : 'bg-white/10'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </>
          ) : (
            <div className="glass-card p-6 text-center">
              <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center mx-auto mb-3">
                {React.cloneElement(Icons.search as React.ReactElement, { width: 18, height: 18, className: 'text-slate-600' })}
              </div>
              <p className="text-xs text-slate-400 font-medium">No substances found</p>
              <p className="text-[10px] text-slate-500 mt-1">Try a different search term</p>
            </div>
          )}
        </div>
      )}

      {/* Active Substance Detail (hidden when searching) */}
      {!isSearching && (
        <div key={activeTab}>
          {activeSubstance && <SubstanceDetail substance={activeSubstance} />}
        </div>
      )}
    </div>
  );
});

export default Substances;
