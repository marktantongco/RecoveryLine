'use client';

import React, { useState } from 'react';
import { EMERGENCY_HOTLINES, SUPPLEMENT_STORES, NATURAL_ALTERNATIVES } from '@/lib/recovery-constants';

interface ResourcesProps {
  onNavigate?: (section: string) => void;
}

type Tab = 'hotlines' | 'stores' | 'alternatives';

export default function Resources({ onNavigate }: ResourcesProps) {
  const [tab, setTab] = useState<Tab>('hotlines');

  return (
    <div className="space-y-4 pb-6">
      {/* Header */}
      <div className="animate-fadeUp">
        <h2 className="text-lg font-bold text-white">{'\ud83c\uddf5\ud83c\udded'} Resources</h2>
        <p className="text-xs text-slate-400 mt-0.5">Philippines-specific recovery resources</p>
      </div>

      {/* Tab Navigation */}
      <div className="glass-card p-1.5 flex animate-fadeUp stagger-1" style={{ opacity: 0 }}>
        <button
          onClick={() => setTab('hotlines')}
          className={`flex-1 py-2.5 rounded-xl text-xs font-medium transition-all ${
            tab === 'hotlines'
              ? 'bg-red-500/15 text-red-400 border border-red-500/20 shadow-sm'
              : 'text-slate-400 hover:text-slate-300'
          }`}
        >
          {'\ud83d\udcde'} Hotlines
        </button>
        <button
          onClick={() => setTab('stores')}
          className={`flex-1 py-2.5 rounded-xl text-xs font-medium transition-all ${
            tab === 'stores'
              ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/20 shadow-sm'
              : 'text-slate-400 hover:text-slate-300'
          }`}
        >
          {'\ud83d\uded2'} Stores
        </button>
        <button
          onClick={() => setTab('alternatives')}
          className={`flex-1 py-2.5 rounded-xl text-xs font-medium transition-all ${
            tab === 'alternatives'
              ? 'bg-sky-500/15 text-sky-400 border border-sky-500/20 shadow-sm'
              : 'text-slate-400 hover:text-slate-300'
          }`}
        >
          {'\ud83c\udf3f'} Alternatives
        </button>
      </div>

      {/* Hotlines */}
      {tab === 'hotlines' && (
        <div className="space-y-3 animate-fadeUp stagger-2" style={{ opacity: 0 }}>
          <div className="glass-card-elevated p-3 border-red-500/20">
            <p className="text-xs text-red-400 font-semibold mb-1">{'\ud83d\udea8'} In an emergency, call 911</p>
            <p className="text-xs text-slate-400">If you or someone you know is in immediate danger, call emergency services right away.</p>
          </div>
          {EMERGENCY_HOTLINES.map((hotline, i) => (
            <a
              key={i}
              href={`tel:${hotline.number.replace(/\D/g, '')}`}
              className="glass-card p-4 block hover:border-white/15 active:scale-[0.99] transition-all"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3 min-w-0">
                  <div className="w-10 h-10 rounded-xl bg-red-500/15 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72" />
                    </svg>
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-white">{hotline.name}</p>
                    <p className="text-xs text-slate-400 mt-0.5">{hotline.description}</p>
                  </div>
                </div>
                <span className="px-3 py-1.5 rounded-lg bg-emerald-500/15 text-emerald-400 text-xs font-bold border border-emerald-500/20 whitespace-nowrap ml-3 flex-shrink-0 font-mono">
                  {hotline.number}
                </span>
              </div>
            </a>
          ))}
        </div>
      )}

      {/* Stores */}
      {tab === 'stores' && (
        <div className="space-y-3 animate-fadeUp stagger-2" style={{ opacity: 0 }}>
          {SUPPLEMENT_STORES.map((store, i) => (
            <div key={i} className="glass-card p-4">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/15 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-lg">{'\ud83d\uded2'}</span>
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">{store.name}</p>
                  <p className="text-xs text-slate-400 mt-0.5">{'\ud83d\udccd'} {store.locations}</p>
                  <p className="text-xs text-slate-500 mt-1">{store.note}</p>
                </div>
              </div>
            </div>
          ))}

          {/* Link to Safety Checker */}
          {onNavigate && (
            <button
              onClick={() => onNavigate('safety')}
              className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-purple-500 to-violet-500 text-white text-sm font-semibold shadow-lg shadow-purple-500/20 hover:shadow-purple-500/30 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
              </svg>
              Check Supplement Safety
            </button>
          )}
        </div>
      )}

      {/* Natural Alternatives */}
      {tab === 'alternatives' && (
        <div className="space-y-2 animate-fadeUp stagger-2" style={{ opacity: 0 }}>
          {NATURAL_ALTERNATIVES.map((alt, i) => (
            <div key={i} className="glass-card p-3.5">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-sky-500/10 flex items-center justify-center flex-shrink-0 text-sm mt-0.5">
                  {'\ud83c\udf31'}
                </div>
                <div>
                  <p className="text-sm font-medium text-white">{alt.name}</p>
                  <p className="text-xs text-slate-400 mt-0.5 leading-relaxed">{alt.benefit}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
