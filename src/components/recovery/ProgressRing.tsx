'use client';

import React from 'react';

interface ProgressRingProps {
  percentage: number;
  size?: number;
  strokeWidth?: number;
  label?: string;
  sublabel?: string;
}

export default function ProgressRing({
  percentage,
  size = 80,
  strokeWidth = 6,
  label,
  sublabel,
}: ProgressRingProps) {
  const radius = 32;
  const circumference = 201.06;
  const offset = circumference - (percentage / 100) * circumference;
  const clampedPercent = Math.min(100, Math.max(0, percentage));

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg width={size} height={size} viewBox="0 0 80 80" className="transform -rotate-90">
        <circle
          cx="40"
          cy="40"
          r={radius}
          fill="none"
          stroke="rgba(255,255,255,0.08)"
          strokeWidth={strokeWidth}
        />
        <circle
          cx="40"
          cy="40"
          r={radius}
          fill="none"
          stroke="url(#progress-gradient)"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className="transition-all duration-700 ease-out"
        />
        <defs>
          <linearGradient id="progress-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#0ea5e9" />
            <stop offset="100%" stopColor="#10b981" />
          </linearGradient>
        </defs>
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        {label && (
          <span className="text-sm font-bold text-white leading-none">{label}</span>
        )}
        {sublabel && (
          <span className="text-[10px] text-slate-400 leading-none mt-0.5">{sublabel}</span>
        )}
      </div>
    </div>
  );
}
