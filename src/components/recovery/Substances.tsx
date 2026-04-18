'use client';

import React, { useState, useMemo, useRef, useEffect, useCallback, Component, ReactNode } from 'react';
import { SUBSTANCES, SUBSTANCE_LIST, type SubstanceData } from '@/lib/substances';
import { SYMBIOTIC_PROTOCOL } from '@/lib/recovery-protocol-data';

// --- Helpers ---

function getDangerGradient(level: number): string {
  switch (level) {
    case 5: return 'from-red-500 to-red-600';
    case 4: return 'from-orange-500 to-red-500';
    case 3: return 'from-amber-500 to-orange-500';
    case 2: return 'from-yellow-500 to-amber-500';
    default: return 'from-emerald-500 to-emerald-600';
  }
}

function getDangerDotColor(level: number): string {
  switch (level) {
    case 5: return 'bg-red-500';
    case 4: return 'bg-orange-500';
    case 3: return 'bg-amber-500';
    case 2: return 'bg-yellow-500';
    default: return 'bg-emerald-500';
  }
}

function getSeverityConfig(severity: string) {
  switch (severity) {
    case 'critical': return { color: 'text-red-400', bg: 'bg-red-500/15 border-red-500/25', label: 'CRITICAL' };
    case 'severe':   return { color: 'text-orange-400', bg: 'bg-orange-500/15 border-orange-500/25', label: 'SEVERE' };
    case 'moderate': return { color: 'text-amber-400', bg: 'bg-amber-500/15 border-amber-500/25', label: 'MODERATE' };
    case 'mild':     return { color: 'text-yellow-400', bg: 'bg-yellow-500/15 border-yellow-500/25', label: 'MILD' };
    default:         return { color: 'text-slate-400', bg: 'bg-white/5 border-white/10', label: severity.toUpperCase() };
  }
}

function getCategoryLabel(cat: string): string {
  switch (cat) {
    case 'stimulant': return 'Stimulant';
    case 'empathogen': return 'Empathogen';
    case 'depressant': return 'Depressant';
    case 'cannabinoid': return 'Cannabinoid';
    case 'dissociative': return 'Dissociative';
    case 'hallucinogen': return 'Hallucinogen';
    default: return cat;
  }
}

// --- 4-Phase Color System ---
const PHASE_COLORS = [
  { badge: 'bg-red-500/15 text-red-400 border-red-500/25', dot: 'bg-red-500', text: 'text-red-400', border: 'border-red-500/10', bg: 'bg-red-500/[0.03]', timeline: 'bg-red-500/10 text-red-400 border-red-500/15' },
  { badge: 'bg-amber-500/15 text-amber-400 border-amber-500/25', dot: 'bg-amber-500', text: 'text-amber-400', border: 'border-amber-500/10', bg: 'bg-amber-500/[0.03]', timeline: 'bg-amber-500/10 text-amber-400 border-amber-500/15' },
  { badge: 'bg-blue-500/15 text-blue-400 border-blue-500/25', dot: 'bg-blue-500', text: 'text-blue-400', border: 'border-blue-500/10', bg: 'bg-blue-500/[0.03]', timeline: 'bg-blue-500/10 text-blue-400 border-blue-500/15' },
  { badge: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/25', dot: 'bg-emerald-500', text: 'text-emerald-400', border: 'border-emerald-500/10', bg: 'bg-emerald-500/[0.03]', timeline: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/15' },
];

// --- Symbiotic Protocol Color System (3 pillars) ---
const SYMBIOTIC_COLORS = [
  { accent: 'emerald', badge: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/25', bg: 'bg-emerald-500/5', border: 'border-emerald-500/10', text: 'text-emerald-400', icon: '🧠', ring: 'ring-emerald-500/20' },
  { accent: 'teal', badge: 'bg-teal-500/15 text-teal-400 border-teal-500/25', bg: 'bg-teal-500/5', border: 'border-teal-500/10', text: 'text-teal-400', icon: '🧬', ring: 'ring-teal-500/20' },
  { accent: 'green', badge: 'bg-green-500/15 text-green-400 border-green-500/25', bg: 'bg-green-500/5', border: 'border-green-500/10', text: 'text-green-400', icon: '🌿', ring: 'ring-green-500/20' },
];

// --- Section Error Boundary ---
interface SectionErrorBoundaryProps { children: ReactNode; fallback?: ReactNode; }
interface SectionErrorBoundaryState { hasError: boolean; }
class SectionErrorBoundary extends Component<SectionErrorBoundaryProps, SectionErrorBoundaryState> {
  constructor(props: SectionErrorBoundaryProps) { super(props); this.state = { hasError: false }; }
  static getDerivedStateFromError(): SectionErrorBoundaryState { return { hasError: true }; }
  componentDidCatch(error: Error, info: React.ErrorInfo) { console.error('[RecoveryLine] SectionErrorBoundary caught:', error, info.componentStack); }
  render() {
    if (this.state.hasError) {
      return this.props.fallback ?? (
        <div className="glass-card p-4 text-center">
          <p className="text-[10px] text-slate-500">Section unavailable</p>
          <button
            onClick={() => this.setState({ hasError: false })}
            className="mt-2 text-[10px] text-slate-400 hover:text-white transition-colors px-3 py-1 rounded-lg bg-white/5 hover:bg-white/10 active:scale-[0.98] transition-transform"
          >
            Retry
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

// --- Animated Chevron Icon ---
const AnimatedChevron = React.memo(function AnimatedChevron({ isOpen, size = 14 }: { isOpen: boolean; size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`transition-transform duration-300 flex-shrink-0 ${isOpen ? 'rotate-180' : ''}`}
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
});

// --- Bookmark Icon ---
const BookmarkIcon = React.memo(function BookmarkIcon({ isBookmarked, onClick }: { isBookmarked: boolean; onClick: () => void }) {
  return (
    <button
      onClick={(e) => { e.stopPropagation(); onClick(); }}
      className="w-5 h-5 flex items-center justify-center flex-shrink-0 active:scale-90 transition-transform"
      aria-label={isBookmarked ? 'Remove bookmark' : 'Add bookmark'}
    >
      {isBookmarked ? (
        <svg width="12" height="12" viewBox="0 0 24 24" fill="#facc15" stroke="#facc15" strokeWidth="2">
          <path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/>
        </svg>
      ) : (
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-slate-600">
          <path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/>
        </svg>
      )}
    </button>
  );
});

// --- Collapsible Section Card ---
const CollapsibleSection = React.memo(function CollapsibleSection({
  id,
  icon,
  label,
  subtitle,
  children,
  expandedId,
  onToggle,
  staggerClass = '',
  bookmarkKey,
  isBookmarked,
  onToggleBookmark,
}: {
  id: string;
  icon: React.ReactNode;
  label: string;
  labelColor?: string;
  labelBg?: string;
  subtitle: string;
  children: React.ReactNode;
  expandedId: string | null;
  onToggle: (id: string) => void;
  staggerClass?: string;
  bookmarkKey?: string;
  isBookmarked?: boolean;
  onToggleBookmark?: () => void;
}) {
  const isOpen = expandedId === id;
  return (
    <div className={`glass-card overflow-hidden animate-fadeUp ${staggerClass}`} style={{ opacity: 0 }}>
      <button
        onClick={() => onToggle(isOpen ? '' : id)}
        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onToggle(isOpen ? '' : id); } }}
        className="w-full p-4 text-left hover:bg-white/[0.02] transition-colors active:scale-[0.98] transition-transform duration-150"
        role="button"
        aria-expanded={isOpen}
        aria-controls={`section-content-${id}`}
      >
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5 flex-1 min-w-0">
            <div className="w-7 h-7 rounded-lg bg-white/5 flex items-center justify-center flex-shrink-0">
              {icon}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="text-[10px] font-bold uppercase tracking-wider text-white">{label}</h3>
              </div>
              <p className="text-[11px] text-slate-400 mt-0.5 leading-relaxed">{subtitle}</p>
            </div>
          </div>
          <div className="flex items-center gap-1.5 flex-shrink-0">
            {bookmarkKey !== undefined && onToggleBookmark && (
              <BookmarkIcon isBookmarked={!!isBookmarked} onClick={onToggleBookmark} />
            )}
            <div className="text-slate-500">
              <AnimatedChevron isOpen={isOpen} size={14} />
            </div>
          </div>
        </div>
      </button>
      {/* Collapsible Content via CSS Grid */}
      <div
        id={`section-content-${id}`}
        role="region"
        style={{
          display: 'grid',
          gridTemplateRows: isOpen ? '1fr' : '0fr',
          transition: 'grid-template-rows 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        <div style={{ overflow: 'hidden', minHeight: 0 }}>
          <div className="px-4 pb-4 border-t border-white/[0.04] pt-3">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
});

// --- SVG Icons (section headers) ---

const Icons = {
  damage: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
    </svg>
  ),
  pharmacology: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#a78bfa" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 3h6" /><path d="M10 9V3h4v6l5 8.5a2 2 0 0 1-1.7 3H6.7a2 2 0 0 1-1.7-3L10 9Z" />
    </svg>
  ),
  withdrawal: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2v4m0 12v4M4.93 4.93l2.83 2.83m8.48 8.48 2.83 2.83M2 12h4m12 0h4M4.93 19.07l2.83-2.83m8.48-8.48 2.83-2.83" />
    </svg>
  ),
  recovery: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <path d="m9 11 3 3L22 4" />
    </svg>
  ),
  philippines: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#f472b6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <path d="M2 12h20" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  ),
  harm: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#38bdf8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" />
    </svg>
  ),
  protocol: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  ),
  chevron: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m6 9 6 6 6-6" />
    </svg>
  ),
  brain: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#c084fc" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z" />
      <path d="M12 5a3 3 0 1 1 5.997.125 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A4 4 0 1 1 12 18Z" />
      <path d="M12 5v13" />
    </svg>
  ),
  search: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  ),
  x: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 6 6 18" /><path d="m6 6 12 12" />
    </svg>
  ),
  lightbulb: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#facc15" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5" />
      <path d="M9 18h6" />
      <path d="M10 22h4" />
    </svg>
  ),
  pill: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#a78bfa" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m10.5 20.5 10-10a4.95 4.95 0 1 0-7-7l-10 10a4.95 4.95 0 1 0 7 7Z"/>
      <path d="m8.5 8.5 7 7"/>
    </svg>
  ),
};

// --- Header Card Tab Config ---
type HeaderTabId = 'damage' | 'reduction' | 'withdrawal';
const HEADER_TABS: { id: HeaderTabId; label: string; icon: string; count: string }[] = [
  { id: 'damage', label: '10 Damages', icon: '⚡', count: '10' },
  { id: 'reduction', label: '10 Reductions', icon: '🛡', count: '10' },
  { id: 'withdrawal', label: '10 Withdrawals', icon: '☀', count: '10' },
];
const DROPDOWN_AUTO_CLOSE_MS = 4000;

// --- Haptic Feedback Helper ---
function haptic(ms = 10) {
  try { navigator.vibrate?.(ms); } catch (e) { console.warn('[RecoveryLine] Haptic vibration failed:', e); }
}

// --- Skeleton Loader ---
function SkeletonSection({ className = '' }: { className?: string }) {
  return (
    <div className={`glass-card p-4 ${className}`}>
      <div className="flex items-center gap-2.5 mb-3">
        <div className="w-7 h-7 rounded-lg skeleton-shimmer" />
        <div className="flex-1">
          <div className="w-24 h-2.5 rounded-md skeleton-shimmer mb-1.5" />
          <div className="w-48 h-2 rounded-md skeleton-shimmer" />
        </div>
      </div>
      <div className="space-y-2">
        <div className="w-full h-8 rounded-lg skeleton-shimmer" />
        <div className="w-3/4 h-8 rounded-lg skeleton-shimmer" />
        <div className="w-5/6 h-8 rounded-lg skeleton-shimmer" />
      </div>
    </div>
  );
}

function SkeletonHeader() {
  return (
    <div className="glass-card-hero-glow p-5">
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1">
          <div className="w-36 h-5 rounded-md skeleton-shimmer mb-2" />
          <div className="flex items-center gap-2">
            <div className="w-16 h-4 rounded-md skeleton-shimmer" />
            <div className="flex items-center gap-1">
              {[0,1,2,3,4].map(i => (
                <div key={i} className="w-2 h-2 rounded-full skeleton-shimmer" />
              ))}
            </div>
          </div>
        </div>
        <div className="w-11 h-11 rounded-xl skeleton-shimmer" />
      </div>
      <div className="flex gap-1.5 mt-4">
        {[0,1,2].map(i => (
          <div key={i} className="flex-1 h-8 rounded-xl skeleton-shimmer" />
        ))}
      </div>
      <div className="w-full h-4 rounded-md skeleton-shimmer mt-4" />
      <div className="w-3/4 h-4 rounded-md skeleton-shimmer mt-2" />
    </div>
  );
}

// --- Substance Detail View ---

const SubstanceDetail = React.memo(function SubstanceDetail({ substance }: { substance: SubstanceData }) {
  const [expandedDropdown, setExpandedDropdown] = useState<HeaderTabId | null>(null);
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  const [supplementsExpanded, setSupplementsExpanded] = useState(false);

  // New state: Two Big Buttons
  const [activeProtocolPanel, setActiveProtocolPanel] = useState<'symbiotic' | 'substance' | null>(null);
  const [expandedProtocolRow, setExpandedProtocolRow] = useState<string | null>(null);

  // New state: Bookmarks
  const [bookmarks, setBookmarks] = useState<Set<string>>(() => {
    if (typeof window === 'undefined') return new Set();
    try {
      const stored = localStorage.getItem(`bookmarks-${substance.id}`);
      return stored ? new Set(JSON.parse(stored)) : new Set();
    } catch (e) { console.warn('[RecoveryLine] localStorage read failed:', e); return new Set(); }
  });

  // New state: Viewed Phases (progress indicator)
  const [viewedPhases, setViewedPhases] = useState<Set<string>>(() => {
    if (typeof window === 'undefined') return new Set();
    try {
      const stored = localStorage.getItem(`viewed-phases-${substance.id}`);
      return stored ? new Set(JSON.parse(stored)) : new Set();
    } catch (e) { console.warn('[RecoveryLine] localStorage read failed:', e); return new Set(); }
  });

  // New state: Skeleton loading
  const [isLoading, setIsLoading] = useState(true);

  // Simple timer ref
  const autoCloseTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const sev = getSeverityConfig(substance.withdrawal.severity);

  // Calculate total viewable phases for progress
  const totalPhases = useMemo(() => {
    const symbioticCount = SYMBIOTIC_PROTOCOL.reduce((acc, s) => acc + s.phases.length, 0);
    const substanceCount = substance.recoveryPhases?.length ?? 0;
    return symbioticCount + substanceCount;
  }, [substance.recoveryPhases]);

  const progressPct = useMemo(() => {
    if (totalPhases === 0) return 0;
    return Math.round((viewedPhases.size / totalPhases) * 100);
  }, [viewedPhases.size, totalPhases]);

  // --- Skeleton loading effect (100ms minimum) ---
  useEffect(() => {
    setIsLoading(true);
    const t = setTimeout(() => setIsLoading(false), 100);
    return () => clearTimeout(t);
  }, [substance.id]);

  // Cleanup timer on unmount
  useEffect(() => {
    return () => {
      if (autoCloseTimer.current) {
        clearTimeout(autoCloseTimer.current);
        autoCloseTimer.current = null;
      }
    };
  }, []);

  // --- Keyboard navigation: Escape closes all ---
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setExpandedSection(null);
        setActiveProtocolPanel(null);
        setExpandedProtocolRow(null);
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  const handleTabClick = useCallback((tabId: HeaderTabId) => {
    if (autoCloseTimer.current) {
      clearTimeout(autoCloseTimer.current);
      autoCloseTimer.current = null;
    }
    if (expandedDropdown === tabId) {
      setExpandedDropdown(null);
      return;
    }
    setExpandedDropdown(tabId);
    autoCloseTimer.current = setTimeout(() => {
      setExpandedDropdown(null);
      autoCloseTimer.current = null;
    }, DROPDOWN_AUTO_CLOSE_MS);
  }, [expandedDropdown]);

  const handleSectionToggle = useCallback((id: string) => {
    haptic(10);
    setExpandedSection((prev) => (prev === id ? null : id));
  }, []);

  const toggleBookmark = useCallback((key: string) => {
    haptic(10);
    setBookmarks(prev => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      try { localStorage.setItem(`bookmarks-${substance.id}`, JSON.stringify([...next])); } catch (e) { console.warn('[RecoveryLine] Bookmark save failed:', e); }
      return next;
    });
  }, [substance.id]);

  const toggleProtocolPanel = useCallback((panel: 'symbiotic' | 'substance') => {
    haptic(10);
    setActiveProtocolPanel(prev => prev === panel ? null : panel);
    setExpandedProtocolRow(null);
  }, []);

  const handleProtocolRowToggle = useCallback((rowId: string) => {
    haptic(10);
    setExpandedProtocolRow(prev => prev === rowId ? null : rowId);
    // Mark as viewed
    setViewedPhases(prev => {
      const next = new Set(prev);
      next.add(rowId);
      try { localStorage.setItem(`viewed-phases-${substance.id}`, JSON.stringify([...next])); } catch (e) { console.warn('[RecoveryLine] Phase view save failed:', e); }
      return next;
    });
  }, [substance.id]);

  // Reset protocol panel when substance changes
  useEffect(() => {
    setActiveProtocolPanel(null);
    setExpandedProtocolRow(null);
  }, [substance.id]);

  // --- Skeleton Loading UI ---
  if (isLoading) {
    return (
      <div className="space-y-3 pb-6">
        <SkeletonHeader />
        <SkeletonSection />
        <SkeletonSection />
        <SkeletonSection />
        <SkeletonSection />
      </div>
    );
  }

  return (
    <div className="space-y-3 pb-6">
      {/* --- Header Card with 3 Tabs --- */}
      <SectionErrorBoundary>
        <div className="glass-card-hero-glow p-5 animate-fadeUp relative overflow-hidden">
          {/* Background danger accent */}
          <div className={`absolute top-0 right-0 w-32 h-32 rounded-full bg-gradient-to-br ${getDangerGradient(substance.dangerLevel)} opacity-[0.07] blur-2xl -translate-y-1/2 translate-x-1/2`} />

          <div className="relative">
            {/* Name + Category + Danger */}
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1 min-w-0">
                <h2 className="text-lg font-bold text-white leading-tight">{substance.name}</h2>
                <div className="flex items-center gap-2 mt-1.5 flex-wrap">
                  <span className="px-2 py-0.5 rounded-md bg-white/10 text-[10px] font-semibold text-slate-300 uppercase tracking-wide border border-white/10">
                    {getCategoryLabel(substance.category)}
                  </span>
                  <div className="flex items-center gap-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <span
                        key={i}
                        className={`w-2 h-2 rounded-full transition-all duration-300 ${
                          i < substance.dangerLevel ? getDangerDotColor(substance.dangerLevel) : 'bg-white/10'
                        }`}
                        style={{
                          animationDelay: `${i * 60}ms`,
                          opacity: 0,
                          animation: `fadeUp 0.4s cubic-bezier(0.16, 1, 0.3, 1) ${i * 60}ms forwards`,
                        }}
                      />
                    ))}
                    <span className="text-[10px] text-slate-400 ml-1">Danger {substance.dangerLevel}/5</span>
                  </div>
                </div>
              </div>
              <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${getDangerGradient(substance.dangerLevel)} flex items-center justify-center shadow-lg flex-shrink-0`}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
                  <line x1="12" y1="9" x2="12" y2="13" />
                  <line x1="12" y1="17" x2="12.01" y2="17" />
                </svg>
              </div>
            </div>

            {/* Aliases */}
            <div className="mt-3 flex flex-wrap gap-1.5">
              {[...substance.aliases, ...substance.streetNames].slice(0, 8).map((name, i) => (
                <span key={i} className="px-2 py-0.5 rounded-md bg-white/5 text-[10px] text-slate-500 border border-white/5">
                  {name}
                </span>
              ))}
            </div>

            {/* 3 Dropdown Tabs: Damages, Reductions, Withdrawals */}
            <div className="flex mt-4 gap-1.5">
              {HEADER_TABS.map((tab) => {
                const isOpen = expandedDropdown === tab.id;
                const tabColor = tab.id === 'damage'
                  ? (isOpen ? 'bg-red-500/10 border-red-500/25 text-red-300' : 'bg-white/[0.04] border-white/[0.06] text-slate-400')
                  : tab.id === 'reduction'
                  ? (isOpen ? 'bg-sky-500/10 border-sky-500/25 text-sky-300' : 'bg-white/[0.04] border-white/[0.06] text-slate-400')
                  : (isOpen ? 'bg-amber-500/10 border-amber-500/25 text-amber-300' : 'bg-white/[0.04] border-white/[0.06] text-slate-400');
                return (
                  <button
                    key={tab.id}
                    onClick={() => handleTabClick(tab.id)}
                    onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handleTabClick(tab.id); } }}
                    className={`flex-1 py-2 px-2 rounded-xl text-[10px] font-medium transition-all border flex items-center justify-center gap-1 active:scale-[0.98] transition-transform duration-150 ${tabColor}`}
                    role="button"
                    aria-expanded={isOpen}
                  >
                    <span className="text-xs">{tab.icon}</span>
                    <span className="leading-tight text-center">{tab.label}</span>
                    <AnimatedChevron isOpen={isOpen} size={10} />
                  </button>
                );
              })}
            </div>

            {/* Dropdown Content */}
            <div className="mt-3">
              {/* Damages Dropdown */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateRows: expandedDropdown === 'damage' ? '1fr' : '0fr',
                  transition: 'grid-template-rows 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
                }}
              >
                <div style={{ overflow: 'hidden', minHeight: 0 }}>
                  <div className="max-h-48 overflow-y-auto custom-scrollbar space-y-1.5 mb-1">
                    <p className="text-[10px] font-semibold text-red-400 uppercase tracking-wide mb-2">10 Damage Areas</p>
                    {substance.primaryDamage.items.map((item, i) => (
                      <div key={i} className="flex items-start gap-2 p-2 rounded-lg bg-red-500/[0.04]">
                        <span className="w-5 h-5 rounded-md bg-red-500/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-[10px] font-bold text-red-400">{i + 1}</span>
                        </span>
                        <span className="text-[11px] text-slate-300 leading-relaxed">{item}</span>
                      </div>
                    ))}
                    <div className="rounded-xl bg-red-500/5 border border-red-500/10 p-3 mt-2">
                      <p className="text-[10px] font-semibold text-red-400 uppercase tracking-wide mb-1">Summary</p>
                      <p className="text-[11px] text-slate-400 leading-relaxed">{substance.primaryDamage.summary}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Reductions Dropdown */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateRows: expandedDropdown === 'reduction' ? '1fr' : '0fr',
                  transition: 'grid-template-rows 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
                }}
              >
                <div style={{ overflow: 'hidden', minHeight: 0 }}>
                  <div className="max-h-48 overflow-y-auto custom-scrollbar space-y-1.5 mb-1">
                    <p className="text-[10px] font-semibold text-sky-400 uppercase tracking-wide mb-2">10 Harm Reductions</p>
                    {substance.harmReduction.map((tip, i) => (
                      <div key={i} className="flex items-start gap-2.5 p-2 rounded-lg bg-sky-500/[0.04]">
                        <span className="w-5 h-5 rounded-md bg-sky-500/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-[10px] font-bold text-sky-400">{i + 1}</span>
                        </span>
                        <p className="text-[11px] text-slate-300 leading-relaxed">{tip}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Withdrawals Dropdown */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateRows: expandedDropdown === 'withdrawal' ? '1fr' : '0fr',
                  transition: 'grid-template-rows 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
                }}
              >
                <div style={{ overflow: 'hidden', minHeight: 0 }}>
                  <div className="max-h-56 overflow-y-auto custom-scrollbar mb-1">
                    <p className="text-[10px] font-semibold text-amber-400 uppercase tracking-wide mb-2">10 Withdrawal Symptoms</p>
                    <div className="flex items-center gap-3 mb-2">
                      <div className="flex-1">
                        <p className="text-[10px] text-slate-400 uppercase tracking-wide mb-0.5">Timeline</p>
                        <p className="text-xs text-slate-300">{substance.withdrawal.timeline}</p>
                      </div>
                      <span className={`px-2.5 py-1 rounded-lg text-[10px] font-bold border ${sev.bg} ${sev.color}`}>
                        {sev.label}
                      </span>
                    </div>
                    <div className="space-y-1.5 mb-3">
                      {substance.withdrawal.symptoms.map((symptom, i) => (
                        <div key={i} className="flex items-start gap-2 p-2 rounded-lg bg-amber-500/[0.04]">
                          <span className="w-5 h-5 rounded-md bg-amber-500/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                            <span className="text-[10px] font-bold text-amber-400">{i + 1}</span>
                          </span>
                          <span className="text-[11px] text-slate-300 leading-relaxed">{symptom}</span>
                        </div>
                      ))}
                    </div>
                    <div className="rounded-xl bg-amber-500/5 border border-amber-500/10 p-3">
                      <p className="text-[10px] font-semibold text-amber-400 uppercase tracking-wide mb-1">Post-Acute Withdrawal (PAWS)</p>
                      <p className="text-[11px] text-slate-400 leading-relaxed">{substance.withdrawal.paws}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Description — truncated with Read more */}
            <p className="text-xs text-slate-400 leading-relaxed mt-1 line-clamp-2" id={`desc-${substance.id}`}>
              {substance.description}
            </p>
          </div>
        </div>
      </SectionErrorBoundary>

      {/* --- PHARMACOLOGY (Collapsible) --- */}
      <SectionErrorBoundary>
        <CollapsibleSection
          id="pharmacology"
          icon={Icons.pharmacology}
          label="Pharmacology"
          subtitle="Mechanism of action, half-life, and metabolism details"
          expandedId={expandedSection}
          onToggle={handleSectionToggle}
          staggerClass="stagger-1"
          bookmarkKey="pharmacology"
          isBookmarked={bookmarks.has('pharmacology')}
          onToggleBookmark={() => toggleBookmark('pharmacology')}
        >
          <div className="space-y-2.5">
            <PharmRow label="Mechanism" value={substance.pharmacology.mechanism} />
            <PharmRow label="Half-life" value={substance.pharmacology.halfLife} />
            <PharmRow label="Onset" value={substance.pharmacology.onset} />
            <PharmRow label="Peak" value={substance.pharmacology.peak} />
            <PharmRow label="Duration" value={substance.pharmacology.duration} />
            <PharmRow label="Metabolites" value={substance.pharmacology.metabolites} />
          </div>
        </CollapsibleSection>
      </SectionErrorBoundary>

      {/* --- RECOVERY FOCUS (Collapsible) --- */}
      <SectionErrorBoundary>
        <CollapsibleSection
          id="recovery-focus"
          icon={Icons.recovery}
          label="Recovery Focus"
          subtitle={`Target neurotransmitters, organs, and ${substance.recoveryFocus.timeline.toLowerCase()}`}
          expandedId={expandedSection}
          onToggle={handleSectionToggle}
          staggerClass="stagger-2"
          bookmarkKey="recovery-focus"
          isBookmarked={bookmarks.has('recovery-focus')}
          onToggleBookmark={() => toggleBookmark('recovery-focus')}
        >
          {/* Neurotransmitters */}
          <div className="mb-3">
            <p className="text-[10px] text-slate-400 uppercase tracking-wide mb-1.5 flex items-center gap-1.5">
              {React.cloneElement(Icons.brain as React.ReactElement<Record<string, unknown>>, { width: 11, height: 11 })}
              Neurotransmitters
            </p>
            <div className="flex flex-wrap gap-1.5">
              {substance.recoveryFocus.neurotransmitters.map((nt, i) => (
                <span key={i} className="px-2 py-0.5 rounded-md bg-emerald-500/10 text-[10px] text-emerald-400 border border-emerald-500/15 font-medium">
                  {nt}
                </span>
              ))}
            </div>
          </div>

          {/* Organs */}
          <div className="mb-3">
            <p className="text-[10px] text-slate-400 uppercase tracking-wide mb-1.5">Organs & Systems</p>
            <div className="space-y-1">
              {substance.recoveryFocus.organs.map((organ, i) => (
                <div key={i} className="flex items-center gap-2">
                  <span className="w-1 h-1 rounded-full bg-sky-500/60" />
                  <span className="text-[11px] text-slate-400">{organ}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Priority Supplements - expandable */}
          <div className="mb-3">
            <button
              onClick={() => setSupplementsExpanded(!supplementsExpanded)}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setSupplementsExpanded(!supplementsExpanded); } }}
              className="flex items-center justify-between w-full mb-1.5"
            >
              <p className="text-[10px] text-slate-400 uppercase tracking-wide">
                Priority Supplements ({substance.recoveryFocus.prioritySupplements.length})
              </p>
              <span className={`text-slate-500 transition-transform duration-300 ${supplementsExpanded ? 'rotate-180' : ''}`}>
                {React.cloneElement(Icons.chevron as React.ReactElement<Record<string, unknown>>, { width: 12, height: 12 })}
              </span>
            </button>
            {supplementsExpanded ? (
              <div className="space-y-1">
                {substance.recoveryFocus.prioritySupplements.map((supp, i) => (
                  <div key={i} className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-white/5 transition-colors active:scale-[0.98] transition-transform duration-150">
                    <span className="w-5 h-5 rounded-md bg-sky-500/10 flex items-center justify-center flex-shrink-0">
                      <span className="text-[10px] font-bold text-sky-400">{i + 1}</span>
                    </span>
                    <span className="text-[11px] text-slate-300 font-medium flex-1">{supp}</span>
                    <BookmarkIcon isBookmarked={bookmarks.has(`supp-rf-${i}`)} onClick={() => toggleBookmark(`supp-rf-${i}`)} />
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-wrap gap-1.5">
                {substance.recoveryFocus.prioritySupplements.slice(0, 5).map((supp, i) => (
                  <span key={i} className="px-2 py-0.5 rounded-md bg-sky-500/10 text-[10px] text-sky-400 border border-sky-500/15">
                    {supp}
                  </span>
                ))}
                {substance.recoveryFocus.prioritySupplements.length > 5 && (
                  <span className="px-2 py-0.5 rounded-md bg-white/5 text-[10px] text-slate-500 border border-white/5">
                    +{substance.recoveryFocus.prioritySupplements.length - 5} more
                  </span>
                )}
              </div>
            )}
          </div>

          {/* Timeline */}
          <div className="rounded-xl bg-emerald-500/5 border border-emerald-500/10 p-3">
            <p className="text-[10px] font-semibold text-emerald-400 uppercase tracking-wide mb-1">Recovery Timeline</p>
            <p className="text-[11px] text-slate-400 leading-relaxed">{substance.recoveryFocus.timeline}</p>
          </div>
        </CollapsibleSection>
      </SectionErrorBoundary>

      {/* --- RECOVERY PROTOCOL: 2 Big Buttons --- */}
      <SectionErrorBoundary>
        <div className="space-y-3">
          {/* Progress indicator */}
          <div className="flex items-center gap-2 animate-fadeUp stagger-3" style={{ opacity: 0 }}>
            <div className="flex-1 h-1 rounded-full bg-white/5 overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-violet-500 transition-all duration-500"
                style={{ width: `${Math.max(1, progressPct)}%` }}
              />
            </div>
            <span className="text-[9px] text-slate-500 flex-shrink-0">{viewedPhases.size}/{totalPhases}</span>
          </div>

          {/* Two Big Buttons Grid */}
          <div className="grid grid-cols-2 gap-2 animate-fadeUp stagger-3" style={{ opacity: 0 }}>
            {/* LEFT: Symbiotic Protocol */}
            <button
              onClick={() => toggleProtocolPanel('symbiotic')}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggleProtocolPanel('symbiotic'); } }}
              className={`relative p-4 rounded-xl border text-left transition-all active:scale-[0.98] transition-transform duration-150 ${
                activeProtocolPanel === 'symbiotic'
                  ? 'bg-emerald-500/10 border-emerald-500/25 shadow-lg shadow-emerald-500/5'
                  : 'bg-white/[0.03] border-white/[0.08] hover:bg-white/[0.05]'
              }`}
              role="button"
              aria-expanded={activeProtocolPanel === 'symbiotic'}
              aria-controls="symbiotic-panel"
            >
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center mb-3 shadow-md shadow-emerald-500/20">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z" />
                  <path d="M12 5a3 3 0 1 1 5.997.125 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A4 4 0 1 1 12 18Z" />
                  <path d="M12 5v13" />
                </svg>
              </div>
              <h3 className="text-[10px] font-bold uppercase tracking-wider text-emerald-400">SYMBIOTIC</h3>
              <p className="text-xs font-semibold text-white mt-0.5">Protocol</p>
              <p className="text-[10px] text-slate-500 mt-1">3 pillars of recovery</p>
              <div className="absolute top-3 right-3">
                <AnimatedChevron isOpen={activeProtocolPanel === 'symbiotic'} size={12} />
              </div>
            </button>

            {/* RIGHT: Substance-Specific Phases */}
            {substance.recoveryPhases && substance.recoveryPhases.length > 0 && (
              <button
                onClick={() => toggleProtocolPanel('substance')}
                onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggleProtocolPanel('substance'); } }}
                className={`relative p-4 rounded-xl border text-left transition-all active:scale-[0.98] transition-transform duration-150 ${
                  activeProtocolPanel === 'substance'
                    ? 'bg-violet-500/10 border-violet-500/25 shadow-lg shadow-violet-500/5'
                    : 'bg-white/[0.03] border-white/[0.08] hover:bg-white/[0.05]'
                }`}
                role="button"
                aria-expanded={activeProtocolPanel === 'substance'}
                aria-controls="substance-panel"
              >
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-violet-500 to-purple-500 flex items-center justify-center mb-3 shadow-md shadow-violet-500/20">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="m10.5 20.5 10-10a4.95 4.95 0 1 0-7-7l-10 10a4.95 4.95 0 1 0 7 7Z"/>
                    <path d="m8.5 8.5 7 7"/>
                  </svg>
                </div>
                <h3 className="text-[10px] font-bold uppercase tracking-wider text-violet-400">SUBSTANCE-SPECIFIC</h3>
                <p className="text-xs font-semibold text-white mt-0.5">Phases</p>
                <p className="text-[10px] text-slate-500 mt-1">{substance.recoveryPhases.length} phases for {substance.name}</p>
                <div className="absolute top-3 right-3">
                  <AnimatedChevron isOpen={activeProtocolPanel === 'substance'} size={12} />
                </div>
              </button>
            )}
          </div>

          {/* Expanded Symbiotic Panel */}
          {activeProtocolPanel === 'symbiotic' && (
            <div id="symbiotic-panel" className="glass-card overflow-hidden animate-tab-switch">
              <div className="p-3 border-b border-white/[0.04]">
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  The Symbiotic Protocol integrates neurochemical restoration, gut-brain axis repair, and lifestyle synergy into a comprehensive recovery framework.
                </p>
              </div>
              <div className="divide-y divide-white/[0.04]">
                {SYMBIOTIC_PROTOCOL.map((section, sIdx) => {
                  const symColor = SYMBIOTIC_COLORS[sIdx] || SYMBIOTIC_COLORS[SYMBIOTIC_COLORS.length - 1];
                  const rowId = `sym-${section.id}`;
                  const isOpen = expandedProtocolRow === rowId;
                  return (
                    <div key={section.id} className="overflow-hidden">
                      {/* Row Header */}
                      <button
                        onClick={() => handleProtocolRowToggle(rowId)}
                        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handleProtocolRowToggle(rowId); } }}
                        className="w-full p-3 text-left hover:bg-white/[0.02] transition-colors active:scale-[0.999] transition-transform duration-150"
                        role="button"
                        aria-expanded={isOpen}
                        aria-controls={`protocol-row-${rowId}`}
                      >
                        <div className="flex items-center justify-between gap-2">
                          <div className="flex items-center gap-2.5 flex-1 min-w-0">
                            <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold border flex-shrink-0 ${symColor.badge}`}>
                              {symColor.icon}
                            </span>
                            <div className="flex-1 min-w-0">
                              <p className="text-xs font-semibold text-white leading-tight truncate">{section.name}</p>
                              <p className="text-[10px] text-slate-400 mt-0.5 truncate">{section.subtitle}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2 flex-shrink-0">
                            <span className={`text-[9px] px-1.5 py-0.5 rounded border font-medium whitespace-nowrap ${symColor.badge}`}>
                              {section.phases.length} phase{section.phases.length !== 1 ? 's' : ''}
                            </span>
                            <BookmarkIcon isBookmarked={bookmarks.has(`sym-${section.id}`)} onClick={() => toggleBookmark(`sym-${section.id}`)} />
                            <span className={`text-slate-500 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
                              <AnimatedChevron isOpen={isOpen} size={12} />
                            </span>
                          </div>
                        </div>
                        {/* Retracted description */}
                        {!isOpen && (
                          <p className="text-[10px] text-slate-500 leading-relaxed mt-1.5 pl-[52px]">
                            {section.description.slice(0, 120)}...
                          </p>
                        )}
                      </button>

                      {/* Expanded Content */}
                      {isOpen && (
                        <div
                          id={`protocol-row-${rowId}`}
                          role="region"
                          className="border-t border-white/[0.06] p-3 space-y-3 max-h-72 overflow-y-auto custom-scrollbar"
                        >
                          {/* Description */}
                          <p className="text-[10px] text-slate-400 leading-relaxed">{section.description}</p>

                          {/* Core Principles */}
                          <div>
                            <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wide mb-1.5">Core Principles</p>
                            <div className="space-y-1">
                              {section.principles.slice(0, 3).map((principle, i) => (
                                <div key={i} className="flex items-start gap-1.5">
                                  <span className={`text-[10px] font-bold ${symColor.text} mt-0.5 flex-shrink-0 w-4 text-right`}>{i + 1}.</span>
                                  <p className="text-[10px] text-slate-400 leading-relaxed">{principle}</p>
                                </div>
                              ))}
                              {section.principles.length > 3 && (
                                <p className="text-[10px] text-slate-600 pl-5">+{section.principles.length - 3} more principles</p>
                              )}
                            </div>
                          </div>

                          {/* Recovery Phases */}
                          <div>
                            <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wide mb-1.5">Recovery Phases</p>
                            <div className="space-y-1.5">
                              {section.phases.map((phase, idx) => {
                                const phaseColor = PHASE_COLORS[idx] || PHASE_COLORS[PHASE_COLORS.length - 1];
                                const phaseViewId = `${rowId}-p${idx}`;
                                const wasViewed = viewedPhases.has(phaseViewId);
                                return (
                                  <div key={idx} className={`p-2.5 rounded-lg ${phaseColor.bg} border ${phaseColor.border}`}>
                                    <div className="flex items-center gap-2 mb-1">
                                      <span className={`w-5 h-5 rounded-md ${phaseColor.timeline} flex items-center justify-center flex-shrink-0 border`}>
                                        <span className={`text-[10px] font-bold ${phaseColor.text}`}>{idx + 1}</span>
                                      </span>
                                      <p className="text-[11px] font-medium text-white flex-1">{phase.name}</p>
                                      <BookmarkIcon isBookmarked={bookmarks.has(phaseViewId)} onClick={() => toggleBookmark(phaseViewId)} />
                                    </div>
                                    <div className="flex items-center gap-2 ml-7">
                                      <span className={`text-[10px] px-1.5 py-0.5 rounded border font-medium ${phaseColor.timeline}`}>
                                        {phase.timeline}
                                      </span>
                                      <span className="text-[10px] text-slate-600">{phase.actions.length} actions</span>
                                      <span className="text-[10px] text-slate-600">&middot;</span>
                                      <span className="text-[10px] text-slate-600">{phase.supplements.length} supplements</span>
                                      {wasViewed && (
                                        <span className="text-[9px] text-emerald-400 ml-auto flex-shrink-0">✓ viewed</span>
                                      )}
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Expanded Substance-Specific Panel */}
          {activeProtocolPanel === 'substance' && substance.recoveryPhases && substance.recoveryPhases.length > 0 && (
            <div id="substance-panel" className="glass-card overflow-hidden animate-tab-switch">
              <div className="p-3 border-b border-white/[0.04]">
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  Phase-based recovery protocol tailored for <strong className="text-slate-300">{substance.name}</strong>. Each phase includes medical notes, supplements, dietary focus, and milestones.
                </p>
              </div>
              <div className="divide-y divide-white/[0.04]">
                {substance.recoveryPhases.map((phase, phaseIdx) => {
                  const colors = PHASE_COLORS[phaseIdx] || PHASE_COLORS[PHASE_COLORS.length - 1];
                  const rowId = `sub-phase-${phaseIdx}`;
                  const isOpen = expandedProtocolRow === rowId;
                  return (
                    <div key={phaseIdx} className="overflow-hidden">
                      {/* Phase Row Header */}
                      <button
                        onClick={() => handleProtocolRowToggle(rowId)}
                        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handleProtocolRowToggle(rowId); } }}
                        className="w-full p-3 text-left hover:bg-white/[0.02] transition-colors active:scale-[0.999] transition-transform duration-150"
                        role="button"
                        aria-expanded={isOpen}
                        aria-controls={`sub-phase-content-${phaseIdx}`}
                      >
                        <div className="flex items-center justify-between gap-2">
                          <div className="flex items-center gap-2.5 flex-1 min-w-0">
                            {/* Colored numbered badge */}
                            <span className={`w-6 h-6 rounded-lg ${colors.badge} flex items-center justify-center flex-shrink-0 ring-1 ${colors.border}`}>
                              <span className="text-[10px] font-bold">{phaseIdx + 1}</span>
                            </span>
                            <div className="flex-1 min-w-0">
                              <p className="text-xs font-semibold text-white leading-tight truncate">{phase.name}</p>
                              <p className="text-[10px] text-slate-400 mt-0.5">{phase.timeline}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2 flex-shrink-0">
                            <span className={`text-[9px] px-1.5 py-0.5 rounded border font-medium whitespace-nowrap ${colors.timeline}`}>
                              {phase.prioritySupplements.length} supp
                            </span>
                            <BookmarkIcon isBookmarked={bookmarks.has(rowId)} onClick={() => toggleBookmark(rowId)} />
                            <span className={`text-slate-500 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
                              <AnimatedChevron isOpen={isOpen} size={12} />
                            </span>
                          </div>
                        </div>
                        {/* Retracted: milestones preview */}
                        {!isOpen && phase.milestones && phase.milestones.length > 0 && (
                          <div className="flex items-center gap-1 mt-1.5 pl-[42px] overflow-x-auto hide-scrollbar-x">
                            {phase.milestones.slice(0, 3).map((m, mi) => (
                              <span key={mi} className={`px-1.5 py-0.5 rounded border text-[8px] font-medium whitespace-nowrap ${colors.badge} flex-shrink-0`}>
                                {m.replace(/_/g, ' ')}
                              </span>
                            ))}
                            {phase.milestones.length > 3 && (
                              <span className="text-[9px] text-slate-600 flex-shrink-0">+{phase.milestones.length - 3}</span>
                            )}
                          </div>
                        )}
                      </button>

                      {/* Expanded Phase Content */}
                      {isOpen && (
                        <div
                          id={`sub-phase-content-${phaseIdx}`}
                          role="region"
                          className="border-t border-white/[0.06] p-3 space-y-2.5 max-h-72 overflow-y-auto custom-scrollbar"
                        >
                          {/* Medical Note */}
                          {phase.medicalNote && (
                            <div className="rounded-lg bg-red-500/10 border border-red-500/20 p-2.5">
                              <p className="text-[10px] font-bold text-red-400 uppercase tracking-wide mb-1 flex items-center gap-1">
                                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
                                Medical Warning
                              </p>
                              <p className="text-[10px] text-red-300 leading-relaxed">{phase.medicalNote}</p>
                            </div>
                          )}

                          {/* Neurochemical State */}
                          {phase.neurochemicalState && (
                            <div className="rounded-lg bg-white/[0.02] p-2.5">
                              <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wide mb-1">Neurochemical State</p>
                              <p className="text-[10px] text-slate-400 leading-relaxed">{phase.neurochemicalState}</p>
                            </div>
                          )}

                          {/* Priority Supplements Table */}
                          <div>
                            <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wide mb-1.5">Priority Supplements ({phase.prioritySupplements.length})</p>
                            <div className="overflow-x-auto -mx-1">
                              <table className="w-full text-left min-w-[280px]">
                                <thead>
                                  <tr className="border-b border-white/[0.04]">
                                    <th className="text-[9px] font-semibold text-slate-500 uppercase tracking-wider pb-1.5 pr-2">Supplement</th>
                                    <th className="text-[9px] font-semibold text-slate-500 uppercase tracking-wider pb-1.5 pr-2">Dosage</th>
                                    <th className="text-[9px] font-semibold text-slate-500 uppercase tracking-wider pb-1.5 w-6"></th>
                                  </tr>
                                </thead>
                                <tbody className="divide-y divide-white/[0.03]">
                                  {phase.prioritySupplements.map((supp, si) => (
                                    <tr key={si}>
                                      <td className="py-1.5 pr-2">
                                        <span className="text-[10px] text-slate-300 font-medium">{supp.name}</span>
                                      </td>
                                      <td className="py-1.5 pr-2">
                                        <span className={`text-[10px] ${colors.text} font-medium whitespace-nowrap`}>{supp.dosage}</span>
                                      </td>
                                      <td className="py-1.5">
                                        <BookmarkIcon isBookmarked={bookmarks.has(`${rowId}-supp-${si}`)} onClick={() => toggleBookmark(`${rowId}-supp-${si}`)} />
                                      </td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                          </div>

                          {/* Dietary Focus */}
                          {phase.dietaryFocus && phase.dietaryFocus.length > 0 && (
                            <div>
                              <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wide mb-1.5">Dietary Focus</p>
                              <div className="flex flex-wrap gap-1">
                                {phase.dietaryFocus.map((item, di) => (
                                  <span key={di} className="px-2 py-0.5 rounded-md bg-emerald-500/[0.06] text-[9px] text-emerald-400/80 border border-emerald-500/10 leading-snug">
                                    {item}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* Milestones */}
                          {phase.milestones && phase.milestones.length > 0 && (
                            <div>
                              <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wide mb-1.5">Milestones</p>
                              <div className="flex flex-wrap gap-1">
                                {phase.milestones.map((milestone, mi) => (
                                  <span key={mi} className={`px-2 py-0.5 rounded-md ${colors.badge} text-[9px] font-medium leading-snug`}>
                                    {milestone.replace(/_/g, ' ')}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </SectionErrorBoundary>

      {/* --- RECOVERY TIPS (Collapsible) --- */}
      {substance.recoveryTips && substance.recoveryTips.length > 0 && (
        <SectionErrorBoundary>
          <CollapsibleSection
            id="recovery-tips"
            icon={Icons.lightbulb}
            label="Recovery Tips"
            subtitle={`${substance.recoveryTips.length} evidence-based recovery strategies`}
            expandedId={expandedSection}
            onToggle={handleSectionToggle}
            staggerClass="stagger-4"
            bookmarkKey="recovery-tips"
            isBookmarked={bookmarks.has('recovery-tips')}
            onToggleBookmark={() => toggleBookmark('recovery-tips')}
          >
            <div className="space-y-1.5">
              {substance.recoveryTips.map((tip, i) => (
                <div key={i} className="flex items-start gap-2 p-2 rounded-lg bg-sky-500/[0.04] active:scale-[0.98] transition-transform duration-150">
                  <span className="w-5 h-5 rounded-md bg-sky-500/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-[10px] font-bold text-sky-400">{i + 1}</span>
                  </span>
                  <span className="text-[11px] text-slate-300 leading-relaxed flex-1">{tip}</span>
                  <BookmarkIcon isBookmarked={bookmarks.has(`tip-${i}`)} onClick={() => toggleBookmark(`tip-${i}`)} />
                </div>
              ))}
            </div>
          </CollapsibleSection>
        </SectionErrorBoundary>
      )}

      {/* --- PHILIPPINES (Enhanced Collapsible) --- */}
      <SectionErrorBoundary>
        <CollapsibleSection
          id="philippines"
          icon={Icons.philippines}
          label="Philippines"
          subtitle="Legal status, penalties, and local context"
          expandedId={expandedSection}
          onToggle={handleSectionToggle}
          staggerClass="stagger-5"
          bookmarkKey="philippines"
          isBookmarked={bookmarks.has('philippines')}
          onToggleBookmark={() => toggleBookmark('philippines')}
        >
          <div className="space-y-2.5">
            {/* Legality with colored status indicator */}
            <div className="p-2.5 rounded-xl bg-white/[0.04]">
              <p className="text-[10px] text-slate-400 uppercase tracking-wide mb-1 flex items-center gap-1.5">
                🇵🇭 Legality
              </p>
              <div className="flex items-start gap-1.5">
                <span className={`w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0 ${
                  substance.philippines.legality.toLowerCase().includes('illegal')
                    ? 'bg-red-500'
                    : substance.philippines.legality.toLowerCase().includes('regulated')
                    ? 'bg-amber-500'
                    : 'bg-emerald-500'
                }`} />
                <p className="text-[11px] text-slate-300 leading-relaxed">{substance.philippines.legality}</p>
              </div>
            </div>

            {/* Penalties with warning styling */}
            <div className="p-2.5 rounded-xl bg-rose-500/[0.04] border border-rose-500/10">
              <p className="text-[10px] text-rose-400 uppercase tracking-wide mb-1 flex items-center gap-1">
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
                Penalties
              </p>
              <p className="text-[11px] text-slate-300 leading-relaxed">{substance.philippines.penalties}</p>
            </div>

            {/* Common Form & Street Price - 2 column mini grid */}
            <div className="grid grid-cols-2 gap-2">
              <div className="p-2.5 rounded-xl bg-white/[0.04]">
                <p className="text-[10px] text-slate-400 uppercase tracking-wide mb-0.5">Common Form</p>
                <p className="text-[11px] text-slate-300 leading-relaxed">{substance.philippines.commonForm}</p>
              </div>
              <div className="p-2.5 rounded-xl bg-white/[0.04]">
                <p className="text-[10px] text-slate-400 uppercase tracking-wide mb-0.5">Street Price</p>
                <p className="text-[11px] text-slate-200 font-medium leading-relaxed">{substance.philippines.streetPrice}</p>
              </div>
            </div>
          </div>
        </CollapsibleSection>
      </SectionErrorBoundary>

      {/* --- Disclaimer --- */}
      <SectionErrorBoundary>
        <div className="glass-card p-3 animate-fadeUp stagger-6" style={{ opacity: 0 }}>
          <p className="text-[10px] text-slate-400 leading-relaxed">
            <strong className="text-slate-300">Disclaimer:</strong> This information is for educational purposes only and is not medical advice. Always consult a healthcare professional for substance-related concerns.
          </p>
        </div>
      </SectionErrorBoundary>
    </div>
  );
});

// --- Sub-components ---

const PharmRow = React.memo(function PharmRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="p-2.5 rounded-xl bg-white/[0.04]">
      <p className="text-[10px] text-slate-400 uppercase tracking-wide mb-0.5">{label}</p>
      <p className="text-[11px] text-slate-300 leading-relaxed">{value}</p>
    </div>
  );
});

const InfoRow = React.memo(function InfoRow({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) {
  return (
    <div className="p-2.5 rounded-xl bg-white/[0.04]">
      <p className="text-[10px] text-slate-400 uppercase tracking-wide mb-0.5">{label}</p>
      <p className={`text-[11px] leading-relaxed ${highlight ? 'text-slate-200 font-medium' : 'text-slate-300'}`}>
        {value}
      </p>
    </div>
  );
});

// --- Main Component ---

// Data-driven tab config derived from SUBSTANCE_LIST
const TAB_CONFIG = SUBSTANCE_LIST.map((s) => ({
  id: s.id,
  label: s.name.replace(/\s*\(.*\)/, '').trim(),
  dangerLevel: s.dangerLevel,
}));

const Substances = React.memo(function Substances() {
  const [activeTab, setActiveTab] = useState(TAB_CONFIG[0]?.id ?? '');
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');

  // Recently viewed substances (persisted in localStorage)
  const [recentlyViewed, setRecentlyViewed] = useState<string[]>(() => {
    if (typeof window === 'undefined') return [];
    try {
      const stored = localStorage.getItem('recently-viewed-substances');
      return stored ? JSON.parse(stored) : [];
    } catch (e) { console.warn('[RecoveryLine] Failed to read recently viewed:', e); return []; }
  });

  // Scroll indicator state
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [hasOverflow, setHasOverflow] = useState(false);

  // Ref for the scrollable drug tab container
  const tabContainerRef = useRef<HTMLDivElement>(null);
  // Map of tab id → button element ref
  const tabButtonRefs = useRef<Record<string, HTMLButtonElement | null>>({});

  const activeSubstance = SUBSTANCES[activeTab];

  const searchResults = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return [];
    return SUBSTANCE_LIST.filter((s) => {
      const nameMatch = s.name.toLowerCase().includes(q);
      const aliasMatch = s.aliases.some((a) => a.toLowerCase().includes(q));
      const streetMatch = s.streetNames.some((sn) => sn.toLowerCase().includes(q));
      return nameMatch || aliasMatch || streetMatch;
    });
  }, [searchQuery]);

  const isSearching = searchQuery.trim().length > 0;

  // Category filter options
  const CATEGORIES = useMemo(() => {
    const cats = new Set(SUBSTANCE_LIST.map(s => s.category));
    return ['all', ...Array.from(cats)];
  }, []);

  const filteredSearchResults = useMemo(() => {
    if (categoryFilter === 'all') return searchResults;
    return searchResults.filter(s => s.category === categoryFilter);
  }, [searchResults, categoryFilter]);

  // Track recently viewed when activeTab changes
  useEffect(() => {
    if (!activeTab) return;
    setRecentlyViewed(prev => {
      const next = [activeTab, ...prev.filter(id => id !== activeTab)].slice(0, 5);
      try { localStorage.setItem('recently-viewed-substances', JSON.stringify(next)); } catch (e) { console.warn('[RecoveryLine] Failed to save recently viewed:', e); }
      return next;
    });
  }, [activeTab]);

  const recentlyViewedSubstances = useMemo(() => {
    return recentlyViewed.map(id => SUBSTANCES[id]).filter(Boolean);
  }, [recentlyViewed]);

  // Compute scroll indicator visibility
  const updateScrollIndicators = useCallback(() => {
    const container = tabContainerRef.current;
    if (!container) return;
    const { scrollLeft, scrollWidth, clientWidth } = container;
    const overflow = scrollWidth > clientWidth + 2;
    setHasOverflow(overflow);
    setCanScrollLeft(scrollLeft > 2);
    setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 2);
    const maxScroll = scrollWidth - clientWidth;
    setScrollProgress(maxScroll > 0 ? scrollLeft / maxScroll : 0);
  }, []);

  // Update indicators on scroll and when active tab changes
  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      updateScrollIndicators();
    });
    const container = tabContainerRef.current;
    if (!container) return () => cancelAnimationFrame(frame);
    container.addEventListener('scroll', updateScrollIndicators, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      container.removeEventListener('scroll', updateScrollIndicators);
    };
  }, [activeTab, updateScrollIndicators]);

  // Also update on resize
  useEffect(() => {
    updateScrollIndicators();
    window.addEventListener('resize', updateScrollIndicators);
    return () => window.removeEventListener('resize', updateScrollIndicators);
  }, [updateScrollIndicators]);

  // When active tab changes, scroll it into view
  useEffect(() => {
    const btn = tabButtonRefs.current[activeTab];
    if (btn) {
      btn.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' });
    }
  }, [activeTab]);

  return (
    <div className="space-y-4 pb-6">
      {/* Header */}
      <div className="animate-fadeUp">
        <h2 className="text-lg font-bold text-white">Substance Info</h2>
        <p className="text-xs text-slate-400 mt-0.5">Detailed biochemical information</p>
      </div>

      {/* Search Input */}
      <div className="glass-card p-1.5 flex items-center gap-2 animate-fadeUp stagger-1" style={{ opacity: 0 }}>
        <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center flex-shrink-0">
          {React.cloneElement(Icons.search as React.ReactElement<Record<string, unknown>>, { width: 14, height: 14, className: 'text-slate-500' })}
        </div>
        <input
          type="text"
          placeholder="Search substances, aliases..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="flex-1 bg-transparent text-xs text-white placeholder:text-slate-500 outline-none min-w-0"
        />
        {isSearching && (
          <button
            onClick={() => setSearchQuery('')}
            className="w-6 h-6 rounded-md bg-white/5 flex items-center justify-center flex-shrink-0 hover:bg-white/10 transition-colors active:scale-[0.98] transition-transform duration-150"
          >
            {React.cloneElement(Icons.x as React.ReactElement<Record<string, unknown>>, { width: 12, height: 12, className: 'text-slate-500' })}
          </button>
        )}
      </div>

      {/* Category Filter Chips (shown when searching) */}
      {isSearching && (
        <div className="flex gap-1.5 overflow-x-auto hide-scrollbar-x animate-fadeUp stagger-1 pb-1" style={{ opacity: 0 }}>
          {CATEGORIES.map((cat) => {
            const isActive = categoryFilter === cat;
            const count = cat === 'all' ? searchResults.length : searchResults.filter(s => s.category === cat).length;
            if (cat !== 'all' && count === 0) return null;
            return (
              <button
                key={cat}
                onClick={() => setCategoryFilter(cat)}
                className={`flex-shrink-0 px-3 py-1.5 rounded-full text-[10px] font-medium border transition-all active:scale-95 transition-transform duration-150 ${
                  isActive
                    ? 'bg-sky-500/15 border-sky-500/25 text-sky-400'
                    : 'bg-white/[0.04] border-white/[0.08] text-slate-500 hover:text-slate-300'
                }`}
              >
                {getCategoryLabel(cat === 'all' ? 'all' : cat)}{' '}
                <span className="ml-1 opacity-60">{count}</span>
              </button>
            );
          })}
        </div>
      )}

      {/* Recently Viewed (shown when not searching and not in detail view) */}
      {!isSearching && !activeSubstance && recentlyViewedSubstances.length > 0 && (
        <div className="animate-fadeUp stagger-1" style={{ opacity: 0 }}>
          <div className="flex items-center gap-2 mb-2">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
            </svg>
            <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider">Recently Viewed</span>
          </div>
          <div className="flex gap-2 overflow-x-auto hide-scrollbar-x">
            {recentlyViewedSubstances.map((s) => (
              <button
                key={s.id}
                onClick={() => {
                  haptic(10);
                  setActiveTab(s.id);
                }}
                className="flex-shrink-0 w-24 p-2.5 rounded-xl bg-white/[0.03] border border-white/[0.06] hover:border-white/[0.12] transition-all active:scale-95 transition-transform duration-150 text-left"
              >
                <div className="flex items-center gap-1.5 mb-1.5">
                  <div className={`w-6 h-6 rounded-lg bg-gradient-to-br ${getDangerGradient(s.dangerLevel)} flex items-center justify-center flex-shrink-0`}>
                    <span className="text-[8px] font-bold text-white">{s.dangerLevel}</span>
                  </div>
                  <span className="text-[9px] px-1.5 py-0.5 rounded-md bg-white/5 text-slate-500 font-medium truncate max-w-[70px]">
                    {getCategoryLabel(s.category)}
                  </span>
                </div>
                <p className="text-[11px] font-medium text-white truncate">{s.label}</p>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Tab Navigation (hidden when searching) — horizontally scrollable */}
      {!isSearching && (
        <div className="relative animate-fadeUp stagger-1" style={{ opacity: 0 }}>
          {/* Left scroll indicator */}
          {canScrollLeft && (
            <div className="absolute left-0 top-0 bottom-0 w-10 bg-gradient-to-r from-[rgba(17,24,39,0.95)] via-[rgba(17,24,39,0.8)] to-transparent z-10 flex items-center justify-start pointer-events-none rounded-l-2xl">
              <button
                onClick={() => tabContainerRef.current?.scrollBy({ left: -140, behavior: 'smooth' })}
                className="pointer-events-auto w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white/60 hover:text-white/90 transition-colors active:scale-90 ml-1"
                aria-label="Scroll drugs left"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
              </button>
            </div>
          )}
          {/* Right scroll indicator */}
          {canScrollRight && (
            <div className="absolute right-0 top-0 bottom-0 w-10 bg-gradient-to-l from-[rgba(17,24,39,0.95)] via-[rgba(17,24,39,0.8)] to-transparent z-10 flex items-center justify-end pointer-events-none rounded-r-2xl">
              <button
                onClick={() => tabContainerRef.current?.scrollBy({ left: 140, behavior: 'smooth' })}
                className="pointer-events-auto w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white/60 hover:text-white/90 transition-colors active:scale-90 mr-1"
                aria-label="Scroll drugs right"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
              </button>
            </div>
          )}
          <div
            ref={tabContainerRef}
            className="glass-card p-1.5 flex overflow-x-auto scroll-smooth hide-scrollbar-x"
          >
            {TAB_CONFIG.map((tab) => {
              const isActive = activeTab === tab.id;
              const dotColor = getDangerDotColor(tab.dangerLevel);
              return (
                <button
                  key={tab.id}
                  ref={(el) => { tabButtonRefs.current[tab.id] = el; }}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-shrink-0 py-2.5 px-3 rounded-xl text-xs font-medium transition-all flex items-center justify-center gap-1.5 whitespace-nowrap active:scale-[0.98] transition-transform duration-150 ${
                    isActive
                      ? 'bg-white/[0.08] text-white border border-white/15 shadow-sm'
                      : 'text-slate-400 hover:text-slate-300 border border-transparent'
                  }`}
                >
                  <span className={`w-1.5 h-1.5 rounded-full ${isActive ? dotColor : 'bg-slate-600'}`} />
                  {tab.label}
                </button>
              );
            })}
          </div>
          {/* Scroll progress bar */}
          {hasOverflow && (
            <div className="mt-1 h-[2px] rounded-full bg-white/5 overflow-hidden" role="progressbar" aria-valuenow={Math.round(scrollProgress * 100)} aria-valuemin={0} aria-valuemax={100} aria-label="Drug tabs scroll progress">
              <div
                className="h-full rounded-full bg-gradient-to-r from-sky-500 to-emerald-500 transition-[width] duration-100"
                style={{ width: `${Math.max(0.02, scrollProgress * 100)}%` }}
              />
            </div>
          )}
        </div>
      )}

      {/* Search Results (flat list) */}
      {isSearching && (
        <div className="space-y-3 animate-fadeUp">
          {filteredSearchResults.length > 0 ? (
            <>
              <p className="text-[10px] text-slate-500 px-1">{filteredSearchResults.length} result{filteredSearchResults.length !== 1 ? 's' : ''} found</p>
              {filteredSearchResults.map((substance) => (
                <button
                  key={substance.id}
                  onClick={() => {
                    setActiveTab(substance.id);
                    setSearchQuery('');
                  }}
                  className="glass-card p-3 w-full text-left hover:bg-white/[0.04] transition-all active:scale-[0.995] transition-transform duration-150 animate-fadeUp"
                  style={{ opacity: 0 }}
                >
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <h3 className="text-xs font-semibold text-white truncate">{substance.name}</h3>
                      <p className="text-[10px] text-slate-500 mt-0.5 truncate">
                        {substance.aliases.slice(0, 3).join(', ')}
                      </p>
                    </div>
                    <div className="flex items-center gap-1.5 flex-shrink-0">
                      <span className="text-[10px] text-slate-500">{substance.dangerLevel}/5</span>
                      <div className="flex items-center gap-0.5">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <span
                            key={i}
                            className={`w-1.5 h-1.5 rounded-full ${
                              i < substance.dangerLevel ? getDangerDotColor(substance.dangerLevel) : 'bg-white/10'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </>
          ) : (
            <div className="glass-card p-6 text-center">
              <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center mx-auto mb-3">
                {React.cloneElement(Icons.search as React.ReactElement<Record<string, unknown>>, { width: 18, height: 18, className: 'text-slate-600' })}
              </div>
              <p className="text-xs text-slate-400 font-medium">No substances found</p>
              <p className="text-[10px] text-slate-500 mt-1">Try a different search term</p>
            </div>
          )}
        </div>
      )}

      {/* Active Substance Detail (hidden when searching) */}
      {!isSearching && (
        <div key={activeTab}>
          {activeSubstance && <SubstanceDetail substance={activeSubstance} />}
        </div>
      )}
    </div>
  );
});

export default Substances;
