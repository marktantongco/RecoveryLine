'use client';

import React from 'react';
import { MEDICATIONS, SUPPLEMENTS, SAFETY_RULES } from '@/lib/recovery-constants';
import { SafetyRule } from '@/lib/recovery-types';

interface SafetyToolsProps {
  selectedMeds: string[];
  selectedSupplements: string[];
  onToggleMed: (med: string) => void;
  onToggleSupplement: (supp: string) => void;
}

export default function SafetyTools({
  selectedMeds,
  selectedSupplements,
  onToggleMed,
  onToggleSupplement,
}: SafetyToolsProps) {
  // Evaluate safety rules
  const triggeredRules: SafetyRule[] = [];

  for (const rule of SAFETY_RULES) {
    // For rules with no medications (like rule-3), check supplements only
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

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'CRITICAL': return 'border-red-500/30 bg-red-500/10';
      case 'WARNING': return 'border-amber-500/30 bg-amber-500/10';
      case 'INFO': return 'border-sky-500/30 bg-sky-500/10';
      default: return '';
    }
  };

  const getLevelBadge = (level: string) => {
    switch (level) {
      case 'CRITICAL': return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 'WARNING': return 'bg-amber-500/20 text-amber-400 border-amber-500/30';
      case 'INFO': return 'bg-sky-500/20 text-sky-400 border-sky-500/30';
      default: return '';
    }
  };

  const getLevelIcon = (level: string) => {
    switch (level) {
      case 'CRITICAL': return '🚨';
      case 'WARNING': return '⚠️';
      case 'INFO': return 'ℹ️';
      default: return '';
    }
  };

  return (
    <div className="space-y-4 pb-4">
      <div className="animate-fadeUp">
        <h2 className="text-lg font-bold text-white">💊 Safety Tools</h2>
        <p className="text-xs text-slate-400 mt-1">Check medication & supplement interactions</p>
      </div>

      {/* Medications */}
      <div className="glass-card p-4 animate-fadeUp stagger-1" style={{ opacity: 0 }}>
        <p className="text-xs font-semibold text-slate-400 mb-3">💊 Current Medications</p>
        <div className="space-y-2 max-h-64 overflow-y-auto custom-scrollbar">
          {MEDICATIONS.map((med) => (
            <label
              key={med}
              className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/5 cursor-pointer transition-colors"
            >
              <div className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all flex-shrink-0 ${
                selectedMeds.includes(med)
                  ? 'bg-sky-500 border-sky-500'
                  : 'border-slate-600'
              }`}>
                {selectedMeds.includes(med) && (
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 6 9 17l-5-5" />
                  </svg>
                )}
              </div>
              <span className="text-xs text-slate-300 leading-snug">{med}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Supplements */}
      <div className="glass-card p-4 animate-fadeUp stagger-2" style={{ opacity: 0 }}>
        <p className="text-xs font-semibold text-slate-400 mb-3">🌿 Supplements</p>
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
            {triggeredRules.map((rule) => (
              <div
                key={rule.id}
                className={`rounded-2xl border p-4 ${getLevelColor(rule.level)}`}
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-lg">{getLevelIcon(rule.level)}</span>
                  <span className={`text-xs font-bold px-2 py-0.5 rounded-full border ${getLevelBadge(rule.level)}`}>
                    {rule.level}
                  </span>
                  <span className="text-sm font-semibold text-white">{rule.message}</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">{rule.description}</p>
              </div>
            ))}
          </div>
        ) : (
          <div className="glass-card p-6 text-center">
            <p className="text-2xl mb-2">✅</p>
            <p className="text-sm text-slate-400">No interactions detected.</p>
            <p className="text-xs text-slate-500 mt-1">Select medications and supplements above to check.</p>
          </div>
        )}
      </div>

      {/* Disclaimer */}
      <div className="glass-card p-3 animate-fadeUp stagger-4" style={{ opacity: 0 }}>
        <p className="text-[10px] text-slate-500 leading-relaxed">
          ⚕️ <strong className="text-slate-400">Disclaimer:</strong> This tool provides general information only and is not medical advice. Always consult your healthcare provider before starting, stopping, or combining medications and supplements.
        </p>
      </div>
    </div>
  );
}
