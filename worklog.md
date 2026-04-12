# RecoveryLine - Biochemical Recovery App Worklog

## 2026-04-12 - Initial Build

### Summary
Built the complete RecoveryLine biochemical recovery app as a Next.js 16 single-page application with dark theme, mobile-first design, and all requested features.

### Files Created/Modified

#### Configuration
- `eslint.config.mjs` - Added `react-hooks/set-state-in-effect` rule to "off" for localStorage hydration pattern
- `src/app/layout.tsx` - Updated with Inter font, dark theme, RecoveryLine metadata
- `src/app/globals.css` - Complete design system with dark navy palette, glass-morphism cards, animations, calculator styles, custom scrollbar, timeline dots, toggle chips

#### Core Architecture
- `src/lib/recovery-types.ts` - TypeScript interfaces: Checkin, ClipboardItem, SafetyRule, RecoveryState, MoodInfo, SectionName
- `src/lib/recovery-constants.ts` - MOODS (10 moods), SOBER_MOODS, USE_MOODS, MEDICATIONS (9), SUPPLEMENTS (12), SAFETY_RULES (3), EMERGENCY_HOTLINES (6 Philippines-specific), SUPPLEMENT_STORES (5), NATURAL_ALTERNATIVES (8), DAY_NAMES, STORAGE_KEY, CURRENCY

#### State Management
- `src/hooks/use-recovery-state.ts` - Custom hook with localStorage persistence, all CRUD operations, computed statistics (streak, sobriety rate, mood distribution, day-of-week patterns), AI insights generation, export/reset functionality

#### Components (src/components/recovery/)
- `ProgressRing.tsx` - SVG circular progress ring with gradient (r=32, circumference=201.06)
- `Dashboard.tsx` - Day counter, progress ring (30-day goal), quick stats grid (saved money, check-ins, streak, sober/use), today's status, quick actions, AI insight card, recent activity timeline
- `CheckIn.tsx` - Dual-mode (Sober Day/Use Log), mood selector with emoji buttons, money saved/spent input, quantity input, notes textarea, non-judgmental messaging
- `History.tsx` - Full log with filter (all/sober/use), grouped by date, timeline view with colored dots, delete entries with confirmation, export button
- `Analytics.tsx` - Overview cards, sobriety rate bar, mood distribution chart, day-of-week bar chart, connected insights (financial balance, streak milestone, top mood)
- `Clipboard.tsx` - Quick note input, click-to-copy, timestamps, delete functionality
- `SafetyTools.tsx` - Medication checkboxes, supplement toggle chips, safety rules engine (SSRI/MAOI+5-HTP critical, Stimulant+L-Tyrosine warning, Probiotics without prebiotic info)
- `Resources.tsx` - Tabbed view (Hotlines/Stores/Alternatives), Philippines emergency hotlines, supplement stores, natural alternatives
- `Settings.tsx` - Modal with daily avg spending, spiritual track toggle, export data, reset with double confirmation
- `Calculator.tsx` - Full functional calculator (camouflage mode), triple-tap to exit, document title changes to "Calculator"
- `BottomNav.tsx` - Fixed bottom navigation (Home, Check-In, History, Stats, Notes + Settings gear)
- `CrisisFab.tsx` - Red floating action button, triple-tap to enter calculator mode with hint feedback

#### Main Page
- `src/app/page.tsx` - Client-side SPA with section switching, loading state, all components assembled, header with quick-access safety/resources buttons

### Design System
- Background: #0a0f1a (primary), #111827 (secondary), #1e293b (surface), #334155 (elevated)
- Text: #f1f5f9 (primary), #94a3b8 (secondary), #64748b (muted)
- Accents: Blue #0ea5e9, Green #10b981, Amber #f59e0b, Red #ef4444, Purple #8b5cf6
- Glass-morphism cards with backdrop blur
- Animations: fadeUp, scaleIn, slideInRight, pulse-glow with staggered delays
- Mobile-first with safe area support

### Key Features Implemented
1. ✅ Dashboard with day counter, progress ring, quick stats, AI insights
2. ✅ Check-In dual-mode (sober/use) with mood system
3. ✅ History with filter, timeline, delete, export
4. ✅ Analytics with sobriety rate, mood distribution, day-of-week patterns
5. ✅ Clipboard/Notes with click-to-copy
6. ✅ Safety Tools with medication/supplement interaction checker
7. ✅ Resources (Philippines-specific hotlines, stores, alternatives)
8. ✅ Settings (spending, spiritual track, export, double-confirm reset)
9. ✅ Calculator camouflage mode (triple-tap FAB, triple-tap to exit)
10. ✅ All data persists to localStorage under 'recoveryline_v2'
11. ✅ PHP (₱) currency throughout

### Lint Status
- ✅ All ESLint checks pass
- ✅ No TypeScript errors
- ✅ Dev server compiles successfully
