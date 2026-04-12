'use client';

import React, { useState } from 'react';
import { EMERGENCY_HOTLINES, SUPPLEMENT_STORES, NATURAL_ALTERNATIVES } from '@/lib/recovery-constants';

type Tab = 'hotlines' | 'stores' | 'alternatives';

export default function Resources() {
  const [tab, setTab] = useState<Tab>('hotlines');

  return (
    <div className="space-y-4 pb-4">
      <div className="animate-fadeUp">
        <h2 className="text-lg font-bold text-white">🇵🇭 Resources</h2>
        <p className="text-xs text-slate-400 mt-1">Philippines-specific recovery resources</p>
      </div>

      {/* Tab Navigation */}
      <div className="glass-card p-1.5 flex animate-fadeUp stagger-1" style={{ opacity: 0 }}>
        <button
          onClick={() => setTab('hotlines')}
          className={`flex-1 py-2 rounded-xl text-xs font-medium transition-all ${
            tab === 'hotlines'
              ? 'bg-red-500/15 text-red-400 border border-red-500/20'
              : 'text-slate-400 hover:text-slate-300'
          }`}
        >
          📞 Hotlines
        </button>
        <button
          onClick={() => setTab('stores')}
          className={`flex-1 py-2 rounded-xl text-xs font-medium transition-all ${
            tab === 'stores'
              ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/20'
              : 'text-slate-400 hover:text-slate-300'
          }`}
        >
          🛒 Stores
        </button>
        <button
          onClick={() => setTab('alternatives')}
          className={`flex-1 py-2 rounded-xl text-xs font-medium transition-all ${
            tab === 'alternatives'
              ? 'bg-sky-500/15 text-sky-400 border border-sky-500/20'
              : 'text-slate-400 hover:text-slate-300'
          }`}
        >
          🌿 Alternatives
        </button>
      </div>

      {/* Hotlines */}
      {tab === 'hotlines' && (
        <div className="space-y-3 animate-fadeUp stagger-2" style={{ opacity: 0 }}>
          <div className="glass-card-elevated p-3 border-red-500/20">
            <p className="text-xs text-red-400 font-semibold mb-1">🚨 In an emergency, call 911</p>
            <p className="text-xs text-slate-400">If you or someone you know is in immediate danger, please call emergency services right away.</p>
          </div>
          {EMERGENCY_HOTLINES.map((hotline, i) => (
            <div key={i} className="glass-card p-4">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-semibold text-white">{hotline.name}</p>
                  <p className="text-xs text-slate-400 mt-0.5">{hotline.description}</p>
                </div>
                <a
                  href={`tel:${hotline.number}`}
                  className="px-3 py-1.5 rounded-lg bg-emerald-500/15 text-emerald-400 text-xs font-medium border border-emerald-500/20 hover:bg-emerald-500/25 transition-colors whitespace-nowrap ml-3 flex-shrink-0"
                >
                  {hotline.number}
                </a>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Stores */}
      {tab === 'stores' && (
        <div className="space-y-3 animate-fadeUp stagger-2" style={{ opacity: 0 }}>
          {SUPPLEMENT_STORES.map((store, i) => (
            <div key={i} className="glass-card p-4">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/15 flex items-center justify-center flex-shrink-0">
                  <span className="text-lg">🛒</span>
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">{store.name}</p>
                  <p className="text-xs text-slate-400 mt-0.5">📍 {store.locations}</p>
                  <p className="text-xs text-slate-500 mt-1">{store.note}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Natural Alternatives */}
      {tab === 'alternatives' && (
        <div className="space-y-2 animate-fadeUp stagger-2" style={{ opacity: 0 }}>
          {NATURAL_ALTERNATIVES.map((alt, i) => (
            <div key={i} className="glass-card p-3.5">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-sky-500/10 flex items-center justify-center flex-shrink-0 text-sm">
                  🌱
                </div>
                <div>
                  <p className="text-sm font-medium text-white">{alt.name}</p>
                  <p className="text-xs text-slate-400 mt-0.5">{alt.benefit}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
