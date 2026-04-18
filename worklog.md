---
Task ID: 1
Agent: Main Agent
Task: Comprehensive UI/UX Upgrade - 10 Modifications

Work Log:
- Profiled all source files (Substances.tsx, BottomNav.tsx, RecoveryHub.tsx, page.tsx, recovery-types.ts, NutritionJuices.tsx, RecoveryProtocol.tsx, BioTools.tsx)
- Removed 'biotools' from SectionName type in recovery-types.ts
- Replaced Bio Tools nav item with Nutrition in BottomNav (5 nav items: Home, Substances, Nutrition, Recovery, Mind)
- Moved Mind from "More" menu to main nav (was already 5th item, kept it)
- Removed Mind & Nutrition from More menu sub-items (now only PH Guide + Protocol)
- Fixed Mind selection to not highlight "More" button (removed 'mindpsych' from isMoreActive check)
- Removed Bio Tools from page.tsx: NAV_ORDER, lazy import, renderSection case, header shortcut
- Removed Daily Affirmation and Journal Prompt from RecoveryHub
- Removed AFFIRMATIONS/JOURNAL_PROMPTS imports from RecoveryHub
- Modified Substances.tsx: removed line-clamp-2 from description (full text now shown)
- Added forceExpanded prop to CollapsibleSection component
- Moved Symbiotic Protocol above Recovery Focus as always-expanded section
- Made Recovery Focus always expanded (forceExpanded)
- Made Philippines card always expanded (forceExpanded)
- Converted 2-button grid to single Substance-Specific button
- Removed old Symbiotic expanded panel from button area
- Added Supplements tab to NutritionJuices (search, category filter, expandable cards)
- Added Neurochemical Timeline section to RecoveryProtocol (via sub-agent)
- Build verification passed: 0 errors

Stage Summary:
- All 10 UI/UX modifications completed
- Bio-Tools category fully removed from navigation and routing
- Supplements migrated to NutritionJuices with full browser UI
- Neurochemical Timeline migrated to RecoveryProtocol with visual timeline
- Bottom nav now: Home, Substances, Nutrition, Recovery, Mind + More
- More menu now: PH Guide, Protocol + Settings
