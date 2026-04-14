'use client';

import React, { useState, useRef, useCallback, useEffect } from 'react';

interface ActionFabProps {
  onNavigate: (section: string, preselect?: string) => void;
  onLongPress: () => void;
}

export default function ActionFab({ onNavigate, onLongPress }: ActionFabProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isHolding, setIsHolding] = useState(false);
  const pressCount = useRef(0);
  const pressTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    const handleTouch = (e: TouchEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClick);
      document.addEventListener('touchstart', handleTouch);
    }
    return () => {
      document.removeEventListener('mousedown', handleClick);
      document.removeEventListener('touchstart', handleTouch);
    };
  }, [isOpen]);

  const handleFabClick = useCallback(() => {
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
  }, [onLongPress]);

  const handleAction = useCallback((section: string, preselect?: string) => {
    setIsOpen(false);
    setTimeout(() => onNavigate(section, preselect), 150);
  }, [onNavigate]);

  return (
    <div
      ref={containerRef}
      className="fixed z-30"
      style={{
        bottom: 'calc(80px + env(safe-area-inset-bottom, 0px))',
        right: '16px',
      }}
    >
      {/* Semi-transparent overlay backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-[-1] transition-opacity duration-300"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Radial action buttons - positioned around the FAB */}
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
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-500 to-orange-500 shadow-lg shadow-amber-500/30 flex items-center justify-center text-white group-hover:scale-110 group-active:scale-95 transition-all duration-200 ring-2 ring-amber-400/20">
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
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-violet-500 shadow-lg shadow-purple-500/30 flex items-center justify-center text-white group-hover:scale-110 group-active:scale-95 transition-all duration-200 ring-2 ring-purple-400/20">
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
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-emerald-500 to-emerald-600 shadow-lg shadow-emerald-500/30 flex items-center justify-center text-white group-hover:scale-110 group-active:scale-95 transition-all duration-200 ring-2 ring-emerald-400/20">
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
      </div>

      {/* Main FAB button */}
      <button
        onClick={handleFabClick}
        className={`relative w-14 h-14 rounded-full shadow-xl flex items-center justify-center text-white transition-all duration-300 z-10 ${
          isOpen
            ? 'bg-gradient-to-br from-slate-600 to-slate-700 shadow-slate-500/20 scale-95'
            : 'bg-gradient-to-br from-sky-500 to-blue-600 shadow-sky-500/30 hover:shadow-sky-500/40 hover:scale-105 active:scale-95'
        }`}
        style={{ animation: isOpen ? 'none' : 'glow-pulse 3s infinite' }}
        aria-label={isOpen ? 'Close actions' : 'Quick actions menu'}
      >
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
          style={{ transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)' }}
        >
          <line x1="12" y1="5" x2="12" y2="19" />
          <line x1="5" y1="12" x2="19" y2="12" />
        </svg>

        {/* Subtle ripple ring when idle */}
        {!isOpen && (
          <div className="absolute inset-0 rounded-full border border-sky-400/20 animate-ping" style={{ animationDuration: '3s' }} />
        )}
      </button>
    </div>
  );
}
