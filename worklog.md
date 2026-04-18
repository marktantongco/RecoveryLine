# RecoveryLine Worklog

---
Task ID: 1
Agent: main
Task: Comprehensive RecoveryLine PWA upgrade — profiling, mobile scroll fix, UI polish, build verification

Work Log:
- Profiled entire codebase: identified 8 bottleneck areas across 10 files
- Identified root cause of mobile scroll: body `overflow: hidden` → changed to `overflow: clip` + `position: fixed` + added `transform: translateZ(0)` to `.app-shell-main` for iOS Safari GPU compositing
- Changed `html` overflow from `hidden` to `auto` with `-webkit-overflow-scrolling: touch`
- Confirmed splash screen was already removed (Home component directly renders AppContent)
- Cleaned up unused Onboarding import from page.tsx
- Confirmed service worker registration is minimal (no install prompt UI)
- Redesigned header navigation: 6 cramped icon buttons → 4 cleaner buttons (Substances, Bio Tools, Recovery + More) with larger 36px min touch targets and active state glow shadows
- Added `line-clamp-2` and `line-clamp-3` utility classes to globals.css
- Truncated substance description to 2 lines with line-clamp-2 for cleaner header card
- Fixed syntax error in cannabis.ts (extra closing brace causing build failure)
- Verified build passes: `rm -rf .next && npx next build` → ✓ Compiled in 5.6s

Stage Summary:
- Mobile scroll should now work on iOS Safari (position: fixed on body + translateZ(0) on scroll container)
- Header navigation is cleaner with 4 well-spaced buttons instead of 6 cramped ones
- Substance detail header cards are less cluttered with truncated descriptions
- All 11 drug data files compile correctly
- Build verified: static pages generated in 107ms

---
Task ID: 7
Agent: Full-stack Developer
Task: Comprehensive RecoveryLine PWA Upgrade

Work Log:
- Verified glass-card::before containment: `.glass-card` already has `position: relative` (line 149 of globals.css) — no change needed
- Verified PharmRow helper: already defined at line 1246 of Substances.tsx as `React.memo` — no change needed
- Mobile Scroll Hardening: added `overscroll-behavior: none` to `html` rule in `@layer base` (was missing, only body had it); added `-webkit-overflow-scrolling: touch` to `body` rule (was missing, only html had it). Both html and body now have both defensive scroll properties.
- Verified `app-shell-main` class already has proper mobile scroll support: `overflow-y: auto; touch-action: pan-y;` ✓
- Service Worker Error Suppression: changed `.catch(function() {})` to `.catch(function(err) { console.warn('[RecoveryLine] SW registration failed:', err); })` in layout.tsx
- Build verification: `rm -rf .next && npx next build` → ✓ Compiled in 5.0s, static pages in 104.3ms

Stage Summary:
- Build verification: pass — clean build, no errors
- Files modified: `src/app/globals.css`, `src/app/layout.tsx`
- Items verified as already correct: glass-card position: relative, PharmRow definition, app-shell-main scroll support

## Pending Items (from previous sessions)
- Advanced feature: per-drug substance data lazy loading (optimization, not blocking)
- Component split of Substances.tsx (1502 lines → smaller files) (optimization, not blocking)
- Additional CSS cleanup and consolidation
