'use client';

import React, { useState, useCallback } from 'react';
import { SYMBIOTIC_PROTOCOL, type ProtocolSection } from '@/lib/recovery-protocol-data';
import { SUBSTANCES, SUBSTANCE_LIST, type SubstanceData } from '@/lib/substances';

// ─── SVG Icons ────────────────────────────────────────────────────────────────

function BrainIcon({ className = 'w-6 h-6' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2a4.5 4.5 0 0 0-4.5 4.5c0 1.1.4 2.1 1 2.9A4.5 4.5 0 0 0 5 14.5C5 16.98 7.02 19 9.5 19H10v3h4v-3h.5c2.48 0 4.5-2.02 4.5-4.5a4.5 4.5 0 0 0-3.5-4.4 4.5 4.5 0 0 0 1-2.9A4.5 4.5 0 0 0 12 2z" />
      <path d="M12 2v17" />
      <path d="M7.5 6.5c1.5.5 3 .5 4.5 0" />
      <path d="M16.5 6.5c-1.5.5-3 .5-4.5 0" />
      <path d="M5 14.5c2.3-.5 4.7-.5 7 0" />
      <path d="M12 14.5c2.3-.5 4.7-.5 7 0" />
    </svg>
  );
}

function GutIcon({ className = 'w-6 h-6' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 12c0-3.5 2-6 4-7.5 1.2-.8 2.5-.5 3 .5s.3 2.5-.5 3.5c-.8 1-.5 2.5.5 3s2.5.3 3-.5c.8-1 2-.8 2.5.2S17 14 16 15.5c-1 1.2-3 3-6 3.5s-5-.5-6-2-1.5-3-1.5-5" />
      <path d="M12 4.5c.5-1 1.5-2 3-2.5" />
      <circle cx="17" cy="6" r="1" />
      <circle cx="19" cy="9" r="1" />
      <circle cx="17" cy="12" r="1" />
    </svg>
  );
}

function ActivityIcon({ className = 'w-6 h-6' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
    </svg>
  );
}

function ChevronDownIcon({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

function CheckCircleIcon({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <path d="m9 11 3 3L22 4" />
    </svg>
  );
}

function BulletIcon() {
  return (
    <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-500/60 mt-1.5 flex-shrink-0" />
  );
}

function ArrowRightIcon({ className = 'w-3 h-3' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  );
}

// ─── Substance Category Accent Colors ───────────────────────────────────────

function getSubstanceAccent(category: SubstanceData['category'], dangerLevel: SubstanceData['dangerLevel']) {
  const dangerColors: Record<number, { gradient: string; text: string; dot: string; bg: string; bgStrong: string; border: string; badge: string; ring: string; shadow: string; glow: string }> = {
    5: {
      gradient: 'from-rose-500 to-red-600',
      text: 'text-rose-400',
      dot: 'bg-rose-400',
      bg: 'bg-rose-500/10',
      bgStrong: 'bg-rose-500/15',
      border: 'border-rose-500/20',
      badge: 'bg-rose-500/15 text-rose-400 border-rose-500/20',
      ring: 'ring-rose-500/20',
      shadow: 'shadow-rose-500/15',
      glow: 'bg-rose-500/5',
    },
    4: {
      gradient: 'from-amber-500 to-orange-500',
      text: 'text-amber-400',
      dot: 'bg-amber-400',
      bg: 'bg-amber-500/10',
      bgStrong: 'bg-amber-500/15',
      border: 'border-amber-500/20',
      badge: 'bg-amber-500/15 text-amber-400 border-amber-500/20',
      ring: 'ring-amber-500/20',
      shadow: 'shadow-amber-500/15',
      glow: 'bg-amber-500/5',
    },
    3: {
      gradient: 'from-orange-500 to-yellow-500',
      text: 'text-orange-400',
      dot: 'bg-orange-400',
      bg: 'bg-orange-500/10',
      bgStrong: 'bg-orange-500/15',
      border: 'border-orange-500/20',
      badge: 'bg-orange-500/15 text-orange-400 border-orange-500/20',
      ring: 'ring-orange-500/20',
      shadow: 'shadow-orange-500/15',
      glow: 'bg-orange-500/5',
    },
    2: {
      gradient: 'from-yellow-500 to-lime-500',
      text: 'text-yellow-400',
      dot: 'bg-yellow-400',
      bg: 'bg-yellow-500/10',
      bgStrong: 'bg-yellow-500/15',
      border: 'border-yellow-500/20',
      badge: 'bg-yellow-500/15 text-yellow-400 border-yellow-500/20',
      ring: 'ring-yellow-500/20',
      shadow: 'shadow-yellow-500/15',
      glow: 'bg-yellow-500/5',
    },
    1: {
      gradient: 'from-emerald-500 to-green-500',
      text: 'text-emerald-400',
      dot: 'bg-emerald-400',
      bg: 'bg-emerald-500/10',
      bgStrong: 'bg-emerald-500/15',
      border: 'border-emerald-500/20',
      badge: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/20',
      ring: 'ring-emerald-500/20',
      shadow: 'shadow-emerald-500/15',
      glow: 'bg-emerald-500/5',
    },
  };

  // Override for specific categories to add variety
  if (category === 'empathogen') {
    return {
      gradient: 'from-violet-500 to-purple-500',
      text: 'text-violet-400',
      dot: 'bg-violet-400',
      bg: 'bg-violet-500/10',
      bgStrong: 'bg-violet-500/15',
      border: 'border-violet-500/20',
      badge: 'bg-violet-500/15 text-violet-400 border-violet-500/20',
      ring: 'ring-violet-500/20',
      shadow: 'shadow-violet-500/15',
      glow: 'bg-violet-500/5',
    };
  }
  if (category === 'cannabinoid') {
    return {
      gradient: 'from-lime-500 to-green-500',
      text: 'text-lime-400',
      dot: 'bg-lime-400',
      bg: 'bg-lime-500/10',
      bgStrong: 'bg-lime-500/15',
      border: 'border-lime-500/20',
      badge: 'bg-lime-500/15 text-lime-400 border-lime-500/20',
      ring: 'ring-lime-500/20',
      shadow: 'shadow-lime-500/15',
      glow: 'bg-lime-500/5',
    };
  }
  if (category === 'dissociative') {
    return {
      gradient: 'from-cyan-500 to-sky-500',
      text: 'text-cyan-400',
      dot: 'bg-cyan-400',
      bg: 'bg-cyan-500/10',
      bgStrong: 'bg-cyan-500/15',
      border: 'border-cyan-500/20',
      badge: 'bg-cyan-500/15 text-cyan-400 border-cyan-500/20',
      ring: 'ring-cyan-500/20',
      shadow: 'shadow-cyan-500/15',
      glow: 'bg-cyan-500/5',
    };
  }

  return dangerColors[dangerLevel] || dangerColors[4];
}

function DangerDots({ level }: { level: SubstanceData['dangerLevel'] }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <span
          key={i}
          className={`w-1.5 h-1.5 rounded-full transition-colors ${
            i < level ? 'bg-rose-400' : 'bg-white/[0.08]'
          }`}
        />
      ))}
    </div>
  );
}

function getCategoryLabel(category: SubstanceData['category']): string {
  const labels: Record<SubstanceData['category'], string> = {
    stimulant: 'Stimulant',
    depressant: 'Depressant',
    empathogen: 'Empathogen',
    cannabinoid: 'Cannabinoid',
    dissociative: 'Dissociative',
    hallucinogen: 'Hallucinogen',
  };
  return labels[category];
}

// ─── Icon Selector ────────────────────────────────────────────────────────────

function getSectionIcon(icon: string, className: string = 'w-6 h-6') {
  switch (icon) {
    case 'brain':
      return <BrainIcon className={className} />;
    case 'gut':
      return <GutIcon className={className} />;
    case 'lifestyle':
      return <ActivityIcon className={className} />;
    default:
      return <BrainIcon className={className} />;
  }
}

function getSectionAccent(icon: string) {
  switch (icon) {
    case 'brain':
      return {
        gradient: 'from-emerald-500 to-teal-500',
        text: 'text-emerald-400',
        bg: 'bg-emerald-500/10',
        border: 'border-emerald-500/20',
        bgStrong: 'bg-emerald-500/15',
        dot: 'bg-emerald-400',
        shadow: 'shadow-emerald-500/15',
        ring: 'ring-emerald-500/20',
        glow: 'bg-emerald-500/5',
        badge: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/20',
      };
    case 'gut':
      return {
        gradient: 'from-teal-500 to-cyan-500',
        text: 'text-teal-400',
        bg: 'bg-teal-500/10',
        border: 'border-teal-500/20',
        bgStrong: 'bg-teal-500/15',
        dot: 'bg-teal-400',
        shadow: 'shadow-teal-500/15',
        ring: 'ring-teal-500/20',
        glow: 'bg-teal-500/5',
        badge: 'bg-teal-500/15 text-teal-400 border-teal-500/20',
      };
    case 'lifestyle':
      return {
        gradient: 'from-emerald-500 to-green-500',
        text: 'text-green-400',
        bg: 'bg-green-500/10',
        border: 'border-green-500/20',
        bgStrong: 'bg-green-500/15',
        dot: 'bg-green-400',
        shadow: 'shadow-green-500/15',
        ring: 'ring-green-500/20',
        glow: 'bg-green-500/5',
        badge: 'bg-green-500/15 text-green-400 border-green-500/20',
      };
    default:
      return {
        gradient: 'from-emerald-500 to-teal-500',
        text: 'text-emerald-400',
        bg: 'bg-emerald-500/10',
        border: 'border-emerald-500/20',
        bgStrong: 'bg-emerald-500/15',
        dot: 'bg-emerald-400',
        shadow: 'shadow-emerald-500/15',
        ring: 'ring-emerald-500/20',
        glow: 'bg-emerald-500/5',
        badge: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/20',
      };
  }
}

// ─── Phase Connector ──────────────────────────────────────────────────────────

function PhaseConnector({ isLast, accent }: { isLast: boolean; accent: ReturnType<typeof getSectionAccent> }) {
  return (
    <div className="flex items-center justify-center py-1">
      {!isLast && (
        <div className="flex flex-col items-center gap-0.5">
          <div className="w-px h-4 bg-white/[0.06]" />
          <ArrowRightIcon className={`${accent.text} opacity-40`} />
          <div className="w-px h-4 bg-white/[0.06]" />
        </div>
      )}
    </div>
  );
}

// ─── Section Navigation Card ─────────────────────────────────────────────────

function SectionCard({
  section,
  index,
  isActive,
  onClick,
}: {
  section: ProtocolSection;
  index: number;
  isActive: boolean;
  onClick: () => void;
}) {
  const accent = getSectionAccent(section.icon);
  const staggerClass = index < 6 ? `stagger-${index + 1}` : '';

  return (
    <button
      onClick={onClick}
      className={`glass-card p-5 text-left w-full transition-all active:scale-[0.99] animate-fadeUp ${staggerClass} ${
        isActive
          ? `border ${accent.border} ${accent.bg}`
          : 'hover:border-white/[0.12]'
      }`}
      style={staggerClass ? { opacity: 0 } : undefined}
    >
      <div className="flex items-start gap-4">
        <div
          className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${accent.gradient} flex items-center justify-center shadow-lg ${accent.shadow} flex-shrink-0`}
        >
          {getSectionIcon(section.icon, 'w-6 h-6 text-white')}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-bold text-white mb-0.5">{section.name}</h3>
          <p className="text-xs font-semibold text-slate-400 mb-1.5">{section.subtitle}</p>
          <div className="flex items-center gap-3">
            <span className={`text-[11px] px-2 py-0.5 rounded-full border font-medium ${accent.badge}`}>
              {section.phases.length} {section.phases.length === 1 ? 'phase' : 'phases'}
            </span>
            <span className="text-[11px] px-2 py-0.5 rounded-full bg-white/[0.04] text-slate-500 border border-white/[0.06] font-medium">
              {section.faq.length} FAQ{section.faq.length !== 1 ? 's' : ''}
            </span>
          </div>
        </div>
        <div className="flex-shrink-0 mt-1">
          <ChevronDownIcon
            className={`w-4 h-4 text-slate-500 transition-transform duration-300 ${isActive ? 'rotate-180' : ''}`}
          />
        </div>
      </div>
    </button>
  );
}

// ─── Principles List ──────────────────────────────────────────────────────────

function PrinciplesList({ principles, accent }: { principles: string[]; accent: ReturnType<typeof getSectionAccent> }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const displayPrinciples = isExpanded ? principles : principles.slice(0, 3);
  const hasMore = principles.length > 3;

  return (
    <div className="glass-card p-4">
      <div className="flex items-center justify-between mb-3">
        <p className="text-xs font-semibold text-slate-400 flex items-center gap-2">
          <div className={`w-1.5 h-1.5 rounded-full ${accent.dot}`} />
          Core Principles
        </p>
        {hasMore && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-[10px] text-slate-500 hover:text-slate-300 transition-colors"
          >
            {isExpanded ? 'Show less' : `+${principles.length - 3} more`}
          </button>
        )}
      </div>
      <div className="space-y-2">
        {displayPrinciples.map((principle, i) => (
          <div key={i} className="flex items-start gap-2.5">
            <span className={`text-[11px] font-bold ${accent.text} mt-0.5 flex-shrink-0 w-5 text-right`}>
              {i + 1}.
            </span>
            <p className="text-[11px] text-slate-400 leading-relaxed">{principle}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Supplement Table ────────────────────────────────────────────────────────

function SupplementTable({
  supplements,
  accent,
}: {
  supplements: { name: string; dosage: string; reason: string }[];
  accent: ReturnType<typeof getSectionAccent>;
}) {
  return (
    <div className="overflow-x-auto -mx-1">
      <table className="w-full text-left min-w-[500px]">
        <thead>
          <tr className="border-b border-white/[0.06]">
            <th className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider pb-2 pr-3">
              Supplement
            </th>
            <th className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider pb-2 pr-3">
              Dosage
            </th>
            <th className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider pb-2">
              Reason
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-white/[0.04]">
          {supplements.map((supp, i) => (
            <tr key={i} className="group">
              <td className="py-2.5 pr-3">
                <span className={`text-[11px] font-medium text-white`}>{supp.name}</span>
              </td>
              <td className="py-2.5 pr-3">
                <span className={`text-[11px] ${accent.text} font-medium whitespace-nowrap`}>
                  {supp.dosage}
                </span>
              </td>
              <td className="py-2.5">
                <span className="text-[11px] text-slate-500 leading-relaxed">{supp.reason}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// ─── Phase Card ───────────────────────────────────────────────────────────────

function PhaseCard({
  phase,
  phaseIndex,
  totalPhases,
  accent,
}: {
  phase: ProtocolSection['phases'][0];
  phaseIndex: number;
  totalPhases: number;
  accent: ReturnType<typeof getSectionAccent>;
}) {
  const [isExpanded, setIsExpanded] = useState(false);
  const isLast = phaseIndex === totalPhases - 1;
  const staggerClass = phaseIndex < 6 ? `stagger-${phaseIndex + 1}` : '';

  return (
    <>
      <PhaseConnector isLast={false} accent={accent} />
      <div
        className={`glass-card overflow-hidden animate-fadeUp ${staggerClass} transition-all`}
        style={staggerClass ? { opacity: 0 } : undefined}
      >
        {/* Phase Header */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full p-4 text-left hover:bg-white/[0.02] transition-colors"
        >
          <div className="flex items-start gap-3">
            <div className={`w-10 h-10 rounded-xl ${accent.bgStrong} flex items-center justify-center flex-shrink-0 ring-1 ${accent.ring}`}>
              <span className={`text-sm font-bold ${accent.text}`}>{phaseIndex + 1}</span>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1 flex-wrap">
                <h4 className="text-sm font-bold text-white">{phase.name}</h4>
                <span className={`text-[10px] px-2 py-0.5 rounded-full border font-medium ${accent.badge}`}>
                  {phase.timeline}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] text-slate-500">{phase.actions.length} actions</span>
                <span className="text-[10px] text-slate-600">&middot;</span>
                <span className="text-[10px] text-slate-500">{phase.supplements.length} supplements</span>
                <span className="text-[10px] text-slate-600">&middot;</span>
                <span className="text-[10px] text-slate-500">{phase.expectedOutcomes.length} outcomes</span>
              </div>
            </div>
            <ChevronDownIcon
              className={`w-4 h-4 text-slate-500 flex-shrink-0 mt-1 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}
            />
          </div>
        </button>

        {/* Expanded Content */}
        {isExpanded && (
          <div className="border-t border-white/[0.06]">
            {/* Actions Checklist */}
            <div className="p-4 border-b border-white/[0.04]">
              <p className="text-[10px] font-semibold text-slate-400 mb-2.5">Actions</p>
              <div className="space-y-2">
                {phase.actions.map((action, i) => (
                  <div key={i} className="flex items-start gap-2.5">
                    <BulletIcon />
                    <p className="text-[11px] text-slate-400 leading-relaxed">{action}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Supplements */}
            {phase.supplements.length > 0 && (
              <div className="p-4 border-b border-white/[0.04]">
                <p className="text-[10px] font-semibold text-slate-400 mb-2.5">Supplement Protocol</p>
                <SupplementTable supplements={phase.supplements} accent={accent} />
              </div>
            )}

            {/* Nutrition */}
            <div className="p-4 border-b border-white/[0.04]">
              <p className="text-[10px] font-semibold text-slate-400 mb-2">Nutrition Summary</p>
              <div className={`rounded-xl ${accent.bg} border ${accent.border} p-3`}>
                <p className="text-[11px] text-slate-300 leading-relaxed">{phase.nutrition}</p>
              </div>
            </div>

            {/* Expected Outcomes */}
            <div className="p-4">
              <p className="text-[10px] font-semibold text-slate-400 mb-2.5">Expected Outcomes</p>
              <div className="space-y-2">
                {phase.expectedOutcomes.map((outcome, i) => (
                  <div key={i} className="flex items-start gap-2.5">
                    <CheckCircleIcon className={`w-4 h-4 ${accent.text} flex-shrink-0 mt-0.5`} />
                    <p className="text-[11px] text-slate-400 leading-relaxed">{outcome}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
      <PhaseConnector isLast={isLast} accent={accent} />
    </>
  );
}

// ─── FAQ Accordion ────────────────────────────────────────────────────────────

function FAQAccordion({
  faq,
  accent,
}: {
  faq: ProtocolSection['faq'];
  accent: ReturnType<typeof getSectionAccent>;
}) {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const toggleFAQ = useCallback(
    (index: number) => {
      setExpandedIndex((prev) => (prev === index ? null : index));
    },
    []
  );

  return (
    <div className="glass-card overflow-hidden">
      <div className="p-4 border-b border-white/[0.06]">
        <p className="text-xs font-semibold text-slate-400 flex items-center gap-2">
          <div className={`w-1.5 h-1.5 rounded-full ${accent.dot}`} />
          Frequently Asked Questions
        </p>
      </div>
      <div className="divide-y divide-white/[0.04]">
        {faq.map((item, i) => {
          const isOpen = expandedIndex === i;
          return (
            <div key={i} className="transition-colors">
              <button
                onClick={() => toggleFAQ(i)}
                className="w-full p-4 text-left hover:bg-white/[0.02] transition-colors active:scale-[0.999]"
              >
                <div className="flex items-start gap-3">
                  <div
                    className={`w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5 transition-colors ${
                      isOpen ? accent.bgStrong : 'bg-white/[0.04]'
                    }`}
                  >
                    <span className={`text-xs font-bold transition-colors ${isOpen ? accent.text : 'text-slate-500'}`}>
                      {i + 1}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className={`text-[11px] font-semibold leading-snug transition-colors ${isOpen ? 'text-white' : 'text-slate-300'}`}>
                      {item.question}
                    </p>
                  </div>
                  <ChevronDownIcon
                    className={`w-4 h-4 flex-shrink-0 mt-1 transition-transform duration-300 ${isOpen ? 'rotate-180 ' + accent.text : 'text-slate-600'}`}
                  />
                </div>
              </button>
              {isOpen && (
                <div className="px-4 pb-4 animate-fadeUp">
                  <div className="ml-10">
                    <p className="text-[11px] text-slate-400 leading-relaxed">{item.answer}</p>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── Section Detail View ─────────────────────────────────────────────────────

function SectionDetail({ section }: { section: ProtocolSection }) {
  const accent = getSectionAccent(section.icon);

  return (
    <div className="space-y-4 pb-6 animate-fadeUp" key={section.id}>
      {/* Hero Card */}
      <div className="glass-card-hero p-5 relative overflow-hidden">
        <div className={`absolute -top-16 -right-16 w-40 h-40 rounded-full ${accent.glow} blur-3xl pointer-events-none`} />
        <div className={`absolute -bottom-12 -left-12 w-32 h-32 rounded-full ${accent.glow} blur-3xl pointer-events-none`} />
        <div className="relative">
          <div className="flex items-start gap-4 mb-3">
            <div
              className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${accent.gradient} flex items-center justify-center shadow-lg ${accent.shadow} flex-shrink-0`}
            >
              {getSectionIcon(section.icon, 'w-6 h-6 text-white')}
            </div>
            <div className="flex-1 min-w-0">
              <h2 className="text-lg font-bold text-white mb-0.5">{section.name}</h2>
              <p className="text-xs font-semibold text-slate-400">{section.subtitle}</p>
            </div>
          </div>
          <p className="text-[11px] text-slate-400 leading-relaxed">{section.description}</p>
          <div className="flex items-center gap-2 mt-4 flex-wrap">
            <span className={`text-[10px] px-2.5 py-1 rounded-full border font-medium ${accent.badge}`}>
              {section.phases.length} {section.phases.length === 1 ? 'Phase' : 'Phases'}
            </span>
            <span className="text-[10px] px-2.5 py-1 rounded-full bg-white/[0.04] text-slate-500 border border-white/[0.06] font-medium">
              {section.principles.length} Principles
            </span>
            <span className="text-[10px] px-2.5 py-1 rounded-full bg-white/[0.04] text-slate-500 border border-white/[0.06] font-medium">
              {section.faq.length} FAQ{section.faq.length !== 1 ? 's' : ''}
            </span>
          </div>
        </div>
      </div>

      {/* Principles */}
      <div className="animate-fadeUp stagger-1" style={{ opacity: 0 }}>
        <PrinciplesList principles={section.principles} accent={accent} />
      </div>

      {/* Phase Cards */}
      <div>
        <div className="flex items-center gap-2 mb-3 px-1 animate-fadeUp stagger-2" style={{ opacity: 0 }}>
          <div className={`w-7 h-7 rounded-lg ${accent.bgStrong} flex items-center justify-center`}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={accent.text}>
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
          </div>
          <h3 className="text-sm font-bold text-slate-300">Recovery Phases</h3>
        </div>
        <div className="space-y-0">
          {section.phases.map((phase, idx) => (
            <PhaseCard
              key={idx}
              phase={phase}
              phaseIndex={idx}
              totalPhases={section.phases.length}
              accent={accent}
            />
          ))}
        </div>
      </div>

      {/* FAQ */}
      <div className="animate-fadeUp" style={{ opacity: 0 }}>
        <FAQAccordion faq={section.faq} accent={accent} />
      </div>
    </div>
  );
}

// ─── Substance Protocol Card ────────────────────────────────────────────────

function SubstanceProtocolCard({
  substance,
  index,
  isActive,
  onClick,
}: {
  substance: SubstanceData;
  index: number;
  isActive: boolean;
  onClick: () => void;
}) {
  const accent = getSubstanceAccent(substance.category, substance.dangerLevel);
  const staggerClass = index < 6 ? `stagger-${index + 1}` : '';
  const phasesCount = substance.recoveryPhases?.length ?? 0;
  const snippet = substance.description.slice(0, 120) + '…';

  return (
    <button
      onClick={onClick}
      className={`glass-card p-5 text-left w-full transition-all active:scale-[0.99] animate-fadeUp ${staggerClass} ${
        isActive
          ? `border ${accent.border} ${accent.bg}`
          : 'hover:border-white/[0.12]'
      }`}
      style={staggerClass ? { opacity: 0 } : undefined}
    >
      <div className="flex items-start gap-4">
        <div
          className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${accent.gradient} flex items-center justify-center shadow-lg ${accent.shadow} flex-shrink-0`}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
            <line x1="12" y1="9" x2="12" y2="13" />
            <line x1="12" y1="17" x2="12.01" y2="17" />
          </svg>
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="text-base font-bold text-white truncate">{substance.name}</h3>
            <DangerDots level={substance.dangerLevel} />
          </div>
          <p className="text-[11px] text-slate-500 mb-2 line-clamp-2 leading-relaxed">{snippet}</p>
          <div className="flex items-center gap-2 flex-wrap">
            <span className={`text-[10px] px-2 py-0.5 rounded-full border font-medium ${accent.badge}`}>
              {getCategoryLabel(substance.category)}
            </span>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/[0.04] text-slate-500 border border-white/[0.06] font-medium">
              {phasesCount} {phasesCount === 1 ? 'phase' : 'phases'}
            </span>
          </div>
        </div>
        <div className="flex-shrink-0 mt-1">
          <ChevronDownIcon
            className={`w-4 h-4 text-slate-500 transition-transform duration-300 ${isActive ? 'rotate-180' : ''}`}
          />
        </div>
      </div>
    </button>
  );
}

// ─── Substance Phase Card (for per-substance protocol detail) ──────────────────

function SubstancePhaseCard({
  phase,
  phaseIndex,
  totalPhases,
  accent,
}: {
  phase: NonNullable<SubstanceData['recoveryPhases']>[0];
  phaseIndex: number;
  totalPhases: number;
  accent: ReturnType<typeof getSubstanceAccent>;
}) {
  const [isExpanded, setIsExpanded] = useState(false);
  const isLast = phaseIndex === totalPhases - 1;
  const staggerClass = phaseIndex < 6 ? `stagger-${phaseIndex + 1}` : '';

  return (
    <>
      <PhaseConnector isLast={false} accent={accent} />
      <div
        className={`glass-card overflow-hidden animate-fadeUp ${staggerClass} transition-all`}
        style={staggerClass ? { opacity: 0 } : undefined}
      >
        {/* Phase Header */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full p-4 text-left hover:bg-white/[0.02] transition-colors"
        >
          <div className="flex items-start gap-3">
            <div className={`w-10 h-10 rounded-xl ${accent.bgStrong} flex items-center justify-center flex-shrink-0 ring-1 ${accent.ring}`}>
              <span className={`text-sm font-bold ${accent.text}`}>{phaseIndex + 1}</span>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1 flex-wrap">
                <h4 className="text-sm font-bold text-white">{phase.name}</h4>
                <span className={`text-[10px] px-2 py-0.5 rounded-full border font-medium ${accent.badge}`}>
                  {phase.timeline}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] text-slate-500">{phase.prioritySupplements.length} supplements</span>
                <span className="text-[10px] text-slate-600">·</span>
                <span className="text-[10px] text-slate-500">{phase.milestones.length} milestones</span>
              </div>
            </div>
            <ChevronDownIcon
              className={`w-4 h-4 text-slate-500 flex-shrink-0 mt-1 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}
            />
          </div>
        </button>

        {/* Expanded Content */}
        {isExpanded && (
          <div className="border-t border-white/[0.06]">
            {/* Medical Note (if present) */}
            {phase.medicalNote && (
              <div className="p-4 border-b border-red-500/20">
                <div className="flex items-start gap-2.5">
                  <svg className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
                    <line x1="12" y1="9" x2="12" y2="13" />
                    <line x1="12" y1="17" x2="12.01" y2="17" />
                  </svg>
                  <p className="text-[11px] text-red-300 leading-relaxed font-medium">{phase.medicalNote}</p>
                </div>
              </div>
            )}

            {/* Neurochemical State (if present) */}
            {phase.neurochemicalState && (
              <div className="p-4 border-b border-white/[0.04]">
                <p className="text-[10px] font-semibold text-slate-400 mb-2">Neurochemical State</p>
                <div className={`rounded-xl ${accent.bg} border ${accent.border} p-3`}>
                  <p className="text-[11px] text-slate-300 leading-relaxed">{phase.neurochemicalState}</p>
                </div>
              </div>
            )}

            {/* Priority Supplements */}
            {phase.prioritySupplements.length > 0 && (
              <div className="p-4 border-b border-white/[0.04]">
                <p className="text-[10px] font-semibold text-slate-400 mb-2.5">Priority Supplements</p>
                <div className="space-y-1.5">
                  {phase.prioritySupplements.map((supp, i) => (
                    <div key={i} className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <BulletIcon />
                        <span className="text-[11px] text-white font-medium">{supp.name}</span>
                      </div>
                      <span className={`text-[10px] ${accent.text} font-medium whitespace-nowrap`}>{supp.dosage}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Dietary Focus */}
            {phase.dietaryFocus.length > 0 && (
              <div className="p-4 border-b border-white/[0.04]">
                <p className="text-[10px] font-semibold text-slate-400 mb-2.5">Dietary Focus</p>
                <div className="space-y-2">
                  {phase.dietaryFocus.map((item, i) => (
                    <div key={i} className="flex items-start gap-2.5">
                      <BulletIcon />
                      <p className="text-[11px] text-slate-400 leading-relaxed">{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Milestones */}
            <div className="p-4">
              <p className="text-[10px] font-semibold text-slate-400 mb-2.5">Milestones</p>
              <div className="space-y-2">
                {phase.milestones.map((milestone, i) => (
                  <div key={i} className="flex items-start gap-2.5">
                    <CheckCircleIcon className={`w-4 h-4 ${accent.text} flex-shrink-0 mt-0.5`} />
                    <span className="text-[11px] text-slate-400 leading-relaxed capitalize">
                      {milestone.replace(/_/g, ' ')}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
      <PhaseConnector isLast={isLast} accent={accent} />
    </>
  );
}

// ─── Substance Protocol Detail View ───────────────────────────────────────────

function SubstanceProtocolDetail({
  substance,
  onBack,
}: {
  substance: SubstanceData;
  onBack: () => void;
}) {
  const accent = getSubstanceAccent(substance.category, substance.dangerLevel);
  const phases = substance.recoveryPhases ?? [];

  return (
    <div className="space-y-4 pb-6 animate-fadeUp" key={substance.id}>
      {/* Back Button */}
      <div className="animate-fadeUp">
        <button
          onClick={onBack}
          className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/[0.03] border border-white/[0.06] text-slate-400 hover:text-slate-300 hover:bg-white/[0.06] active:scale-[0.99] transition-all"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="m15 18-6-6 6-6" />
          </svg>
          <span className="text-xs font-medium">All Protocols</span>
        </button>
      </div>

      {/* Hero Card */}
      <div className="glass-card-hero p-5 relative overflow-hidden">
        <div className={`absolute -top-16 -right-16 w-40 h-40 rounded-full ${accent.glow} blur-3xl pointer-events-none`} />
        <div className={`absolute -bottom-12 -left-12 w-32 h-32 rounded-full ${accent.glow} blur-3xl pointer-events-none`} />
        <div className="relative">
          <div className="flex items-start gap-4 mb-3">
            <div
              className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${accent.gradient} flex items-center justify-center shadow-lg ${accent.shadow} flex-shrink-0`}
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
                <line x1="12" y1="9" x2="12" y2="13" />
                <line x1="12" y1="17" x2="12.01" y2="17" />
              </svg>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-0.5">
                <h2 className="text-lg font-bold text-white truncate">{substance.name}</h2>
                <DangerDots level={substance.dangerLevel} />
              </div>
              <p className="text-xs font-semibold text-slate-400">Recovery Protocol</p>
            </div>
          </div>
          <p className="text-[11px] text-slate-400 leading-relaxed mb-3">{substance.description.slice(0, 250)}{substance.description.length > 250 ? '…' : ''}</p>
          <div className="flex items-center gap-2 flex-wrap">
            <span className={`text-[10px] px-2.5 py-1 rounded-full border font-medium ${accent.badge}`}>
              {getCategoryLabel(substance.category)}
            </span>
            <span className="text-[10px] px-2.5 py-1 rounded-full bg-white/[0.04] text-slate-500 border border-white/[0.06] font-medium">
              {phases.length} {phases.length === 1 ? 'Phase' : 'Phases'}
            </span>
            <span className="text-[10px] px-2.5 py-1 rounded-full bg-white/[0.04] text-slate-500 border border-white/[0.06] font-medium">
              Danger Level {substance.dangerLevel}/5
            </span>
          </div>
        </div>
      </div>

      {/* Recovery Focus Summary */}
      <div className="glass-card p-4 animate-fadeUp stagger-1" style={{ opacity: 0 }}>
        <p className="text-[10px] font-semibold text-slate-400 mb-2.5 flex items-center gap-2">
          <div className={`w-1.5 h-1.5 rounded-full ${accent.dot}`} />
          Recovery Focus
        </p>
        <div className="space-y-2">
          <div>
            <p className="text-[10px] text-slate-500 mb-1 font-medium">Neurotransmitters</p>
            <div className="flex flex-wrap gap-1">
              {substance.recoveryFocus.neurotransmitters.map((nt) => (
                <span key={nt} className={`text-[10px] px-2 py-0.5 rounded-full border ${accent.badge}`}>
                  {nt}
                </span>
              ))}
            </div>
          </div>
          <div>
            <p className="text-[10px] text-slate-500 mb-1 font-medium">Target Organs</p>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              {substance.recoveryFocus.organs.join(', ')}
            </p>
          </div>
          <div>
            <p className="text-[10px] text-slate-500 mb-1 font-medium">Recovery Timeline</p>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              {substance.recoveryFocus.timeline.slice(0, 200)}{substance.recoveryFocus.timeline.length > 200 ? '…' : ''}
            </p>
          </div>
        </div>
      </div>

      {/* Phase Cards */}
      <div>
        <div className="flex items-center gap-2 mb-3 px-1 animate-fadeUp stagger-2" style={{ opacity: 0 }}>
          <div className={`w-7 h-7 rounded-lg ${accent.bgStrong} flex items-center justify-center`}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={accent.text}>
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
          </div>
          <h3 className="text-sm font-bold text-slate-300">Recovery Phases</h3>
        </div>
        <div className="space-y-0">
          {phases.map((phase, idx) => (
            <SubstancePhaseCard
              key={idx}
              phase={phase}
              phaseIndex={idx}
              totalPhases={phases.length}
              accent={accent}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function RecoveryProtocol() {
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [activeSubstanceId, setActiveSubstanceId] = useState<string | null>(null);

  const activeSectionData = activeSection
    ? SYMBIOTIC_PROTOCOL.find((s) => s.id === activeSection) ?? null
    : null;

  const handleBack = useCallback(() => {
    setActiveSection(null);
  }, []);

  return (
    <div className="space-y-4 pb-6">
      {/* Header */}
      {!activeSectionData && (
        <div className="animate-fadeUp relative overflow-hidden rounded-2xl border border-white/[0.08]" style={{ background: 'linear-gradient(135deg, rgba(16,185,129,0.08) 0%, rgba(17,24,39,0.95) 25%, rgba(17,24,39,0.95) 75%, rgba(20,184,166,0.08) 100%)' }}>
          <div className={`absolute -top-16 -right-16 w-40 h-40 rounded-full bg-emerald-500/5 blur-3xl pointer-events-none`} />
          <div className={`absolute -bottom-12 -left-12 w-32 h-32 rounded-full bg-teal-500/5 blur-3xl pointer-events-none`} />
          <div className="relative p-5">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center shadow-lg shadow-emerald-500/20">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  <path d="m9 12 2 2 4-4" />
                </svg>
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">Symbiotic Recovery Protocol</h1>
                <p className="text-xs text-slate-400">A 3-pillar approach to biochemical recovery</p>
              </div>
            </div>
            <p className="text-[11px] text-slate-500 leading-relaxed">
              The Symbiotic Protocol integrates neurochemical restoration, gut-brain axis repair, and lifestyle synergy into a comprehensive recovery framework. Each pillar supports and amplifies the others.
            </p>
            <div className="flex items-center gap-2 mt-3 flex-wrap">
              <span className="text-[10px] px-2.5 py-1 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/20 font-medium">
                3 Pillars
              </span>
              <span className="text-[10px] px-2.5 py-1 rounded-full bg-teal-500/15 text-teal-400 border border-teal-500/20 font-medium">
                {SYMBIOTIC_PROTOCOL.reduce((sum, s) => sum + s.phases.length, 0)} Phases
              </span>
              <span className="text-[10px] px-2.5 py-1 rounded-full bg-white/[0.04] text-slate-500 border border-white/[0.06] font-medium">
                {SYMBIOTIC_PROTOCOL.reduce((sum, s) => sum + s.faq.length, 0)} FAQs
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Section Detail View */}
      {activeSectionData && (
        <>
          {/* Back Button */}
          <div className="animate-fadeUp">
            <button
              onClick={handleBack}
              className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/[0.03] border border-white/[0.06] text-slate-400 hover:text-slate-300 hover:bg-white/[0.06] active:scale-[0.99] transition-all"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="m15 18-6-6 6-6" />
              </svg>
              <span className="text-xs font-medium">All Pillars</span>
            </button>
          </div>
          <SectionDetail section={activeSectionData} />
        </>
      )}

      {/* Section Navigation Cards */}
      {!activeSectionData && !activeSubstanceId && (
        <div className="space-y-3">
          {SYMBIOTIC_PROTOCOL.map((section, index) => (
            <SectionCard
              key={section.id}
              section={section}
              index={index}
              isActive={activeSection === section.id}
              onClick={() => setActiveSection(section.id)}
            />
          ))}
        </div>
      )}

      {/* ─── Substance-Specific Recovery Protocols ──────────────────────── */}
      {!activeSectionData && !activeSubstanceId && (
        <div className="space-y-4 animate-fadeUp stagger-3" style={{ opacity: 0 }}>
          {/* Hero Card */}
          <div className="relative overflow-hidden rounded-2xl border border-white/[0.08]" style={{ background: 'linear-gradient(135deg, rgba(244,63,94,0.06) 0%, rgba(17,24,39,0.95) 25%, rgba(17,24,39,0.95) 75%, rgba(168,85,247,0.06) 100%)' }}>
            <div className="absolute -top-16 -right-16 w-40 h-40 rounded-full bg-rose-500/5 blur-3xl pointer-events-none" />
            <div className="absolute -bottom-12 -left-12 w-32 h-32 rounded-full bg-violet-500/5 blur-3xl pointer-events-none" />
            <div className="relative p-5">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-rose-500/80 to-violet-500/80 flex items-center justify-center shadow-lg shadow-rose-500/15">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
                    <line x1="12" y1="9" x2="12" y2="13" />
                    <line x1="12" y1="17" x2="12.01" y2="17" />
                  </svg>
                </div>
                <div>
                  <h2 className="text-base font-bold text-white">Substance-Specific Recovery Protocols</h2>
                  <p className="text-[11px] text-slate-400">Phase-based recovery guides per substance</p>
                </div>
              </div>
              <p className="text-[11px] text-slate-500 leading-relaxed">
                Detailed, phase-by-phase recovery protocols for specific substances. Each protocol outlines supplements, dietary focus, milestones, and neurochemical targets across 4 recovery phases.
              </p>
              <div className="flex items-center gap-2 mt-3 flex-wrap">
                <span className="text-[10px] px-2.5 py-1 rounded-full bg-rose-500/15 text-rose-400 border border-rose-500/20 font-medium">
                  {SUBSTANCE_LIST.filter((s) => s.recoveryPhases).length} Substances
                </span>
                <span className="text-[10px] px-2.5 py-1 rounded-full bg-white/[0.04] text-slate-500 border border-white/[0.06] font-medium">
                  {SUBSTANCE_LIST.filter((s) => s.recoveryPhases).reduce((sum, s) => sum + (s.recoveryPhases?.length ?? 0), 0)} Phases
                </span>
              </div>
            </div>
          </div>

          {/* Substance Cards */}
          <div className="space-y-3">
            {SUBSTANCE_LIST.filter((s) => s.recoveryPhases).map((substance, index) => (
              <SubstanceProtocolCard
                key={substance.id}
                substance={substance}
                index={index}
                isActive={activeSubstanceId === substance.id}
                onClick={() => setActiveSubstanceId(substance.id)}
              />
            ))}
          </div>
        </div>
      )}

      {/* Substance Protocol Detail View */}
      {!activeSectionData && activeSubstanceId && (() => {
        const substance = SUBSTANCES[activeSubstanceId];
        if (!substance?.recoveryPhases) return null;
        return (
          <SubstanceProtocolDetail
            substance={substance}
            onBack={() => setActiveSubstanceId(null)}
          />
        );
      })()}
    </div>
  );
}
