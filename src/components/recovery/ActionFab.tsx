'use client';

import React, { useState, useRef, useCallback, useEffect } from 'react';

interface ActionFabProps {
  onNavigate: (section: string) => void;
  onLongPress: () => void;
}

export default function ActionFab({ onNavigate, onLongPress }: ActionFabProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isHolding, setIsHolding] = useState(false);
  const longPressTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const holdStartTime = useRef(0);
  const containerRef = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClick);
      document.addEventListener('touchstart', handleClick as unknown as EventListener);
    }
    return () => {
      document.removeEventListener('mousedown', handleClick);
      document.removeEventListener('touchstart', handleClick as unknown as EventListener);
    };
  }, [isOpen]);

  const handleStart = useCallback(() => {
    holdStartTime.current = Date.now();
    setIsHolding(true);

    longPressTimer.current = setTimeout(() => {
      setIsHolding(false);
      setIsOpen(false);
      onLongPress();
    }, 800);
  }, [onLongPress]);

  const handleEnd = useCallback(() => {
    setIsHolding(false);
    if (longPressTimer.current) {
      clearTimeout(longPressTimer.current);
      longPressTimer.current = null;
    }
    const holdDuration = Date.now() - holdStartTime.current;
    if (holdDuration < 800) {
      // It was a tap, not a long press
      setIsOpen((prev) => !prev);
    }
  }, []);

  const handleAction = useCallback((section: string) => {
    setIsOpen(false);
    // Small delay for the close animation
    setTimeout(() => onNavigate(section), 150);
  }, [onNavigate]);

  return (
    <div ref={containerRef} className="fixed z-30" style={{ bottom: 'calc(80px + env(safe-area-inset-bottom, 0px))', right: '16px' }}>
      {/* Overlay backdrop when open */}
      {isOpen && (
        <div
          className="fixed inset-0 z-[-1]"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Action buttons */}
      <div className={`flex flex-col items-end gap-3 transition-all duration-300 ${isOpen ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 translate-y-4 pointer-events-none'}`}>
        {/* Sober */}
        <button
          onClick={() => handleAction('checkin')}
          className="group flex items-center gap-3 animate-fadeUp"
          style={{ animationDelay: '0.05s' }}
        >
          <span className="px-3 py-1.5 rounded-xl bg-[#111827]/95 backdrop-blur-xl border border-emerald-500/30 text-xs font-medium text-emerald-400 shadow-xl whitespace-nowrap">
            Log Sober Day
          </span>
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-emerald-500 to-emerald-600 shadow-lg shadow-emerald-500/30 flex items-center justify-center text-white group-hover:scale-110 group-active:scale-95 transition-transform">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
              <path d="m9 11 3 3L22 4" />
            </svg>
          </div>
        </button>

        {/* Use */}
        <button
          onClick={() => handleAction('checkin')}
          className="group flex items-center gap-3 animate-fadeUp"
          style={{ animationDelay: '0.1s' }}
        >
          <span className="px-3 py-1.5 rounded-xl bg-[#111827]/95 backdrop-blur-xl border border-amber-500/30 text-xs font-medium text-amber-400 shadow-xl whitespace-nowrap">
            Log Use Entry
          </span>
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-500 to-orange-500 shadow-lg shadow-amber-500/30 flex items-center justify-center text-white group-hover:scale-110 group-active:scale-95 transition-transform">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
              <path d="M12 6v6l4 2" />
            </svg>
          </div>
        </button>

        {/* Mood / Quick Note */}
        <button
          onClick={() => handleAction('notes')}
          className="group flex items-center gap-3 animate-fadeUp"
          style={{ animationDelay: '0.15s' }}
        >
          <span className="px-3 py-1.5 rounded-xl bg-[#111827]/95 backdrop-blur-xl border border-purple-500/30 text-xs font-medium text-purple-400 shadow-xl whitespace-nowrap">
            Quick Note
          </span>
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-violet-500 shadow-lg shadow-purple-500/30 flex items-center justify-center text-white group-hover:scale-110 group-active:scale-95 transition-transform">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
          </div>
        </button>
      </div>

      {/* Main FAB button */}
      <button
        onMouseDown={handleStart}
        onMouseUp={handleEnd}
        onMouseLeave={() => { setIsHolding(false); if (longPressTimer.current) clearTimeout(longPressTimer.current); }}
        onTouchStart={handleStart}
        onTouchEnd={handleEnd}
        className={`relative w-14 h-14 rounded-full shadow-xl flex items-center justify-center text-white transition-all duration-300 z-10 ${
          isOpen
            ? 'bg-gradient-to-br from-slate-600 to-slate-700 shadow-slate-500/20 rotate-45'
            : isHolding
            ? 'bg-gradient-to-br from-red-600 to-red-700 shadow-red-500/40 scale-95 animate-pulse'
            : 'bg-gradient-to-br from-sky-500 to-blue-600 shadow-sky-500/30 hover:shadow-sky-500/40 hover:scale-105 active:scale-95'
        }`}
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
          style={{ transform: isOpen ? 'rotate(0deg)' : 'rotate(0deg)' }}
        >
          {isOpen ? (
            <line x1="18" y1="6" x2="6" y2="18" />
          ) : isHolding ? (
            <>
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </>
          ) : (
            <>
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </>
          )}
        </svg>

        {/* Hold indicator ring */}
        {isHolding && (
          <div className="absolute inset-0 rounded-full border-2 border-red-400/60 animate-ping" />
        )}
      </button>
    </div>
  );
}
