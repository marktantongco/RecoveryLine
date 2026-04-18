import { SubstanceData } from './types';

const alcohol: SubstanceData = {
    id: 'alcohol',
    name: 'Alcohol (Ethanol)',
    aliases: ['Ethanol', 'Ethyl Alcohol', 'Booze', 'Liquor', 'Spirits'],
    streetNames: ['Ginebra', 'Red Horse', 'Tanduay', 'Emperador', 'Kwatro Kantos', 'Kulafu', 'Mansi', 'Lambanog'],
    category: 'depressant',
    schedule: 'Legal for adults 18+ (PH: Regulated -- NOT under RA 9165 but subject to local ordinances and excise tax)',
    dangerLevel: 4,
    description:
      'Ethanol is a small, highly lipophilic molecule that acts as a central nervous system depressant, primarily by potentiating GABA-A receptor function (increasing chloride influx and neuronal inhibition) and antagonizing NMDA glutamate receptors (reducing excitatory signaling). These dual mechanisms produce the characteristic disinhibition, sedation, and anxiolysis of alcohol intoxication. Alcohol also stimulates dopamine release in the nucleus accumbens (reward pathway) and endorphin release, reinforcing consumption. At higher doses, alcohol depresses brainstem respiratory centers, creating the risk of fatal respiratory depression. Chronic alcohol use causes widespread organ damage: hepatic steatosis progressing to cirrhosis, pancreatitis, cardiomyopathy, Wernicke-Korsakoff syndrome (thiamine deficiency), cerebellar degeneration, and peripheral neuropathy. Alcohol withdrawal is the most dangerous of all substance withdrawals and can be fatal without medical supervision due to risk of delirium tremens (DTs), seizures, and cardiovascular collapse. The Philippines has a significant alcohol consumption culture, with local spirits like lambanog, ginebra, and tuba being culturally embedded.',
    primaryDamage: {
      items: [
        'GABA-A receptor downregulation and NMDA receptor upregulation (hyperexcitable withdrawal state)',
        'Hepatic damage progression: steatosis → hepatitis → cirrhosis → liver failure',
        'Wernicke-Korsakoff syndrome (thiamine/B1 deficiency causing irreversible memory loss)',
        'Cerebellar atrophy and permanent gait/balance impairment',
        'Cardiomyopathy (alcoholic heart muscle disease)',
        'Pancreatitis (acute and chronic)',
        'Gastrointestinal mucosal damage and increased cancer risk (esophageal, gastric, hepatic)',
        'Peripheral neuropathy (nerve damage in extremities)',
        'Disrupted gut barrier integrity ("leaky gut") and systemic inflammation',
        'Neurotoxicity via acetaldehyde accumulation (DNA cross-linking, protein adduct formation)',
      ],
      summary:
        'Alcohol is uniquely destructive because it damages virtually every organ system in the body. The liver bears primary metabolic burden, with chronic consumption leading to progressive fibrosis and eventual cirrhosis. Neurologically, alcohol simultaneously depresses GABA and glutamate systems, creating a dangerous hyperexcitable state during withdrawal. The neurotoxic metabolite acetaldehyde directly damages neurons and is classified as a Group 1 carcinogen. Alcohol\'s legal status and cultural embeddedness in the Philippines make it the most widely abused substance and a leading contributor to preventable disease and death.',
    },
    pharmacology: {
      mechanism:
        'Primary mechanism: positive allosteric modulation of GABA-A receptors (increased Cl⁻ conductance, enhanced inhibition) and antagonism of NMDA receptors (reduced excitatory signaling). Also releases dopamine in nucleus accumbens and endorphins. At higher concentrations, affects glycine receptors, serotonin receptors (5-HT3), and directly activates G-protein-gated inwardly rectifying potassium (GIRK) channels. Metabolized to acetaldehyde (toxic) by alcohol dehydrogenase (ADH) and CYP2E1.',
      halfLife: 'Ethanol: 4-5 hours (average, varies by liver function and consumption rate). Rate-limited by ADH and ALDH enzyme capacity. Measured as blood alcohol concentration (BAC) with elimination rate of ~0.015% per hour.',
      onset: 'Oral: 15-45 minutes (depends on stomach contents, carbonation, concentration). Faster on empty stomach, with carbonated mixers, or at higher ABV.',
      peak: 'Oral: 30-90 minutes (BAC peak). Food delays and lowers peak concentration.',
      duration: 'Intoxication: 2-6 hours depending on dose and individual metabolism. Detectable in urine: 12-48 hours. Detectable by EtG test: up to 80 hours.',
      metabolites: 'Acetaldehyde (highly toxic, carcinogenic -- responsible for hangover symptoms and organ damage), Acetate (less toxic, enters Krebs cycle), Fatty acid ethyl esters (FAEEs, markers of organ damage). Metabolized primarily by hepatic alcohol dehydrogenase (ADH), microsomal CYP2E1 (inducible, activated at high BAC), and catalase.',
    },
    withdrawal: {
      timeline: 'Mild: 6-12 hours after last drink; Peak: 24-72 hours; DTs risk: 48-96 hours; Subacute: 1-2 weeks; PAWS: months',
      symptoms: [
        'Tremors (hand tremor "the shakes", whole-body tremors)',
        'Autonomic hyperactivity (sweating, tachycardia, hypertension, fever)',
        'Seizures (alcohol withdrawal seizures -- can be fatal)',
        'Delirium tremens (DTs): hallucinations, confusion, agitation, cardiovascular instability',
        'Severe anxiety, panic attacks, and agitation',
        'Nausea, vomiting, and loss of appetite',
        'Insomnia and fragmented sleep with REM rebound',
        'Depression and emotional lability',
        'Visual and auditory hallucinations',
        'Muscle rigidity and hyperreflexia',
      ],
      severity: 'critical',
      paws:
        'Post-Acute Withdrawal Syndrome from alcohol can persist for 6-24 months. Characterized by intermittent anxiety, sleep disturbances, mood swings, cognitive impairment ("brain fog"), reduced stress tolerance, and cravings. The hyperexcitable neural state (NMDA upregulation, GABA downregulation) takes months to fully normalize. Alcohol-related brain damage may improve over 6-12 months of abstinence, with some deficits (particularly from Wernicke-Korsakoff syndrome) being permanent. Each PAWS episode typically decreases in severity over time.',
    },
    recoveryFocus: {
      neurotransmitters: ['GABA', 'Glutamate', 'Dopamine', 'Serotonin', 'Endorphins'],
      organs: ['Liver (primary detoxification and repair)', 'Brain (GABA/glutamate balance, cerebellum, thiamine restoration)', 'Pancreas', 'Gastrointestinal tract', 'Heart (cardiomyopathy reversal)'],
      prioritySupplements: [
        'Thiamine (Vitamin B1) -- CRITICAL for preventing Wernicke-Korsakoff',
        'Milk Thistle (Silymarin)',
        'N-Acetyl Cysteine (NAC)',
        'Magnesium Glycinate',
        'B-Complex Vitamins (especially B6, B12, Folate)',
        'L-Glutamine',
        'Probiotics',
        'Alpha-Lipoic Acid',
        'Vitamin D3',
        'Omega-3 Fish Oil',
      ],
      timeline:
        'Days 1-7: Acute withdrawal (MEDICAL SUPERVISION REQUIRED if heavy user). Weeks 1-4: Sleep, mood, and appetite begin normalizing; liver enzymes start improving. Months 1-3: GABA/glutamate balance restoring, cognitive function improving, liver fat decreasing. Months 3-6: Significant liver recovery, mood stabilizes, brain volume begins recovering. Months 6-12: Major improvement in organ function, neurogenesis in hippocampus. Full recovery: 1-2 years for liver, brain, and nervous system; some alcohol-related damage may be permanent.',
    },
    philippines: {
      legality: 'Legal for consumption by adults 18 years and older. Regulated under the National Internal Revenue Code (excise tax), local government ordinances on drinking hours and public consumption. Not classified under RA 9165. Minors (below 18) are prohibited from purchasing or consuming alcohol.',
      penalties: 'Legal substance -- no criminal penalties for possession or consumption by adults. Sale to minors: fines and imprisonment under local ordinances and the Consumer Act. Drunk driving: penalized under the Anti-Drunk and Drugged Driving Act (RA 10586) -- 3 months imprisonment and ₱20,000-80,000 fine for first offense. Public intoxication penalties vary by LGU.',
      commonForm: 'Beer (San Miguel Pale Pilsen, Red Horse), Local spirits/GIN (Ginebra San Miguel, Tanduay), Lambanog (coconut wine, 40-45% ABV), Tuba (fermented coconut sap), Emperador Brandy, Wine. Lambanog is particularly associated with rapid intoxication and alcohol poisoning incidents due to high ABV and low cost. "Kwatro Kantos" refers to cheap distilled spirits in small sachets.',
      streetPrice: 'Beer: ₱30-70 per bottle/can. Local GIN (Ginebra): ₱50-90 per 375ml. Lambanog: ₱50-150 per bottle. Tanduay: ₱60-120 per 375ml. "Kwatro Kantos" sachets: ₱10-20 each. Emperador: ₱80-200 per bottle. Very affordable and widely available from sari-sari stores to upscale establishments.',
    },
    harmReduction: [
      'Eat a substantial meal before drinking -- food slows alcohol absorption and protects the stomach lining',
      'Alternate every alcoholic drink with a full glass of water to maintain hydration and slow consumption',
      'Set a drink limit before you start and stick to it -- track your intake',
      'Avoid mixing different types of alcohol and avoid carbonated mixers (they accelerate absorption)',
      'Never drink and drive -- use a designated driver, ride-hailing app, or public transport',
      'Know your limits -- alcohol tolerance drops with age, weight loss, or liver stress',
      'Take B-vitamins and milk thistle before and after heavy drinking to support liver function',
      'Pace yourself to 1 standard drink per hour -- your liver can only process about 1 unit per hour',
      'If dependent, NEVER stop abruptly -- seek medical detox to prevent potentially fatal withdrawal seizures and DTs',
      'Seek help if you find yourself unable to control consumption despite wanting to stop',
    ],
    recoveryTips: [
      'Thiamine (B1) supplementation is essential -- alcohol depletion causes irreversible brain damage if not addressed',
      'Milk thistle (silymarin) supports liver regeneration -- take 200-400mg standardized extract daily',
      'Medical detox is non-negotiable for heavy drinkers -- alcohol withdrawal can be fatal',
      'Replace drinking rituals with healthy routines: herbal tea at the usual drinking time, exercise after work',
      'Join a support group -- AA, SMART Recovery, or online communities provide accountability and shared experience',
    ],
  };

export default alcohol;
