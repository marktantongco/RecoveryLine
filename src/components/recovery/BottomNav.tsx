'use client';

import React, { useState, useCallback, useEffect } from 'react';
import { SectionName } from '@/lib/recovery-types';

interface BottomNavProps {
  currentSection: SectionName;
  onNavigate: (section: SectionName) => void;
  onSettings: () => void;
  showSettings: boolean;
}

// Sub-menu items shown under "More"
const MORE_MENU_ITEMS: {
  id: SectionName;
  label: string;
  emoji: string;
  icon: React.ReactNode;
}[] = [
  {
    id: 'phguide',
    label: 'PH Guide',
    emoji: '\u{1F1F5}\u{1F1ED}',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
        <circle cx="12" cy="10" r="3" />
      </svg>
    ),
  },
  {
    id: 'protocol',
    label: 'Protocol',
    emoji: '\u{1F4CB}',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
        <path d="m9 11 3 3L22 4" />
      </svg>
    ),
  },
];

// Settings item at bottom of More menu
const SETTINGS_ITEM = {
  label: 'Settings',
  emoji: '\u2699\uFE0F',
  icon: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
    </svg>
  ),
};

// Main bottom nav items (5 sections + More)
const NAV_ITEMS: { id: SectionName; label: string; icon: React.ReactNode; activeIcon: React.ReactNode }[] = [
  {
    id: 'home',
    label: 'Home',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
    activeIcon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
  },
  {
    id: 'substances',
    label: 'Substances',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M8 2v4" />
        <path d="M16 2v4" />
        <rect x="2" y="6" width="20" height="16" rx="2" />
        <path d="M2 10h20" />
        <path d="M12 6v16" />
      </svg>
    ),
    activeIcon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M8 2v4" />
        <path d="M16 2v4" />
        <rect x="2" y="6" width="20" height="16" rx="2" />
        <path d="M2 10h20" />
        <path d="M12 6v16" />
      </svg>
    ),
  },
  {
    id: 'nutrition',
    label: 'Nutrition',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 8h1a4 4 0 0 1 0 8h-1" />
        <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z" />
        <path d="M2 12h16" />
      </svg>
    ),
    activeIcon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 8h1a4 4 0 0 1 0 8h-1" />
        <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z" />
        <path d="M2 12h16" />
      </svg>
    ),
  },
  {
    id: 'mindpsych',
    label: 'Mind',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" />
        <path d="m8 14 1.5-4.5L11 14" />
        <path d="m14 14 1.5 4.5L11 14" />
        <path d="M9 18h6" />
        <path d="M9 6h6" />
      </svg>
    ),
    activeIcon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" />
        <path d="m8 14 1.5-4.5L11 14" />
        <path d="m14 14 1.5 4.5L11 14" />
        <path d="M9 18h6" />
        <path d="M9 6h6" />
      </svg>
    ),
  },
  {
    id: 'recovery',
    label: 'Recovery',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
    ),
    activeIcon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
    ),
  },

];

export default React.memo(function BottomNav({
  currentSection,
  onNavigate,
  onSettings,
}: BottomNavProps) {
  const [moreMenuOpen, setMoreMenuOpen] = useState(false);

  // Check if any More sub-menu section is active (to highlight More button)
  // Note: 'mindpsych' is excluded — Mind has its own nav button now
  const isMoreActive = ['phguide', 'nutrition', 'protocol'].includes(currentSection);

  // Close More menu when currentSection changes (e.g. via header nav)
  useEffect(() => {
    setMoreMenuOpen(false);
  }, [currentSection]);

  // Toggle More menu
  const handleMoreToggle = useCallback(() => {
    setMoreMenuOpen((prev) => !prev);
  }, []);

  // Close More menu
  const closeMoreMenu = useCallback(() => {
    setMoreMenuOpen(false);
  }, []);

  // Handle sub-menu item tap — navigate and close menu
  const handleMoreItemTap = useCallback(
    (section: SectionName) => {
      try {
        setMoreMenuOpen(false);
        onNavigate(section);
      } catch (err) {
        console.error('[BottomNav] Failed to navigate from More menu:', err);
      }
    },
    [onNavigate],
  );

  // Handle Settings tap in sub-menu — open settings and close menu
  const handleSettingsTap = useCallback(() => {
    try {
      setMoreMenuOpen(false);
      onSettings();
    } catch (err) {
      console.error('[BottomNav] Failed to open settings:', err);
    }
  }, [onSettings]);

  return (
    <>
      {/* Transparent overlay — closes More menu on tap */}
      {moreMenuOpen && (
        <div
          className="fixed inset-0 z-[9998]"
          style={{ background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(4px)', WebkitBackdropFilter: 'blur(4px)', touchAction: 'none', overscrollBehavior: 'none' }}
          onClick={closeMoreMenu}
          onContextMenu={(e) => e.preventDefault()}
          aria-hidden="true"
        />
      )}

      {/* More sub-menu panel — slides up above the bottom nav */}
      {moreMenuOpen && (
        <div
          className="fixed bottom-0 left-0 right-0 z-[10000] animate-slideUpMenu"
          style={{
            paddingBottom: 'calc(64px + max(6px, env(safe-area-inset-bottom)))',
          }}
          role="menu"
          aria-label="More options"
          id="bottom-nav-more-menu"
        >
          <div className="max-w-md mx-auto px-3">
            <div
              className="bg-[#0a0f1a]/95 backdrop-blur-xl rounded-t-2xl border border-white/5 border-b-0 shadow-2xl shadow-black/50 overflow-hidden"
            >
              {/* Menu items */}
              <div className="py-2">
                {MORE_MENU_ITEMS.map((item, index) => {
                  const isActive = currentSection === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => handleMoreItemTap(item.id)}
                      className="w-full flex items-center gap-3.5 px-4 py-3 transition-all duration-150 active:bg-white/5 text-left"
                      role="menuitem"
                      aria-label={`Go to ${item.label}`}
                      style={{ animationDelay: `${index * 30}ms` }}
                    >
                      <span
                        className={`text-lg flex-shrink-0 ${
                          isActive ? 'opacity-100' : 'opacity-60'
                        }`}
                        aria-hidden="true"
                      >
                        {item.emoji}
                      </span>
                      <span
                        className={`flex-1 text-sm font-medium ${
                          isActive ? 'text-sky-400' : 'text-slate-300'
                        }`}
                      >
                        {item.label}
                      </span>
                      <span
                        className={`flex-shrink-0 ${
                          isActive ? 'text-sky-400' : 'text-slate-600'
                        }`}
                        aria-hidden="true"
                      >
                        {item.icon}
                      </span>
                    </button>
                  );
                })}

                {/* Divider */}
                <div className="mx-4 my-1 border-t border-white/[0.06]" />

                {/* Settings */}
                <button
                  onClick={handleSettingsTap}
                  className="w-full flex items-center gap-3.5 px-4 py-3 transition-all duration-150 active:bg-white/5 text-left"
                  role="menuitem"
                  aria-label="Open Settings"
                >
                  <span className="text-lg flex-shrink-0 opacity-60" aria-hidden="true">
                    {SETTINGS_ITEM.emoji}
                  </span>
                  <span className="flex-1 text-sm font-medium text-slate-300">
                    {SETTINGS_ITEM.label}
                  </span>
                  <span className="flex-shrink-0 text-slate-600" aria-hidden="true">
                    {SETTINGS_ITEM.icon}
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Bottom navigation bar */}
      <nav
        className="fixed bottom-0 left-0 right-0 z-[9999] bg-[#0a0f1a]/95 backdrop-blur-xl border-t border-white/[0.08]"
        style={{
          touchAction: 'manipulation',
          paddingBottom: 'max(6px, env(safe-area-inset-bottom))',
        }}
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="flex items-center justify-around max-w-md mx-auto px-1 py-1 no-scrollbar">
          {/* 5 main nav items */}
          {NAV_ITEMS.map((item) => {
            const isActive = currentSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`flex flex-col items-center gap-0.5 px-2.5 py-1.5 rounded-xl transition-all duration-200 active:scale-90 flex-shrink-0 ${
                  isActive
                    ? 'text-sky-400'
                    : 'text-slate-400 hover:text-slate-300'
                }`}
                aria-label={item.label}
                aria-current={isActive ? 'page' : undefined}
              >
                <span
                  className={`transition-transform duration-200 ${
                    isActive ? 'scale-110' : ''
                  }`}
                >
                  {isActive ? item.activeIcon : item.icon}
                </span>
                <span
                  className={`text-[9px] font-medium ${
                    isActive ? 'text-sky-400' : 'text-slate-400'
                  }`}
                >
                  {item.label}
                </span>
                {isActive && (
                  <div className="w-1.5 h-1.5 rounded-full bg-sky-400 mt-0.5 shadow-sm shadow-sky-400/50 animate-bounce-dot" />
                )}
              </button>
            );
          })}

          {/* More button */}
          <button
            onClick={handleMoreToggle}
            className={`flex flex-col items-center gap-0.5 px-2.5 py-1.5 rounded-xl transition-all duration-200 active:scale-90 flex-shrink-0 ${
              isMoreActive || moreMenuOpen
                ? 'text-sky-400'
                : 'text-slate-400 hover:text-slate-300'
            }`}
            aria-label="More options"
            aria-expanded={moreMenuOpen}
            aria-haspopup="menu"
            aria-controls="bottom-nav-more-menu"
          >
            <span
              className={`transition-transform duration-200 ${
                isMoreActive || moreMenuOpen ? 'scale-110' : ''
              } ${moreMenuOpen ? 'rotate-180' : ''}`}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={isMoreActive || moreMenuOpen ? '2.2' : '1.8'}
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="1" />
                <circle cx="12" cy="5" r="1" />
                <circle cx="12" cy="19" r="1" />
                <circle cx="5" cy="12" r="1" />
                <circle cx="19" cy="12" r="1" />
              </svg>
            </span>
            <span
              className={`text-[9px] font-medium ${
                isMoreActive || moreMenuOpen ? 'text-sky-400' : 'text-slate-400'
              }`}
            >
              More
            </span>
            {(isMoreActive || moreMenuOpen) && (
              <div className="w-1.5 h-1.5 rounded-full bg-sky-400 mt-0.5 shadow-sm shadow-sky-400/50 animate-bounce-dot" />
            )}
          </button>
        </div>
      </nav>
    </>
  );
});
