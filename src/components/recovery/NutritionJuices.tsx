'use client';

import React, { useState, useMemo } from 'react';
import { JUICE_RECIPES, JUICE_CATEGORIES, type JuiceRecipe } from '@/lib/nutrition-data';
import { NUTRITION_PROTOCOLS, type NutritionProtocol } from '@/lib/nutrition-data';
import { NUTRIENT_GUIDES, type NutrientGuide } from '@/lib/nutrition-data';
import { useToast } from './Toast';

// ─── Types ──────────────────────────────────────────────────────────────────────

type SubTab = 'juice-recipes' | 'nutrition-protocols' | 'nutrient-guides';

// ─── Inline SVG Icons ──────────────────────────────────────────────────────────

function JuiceIcon({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M8 2v4" /><path d="M16 2v4" /><rect width="18" height="18" x="3" y="4" rx="2" />
      <path d="M3 10h18" /><path d="M10 2v4" /><path d="M7 16h.01" /><path d="M17 16h.01" />
    </svg>
  );
}

function ClipboardIcon({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="8" height="4" x="8" y="2" rx="1" ry="1" /><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
      <path d="M12 11h4" /><path d="M12 16h4" /><path d="M8 11h.01" /><path d="M8 16h.01" />
    </svg>
  );
}

function BookIcon({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
      <path d="M8 7h6" /><path d="M8 11h4" />
    </svg>
  );
}

function ClockIcon({ className = 'w-3.5 h-3.5' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
    </svg>
  );
}

function FlameIcon({ className = 'w-3.5 h-3.5' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z" />
    </svg>
  );
}

function ChefHatIcon({ className = 'w-3.5 h-3.5' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 13.87A4 4 0 0 1 7.41 6a5.11 5.11 0 0 1 1.05-1.54 5 5 0 0 1 7.08 0A5.11 5.11 0 0 1 16.59 6 4 4 0 0 1 18 13.87V21H6Z" />
      <line x1="6" y1="17" x2="18" y2="17" />
    </svg>
  );
}

function ZapIcon({ className = 'w-3.5 h-3.5' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
  );
}

function LeafIcon({ className = 'w-3.5 h-3.5' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M11 20A7 7 0 0 1 9.8 6.9C15.5 4.9 17 3.5 19 2c1 2 2 4.5 2 8 0 5.5-4.78 10-10 10Z" />
      <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
    </svg>
  );
}

function BeakerIcon({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4.5 3h15" /><path d="M6 3v16a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V3" />
      <path d="M6 14h12" />
    </svg>
  );
}

function BrainIcon({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z" />
      <path d="M12 5a3 3 0 1 1 5.997.125 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A4 4 0 1 1 12 18Z" />
      <path d="M12 5v13" />
    </svg>
  );
}

function HeartIcon({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
    </svg>
  );
}

function ShieldIcon({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}

function AlertTriangleIcon({ className = 'w-3.5 h-3.5' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
      <path d="M12 9v4" /><path d="M12 17h.01" />
    </svg>
  );
}

function DropletIcon({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7z" />
    </svg>
  );
}

function AppleIcon({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3c.132 0 .263 0 .393 0a7.5 7.5 0 0 0 7.92 12.446A9 9 0 1 1 12 3Z" />
      <path d="M12 3a9 9 0 0 1 8.5 6" /><path d="M12 3a9 9 0 0 0-9 9" />
    </svg>
  );
}

function TimerIcon({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="10" x2="14" y1="2" y2="2" /><line x1="12" x2="12" y1="14" y2="2" />
      <path d="M4.93 4.93l2.83 2.83" /><path d="M16.24 7.76l2.83-2.83" />
      <path d="M20 12a8 8 0 1 1-16 0" />
    </svg>
  );
}

function TargetIcon({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="6" /><circle cx="12" cy="12" r="2" />
    </svg>
  );
}

function UtensilsIcon({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2" /><path d="M7 2v20" />
      <path d="M21 15V2v0a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7" />
    </svg>
  );
}

function MapPinIcon({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="3" />
    </svg>
  );
}

function ChevronDownIcon({ className = 'w-3 h-3' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

function CheckCircleIcon({ className = 'w-3.5 h-3.5' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><path d="m9 11 3 3L22 4" />
    </svg>
  );
}

function XCircleIcon({ className = 'w-3.5 h-3.5' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" /><path d="m15 9-6 6" /><path d="m9 9 6 6" />
    </svg>
  );
}

function InfoIcon({ className = 'w-3.5 h-3.5' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" /><path d="M12 16v-4" /><path d="M12 8h.01" />
    </svg>
  );
}

function LightbulbIcon({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5" />
      <path d="M9 18h6" /><path d="M10 22h4" />
    </svg>
  );
}

// ─── Sub-Tab Navigation ────────────────────────────────────────────────────────

function SubTabNav({ active, onChange }: { active: SubTab; onChange: (tab: SubTab) => void }) {
  const tabs: { id: SubTab; label: string; icon: React.ReactNode }[] = [
    { id: 'juice-recipes', label: 'Juice Recipes', icon: <JuiceIcon className="w-4 h-4" /> },
    { id: 'nutrition-protocols', label: 'Nutrition Protocols', icon: <ClipboardIcon className="w-4 h-4" /> },
    { id: 'nutrient-guides', label: 'Nutrient Guides', icon: <BookIcon className="w-4 h-4" /> },
  ];

  return (
    <div className="flex gap-1 p-1 rounded-2xl bg-white/[0.03] border border-white/[0.06]">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onChange(tab.id)}
          className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 px-2 rounded-xl text-xs font-medium transition-all ${
            active === tab.id
              ? 'bg-sky-500/15 text-sky-400 border border-sky-500/20 shadow-lg shadow-sky-500/5'
              : 'text-slate-500 hover:text-slate-300 border border-transparent'
          }`}
        >
          {tab.icon}
          <span className="hidden sm:inline">{tab.label}</span>
        </button>
      ))}
    </div>
  );
}

// ─── Section Header ─────────────────────────────────────────────────────────────

function SectionHeader({ icon, title }: { icon: React.ReactNode; title: string }) {
  return (
    <div className="flex items-center gap-2.5 mb-3">
      <div className="w-7 h-7 rounded-lg bg-white/5 flex items-center justify-center flex-shrink-0">
        {icon}
      </div>
      <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">{title}</h3>
    </div>
  );
}

// ─── Helpers ────────────────────────────────────────────────────────────────────

function getCategoryColor(cat: JuiceRecipe['category']): string {
  switch (cat) {
    case 'brain-repair': return 'bg-purple-500/15 text-purple-400 border-purple-500/20';
    case 'gut-heal': return 'bg-emerald-500/15 text-emerald-400 border-emerald-500/20';
    case 'detox': return 'bg-amber-500/15 text-amber-400 border-amber-500/20';
    case 'calm': return 'bg-sky-500/15 text-sky-400 border-sky-500/20';
    case 'energy': return 'bg-orange-500/15 text-orange-400 border-orange-500/20';
    case 'immunity': return 'bg-rose-500/15 text-rose-400 border-rose-500/20';
    default: return 'bg-slate-500/15 text-slate-400 border-slate-500/20';
  }
}

function getCategoryLabel(cat: JuiceRecipe['category']): string {
  switch (cat) {
    case 'brain-repair': return 'Brain Repair';
    case 'gut-heal': return 'Gut Heal';
    case 'detox': return 'Detox';
    case 'calm': return 'Calm';
    case 'energy': return 'Energy';
    case 'immunity': return 'Immunity';
    default: return cat;
  }
}

function getCategoryIcon(cat: JuiceRecipe['category']): React.ReactNode {
  const colorMap: Record<string, string> = {
    'brain-repair': '#a78bfa',
    'gut-heal': '#34d399',
    'detox': '#fbbf24',
    'calm': '#38bdf8',
    'energy': '#fb923c',
    'immunity': '#fb7185',
  };
  const color = colorMap[cat] || '#94a3b8';
  switch (cat) {
    case 'brain-repair':
      return <BrainIcon className="w-4 h-4" style={{ color }} />;
    case 'gut-heal':
      return <HeartIcon className="w-4 h-4" style={{ color }} />;
    case 'detox':
      return <ZapIcon className="w-4 h-4" style={{ color }} />;
    case 'calm':
      return <DropletIcon className="w-4 h-4" style={{ color }} />;
    case 'energy':
      return <FlameIcon className="w-4 h-4" style={{ color }} />;
    case 'immunity':
      return <ShieldIcon className="w-4 h-4" style={{ color }} />;
    default:
      return <LeafIcon className="w-4 h-4" style={{ color }} />;
  }
}

function getNutrientCategoryColor(cat: NutrientGuide['category']): string {
  switch (cat) {
    case 'vitamin': return 'bg-purple-500/15 text-purple-400 border-purple-500/20';
    case 'mineral': return 'bg-amber-500/15 text-amber-400 border-amber-500/20';
    case 'amino-acid': return 'bg-sky-500/15 text-sky-400 border-sky-500/20';
    case 'fatty-acid': return 'bg-emerald-500/15 text-emerald-400 border-emerald-500/20';
    case 'antioxidant': return 'bg-rose-500/15 text-rose-400 border-rose-500/20';
    case 'phytonutrient': return 'bg-teal-500/15 text-teal-400 border-teal-500/20';
    default: return 'bg-slate-500/15 text-slate-400 border-slate-500/20';
  }
}

function getNutrientCategoryLabel(cat: NutrientGuide['category']): string {
  switch (cat) {
    case 'vitamin': return 'Vitamin';
    case 'mineral': return 'Mineral';
    case 'amino-acid': return 'Amino Acid';
    case 'fatty-acid': return 'Fatty Acid';
    case 'antioxidant': return 'Antioxidant';
    case 'phytonutrient': return 'Phytonutrient';
    default: return cat;
  }
}

// ─── Juice Recipe Card ──────────────────────────────────────────────────────────

function JuiceRecipeCard({ recipe, index }: { recipe: JuiceRecipe; index: number }) {
  const [expanded, setExpanded] = useState(false);
  const [ingredientsExpanded, setIngredientsExpanded] = useState(false);
  const [instructionsExpanded, setInstructionsExpanded] = useState(false);
  const { showToast } = useToast();
  const staggerClass = index < 6 ? `stagger-${Math.min(index + 1, 6)}` : '';

  const copyRecipe = () => {
    const text = `${recipe.name}\n\nIngredients:\n${recipe.ingredients.map((i) => `• ${i.amount} ${i.item}`).join('\n')}\n\nInstructions:\n${recipe.instructions.map((s, i) => `${i + 1}. ${s}`).join('\n')}`;
    navigator.clipboard.writeText(text).then(() => {
      showToast(`${recipe.name} copied to clipboard`, 'success');
    }).catch(() => {
      showToast('Could not copy to clipboard', 'error');
    });
  };

  return (
    <div
      className={`glass-card overflow-hidden animate-fadeUp ${staggerClass}`}
      style={staggerClass ? { opacity: 0 } : undefined}
    >
      {/* Card Header */}
      <div className="p-4">
        <div className="flex items-start justify-between gap-2 mb-2">
          <div className="flex-1 min-w-0">
            <h4 className="text-lg font-bold text-white leading-tight">{recipe.name}</h4>
            <p className="text-[11px] text-slate-400 italic mt-0.5">{recipe.tagline}</p>
          </div>
          {getCategoryIcon(recipe.category)}
        </div>

        {/* Badges Row */}
        <div className="flex items-center gap-2 flex-wrap mt-3 mb-3">
          <span className={`text-[10px] px-2 py-0.5 rounded-full border font-medium ${getCategoryColor(recipe.category)}`}>
            {getCategoryLabel(recipe.category)}
          </span>
          <span className="flex items-center gap-1 text-[10px] text-slate-500">
            <ClockIcon className="w-3 h-3" /> {recipe.prepTime}
          </span>
          <span className="flex items-center gap-1 text-[10px] text-slate-500">
            <ChefHatIcon className="w-3 h-3" /> {recipe.difficulty}
          </span>
          <span className="flex items-center gap-1 text-[10px] text-slate-500">
            <FlameIcon className="w-3 h-3" /> {recipe.calories} cal
          </span>
          <span className="text-[10px] text-slate-500">{recipe.servings} serving{recipe.servings !== 1 ? 's' : ''}</span>
        </div>

        {/* Best Time */}
        <div className="rounded-xl bg-white/[0.03] p-2.5 mb-3">
          <p className="text-[10px] text-slate-500 mb-0.5">Best Time</p>
          <p className="text-[11px] text-sky-400 font-medium flex items-center gap-1.5">
            <TimerIcon className="w-3 h-3" /> {recipe.bestTime}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={copyRecipe}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-medium bg-white/[0.03] text-slate-400 border border-white/[0.06] hover:bg-white/[0.06] hover:text-slate-300 active:scale-[0.99] transition-all"
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect width="14" height="14" x="8" y="8" rx="2" ry="2" /><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
            </svg>
            Copy
          </button>
          <button
            onClick={() => {
              setExpanded(!expanded);
              if (!expanded) {
                setIngredientsExpanded(true);
                setInstructionsExpanded(true);
              }
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-medium bg-white/[0.03] text-slate-400 border border-white/[0.06] hover:bg-white/[0.06] hover:text-slate-300 active:scale-[0.99] transition-all"
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
            </svg>
            {expanded ? 'Collapse' : 'Full Recipe'}
          </button>
        </div>
      </div>

      {/* Expandable Details */}
      <button
        onClick={() => {
          setExpanded(!expanded);
          if (!expanded) {
            setIngredientsExpanded(true);
            setInstructionsExpanded(true);
          }
        }}
        className="w-full flex items-center justify-center gap-1.5 py-2.5 border-t border-white/[0.05] text-[10px] text-slate-500 hover:text-slate-300 hover:bg-white/[0.02] transition-all"
      >
        {expanded ? 'Less Details' : 'More Details'}
        <ChevronDownIcon className={`w-3 h-3 transition-transform ${expanded ? 'rotate-180' : ''}`} />
      </button>

      {expanded && (
        <div className="px-4 pb-4 space-y-4 border-t border-white/[0.05] pt-4">
          {/* Ingredients */}
          <div>
            <button
              onClick={() => setIngredientsExpanded(!ingredientsExpanded)}
              className="w-full flex items-center justify-between mb-2"
            >
              <SectionHeader icon={<AppleIcon className="w-3.5 h-3.5 text-emerald-400" />} title="Ingredients" />
              <ChevronDownIcon className={`w-3 h-3 text-slate-500 transition-transform ${ingredientsExpanded ? 'rotate-180' : ''}`} />
            </button>
            {ingredientsExpanded && (
              <div className="space-y-2 max-h-60 overflow-y-auto custom-scrollbar">
                {recipe.ingredients.map((ing, i) => (
                  <div key={i} className="p-2.5 rounded-xl bg-white/[0.02]">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1 min-w-0">
                        <p className="text-[11px] text-slate-300 font-medium">{ing.item}</p>
                        <p className="text-[10px] text-slate-500">{ing.amount}</p>
                      </div>
                      <LeafIcon className="w-3 h-3 text-emerald-500 flex-shrink-0 mt-0.5" />
                    </div>
                    <p className="text-[10px] text-slate-500 leading-relaxed mt-1">{ing.benefit}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Instructions */}
          <div>
            <button
              onClick={() => setInstructionsExpanded(!instructionsExpanded)}
              className="w-full flex items-center justify-between mb-2"
            >
              <SectionHeader icon={<UtensilsIcon className="w-3.5 h-3.5 text-sky-400" />} title="Instructions" />
              <ChevronDownIcon className={`w-3 h-3 text-slate-500 transition-transform ${instructionsExpanded ? 'rotate-180' : ''}`} />
            </button>
            {instructionsExpanded && (
              <div className="space-y-1.5">
                {recipe.instructions.map((step, i) => (
                  <div key={i} className="flex items-start gap-2.5 p-2 rounded-lg bg-white/[0.02]">
                    <span className="w-5 h-5 rounded-md bg-sky-500/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-[10px] font-bold text-sky-400">{i + 1}</span>
                    </span>
                    <p className="text-[11px] text-slate-400 leading-relaxed">{step}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Science Explanation */}
          <div className="glass-card-insight p-3">
            <SectionHeader icon={<LightbulbIcon className="w-3.5 h-3.5 text-purple-400" />} title="The Science" />
            <p className="text-[11px] text-slate-400 leading-relaxed">{recipe.science}</p>
          </div>

          {/* PH Notes */}
          <div className="rounded-xl bg-emerald-500/5 border border-emerald-500/10 p-3">
            <div className="flex items-center gap-1.5 mb-1.5">
              <MapPinIcon className="w-3.5 h-3.5 text-emerald-400" />
              <p className="text-[10px] font-semibold text-emerald-400 uppercase tracking-wide">Philippines Notes</p>
            </div>
            <p className="text-[11px] text-slate-400 leading-relaxed">{recipe.phNotes}</p>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Juice Recipes Tab ──────────────────────────────────────────────────────────

function JuiceRecipesTab() {
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const filteredRecipes = useMemo(() => {
    if (activeCategory === 'All') return JUICE_RECIPES;
    const catMap: Record<string, JuiceRecipe['category']> = {
      'Brain Repair': 'brain-repair',
      'Gut Heal': 'gut-heal',
      'Detox': 'detox',
      'Calm': 'calm',
      'Energy': 'energy',
      'Immunity': 'immunity',
    };
    const mapped = catMap[activeCategory];
    return mapped ? JUICE_RECIPES.filter((r) => r.category === mapped) : JUICE_RECIPES;
  }, [activeCategory]);

  return (
    <div className="space-y-4 pb-6">
      {/* Hero Card */}
      <div className="glass-card-hero p-5 animate-fadeUp" style={{ opacity: 0 }}>
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-sky-500 flex items-center justify-center shadow-lg shadow-emerald-500/15">
            <JuiceIcon className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white">Juice Recipes</h2>
            <p className="text-xs text-slate-400">Evidence-based recovery juices with local ingredients</p>
          </div>
        </div>
        <p className="text-[11px] text-slate-400 leading-relaxed mt-2">
          Each recipe is designed using locally available Philippine ingredients (palengke staples) and backed by nutritional science for substance recovery. These juices target specific recovery pathways: neurotransmitter repair, gut healing, detoxification, calm support, energy restoration, and immune rebuilding.
        </p>
      </div>

      {/* Category Filter Chips */}
      <div className="flex gap-1.5 overflow-x-auto pb-1 -mx-1 px-1 no-scrollbar animate-fadeUp stagger-1" style={{ opacity: 0 }}>
        {JUICE_CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`flex-shrink-0 px-3 py-1.5 rounded-full text-[11px] font-medium transition-all ${
              activeCategory === cat
                ? 'toggle-chip-active'
                : 'toggle-chip'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Count */}
      <div className="flex items-center justify-between animate-fadeUp stagger-2" style={{ opacity: 0 }}>
        <p className="text-[10px] text-slate-500">
          {filteredRecipes.length} recipe{filteredRecipes.length !== 1 ? 's' : ''} shown
        </p>
        {activeCategory !== 'All' && (
          <button
            onClick={() => setActiveCategory('All')}
            className="text-[10px] text-sky-400 hover:text-sky-300 transition-colors"
          >
            Show All
          </button>
        )}
      </div>

      {/* Recipe Cards Grid */}
      <div className="space-y-4">
        {filteredRecipes.map((recipe, idx) => (
          <JuiceRecipeCard key={recipe.id} recipe={recipe} index={idx} />
        ))}

        {filteredRecipes.length === 0 && (
          <div className="glass-card p-8 text-center animate-fadeUp">
            <JuiceIcon className="w-8 h-8 text-slate-600 mx-auto mb-3" />
            <p className="text-sm text-slate-500 font-medium">No recipes found</p>
            <p className="text-xs text-slate-600 mt-1">Try a different category filter</p>
          </div>
        )}
      </div>

      {/* Tip Card */}
      <div className="glass-card-insight p-4 animate-fadeUp stagger-4" style={{ opacity: 0 }}>
        <SectionHeader icon={<LightbulbIcon className="w-3.5 h-3.5 text-purple-400" />} title="Pro Tips" />
        <ul className="space-y-2">
          {[
            'Drink juices within 30 minutes of making for maximum nutrient potency',
            'Rotate recipes weekly for a diverse nutrient profile',
            'Use a blender (not a juicer) to retain beneficial fiber',
            'Buy fresh ingredients from your local palengke — cheaper and fresher',
            'Malunggay grows wild across the Philippines — it\'s free and the most nutrient-dense plant available',
          ].map((tip, i) => (
            <li key={i} className="flex items-start gap-2 text-[11px] text-slate-400 leading-relaxed">
              <span className="text-sky-400 mt-1.5 flex-shrink-0">•</span>
              {tip}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

// ─── Nutrition Protocol Card ────────────────────────────────────────────────────

function NutritionProtocolCard({ protocol, index }: { protocol: NutritionProtocol; index: number }) {
  const [expanded, setExpanded] = useState(false);
  const [mealsExpanded, setMealsExpanded] = useState(false);
  const [nutrientsExpanded, setNutrientsExpanded] = useState(false);
  const [principlesExpanded, setPrinciplesExpanded] = useState(false);
  const { showToast } = useToast();
  const staggerClass = index < 6 ? `stagger-${Math.min(index + 1, 6)}` : '';

  const copyProtocol = () => {
    const text = `${protocol.name} (${protocol.phase})\n\nPrinciples:\n${protocol.principles.map((p) => `• ${p}`).join('\n')}\n\n${protocol.hydration}\n\nPH Tips: ${protocol.phTips}`;
    navigator.clipboard.writeText(text).then(() => {
      showToast(`${protocol.name} protocol copied`, 'success');
    }).catch(() => {
      showToast('Could not copy to clipboard', 'error');
    });
  };

  return (
    <div
      className={`glass-card overflow-hidden animate-fadeUp ${staggerClass}`}
      style={staggerClass ? { opacity: 0 } : undefined}
    >
      {/* Card Header */}
      <div className="p-4">
        <div className="flex items-start justify-between gap-2 mb-2">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-sky-500/15 text-sky-400 border border-sky-500/20 font-bold">
                {protocol.phase}
              </span>
            </div>
            <h4 className="text-lg font-bold text-white leading-tight">{protocol.name}</h4>
          </div>
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-sky-500 to-purple-500 flex items-center justify-center shadow-lg flex-shrink-0">
            <ClipboardIcon className="w-5 h-5 text-white" />
          </div>
        </div>

        <p className="text-[11px] text-slate-400 leading-relaxed mt-2">{protocol.description}</p>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 mt-3">
          <button
            onClick={copyProtocol}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-medium bg-white/[0.03] text-slate-400 border border-white/[0.06] hover:bg-white/[0.06] hover:text-slate-300 active:scale-[0.99] transition-all"
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect width="14" height="14" x="8" y="8" rx="2" ry="2" /><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
            </svg>
            Copy Protocol
          </button>
        </div>
      </div>

      {/* Expand/Collapse */}
      <button
        onClick={() => {
          setExpanded(!expanded);
          if (!expanded) {
            setMealsExpanded(true);
            setNutrientsExpanded(true);
            setPrinciplesExpanded(true);
          }
        }}
        className="w-full flex items-center justify-center gap-1.5 py-2.5 border-t border-white/[0.05] text-[10px] text-slate-500 hover:text-slate-300 hover:bg-white/[0.02] transition-all"
      >
        {expanded ? 'Collapse' : 'View Full Protocol'}
        <ChevronDownIcon className={`w-3 h-3 transition-transform ${expanded ? 'rotate-180' : ''}`} />
      </button>

      {expanded && (
        <div className="px-4 pb-4 space-y-4 border-t border-white/[0.05] pt-4">
          {/* Core Principles */}
          <div>
            <button
              onClick={() => setPrinciplesExpanded(!principlesExpanded)}
              className="w-full flex items-center justify-between mb-2"
            >
              <SectionHeader icon={<TargetIcon className="w-3.5 h-3.5 text-amber-400" />} title="Core Principles" />
              <ChevronDownIcon className={`w-3 h-3 text-slate-500 transition-transform ${principlesExpanded ? 'rotate-180' : ''}`} />
            </button>
            {principlesExpanded && (
              <div className="space-y-1.5 max-h-64 overflow-y-auto custom-scrollbar">
                {protocol.principles.map((principle, i) => (
                  <div key={i} className="flex items-start gap-2.5 p-2 rounded-lg bg-white/[0.02]">
                    <span className="w-5 h-5 rounded-md bg-amber-500/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-[10px] font-bold text-amber-400">{i + 1}</span>
                    </span>
                    <p className="text-[11px] text-slate-400 leading-relaxed">{principle}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Meal Structure */}
          <div>
            <button
              onClick={() => setMealsExpanded(!mealsExpanded)}
              className="w-full flex items-center justify-between mb-2"
            >
              <SectionHeader icon={<UtensilsIcon className="w-3.5 h-3.5 text-emerald-400" />} title="Meal Structure" />
              <ChevronDownIcon className={`w-3 h-3 text-slate-500 transition-transform ${mealsExpanded ? 'rotate-180' : ''}`} />
            </button>
            {mealsExpanded && (
              <div className="space-y-3 max-h-[500px] overflow-y-auto custom-scrollbar">
                {protocol.mealStructure.map((meal, i) => (
                  <div key={i} className="rounded-xl bg-white/[0.02] border border-white/[0.05] p-3">
                    <div className="flex items-center justify-between mb-1.5">
                      <h5 className="text-xs font-bold text-white">{meal.meal}</h5>
                      <span className="text-[10px] text-sky-400 font-medium flex items-center gap-1">
                        <ClockIcon className="w-3 h-3" /> {meal.timing}
                      </span>
                    </div>

                    {/* Foods */}
                    <div className="mb-2">
                      <p className="text-[10px] font-semibold text-emerald-400 mb-1 flex items-center gap-1">
                        <CheckCircleIcon className="w-3 h-3" /> EAT
                      </p>
                      <div className="space-y-1">
                        {meal.foods.map((food, fi) => (
                          <div key={fi} className="flex items-start gap-1.5">
                            <span className="w-1 h-1 rounded-full bg-emerald-500 flex-shrink-0 mt-1.5" />
                            <p className="text-[11px] text-slate-400 leading-relaxed">{food}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Avoid */}
                    {meal.avoid.length > 0 && (
                      <div>
                        <p className="text-[10px] font-semibold text-red-400 mb-1 flex items-center gap-1">
                          <XCircleIcon className="w-3 h-3" /> AVOID
                        </p>
                        <div className="flex flex-wrap gap-1.5">
                          {meal.avoid.map((item, ai) => (
                            <span key={ai} className="text-[10px] px-2 py-0.5 rounded-md bg-red-500/10 text-red-400/80 border border-red-500/15">
                              {item}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Key Nutrients */}
          <div>
            <button
              onClick={() => setNutrientsExpanded(!nutrientsExpanded)}
              className="w-full flex items-center justify-between mb-2"
            >
              <SectionHeader icon={<BeakerIcon className="w-3.5 h-3.5 text-purple-400" />} title="Key Nutrients" />
              <ChevronDownIcon className={`w-3 h-3 text-slate-500 transition-transform ${nutrientsExpanded ? 'rotate-180' : ''}`} />
            </button>
            {nutrientsExpanded && (
              <div className="space-y-2 max-h-64 overflow-y-auto custom-scrollbar">
                {protocol.keyNutrients.map((kn, i) => (
                  <div key={i} className="p-2.5 rounded-xl bg-white/[0.02]">
                    <p className="text-[11px] text-sky-400 font-medium mb-0.5">{kn.nutrient}</p>
                    <p className="text-[10px] text-slate-400 leading-relaxed mb-1">{kn.why}</p>
                    <p className="text-[10px] text-slate-500">
                      <span className="font-semibold text-slate-400">Sources:</span> {kn.sources}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Hydration */}
          <div className="rounded-xl bg-sky-500/5 border border-sky-500/10 p-3">
            <SectionHeader icon={<DropletIcon className="w-3.5 h-3.5 text-sky-400" />} title="Hydration" />
            <p className="text-[11px] text-slate-400 leading-relaxed">{protocol.hydration}</p>
          </div>

          {/* PH Tips */}
          <div className="rounded-xl bg-emerald-500/5 border border-emerald-500/10 p-3">
            <div className="flex items-center gap-1.5 mb-1.5">
              <MapPinIcon className="w-3.5 h-3.5 text-emerald-400" />
              <p className="text-[10px] font-semibold text-emerald-400 uppercase tracking-wide">Philippines Tips</p>
            </div>
            <p className="text-[11px] text-slate-400 leading-relaxed">{protocol.phTips}</p>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Nutrition Protocols Tab ────────────────────────────────────────────────────

function NutritionProtocolsTab() {
  return (
    <div className="space-y-4 pb-6">
      {/* Hero Card */}
      <div className="glass-card-hero p-5 animate-fadeUp" style={{ opacity: 0 }}>
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-lg shadow-purple-500/15">
            <ClipboardIcon className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white">Nutrition Protocols</h2>
            <p className="text-xs text-slate-400">Phase-based meal plans for recovery</p>
          </div>
        </div>
        <p className="text-[11px] text-slate-400 leading-relaxed mt-2">
          Recovery nutrition changes with each phase. These evidence-based protocols adapt your food strategy as your body heals — from gentle refeeding during acute withdrawal to comprehensive nutritional rehabilitation in early recovery. Each protocol includes meal timing, specific food recommendations, and Philippine-specific tips.
        </p>
      </div>

      {/* Protocol Cards */}
      <div className="space-y-4">
        {NUTRITION_PROTOCOLS.map((protocol, idx) => (
          <NutritionProtocolCard key={protocol.id} protocol={protocol} index={idx} />
        ))}
      </div>

      {/* Disclaimer */}
      <div className="glass-card p-3 animate-fadeUp stagger-3" style={{ opacity: 0 }}>
        <p className="text-[10px] text-slate-500 leading-relaxed">
          <strong className="text-slate-400">Disclaimer:</strong> These nutrition protocols provide general guidance and are not medical advice. Nutritional needs vary by individual. Always consult a healthcare provider or registered dietitian for personalized nutrition plans during recovery.
        </p>
      </div>
    </div>
  );
}

// ─── Nutrient Guide Card ────────────────────────────────────────────────────────

function NutrientGuideCard({ guide, index }: { guide: NutrientGuide; index: number }) {
  const [expanded, setExpanded] = useState(false);
  const [symptomsExpanded, setSymptomsExpanded] = useState(false);
  const [sourcesExpanded, setSourcesExpanded] = useState(false);
  const [phSourcesExpanded, setPhSourcesExpanded] = useState(false);
  const staggerClass = index < 6 ? `stagger-${Math.min(index + 1, 6)}` : '';

  const getCategoryGradient = (cat: NutrientGuide['category']) => {
    switch (cat) {
      case 'vitamin': return 'from-purple-500 to-violet-500';
      case 'mineral': return 'from-amber-500 to-orange-500';
      case 'amino-acid': return 'from-sky-500 to-blue-500';
      case 'fatty-acid': return 'from-emerald-500 to-teal-500';
      case 'antioxidant': return 'from-rose-500 to-pink-500';
      case 'phytonutrient': return 'from-teal-500 to-cyan-500';
      default: return 'from-slate-500 to-slate-400';
    }
  };

  const getCategoryDotColor = (cat: NutrientGuide['category']) => {
    switch (cat) {
      case 'vitamin': return 'bg-purple-400';
      case 'mineral': return 'bg-amber-400';
      case 'amino-acid': return 'bg-sky-400';
      case 'fatty-acid': return 'bg-emerald-400';
      case 'antioxidant': return 'bg-rose-400';
      case 'phytonutrient': return 'bg-teal-400';
      default: return 'bg-slate-400';
    }
  };

  return (
    <div
      className={`glass-card overflow-hidden animate-fadeUp ${staggerClass}`}
      style={staggerClass ? { opacity: 0 } : undefined}
    >
      {/* Card Header */}
      <div className="p-4">
        <div className="flex items-start justify-between gap-2 mb-2">
          <div className="flex-1 min-w-0">
            <h4 className="text-lg font-bold text-white leading-tight">{guide.name}</h4>
            <div className="flex items-center gap-2 mt-1.5">
              <span className={`text-[10px] px-2 py-0.5 rounded-full border font-medium ${getNutrientCategoryColor(guide.category)}`}>
                {getNutrientCategoryLabel(guide.category)}
              </span>
              <span className="flex items-center gap-1 text-[10px] text-slate-500">
                <TargetIcon className="w-3 h-3" /> {guide.dailyTarget}
              </span>
            </div>
          </div>
          <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${getCategoryGradient(guide.category)} flex items-center justify-center shadow-lg flex-shrink-0`}>
            <BeakerIcon className="w-5 h-5 text-white" />
          </div>
        </div>

        {/* Role */}
        <div className="mt-3 rounded-xl bg-white/[0.03] p-2.5 mb-3">
          <p className="text-[10px] font-semibold text-slate-400 mb-0.5">Role</p>
          <p className="text-[11px] text-slate-300 leading-relaxed">{guide.role}</p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 gap-2 mb-3">
          <div className="rounded-lg bg-white/[0.03] p-2">
            <p className="text-[10px] font-semibold text-slate-500 mb-0.5 flex items-center gap-1">
              <TimerIcon className="w-3 h-3" /> Timing
            </p>
            <p className="text-[11px] text-slate-300 leading-relaxed">{guide.timing}</p>
          </div>
          <div className="rounded-lg bg-white/[0.03] p-2">
            <p className="text-[10px] font-semibold text-slate-500 mb-0.5 flex items-center gap-1">
              <TargetIcon className="w-3 h-3" /> Daily Target
            </p>
            <p className="text-[11px] text-slate-300 leading-relaxed">{guide.dailyTarget}</p>
          </div>
        </div>
      </div>

      {/* Expand/Collapse */}
      <button
        onClick={() => {
          setExpanded(!expanded);
          if (!expanded) {
            setSymptomsExpanded(true);
            setSourcesExpanded(true);
            setPhSourcesExpanded(true);
          }
        }}
        className="w-full flex items-center justify-center gap-1.5 py-2.5 border-t border-white/[0.05] text-[10px] text-slate-500 hover:text-slate-300 hover:bg-white/[0.02] transition-all"
      >
        {expanded ? 'Collapse' : 'Full Details'}
        <ChevronDownIcon className={`w-3 h-3 transition-transform ${expanded ? 'rotate-180' : ''}`} />
      </button>

      {expanded && (
        <div className="px-4 pb-4 space-y-4 border-t border-white/[0.05] pt-4">
          {/* Recovery Importance */}
          <div className="glass-card-insight p-3">
            <SectionHeader icon={<InfoIcon className="w-3.5 h-3.5 text-sky-400" />} title="Recovery Importance" />
            <p className="text-[11px] text-slate-400 leading-relaxed">{guide.recoveryImportance}</p>
          </div>

          {/* Deficiency Symptoms */}
          <div>
            <button
              onClick={() => setSymptomsExpanded(!symptomsExpanded)}
              className="w-full flex items-center justify-between mb-2"
            >
              <SectionHeader icon={<AlertTriangleIcon className="w-3.5 h-3.5 text-amber-400" />} title="Deficiency Symptoms" />
              <ChevronDownIcon className={`w-3 h-3 text-slate-500 transition-transform ${symptomsExpanded ? 'rotate-180' : ''}`} />
            </button>
            {symptomsExpanded && (
              <div className="flex flex-wrap gap-1.5">
                {guide.deficiencySymptoms.map((symptom, i) => (
                  <span key={i} className="text-[10px] px-2 py-1 rounded-lg bg-amber-500/8 text-amber-400/90 border border-amber-500/15">
                    {symptom}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Food Sources */}
          <div>
            <button
              onClick={() => setSourcesExpanded(!sourcesExpanded)}
              className="w-full flex items-center justify-between mb-2"
            >
              <SectionHeader icon={<AppleIcon className="w-3.5 h-3.5 text-emerald-400" />} title="General Food Sources" />
              <ChevronDownIcon className={`w-3 h-3 text-slate-500 transition-transform ${sourcesExpanded ? 'rotate-180' : ''}`} />
            </button>
            {sourcesExpanded && (
              <div className="space-y-1 max-h-48 overflow-y-auto custom-scrollbar">
                {guide.foodSources.map((source, i) => (
                  <div key={i} className="flex items-center gap-2 p-2 rounded-lg bg-white/[0.02]">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 flex-shrink-0" />
                    <p className="text-[11px] text-slate-400">{source}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* PH Sources */}
          <div>
            <button
              onClick={() => setPhSourcesExpanded(!phSourcesExpanded)}
              className="w-full flex items-center justify-between mb-2"
            >
              <SectionHeader icon={<MapPinIcon className="w-3.5 h-3.5 text-pink-400" />} title="Philippine Sources" />
              <ChevronDownIcon className={`w-3 h-3 text-slate-500 transition-transform ${phSourcesExpanded ? 'rotate-180' : ''}`} />
            </button>
            {phSourcesExpanded && (
              <div className="space-y-1 max-h-48 overflow-y-auto custom-scrollbar">
                {guide.phSources.map((source, i) => (
                  <div key={i} className="flex items-center gap-2 p-2 rounded-lg bg-emerald-500/5 border border-emerald-500/10">
                    <span className={`w-1.5 h-1.5 rounded-full ${getCategoryDotColor(guide.category)} flex-shrink-0`} />
                    <p className="text-[11px] text-slate-300">{source}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Cautions */}
          <div className="rounded-xl bg-amber-500/5 border border-amber-500/10 p-3">
            <SectionHeader icon={<AlertTriangleIcon className="w-3.5 h-3.5 text-amber-400" />} title="Cautions" />
            <p className="text-[11px] text-slate-400 leading-relaxed">{guide.cautions}</p>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Nutrient Guides Tab ────────────────────────────────────────────────────────

function NutrientGuidesTab() {
  return (
    <div className="space-y-4 pb-6">
      {/* Hero Card */}
      <div className="glass-card-hero p-5 animate-fadeUp" style={{ opacity: 0 }}>
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-rose-500 flex items-center justify-center shadow-lg shadow-amber-500/15">
            <BookIcon className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white">Nutrient Guides</h2>
            <p className="text-xs text-slate-400">Essential nutrients for brain recovery</p>
          </div>
        </div>
        <p className="text-[11px] text-slate-400 leading-relaxed mt-2">
          Each guide covers a critical nutrient for recovery: its role in brain chemistry, deficiency symptoms, food sources (both general and Philippine-specific), daily targets, optimal timing, and important cautions. Understanding these nutrients helps you make strategic food choices that accelerate healing.
        </p>
      </div>

      {/* Nutrient Cards */}
      <div className="space-y-4">
        {NUTRIENT_GUIDES.map((guide, idx) => (
          <NutrientGuideCard key={guide.id} guide={guide} index={idx} />
        ))}
      </div>

      {/* Key Insight */}
      <div className="glass-card-insight p-4 animate-fadeUp stagger-5" style={{ opacity: 0 }}>
        <SectionHeader icon={<LightbulbIcon className="w-3.5 h-3.5 text-purple-400" />} title="Key Insight" />
        <p className="text-[11px] text-slate-400 leading-relaxed">
          The five nutrients above are the most critical for recovery. However, no single nutrient works alone — they function as cofactor networks. For example, L-Tyrosine (dopamine precursor) requires Vitamin C and B6 as cofactors. Magnesium is needed for both dopamine AND serotonin synthesis. This is why a whole-food approach is more effective than isolated supplementation.
        </p>
      </div>

      {/* Disclaimer */}
      <div className="glass-card p-3 animate-fadeUp stagger-6" style={{ opacity: 0 }}>
        <p className="text-[10px] text-slate-500 leading-relaxed">
          <strong className="text-slate-400">Disclaimer:</strong> Nutrient information is for educational purposes and is not medical advice. Supplement dosages and interactions should be discussed with a healthcare provider, especially if you are taking medications.
        </p>
      </div>
    </div>
  );
}

// ─── Main Component ─────────────────────────────────────────────────────────────

export default function NutritionJuices() {
  const [activeTab, setActiveTab] = useState<SubTab>('juice-recipes');

  return (
    <div className="space-y-4 pb-6 bg-[#0a0f1a] min-h-screen">
      {/* Header */}
      <div className="animate-fadeUp">
        <h2 className="text-lg font-bold text-white">Nutrition & Juices</h2>
        <p className="text-[11px] text-slate-400 mt-0.5">Evidence-based nutrition for substance recovery</p>
      </div>

      {/* Sub-Tab Navigation */}
      <div className="animate-fadeUp stagger-1" style={{ opacity: 0 }}>
        <SubTabNav active={activeTab} onChange={setActiveTab} />
      </div>

      {/* Tab Content */}
      <div key={activeTab}>
        {activeTab === 'juice-recipes' && <JuiceRecipesTab />}
        {activeTab === 'nutrition-protocols' && <NutritionProtocolsTab />}
        {activeTab === 'nutrient-guides' && <NutrientGuidesTab />}
      </div>
    </div>
  );
}
