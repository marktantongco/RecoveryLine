'use client';

import React from 'react';
import { SectionName } from '@/lib/recovery-types';

interface BottomNavProps {
  currentSection: SectionName;
  onNavigate: (section: SectionName) => void;
  onSettings: () => void;
  showSettings: boolean;
}

const NAV_ITEMS: { id: SectionName; label: string; icon: string }[] = [
  { id: 'home', label: 'Home', icon: '\ud83c\udfe0' },
  { id: 'checkin', label: 'Check-In', icon: '\u2705' },
  { id: 'history', label: 'History', icon: '\ud83d\udcc5' },
  { id: 'stats', label: 'Stats', icon: '\ud83d\udcca' },
  { id: 'notes', label: 'Notes', icon: '\ud83d\udcdd' },
];

export default function BottomNav({ currentSection, onNavigate, onSettings, showSettings }: BottomNavProps) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-[#0a0f1a]/95 backdrop-blur-xl border-t border-white/5">
      <div className="flex items-center justify-around max-w-md mx-auto px-1 py-1" style={{ paddingBottom: 'max(6px, env(safe-area-inset-bottom))' }}>
        {NAV_ITEMS.map((item) => {
          const isActive = currentSection === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`flex flex-col items-center gap-0.5 px-2.5 py-1.5 rounded-xl transition-all active:scale-90 ${
                isActive
                  ? 'text-sky-400'
                  : 'text-slate-500 hover:text-slate-400'
              }`}
            >
              <span className={`text-base transition-transform duration-200 ${isActive ? 'scale-110' : ''}`}>{item.icon}</span>
              <span className={`text-[9px] font-medium ${isActive ? 'text-sky-400' : 'text-slate-500'}`}>{item.label}</span>
              {isActive && (
                <div className="w-1 h-1 rounded-full bg-sky-400 mt-0.5" />
              )}
            </button>
          );
        })}
        {/* Settings */}
        <button
          onClick={onSettings}
          className={`flex flex-col items-center gap-0.5 px-2.5 py-1.5 rounded-xl transition-all active:scale-90 ${
            showSettings
              ? 'text-sky-400'
              : 'text-slate-500 hover:text-slate-400'
          }`}
        >
          <span className={`text-base transition-transform duration-200 ${showSettings ? 'scale-110' : ''}`}>{'\u2699\ufe0f'}</span>
          <span className={`text-[9px] font-medium ${showSettings ? 'text-sky-400' : 'text-slate-500'}`}>Settings</span>
          {showSettings && (
            <div className="w-1 h-1 rounded-full bg-sky-400 mt-0.5" />
          )}
        </button>
      </div>
    </nav>
  );
}
