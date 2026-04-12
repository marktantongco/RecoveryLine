'use client';

import React from 'react';
import { MEDICATIONS, SUPPLEMENTS, SAFETY_RULES } from '@/lib/recovery-constants';
import { SafetyRule } from '@/lib/recovery-types';
import { useToast } from './Toast';

interface SafetyToolsProps {
  selectedMeds: string[];
  selectedSupplements: string[];
  onToggleMed: (med: string) => void;
  onToggleSupplement: (supp: string) => void;
  onNavigate?: (section: string) => void;
}

export default function SafetyTools({
  selectedMeds,
  selectedSupplements,
  onToggleMed,
  onToggleSupplement,
  onNavigate,
}: SafetyToolsProps) {
  const { showToast } = useToast();

  // Evaluate safety rules
  const triggeredRules: SafetyRule[] = [];

  for (const rule of SAFETY_RULES) {
    if (rule.medications.length === 0) {
      const hasSupp = rule.supplements.some((s) => selectedSupplements.includes(s));
      const missingSupp = rule.supplements.length > 1
        ? rule.supplements.some((s) => !selectedSupplements.includes(s))
        : false;
      if (hasSupp && missingSupp) {
        triggeredRules.push(rule);
      }
    } else {
      const hasMed = rule.medications.some((m) => selectedMeds.includes(m));
      const hasSupp = rule.supplements.some((s) => selectedSupplements.includes(s));
      if (hasMed && hasSupp) {
        triggeredRules.push(rule);
      }
    }
  }

  const hasAnySelection = selectedMeds.length > 0 || selectedSupplements.length > 0;

  const clearAll = () => {
    selectedMeds.forEach((m) => onToggleMed(m));
    selectedSupplements.forEach((s) => onToggleSupplement(s));
    showToast('All selections cleared', 'info');
  };

  const getLevelColors = (level: string) => {
    switch (level) {
      case 'CRITICAL': return { border: 'border-red-500/30', bg: 'bg-red-500/8', badge: 'bg-red-500/20 text-red-400 border-red-500/30' };
      case 'WARNING': return { border: 'border-amber-500/30', bg: 'bg-amber-500/8', badge: 'bg-amber-500/20 text-amber-400 border-amber-500/30' };
      default: return { border: 'border-sky-500/30', bg: 'bg-sky-500/8', badge: 'bg-sky-500/20 text-sky-400 border-sky-500/30' };
    }
  };

  const getLevelIcon = (level: string) => {
    switch (level) {
      case 'CRITICAL': return '\ud83d\udea8';
      case 'WARNING': return '\u26a0\ufe0f';
      default: return '\u2139\ufe0f';
    }
  };

  return (
    <div className="space-y-4 pb-6">
      {/* Header */}
      <div className="flex items-center justify-between animate-fadeUp">
        <div>
          <h2 className="text-lg font-bold text-white">Safety Tools</h2>
          <p className="text-xs text-slate-400 mt-0.5">Check medication & supplement interactions</p>
        </div>
        {hasAnySelection && (
          <button
            onClick={clearAll}
            className="px-3 py-1.5 rounded-lg bg-white/5 text-xs text-slate-400 border border-white/8 hover:bg-white/10 active:scale-95 transition-all"
          >
            Clear All
          </button>
        )}
      </div>

      {/* Medications - FIXED with onClick */}
      <div className="glass-card p-4 animate-fadeUp stagger-1" style={{ opacity: 0 }}>
        <div className="flex items-center justify-between mb-3">
          <p className="text-xs font-semibold text-slate-400">Current Medications</p>
          <span className="text-[10px] text-slate-600">{selectedMeds.length} selected</span>
        </div>
        <div className="space-y-1.5 max-h-72 overflow-y-auto custom-scrollbar">
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
                  isSelected
                    ? 'bg-sky-500 border-sky-500'
                    : 'border-slate-600'
                }`}>
                  {isSelected && (
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 6 9 17l-5-5" />
                    </svg>
                  )}
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

      {/* Safety Results */}
      <div className="animate-fadeUp stagger-3" style={{ opacity: 0 }}>
        <p className="text-xs font-semibold text-slate-400 mb-3">Safety Results</p>
        {triggeredRules.length > 0 ? (
          <div className="space-y-3">
            {triggeredRules.map((rule) => {
              const colors = getLevelColors(rule.level);
              return (
                <div
                  key={rule.id}
                  className={`rounded-2xl border p-4 ${colors.border} ${colors.bg}`}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-lg">{getLevelIcon(rule.level)}</span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${colors.badge}`}>
                      {rule.level}
                    </span>
                    <span className="text-sm font-semibold text-white">{rule.message}</span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">{rule.description}</p>
                </div>
              );
            })}

            {/* Link to Resources when CRITICAL warning */}
            {triggeredRules.some((r) => r.level === 'CRITICAL') && onNavigate && (
              <button
                onClick={() => onNavigate('resources')}
                className="w-full p-3.5 rounded-xl bg-red-500/10 border border-red-500/20 text-sm text-red-400 font-medium hover:bg-red-500/15 active:scale-[0.99] transition-all flex items-center justify-center gap-2"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07" />
                </svg>
                View Emergency Hotlines
              </button>
            )}
          </div>
        ) : (
          <div className="glass-card p-6 text-center">
            <div className="w-12 h-12 rounded-full bg-emerald-500/15 flex items-center justify-center mx-auto mb-3">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><path d="m9 11 3 3L22 4" />
              </svg>
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
