'use client';

import React from 'react';
import { SectionName } from '@/lib/recovery-types';

interface BottomNavProps {
  currentSection: SectionName;
  onNavigate: (section: SectionName) => void;
  onSettings: () => void;
}

const NAV_ITEMS: { id: SectionName; label: string; icon: string }[] = [
  { id: 'home', label: 'Home', icon: '🏠' },
  { id: 'checkin', label: 'Check-In', icon: '📝' },
  { id: 'history', label: 'History', icon: '📅' },
  { id: 'stats', label: 'Stats', icon: '📊' },
  { id: 'notes', label: 'Notes', icon: '📋' },
];

export default function BottomNav({ currentSection, onNavigate, onSettings }: BottomNavProps) {
  return (
    <>
      <nav className="fixed bottom-0 left-0 right-0 z-40 bg-[#0a0f1a]/95 backdrop-blur-lg border-t border-white/5">
        <div className="flex items-center justify-around max-w-md mx-auto px-2 py-1" style={{ paddingBottom: 'max(8px, env(safe-area-inset-bottom))' }}>
          {NAV_ITEMS.map((item) => {
            const isActive = currentSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-xl transition-all ${
                  isActive
                    ? 'text-sky-400'
                    : 'text-slate-500 hover:text-slate-400'
                }`}
              >
                <span className={`text-lg transition-transform ${isActive ? 'scale-110' : ''}`}>{item.icon}</span>
                <span className={`text-[10px] font-medium ${isActive ? 'text-sky-400' : 'text-slate-500'}`}>{item.label}</span>
                {isActive && (
                  <div className="w-1 h-1 rounded-full bg-sky-400 mt-0.5" />
                )}
              </button>
            );
          })}
          {/* Settings gear */}
          <button
            onClick={onSettings}
            className="flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-xl text-slate-500 hover:text-slate-400 transition-all"
          >
            <span className="text-lg">⚙️</span>
            <span className="text-[10px] font-medium">Settings</span>
          </button>
        </div>
      </nav>
    </>
  );
}
