export interface SubstanceData {
  id: string;
  name: string;
  aliases: string[];
  streetNames: string[];
  category: 'stimulant' | 'empathogen' | 'depressant' | 'cannabinoid' | 'dissociative';
  schedule: string;
  dangerLevel: 1 | 2 | 3 | 4 | 5;
  description: string;
  primaryDamage: {
    items: string[];
    summary: string;
  };
  pharmacology: {
    mechanism: string;
    halfLife: string;
    onset: string;
    peak: string;
    duration: string;
    metabolites: string;
  };
  withdrawal: {
    timeline: string;
    symptoms: string[];
    severity: 'mild' | 'moderate' | 'severe' | 'critical';
    paws: string;
  };
  recoveryFocus: {
    neurotransmitters: string[];
    organs: string[];
    prioritySupplements: string[];
    timeline: string;
  };
  philippines: {
    legality: string;
    penalties: string;
    commonForm: string;
    streetPrice: string;
  };
  harmReduction: string[];
}

export const SUBSTANCES: Record<string, SubstanceData> = {
  methamphetamine: {
    id: 'methamphetamine',
    name: 'Methamphetamine',
    aliases: ['Meth', 'Crystal Meth', 'D-Methamphetamine', 'Desoxyephedrine'],
    streetNames: ['Shabu', 'Tina', 'Basura', 'Bato', 'Crystal', 'Ice', 'Glass', 'Krokodil (misnomer)'],
    category: 'stimulant',
    schedule: 'Schedule II (PH: Dangerous Drugs Act - Penalty: Life imprisonment to death)',
    dangerLevel: 5,
    description:
      'Methamphetamine is a potent central nervous system stimulant that floods the brain with dopamine, norepinephrine, and serotonin at up to 10x normal levels. It works by reversing the direction of dopamine transporter (DAT) and vesicular monoamine transporter 2 (VMAT-2) proteins, causing massive neurotransmitter efflux into the synaptic cleft. Chronic use causes severe dopamine receptor downregulation, neurotoxicity via oxidative stress and excitotoxicity, gut barrier destruction through vasoconstriction of intestinal blood vessels, and HPG axis suppression leading to testosterone deficiency in male users. Recovery involves rebuilding dopaminergic function, repairing the gut-brain axis, restoring hormonal balance, and addressing the profound anhedonia that characterizes early abstinence. The Philippines is one of the highest consumers of methamphetamine globally, with "shabu" being the most prevalent form.',
    primaryDamage: {
      items: [
        'Severe dopamine receptor downregulation (D2 receptor blunting)',
        'Gut dysbiosis and intestinal permeability (leaky gut)',
        'HPG axis suppression (low testosterone in males)',
        'Neuroinflammation via chronic microglial activation',
        'Sleep architecture destruction (REM suppression)',
        'Cardiovascular stress (tachycardia, hypertension, arrhythmia)',
        'Oxidative stress and mitochondrial damage',
        'White matter degradation and reduced prefrontal cortex volume',
        'Dental destruction ("meth mouth" - bruxism, dry mouth, poor nutrition)',
        'Glutamate excitotoxicity causing neuronal apoptosis',
      ],
      summary:
        'Methamphetamine causes widespread neurodegeneration through multiple pathways: direct neurotoxicity, oxidative stress, excitotoxicity, and vascular damage. The brain\'s reward circuitry is fundamentally altered, with D2 receptor density dropping by up to 50% in chronic users. The gut-brain axis is severely compromised through vasoconstriction-induced ischemia of intestinal tissue, leading to bacterial translocation and systemic inflammation.',
    },
    pharmacology: {
      mechanism:
        'Reverses DAT and VMAT-2 transporters causing massive dopamine efflux into synaptic cleft; also releases norepinephrine and serotonin. Inhibits monoamine oxidase (MAO), extending neurotransmitter activity. Crosses blood-brain barrier rapidly due to high lipophilicity.',
      halfLife: '10-12 hours (extended: up to 30+ hours with binge use)',
      onset: 'Smoked/injected: 3-5 seconds (rush); Oral: 15-20 minutes; Snorted: 3-5 minutes',
      peak: 'Smoked/injected: 1-5 minutes; Oral: 2-4 hours',
      duration: 'Smoked/injected: 8-12 hours; Oral: 10-24 hours',
      metabolites: 'Amphetamine (active), p-OH-amphetamine, norephedrine. Excreted renally with 30-54% unchanged.',
    },
    withdrawal: {
      timeline: 'Acute: 1-14 days; Subacute: 2-4 weeks; PAWS: months to years',
      symptoms: [
        'Profound anhedonia (inability to feel pleasure)',
        'Extreme fatigue and hypersomnia',
        'Depression (can be severe with suicidal ideation)',
        'Anxiety and panic attacks',
        'Intense cravings (especially in first 2 weeks)',
        'Cognitive impairment (brain fog, poor concentration)',
        'Increased appetite',
        'Vivid nightmares and sleep disturbances',
        'Psychomotor retardation',
        'Paranoia and perceptual disturbances',
      ],
      severity: 'severe',
      paws:
        'Post-Acute Withdrawal Syndrome can persist for 6-24 months, characterized by intermittent waves of anhedonia, depression, cognitive dysfunction, and cravings triggered by stress, people, places, or cues associated with previous use. Each wave is typically less intense and shorter in duration than the previous one.',
    },
    recoveryFocus: {
      neurotransmitters: ['Dopamine', 'Serotonin', 'Norepinephrine', 'GABA', 'Glutamate'],
      organs: ['Brain (prefrontal cortex, striatum)', 'Gut (microbiome, intestinal lining)', 'Liver (detoxification)', 'Heart (cardiovascular repair)'],
      prioritySupplements: [
        'Magnesium Glycinate',
        'N-Acetyl Cysteine (NAC)',
        'L-Tyrosine',
        'L-Glutamine',
        'Mucuna Pruriens',
        'Alpha-Lipoic Acid',
        'B-Complex Vitamins',
        'Probiotics',
        'Zinc Picolinate',
        'Vitamin D3',
      ],
      timeline:
        'Days 1-14: Acute withdrawal, neurotransmitter crash. Days 14-30: Early recovery, receptors begin upregulating. Months 1-3: Dopamine recovery accelerates, mood stabilizes. Months 3-6: Significant functional recovery. Months 6-12+: Continued brain remodeling, near-normal dopamine function. Full recovery: 1-2 years for most functions; some cognitive deficits may persist.',
    },
    philippines: {
      legality: 'Illegal under Republic Act No. 9165 (Comprehensive Dangerous Drugs Act of 2002). Possession, use, sale, manufacture, and cultivation are criminal offenses.',
      penalties: 'Possession of small quantity: 6 months + 4 years imprisonment + fine up to ₱500,000. Sale/trading: 12 years + 1 day to 20 years + fine up to ₱10,000,000. Importation/manufacturing: Life imprisonment to death + fine up to ₱50,000,000.',
      commonForm: 'Crystal ("shabu") - typically smoked in glass pipes or aluminum foil. Occasionally injected or taken orally. "Basura" refers to lower-quality or adulterated product.',
      streetPrice: '₱200-500 per small sachet (0.05-0.1g). ₱1,000-3,000 per gram. Price varies by region and purity. Metro Manila prices tend to be higher.',
    },
    harmReduction: [
      'Stay hydrated with electrolytes — meth causes severe dehydration and sweating',
      'Never use alone — have someone who can call for help in emergencies',
      'Avoid mixing with alcohol, other stimulants, or antidepressants (serotonin syndrome risk)',
      'Use the lowest effective dose and avoid binge patterns (redose >3x greatly increases neurotoxicity)',
      'Take antioxidants (Vitamin C, NAC) before and after use to reduce oxidative damage',
      'Eat before and after use — meth suppresses appetite causing malnutrition',
      'Maintain sleep hygiene — sleep deprivation dramatically increases neurotoxicity',
      'Monitor heart rate — if resting HR exceeds 120bpm, seek medical attention',
      'Rotate veins and use clean equipment if injecting to prevent infection',
      'Have naloxone available — while not an opioid, polydrug use is common',
    ],
  },

  mdma: {
    id: 'mdma',
    name: 'MDMA (3,4-Methylenedioxymethamphetamine)',
    aliases: ['Ecstasy', 'Molly', 'MDMA', 'XTC', 'Adam', 'Eve', 'Dove'],
    streetNames: ['Pills', 'Beans', 'Roses', 'Chocolates', 'Yakults', 'X', 'E'],
    category: 'empathogen',
    schedule: 'Schedule I (PH: Illegal under RA 9165)',
    dangerLevel: 4,
    description:
      'MDMA is an empathogen-entactogen primarily acting as a serotonin-releasing agent and reuptake inhibitor (SRA/SRI). It causes massive serotonin efflux by reversing the serotonin transporter (SERT), while also moderately affecting dopamine and norepinephrine systems. The drug produces characteristic feelings of euphoria, emotional openness, and enhanced sensory perception. However, acute use causes significant serotonergic neurotoxicity through oxidative stress, hyperthermia, and metabolite-induced damage (particularly from HHMA and HMMA metabolites). Chronic use leads to profound serotonin depletion, SERT downregulation, and lasting mood dysregulation. Recovery focuses on serotonin restoration, protecting serotonergic neurons from further damage, and rebuilding the emotional regulation systems that MDMA disrupts. In the Philippines, MDMA is commonly found in pill form at clubs and parties.',
    primaryDamage: {
      items: [
        'Severe serotonin depletion and SERT (serotonin transporter) downregulation',
        'Oxidative stress to serotonergic neurons via metabolites (HHMA, HMMA)',
        'Disrupted thermoregulation leading to hyperthermia-related organ damage',
        'Hippocampal neurotoxicity affecting memory consolidation',
        'Axonal degeneration in serotonergic nerve terminals',
        'Endothelial dysfunction and cardiovascular strain',
        'Liver toxicity from metabolic processing',
        'Disrupted HPA axis (cortisol dysregulation)',
        'Depletion of antioxidant defenses (glutathione, Vitamin C)',
        'Impaired executive function and emotional processing',
      ],
      summary:
        'MDMA causes selective neurotoxicity to the serotonergic system through multiple converging mechanisms: direct serotonin depletion, oxidative stress from metabolites, hyperthermia-induced protein denaturation, and excitotoxicity. The hippocampus and prefrontal cortex are particularly vulnerable. Long-term users show reduced SERT density (up to 30-50% reduction), impaired verbal memory, and chronic serotonergic dysfunction that can persist for months to years after cessation.',
    },
    pharmacology: {
      mechanism:
        'Reverses SERT causing massive serotonin efflux; moderately reverses DAT (dopamine) and NET (norepinephrine). Also acts as a weak MAO-A inhibitor. Binding to 5-HT2B receptors contributes to cardiac valvulopathy with chronic use. The empathogenic effects are primarily mediated by serotonin release in the amygdala and prefrontal cortex.',
      halfLife: '7-9 hours (active metabolites up to 16 hours)',
      onset: 'Oral: 20-60 minutes; Snorted: 5-10 minutes (rare route); Rectal: 10-15 minutes',
      peak: 'Oral: 1.5-2.5 hours (peak effects)',
      duration: 'Oral: 3-6 hours (primary effects); After-effects: 2-8 hours ("comedown")',
      metabolites:
        'MDA (active, neurotoxic), HHMA (dihydroxymethamphetamine), HMMA (hydroxymethamphetamine). Primary metabolism via CYP2D6 enzyme.',
    },
    withdrawal: {
      timeline: 'Acute comedown: 1-3 days; Subacute: 1-2 weeks; Serotonin recovery: weeks to months',
      symptoms: [
        'Profound depression and emotional blunting ("Tuesday blues")',
        'Anxiety and panic (especially in social situations)',
        'Fatigue and lethargy',
        'Difficulty concentrating and brain fog',
        'Irritability and mood swings',
        'Sleep disturbances (insomnia, vivid dreams)',
        'Loss of appetite or comfort eating',
        'Decreased libido',
        'Memory problems (short-term and verbal)',
        'Cravings (often triggered by music, social settings)',
      ],
      severity: 'moderate',
      paaws:
        'PAWS from MDMA is characterized by persistent emotional blunting, intermittent depressive episodes, social anxiety, and cognitive fog. Serotonin recovery is slow — SERT density can take 3-6 months to normalize. Users report that the first 2-4 weeks after stopping are the most difficult, with gradual improvement thereafter. Full emotional recovery may take 6-12 months depending on usage history.',
    },
    recoveryFocus: {
      neurotransmitters: ['Serotonin', 'Dopamine', 'GABA', 'Melatonin'],
      organs: ['Brain (serotonergic neurons, hippocampus)', 'Liver', 'Heart (valvular health)', 'Gut (serotonin production — 95% of body\'s serotonin)'],
      prioritySupplements: [
        '5-HTP',
        'L-Tryptophan',
        'Magnesium Glycinate',
        'Vitamin C',
        'Alpha-Lipoic Acid',
        'Probiotics',
        'Omega-3 Fish Oil',
        'L-Theanine',
        'B-Complex Vitamins',
        'Melatonin',
      ],
      timeline:
        'Days 1-7: Acute serotonin depletion, emotional crash. Weeks 1-4: Initial SERT upregulation begins, mood slowly stabilizes. Months 1-3: Significant serotonin recovery, emotional range returns. Months 3-6: SERT density approaches normal, memory improves. Months 6-12: Full serotonergic recovery for most users. Complete recovery possible within 6-18 months for moderate users.',
    },
    philippines: {
      legality: 'Illegal under Republic Act No. 9165. Classified as a dangerous drug. Possession, sale, and manufacture carry severe penalties.',
      penalties: 'Similar to methamphetamine penalties. Possession: 6 months + 4 years imprisonment + fine up to ₱500,000. Sale/trading: 12 years + 1 day to 20 years + fine up to ₱10,000,000.',
      commonForm: 'Pressed pills in various colors/stamps (branded pills like "Tesla", "Chanel", "Rolex logos). Also found as crystalline powder ("Molly") though purity varies significantly. Commonly sold at clubs, parties, and festivals.',
      streetPrice: '₱300-800 per pill. ₱1,500-3,000 per gram (crystal). Pill price varies by brand/stamp and venue. Party/festival prices are typically higher.',
    },
    harmReduction: [
      'Test your substance — many "MDMA" pills contain methamphetamine, cathinones, or fentanyl in the Philippines',
      'Limit to once per 2-3 month minimum — neurotoxicity is cumulative and dose-dependent',
      'Stay cool and hydrated — sip 250-500ml water per hour, avoid overheating',
      'Take antioxidant preload (Vitamin C 1g, Alpha-Lipoic Acid 200mg) 1 hour before',
      'Post-load with 5-HTP (50-100mg) and magnesium after the experience',
      'Avoid SSRIs/MAOIs — life-threatening serotonin syndrome risk',
      'Don\'t mix with alcohol (increases dehydration and liver toxicity)',
      'Take breaks from dancing to prevent rhabdomyolysis',
      'Have a trusted "trip sitter" who is sober',
      'Start with a test dose (quarter pill) if using a new batch',
    ],
  },

  cannabis: {
    id: 'cannabis',
    name: 'Cannabis (Marijuana)',
    aliases: ['Marijuana', 'Weed', 'Pot', 'Ganja', 'Hemp', 'THC'],
    streetNames: ['Weed', 'Pot', 'Mary Jane', 'Ganja', 'Kush', 'Dro', 'Trees', 'Bud'],
    category: 'cannabinoid',
    schedule: 'Schedule I (PH: Illegal under RA 9165)',
    dangerLevel: 2,
    description:
      'Cannabis contains delta-9-tetrahydrocannabinol (THC), which primarily acts on CB1 (brain) and CB2 (immune) receptors of the endocannabinoid system. THC modulates GABA and glutamate release, producing characteristic effects of relaxation, altered perception, increased appetite, and euphoria. The endocannabinoid system plays crucial roles in neurogenesis, synaptic plasticity, stress response, and emotional regulation. Chronic cannabis use leads to CB1 receptor downregulation and desensitization, disrupted dopamine signaling in the reward pathway, impaired memory consolidation via hippocampal CB1 activation, and potential motivational syndrome (amotivation). CBD (cannabidiol) present in some strains may have neuroprotective and anxiolytic properties that partially counteract THC\'s negative effects. Recovery focuses on CB1 receptor upregulation, dopamine pathway restoration, and addressing the psychological dependence patterns that develop around chronic use.',
    primaryDamage: {
      items: [
        'CB1 receptor downregulation and desensitization',
        'Anhedonia, amotivation, and reduced reward sensitivity',
        'Impaired hippocampal-dependent memory consolidation',
        'Altered mesolimbic dopamine signaling (blunted reward response)',
        'Respiratory damage (if smoked — chronic bronchitis, tar exposure)',
        'Disrupted circadian rhythm and sleep architecture',
        'Potential for cannabis hyperemesis syndrome (CHS)',
        'Impaired executive function and decision-making',
        'Increased anxiety and paranoia (especially with high-THC strains)',
        'Testosterone reduction and fertility impact in chronic male users',
      ],
      summary:
        'Cannabis primarily disrupts the endocannabinoid system through CB1 receptor downregulation, leading to broad effects on mood, motivation, cognition, and reward processing. While generally less neurotoxic than stimulants or empathogens, chronic use creates a dependency loop where the brain\'s natural endocannabinoid tone (anandamide) is suppressed, making sober life feel flat and unrewarding. The motivational and cognitive effects can be particularly insidious because they develop gradually and are often attributed to other causes.',
    },
    pharmacology: {
      mechanism:
        'THC is a partial agonist at CB1 (brain) and CB2 (immune/peripheral) receptors. CB1 activation inhibits adenylate cyclase, reducing cAMP and modulating ion channels. This decreases GABA and glutamate release, affecting virtually all brain circuits. THC also activates TRPV1 (pain) and PPAR-gamma receptors. CBD acts as a negative allosteric modulator at CB1, with additional 5-HT1A agonist activity.',
      halfLife:
        'THC: 1-3 days for occasional users; 5-13 days for chronic users. THC-COOH metabolite: up to 30+ days for heavy chronic users. Lipophilic — stored in fat cells and slowly released.',
      onset: 'Smoked/vaporized: 1-5 minutes; Oral (edibles): 30-120 minutes; Sublingual: 15-45 minutes',
      peak: 'Smoked: 15-30 minutes; Oral: 2-4 hours',
      duration: 'Smoked: 2-4 hours; Oral: 4-8 hours (edibles can last up to 12 hours)',
      metabolites: '11-OH-THC (active, more potent than THC — especially with oral use), THC-COOH (inactive, long-lasting, basis for drug tests). Metabolized primarily by CYP2C9 and CYP3A4.',
    },
    withdrawal: {
      timeline: 'Acute: 1-14 days; Subacute: 2-4 weeks; Extended: 1-3 months',
      symptoms: [
        'Irritability and mood swings',
        'Sleep disturbances (insomnia, vivid dreams, night sweats)',
        'Decreased appetite and mild nausea',
        'Anxiety and restlessness',
        'Physical discomfort (headaches, sweating, chills)',
        'Intense cravings (especially triggered by routine use times)',
        'Depressed mood and emotional flatness',
        'Difficulty concentrating',
        'Restless legs and mild tremor',
        'Dream rebound (unusually vivid, sometimes disturbing dreams)',
      ],
      severity: 'mild',
      paaws:
        'Cannabis PAWS is less severe than other substances but can persist for 1-3 months. Characterized by intermittent anxiety, sleep disruption, mood instability, and cravings. The motivational syndrome may take 3-6 months to fully resolve as CB1 receptors upregulate and dopamine signaling normalizes. Cognitive function typically recovers within 1-3 months of abstinence.',
    },
    recoveryFocus: {
      neurotransmitters: ['Anandamide (endocannabinoid)', 'Dopamine', 'Serotonin', 'GABA', 'Glutamate'],
      organs: ['Brain (CB1 receptors, hippocampus, prefrontal cortex)', 'Lungs (if smoked)', 'Liver'],
      prioritySupplements: [
        'Omega-3 Fish Oil',
        'L-Theanine',
        'Ashwagandha',
        'Magnesium Glycinate',
        'Vitamin D3',
        'Probiotics',
        'Exercise (natural endocannabinoid boost)',
        'B-Complex Vitamins',
        'Melatonin (for sleep)',
        'NAC (for cravings)',
      ],
      timeline:
        'Days 1-7: Acute withdrawal — insomnia, irritability, cravings. Weeks 1-2: Sleep begins normalizing, mood improves. Weeks 2-4: CB1 receptors begin upregulating, appetite normalizes. Months 1-3: Significant CB1 recovery, motivation returns, cognition improves. Months 3-6: Near-complete endocannabinoid system recovery. Full recovery: 3-6 months for most functions; cognitive gains continue for up to 1 year.',
    },
    philippines: {
      legality: 'Illegal under Republic Act No. 9165. However, medical cannabis legalization is under legislative discussion. Possession, use, sale, and cultivation are criminal offenses. The Philippine House of Representatives has filed bills for medical marijuana but none have passed into law as of 2025.',
      penalties: 'Possession of small quantity: 6 months + 1 day to 6 years + fine up to ₱500,000. Sale/trading: 12 years + 1 day to 20 years + fine up to ₱10,000,000. Cultivation: Life imprisonment + fine up to ₱10,000,000.',
      commonForm: 'Dried flower buds (smoked in joints, bongs, or improvised pipes). Occasionally found as hashish/kief. Edibles are rare in the local market. THC potency of locally-available cannabis varies widely.',
      streetPrice: '₱100-300 per "stick" (joint). ₱500-2,000 per gram. ₱3,000-8,000 per ounce (lower quality). Higher-grade imported strains can cost significantly more. Price and availability vary by region.',
    },
    harmReduction: [
      'Vaporize instead of smoking to reduce respiratory damage and tar exposure',
      'Start low, go slow — especially with edibles (wait 2+ hours before redosing)',
      'Use strains with CBD content to buffer THC\'s psychoactive effects',
      'Stay hydrated and maintain nutrition — cannabis suppresses appetite during use but recovery requires nutrients',
      'Take tolerance breaks — regular use leads to rapid CB1 downregulation',
      'Don\'t drive or operate machinery under the influence',
      'Avoid mixing with alcohol or other drugs — unpredictable interactions',
      'Keep track of usage patterns — dependence develops gradually with daily use',
      'If experiencing paranoia/anxiety, use lower-THC strains or CBD-dominant products',
      'Support lung health with antioxidants (Vitamin C, NAC) if smoking',
    ],
  },
};

export const SUBSTANCE_LIST = Object.values(SUBSTANCES).sort((a, b) => b.dangerLevel - a.dangerLevel);
export const SUBSTANCE_IDS = SUBSTANCE_LIST.map((s) => s.id);
