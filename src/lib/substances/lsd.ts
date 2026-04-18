import { SubstanceData } from './types';

const lsd: SubstanceData = {
    id: 'lsd',
    name: 'LSD (Lysergic Acid Diethylamide)',
    aliases: ['Lysergic Acid Diethylamide', 'Acid', 'Lucy', 'LSD-25'],
    streetNames: ['Acid', 'Tabs', 'Doses', 'Hits', 'Blotters', 'Microdots', 'Window Pane', 'Sugar Cubes'],
    category: 'hallucinogen',
    schedule: 'Schedule I (PH: Illegal under RA 9165 -- classified as a dangerous drug)',
    dangerLevel: 3,
    description:
      'LSD (lysergic acid diethylamide) is a semi-synthetic ergoline alkaloid and one of the most potent psychoactive substances known, with active doses measured in micrograms (μg). It acts primarily as a full agonist at serotonin 5-HT2A receptors, which is the primary mechanism responsible for its hallucinogenic effects -- altered perception, synesthesia, ego dissolution, and profound changes in consciousness and thought patterns. LSD also modulates 5-HT1A, 5-HT2C, 5-HT5A, 5-HT6, 5-HT7, and dopamine D2 receptors, contributing to its complex pharmacological profile. Unlike most recreational drugs, LSD has very low physiological toxicity -- LD50 in humans is estimated at 12,000-15,000 times the active dose. However, psychological risks are significant: LSD can trigger prolonged psychotic reactions (LSD psychosis) in predisposed individuals, hallucinogen persisting perception disorder (HPPD -- "flashbacks"), and severe anxiety during difficult psychedelic experiences ("bad trips"). Research has shown potential therapeutic applications for LSD in treating anxiety, depression, PTSD, and substance use disorders when used in controlled, supervised settings. In the Philippines, LSD is less common than methamphetamine or MDMA but is available in urban underground markets.',
    primaryDamage: {
      items: [
        'Risk of hallucinogen persisting perception disorder (HPPD) -- ongoing visual disturbances',
        'Potential triggering of latent psychiatric conditions (schizophrenia, bipolar disorder)',
        'Acute anxiety, panic, and paranoia during intoxication ("bad trips")',
        'Ego dissolution can cause lasting psychological distress without proper integration',
        'Disrupted serotonin receptor signaling with chronic/frequent use',
        'Sleep disruption and altered circadian rhythms',
        'Possible impaired reality testing and transient psychosis',
        'Risk of accidental injury during intoxication (impaired judgment/perception)',
        'Emotional volatility and mood lability following use',
        'Social and interpersonal difficulties from persistent worldview changes',
      ],
      summary:
        'LSD presents an unusual risk profile -- while its physiological toxicity is extremely low (virtually impossible to fatally overdose on), its psychological effects can be profound and occasionally lasting. The primary dangers are psychological: triggering latent mental illness, causing HPPD (persistent visual disturbances), and producing traumatic experiences during poorly managed trips. Unlike substances that cause progressive organ damage, LSD\'s harm is predominantly acute and psychological. However, frequent use can downregulate 5-HT2A receptors and create persistent changes in perception and cognition. Therapeutic use in controlled settings has shown remarkable efficacy for anxiety, depression, and addiction, highlighting the importance of set (mindset), setting (environment), and integration (processing the experience).',
    },
    pharmacology: {
      mechanism:
        'Full agonist at 5-HT2A receptors (primary hallucinogenic mechanism -- located on cortical pyramidal neurons). Also agonist/partial agonist at 5-HT1A, 5-HT2C, 5-HT5A, 5-HT6, 5-HT7, and dopamine D2 receptors. The hallucinogenic effects are primarily mediated by 5-HT2A activation in the prefrontal cortex, which increases cortical excitability, reduces default mode network (DMN) activity (ego dissolution), and enhances cross-modal connectivity between brain regions (synesthesia). Increases glutamate release in the prefrontal cortex secondary to 5-HT2A activation.',
      halfLife: '3-5 hours (primary); extended subjective effects up to 10-12 hours due to active metabolites and receptor kinetics. LSD is one of the longest-acting classic psychedelics.',
      onset: 'Oral (blotter/tabs): 30-90 minutes; Sublingual: 15-45 minutes; Liquid (sublingual): 15-30 minutes',
      peak: 'Oral: 2.5-4 hours after ingestion (peak intensity)',
      duration: 'Oral: 8-12 hours total experience. Residual effects ("afterglow" or "tail"): 2-6 additional hours. Most intense effects in the middle 4-6 hours.',
      metabolites: 'Nor-LSD (N-desethyl-LSD, inactive), 2-oxo-3-hydroxy-LSD (O-H-LSD, inactive -- primary urinary metabolite used for drug testing, detectable up to 72 hours). Iso-LSD and lumi-LSD (inactive degradation products from light exposure). Metabolized primarily by hepatic CYP2D6 and CYP3A4.',
    },
    withdrawal: {
      timeline: 'No classical physical withdrawal. Psychological aftereffects: 1-7 days. HPPD: weeks to potentially permanent.',
      symptoms: [
        'No significant physical withdrawal symptoms (LSD is not physically addictive)',
        'Transient anxiety and mood instability (1-3 days post-use)',
        'Fatigue and emotional exhaustion after intense experiences',
        'Visual disturbances (trailing, halos, geometric patterns -- HPPD risk with heavy use)',
        'Difficulty reintegrating into routine life after profound experiences',
        'Mild headache or physical tension',
        'Sleep disturbances (difficulty sleeping due to lingering perceptual changes)',
        'Intrusive memories of the psychedelic experience',
        'Temporary reduction in tolerance to other psychedelics',
        'Social withdrawal or existential questioning',
      ],
      severity: 'mild',
      paws:
        'LSD does not produce classical PAWS in the traditional sense, as it is not physically addictive. However, heavy users may experience persistent psychological effects lasting weeks to months, including visual disturbances (HPPD), altered perception, anxiety, and difficulty concentrating. HPPD is estimated to occur in 1-4% of regular psychedelic users. The 5-HT2A receptor downregulation from chronic use normalizes within 1-4 weeks of abstinence. Integration therapy (processing psychedelic experiences with a trained professional) is recommended for lasting psychological benefits.',
    },
    recoveryFocus: {
      neurotransmitters: ['Serotonin (5-HT2A receptor normalization)', 'Dopamine', 'Glutamate', 'GABA', 'BDNF'],
      organs: ['Brain (serotonin receptors, prefrontal cortex, visual processing)', 'Nervous system'],
      prioritySupplements: [
        'Omega-3 Fish Oil',
        'L-Theanine',
        'Magnesium Glycinate',
        'B-Complex Vitamins',
        '5-HTP (for serotonin restoration if depleted)',
        'Probiotics',
        'Vitamin D3',
        'Ashwagandha',
        'Ginkgo Biloba (for HPPD symptom management)',
        'Lion\'s Mane Mushroom (neurogenesis support)',
      ],
      timeline:
        'Days 1-3: Acute aftereffects resolve -- sleep returns, anxiety diminishes. Days 3-7: Normal perception largely restored, psychological processing of the experience. Weeks 1-4: 5-HT2A receptor density normalizes, visual disturbances resolve for most users. Months 1-3: Any HPPD symptoms should be evaluated by a neurologist or psychiatrist. Complete psychological integration: weeks to months depending on the depth of the psychedelic experience and quality of therapeutic support.',
    },
    philippines: {
      legality: 'Illegal under Republic Act No. 9165. LSD is classified as a dangerous drug. Possession, sale, manufacture, and distribution are criminal offenses. There is no recognized medical or therapeutic use of LSD in the Philippines.',
      penalties: 'Possession: 6 months + 4 years imprisonment + fine up to ₱500,000. Sale/trading: 12 years + 1 day to 20 years + fine up to ₱10,000,000. Manufacturing/importation: Life imprisonment to death + fine up to ₱50,000,000.',
      commonForm: 'Blotter paper tabs (small squares of absorbent paper soaked in LSD solution, often decorated with artwork) -- most common form. Liquid LSD (dropped on sugar cubes, candy, or directly on tongue). Occasionally found as microdots (small gelatin pills). Blotter art and branding are common identifiers. Active dose is typically 50-200 micrograms per tab.',
      streetPrice: '₱200-800 per tab (single dose blotter). ₱1,500-5,000 per "sheet" (10 tabs). Higher-dose "premium" tabs may cost ₱500-1,500 each. Price and availability vary -- more accessible in underground art, music, and spiritual communities in Metro Manila. Generally less available than other party drugs.',
    },
    harmReduction: [
      'Test your substance -- LSD is frequently counterfeited with NBOMe compounds (25I-NBOMe) which are significantly more dangerous and have caused deaths',
      'Start with a low dose (50-100μg for first-timers) and wait 2 hours before considering taking more',
      'Set and setting are everything -- use only when in a positive mindset, with trusted people, in a safe comfortable environment',
      'Have a trusted "trip sitter" who remains sober and can help if the experience becomes overwhelming',
      'Avoid if you have a personal or family history of schizophrenia, bipolar disorder, or psychotic disorders',
      'Don\'t mix with lithium, tramadol, or other serotonergic drugs (risk of seizures and serotonin syndrome)',
      'Avoid mixing with stimulants or alcohol -- increases anxiety and cardiovascular strain',
      'If having a difficult experience: change the music, move to a different room, focus on breathing, remind yourself it is temporary',
      'Allow minimum 1-2 weeks between experiences for tolerance to reset (cross-tolerance with other psychedelics lasts 3-7 days)',
      'Consider integration therapy with a trained professional after significant psychedelic experiences to process insights and emotions',
    ],
    recoveryTips: [
      'Psychedelics are not physically addictive, but psychological patterns can develop -- monitor your relationship with use',
      'Integration is key -- journal about your experiences and discuss insights with a trusted person or therapist',
      'Allow 2+ weeks between experiences for serotonin receptors to fully reset and tolerance to clear',
      'Set and setting matter profoundly -- never use psychedelics during emotionally unstable periods',
      'If experiencing persistent perceptual changes (HPPD), consult a neurologist -- symptoms often resolve with abstinence',
    ],
  };

export default lsd;
