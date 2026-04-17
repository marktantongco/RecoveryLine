'use client';

import React, { useState, useMemo } from 'react';
import { MEDICATIONS, SUPPLEMENTS, SAFETY_RULES } from '@/lib/recovery-constants';
import { SafetyRule } from '@/lib/recovery-types';
import { SUPPLEMENTS_DB, SUPPLEMENT_CATEGORIES, SUPPLEMENT_USE_CASES, searchSupplements } from '@/lib/supplement-data';
import type { SupplementData, SupplementUseCase } from '@/lib/supplement-data';
import { TIMELINE_PHASES } from '@/lib/timeline-data';
import type { TimelinePhase } from '@/lib/timeline-data';
import { useToast } from './Toast';

interface BioToolsProps {
  selectedMeds: string[];
  selectedSupplements: string[];
  onToggleMed: (med: string) => void;
  onToggleSupplement: (supp: string) => void;
}

type SubTab = 'safety' | 'stack-builder' | 'timeline';

interface StackItem {
  supplementId: string;
  timing: 'AM' | 'PM';
}

// ─── SVG Icons ────────────────────────────────────────────────────────────────

function ShieldCheckIcon({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}

function LayersIcon({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83Z" />
      <path d="m22 17.65-9.17 4.16a2 2 0 0 1-1.66 0L2 17.65" />
      <path d="m22 12.65-9.17 4.16a2 2 0 0 1-1.66 0L2 12.65" />
    </svg>
  );
}

function ClockIcon({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}

function SunIcon({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2" />
      <path d="M12 20v2" />
      <path d="m4.93 4.93 1.41 1.41" />
      <path d="m17.66 17.66 1.41 1.41" />
      <path d="M2 12h2" />
      <path d="M20 12h2" />
      <path d="m6.34 17.66-1.41 1.41" />
      <path d="m19.07 4.93-1.41 1.41" />
    </svg>
  );
}

function MoonIcon({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
    </svg>
  );
}

function SearchIcon({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}

function PlusIcon({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12h14" />
      <path d="M12 5v14" />
    </svg>
  );
}

function MinusIcon({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12h14" />
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

function CheckIcon({ className = 'w-3.5 h-3.5' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

function AlertTriangleIcon({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
      <path d="M12 9v4" />
      <path d="M12 17h.01" />
    </svg>
  );
}

function InfoIcon({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <path d="M12 16v-4" />
      <path d="M12 8h.01" />
    </svg>
  );
}

function SkullIcon({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="10" r="8" />
      <path d="M8 20h8" />
      <path d="M9 16h6" />
      <circle cx="9" cy="10" r="1.5" />
      <circle cx="15" cy="10" r="1.5" />
      <path d="M8 14l2-2" />
      <path d="M16 14l-2-2" />
    </svg>
  );
}

function XIcon({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  );
}

function TrashIcon({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 6h18" />
      <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
      <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
      <line x1="10" y1="11" x2="10" y2="17" />
      <line x1="14" y1="11" x2="14" y2="17" />
    </svg>
  );
}

// ─── Subtab Navigation ────────────────────────────────────────────────────────

function SubTabNav({ active, onChange }: { active: SubTab; onChange: (tab: SubTab) => void }) {
  const tabs: { id: SubTab; label: string; icon: React.ReactNode }[] = [
    { id: 'safety', label: 'Safety Check', icon: <ShieldCheckIcon className="w-4 h-4" /> },
    { id: 'stack-builder', label: 'Stack Builder', icon: <LayersIcon className="w-4 h-4" /> },
    { id: 'timeline', label: 'Timeline', icon: <ClockIcon className="w-4 h-4" /> },
  ];

  return (
    <div className="flex gap-1 p-1 rounded-2xl bg-white/[0.03] border border-white/[0.06]">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onChange(tab.id)}
          className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 px-2 rounded-xl text-xs font-medium transition-all ${
            active === tab.id
              ? 'bg-sky-500/15 text-sky-400 border border-sky-500/20 shadow-lg shadow-sky-500/5'
              : 'text-slate-500 hover:text-slate-300 border border-transparent'
          }`}
        >
          {tab.icon}
          <span className="hidden sm:inline">{tab.label}</span>
        </button>
      ))}
    </div>
  );
}

// ─── Safety Check Tab ─────────────────────────────────────────────────────────

function SafetyCheckTab({
  selectedMeds,
  selectedSupplements,
  onToggleMed,
  onToggleSupplement,
}: {
  selectedMeds: string[];
  selectedSupplements: string[];
  onToggleMed: (med: string) => void;
  onToggleSupplement: (supp: string) => void;
}) {
  const { showToast } = useToast();

  const triggeredRules: SafetyRule[] = useMemo(() => {
    const rules: SafetyRule[] = [];
    for (const rule of SAFETY_RULES) {
      if (rule.medications.length === 0) {
        const hasSupp = rule.supplements.some((s) => selectedSupplements.includes(s));
        const missingSupp = rule.supplements.length > 1
          ? rule.supplements.some((s) => !selectedSupplements.includes(s))
          : false;
        if (hasSupp && missingSupp) rules.push(rule);
      } else {
        const hasMed = rule.medications.some((m) => selectedMeds.includes(m));
        const hasSupp = rule.supplements.some((s) => selectedSupplements.includes(s));
        if (hasMed && hasSupp) rules.push(rule);
      }
    }
    return rules;
  }, [selectedMeds, selectedSupplements]);

  const hasAnySelection = selectedMeds.length > 0 || selectedSupplements.length > 0;

  const clearAll = () => {
    selectedMeds.forEach((m) => onToggleMed(m));
    selectedSupplements.forEach((s) => onToggleSupplement(s));
    showToast('All selections cleared', 'info');
  };

  const getLevelColors = (level: string) => {
    switch (level) {
      case 'CRITICAL':
        return { border: 'border-red-500/30', bg: 'bg-red-500/8', badge: 'bg-red-500/20 text-red-400 border-red-500/30' };
      case 'WARNING':
        return { border: 'border-amber-500/30', bg: 'bg-amber-500/8', badge: 'bg-amber-500/20 text-amber-400 border-amber-500/30' };
      default:
        return { border: 'border-sky-500/30', bg: 'bg-sky-500/8', badge: 'bg-sky-500/20 text-sky-400 border-sky-500/30' };
    }
  };

  const getLevelIcon = (level: string) => {
    switch (level) {
      case 'CRITICAL':
        return <SkullIcon className="w-5 h-5 text-red-400" />;
      case 'WARNING':
        return <AlertTriangleIcon className="w-5 h-5 text-amber-400" />;
      default:
        return <InfoIcon className="w-5 h-5 text-sky-400" />;
    }
  };

  return (
    <div className="space-y-4 pb-6">
      {/* Medications */}
      <div className="glass-card p-4 animate-fadeUp stagger-1" style={{ opacity: 0 }}>
        <div className="flex items-center justify-between mb-3">
          <p className="text-xs font-semibold text-slate-400">Current Medications</p>
          <span className="text-[10px] text-slate-600">{selectedMeds.length} selected</span>
        </div>
        <div className="space-y-1.5 max-h-60 overflow-y-auto custom-scrollbar">
          {MEDICATIONS.map((med) => {
            const isSelected = selectedMeds.includes(med);
            return (
              <button
                key={med}
                type="button"
                onClick={() => onToggleMed(med)}
                className={`flex items-center gap-3 p-2.5 rounded-xl transition-all w-full text-left active:scale-[0.99] ${
                  isSelected
                    ? 'bg-sky-500/10 border border-sky-500/20'
                    : 'hover:bg-white/5 border border-transparent'
                }`}
              >
                <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all flex-shrink-0 ${
                  isSelected ? 'bg-sky-500 border-sky-500' : 'border-slate-600'
                }`}>
                  {isSelected && <CheckIcon />}
                </div>
                <span className="text-xs text-slate-300 leading-snug">{med}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Supplements */}
      <div className="glass-card p-4 animate-fadeUp stagger-2" style={{ opacity: 0 }}>
        <div className="flex items-center justify-between mb-3">
          <p className="text-xs font-semibold text-slate-400">Supplements</p>
          <span className="text-[10px] text-slate-600">{selectedSupplements.length} selected</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {SUPPLEMENTS.map((supp) => (
            <button
              key={supp}
              onClick={() => onToggleSupplement(supp)}
              className={`toggle-chip ${selectedSupplements.includes(supp) ? 'toggle-chip-active' : ''}`}
            >
              {supp}
            </button>
          ))}
        </div>
      </div>

      {/* Clear All */}
      {hasAnySelection && (
        <div className="flex justify-end animate-fadeUp" style={{ opacity: 0 }}>
          <button
            onClick={clearAll}
            className="px-3 py-1.5 rounded-lg bg-white/5 text-xs text-slate-400 border border-white/8 hover:bg-white/10 active:scale-95 transition-all"
          >
            Clear All
          </button>
        </div>
      )}

      {/* Safety Results */}
      <div className="animate-fadeUp stagger-3" style={{ opacity: 0 }}>
        <p className="text-xs font-semibold text-slate-400 mb-3">Safety Results</p>
        {triggeredRules.length > 0 ? (
          <div className="space-y-3">
            {triggeredRules.map((rule) => {
              const colors = getLevelColors(rule.level);
              return (
                <div key={rule.id} className={`rounded-2xl border p-4 ${colors.border} ${colors.bg}`}>
                  <div className="flex items-center gap-2 mb-2">
                    {getLevelIcon(rule.level)}
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${colors.badge}`}>
                      {rule.level}
                    </span>
                    <span className="text-sm font-semibold text-white">{rule.message}</span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">{rule.description}</p>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="glass-card p-6 text-center">
            <div className="w-12 h-12 rounded-full bg-emerald-500/15 flex items-center justify-center mx-auto mb-3">
              <ShieldCheckIcon className="w-6 h-6 text-emerald-400" />
            </div>
            <p className="text-sm text-slate-400 font-medium">No interactions detected</p>
            <p className="text-xs text-slate-500 mt-1">Select medications and supplements above to check</p>
          </div>
        )}
      </div>

      {/* Disclaimer */}
      <div className="glass-card p-3 animate-fadeUp stagger-4" style={{ opacity: 0 }}>
        <p className="text-[10px] text-slate-500 leading-relaxed">
          <strong className="text-slate-400">Disclaimer:</strong> This tool provides general information only and is not medical advice. Always consult your healthcare provider.
        </p>
      </div>
    </div>
  );
}

// ─── Stack Builder Tab ────────────────────────────────────────────────────────

function StackBuilderTab() {
  const { showToast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [activeUseCase, setActiveUseCase] = useState<string>('All');
  const [filterMode, setFilterMode] = useState<'category' | 'usecase'>('category');
  const [stackItems, setStackItems] = useState<StackItem[]>([]);
  const [expandedCards, setExpandedCards] = useState<Set<string>>(new Set());
  const [showStackSummary, setShowStackSummary] = useState(true);

  const filteredSupplements = useMemo(() => {
    let results = searchQuery ? searchSupplements(searchQuery) : SUPPLEMENTS_DB;
    if (filterMode === 'category' && activeCategory !== 'All') {
      results = results.filter((s) => s.category === activeCategory);
    }
    if (filterMode === 'usecase' && activeUseCase !== 'All') {
      results = results.filter((s) => s.useCases?.includes(activeUseCase));
    }
    return results;
  }, [searchQuery, activeCategory, activeUseCase, filterMode]);

  const toggleExpand = (id: string) => {
    setExpandedCards((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const addToStack = (supp: SupplementData, timing: 'AM' | 'PM') => {
    if (stackItems.some((item) => item.supplementId === supp.id)) {
      showToast(`${supp.shortName} is already in your stack`, 'warning');
      return;
    }
    setStackItems((prev) => [...prev, { supplementId: supp.id, timing }]);
    showToast(`${supp.shortName} added to stack (${timing})`, 'success');
  };

  const removeFromStack = (supplementId: string) => {
    const supp = SUPPLEMENTS_DB.find((s) => s.id === supplementId);
    setStackItems((prev) => prev.filter((item) => item.supplementId !== supplementId));
    if (supp) showToast(`${supp.shortName} removed from stack`, 'info');
  };

  const updateStackTiming = (supplementId: string, timing: 'AM' | 'PM') => {
    setStackItems((prev) =>
      prev.map((item) => (item.supplementId === supplementId ? { ...item, timing } : item))
    );
  };

  const isSupplementInStack = (id: string) => stackItems.some((item) => item.supplementId === id);

  const getCategoryColor = (cat: string) => {
    switch (cat) {
      case 'Minerals': return 'bg-amber-500/15 text-amber-400 border-amber-500/20';
      case 'Amino Acids': return 'bg-sky-500/15 text-sky-400 border-sky-500/20';
      case 'Herbal': return 'bg-emerald-500/15 text-emerald-400 border-emerald-500/20';
      case 'Vitamins': return 'bg-purple-500/15 text-purple-400 border-purple-500/20';
      case 'Antioxidants': return 'bg-rose-500/15 text-rose-400 border-rose-500/20';
      case 'Probiotics': return 'bg-teal-500/15 text-teal-400 border-teal-500/20';
      case 'Adaptogens': return 'bg-violet-500/15 text-violet-400 border-violet-500/20';
      default: return 'bg-slate-500/15 text-slate-400 border-slate-500/20';
    }
  };

  const amItems = stackItems.filter((i) => i.timing === 'AM');
  const pmItems = stackItems.filter((i) => i.timing === 'PM');

  return (
    <div className="space-y-4 pb-6">
      {/* My Stack Summary */}
      {stackItems.length > 0 && showStackSummary && (
        <div className="glass-card-hero p-4 animate-fadeUp stagger-1" style={{ opacity: 0 }}>
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-sky-500 to-emerald-500 flex items-center justify-center">
                <LayersIcon className="w-4 h-4 text-white" />
              </div>
              <div>
                <p className="text-sm font-bold text-white">My Stack</p>
                <p className="text-[10px] text-slate-400">{stackItems.length} supplement{stackItems.length !== 1 ? 's' : ''}</p>
              </div>
            </div>
            <button
              onClick={() => setShowStackSummary(false)}
              className="p-1.5 rounded-lg hover:bg-white/5 text-slate-500 transition-all"
            >
              <XIcon className="w-4 h-4" />
            </button>
          </div>

          {amItems.length > 0 && (
            <div className="mb-3">
              <p className="text-[10px] font-semibold text-amber-400 mb-2 flex items-center gap-1.5">
                <SunIcon className="w-3 h-3" /> MORNING ({amItems.length})
              </p>
              <div className="flex flex-wrap gap-1.5">
                {amItems.map((item) => {
                  const supp = SUPPLEMENTS_DB.find((s) => s.id === item.supplementId);
                  if (!supp) return null;
                  return (
                    <div key={item.supplementId} className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-amber-500/10 border border-amber-500/15">
                      <span className="text-[10px] text-amber-300 font-medium">{supp.shortName}</span>
                      <button onClick={() => removeFromStack(item.supplementId)} className="text-amber-400/60 hover:text-amber-300">
                        <XIcon className="w-3 h-3" />
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {pmItems.length > 0 && (
            <div className="mb-3">
              <p className="text-[10px] font-semibold text-purple-400 mb-2 flex items-center gap-1.5">
                <MoonIcon className="w-3 h-3" /> EVENING ({pmItems.length})
              </p>
              <div className="flex flex-wrap gap-1.5">
                {pmItems.map((item) => {
                  const supp = SUPPLEMENTS_DB.find((s) => s.id === item.supplementId);
                  if (!supp) return null;
                  return (
                    <div key={item.supplementId} className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-purple-500/10 border border-purple-500/15">
                      <span className="text-[10px] text-purple-300 font-medium">{supp.shortName}</span>
                      <button onClick={() => removeFromStack(item.supplementId)} className="text-purple-400/60 hover:text-purple-300">
                        <XIcon className="w-3 h-3" />
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          <button
            onClick={() => { setStackItems([]); showToast('Stack cleared', 'info'); }}
            className="w-full mt-1 py-2 rounded-lg bg-white/5 text-[10px] text-slate-500 hover:bg-white/8 transition-all flex items-center justify-center gap-1.5"
          >
            <TrashIcon className="w-3 h-3" /> Clear Stack
          </button>
        </div>
      )}

      {/* Search Bar */}
      <div className="relative animate-fadeUp stagger-2" style={{ opacity: 0 }}>
        <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
        <input
          type="text"
          placeholder="Search supplements..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/[0.03] border border-white/[0.08] text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-sky-500/30 focus:ring-1 focus:ring-sky-500/10 transition-all"
        />
      </div>

      {/* Filter Mode Toggle + Category/Use-Case Chips */}
      <div className="animate-fadeUp stagger-3" style={{ opacity: 0 }}>
        {/* Mode Toggle */}
        <div className="flex items-center gap-2 mb-2.5">
          <span className="text-[10px] text-slate-500 uppercase tracking-wide font-semibold">Filter by</span>
          <div className="flex gap-1 p-0.5 rounded-lg bg-white/[0.03] border border-white/[0.06]">
            <button
              onClick={() => setFilterMode('category')}
              className={`px-2.5 py-1 rounded-md text-[10px] font-medium transition-all ${
                filterMode === 'category'
                  ? 'bg-sky-500/15 text-sky-400 border border-sky-500/20'
                  : 'text-slate-500 hover:text-slate-300 border border-transparent'
              }`}
            >
              Category
            </button>
            <button
              onClick={() => setFilterMode('usecase')}
              className={`px-2.5 py-1 rounded-md text-[10px] font-medium transition-all ${
                filterMode === 'usecase'
                  ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/20'
                  : 'text-slate-500 hover:text-slate-300 border border-transparent'
              }`}
            >
              Use-Case
            </button>
          </div>
        </div>

        {/* Filter Chips */}
        <div className="flex gap-1.5 overflow-x-auto pb-1 -mx-1 px-1 no-scrollbar">
          {filterMode === 'category'
            ? SUPPLEMENT_CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`flex-shrink-0 px-3 py-1.5 rounded-lg text-[11px] font-medium transition-all border ${
                    activeCategory === cat
                      ? 'bg-sky-500/15 text-sky-400 border-sky-500/25'
                      : 'bg-white/[0.03] text-slate-500 border-white/[0.06] hover:text-slate-300 hover:border-white/[0.12]'
                  }`}
                >
                  {cat}
                </button>
              ))
            : SUPPLEMENT_USE_CASES.map((uc) => (
                <button
                  key={uc}
                  onClick={() => setActiveUseCase(uc)}
                  className={`flex-shrink-0 px-3 py-1.5 rounded-lg text-[11px] font-medium transition-all border ${
                    activeUseCase === uc
                      ? 'bg-emerald-500/15 text-emerald-400 border-emerald-500/25'
                      : 'bg-white/[0.03] text-slate-500 border-white/[0.06] hover:text-slate-300 hover:border-white/[0.12]'
                  }`}
                >
                  {uc}
                </button>
              ))
          }
        </div>
      </div>

      {/* Count */}
      <div className="flex items-center justify-between animate-fadeUp stagger-4" style={{ opacity: 0 }}>
        <p className="text-[10px] text-slate-500">{filteredSupplements.length} supplement{filteredSupplements.length !== 1 ? 's' : ''} available</p>
        {stackItems.length > 0 && !showStackSummary && (
          <button onClick={() => setShowStackSummary(true)} className="text-[10px] text-sky-400 hover:text-sky-300 transition-colors">
            View Stack ({stackItems.length})
          </button>
        )}
      </div>

      {/* Supplement Cards */}
      <div className="space-y-3">
        {filteredSupplements.map((supp, idx) => {
          const isExpanded = expandedCards.has(supp.id);
          const inStack = isSupplementInStack(supp.id);
          const existingItem = stackItems.find((i) => i.supplementId === supp.id);
          const staggerClass = idx < 6 ? `stagger-${Math.min(idx + 1, 6)}` : '';

          return (
            <div
              key={supp.id}
              className={`glass-card overflow-hidden animate-fadeUp ${staggerClass}`}
              style={staggerClass ? { opacity: 0 } : undefined}
            >
              {/* Card Header */}
              <div className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-sm font-bold text-white truncate">{supp.name}</h3>
                      {inStack && (
                        <span className="flex-shrink-0 px-1.5 py-0.5 rounded-md bg-sky-500/15 text-[9px] font-bold text-sky-400 border border-sky-500/20">
                          IN STACK
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-500 italic">{supp.tagline}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 mb-3 flex-wrap">
                  <span className={`text-[10px] px-2 py-0.5 rounded-full border font-medium ${getCategoryColor(supp.category)}`}>
                    {supp.category}
                  </span>
                  {supp.useCases && supp.useCases.length > 0 && (
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400/80 border border-emerald-500/15 font-medium">
                      {supp.useCases[0]}
                    </span>
                  )}
                  <span className="text-[10px] text-slate-500">{supp.dosage}</span>
                </div>

                {/* AM/PM Toggle + Actions */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      if (inStack) {
                        updateStackTiming(supp.id, 'AM');
                        showToast(`${supp.shortName} set to AM`, 'info');
                      } else {
                        addToStack(supp, 'AM');
                      }
                    }}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-medium transition-all border ${
                      inStack && existingItem?.timing === 'AM'
                        ? 'bg-amber-500/15 text-amber-400 border-amber-500/25'
                        : 'bg-white/[0.03] text-slate-500 border-white/[0.06] hover:text-amber-400 hover:border-amber-500/20'
                    }`}
                  >
                    <SunIcon className="w-3.5 h-3.5" />
                    AM
                  </button>
                  <button
                    onClick={() => {
                      if (inStack) {
                        updateStackTiming(supp.id, 'PM');
                        showToast(`${supp.shortName} set to PM`, 'info');
                      } else {
                        addToStack(supp, 'PM');
                      }
                    }}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-medium transition-all border ${
                      inStack && existingItem?.timing === 'PM'
                        ? 'bg-purple-500/15 text-purple-400 border-purple-500/25'
                        : 'bg-white/[0.03] text-slate-500 border-white/[0.06] hover:text-purple-400 hover:border-purple-500/20'
                    }`}
                  >
                    <MoonIcon className="w-3.5 h-3.5" />
                    PM
                  </button>

                  <div className="flex-1" />

                  {inStack && (
                    <button
                      onClick={() => removeFromStack(supp.id)}
                      className="p-1.5 rounded-lg text-red-400/60 hover:text-red-400 hover:bg-red-500/10 transition-all"
                    >
                      <MinusIcon className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>

              {/* Expandable Details */}
              <button
                onClick={() => toggleExpand(supp.id)}
                className="w-full flex items-center justify-center gap-1.5 py-2.5 border-t border-white/[0.05] text-[10px] text-slate-500 hover:text-slate-300 hover:bg-white/[0.02] transition-all"
              >
                {isExpanded ? 'Less' : 'More Details'}
                <ChevronDownIcon className={`w-3 h-3 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
              </button>

              {isExpanded && (
                <div className="px-4 pb-4 space-y-3 border-t border-white/[0.05] pt-3">
                  {/* Description */}
                  <div>
                    <p className="text-[10px] font-semibold text-slate-400 mb-1">Description</p>
                    <p className="text-[11px] text-slate-400 leading-relaxed">{supp.description}</p>
                  </div>

                  {/* Mechanism */}
                  <div>
                    <p className="text-[10px] font-semibold text-slate-400 mb-1">Mechanism of Action</p>
                    <p className="text-[11px] text-slate-400 leading-relaxed">{supp.mechanism}</p>
                  </div>

                  {/* Benefits */}
                  <div>
                    <p className="text-[10px] font-semibold text-emerald-400 mb-1">Benefits</p>
                    <ul className="space-y-1">
                      {supp.benefits.map((b, i) => (
                        <li key={i} className="flex items-start gap-1.5 text-[11px] text-slate-400 leading-relaxed">
                          <span className="text-emerald-500 mt-1.5 flex-shrink-0">+</span>
                          {b}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Cautions */}
                  {supp.cautions.length > 0 && (
                    <div>
                      <p className="text-[10px] font-semibold text-amber-400 mb-1">Cautions</p>
                      <ul className="space-y-1">
                        {supp.cautions.map((c, i) => (
                          <li key={i} className="flex items-start gap-1.5 text-[11px] text-slate-400 leading-relaxed">
                            <AlertTriangleIcon className="w-3 h-3 text-amber-500 mt-0.5 flex-shrink-0" />
                            {c}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Stack Notes */}
                  <div>
                    <p className="text-[10px] font-semibold text-sky-400 mb-1">Stack Notes</p>
                    <p className="text-[11px] text-slate-400 leading-relaxed">{supp.stackNotes}</p>
                  </div>

                  {/* Availability & Price */}
                  <div className="flex flex-col gap-1">
                    <p className="text-[10px] text-slate-500">
                      <span className="font-medium text-slate-400">PH Availability:</span> {supp.philippinesAvailability}
                    </p>
                    <p className="text-[10px] text-slate-500">
                      <span className="font-medium text-slate-400">Price Range:</span> {supp.priceRange}
                    </p>
                  </div>
                </div>
              )}
            </div>
          );
        })}

        {filteredSupplements.length === 0 && (
          <div className="glass-card p-8 text-center">
            <SearchIcon className="w-8 h-8 text-slate-600 mx-auto mb-3" />
            <p className="text-sm text-slate-500 font-medium">No supplements found</p>
            <p className="text-xs text-slate-600 mt-1">Try adjusting your search or category filter</p>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Timeline Tab ─────────────────────────────────────────────────────────────

function NeuroLevelBar({ phase, isLast }: { phase: TimelinePhase; isLast: boolean }) {
  const getColor = (level: number) => {
    if (level >= 90) return 'from-emerald-500 to-emerald-400';
    if (level >= 65) return 'from-emerald-500 to-sky-400';
    if (level >= 40) return 'from-amber-500 to-amber-400';
    if (level >= 25) return 'from-red-500 to-orange-400';
    return 'from-red-700 to-red-500';
  };

  const getTextColor = (level: number) => {
    if (level >= 90) return 'text-emerald-400';
    if (level >= 65) return 'text-emerald-400';
    if (level >= 40) return 'text-amber-400';
    if (level >= 25) return 'text-red-400';
    return 'text-red-500';
  };

  return (
    <div className="flex items-center gap-3">
      <div className="w-10 text-right flex-shrink-0">
        <span className={`text-xs font-bold ${getTextColor(phase.neuroLevel)}`}>
          {phase.neuroLevel}%
        </span>
      </div>
      <div className="flex-1 relative">
        <div className="h-3 rounded-full bg-white/[0.04] overflow-hidden">
          <div
            className={`h-full rounded-full bg-gradient-to-r ${getColor(phase.neuroLevel)} transition-all duration-700`}
            style={{ width: `${phase.neuroLevel}%` }}
          />
        </div>
        {!isLast && (
          <div className="absolute left-1/2 top-3 w-px h-4 bg-white/[0.06]" />
        )}
      </div>
    </div>
  );
}

function NeurotransmitterBar({ label, value, color }: { label: string; value: string; color: string }) {
  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between">
        <span className="text-[10px] font-semibold text-slate-400">{label}</span>
      </div>
      <p className="text-[11px] text-slate-500 leading-relaxed">{value}</p>
    </div>
  );
}

function TimelineTab() {
  const [expandedPhases, setExpandedPhases] = useState<Set<string>>(new Set());

  const togglePhaseExpand = (id: string) => {
    setExpandedPhases((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const getPhaseColor = (id: string) => {
    switch (id) {
      case 'baseline': return { accent: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20', dot: 'bg-emerald-400' };
      case 'active-use': return { accent: 'text-amber-400', bg: 'bg-amber-500/10', border: 'border-amber-500/20', dot: 'bg-amber-400' };
      case 'acute-withdrawal': return { accent: 'text-red-400', bg: 'bg-red-500/10', border: 'border-red-500/20', dot: 'bg-red-400' };
      case 'early-recovery': return { accent: 'text-orange-400', bg: 'bg-orange-500/10', border: 'border-orange-500/20', dot: 'bg-orange-400' };
      case 'intermediate-recovery': return { accent: 'text-sky-400', bg: 'bg-sky-500/10', border: 'border-sky-500/20', dot: 'bg-sky-400' };
      case 'extended-recovery': return { accent: 'text-sky-400', bg: 'bg-sky-500/10', border: 'border-sky-500/20', dot: 'bg-sky-400' };
      case 'long-term-recovery': return { accent: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20', dot: 'bg-emerald-400' };
      default: return { accent: 'text-slate-400', bg: 'bg-slate-500/10', border: 'border-slate-500/20', dot: 'bg-slate-400' };
    }
  };

  return (
    <div className="space-y-6 pb-6">
      {/* Header */}
      <div className="glass-card-hero p-5 animate-fadeUp" style={{ opacity: 0 }}>
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-sky-500 flex items-center justify-center shadow-lg shadow-purple-500/15">
            <ClockIcon className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white">Neurochemical Timeline</h2>
            <p className="text-xs text-slate-400">How your brain heals over time</p>
          </div>
        </div>

        {/* Recovery Curve Overview */}
        <div className="mt-4 space-y-1">
          {TIMELINE_PHASES.map((phase, idx) => (
            <NeuroLevelBar key={phase.id} phase={phase} isLast={idx === TIMELINE_PHASES.length - 1} />
          ))}
        </div>
        <div className="flex items-center justify-between mt-2 px-10">
          <span className="text-[9px] text-slate-600">0%</span>
          <span className="text-[9px] text-slate-600">50%</span>
          <span className="text-[9px] text-slate-600">100%</span>
        </div>
      </div>

      {/* Phase Cards */}
      <div className="space-y-4">
        {TIMELINE_PHASES.map((phase, idx) => {
          const colors = getPhaseColor(phase.id);
          const isExpanded = expandedPhases.has(phase.id);
          const staggerClass = idx < 6 ? `stagger-${Math.min(idx + 1, 6)}` : '';

          return (
            <div
              key={phase.id}
              className={`glass-card overflow-hidden animate-fadeUp ${staggerClass}`}
              style={staggerClass ? { opacity: 0 } : undefined}
            >
              {/* Phase Header */}
              <div className="p-4">
                <div className="flex items-start gap-3">
                  {/* Timeline dot */}
                  <div className="flex flex-col items-center pt-1">
                    <div className={`w-3 h-3 rounded-full ${colors.dot} shadow-lg ring-2 ring-white/10`} />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className={`text-sm font-bold ${colors.accent}`}>{phase.name}</h3>
                    </div>
                    <p className="text-[10px] text-slate-500 mb-2">{phase.period}</p>

                    {/* Neuro Level */}
                    <div className="flex items-center gap-3 mb-3">
                      <div className="flex-1 h-2 rounded-full bg-white/[0.04] overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all duration-700 ${
                            phase.neuroLevel >= 80
                              ? 'bg-gradient-to-r from-emerald-500 to-emerald-400'
                              : phase.neuroLevel >= 50
                                ? 'bg-gradient-to-r from-sky-500 to-emerald-400'
                                : phase.neuroLevel >= 30
                                  ? 'bg-gradient-to-r from-amber-500 to-amber-400'
                                  : 'bg-gradient-to-r from-red-600 to-red-400'
                          }`}
                          style={{ width: `${phase.neuroLevel}%` }}
                        />
                      </div>
                      <span className={`text-xs font-bold ${colors.accent} flex-shrink-0`}>
                        {phase.neuroLevel}%
                      </span>
                    </div>

                    <p className="text-[11px] text-slate-400 leading-relaxed">{phase.description}</p>
                  </div>
                </div>
              </div>

              {/* Expand/Collapse */}
              <button
                onClick={() => togglePhaseExpand(phase.id)}
                className="w-full flex items-center justify-center gap-1.5 py-2.5 border-t border-white/[0.05] text-[10px] text-slate-500 hover:text-slate-300 hover:bg-white/[0.02] transition-all"
              >
                {isExpanded ? 'Collapse' : 'View Details'}
                <ChevronDownIcon className={`w-3 h-3 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
              </button>

              {/* Expanded Content */}
              {isExpanded && (
                <div className="px-4 pb-4 space-y-4 border-t border-white/[0.05] pt-4">
                  {/* Symptoms */}
                  {phase.symptoms.length > 0 && (
                    <div>
                      <p className="text-[10px] font-semibold text-slate-400 mb-2">Symptoms</p>
                      <div className="flex flex-wrap gap-1.5">
                        {phase.symptoms.map((symptom, i) => (
                          <span key={i} className="text-[10px] px-2 py-1 rounded-lg bg-white/[0.04] text-slate-400 border border-white/[0.06]">
                            {symptom}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Neurotransmitter Status */}
                  <div>
                    <p className="text-[10px] font-semibold text-slate-400 mb-2">Neurotransmitter Status</p>
                    <div className="space-y-2.5">
                      <NeurotransmitterBar label="Dopamine" value={phase.neurotransmitterStatus.dopamine} color="amber" />
                      <NeurotransmitterBar label="Serotonin" value={phase.neurotransmitterStatus.serotonin} color="sky" />
                      <NeurotransmitterBar label="GABA" value={phase.neurotransmitterStatus.gaba} color="emerald" />
                      <NeurotransmitterBar label="Glutamate" value={phase.neurotransmitterStatus.glutamate} color="red" />
                      <NeurotransmitterBar label="Cortisol" value={phase.neurotransmitterStatus.cortisol} color="purple" />
                    </div>
                  </div>

                  {/* Priority Supplements */}
                  {phase.prioritySupplements.length > 0 && (
                    <div>
                      <p className="text-[10px] font-semibold text-emerald-400 mb-2">Priority Supplements</p>
                      <div className="space-y-2">
                        {phase.prioritySupplements.map((supp, i) => (
                          <div key={i} className="flex items-start gap-2 p-2 rounded-lg bg-emerald-500/[0.04] border border-emerald-500/10">
                            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 flex-shrink-0" />
                            <div>
                              <p className="text-[11px] font-medium text-emerald-300">{supp.name}</p>
                              <p className="text-[10px] text-slate-500 leading-relaxed">{supp.reason}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Lifestyle Actions */}
                  {phase.lifestyleActions.length > 0 && (
                    <div>
                      <p className="text-[10px] font-semibold text-sky-400 mb-2">Lifestyle Actions</p>
                      <ul className="space-y-1.5">
                        {phase.lifestyleActions.map((action, i) => (
                          <li key={i} className="flex items-start gap-2 text-[11px] text-slate-400 leading-relaxed">
                            <div className="w-4 h-4 rounded-md bg-sky-500/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                              <span className="text-[9px] font-bold text-sky-400">{i + 1}</span>
                            </div>
                            {action}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Mood Expectation */}
                  <div>
                    <p className="text-[10px] font-semibold text-purple-400 mb-1">Mood Expectation</p>
                    <p className="text-[11px] text-slate-400 leading-relaxed italic">{phase.moodExpectation}</p>
                  </div>

                  {/* Warnings */}
                  {phase.warnings.length > 0 && (
                    <div>
                      <p className="text-[10px] font-semibold text-red-400 mb-2">Warnings</p>
                      <div className="space-y-2">
                        {phase.warnings.map((warning, i) => (
                          <div key={i} className="flex items-start gap-2 p-2.5 rounded-lg bg-red-500/[0.06] border border-red-500/15">
                            <AlertTriangleIcon className="w-3.5 h-3.5 text-red-400 mt-0.5 flex-shrink-0" />
                            <p className="text-[11px] text-red-300/80 leading-relaxed">{warning}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Day Range Badge */}
                  <div className="flex justify-center">
                    <span className={`text-[10px] px-3 py-1 rounded-full border ${colors.border} ${colors.accent} font-medium`}>
                      {phase.dayRange}
                    </span>
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

// ─── Main BioTools Component ──────────────────────────────────────────────────

export default function BioTools({
  selectedMeds,
  selectedSupplements,
  onToggleMed,
  onToggleSupplement,
}: BioToolsProps) {
  const [activeTab, setActiveTab] = useState<SubTab>('safety');

  return (
    <div className="space-y-4">
      {/* Subtab Navigation */}
      <div className="animate-fadeUp">
        <SubTabNav active={activeTab} onChange={setActiveTab} />
      </div>

      {/* Tab Content */}
      {activeTab === 'safety' && (
        <SafetyCheckTab
          selectedMeds={selectedMeds}
          selectedSupplements={selectedSupplements}
          onToggleMed={onToggleMed}
          onToggleSupplement={onToggleSupplement}
        />
      )}
      {activeTab === 'stack-builder' && <StackBuilderTab />}
      {activeTab === 'timeline' && <TimelineTab />}
    </div>
  );
}
