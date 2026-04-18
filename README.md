# RecoveryLine

> **Biochemical Recovery Tracker** — Your private companion for tracking sobriety, understanding substance effects, and following science-based recovery protocols.

RecoveryLine is a mobile-first Progressive Web App (PWA) built with Next.js 16, featuring a dark glassmorphism UI with real-time check-ins, substance education, recovery protocols, and comprehensive bio-recovery tools.

## Features

### Core Modules

| Module | Description |
|--------|-------------|
| **Dashboard** | Real-time recovery stats, streak tracker, spending analytics, mood insights, and motivational cards |
| **Substances** | 11 substance profiles with detailed pharmacology, damage analysis, harm reduction, withdrawal timelines, and recovery protocols |
| **Bio Tools** | Supplement tracker, medication management, and bio-recovery monitoring |
| **Recovery Hub** | Daily check-ins, mood tracking, journaling, clipboard for recovery notes, spending tracker |
| **Nutrition & Juices** | Recovery-focused nutrition guides and juice recipes |
| **Mind & Psychology** | Mental health tools, breathing exercises, and psychological support resources |
| **Recovery Protocol** | Comprehensive symbiotic protocol with 3 pillars and substance-specific 4-phase recovery plans |
| **PH Guide** | Philippines-specific recovery resources, hotlines, and support networks |

### Substance Database

Detailed profiles for 11 substances including:

- Methamphetamine, Cocaine, Heroin
- MDMA (Ecstasy), LSD, Ketamine
- Alcohol, Benzodiazepines, GHB/GBL
- Cannabis (Marijuana), Nicotine

Each profile includes:
- 10 primary damage areas with severity summaries
- 10 harm reduction strategies
- 10 withdrawal symptoms with timeline and PAWS information
- Full pharmacology data (mechanism, half-life, onset, peak, duration, metabolites)
- Recovery focus (neurotransmitters, organs, priority supplements, timeline)
- Substance-specific 4-phase recovery protocol

### UI/UX Highlights

- **Dark Glassmorphism Design** — Frosted glass cards with layered shadows, gradient borders, and noise overlays
- **Animated Transitions** — Smooth page transitions, staggered card animations, and spring-physics micro-interactions
- **Mobile-First** — Optimized for iOS/Android with safe area support, touch-action handling, and haptic feedback
- **Collapsible Sections** — All content organized into expandable cards with animated chevrons
- **Bookmark System** — Save and track your most important recovery information (persisted in localStorage)
- **Phase Progress Tracking** — Track which recovery protocol phases you've reviewed
- **Skeleton Loaders** — Shimmer loading states for perceived performance
- **Calculator Camouflage** — Disguise the app as a calculator for privacy
- **Error Boundaries** — Graceful error handling at section and app levels

### Technical Features

- **PWA** — Installable on mobile devices with offline capability
- **Code Splitting** — Lazy-loaded sections for fast initial load
- **State Management** — Zustand-based recovery state with localStorage persistence
- **Accessibility** — Keyboard navigation, ARIA labels, focus management, reduced-motion support
- **Type Safety** — Full TypeScript coverage

## Tech Stack

| Technology | Purpose |
|-----------|---------|
| [Next.js 16](https://nextjs.org/) | React framework with App Router |
| [TypeScript 5](https://www.typescriptlang.org/) | Type-safe development |
| [Tailwind CSS 4](https://tailwindcss.com/) | Utility-first styling |
| [Radix UI](https://www.radix-ui.com/) | Accessible component primitives |
| [Zustand](https://zustand-demo.pmnd.rs/) | Lightweight state management |
| [Recharts](https://recharts.org/) | Data visualization |
| [Framer Motion](https://www.framer.com/motion/) | Animation library |
| [date-fns](https://date-fns.org/) | Date utilities |
| [Prisma](https://www.prisma.io/) | Database ORM (optional) |

## Project Structure

```
recoveryline/
├── public/
│   ├── icon-192.png              # App icon (192x192)
│   ├── icon-512.png              # App icon (512x512)
│   ├── logo.svg                  # SVG logo
│   ├── manifest.json             # PWA manifest
│   ├── robots.txt                # SEO robots
│   └── sw.js                     # Service worker
├── src/
│   ├── app/
│   │   ├── page.tsx              # Main app shell (SPA routing)
│   │   ├── layout.tsx            # Root layout with metadata
│   │   └── globals.css           # Global styles, glass system, animations
│   ├── components/
│   │   ├── recovery/
│   │   │   ├── Dashboard.tsx     # Home dashboard
│   │   │   ├── Substances.tsx    # Substance browser + detail view
│   │   │   ├── BioTools.tsx      # Supplement & medication tracker
│   │   │   ├── RecoveryHub.tsx   # Check-ins, journal, clipboard
│   │   │   ├── NutritionJuices.tsx # Nutrition guides
│   │   │   ├── MindPsychology.tsx # Mental health tools
│   │   │   ├── RecoveryProtocol.tsx # Recovery protocol viewer
│   │   │   ├── PHGuide.tsx       # Philippines resources
│   │   │   ├── BottomNav.tsx     # Bottom navigation bar
│   │   │   ├── ActionFab.tsx     # Floating action button
│   │   │   ├── Settings.tsx      # App settings modal
│   │   │   ├── Calculator.tsx    # Calculator camouflage mode
│   │   │   ├── ErrorBoundary.tsx # Error boundary wrapper
│   │   │   ├── Toast.tsx         # Toast notification system
│   │   │   └── ...               # Other UI components
│   │   └── ui/                   # Shadcn/ui primitives
│   ├── hooks/
│   │   ├── use-recovery-state.ts # Main Zustand store
│   │   ├── use-mobile.ts         # Mobile detection hook
│   │   └── use-toast.ts          # Toast hook
│   └── lib/
│       ├── substances/           # Substance data modules
│       │   ├── types.ts          # Substance type definitions
│       │   ├── index.ts          # Export aggregator
│       │   ├── methamphetamine.ts
│       │   ├── cocaine.ts
│       │   ├── heroin.ts
│       │   ├── mdma.ts
│       │   ├── lsd.ts
│       │   ├── ketamine.ts
│       │   ├── alcohol.ts
│       │   ├── benzodiazepines.ts
│       │   ├── ghb.ts
│       │   ├── cannabis.ts
│       │   └── nicotine.ts
│       ├── recovery-types.ts     # App-wide type definitions
│       ├── recovery-constants.ts # App constants
│       ├── recovery-protocol-data.ts # Symbiotic protocol data
│       ├── recovery-content.ts   # Recovery content
│       ├── supplement-data.ts    # Supplement database
│       ├── nutrition-data.ts     # Nutrition & juice data
│       ├── mind-psychology-data.ts # Mental health data
│       ├── timeline-data.ts      # Recovery timeline data
│       └── utils.ts              # Utility functions
├── .env.example                  # Environment template
├── .gitignore                    # Git ignore rules
├── next.config.ts                # Next.js configuration
├── tailwind.config.ts            # Tailwind configuration
├── tsconfig.json                 # TypeScript configuration
├── package.json                  # Dependencies & scripts
└── README.md                     # This file
```

## Getting Started

### Prerequisites

- Node.js 18+ or Bun
- npm, yarn, or pnpm

### Installation

```bash
# Clone the repository
git clone https://github.com/marktantongco/RecoveryLine.git
cd RecoveryLine

# Install dependencies
npm install
# or: bun install

# Set up environment
cp .env.example .env.local

# Start development server
npm run dev
```

The app will be available at `http://localhost:3000`.

### Build for Production

```bash
npm run build
npm run start
```

## Deployment

### Vercel (Recommended)

The project is configured for Vercel deployment with `output: "standalone"`:

1. Connect your GitHub repo to [Vercel](https://vercel.com)
2. Vercel auto-detects Next.js — no configuration needed
3. Deploy!

### GitHub Pages

For static hosting on GitHub Pages:

1. The project can be exported as static HTML
2. Set `output: "export"` in `next.config.ts` for static generation
3. Push the `out/` directory to the `gh-pages` branch

## Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server on port 3000 |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |

## Design System

### Glass Card Variants

- **`glass-card`** — Standard frosted glass card
- **`glass-card-hero`** — Enhanced gradient hero card
- **`glass-card-hero-glow`** — Animated gradient border glow
- **`glass-card-elevated`** — Elevated card with stronger shadow
- **`glass-card-pressed`** — Pressed/active state card
- **`glass-card-insight`** — Purple-tinted insight card

### Animation System

- **`animate-fadeUp`** — Fade in from below (0.6s expo)
- **`animate-slideInRight/Left`** — Directional slide transitions
- **`animate-scaleIn`** — Scale-up entrance (0.3s spring)
- **`animate-breathe`** — Slow breathing pulse
- **`animate-float`** — Gentle floating motion
- **`animate-pulse-crisis`** — Crisis alert pulse

### Stagger Timing

Use `stagger-1` through `stagger-6` classes for cascaded entrance animations (30ms gaps).

### Color Tokens

The dark theme uses CSS custom properties for consistency:
- Background: `#0a0f1a`
- Card surfaces: `rgba(17, 24, 39, 0.8)` with `backdrop-filter: blur(12px)`
- Accent colors: Sky (`#0ea5e9`), Emerald (`#10b981`), Amber (`#f59e0b`), Violet (`#8b5cf6`), Rose (`#f43f5e`)

## Privacy

RecoveryLine is designed with privacy in mind:

- **All data stored locally** — Check-ins, bookmarks, and preferences are saved to localStorage
- **No server required** — The app works entirely client-side
- **Calculator camouflage** — Quick privacy mode disguised as a calculator
- **No analytics tracking** — No third-party analytics or tracking scripts

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is proprietary software. All rights reserved.

## Acknowledgments

- Substance data compiled from medical and scientific literature
- Recovery protocols based on evidence-based biochemical research
- Philippines resource guide compiled from local support networks
- Built with the recovery community in mind
