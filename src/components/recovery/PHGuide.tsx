'use client';

import React, { useState } from 'react';
import { EMERGENCY_HOTLINES } from '@/lib/recovery-constants';

type SubTab = 'programs' | 'hotlines' | 'support' | 'legal' | 'why';

const GOV_PROGRAMS = [
  {
    name: 'PDEA (Philippine Drug Enforcement Agency)',
    description: 'Government agency handling drug enforcement. Offers rehabilitation referrals and community-based programs through their "Balay Silangan" reformatory centers.',
    contact: '(02) 8832-7777',
    location: 'Nationwide',
    type: 'government' as const,
  },
  {
    name: 'DOH Treatment and Rehabilitation Centers',
    description: 'Department of Health operates 16 residential treatment and rehabilitation centers nationwide. Services include detoxification, counseling, aftercare, and vocational training. Subsidized rates available.',
    contact: '(02) 8742-6401',
    location: 'Nationwide (16 centers)',
    type: 'government' as const,
  },
  {
    name: 'DSWD Residential Care Facilities',
    description: 'Department of Social Welfare and Development provides community-based and residential programs for recovering individuals, including livelihood assistance and reintegration support.',
    contact: '911 (DSWD Hotline)',
    location: 'Nationwide',
    type: 'government' as const,
  },
  {
    name: 'Dangerous Drugs Board (DDB)',
    description: 'Policy-making body for drug prevention and control. Coordinates rehabilitation efforts and accredited treatment programs nationwide.',
    contact: '(02) 8928-7618',
    location: 'National — Makati City',
    type: 'government' as const,
  },
];

const PRIVATE_REHAB = [
  {
    name: 'Pasig City Rehabilitation Center',
    description: 'Government-accredited private facility. 6-month residential program with individual and group therapy, vocational training, and family counseling.',
    contact: '(02) 8643-1043',
    location: 'Pasig City, Metro Manila',
    priceRange: '\u20B130,000-80,000/month',
  },
  {
    name: 'New Beginnings Wellness Foundation',
    description: 'Faith-based recovery program offering 3-6 month residential treatment. Integrates spiritual recovery with clinical therapy and life skills development.',
    contact: '(02) 8723-8341',
    location: 'Antipolo City, Rizal',
    priceRange: '\u20B125,000-50,000/month',
  },
  {
    name: 'ZOE Transitional House',
    description: 'Aftercare facility for graduates of rehab programs. Provides structured reintegration with employment support, sober living, and continued counseling.',
    contact: '(02) 8956-1234',
    location: 'Quezon City, Metro Manila',
    priceRange: '\u20B115,000-30,000/month',
  },
  {
    name: 'Bukas Palad Recovery Center',
    description: 'CBO-accredited center specializing in youth recovery. Provides counseling, family therapy, educational support, and recreational activities.',
    contact: '(02) 927-4261',
    location: 'Cebu City',
    priceRange: '\u20B120,000-40,000/month',
  },
];

const COMMUNITY_PROGRAMS = [
  {
    name: 'Narcotics Anonymous Philippines',
    description: 'Free peer-support fellowship following the 12-step model. Multiple meetings weekly in Metro Manila, Cebu, Davao, and other cities. Open to anyone with a desire to stop using.',
    contact: 'naphilippines.org',
    access: 'Online + In-person meetings',
  },
  {
    name: 'SMART Recovery Philippines',
    description: 'Science-based alternative to 12-step programs. Uses Cognitive Behavioral Therapy (CBT) and motivational interviewing techniques. Free meetings.',
    contact: 'smartrecovery.org',
    access: 'Online meetings available',
  },
  {
    name: 'Alcoholics Anonymous Philippines',
    description: '12-step fellowship for alcohol problems (also welcomes those with drug issues). Multiple daily meetings across the Philippines.',
    contact: 'aaphilippines.org',
    access: 'Online + In-person meetings',
  },
  {
    name: 'Kalahi Foundation',
    description: 'Non-profit providing drug rehabilitation referrals, family counseling, and community education programs. Based in Metro Manila with outreach programs nationwide.',
    contact: '(02) 928-3911',
    access: 'Walk-in + referral',
  },
];

const ONLINE_SUPPORT = [
  {
    name: 'Recovery Peer Support Chat',
    description: '24/7 anonymous online chat with trained peer supporters who understand the recovery journey. Free and confidential.',
    access: 'Online chat platform',
    availability: '24/7',
  },
  {
    name: 'RecoveryPH Facebook Community',
    description: 'Active Filipino recovery community on Facebook with thousands of members. Daily check-ins, recovery milestones, and peer support.',
    access: 'Facebook Group \u2014 search "RecoveryPH"',
    availability: '24/7',
  },
  {
    name: 'Substance Use Recovery PH (Reddit)',
    description: 'Reddit community for Filipinos in recovery. Open discussions, resource sharing, and anonymous support.',
    access: 'r/RecoveryPH on Reddit',
    availability: '24/7',
  },
];

const FAITH_BASED = [
  {
    name: 'Joy of the Lord Christian Recovery',
    description: 'Christian-based recovery program combining spiritual discipleship with practical life skills training. Open to all denominations.',
    contact: '(02) 8432-0987',
    location: 'Makati City',
    access: 'Walk-in welcome',
  },
  {
    name: 'Muslim Recovery Network',
    description: 'Islamic-centered recovery support incorporating spiritual practices alongside evidence-based approaches. Available in major cities.',
    contact: '(02) 8567-2345',
    location: 'Metro Manila, Davao, Cotabato',
    access: 'Referral + walk-in',
  },
];

const ADDITIONAL_HOTLINES = [
  { name: 'PDEA Hotline', number: '(02) 8832-7777', description: 'Drug enforcement and rehabilitation referrals' },
  { name: 'NAPOLCOM', number: '(02) 8424-7505', description: 'Police assistance and community safety' },
  { name: 'Local LGU Hotline', number: '8888', description: 'Citizen complaints and government services hotline' },
];

const LEGAL_INFO = [
  {
    title: 'Republic Act No. 9165 (Comprehensive Dangerous Drugs Act of 2002)',
    content: 'The primary law governing dangerous drugs in the Philippines. Defines prohibited and regulated drugs, establishes penalties for possession, sale, manufacture, and use of dangerous drugs. Creates the PDEA as the lead enforcement agency and the DDB as the policy-making body.',
  },
  {
    title: 'Voluntary Surrender Program',
    content: 'Under Section 54 of RA 9165, persons who voluntarily surrender to the PDEA, DOH-accredited rehabilitation center, or proper authorities and submit to examination and treatment shall be exempt from criminal prosecution. This provision is designed to encourage users to seek help without fear of imprisonment.',
  },
  {
    title: 'Confidentiality of Records',
    content: 'Section 55 of RA 9165 mandates that records of persons undergoing treatment or rehabilitation shall be kept strictly confidential. Unauthorized disclosure is punishable by imprisonment of 6 months and 1 day to 2 years and a fine of \u20B110,000 to \u20B150,000. This protects your employment prospects and social standing.',
  },
  {
    title: 'Community Service as Alternative',
    content: 'First-time minor offenders may qualify for community service instead of imprisonment under Section 59 of RA 9165. The court may order rehabilitation and community service in lieu of criminal penalties, especially for users (not traffickers) who show genuine commitment to recovery.',
  },
  {
    title: 'Rights of Persons in Recovery',
    content: 'Persons with substance use disorder have the right to: (1) Confidential treatment, (2) Non-discrimination in employment, (3) Access to government rehabilitation services, (4) Voluntary treatment and informed consent, (5) Humane treatment and dignified care, (6) Aftercare and reintegration support.',
  },
  {
    title: 'How to Access Legal Aid',
    content: "Free legal assistance is available through: (1) PAO (Public Attorney's Office) for indigent clients, (2) IBP (Integrated Bar of the Philippines) legal aid chapters, (3) UP Law Center's Legal Aid Clinic, (4) DSWD social workers for family-related legal issues, (5) Human rights organizations (FLAG, Karapatan). Contact the nearest regional trial court for referral to pro bono services.",
  },
];

export default function PHGuide() {
  const [activeTab, setActiveTab] = useState<SubTab>('programs');
  const [expandedLegal, setExpandedLegal] = useState<string | null>(null);

  const tabs: { key: SubTab; label: string; icon: React.ReactNode }[] = [
    {
      key: 'programs',
      label: 'Programs',
      icon: (
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" />
        </svg>
      ),
    },
    {
      key: 'hotlines',
      label: 'Hotlines',
      icon: (
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72" />
        </svg>
      ),
    },
    {
      key: 'support',
      label: 'Support',
      icon: (
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      ),
    },
    {
      key: 'legal',
      label: 'Legal',
      icon: (
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        </svg>
      ),
    },
    {
      key: 'why',
      label: 'Why This App',
      icon: (
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
          <path d="M12 17h.01" />
        </svg>
      ),
    },
  ];

  return (
    <div className="space-y-4 pb-6">
      {/* Header with PH flag colors */}
      <div className="animate-fadeUp relative overflow-hidden rounded-2xl border border-white/8" style={{ background: 'linear-gradient(135deg, rgba(0,56,168,0.15) 0%, rgba(17,24,39,0.95) 20%, rgba(17,24,39,0.95) 80%, rgba(206,17,38,0.15) 100%)' }}>
        <div className="absolute top-0 left-0 w-1 h-full bg-sky-700 rounded-l-2xl" />
        <div className="absolute top-0 right-0 w-1 h-full bg-red-600 rounded-r-2xl" />
        <div className="absolute -top-16 -right-16 w-40 h-40 rounded-full bg-sky-500/5 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-12 -left-12 w-32 h-32 rounded-full bg-red-500/5 blur-3xl pointer-events-none" />
        <div className="relative p-5">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center shadow-lg" style={{ background: 'linear-gradient(135deg, #0038A8, #CE1126)' }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" /><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
              </svg>
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">Philippines Recovery Guide</h1>
              <p className="text-xs text-slate-400">Local resources and support for your journey</p>
            </div>
          </div>
          <p className="text-xs text-slate-500 leading-relaxed">
            Find government programs, rehab centers, hotlines, support groups, and legal protections available in the Philippines.
          </p>
        </div>
      </div>

      {/* Sub-navigation Tabs */}
      <div className="glass-card p-1.5 flex animate-fadeUp stagger-1" style={{ opacity: 0 }}>
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`flex-1 py-2.5 rounded-xl text-xs font-medium transition-all flex items-center justify-center gap-1.5 ${
              activeTab === tab.key
                ? 'bg-sky-500/15 text-sky-400 border border-sky-500/20 shadow-sm shadow-sky-500/10'
                : 'text-slate-400 hover:text-slate-300'
            }`}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </div>

      {/* Programs Tab */}
      {activeTab === 'programs' && (
        <div className="space-y-5 animate-fadeUp">
          {/* Government Programs */}
          <div>
            <div className="flex items-center gap-2 mb-3 px-1">
              <div className="w-7 h-7 rounded-lg bg-sky-500/15 flex items-center justify-center">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#0ea5e9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 21h18M3 7v1a3 3 0 0 0 6 0V7m0 1a3 3 0 0 0 6 0V7m0 1a3 3 0 0 0 6 0V7H3l2-4h14l2 4M5 21V10.87M19 21V10.87" />
                </svg>
              </div>
              <h3 className="text-sm font-bold text-slate-300">Government Programs</h3>
            </div>
            <div className="space-y-2">
              {GOV_PROGRAMS.map((program, i) => (
                <div key={i} className="glass-card p-4 animate-fadeUp stagger-2" style={{ opacity: 0, animationDelay: `${i * 0.05}s` }}>
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-sky-500/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0ea5e9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                      </svg>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-semibold text-white mb-1">{program.name}</h4>
                      <p className="text-xs text-slate-400 leading-relaxed mb-2">{program.description}</p>
                      <div className="flex flex-wrap gap-2">
                        <span className="inline-flex items-center gap-1 text-[11px] px-2 py-0.5 rounded-full bg-sky-500/10 text-sky-400 border border-sky-500/15">
                          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72" />
                          </svg>
                          {program.contact}
                        </span>
                        <span className="inline-flex items-center gap-1 text-[11px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/15">
                          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" />
                          </svg>
                          {program.location}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Private Rehab Centers */}
          <div>
            <div className="flex items-center gap-2 mb-3 px-1">
              <div className="w-7 h-7 rounded-lg bg-emerald-500/15 flex items-center justify-center">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
                </svg>
              </div>
              <h3 className="text-sm font-bold text-slate-300">Private Rehab Centers</h3>
            </div>
            <div className="space-y-2">
              {PRIVATE_REHAB.map((center, i) => (
                <div key={i} className="glass-card p-4 animate-fadeUp" style={{ opacity: 0, animationDelay: `${(i + 4) * 0.05}s` }}>
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                      </svg>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-semibold text-white mb-1">{center.name}</h4>
                      <p className="text-xs text-slate-400 leading-relaxed mb-2">{center.description}</p>
                      <div className="flex flex-wrap gap-2">
                        <a
                          href={`tel:${center.contact.replace(/\D/g, '')}`}
                          className="inline-flex items-center gap-1 text-[11px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/15 hover:bg-emerald-500/20 transition-colors"
                        >
                          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72" />
                          </svg>
                          {center.contact}
                        </a>
                        <span className="inline-flex items-center gap-1 text-[11px] px-2 py-0.5 rounded-full bg-purple-500/10 text-purple-400 border border-purple-500/15">
                          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" />
                          </svg>
                          {center.location}
                        </span>
                        <span className="inline-flex items-center gap-1 text-[11px] px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/15">
                          {center.priceRange}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Community-Based Programs */}
          <div>
            <div className="flex items-center gap-2 mb-3 px-1">
              <div className="w-7 h-7 rounded-lg bg-amber-500/15 flex items-center justify-center">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
              </div>
              <h3 className="text-sm font-bold text-slate-300">Community-Based Programs</h3>
            </div>
            <div className="space-y-2">
              {COMMUNITY_PROGRAMS.map((program, i) => (
                <div key={i} className="glass-card p-4 animate-fadeUp" style={{ opacity: 0, animationDelay: `${(i + 8) * 0.05}s` }}>
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-amber-500/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10" /><path d="M8 14s1.5 2 4 2 4-2 4-2" /><line x1="9" y1="9" x2="9.01" y2="9" /><line x1="15" y1="9" x2="15.01" y2="9" />
                      </svg>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-semibold text-white mb-1">{program.name}</h4>
                      <p className="text-xs text-slate-400 leading-relaxed mb-2">{program.description}</p>
                      <div className="flex flex-wrap gap-2">
                        <span className="inline-flex items-center gap-1 text-[11px] px-2 py-0.5 rounded-full bg-sky-500/10 text-sky-400 border border-sky-500/15">
                          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="12" cy="12" r="10" /><path d="M2 12h20" /><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                          </svg>
                          {program.contact}
                        </span>
                        <span className="inline-flex items-center gap-1 text-[11px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/15">
                          {program.access}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Hotlines Tab */}
      {activeTab === 'hotlines' && (
        <div className="space-y-5 animate-fadeUp">
          {/* Emergency section */}
          <div>
            <div className="flex items-center gap-2 mb-3 px-1">
              <div className="w-7 h-7 rounded-lg bg-red-500/15 flex items-center justify-center">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
                  <line x1="12" y1="9" x2="12" y2="13" /><line x1="12" y1="17" x2="12.01" y2="17" />
                </svg>
              </div>
              <h3 className="text-sm font-bold text-red-400">Emergency Hotlines</h3>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-red-500/15 text-red-400 border border-red-500/20 font-medium">TAP TO CALL</span>
            </div>
            <div className="space-y-2">
              {EMERGENCY_HOTLINES.map((hotline, i) => (
                <a
                  key={i}
                  href={`tel:${hotline.number.replace(/\D/g, '')}`}
                  className="glass-card p-4 block hover:border-red-500/20 active:scale-[0.99] transition-all animate-fadeUp"
                  style={{ opacity: 0, animationDelay: `${i * 0.05}s` }}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-red-500/10 flex items-center justify-center flex-shrink-0">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72" />
                        <path d="M14.05 2a9 9 0 0 1 8 7.94" />
                      </svg>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-semibold text-white">{hotline.name}</h4>
                      <p className="text-xs text-slate-500">{hotline.description}</p>
                    </div>
                    <div className="flex-shrink-0">
                      <span className="text-sm font-bold text-red-400">{hotline.number}</span>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Government hotlines */}
          <div>
            <div className="flex items-center gap-2 mb-3 px-1">
              <div className="w-7 h-7 rounded-lg bg-sky-500/15 flex items-center justify-center">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#0ea5e9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72" />
                </svg>
              </div>
              <h3 className="text-sm font-bold text-sky-400">Government Lines</h3>
            </div>
            <div className="space-y-2">
              {ADDITIONAL_HOTLINES.map((hotline, i) => (
                <a
                  key={i}
                  href={`tel:${hotline.number.replace(/\D/g, '')}`}
                  className="glass-card p-4 block hover:border-sky-500/20 active:scale-[0.99] transition-all animate-fadeUp"
                  style={{ opacity: 0, animationDelay: `${(i + 6) * 0.05}s` }}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-sky-500/10 flex items-center justify-center flex-shrink-0">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0ea5e9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72" />
                      </svg>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-semibold text-white">{hotline.name}</h4>
                      <p className="text-xs text-slate-500">{hotline.description}</p>
                    </div>
                    <div className="flex-shrink-0">
                      <span className="text-sm font-bold text-sky-400">{hotline.number}</span>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Support Tab */}
      {activeTab === 'support' && (
        <div className="space-y-5 animate-fadeUp">
          {/* Online Support Groups */}
          <div>
            <div className="flex items-center gap-2 mb-3 px-1">
              <div className="w-7 h-7 rounded-lg bg-purple-500/15 flex items-center justify-center">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#a855f7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" /><path d="M2 12h20" /><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                </svg>
              </div>
              <h3 className="text-sm font-bold text-purple-400">Online Support Groups</h3>
            </div>
            <div className="space-y-2">
              {ONLINE_SUPPORT.map((group, i) => (
                <div key={i} className="glass-card p-4 animate-fadeUp" style={{ opacity: 0, animationDelay: `${i * 0.05}s` }}>
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-purple-500/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#a855f7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                      </svg>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-semibold text-white mb-1">{group.name}</h4>
                      <p className="text-xs text-slate-400 leading-relaxed mb-2">{group.description}</p>
                      <div className="flex flex-wrap gap-2">
                        <span className="inline-flex items-center gap-1 text-[11px] px-2 py-0.5 rounded-full bg-purple-500/10 text-purple-400 border border-purple-500/15">
                          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="12" cy="12" r="10" /><path d="M2 12h20" />
                          </svg>
                          {group.access}
                        </span>
                        <span className="inline-flex items-center gap-1 text-[11px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/15">
                          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
                          </svg>
                          {group.availability}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Faith-Based Programs */}
          <div>
            <div className="flex items-center gap-2 mb-3 px-1">
              <div className="w-7 h-7 rounded-lg bg-amber-500/15 flex items-center justify-center">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2L2 7l10 5 10-5-10-5z" /><path d="M2 17l10 5 10-5" /><path d="M2 12l10 5 10-5" />
                </svg>
              </div>
              <h3 className="text-sm font-bold text-amber-400">Faith-Based Programs</h3>
            </div>
            <div className="space-y-2">
              {FAITH_BASED.map((program, i) => (
                <div key={i} className="glass-card p-4 animate-fadeUp" style={{ opacity: 0, animationDelay: `${(i + 3) * 0.05}s` }}>
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-amber-500/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                      </svg>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-semibold text-white mb-1">{program.name}</h4>
                      <p className="text-xs text-slate-400 leading-relaxed mb-2">{program.description}</p>
                      <div className="flex flex-wrap gap-2">
                        <a
                          href={`tel:${program.contact.replace(/\D/g, '')}`}
                          className="inline-flex items-center gap-1 text-[11px] px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/15 hover:bg-amber-500/20 transition-colors"
                        >
                          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72" />
                          </svg>
                          {program.contact}
                        </a>
                        <span className="inline-flex items-center gap-1 text-[11px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/15">
                          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" />
                          </svg>
                          {program.location}
                        </span>
                        <span className="inline-flex items-center gap-1 text-[11px] px-2 py-0.5 rounded-full bg-sky-500/10 text-sky-400 border border-sky-500/15">
                          {program.access}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Legal Tab */}
      {activeTab === 'legal' && (
        <div className="space-y-3 animate-fadeUp">
          <div className="flex items-center gap-2 mb-1 px-1">
            <div className="w-7 h-7 rounded-lg bg-sky-500/15 flex items-center justify-center">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#0ea5e9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
            </div>
            <h3 className="text-sm font-bold text-sky-400">Legal Protections & Rights</h3>
          </div>
          <p className="text-xs text-slate-500 mb-2 px-1">Tap any section to expand details</p>

          {LEGAL_INFO.map((item, i) => {
            const isExpanded = expandedLegal === item.title;
            return (
              <div
                key={i}
                className="glass-card overflow-hidden animate-fadeUp transition-all"
                style={{ opacity: 0, animationDelay: `${i * 0.05}s` }}
              >
                <button
                  onClick={() => setExpandedLegal(isExpanded ? null : item.title)}
                  className="w-full p-4 flex items-start gap-3 text-left hover:bg-white/5 transition-colors"
                >
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5 transition-colors ${isExpanded ? 'bg-sky-500/15' : 'bg-white/5'}`}>
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke={isExpanded ? '#0ea5e9' : '#64748b'}
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" />
                    </svg>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-semibold text-white leading-snug">{item.title}</h4>
                  </div>
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke={isExpanded ? '#0ea5e9' : '#475569'}
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className={`flex-shrink-0 mt-0.5 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`}
                  >
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </button>
                {isExpanded && (
                  <div className="px-4 pb-4 pl-15 animate-fadeUp" style={{ paddingLeft: '60px' }}>
                    <p className="text-xs text-slate-400 leading-relaxed">{item.content}</p>
                  </div>
                )}
              </div>
            );
          })}

          {/* Disclaimer */}
          <div className="glass-card-insight p-4 animate-fadeUp" style={{ opacity: 0, animationDelay: `${LEGAL_INFO.length * 0.05 + 0.1}s` }}>
            <div className="flex items-start gap-3">
              <div className="w-7 h-7 rounded-lg bg-amber-500/15 flex items-center justify-center flex-shrink-0 mt-0.5">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
                </svg>
              </div>
              <div>
                <p className="text-xs font-semibold text-amber-400 mb-1">Disclaimer</p>
                <p className="text-xs text-slate-500 leading-relaxed">
                  The legal information provided here is for educational purposes only and should not be considered legal advice. Laws may change over time. For specific legal concerns, consult with a licensed attorney or contact PAO (Public Attorney&apos;s Office).
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Why This App Tab */}
      {activeTab === 'why' && (
        <div className="space-y-4 animate-fadeUp">
          <div className="glass-card-hero p-5 animate-fadeUp" style={{ opacity: 0 }}>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-sky-500 to-emerald-500 flex items-center justify-center shadow-lg shadow-sky-500/15">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2Z" />
                  <path d="M12 16v-4" />
                  <path d="M12 8h.01" />
                </svg>
              </div>
              <div>
                <h2 className="text-lg font-bold text-white">Why This App</h2>
                <p className="text-xs text-slate-400">Design decisions behind RecoveryLine</p>
              </div>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed">
              Every design choice in RecoveryLine is intentional and rooted in the realities of substance recovery in the Philippines. Here&apos;s why we built it this way.
            </p>
          </div>

          {/* Design Decision Cards */}
          <div className="space-y-3">
            {/* Dark Mode by Default */}
            <div className="glass-card p-4 animate-fadeUp" style={{ opacity: 0, animationDelay: '0.05s' }}>
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-lg bg-violet-500/15 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#a78bfa" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
                    <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-semibold text-white mb-1">Dark Mode by Default</h4>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Filipino stigma culture means you may need to use this app in public or around others. Dark mode makes the screen less readable from a distance, providing an extra layer of privacy. It also reduces eye strain during late-night check-ins and cravings management.
                  </p>
                </div>
              </div>
            </div>

            {/* PWA Architecture */}
            <div className="glass-card p-4 animate-fadeUp" style={{ opacity: 0, animationDelay: '0.1s' }}>
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-lg bg-sky-500/15 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#38bdf8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
                    <path d="M12 18h.01" />
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-semibold text-white mb-1">PWA Architecture</h4>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    No app store means no download history, no search results, and no trail. Install directly from the browser and remove instantly. The built-in calculator camouflage lets you switch to a realistic calculator in one tap if someone looks at your screen — no one will know it&apos;s a recovery app.
                  </p>
                </div>
              </div>
            </div>

            {/* Taglish & Local Context */}
            <div className="glass-card p-4 animate-fadeUp" style={{ opacity: 0, animationDelay: '0.15s' }}>
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-lg bg-emerald-500/15 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <line x1="2" y1="12" x2="22" y2="12" />
                    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-semibold text-white mb-1">Taglish &amp; Local Context</h4>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Recovery resources rarely reflect the Filipino experience. We use local ingredient names (malunggay, calamansi, buko), reference Philippine government programs (PDEA, DDB, DOH), and include substance aliases used locally (shabu, basi, ginebra). Hotlines are Philippine-specific. Nutrition advice accounts for palengke availability and Filipino meal patterns.
                  </p>
                </div>
              </div>
            </div>

            {/* Privacy-First Design */}
            <div className="glass-card p-4 animate-fadeUp" style={{ opacity: 0, animationDelay: '0.2s' }}>
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-lg bg-red-500/15 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-semibold text-white mb-1">Privacy-First Design</h4>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    All data is stored locally on your device — nothing is sent to any server. No accounts, no sign-ups, no email verification. No analytics tracking. Even the export feature produces a file that only you control. Under Philippine law (RA 9165, Section 55), rehabilitation records must be kept confidential. RecoveryLine goes further — no records exist outside your device.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Additional context */}
          <div className="glass-card-insight p-4 animate-fadeUp" style={{ opacity: 0, animationDelay: '0.25s' }}>
            <div className="flex items-start gap-3">
              <div className="w-7 h-7 rounded-lg bg-emerald-500/15 flex items-center justify-center flex-shrink-0 mt-0.5">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  <path d="m9 12 2 2 4-4" />
                </svg>
              </div>
              <div>
                <p className="text-xs font-semibold text-emerald-400 mb-1">Open Source &amp; Free Forever</p>
                <p className="text-xs text-slate-500 leading-relaxed">
                  RecoveryLine is and will always be 100% free. No premium tiers, no subscriptions, no paywalls. Recovery tools should be accessible to everyone, regardless of financial situation. Every feature in this app exists because someone in recovery needed it.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
