'use client';

import React, { useState, useRef, useCallback, useEffect } from 'react';

interface ActionFabProps {
  onNavigate: (section: string, preselect?: string) => void;
  onLongPress: () => void;
}

const CRISIS_HOTLINES = [
  { name: 'Natl MH Crisis Hotline', number: '1553' },
  { name: 'Hopeline PH', number: '09175584673' },
  { name: 'NCMH Crisis', number: '09178998727' },
  { name: 'Bukas Palad', number: '09189424887' },
];

export default React.memo(function ActionFab({ onNavigate, onLongPress }: ActionFabProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isHolding, setIsHolding] = useState(false);
  const [showCrisisDialog, setShowCrisisDialog] = useState(false);
  const [crisisMode, setCrisisMode] = useState(false);
  const pressCount = useRef(0);
  const pressTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
        setShowCrisisDialog(false);
      }
    };
    const handleTouch = (e: TouchEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
        setShowCrisisDialog(false);
      }
    };
    if (isOpen || showCrisisDialog) {
      document.addEventListener('mousedown', handleClick);
      document.addEventListener('touchstart', handleTouch);
    }
    return () => {
      document.removeEventListener('mousedown', handleClick);
      document.removeEventListener('touchstart', handleTouch);
    };
  }, [isOpen, showCrisisDialog]);

  const handleFabClick = useCallback(() => {
    // If in crisis mode, show crisis dialog
    if (crisisMode) {
      setShowCrisisDialog(true);
      return;
    }

    pressCount.current += 1;

    // Reset timer on each press
    if (pressTimer.current) clearTimeout(pressTimer.current);
    pressTimer.current = setTimeout(() => {
      pressCount.current = 0;
    }, 1500);

    // 5 presses within 1.5s triggers calculator camouflage
    if (pressCount.current >= 5) {
      pressCount.current = 0;
      if (pressTimer.current) clearTimeout(pressTimer.current);
      setIsOpen(false);
      onLongPress();
      return;
    }

    // Normal toggle
    setIsOpen((prev) => !prev);
  }, [onLongPress, crisisMode]);

  const handleAction = useCallback((section: string, preselect?: string) => {
    setIsOpen(false);
    setTimeout(() => onNavigate(section, preselect), 150);
  }, [onNavigate]);

  const handleCrisisHide = useCallback(() => {
    setShowCrisisDialog(false);
    setCrisisMode(true);
    // Activate calculator camouflage
    onLongPress();
  }, [onLongPress]);

  const handleCrisisSafe = useCallback(() => {
    setShowCrisisDialog(false);
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed z-[10000]"
      style={{
        bottom: 'calc(80px + env(safe-area-inset-bottom, 0px))',
        right: '16px',
      }}
    >
      {/* Semi-transparent overlay backdrop */}
      {(isOpen || showCrisisDialog) && (
        <div
          className="fixed inset-0 z-[-1] transition-opacity duration-300"
          onClick={() => { setIsOpen(false); setShowCrisisDialog(false); }}
        />
      )}

      {/* Crisis Dialog Modal */}
      {showCrisisDialog && (
        <div className="absolute bottom-[72px] right-0 w-72 animate-scaleIn z-20">
          <div className="glass-card-hero p-5 border border-red-500/20 shadow-2xl shadow-red-500/10" style={{ boxShadow: '0 8px 32px rgba(239, 68, 68, 0.15), 0 0 20px rgba(239, 68, 68, 0.08)' }}>
            {/* Dialog header */}
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-10 h-10 rounded-xl bg-red-500/15 flex items-center justify-center flex-shrink-0">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
                  <path d="M12 9v4" />
                  <path d="M12 17h.01" />
                </svg>
              </div>
              <div>
                <h3 className="text-base font-bold text-white">Safety Check</h3>
                <p className="text-[11px] text-slate-400">Are you in immediate danger?</p>
              </div>
            </div>

            {/* Dialog actions */}
            <div className="space-y-2.5 mb-4">
              <button
                onClick={handleCrisisHide}
                className="w-full py-3 rounded-xl bg-red-500/15 text-red-400 border border-red-500/25 text-sm font-semibold hover:bg-red-500/20 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                  <circle cx="12" cy="12" r="3" />
                  <line x1="2" y1="2" x2="22" y2="22" />
                </svg>
                Yes, hide now
              </button>
              <button
                onClick={handleCrisisSafe}
                className="w-full py-3 rounded-xl bg-emerald-500/15 text-emerald-400 border border-emerald-500/25 text-sm font-semibold hover:bg-emerald-500/20 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 6 9 17l-5-5" />
                </svg>
                No, I&apos;m safe
              </button>
            </div>

            {/* Emergency Hotlines */}
            <div className="border-t border-white/[0.08] pt-3">
              <p className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider mb-2.5">Emergency Hotlines — Tap to Call</p>
              <div className="space-y-1.5">
                {CRISIS_HOTLINES.map((hotline, i) => (
                  <a
                    key={i}
                    href={`tel:${hotline.number}`}
                    className="flex items-center gap-2.5 p-2 rounded-lg bg-white/[0.03] hover:bg-white/[0.06] transition-all active:scale-[0.99]"
                  >
                    <div className="w-7 h-7 rounded-lg bg-red-500/10 flex items-center justify-center flex-shrink-0">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72" />
                      </svg>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[11px] font-medium text-slate-300 truncate">{hotline.name}</p>
                    </div>
                    <span className="text-[11px] font-bold text-red-400 flex-shrink-0">{hotline.number}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Radial action buttons - positioned around the FAB */}
      {!showCrisisDialog && (
        <div className="absolute bottom-[60px] right-0 pointer-events-none">
          {/* Use button - TOP */}
          <div
            className={`absolute transition-all duration-300 ease-out pointer-events-auto ${
              isOpen ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-4 scale-75 pointer-events-none'
            }`}
            style={{
              bottom: '56px',
              right: '0px',
              transform: isOpen ? 'translateY(0) scale(1)' : 'translateY(16px) scale(0.75)',
            }}
          >
            <button
              onClick={() => handleAction('recovery', 'use')}
              className="group flex flex-col items-center gap-1.5"
            >
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-500 to-orange-500 shadow-lg shadow-amber-500/30 flex items-center justify-center text-white group-hover:scale-110 group-active:scale-95 transition-all duration-200 ring-2 ring-amber-400/25" style={{ boxShadow: '0 4px 16px rgba(245, 158, 11, 0.35)' }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
                  <path d="M12 6v6l4 2" />
                </svg>
              </div>
              <span className="px-2.5 py-1 rounded-lg bg-[#111827]/95 backdrop-blur-xl border border-amber-500/30 text-[10px] font-semibold text-amber-400 shadow-xl whitespace-nowrap">
                Use
              </span>
            </button>
          </div>

          {/* Mood button - DIAGONAL 45° UPPER-LEFT */}
          <div
            className={`absolute transition-all duration-300 ease-out pointer-events-auto ${
              isOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-75 pointer-events-none'
            }`}
            style={{
              bottom: '88px',
              right: '56px',
              transform: isOpen ? 'scale(1)' : 'scale(0.75)',
            }}
          >
            <button
              onClick={() => handleAction('recovery', 'mood')}
              className="group flex flex-col items-center gap-1.5"
            >
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-violet-500 shadow-lg shadow-purple-500/30 flex items-center justify-center text-white group-hover:scale-110 group-active:scale-95 transition-all duration-200 ring-2 ring-purple-400/25" style={{ boxShadow: '0 4px 16px rgba(139, 92, 246, 0.35)' }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M8 14s1.5 2 4 2 4-2 4-2" />
                  <line x1="9" y1="9" x2="9.01" y2="9" />
                  <line x1="15" y1="9" x2="15.01" y2="9" />
                </svg>
              </div>
              <span className="px-2.5 py-1 rounded-lg bg-[#111827]/95 backdrop-blur-xl border border-purple-500/30 text-[10px] font-semibold text-purple-400 shadow-xl whitespace-nowrap">
                Mood
              </span>
            </button>
          </div>

          {/* Sober button - LEFT */}
          <div
            className={`absolute transition-all duration-300 ease-out pointer-events-auto ${
              isOpen ? 'opacity-100 translate-x-0 scale-100' : 'opacity-0 translate-x-4 scale-75 pointer-events-none'
            }`}
            style={{
              bottom: '2px',
              right: '72px',
              transform: isOpen ? 'translateX(0) scale(1)' : 'translateX(16px) scale(0.75)',
            }}
          >
            <button
              onClick={() => handleAction('recovery', 'sober')}
              className="group flex flex-col items-center gap-1.5"
            >
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-emerald-500 to-emerald-600 shadow-lg shadow-emerald-500/30 flex items-center justify-center text-white group-hover:scale-110 group-active:scale-95 transition-all duration-200 ring-2 ring-emerald-400/25" style={{ boxShadow: '0 4px 16px rgba(16, 185, 129, 0.35)' }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                  <path d="m9 11 3 3L22 4" />
                </svg>
              </div>
              <span className="px-2.5 py-1 rounded-lg bg-[#111827]/95 backdrop-blur-xl border border-emerald-500/30 text-[10px] font-semibold text-emerald-400 shadow-xl whitespace-nowrap">
                Sober
              </span>
            </button>
          </div>

          {/* Crisis button - DIAGONAL UPPER-RIGHT (when not in crisis mode) */}
          {!crisisMode && isOpen && (
            <div
              className="absolute transition-all duration-300 ease-out pointer-events-auto opacity-100 scale-100"
              style={{
                bottom: '88px',
                right: '-56px',
              }}
            >
              <button
                onClick={() => {
                  setIsOpen(false);
                  setCrisisMode(true);
                  setTimeout(() => setShowCrisisDialog(true), 100);
                }}
                className="group flex flex-col items-center gap-1.5"
              >
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-red-500 to-red-600 shadow-lg shadow-red-500/30 flex items-center justify-center text-white group-hover:scale-110 group-active:scale-95 transition-all duration-200 ring-2 ring-red-400/25 animate-pulse-crisis" style={{ boxShadow: '0 4px 16px rgba(239, 68, 68, 0.35)' }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 9v4" />
                    <path d="M12 17h.01" />
                    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
                  </svg>
                </div>
                <span className="px-2.5 py-1 rounded-lg bg-[#111827]/95 backdrop-blur-xl border border-red-500/30 text-[10px] font-semibold text-red-400 shadow-xl whitespace-nowrap">
                  Crisis
                </span>
              </button>
            </div>
          )}
        </div>
      )}

      {/* Main FAB button */}
      <button
        onClick={handleFabClick}
        className={`relative w-14 h-14 rounded-full shadow-xl flex items-center justify-center text-white transition-all duration-300 z-10 ${
          crisisMode
            ? 'bg-gradient-to-br from-red-500 to-red-600 shadow-red-500/30 animate-pulse-crisis hover:shadow-red-500/40'
            : isOpen
              ? 'bg-gradient-to-br from-slate-600 to-slate-700 shadow-slate-500/20 scale-95'
              : 'bg-gradient-to-br from-sky-500 to-blue-600 shadow-sky-500/30 hover:shadow-sky-500/40 hover:scale-105 active:scale-95'
        }`}
        style={{
          ...((!isOpen && !crisisMode) ? { animation: 'glow-pulse 3s infinite' } : {}),
          willChange: 'transform',
        }}
        aria-label={crisisMode ? 'Emergency crisis' : isOpen ? 'Close actions' : 'Quick actions menu'}
      >
        {crisisMode ? (
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 9v4" />
            <path d="M12 17h.01" />
            <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
          </svg>
        ) : (
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="transition-transform duration-300"
            style={{ transform: isOpen ? 'rotate(45deg) scale(1.1)' : 'rotate(0deg) scale(1)', transition: 'transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)' }}
          >
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
        )}

        {/* Subtle ripple ring when idle */}
        {!isOpen && !crisisMode && (
          <div className="absolute inset-0 rounded-full border border-sky-400/20 animate-ping pointer-events-none" style={{ animationDuration: '3s' }} />
        )}
      </button>
    </div>
  );
});
