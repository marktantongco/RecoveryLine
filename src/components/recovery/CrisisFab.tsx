'use client';

import React, { useRef, useState } from 'react';

interface CrisisFabProps {
  onTripleTap: () => void;
}

export default function CrisisFab({ onTripleTap }: CrisisFabProps) {
  const lastTapRef = useRef<number>(0);
  const tapCountRef = useRef<number>(0);
  const tapTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [showHint, setShowHint] = useState(false);

  const handleTripleTap = () => {
    const now = Date.now();
    if (now - lastTapRef.current < 500) {
      tapCountRef.current++;
      if (tapCountRef.current >= 2) {
        // 3rd tap total
        onTripleTap();
        tapCountRef.current = 0;
        lastTapRef.current = 0;
        if (tapTimerRef.current) clearTimeout(tapTimerRef.current);
        return;
      }
    } else {
      tapCountRef.current = 1;
    }
    lastTapRef.current = now;

    if (tapCountRef.current === 2) {
      setShowHint(true);
      setTimeout(() => setShowHint(false), 1000);
    }

    if (tapTimerRef.current) clearTimeout(tapTimerRef.current);
    tapTimerRef.current = setTimeout(() => {
      tapCountRef.current = 0;
    }, 600);
  };

  return (
    <div className="fixed bottom-20 right-4 z-30">
      <button
        onClick={handleTripleTap}
        className="w-12 h-12 rounded-full bg-red-500 shadow-lg shadow-red-500/30 flex items-center justify-center text-white hover:bg-red-600 active:scale-95 transition-all"
        aria-label="Emergency"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4.5 12.5l3-1.5L5 8l3-1.5L5 4l7 7-4.5 1.5z" />
          <path d="M11 11l3-1.5L11 8l3-1.5L11 5l7 7-4.5 1.5z" />
          <line x1="17" y1="17" x2="7" y2="17" />
          <line x1="12" y1="17" x2="12" y2="22" />
        </svg>
      </button>
      {showHint && (
        <div className="absolute bottom-14 right-0 bg-red-500/20 border border-red-500/30 rounded-lg px-2 py-1 text-[10px] text-red-400 whitespace-nowrap animate-fadeUp">
          One more tap...
        </div>
      )}
    </div>
  );
}
