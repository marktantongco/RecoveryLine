export type SupplementCategory = 'Minerals' | 'Amino Acids' | 'Herbal' | 'Vitamins' | 'Antioxidants' | 'Probiotics' | 'Adaptogens';

export interface SupplementData {
  id: string;
  name: string;
  shortName: string;
  tagline: string;
  category: SupplementCategory;
  dosage: string;
  timing: 'AM' | 'PM' | 'Both' | 'Any';
  description: string;
  mechanism: string;
  benefits: string[];
  cautions: string[];
  forSubstances: string[];
  stackNotes: string;
  philippinesAvailability: string;
  priceRange: string;
}

export const SUPPLEMENT_CATEGORIES: SupplementCategory[] = [
  'All',
  'Minerals',
  'Amino Acids',
  'Herbal',
  'Vitamins',
  'Antioxidants',
  'Probiotics',
  'Adaptogens',
];

export const SUPPLEMENTS_DB: SupplementData[] = [
  {
    id: 'magnesium-glycinate',
    name: 'Magnesium Glycinate',
    shortName: 'Mg Glycinate',
    tagline: 'The MVP of Calm',
    category: 'Minerals',
    dosage: '300-400mg elemental magnesium',
    timing: 'PM',
    description:
      'Magnesium glycinate is the most bioavailable and gentle form of magnesium, combining magnesium with the amino acid glycine for enhanced absorption and calming effects. It is the single most important supplement for recovery because virtually every recovering user is magnesium-deficient due to substance-induced depletion, poor diet, and stress. Magnesium is a cofactor in over 300 enzymatic reactions, including neurotransmitter synthesis, DNA repair, and mitochondrial function. The glycine component provides additional calming effects on the NMDA receptor.',
    mechanism:
      'Modulates NMDA receptor activity (reducing glutamate excitotoxicity), activates GABA-A receptors (promoting calm), blocks calcium channels (reducing neuronal overexcitation), and serves as cofactor for tyrosine hydroxylase (dopamine synthesis) and tryptophan hydroxylase (serotonin synthesis).',
    benefits: [
      'Reduces anxiety and promotes calm without sedation',
      'Supports dopamine and serotonin production',
      'Improves sleep quality and sleep onset',
      'Reduces muscle cramps and tremors',
      'Protects against glutamate excitotoxicity',
      'Supports over 300 enzymatic processes',
      'Reduces cortisol (stress hormone) levels',
      'Helps repair intestinal barrier (leaky gut)',
    ],
    cautions: [
      'Start with 200mg and increase gradually to avoid loose stools',
      'Avoid taking with calcium (they compete for absorption)',
      'Take 1-2 hours before bed for optimal sleep benefits',
      'Choose glycinate form — oxide and citrate are poorly absorbed',
    ],
    forSubstances: ['methamphetamine', 'mdma', 'cannabis'],
    stackNotes:
      'Foundation supplement — stack with everything. Take separately from zinc (2+ hours apart) for optimal absorption. Can be combined with L-Theanine for enhanced calming effect.',
    philippinesAvailability: 'Widely available at Watsons, Mercury Drug, Healthy Options, Lazada, Shopee. Look for "Magnesium Glycinate" or "Magnesium Bisglycinate" — avoid Magnesium Oxide.',
    priceRange: '₱300-800 per 60-90 capsules',
  },
  {
    id: 'nac',
    name: 'N-Acetyl Cysteine (NAC)',
    shortName: 'NAC',
    tagline: 'The Universal Detoxifier',
    category: 'Amino Acids',
    dosage: '600-1200mg',
    timing: 'AM',
    description:
      'NAC is a prodrug of L-cysteine and the most efficient way to boost intracellular glutathione — the body\'s master antioxidant. It is one of the most evidence-based supplements for addiction recovery, with clinical studies showing it reduces cravings for cocaine, cannabis, nicotine, and gambling. NAC works by restoring glutamate homeostasis in the nucleus accumbens, which is disrupted by all addictive substances. It also chelates heavy metals, supports liver detoxification, and breaks down the biofilm that protects harmful gut bacteria.',
    mechanism:
      'Provides cysteine for glutathione synthesis (body\'s primary antioxidant). Modulates glutamate levels in the nucleus accumbens via the cystine-glutamate antiporter (system xc-). Chelates heavy metals and toxins. Reduces oxidative stress and neuroinflammation. Breaks down mucin and bacterial biofilms.',
    benefits: [
      'Clinically proven to reduce substance cravings',
      'Restores glutathione — the body\'s master antioxidant',
      'Modulates glutamate (reduces excitotoxicity)',
      'Supports liver detoxification pathways',
      'Reduces neuroinflammation and oxidative stress',
      'Breaks down biofilms protecting harmful gut bacteria',
      'May reduce compulsive behaviors',
      'Protects lungs and respiratory system',
    ],
    cautions: [
      'Take on an empty stomach (30 min before meals) for best absorption',
      'Split doses: AM (600mg) and PM (600mg) if using 1200mg',
      'May cause mild nausea at first — start with 600mg',
      'Not for use with nitroglycerin or activated charcoal',
    ],
    forSubstances: ['methamphetamine', 'mdma', 'cannabis'],
    stackNotes:
      'Pair with Vitamin C (enhances glutathione recycling). Combine with Alpha-Lipoic Acid for comprehensive antioxidant coverage. Take separately from probiotics (2+ hours apart).',
    philippinesAvailability: 'Available at Watsons, Mercury Drug, Lazada, Shopee. Also sold as a respiratory supplement (brand names vary). Look for "NAC 600mg" capsules.',
    priceRange: '₱400-900 per 30-60 capsules',
  },
  {
    id: '5htp',
    name: '5-Hydroxytryptophan (5-HTP)',
    shortName: '5-HTP',
    tagline: 'Serotonin Precursor',
    category: 'Amino Acids',
    dosage: '150-300mg',
    timing: 'PM',
    description:
      '5-HTP is the direct metabolic precursor to serotonin, bypassing the rate-limiting enzyme (tryptophan hydroxylase) in serotonin synthesis. It readily crosses the blood-brain barrier and is converted to serotonin by aromatic L-amino acid decarboxylase (AADC). 5-HTP is especially valuable for MDMA recovery where serotonin systems are severely depleted. It also supports melatonin production, improving sleep quality during withdrawal. Regular use helps restore emotional range and reduce the profound anhedonia that follows stimulant cessation.',
    mechanism:
      'Directly converted to serotonin via AADC enzyme in the brain. Bypasses tryptophan hydroxylase (rate-limiting step in serotonin pathway). Also serves as precursor for melatonin (via serotonin → N-acetylserotonin → melatonin). Crosses blood-brain barrier efficiently.',
    benefits: [
      'Directly boosts serotonin levels in the brain',
      'Reduces depression and emotional blunting',
      'Improves sleep quality (melatonin precursor)',
      'Reduces anxiety and panic symptoms',
      'Helps restore emotional range after MDMA/stimulant use',
      'May reduce carbohydrate cravings (serotonin-deficiency eating)',
      'Supports healthy pain threshold',
    ],
    cautions: [
      'CRITICAL: NEVER combine with SSRIs or MAOIs — serotonin syndrome risk',
      'Start with 50mg and increase gradually — too much causes anxiety',
      'Best taken in the evening (can cause drowsiness)',
      'Take with a small carbohydrate snack (enhances brain uptake)',
      'Do not use for more than 3 months without a break',
    ],
    forSubstances: ['mdma', 'methamphetamine'],
    stackNotes:
      'Stack with Vitamin B6 (cofactor for conversion to serotonin). Take with L-Tryptophan for dual-pathway serotonin support. Avoid combining with L-Tyrosine (they compete for the same transporter). Cycle: 2 weeks on, 1 week off.',
    philippinesAvailability: 'Available at Healthy Options, Lazada, Shopee. Look for "5-HTP" or "5-Hydroxytryptophan" in 50mg or 100mg capsules.',
    priceRange: '₱500-1,200 per 60 capsules',
  },
  {
    id: 'l-glutamine',
    name: 'L-Glutamine',
    shortName: 'L-Glutamine',
    tagline: 'Gut-Brain Repair Agent',
    category: 'Amino Acids',
    dosage: '5-10g',
    timing: 'AM',
    description:
      'L-Glutamine is the most abundant amino acid in the body and the primary fuel source for enterocytes (intestinal cells) and immune cells. During active substance use, particularly with methamphetamine which causes severe intestinal vasoconstriction, the gut lining becomes damaged and permeable ("leaky gut"). This allows bacterial endotoxins (LPS) to enter the bloodstream, triggering systemic inflammation that affects brain function. L-Glutamine directly repairs the intestinal barrier, supports GABA synthesis in the brain, and helps regulate blood sugar to reduce cravings.',
    mechanism:
      'Primary fuel for enterocytes — directly repairs intestinal tight junctions and gut barrier integrity. Precursor for GABA (the brain\'s primary calming neurotransmitter) via glutamate decarboxylase. Regulates blood sugar (reduces hypoglycemia-triggered cravings). Supports ammonia detoxification in the brain. Reduces intestinal permeability by upregulating tight junction proteins.',
    benefits: [
      'Repairs leaky gut and intestinal barrier damage',
      'Supports GABA production (calming neurotransmitter)',
      'Reduces sugar and alcohol cravings (blood sugar regulation)',
      'Reduces systemic inflammation from gut-derived endotoxins',
      'Supports immune function and recovery',
      'Reduces ammonia toxicity in the brain',
      'Helps heal intestinal lining damaged by vasoconstriction',
      'Supports muscle recovery and reduces fatigue',
    ],
    cautions: [
      'Take on an empty stomach or between meals',
      'Start with 3g and increase to 5-10g over a week',
      'Powder form is most cost-effective at this dosage',
      'Dissolve in water — slightly bitter taste',
      'Those with severe liver disease should consult a doctor',
    ],
    forSubstances: ['methamphetamine', 'mdma', 'cannabis'],
    stackNotes:
      'Combine with probiotics for synergistic gut repair. Pair with Zinc Carnosine for enhanced intestinal healing. Take NAC separately (they use the same transporters).',
    philippinesAvailability: 'Available at Watsons, Mercury Drug, Lazada, Shopee. Powder form (unflavored) is most economical. Also available in capsules but dosage is too low (500mg per capsule).',
    priceRange: '₱400-800 per 300g powder (most cost-effective)',
  },
  {
    id: 'l-tyrosine',
    name: 'L-Tyrosine',
    shortName: 'L-Tyrosine',
    tagline: 'Dopamine Rebuilder',
    category: 'Amino Acids',
    dosage: '500-1500mg',
    timing: 'AM',
    description:
      'L-Tyrosine is the direct precursor to dopamine, norepinephrine, and epinephrine (the catecholamine neurotransmitters). During early recovery from methamphetamine, dopamine levels crash dramatically due to receptor downregulation and neurotransmitter depletion. L-Tyrosine provides the raw material for dopamine synthesis, helping to accelerate recovery of the brain\'s reward system. It is particularly effective for improving cognitive performance under stress and reducing the fatigue and brain fog that characterize withdrawal.',
    mechanism:
      'Direct precursor for L-DOPA via tyrosine hydroxylase (rate-limiting enzyme in dopamine synthesis). L-DOPA is then converted to dopamine, which can be further converted to norepinephrine and epinephrine. Also supports thyroid hormone production (T3, T4) and melanin synthesis. Works best when dopamine demand is high (stress, withdrawal, cognitive demand).',
    benefits: [
      'Accelerates dopamine recovery after stimulant cessation',
      'Improves cognitive function and mental clarity',
      'Reduces fatigue and brain fog during withdrawal',
      'Supports stress resilience (boosts norepinephrine)',
      'Improves motivation and drive',
      'Supports thyroid function',
      'Enhances physical performance and endurance',
    ],
    cautions: [
      'Take in the morning only — late-day use disrupts sleep',
      'Take on an empty stomach (amino acid competition)',
      'Do NOT use with MAOIs — hypertensive crisis risk',
      'Caution with L-DOPA or Parkinson\'s medications',
      'Start with 500mg, increase only if well-tolerated',
    ],
    forSubstances: ['methamphetamine', 'mdma'],
    stackNotes:
      'Pair with Vitamin B6 and Vitamin C (cofactors for dopamine conversion). Combine with Mucuna Pruriens for dual-pathway dopamine support. Take separately from 5-HTP (competes for absorption). Cycle: 2-3 weeks on, 1 week off.',
    philippinesAvailability: 'Available at Healthy Options, Lazada, Shopee. Look for "L-Tyrosine 500mg" capsules.',
    priceRange: '₱400-900 per 60-90 capsules',
  },
  {
    id: 'mucuna-pruriens',
    name: 'Mucuna Pruriens',
    shortName: 'Mucuna',
    tagline: 'Natural L-Dopa Source',
    category: 'Herbal',
    dosage: '250-500mg (standardized to 15-20% L-Dopa)',
    timing: 'AM',
    description:
      'Mucuna Pruriens is a natural herbal source of L-DOPA, the direct precursor to dopamine. Unlike synthetic L-DOPA used in Parkinson\'s treatment, mucuna provides L-DOPA alongside naturally occurring cofactors that may improve its conversion efficiency and reduce side effects. Mucuna has been used for centuries in Ayurvedic medicine and has been shown in studies to increase dopamine levels, improve mood, reduce stress, and support testosterone production. It is particularly valuable for methamphetamine recovery where the dopaminergic system needs aggressive support.',
    mechanism:
      'Contains 3.6-4.2% L-DOPA (naturally occurring), which directly converts to dopamine via DOPA decarboxylase. Also contains serotonin, nicotine, and other bioactive compounds that may support neurotransmitter balance. Shown to increase testosterone via luteinizing hormone (LH) stimulation. Reduces prolactin levels.',
    benefits: [
      'Natural dopamine precursor — more holistic than isolated L-DOPA',
      'Supports testosterone production and hormonal balance',
      'Reduces prolactin (which can be elevated after substance use)',
      'Improves mood and motivation',
      'May support fertility and sexual function',
      'Contains natural serotonin and antioxidant compounds',
      'Reduces stress hormone (cortisol) levels',
    ],
    cautions: [
      'Take in the morning only — stimulating effects disrupt sleep',
      'Start with 250mg — 500mg can cause nausea in some people',
      'Do NOT combine with MAOIs or L-DOPA medications',
      'Avoid prolonged daily use without breaks (dopamine receptor desensitization)',
      'May cause GI discomfort at higher doses',
    ],
    forSubstances: ['methamphetamine'],
    stackNotes:
      'Alternate with L-Tyrosine — use one or the other, not both simultaneously. Pair with Vitamin B6 for optimal conversion to dopamine. Avoid combining with 5-HTP. Cycle: 2 weeks on, 1 week off.',
    philippinesAvailability: 'Available at Healthy Options, Lazada, Shopee. Look for "Mucuna Pruriens" standardized to 15-20% L-DOPA extract.',
    priceRange: '₱500-1,500 per 60 capsules',
  },
  {
    id: 'alpha-lipoic-acid',
    name: 'Alpha-Lipoic Acid (ALA)',
    shortName: 'ALA',
    tagline: 'Mitochondrial Defender',
    category: 'Antioxidants',
    dosage: '300-600mg',
    timing: 'AM',
    description:
      'Alpha-Lipoic Acid is a unique, universal antioxidant that is both water and fat soluble, allowing it to protect every cell and tissue in the body. It is one of the few antioxidants that can cross the blood-brain barrier in significant amounts. ALA regenerates other antioxidants (Vitamin C, Vitamin E, glutathione, CoQ10) and directly scavenges reactive oxygen species (ROS) generated during substance use and withdrawal. It is especially valuable for mitochondrial repair — the energy-producing organelles that are damaged by methamphetamine and MDMA neurotoxicity.',
    mechanism:
      'Directly scavenges hydroxyl radicals, singlet oxygen, and other ROS. Regenerates oxidized forms of Vitamin C, Vitamin E, glutathione, and CoQ10. Chelates heavy metals (mercury, lead, arsenic). Activates Nrf2 pathway (cellular antioxidant response). Restores mitochondrial function by protecting mitochondrial DNA and membranes. Crosses blood-brain barrier effectively.',
    benefits: [
      'Universal antioxidant — protects both water and fat-soluble cellular compartments',
      'Regenerates Vitamin C, E, glutathione, and CoQ10',
      'Crosses blood-brain barrier — protects neurons directly',
      'Repairs mitochondrial damage from substance-induced oxidative stress',
      'Chelates heavy metals and reduces metal-induced toxicity',
      'Improves insulin sensitivity and blood sugar regulation',
      'Reduces peripheral neuropathy symptoms',
      'Activates Nrf2 cellular defense pathway',
    ],
    cautions: [
      'Take on an empty stomach (food reduces absorption by 30%)',
      'Start with 300mg, increase to 600mg after 1-2 weeks',
      'R-ALA (R-isomer) is 3x more effective than S-ALA — look for R-ALA supplements',
      'May lower blood sugar — monitor if diabetic',
      'Can cause mild heartburn in some people',
    ],
    forSubstances: ['methamphetamine', 'mdma'],
    stackNotes:
      'Ultimate antioxidant stack: ALA + NAC + Vitamin C (covers all antioxidant pathways). Take with B-vitamins for enhanced mitochondrial function. Pair with Acetyl-L-Carnitine (ALCAR) for synergistic mitochondrial repair.',
    philippinesAvailability: 'Available at Healthy Options, Watsons, Lazada, Shopee. Look for "Alpha-Lipoic Acid" or "R-ALA" (preferred — more potent form).',
    priceRange: '₱500-1,200 per 60 capsules',
  },
  {
    id: 'vitamin-d3',
    name: 'Vitamin D3 (Cholecalciferol)',
    shortName: 'Vitamin D3',
    tagline: 'Sunshine Hormone',
    category: 'Vitamins',
    dosage: '2,000-5,000 IU daily',
    timing: 'AM',
    description:
      'Vitamin D3 is technically a prohormone, not a vitamin, and is critically involved in immune function, mood regulation, neurotransmitter synthesis, and neuroprotection. Research has shown that virtually all chronic substance users are Vitamin D deficient due to indoor lifestyles, poor nutrition, and substance-induced metabolic disruption. Vitamin D3 receptors are found throughout the brain, particularly in the prefrontal cortex and hippocampus — areas heavily impacted by substance use. Deficiency is strongly correlated with depression, cognitive impairment, and weakened immunity.',
    mechanism:
      'Binds to Vitamin D receptors (VDR) found throughout the brain and body. Regulates over 200 genes including those involved in neurotransmitter synthesis (tyrosine hydroxylase for dopamine, tryptophan hydroxylase for serotonin). Modulates immune function via T-cell regulation. Supports calcium absorption for bone health. Has neuroprotective and anti-inflammatory properties.',
    benefits: [
      'Regulates dopamine and serotonin synthesis genes',
      'Reduces depression and improves mood',
      'Strengthens immune system (critical during withdrawal)',
      'Supports bone health (substance use causes osteoporosis risk)',
      'Neuroprotective — reduces neuroinflammation',
      'Improves cognitive function and memory',
      'Regulates circadian rhythm (when taken in AM)',
      'May reduce cravings (VDR activation modulates reward pathways)',
    ],
    cautions: [
      'Take with a fatty meal (fat-soluble — requires dietary fat for absorption)',
      'Take in the morning (late-day use can disrupt melatonin production)',
      'Get a blood test if possible (25-OH Vitamin D test — aim for 40-60 ng/mL)',
      'Do not exceed 10,000 IU/day without medical supervision',
      'Pair with Vitamin K2 (MK-7) for proper calcium metabolism',
    ],
    forSubstances: ['methamphetamine', 'mdma', 'cannabis'],
    stackNotes:
      'Foundation supplement — stack with everything. Take with Vitamin K2 (100-200mcg) for calcium routing. Pair with Magnesium (required for Vitamin D activation). Consider testing 25-OH Vitamin D levels.',
    philippinesAvailability: 'Available at Watsons, Mercury Drug, Lazada, Shopee. Common brands: Kirkland (Costco), Mason Natural, Puritan\'s Pride. Look for Vitamin D3 (cholecalciferol), not D2 (ergocalciferol — 3x less effective).',
    priceRange: '₱200-600 per 100-200 softgel capsules',
  },
  {
    id: 'omega3',
    name: 'Omega-3 Fish Oil (EPA/DHA)',
    shortName: 'Omega-3',
    tagline: 'Brain Cell Builder',
    category: 'Vitamins',
    dosage: '1,000-2,000mg combined EPA + DHA',
    timing: 'AM',
    description:
      'Omega-3 fatty acids (EPA and DHA) are essential structural components of brain cell membranes and are critical for neurotransmitter receptor function, synaptic plasticity, and neuroinflammation reduction. The brain is 60% fat, and DHA alone constitutes 40% of all polyunsaturated fatty acids in neuronal membranes. Chronic substance use depletes omega-3 stores through oxidative damage and poor diet. Omega-3 supplementation has been shown in clinical trials to reduce depression, improve cognitive function, reduce cravings, and support overall brain recovery.',
    mechanism:
      'EPA reduces neuroinflammation by competing with omega-6 arachidonic acid for COX/LOX enzymes, producing anti-inflammatory eicosanoids (PGE3, LTB5). DHA is the primary structural component of neuronal membrane phospholipids, essential for fluid membrane dynamics, neurotransmitter receptor function, and synaptic vesicle formation. Both enhance BDNF (brain-derived neurotrophic factor) expression.',
    benefits: [
      'Structural repair of brain cell membranes (DHA)',
      'Reduces neuroinflammation (EPA)',
      'Enhances BDNF — the brain\'s growth hormone',
      'Improves mood and reduces depression symptoms',
      'Supports memory and cognitive function',
      'May reduce substance cravings',
      'Supports cardiovascular health',
      'Improves serotonin and dopamine receptor function',
    ],
    cautions: [
      'Choose high-quality, molecularly distilled fish oil (low heavy metals)',
      'Look for 2:1 or 3:1 EPA:DHA ratio for mood benefits',
      'Store in refrigerator after opening',
      'Take with a fatty meal for better absorption',
      'Mild fish burps are normal — enteric-coated capsules help',
      'Caution with blood thinners (mild antiplatelet effect)',
    ],
    forSubstances: ['methamphetamine', 'mdma', 'cannabis'],
    stackNotes:
      'Foundation supplement. Pair with Vitamin E (protects omega-3s from oxidation). Combine with ALA for comprehensive anti-inflammatory coverage. Take with meals for absorption.',
    philippinesAvailability: 'Widely available at Watsons, Mercury Drug, Healthy Options, Lazada, Shopee. Popular brands: Nordic Naturals, Kirkland, Puritan\'s Pride. Look for high EPA:DHA content (minimum 1000mg combined per serving).',
    priceRange: '₱400-1,500 per 100-200 softgel capsules',
  },
  {
    id: 'probiotics',
    name: 'Probiotics (Multi-Strain)',
    shortName: 'Probiotics',
    tagline: 'Gut-Brain Axis Restorer',
    category: 'Probiotics',
    dosage: '10-50 billion CFU',
    timing: 'AM',
    description:
      'The gut microbiome produces 95% of the body\'s serotonin and plays a crucial role in GABA, dopamine, and acetylcholine production. Substance use devastates the gut microbiome through multiple pathways: vasoconstriction-induced ischemia (meth), direct toxicity (alcohol), poor nutrition, and stress-induced dysbiosis. This "leaky gut" allows bacterial endotoxins (LPS) to enter the bloodstream, triggering systemic inflammation that directly affects brain function, mood, and cravings. A multi-strain probiotic with prebiotic support helps restore the gut-brain axis and is fundamental to long-term recovery.',
    mechanism:
      'Restores beneficial bacterial populations in the gut. Produces short-chain fatty acids (butyrate, propionate) that strengthen intestinal barrier integrity. Produces neurotransmitters (GABA, serotonin, dopamine) locally in the gut. Competes with pathogenic bacteria for resources. Modulates immune system via gut-associated lymphoid tissue (GALT). Reduces systemic inflammation by preventing LPS translocation.',
    benefits: [
      'Restores gut-brain communication (95% of serotonin is gut-derived)',
      'Reduces systemic inflammation from leaky gut',
      'Produces GABA, serotonin, and dopamine in the gut',
      'Strengthens intestinal barrier integrity',
      'Supports immune system function',
      'Improves nutrient absorption (critical for malnourished users)',
      'Reduces anxiety and depression via vagus nerve signaling',
      'May reduce substance cravings through microbiome-gut-brain axis',
    ],
    cautions: [
      'Take on an empty stomach (30 min before meals) for best survival',
      'Choose multi-strain formula with at least 10+ strains',
      'Look for enteric-coated capsules (protects from stomach acid)',
      'Expect mild bloating in first 1-2 weeks (die-off effect)',
      'Take with prebiotics (inulin, FOS) to feed the good bacteria',
      'Store properly — many need refrigeration',
    ],
    forSubstances: ['methamphetamine', 'mdma', 'cannabis'],
    stackNotes:
      'Pair with prebiotics (inulin powder or foods like banana, garlic, onion). Combine with L-Glutamine for synergistic gut repair. Take separately from antibiotics (2+ hours apart). Consider rotating probiotic brands every 2-3 months for diversity.',
    philippinesAvailability: 'Available at Watsons, Mercury Drug, Lazada, Shopee. Look for multi-strain formulas with 10-50 billion CFU. Good brands: Puritan\'s Pride, Now Foods, Healthy Options brands.',
    priceRange: '₱400-1,500 per 30-60 capsules',
  },
  {
    id: 'zinc',
    name: 'Zinc Picolinate',
    shortName: 'Zinc',
    tagline: 'Testosterone & Immunity Support',
    category: 'Minerals',
    dosage: '15-30mg elemental zinc',
    timing: 'PM',
    description:
      'Zinc is an essential mineral involved in over 100 enzymatic processes, including testosterone production, immune function, neurotransmitter regulation, and DNA repair. Chronic substance users are almost universally zinc-deficient due to poor diet, increased urinary excretion during use, and impaired absorption. Zinc deficiency directly causes testosterone suppression, impaired immunity, depression, and cognitive dysfunction. The picolinate form has the best absorption rate among zinc supplements.',
    mechanism:
      'Required cofactor for aromatase (testosterone-to-estrogen conversion balance), 5-alpha reductase, and delta-6 desaturase (omega-3 metabolism). Essential for NMDA receptor modulation and GABA receptor function. Supports over 100 metalloenzymes. Required for thymus gland function (immune system). Antioxidant via superoxide dismutase (SOD) enzyme.',
    benefits: [
      'Directly supports testosterone production in males',
      'Strengthens immune system (critical during withdrawal)',
      'Modulates NMDA and GABA receptors (calming effect)',
      'Essential for wound healing and tissue repair',
      'Antioxidant function (SOD enzyme cofactor)',
      'Improves mood and reduces depression symptoms',
      'Supports taste/smell recovery (damaged by substance use)',
      'Required for omega-3 metabolism and vitamin A function',
    ],
    cautions: [
      'Take separately from magnesium and calcium (2+ hours apart)',
      'Take with dinner or before bed (zinc requirements peak at night)',
      'Picolinate form has best absorption — avoid zinc oxide',
      'Excessive zinc (>40mg/day) depletes copper — balance with 1-2mg copper if supplementing long-term',
      'May cause nausea on empty stomach',
    ],
    forSubstances: ['methamphetamine', 'mdma', 'cannabis'],
    stackNotes:
      'Take separately from magnesium (different timing). Pair with Vitamin D3 for testosterone support. Consider adding 1-2mg copper if supplementing zinc >15mg/day for extended periods.',
    philippinesAvailability: 'Available at Watsons, Mercury Drug, Lazada, Shopee. Look for "Zinc Picolinate" — more bioavailable than zinc gluconate or oxide.',
    priceRange: '₱200-500 per 60-100 tablets',
  },
  {
    id: 'b-complex',
    name: 'B-Complex Vitamins (B-50 Formula)',
    shortName: 'B-Complex',
    tagline: 'Nerve Repair & Energy',
    category: 'Vitamins',
    dosage: 'B-50 complex (once daily)',
    timing: 'AM',
    description:
      'B vitamins are essential cofactors for virtually every step of neurotransmitter synthesis and energy metabolism. Substance use severely depletes B-vitamin stores through increased metabolic demand, poor nutrition, and direct urinary excretion (particularly with stimulant use). The B-50 complex provides therapeutic doses of all 8 B vitamins in the ratios needed for optimal neurological recovery. B6 is particularly critical as a cofactor for converting 5-HTP to serotonin and L-DOPA to dopamine. B12 and folate are essential for myelin repair and methylation.',
    mechanism:
      'B1 (Thiamine): Cofactor for glucose metabolism in neurons. B3 (Niacin): Required for NAD+/NADH (cellular energy). B5 (Pantothenic Acid): Cofactor for acetylcholine synthesis. B6 (Pyridoxine): Cofactor for AADC enzyme (converts 5-HTP→serotonin, L-DOPA→dopamine). B9 (Folate): Required for SAMe production (methylation, neurotransmitter synthesis). B12 (Cobalamin): Essential for myelin sheath repair and nerve function.',
    benefits: [
      'Cofactors for ALL neurotransmitter synthesis pathways',
      'Repairs nerve damage and supports myelin regeneration',
      'Converts food to cellular energy (ATP)',
      'Reduces fatigue and brain fog',
      'Supports methylation (DNA repair, neurotransmitter balance)',
      'Reduces peripheral neuropathy symptoms',
      'Supports liver detoxification',
      'Improves mood and cognitive function',
    ],
    cautions: [
      'Take in the morning — B-vitamins can be stimulating',
      'B-50 complex provides therapeutic (not just RDA) doses',
      'B6 over 100mg/day can cause neuropathy (B-50 provides 50mg)',
      'Take with food to prevent nausea',
      'Urine will turn bright yellow (normal — riboflavin/B2 excretion)',
    ],
    forSubstances: ['methamphetamine', 'mdma', 'cannabis'],
    stackNotes:
      'Foundation supplement. B6 is specifically needed when taking 5-HTP or L-Tyrosine (cofactor for conversion). Combine with Magnesium for synergistic calming effect. May make urine bright yellow (harmless B2 effect).',
    philippinesAvailability: 'Widely available everywhere — Watsons, Mercury Drug, 7-Eleven, Lazada, Shopee. Very affordable. Look for "Vitamin B-Complex" or "B-50" formula.',
    priceRange: '₱100-400 per 100 tablets (very affordable)',
  },
  {
    id: 'ashwagandha',
    name: 'Ashwagandha (KSM-66)',
    shortName: 'Ashwagandha',
    tagline: 'Cortisol Crusher',
    category: 'Adaptogens',
    dosage: '300-600mg KSM-66 extract',
    timing: 'PM',
    description:
      'Ashwagandha is an adaptogenic herb used for over 3,000 years in Ayurvedic medicine. It normalizes the hypothalamic-pituitary-adrenal (HPA) axis, which is severely dysregulated during substance withdrawal. Ashwagandha reduces cortisol (stress hormone) by up to 30%, increases DHEA, supports thyroid function, and enhances GABA-A receptor activity. The KSM-66 extract is the most clinically studied form, with proven efficacy for anxiety reduction, stress relief, testosterone support, and sleep improvement.',
    mechanism:
      'Modulates HPA axis by reducing cortisol via ACTH suppression. Enhances GABA-A receptor binding (calming effect). Increases DHEA-S (adrenal androgen precursor to testosterone). Withanolides (active compounds) have anti-inflammatory and neuroprotective properties. Supports thyroid function (T3/T4 production). Reduces blood cortisol by 14-23% in clinical studies.',
    benefits: [
      'Dramatically reduces cortisol (stress hormone) levels',
      'Enhances GABA activity (natural anxiolytic)',
      'Supports testosterone production and hormonal balance',
      'Improves sleep quality and duration',
      'Reduces anxiety and panic symptoms',
      'Adaptogenic — normalizes body\'s stress response',
      'Supports thyroid function',
      'Neuroprotective — reduces neuroinflammation',
    ],
    cautions: [
      'Best taken in the evening (promotes sleep)',
      'Use KSM-66 or Sensoril standardized extract',
      'Avoid if you have hyperthyroidism (stimulates thyroid)',
      'May interact with thyroid medications',
      'Avoid during pregnancy',
      'Allow 4-8 weeks for full effects (cumulative benefits)',
    ],
    forSubstances: ['methamphetamine', 'mdma', 'cannabis'],
    stackNotes:
      'Stack with Magnesium Glycinate and L-Theanine for the ultimate calming combo. Combine with Zinc for enhanced testosterone support. Avoid taking with thyroid medications without doctor supervision.',
    philippinesAvailability: 'Available at Healthy Options, Lazada, Shopee. Look for "Ashwagandha KSM-66" (standardized extract — much more potent than plain root powder).',
    priceRange: '₱500-1,500 per 60 capsules',
  },
  {
    id: 'l-theanine',
    name: 'L-Theanine',
    shortName: 'L-Theanine',
    tagline: 'Calm Focus Without Drowsiness',
    category: 'Amino Acids',
    dosage: '200-400mg',
    timing: 'PM',
    description:
      'L-Theanine is a unique amino acid found primarily in green tea that promotes relaxation without sedation. It works by increasing alpha brain wave activity (associated with calm, meditative states) while simultaneously enhancing focus and attention. L-Theanine modulates GABA, serotonin, and dopamine levels, and reduces cortisol in response to acute stress. It is particularly valuable for anxiety management during withdrawal without the sedating side effects of pharmaceutical anxiolytics. When combined with caffeine, it creates a state of "alert calm" — focused energy without jitters.',
    mechanism:
      'Crosses blood-brain barrier and increases GABA levels. Enhances alpha brain wave activity (measured by EEG — associated with relaxed alertness). Modulates serotonin and dopamine release. Blocks glutamate at AMPA receptors (reducing overexcitation). Reduces cortisol response to acute stress. Competes with glutamate at glutamate receptors.',
    benefits: [
      'Promotes calm, focused relaxation without drowsiness',
      'Reduces anxiety and stress without sedation',
      'Improves sleep quality (especially when combined with magnesium)',
      'Enhances alpha brain waves (meditative, creative state)',
      'Supports attention and focus during cognitive tasks',
      'Reduces blood pressure response to stress',
      'May reduce PMS symptoms in women',
      'Synergizes with caffeine for "alert calm" effect',
    ],
    cautions: [
      'Can be taken any time of day (not sedating)',
      'Start with 200mg — some people need less',
      'Effects are felt within 30-45 minutes',
      'Safe for long-term daily use',
      'Avoid very high doses (>800mg) — paradoxical effects possible',
    ],
    forSubstances: ['methamphetamine', 'mdma', 'cannabis'],
    stackNotes:
      'Combine with Magnesium Glycinate for enhanced calming. Add to morning coffee/tea for "alert calm" (100mg theanine per 100mg caffeine). Stack with Ashwagandha in the evening for comprehensive stress support. Take before social situations that trigger anxiety.',
    philippinesAvailability: 'Available at Healthy Options, Watsons, Lazada, Shopee. Also available by drinking 3-4 cups of high-quality green tea daily (provides 100-200mg L-theanine).',
    priceRange: '₱300-800 per 60 capsules (or free via green tea)',
  },
  {
    id: 'melatonin',
    name: 'Melatonin',
    shortName: 'Melatonin',
    tagline: 'Sleep Reset',
    category: 'Vitamins',
    dosage: '0.3-5mg',
    timing: 'PM',
    description:
      'Melatonin is the body\'s natural sleep hormone, produced by the pineal gland in response to darkness. Substance use severely disrupts the circadian rhythm and melatonin production — stimulant users often go days without sleep, and withdrawal brings severe insomnia. Melatonin supplementation helps reset the sleep-wake cycle, reduce sleep onset latency, and improve sleep quality. Importantly, low doses (0.3-1mg) are often more effective than the high doses (5-10mg) commonly sold. Exogenous melatonin is also a potent antioxidant, crossing the blood-brain barrier and protecting mitochondria.',
    mechanism:
      'Activates MT1 and MT2 receptors in the suprachiasmatic nucleus (SCN) of the hypothalamus, regulating circadian rhythm. MT1 activation reduces neuronal firing (promoting sleep onset). MT2 activation shifts circadian phase. Directly scavenges hydroxyl radicals and other ROS. Crosses blood-brain barrier and accumulates in mitochondria where it protects against oxidative damage.',
    benefits: [
      'Resets circadian rhythm disrupted by substance use',
      'Reduces sleep onset latency (time to fall asleep)',
      'Improves overall sleep quality and duration',
      'Potent antioxidant — protects brain mitochondria',
      'Reduces oxidative stress during withdrawal',
      'Supports immune function (enhances natural killer cell activity)',
      'Non-habit forming (unlike pharmaceutical sleep aids)',
      'Very affordable and widely available',
    ],
    cautions: [
      'Take 30-60 minutes before desired sleep time',
      'Start LOW — 0.3-1mg is often enough; more is not better',
      'High doses (5mg+) can cause grogginess next morning',
      'Keep lights dim after taking (light destroys melatonin)',
      'Use blue light filters on screens after 8 PM for best results',
      'Short-term use (2-4 weeks) to reset sleep cycle, then reduce',
    ],
    forSubstances: ['methamphetamine', 'mdma', 'cannabis'],
    stackNotes:
      'Combine with Magnesium Glycinate for synergistic sleep support. Add L-Theanine (200mg) to reduce anxiety at bedtime. Stack with GABA (100-200mg) for enhanced sleep onset. Avoid with alcohol (disrupts melatonin production).',
    philippinesAvailability: 'Widely available at Watsons, Mercury Drug, Lazada, Shopee. Very affordable. Also available as sublingual tablets for faster absorption.',
    priceRange: '₱100-300 per 60-100 tablets',
  },
  {
    id: 'vitamin-c',
    name: 'Vitamin C (Ascorbic Acid)',
    shortName: 'Vitamin C',
    tagline: 'Antioxidant Shield',
    category: 'Vitamins',
    dosage: '500-2,000mg',
    timing: 'AM',
    description:
      'Vitamin C is a water-soluble antioxidant that is essential for neurotransmitter synthesis, immune function, and collagen repair. Substance users have dramatically elevated oxidative stress and depleted antioxidant defenses. Vitamin C directly regenerates glutathione (the body\'s master antioxidant), supports dopamine beta-hydroxylase (converting dopamine to norepinephrine), and enhances iron absorption for energy production. High-dose Vitamin C before and after substance use significantly reduces oxidative damage to neurons.',
    mechanism:
      'Electron donor that directly neutralizes reactive oxygen species (ROS). Regenerates oxidized glutathione (GSSG → GSH). Required cofactor for dopamine beta-hydroxylase (dopamine → norepinephrine). Enhances non-heme iron absorption. Supports collagen synthesis for tissue repair. Modulates immune function via phagocyte activation and cytokine production.',
    benefits: [
      'Potent direct antioxidant — neutralizes free radicals immediately',
      'Regenerates glutathione (recycles the body\'s master antioxidant)',
      'Required for neurotransmitter synthesis (dopamine, norepinephrine)',
      'Strengthens immune system (especially during withdrawal)',
      'Enhances iron absorption for energy production',
      'Supports collagen repair (skin, blood vessels, gut lining)',
      'Reduces cortisol levels in response to stress',
      'Very affordable and well-tolerated at high doses',
    ],
    cautions: [
      'Split doses throughout the day (body excretes excess quickly)',
      'Take with meals (improves iron absorption from food)',
      'High doses (>2,000mg) may cause loose stools',
      'Natural sources: citrus fruits, guava, papaya, malunggay (Philippines!)',
      'Buffered form (sodium ascorbate) is gentler on the stomach',
    ],
    forSubstances: ['methamphetamine', 'mdma'],
    stackNotes:
      'Take WITH NAC and ALA for the "antioxidant trifecta" — comprehensive coverage of all oxidative stress pathways. Vitamin C regenerates glutathione while NAC produces it. Take before and after any substance use for maximum neuroprotection.',
    philippinesAvailability: 'Everywhere — Watsons, Mercury Drug, 7-Eleven, sari-sari stores, palengke. Very cheap. Philippines has abundant natural sources: calamansi, guava, papaya, malunggay.',
    priceRange: '₱50-200 per 100 tablets (extremely affordable)',
  },
  {
    id: 'inositol',
    name: 'Inositol (Myo-Inositol)',
    shortName: 'Inositol',
    tagline: 'Anxiety & Craving Modulator',
    category: 'Vitamins',
    dosage: '2-18g (start with 2g, increase as needed)',
    timing: 'PM',
    description:
      'Inositol (formerly classified as Vitamin B8) is a naturally occurring sugar alcohol that is structurally similar to glucose and is found in every cell membrane as phosphatidylinositol. It modulates serotonin and dopamine signaling by sensitizing their receptors, making it particularly effective for anxiety, OCD tendencies, and substance cravings. Clinical studies have shown inositol reduces panic attacks by 4x compared to placebo. For recovery, inositol helps reduce the compulsive use patterns and anxiety-driven cravings that characterize early abstinence. It is one of the safest supplements available with virtually no side effects.',
    mechanism:
      'Modulates serotonin receptor sensitivity (particularly 5-HT2A and 5-HT1A). Sensitizes dopamine D2 receptors (improving reward sensitivity). Precursor for second messengers in intracellular signaling (IP3/DAG pathway). Modulates GABA receptor function. Required for cell membrane integrity as phosphatidylinositol. Crosses blood-brain barrier effectively.',
    benefits: [
      'Clinically proven to reduce anxiety and panic attacks (4x better than placebo)',
      'Reduces substance cravings (particularly alcohol, nicotine)',
      'Improves serotonin receptor sensitivity (not just serotonin levels)',
      'Sensitizes dopamine D2 receptors (improves reward/pleasure)',
      'May reduce OCD-like compulsive behaviors',
      'Supports cell membrane health',
      'Improves insulin sensitivity and blood sugar regulation',
      'Extremely safe with minimal side effects',
    ],
    cautions: [
      'Requires high doses (2-18g) for therapeutic effects',
      'Powder form is much more cost-effective at these doses',
      'Start with 2g and increase gradually to find effective dose',
      'May cause mild gas/bloating at higher doses initially',
      'Split doses throughout the day for best absorption',
    ],
    forSubstances: ['methamphetamine', 'mdma', 'cannabis'],
    stackNotes:
      'Stack with 5-HTP for enhanced serotonin effects. Combine with NAC for craving reduction (different mechanisms). Take with Magnesium for synergistic anxiety reduction. Powder form recommended at these doses.',
    philippinesAvailability: 'Available at Healthy Options, Lazada, Shopee. Most cost-effective as bulk powder. Capsules are too low-dose (500mg each — would need 4-36 capsules per day).',
    priceRange: '₱400-1,000 per 100g powder (most economical)',
  },
  {
    id: 'phosphatidylserine',
    name: 'Phosphatidylserine (PS)',
    shortName: 'PS',
    tagline: 'Brain Cell Membrane Repair',
    category: 'Vitamins',
    dosage: '100-300mg',
    timing: 'PM',
    description:
      'Phosphatidylserine is a phospholipid that is a critical structural component of brain cell membranes, particularly concentrated in neuronal membranes and synaptic vesicles. It plays essential roles in cell signaling, neurotransmitter release, and synaptic plasticity. Chronic substance use damages neuronal membranes through oxidative stress and lipid peroxidation, impairing cell communication and cognitive function. PS supplementation helps repair these membranes, improves memory and cognitive function, and reduces cortisol levels. It is one of the few supplements with FDA-qualified health claims for cognitive decline.',
    mechanism:
      'Structural component of neuronal membranes — maintains fluidity and function. Facilitates neurotransmitter release from synaptic vesicles. Activates PKC (protein kinase C) signaling pathway. Modulates cortisol response to stress (reduces ACTH release). Supports glucose metabolism in the brain. Essential for synaptic plasticity and long-term potentiation (LTP).',
    benefits: [
      'Repairs substance-damaged brain cell membranes',
      'Improves memory and cognitive function (especially in older adults)',
      'Reduces exercise-induced cortisol by 20-30%',
      'Enhances neurotransmitter release and receptor function',
      'Supports synaptic plasticity and learning',
      'May improve ADHD symptoms',
      'Supports healthy stress response',
      'Enhances exercise performance and recovery',
    ],
    cautions: [
      'Best taken with dinner or before bed (some people feel drowsy)',
      'Soy-derived PS is most common and well-studied',
      'Sunflower-derived PS available for soy-allergic individuals',
      'Effects are cumulative — allow 2-4 weeks for noticeable results',
      'Generally very well-tolerated',
    ],
    forSubstances: ['methamphetamine', 'mdma'],
    stackNotes:
      'Pair with Omega-3 Fish Oil (DHA works synergistically with PS for membrane repair). Combine with ALA for mitochondrial support. Stack with B-Complex for enhanced neurotransmitter function.',
    philippinesAvailability: 'Available at Healthy Options, Lazada, Shopee. Look for "Phosphatidylserine" — soy-derived is most common. Higher-end supplement.',
    priceRange: '₱800-2,000 per 60-90 softgel capsules',
  },
];

export function getSupplementsByCategory(category: string): SupplementData[] {
  if (category === 'All') return SUPPLEMENTS_DB;
  return SUPPLEMENTS_DB.filter((s) => s.category === category);
}

export function searchSupplements(query: string): SupplementData[] {
  const q = query.toLowerCase();
  return SUPPLEMENTS_DB.filter(
    (s) =>
      s.name.toLowerCase().includes(q) ||
      s.shortName.toLowerCase().includes(q) ||
      s.tagline.toLowerCase().includes(q) ||
      s.category.toLowerCase().includes(q) ||
      s.benefits.some((b) => b.toLowerCase().includes(q))
  );
}
