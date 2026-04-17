export interface SubstanceData {
  id: string;
  name: string;
  aliases: string[];
  streetNames: string[];
  category: 'stimulant' | 'empathogen' | 'depressant' | 'cannabinoid' | 'dissociative' | 'hallucinogen';
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
  cocaine: {
    id: 'cocaine',
    name: 'Cocaine',
    aliases: ['Cocaine Hydrochloride', 'Coke', 'Coca', 'Benzoylmethylecgonine', 'Blow'],
    streetNames: ['Coke', 'Crack', 'Snow', 'Blow', 'White Lady', 'Base', 'Rock', 'Tooting'],
    category: 'stimulant',
    schedule: 'Schedule II (PH: Illegal under RA 9165 — Penalty: Life imprisonment to death for large quantities)',
    dangerLevel: 5,
    description:
      'Cocaine is a powerful central nervous system stimulant derived from the leaves of the Erythroxylum coca plant. It acts primarily by blocking the dopamine transporter (DAT), preventing dopamine reuptake and causing accumulation in the synaptic cleft, producing intense euphoria and reward signaling. Cocaine also blocks serotonin (SERT) and norepinephrine (NET) transporters, contributing to its sympathomimetic effects. Crack cocaine, the freebase form, produces a more rapid and intense high due to faster absorption. Chronic cocaine use causes severe cardiovascular damage (vasoconstriction, hypertension, arrhythmia, myocardial infarction), dopaminergic neurotoxicity, cortical thinning, and profound disruption of the brain\'s reward circuitry. Cocaine use in the Philippines, while less prevalent than methamphetamine, remains a significant concern especially in urban nightlife and among higher socioeconomic groups.',
    primaryDamage: {
      items: [
        'Severe cardiovascular damage (coronary artery vasoconstriction, atherosclerosis acceleration)',
        'Dopamine receptor downregulation and reward circuitry dysfunction',
        'Prefrontal cortex thinning and impaired executive function',
        'Cerebrovascular damage and increased stroke risk',
        'Hepatotoxicity from adulterants and metabolic stress',
        'Cardiomyopathy and weakened heart muscle',
        'Nasal septum perforation (insufflation route)',
        'Cocaine-induced hypercoagulability (increased blood clotting)',
        'Chronic neuroinflammation and microglial activation',
        'Disrupted HPA axis and cortisol dysregulation',
      ],
      summary:
        'Cocaine inflicts damage primarily through intense vasoconstriction and catecholamine excess. The cardiovascular system bears the brunt — chronic users face dramatically elevated risks of heart attack, stroke, aortic dissection, and arrhythmia. Neurologically, chronic DAT blockade leads to profound dopamine receptor downregulation, rendering the user anhedonic without the drug. The combination of vascular damage and neurotoxicity makes cocaine one of the most organ-destructive substances commonly abused.',
    },
    pharmacology: {
      mechanism:
        'Blocks dopamine transporter (DAT), serotonin transporter (SERT), and norepinephrine transporter (NET), preventing reuptake and causing synaptic accumulation of these monoamines. Also blocks voltage-gated sodium channels (local anesthetic effect). Binds to sigma-1 receptors contributing to psychosis at high doses.',
      halfLife: 'Cocaine HCl: 0.5-1.5 hours; Benzoylecgonine metabolite: 7-12 hours; Cocaethylene (with alcohol): 2-3 hours (more cardiotoxic)',
      onset: 'Insufflated (snorted): 1-5 minutes; IV injection: 15-30 seconds; Smoked (crack): 3-5 seconds; Oral: 10-30 minutes',
      peak: 'Insufflated: 15-30 minutes; IV/Smoked: 1-5 minutes; Oral: 45-90 minutes',
      duration: 'Insufflated: 30-60 minutes; IV/Smoked: 5-15 minutes; Oral: 60-90 minutes',
      metabolites: 'Benzoylecgonine (primary, inactive — basis for drug testing), Ecgonine methyl ester, Cocaethylene (formed when combined with alcohol — significantly more cardiotoxic), Norcocaine (hepatotoxic). Metabolized primarily by plasma cholinesterase and liver CYP3A4.',
    },
    withdrawal: {
      timeline: 'Crash: 1-3 days; Acute withdrawal: 1-2 weeks; Subacute: 2-4 weeks; PAWS: months to over a year',
      symptoms: [
        'Profound dysphoria and anhedonia',
        'Intense fatigue and lethargy',
        'Severe cravings (especially in first week)',
        'Depression with potential suicidal ideation',
        'Anxiety and agitation',
        'Increased appetite and weight gain',
        'Vivid/unpleasant dreams and sleep disturbances',
        'Psychomotor retardation and slowed thinking',
        'Paranoia and hypersensitivity to stimuli',
        'Muscle aches and tremors',
      ],
      severity: 'severe',
      paws:
        'Post-Acute Withdrawal Syndrome from cocaine can persist for 6-18 months. Characterized by episodic cravings, anhedonic periods, mood instability, and difficulty experiencing pleasure from normally rewarding activities. Stress is the primary trigger for PAWS episodes. Dopamine receptor recovery is slow but steady, with most users reporting significant improvement by 6-12 months of continuous abstinence.',
    },
    recoveryFocus: {
      neurotransmitters: ['Dopamine', 'Serotonin', 'Norepinephrine', 'GABA', 'Glutamate', 'Endorphins'],
      organs: ['Brain (prefrontal cortex, striatum, reward circuitry)', 'Heart (cardiovascular repair)', 'Liver', 'Nasal passages (if snorted)'],
      prioritySupplements: [
        'L-Tyrosine',
        'N-Acetyl Cysteine (NAC)',
        'Magnesium Glycinate',
        'Omega-3 Fish Oil',
        'L-Glutamine',
        'Alpha-Lipoic Acid',
        'B-Complex Vitamins',
        'Coenzyme Q10 (CoQ10)',
        'Vitamin C',
        'Rhodiola Rosea',
      ],
      timeline:
        'Days 1-7: Intense crash, dopamine depletion, cravings peak. Days 7-14: Acute withdrawal subsides, energy slowly returns. Weeks 2-4: Sleep normalizes, mood begins stabilizing. Months 1-3: Dopamine receptors begin upregulating, cravings diminish. Months 3-6: Significant recovery of reward sensitivity. Months 6-12: Near-normal dopamine function, cardiovascular risks decrease. Full recovery: 12-18 months for complete neuroadaptation.',
    },
    philippines: {
      legality: 'Illegal under Republic Act No. 9165. Cocaine and crack cocaine are classified as dangerous drugs. Possession, sale, manufacture, and use are criminal offenses with severe penalties.',
      penalties: 'Possession of small quantity: 6 months + 4 years imprisonment + fine up to ₱500,000. Sale/trading: 12 years + 1 day to 20 years + fine up to ₱10,000,000. Importation/manufacturing: Life imprisonment to death + fine up to ₱50,000,000. Repeat offenses carry enhanced penalties.',
      commonForm: 'Cocaine hydrochloride powder (white crystalline powder, typically snorted). Crack cocaine (freebase "rocks" smoked in glass pipes) is less common but exists. Occasionally found as liquid for injection. Often adulterated with levamisole, lidocaine, or caffeine in the Philippine market.',
      streetPrice: '₱2,000-5,000 per gram (powder). ₱500-1,500 per "bump" or small bag. Crack rocks: ₱300-800 per piece. Prices are significantly higher than methamphetamine due to import costs. Availability varies — more common in Metro Manila, Cebu, and Boracay entertainment districts.',
    },
    harmReduction: [
      'Never use cocaine with alcohol — forms cocaethylene, a compound 30% more cardiotoxic than cocaine alone',
      'Start with the smallest possible amount and avoid redosing after the first hour',
      'Stay hydrated with electrolytes but avoid excessive water intake (syndrome of inappropriate ADH risk)',
      'Monitor your heart rate — if resting HR exceeds 110bpm or you feel chest pain, seek emergency care immediately',
      'Avoid mixing with other stimulants, Viagra (dangerous hypertensive interactions), or opioids',
      'Use clean equipment and never share straws or needles to prevent hepatitis and HIV transmission',
      'Limit use frequency — cardiotoxicity is cumulative even with "moderate" use',
      'Eat a nutritious meal before use — cocaine suppresses appetite and depletes nutrients',
      'Allow minimum 48-72 hours between uses to allow dopamine and serotonin partial recovery',
      'Know the signs of cocaine-induced heart attack: chest pain, shortness of breath, left arm pain — call emergency services immediately',
    ],
  },

  heroin: {
    id: 'heroin',
    name: 'Heroin (Diacetylmorphine)',
    aliases: ['Diacetylmorphine', 'Diamorphine', 'Smack', 'Dope', 'Brown Sugar', 'H'],
    streetNames: ['Basul', 'Tirik', 'Mud', 'Brown', 'H', 'Smack', 'Gear', 'Dope', 'Skag'],
    category: 'depressant',
    schedule: 'Schedule I (PH: Illegal under RA 9165 — Penalty: Life imprisonment to death)',
    dangerLevel: 5,
    description:
      'Heroin (diacetylmorphine) is a semi-synthetic opioid derived from morphine, which itself is extracted from the opium poppy (Papaver somniferum). Once in the brain, heroin is rapidly deacetylated to 6-monoacetylmorphine (6-MAM) and then to morphine, which binds to mu-opioid receptors (MOR) with high affinity. MOR activation produces profound analgesia, euphoria, sedation, and respiratory depression. Chronic heroin use causes severe mu-opioid receptor downregulation, disruption of the endogenous endorphin system, and catastrophic suppression of natural pain and reward pathways. The drug is particularly dangerous due to its narrow therapeutic index — the difference between a euphoric dose and a lethal dose can be very small, especially when potency varies between batches. In the Philippines, heroin use is less common than methamphetamine but represents the highest overdose mortality risk among illicit drugs, compounded by the possibility of fentanyl-adulterated product.',
    primaryDamage: {
      items: [
        'Complete suppression of endogenous endorphin production (mu-opioid receptor downregulation)',
        'Respiratory depression leading to hypoxia-related brain damage',
        'Severe constipation and gastrointestinal dysmotility (opioid bowel dysfunction)',
        'Immune system suppression and increased infection susceptibility',
        'Hormonal disruption (HPG and HPA axis suppression — low testosterone, cortisol abnormalities)',
        'Cardiovascular instability and risk of endocarditis (IV use)',
        'Hepatic damage from adulterants and chronic metabolic stress',
        'White matter degradation and impaired cognitive flexibility',
        'Neuroinflammation via toll-like receptor 4 (TLR4) activation by morphine metabolites',
        'Severe dopamine/reward circuitry disruption (inability to feel pleasure without opioids)',
      ],
      summary:
        'Heroin causes catastrophic disruption of the endogenous opioid system. By chronically stimulating mu-opioid receptors, it shuts down the brain\'s natural endorphin production, leaving the user physically dependent on the drug to function normally. Without heroin, even normal activities produce physical pain and psychological distress. The respiratory depression risk makes overdose potentially fatal within minutes, and IV use introduces risks of hepatitis B/C, HIV, endocarditis, and abscesses. Recovery requires complete rebuilding of the endorphin system — a slow process that can take 6-12 months.',
    },
    pharmacology: {
      mechanism:
        'Heroin is a prodrug — rapidly deacetylated to 6-MAM and morphine, which are the primary active compounds. These bind as full agonists to mu-opioid receptors (MOR), delta-opioid receptors (DOR), and kappa-opioid receptors (KOR) with highest affinity for MOR. MOR activation opens G-protein-coupled inwardly rectifying potassium (GIRK) channels, hyperpolarizing neurons and inhibiting neurotransmitter release. Also activates TLR4 receptors, contributing to neuroinflammation.',
      halfLife: 'Heroin: 2-6 minutes; 6-MAM: 6-25 minutes; Morphine: 2-3 hours. Duration of subjective effects longer due to active metabolites.',
      onset: 'IV injection: 10-20 seconds (rush); Insufflated: 5-10 minutes; Smoking ("chasing the dragon"): 5-15 seconds; Intramuscular: 5-8 minutes',
      peak: 'IV: 1-2 minutes; Smoking: 1-3 minutes; Insufflated: 5-15 minutes; IM: 5-10 minutes',
      duration: 'IV/Smoking: 3-5 hours; Insufflated: 3-5 hours; IM: 4-6 hours. Subjective effects shorter than detectable morphine levels.',
      metabolites: '6-Monoacetylmorphine (6-MAM, active — unique heroin metabolite used for confirmation testing), Morphine (active, primary effector), Morphine-3-glucuronide (inactive), Morphine-6-glucuronide (active, more potent than morphine). Metabolized by plasma esterases, liver CE2, and UGT2B7.',
    },
    withdrawal: {
      timeline: 'Early: 6-12 hours after last dose; Peak: 48-72 hours; Acute: 5-7 days; Protracted: weeks to months',
      symptoms: [
        'Severe muscle aches, bone pain, and joint discomfort ("kicking")',
        'Prolonged diarrhea, nausea, and vomiting',
        'Profuse sweating, piloerection ("gooseflesh"/"cold turkey")',
        'Dilated pupils, lacrimation, and rhinorrhea (runny nose)',
        'Severe anxiety, restlessness, and insomnia',
        'Yawning and repeated stretching',
        'Tachycardia, hypertension, and elevated body temperature',
        'Intense cravings (peak during acute withdrawal)',
        'Depression and emotional dysregulation',
        'Abdominal cramping and gastrointestinal distress',
      ],
      severity: 'critical',
      paws:
        'Post-Acute Withdrawal Syndrome from heroin is among the most prolonged of any substance, lasting 12-24 months or longer. Characterized by chronic low-grade pain (hyperalgesia), persistent anhedonia, depression, anxiety, sleep disturbances, and intermittent cravings. The endorphin system recovers very slowly — studies show mu-opioid receptor density may take 6-12 months to normalize. PAWS episodes are often triggered by physical pain, emotional stress, or social situations previously associated with use. Medication-assisted treatment (MAT) with buprenorphine or methadone significantly reduces PAWS severity.',
    },
    recoveryFocus: {
      neurotransmitters: ['Endorphins (endogenous opioids)', 'Dopamine', 'Serotonin', 'GABA', 'Glutamate'],
      organs: ['Brain (endorphin system, reward circuitry)', 'Gastrointestinal tract (motility restoration)', 'Liver', 'Immune system'],
      prioritySupplements: [
        'DLPA (D,L-Phenylalanine)',
        'Magnesium Glycinate',
        'L-Glutamine',
        'Omega-3 Fish Oil',
        'Probiotics (critical for GI recovery)',
        'B-Complex Vitamins',
        'Vitamin C',
        'Zinc Picolinate',
        'Ashwagandha',
        'Curcumin/Turmeric',
      ],
      timeline:
        'Days 1-7: Acute withdrawal — severe physical symptoms, peak at 48-72 hours. Days 7-14: Acute symptoms resolve, sleep and appetite slowly return. Weeks 2-4: Mood stabilizes, energy begins returning, GI function normalizes. Months 1-3: Endorphin system begins recovery, exercise tolerance improves. Months 3-6: Significant endorphin restoration, pain tolerance normalizes. Months 6-12: Near-complete opioid system recovery. Full recovery: 12-24 months for full endogenous endorphin function; some neuroadaptation may be permanent.',
    },
    philippines: {
      legality: 'Illegal under Republic Act No. 9165. Heroin is classified as a dangerous drug with the most severe penalties. Possession, sale, manufacture, importation, and use are criminal offenses.',
      penalties: 'Possession of small quantity: 6 months + 4 years imprisonment + fine up to ₱500,000. Sale/trading: 12 years + 1 day to 20 years + fine up to ₱10,000,000. Importation/manufacturing: Life imprisonment to death + fine up to ₱50,000,000. Possession of large quantities (10g+) carries life imprisonment.',
      commonForm: 'White or brown powder (insufflated, injected, or smoked). "Brown sugar" or "base heroin" (impure form, smoked). Occasionally found as black tar heroin (sticky dark substance). Adulterated with fentanyl or carfentanil is an emerging concern in Southeast Asia, dramatically increasing overdose risk.',
      streetPrice: '₱3,000-8,000 per gram. ₱500-1,500 per small bag. Black tar: ₱1,000-3,000 per "stick." Prices vary widely based on purity and supply. Heroin is less available than methamphetamine in the Philippines and commands premium prices in major cities like Metro Manila and Cebu.',
    },
    harmReduction: [
      'Always have naloxone (Narcan) available — it reverses opioid overdose within 2-5 minutes and saves lives',
      'Never use alone — have someone present who can call emergency services and administer naloxone',
      'Start with a test dose (quarter of usual) when using a new batch — potency varies wildly and can be fatal',
      'Avoid mixing with benzodiazepines, alcohol, or other CNS depressants — exponentially increases respiratory depression risk',
      'Use clean needles/syringes every time — needle exchange programs reduce HIV and hepatitis transmission',
      'Rotate injection sites to prevent abscesses, cellulitis, and vein collapse',
      'Do not attempt to detox alone — opioid withdrawal, while rarely fatal, is extremely painful and leads to high relapse rates',
      'Consider medication-assisted treatment (MAT) with buprenorphine or methadone — the gold standard for opioid recovery',
      'Stay hydrated and maintain nutrition — chronic opioid use causes severe constipation and malnutrition',
      'If someone overdoses: administer naloxone, perform rescue breathing, place in recovery position, call emergency services immediately',
    ],
  },

  alcohol: {
    id: 'alcohol',
    name: 'Alcohol (Ethanol)',
    aliases: ['Ethanol', 'Ethyl Alcohol', 'Booze', 'Liquor', 'Spirits'],
    streetNames: ['Ginebra', 'Red Horse', 'Tanduay', 'Emperador', 'Kwatro Kantos', 'Kulafu', 'Mansi', 'Lambanog'],
    category: 'depressant',
    schedule: 'Legal for adults 18+ (PH: Regulated — NOT under RA 9165 but subject to local ordinances and excise tax)',
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
      metabolites: 'Acetaldehyde (highly toxic, carcinogenic — responsible for hangover symptoms and organ damage), Acetate (less toxic, enters Krebs cycle), Fatty acid ethyl esters (FAEEs, markers of organ damage). Metabolized primarily by hepatic alcohol dehydrogenase (ADH), microsomal CYP2E1 (inducible, activated at high BAC), and catalase.',
    },
    withdrawal: {
      timeline: 'Mild: 6-12 hours after last drink; Peak: 24-72 hours; DTs risk: 48-96 hours; Subacute: 1-2 weeks; PAWS: months',
      symptoms: [
        'Tremors (hand tremor "the shakes", whole-body tremors)',
        'Autonomic hyperactivity (sweating, tachycardia, hypertension, fever)',
        'Seizures (alcohol withdrawal seizures — can be fatal)',
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
        'Thiamine (Vitamin B1) — CRITICAL for preventing Wernicke-Korsakoff',
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
      penalties: 'Legal substance — no criminal penalties for possession or consumption by adults. Sale to minors: fines and imprisonment under local ordinances and the Consumer Act. Drunk driving: penalized under the Anti-Drunk and Drugged Driving Act (RA 10586) — 3 months imprisonment and ₱20,000-80,000 fine for first offense. Public intoxication penalties vary by LGU.',
      commonForm: 'Beer (San Miguel Pale Pilsen, Red Horse), Local spirits/GIN (Ginebra San Miguel, Tanduay), Lambanog (coconut wine, 40-45% ABV), Tuba (fermented coconut sap), Emperador Brandy, Wine. Lambanog is particularly associated with rapid intoxication and alcohol poisoning incidents due to high ABV and low cost. "Kwatro Kantos" refers to cheap distilled spirits in small sachets.',
      streetPrice: 'Beer: ₱30-70 per bottle/can. Local GIN (Ginebra): ₱50-90 per 375ml. Lambanog: ₱50-150 per bottle. Tanduay: ₱60-120 per 375ml. "Kwatro Kantos" sachets: ₱10-20 each. Emperador: ₱80-200 per bottle. Very affordable and widely available from sari-sari stores to upscale establishments.',
    },
    harmReduction: [
      'Eat a substantial meal before drinking — food slows alcohol absorption and protects the stomach lining',
      'Alternate every alcoholic drink with a full glass of water to maintain hydration and slow consumption',
      'Set a drink limit before you start and stick to it — track your intake',
      'Avoid mixing different types of alcohol and avoid carbonated mixers (they accelerate absorption)',
      'Never drink and drive — use a designated driver, ride-hailing app, or public transport',
      'Know your limits — alcohol tolerance drops with age, weight loss, or liver stress',
      'Take B-vitamins and milk thistle before and after heavy drinking to support liver function',
      'Pace yourself to 1 standard drink per hour — your liver can only process about 1 unit per hour',
      'If dependent, NEVER stop abruptly — seek medical detox to prevent potentially fatal withdrawal seizures and DTs',
      'Seek help if you find yourself unable to control consumption despite wanting to stop',
    ],
  },

  benzodiazepines: {
    id: 'benzodiazepines',
    name: 'Benzodiazepines',
    aliases: ['Benzos', 'Diazepam', 'Alprazolam', 'Clonazepam', 'Lorazepam', 'Flunitrazepam'],
    streetNames: ['Vals', 'Xans', 'Bars', 'Kpin', 'V', 'Zannies', 'Roofies', 'Rowies', 'Jellies'],
    category: 'depressant',
    schedule: 'Schedule IV (PH: Regulated under FDA, illegal possession without prescription — penalties under RA 9165)',
    dangerLevel: 4,
    description:
      'Benzodiazepines are a class of psychoactive drugs that act as positive allosteric modulators of GABA-A receptors, the primary inhibitory neurotransmitter receptors in the brain. By enhancing GABA\'s effect, benzodiazepines increase chloride ion conductance, producing anxiolytic, sedative, hypnotic, muscle relaxant, and anticonvulsant effects. Common examples include diazepam (Valium), alprazolam (Xanax), clonazepam (Klonopin/Rivotril), lorazepam (Ativan), and flunitrazepam (Rohypnol). While therapeutically valuable for anxiety disorders, insomnia, and seizure management, benzodiazepines carry significant dependence and tolerance risks, especially with long-term use or high doses. Chronic use causes GABA-A receptor downregulation and subunit composition changes, creating a state of neural hyperexcitability upon discontinuation. Benzodiazepine withdrawal is potentially life-threatening, with risks of seizures, psychosis, and delirium. In the Philippines, benzodiazepines are available by prescription but are also diverted to the illicit market, with alprazolam and diazepam being the most commonly misused.',
    primaryDamage: {
      items: [
        'GABA-A receptor downregulation and subunit composition shift (α1→α5)',
        'Severe cognitive impairment (anterograde amnesia, executive dysfunction)',
        'Paradoxical disinhibition (aggression, impulsivity, emotional blunting)',
        'Chronic sedation and psychomotor retardation',
        'Increased risk of dementia with long-term use (especially in elderly)',
        'Respiratory depression (potentially fatal when combined with opioids or alcohol)',
        'Hormonal disruption (cortisol, thyroid function)',
        'Muscle weakness and increased fall risk (especially in elderly — hip fractures)',
        'Liver enzyme induction affecting drug metabolism (CYP3A4 interactions)',
        'Emotional blunting and inability to process natural emotions',
      ],
      summary:
        'Benzodiazepines cause profound GABAergic dysregulation through receptor downregulation and altered subunit expression. The brain becomes chronically hyperexcitable when the drug is removed, creating a withdrawal syndrome that can be more dangerous than the condition it treats. Long-term cognitive effects include measurable declines in memory, processing speed, and executive function — some of which may be partially or fully irreversible, especially with years of daily use. The combination of benzodiazepines with opioids or alcohol is particularly lethal, accounting for a significant proportion of drug-related deaths globally.',
    },
    pharmacology: {
      mechanism:
        'Binds to the benzodiazepine site on GABA-A receptors (between α and γ subunits), acting as a positive allosteric modulator. Increases the frequency of chloride channel opening in response to GABA, enhancing inhibitory neurotransmission. Different subtypes of GABA-A receptors mediate different effects: α1 (sedation/amnesia), α2/α3 (anxiolysis/muscle relaxation), α5 (cognition). Does not directly activate GABA-A receptors — requires endogenous GABA presence.',
      halfLife: 'Ultra-short: midazolam 1-4 hours. Short: alprazolam 6-12 hours. Intermediate: lorazepam 10-20 hours. Long: diazepam 20-50 hours (active metabolite desmethyldiazepam up to 100 hours). Longer-acting benzos produce more prolonged withdrawal.',
      onset: 'Oral: 15-60 minutes (varies by specific drug and formulation); Sublingual: 5-15 minutes (lorazepam, alprazolam); IV: 1-5 minutes; IM: 15-30 minutes',
      peak: 'Oral: 1-2 hours; IV: 5-15 minutes; Sublingual: 30-60 minutes',
      duration: 'Short-acting (alprazolam, midazolam): 4-6 hours. Intermediate (lorazepam, clonazepam): 8-12 hours. Long-acting (diazepam, clonazepam): 12-24+ hours. Duration depends on half-life and active metabolites.',
      metabolites: 'Diazepam → desmethyldiazepam (active, 36-200h half-life) → oxazepam (active). Alprazolam → α-hydroxyalprazolam (weakly active). Lorazepam (glucuronidated, no active metabolites — preferred in liver impairment). Metabolized primarily by hepatic CYP3A4.',
    },
    withdrawal: {
      timeline: 'Short-acting benzos: onset 6-12 hours, peak 2-4 days. Long-acting benzos: onset 2-7 days, peak 1-2 weeks. Acute: 2-4 weeks. Protracted: months to over a year',
      symptoms: [
        'Severe anxiety and panic (rebound anxiety exceeding pre-treatment levels)',
        'Insomnia and severe sleep disturbances (rebound insomnia)',
        'Tremors, muscle spasms, and twitching',
        'Perceptual disturbances (visual, auditory, tactile hallucinations)',
        'Seizures (grand mal — potentially life-threatening)',
        'Depersonalization and derealization',
        'Cognitive impairment (confusion, memory problems, difficulty concentrating)',
        'Autonomic instability (tachycardia, hypertension, sweating)',
        'Depression and emotional lability',
        'Nausea, vomiting, and gastrointestinal distress',
      ],
      severity: 'severe',
      paws:
        'Post-Acute Withdrawal Syndrome from benzodiazepines is often prolonged, lasting 6-24 months or longer, especially after long-term daily use. Characterized by persistent anxiety, cognitive dysfunction ("brain fog"), sleep disturbances, sensory hypersensitivity (light, sound, touch), muscle tension, and periodic waves of withdrawal symptoms. GABA-A receptor upregulation and subunit normalization occur slowly. The Ashton Manual recommends very gradual dose tapering (10% reductions every 1-4 weeks) to minimize PAWS severity. Recovery plateaus and setbacks are common but temporary.',
    },
    recoveryFocus: {
      neurotransmitters: ['GABA', 'Glutamate', 'Serotonin', 'Dopamine', 'Norepinephrine'],
      organs: ['Brain (GABA-A receptor density and subunit composition)', 'Liver (CYP enzyme recovery)', 'Nervous system'],
      prioritySupplements: [
        'L-Theanine (natural GABA modulator)',
        'Magnesium Glycinate (essential for GABA receptor function)',
        'Ashwagandha (Withania somnifera — GABA-mimetic anxiolytic)',
        'Passionflower Extract (Passiflora — binds GABA-A benzodiazepine site)',
        'GABA supplement (limited BBB penetration but helpful for enteric nervous system)',
        'Lemon Balm (Melissa officinalis — GABA transaminase inhibitor)',
        'Valerian Root (GABA-A modulator)',
        'B-Complex Vitamins',
        'Omega-3 Fish Oil',
        'Probiotics (gut-brain axis support for anxiety reduction)',
      ],
      timeline:
        'Weeks 1-4: Acute withdrawal phase (tapering slowly under medical supervision). Months 1-3: Anxiety and sleep begin improving, cognition slowly returns. Months 3-6: Significant GABA-A receptor recovery, sleep architecture normalizes. Months 6-12: Continued improvement, sensory hypersensitivity resolves. Months 12-24: Near-complete recovery for most functions. Full recovery: 6-24 months depending on duration of use and taper speed; longer use requires longer recovery.',
    },
    philippines: {
      legality: 'Prescription medication regulated by the Philippine FDA. Possession without a valid prescription is illegal. Certain benzodiazepines like flunitrazepam (Rohypnol) carry additional restrictions. Diversion of prescription benzodiazepines to the illicit market is prosecuted under RA 9165.',
      penalties: 'Possession without prescription: may be charged under RA 9165. Unlawful sale/distribution: 12 years + 1 day to 20 years imprisonment + fine up to ₱10,000,000. Illegal importation: Life imprisonment to death + fine up to ₱50,000,000. Medical practitioners prescribing outside legitimate practice face license revocation and criminal charges.',
      commonForm: 'Oral tablets — most commonly diazepam (Valium, 5mg/10mg), alprazolam (Xanax, 0.25mg/0.5mg/1mg), clonazepam (Rivotril, 0.5mg/2mg), and lorazepam (Ativan, 1mg/2mg). Occasionally diverted from pharmacies or obtained through fraudulent prescriptions. Injected forms exist but are primarily used in medical settings.',
      streetPrice: 'Alprazolam (Xanax): ₱50-150 per 1mg tablet. Diazepam (Valium): ₱30-80 per 10mg tablet. Clonazepam: ₱60-200 per 2mg tablet. Flunitrazepam (Rohypnol): ₱100-300 per tablet (rare, high demand). Prices vary significantly by availability and region. More accessible in urban areas with multiple pharmacies.',
    },
    harmReduction: [
      'NEVER stop benzodiazepines abruptly — sudden discontinuation can cause life-threatening seizures and delirium',
      'Follow the Ashton Manual taper protocol: reduce by 10% every 1-4 weeks (slower is better)',
      'Switch to a long-acting benzodiazepine (diazepam) before tapering to stabilize blood levels',
      'Never mix with opioids or alcohol — this combination is the leading cause of fatal polydrug overdoses',
      'Keep your prescriber informed about your use patterns and desire to reduce',
      'Supplement with magnesium, L-theanine, and ashwagandha during tapering to support GABA function',
      'Avoid driving or operating machinery while on benzodiazepines — reaction time is significantly impaired',
      'Store medications securely to prevent misuse by others, especially youth',
      'Seek cognitive behavioral therapy (CBT) — it has proven efficacy for anxiety and can reduce benzo dependence',
      'Join a support group — benzo withdrawal can be isolating and understanding from peers is invaluable',
    ],
  },

  ghb: {
    id: 'ghb',
    name: 'GHB (Gamma-Hydroxybutyrate)',
    aliases: ['Gamma-Hydroxybutyrate', 'Sodium Oxybate', '4-Hydroxybutanoic Acid', 'GBH', 'G'],
    streetNames: ['G', 'Liquid Ecstasy', 'Gina', 'Liquid E', 'Georgia Home Boy', 'Soap', 'Fantasy', 'Cherry Meth'],
    category: 'depressant',
    schedule: 'Schedule I (PH: Illegal under RA 9165 — Penalty similar to other dangerous drugs)',
    dangerLevel: 4,
    description:
      'GHB (gamma-hydroxybutyrate) is a naturally occurring short-chain fatty acid that acts as both a GABA-B receptor agonist and a GABA-A receptor modulator at higher concentrations. It is also an endogenous neuromodulator derived from GABA metabolism. GHB produces dose-dependent effects: at low doses it causes euphoria, sociability, and relaxation (similar to alcohol); at moderate doses it induces sedation and sleep; at high doses it causes deep unconsciousness, respiratory depression, and potentially fatal coma. GHB is particularly dangerous because the therapeutic index is very narrow — the difference between a recreational dose and an overdose can be as little as 1-2ml. The drug has gained notoriety as a "date rape drug" due to its sedative and amnesia-inducing properties combined with its colorless, odorless nature when dissolved in beverages. Chronic GHB use leads to severe GABA-B receptor downregulation, producing a withdrawal syndrome that is among the most dangerous of all substances, with risks of delirium, psychosis, and death. Bodybuilders have also misused GHB for its purported growth hormone-releasing effects.',
    primaryDamage: {
      items: [
        'GABA-B receptor downregulation and functional tolerance',
        'Severe respiratory depression risk (narrow therapeutic index)',
        'Dangerous withdrawal syndrome (delirium, psychosis, seizures, cardiovascular collapse)',
        'Rapid onset unconsciousness with high risk of aspiration/asphyxiation',
        'Amnesia and dissociation during intoxication (facilitating assault risk)',
        'Disrupted sleep architecture despite sedative use (reduced REM, disrupted slow-wave sleep)',
        'Metabolic acidosis during overdose',
        'Cardiovascular instability (bradycardia, hypotension)',
        'Urinary/fecal incontinence during unconsciousness',
        'Potential neurotoxicity with chronic high-dose use',
      ],
      summary:
        'GHB is uniquely dangerous due to its extremely narrow therapeutic index — a dose only slightly above the recreational range can cause deep coma and death from respiratory arrest. The drug\'s rapid onset and short duration often lead users to redose frequently, dramatically increasing overdose risk. GHB withdrawal is considered one of the most medically dangerous withdrawal syndromes, potentially exceeding alcohol and benzodiazepine withdrawal in severity. The combination of GABA-B receptor downregulation and the short half-life creates a state of profound neural hyperexcitability upon cessation that requires intensive medical management.',
    },
    pharmacology: {
      mechanism:
        'Acts as a full agonist at GABA-B receptors (the same receptors targeted by baclofen), producing inhibitory effects. At higher concentrations, also modulates GABA-A receptors. Binds to specific GHB receptors (GPR172A) which are distinct from GABA receptors. Stimulates growth hormone release via hypothalamic mechanisms. The euphoric effects are mediated primarily through GABA-B activation in the ventral tegmental area (VTA), indirectly modulating dopamine release. Also increases endogenous opioid activity.',
      halfLife: '20-60 minutes (very short). This extremely short half-life necessitates frequent redosing and contributes to severe withdrawal when discontinued. Users typically dose every 2-4 hours.',
      onset: 'Oral (liquid): 10-20 minutes; onset is faster on an empty stomach',
      peak: 'Oral: 20-60 minutes',
      duration: 'Oral: 1.5-3 hours (short duration leads to frequent redosing cycle)',
      metabolites: 'GHB is metabolized to succinic semialdehyde by GHB dehydrogenase, then to succinic acid (enters Krebs cycle). Small amounts metabolized to GABA. Less than 5% excreted unchanged in urine. Not metabolized by CYP450 enzymes — minimal drug interaction through hepatic metabolism. Sodium GHB (sodium oxybate/Xyrem) is the pharmaceutical form.',
    },
    withdrawal: {
      timeline: 'Onset: 1-6 hours after last dose (rapid due to short half-life). Peak: 24-72 hours. Acute: 5-14 days. Protracted: weeks to months',
      symptoms: [
        'Severe anxiety, agitation, and panic attacks',
        'Tremors, muscle rigidity, and myoclonic jerks',
        'Delirium with hallucinations and confusion',
        'Autonomic instability (tachycardia, hypertension, diaphoresis)',
        'Seizures (generalized, potentially status epilepticus)',
        'Severe insomnia (inability to sleep for days)',
        'Paranoid psychosis (may persist for weeks)',
        'Nausea, vomiting, and dehydration',
        'Tachycardia and palpitations',
        'Profound disorientation and cognitive confusion',
      ],
      severity: 'critical',
      paws:
        'Post-Acute Withdrawal Syndrome from GHB can persist for 6-18 months. Characterized by persistent anxiety, sleep disturbances (insomnia, altered sleep architecture), mood instability, cognitive dysfunction, periodic craving waves, and intermittent autonomic symptoms. GABA-B receptor recovery is gradual. Users who withdrew without medical supervision report prolonged psychological symptoms including anxiety disorders that were not present before GHB use. The high frequency of dosing creates deeply ingrained behavioral patterns that require extensive psychological support to overcome.',
    },
    recoveryFocus: {
      neurotransmitters: ['GABA (GABA-B and GABA-A)', 'Glutamate', 'Dopamine', 'Serotonin', 'Endorphins'],
      organs: ['Brain (GABA-B receptor density)', 'Heart (cardiovascular stabilization)', 'Liver', 'Nervous system'],
      prioritySupplements: [
        'L-Theanine',
        'Magnesium Glycinate',
        'Ashwagandha',
        'Passionflower Extract',
        'B-Complex Vitamins',
        'L-Glutamine',
        'Probiotics',
        'Omega-3 Fish Oil',
        'Taurine (GABA-A modulator)',
        '5-HTP',
      ],
      timeline:
        'Days 1-7: Intensive medical detox recommended (high risk of delirium/seizures). Days 7-14: Acute symptoms gradually subside, sleep may begin returning. Weeks 2-4: Anxiety decreases, cognitive function improves, autonomic symptoms resolve. Months 1-3: GABA-B receptors begin normalizing, mood stabilizes. Months 3-6: Significant recovery, sleep architecture normalizes. Months 6-12: Continued improvement, PAWS episodes become less frequent. Full recovery: 12-18 months for complete GABAergic recovery.',
    },
    philippines: {
      legality: 'Illegal under Republic Act No. 9165. GHB and its precursors (GBL, 1,4-butanediol) are classified as dangerous drugs. Possession, manufacture, sale, and use are criminal offenses. The drug\'s association with drug-facilitated sexual assault has led to additional attention from law enforcement.',
      penalties: 'Possession: 6 months + 4 years imprisonment + fine up to ₱500,000. Sale/trading: 12 years + 1 day to 20 years + fine up to ₱10,000,000. Manufacturing/importation: Life imprisonment to death + fine up to ₱50,000,000. Enhanced penalties if used in the commission of sexual assault.',
      commonForm: 'Clear, colorless liquid with a slightly salty or soapy taste (often disguised in water or alcoholic drinks). Sodium salt form as crystalline powder (dissolved in liquid before use). Concentration varies wildly in illicit preparations, making accurate dosing extremely difficult and dangerous. Bodybuilders sometimes obtain GHB or GBL (precursor) through illicit channels.',
      streetPrice: '₱200-500 per small bottle/vial (single dose). ₱1,000-3,000 per larger bottle (multiple doses). GBL (precursor): ₱500-1,500 per bottle. Prices vary and availability is sporadic, more common in nightclub scenes and bodybuilding communities in Metro Manila.',
    },
    harmReduction: [
      'Measure doses precisely with a calibrated syringe — NEVER estimate by cap or bottle size (concentration varies wildly)',
      'Start with a very low test dose (0.5-1ml) when using any new batch — overdose threshold is dangerously close to recreational dose',
      'Wait 2-3 hours before redosing — GHB effects stack rapidly and redosing too soon causes sudden coma',
      'NEVER mix with alcohol, benzodiazepines, or other CNS depressants — exponentially increases respiratory depression risk',
      'Never use alone — unconsciousness can occur rapidly and without warning',
      'Write down the time and dose of each administration to prevent accidental overdose from redosing',
      'Keep the person on their side (recovery position) if they lose consciousness to prevent aspiration',
      'Be aware of the "GHB coma" — if someone is unarousable, call emergency services immediately',
      'Watch your drink in social settings — GHB has been used as a predatory drug',
      'If dependent, seek medically supervised detox — GHB withdrawal can be fatal without medical management',
    ],
  },

  ketamine: {
    id: 'ketamine',
    name: 'Ketamine',
    aliases: ['Ketalar', 'Ketaset', 'Ketamine Hydrochloride', 'Special K', 'Vitamin K', 'K'],
    streetNames: ['Special K', 'K', 'Jet', 'Kit Kat', 'Super K', 'Green', 'Purple', 'Horse Tranquilizer'],
    category: 'dissociative',
    schedule: 'Schedule III (PH: Regulated prescription drug, illegal possession without prescription — penalties under RA 9165)',
    dangerLevel: 3,
    description:
      'Ketamine is a dissociative anesthetic that acts primarily as a non-competitive NMDA receptor antagonist, blocking glutamate signaling at NMDA receptors throughout the brain. Originally developed as a safer alternative to phencyclidine (PCP) for veterinary and human anesthesia, ketamine produces a unique state of dissociation — a sense of detachment from one\'s body, environment, and sense of self (the "K-hole" at higher doses). At sub-anesthetic doses, ketamine also blocks the reuptake of dopamine and serotonin and has potent anti-inflammatory effects through inhibition of the NF-κB pathway. Remarkably, ketamine has shown rapid antidepressant effects in treatment-resistant depression, mediated through enhanced AMPA receptor signaling and increased BDNF (brain-derived neurotrophic factor) expression. However, recreational abuse causes NMDA receptor upregulation (tolerance), potential neurotoxicity (Olney\'s lesions in animal studies), severe urological damage (ketamine-induced ulcerative cystitis), and profound psychological dependence. The dissociative state can trigger lasting psychosis in susceptible individuals. In the Philippines, ketamine is diverted from veterinary sources and is popular in club and party scenes.',
    primaryDamage: {
      items: [
        'Ketamine-induced ulcerative cystitis (severe bladder damage — urgency, hematuria, fibrosis)',
        'NMDA receptor upregulation causing tolerance and excitotoxic withdrawal',
        'Cognitive impairment (memory deficits, executive dysfunction, reduced processing speed)',
        'Increased risk of psychosis and dissociative episodes (even after cessation)',
        'Hepatobiliary damage (biliary duct dilation, liver enzyme elevation)',
        'Cardiovascular stress (tachycardia, hypertension)',
        'Gastrointestinal distress and reduced appetite',
        'Urinary tract obstruction and potential renal damage',
        'Impaired reality testing and depersonalization/derealization',
        'Potential neurotoxicity via glutamate excitotoxicity during withdrawal',
      ],
      summary:
        'Ketamine is unique among recreational drugs in its dual nature — it has legitimate rapid-acting antidepressant properties at sub-anesthetic doses, yet chronic recreational use causes devastating urological damage (ketamine bladder syndrome) and cognitive decline. The NMDA receptor antagonism that provides therapeutic benefit also leads to receptor upregulation and tolerance, creating a dangerous cycle of escalating use. The dissociative effects can trigger lasting psychological changes, including persistent depersonalization and psychosis in vulnerable individuals. Chronic bladder damage may be irreversible and can require surgical intervention.',
    },
    pharmacology: {
      mechanism:
        'Non-competitive antagonist at NMDA receptors (binds to the PCP site within the ion channel, blocking glutamate signaling). Also inhibits dopamine and serotonin reuptake (DAT/SERT blockade). At sub-anesthetic doses, enhances AMPA receptor throughput, increasing BDNF expression and mTOR signaling — the basis for its rapid antidepressant effect. Activates μ-opioid receptors (contributing to analgesia). Potent inhibitor of NF-κB inflammatory pathway.',
      halfLife: 'Ketamine: 2-3 hours (primary); Norketamine (active metabolite): 4-5 hours. Duration of dissociative effects shorter than elimination half-life.',
      onset: 'Oral: 5-30 minutes; Intranasal: 5-15 minutes; IV: 30 seconds to 1 minute; IM: 3-5 minutes; Rectal: 5-15 minutes',
      peak: 'IV: 1-5 minutes; Intranasal: 15-30 minutes; Oral: 20-60 minutes; IM: 5-15 minutes',
      duration: 'IV/IM: 30-60 minutes; Intranasal: 45-90 minutes; Oral: 1-3 hours. After-effects ("afterglow" or "comedown"): 2-4 hours.',
      metabolites: 'Norketamine (active, 1/3 to 1/5 potency of parent compound), Dehydronorketamine (DHNK, inactive), Hydroxynorketamine (HNK — may contribute to antidepressant effect). Metabolized primarily by hepatic CYP2B6, CYP2C9, and CYP3A4. Excreted renally.',
    },
    withdrawal: {
      timeline: 'Onset: 24-72 hours after last dose. Acute: 3-14 days. Subacute: 2-4 weeks. Protracted: 1-3 months',
      symptoms: [
        'Severe cravings and psychological dependence',
        'Depression and anhedonia (especially in those using for self-medication)',
        'Anxiety and panic attacks',
        'Cognitive impairment ("K-crud" — brain fog, memory problems)',
        'Flashbacks and spontaneous dissociative episodes',
        'Insomnia and disturbing dreams',
        'Irritability and mood swings',
        'Loss of appetite and nausea',
        'Muscle aches and tremors',
        'Social withdrawal and isolation',
      ],
      severity: 'moderate',
      paws:
        'Post-Acute Withdrawal Syndrome from ketamine can persist for 3-12 months. Characterized by intermittent dissociative episodes, cognitive impairment (particularly memory and attention), depression, anxiety, and cravings. Some users report persistent perceptual disturbances (visual snow, trailing, depersonalization) that may be long-lasting or permanent, especially with heavy chronic use. Urinary symptoms (urgency, frequency) from ketamine bladder syndrome may persist for months after cessation and require urological treatment.',
    },
    recoveryFocus: {
      neurotransmitters: ['Glutamate (NMDA receptor normalization)', 'Dopamine', 'Serotonin', 'GABA', 'BDNF'],
      organs: ['Bladder (ulcerative cystitis recovery)', 'Brain (NMDA receptors, cognitive function)', 'Liver', 'Kidneys', 'Gastrointestinal tract'],
      prioritySupplements: [
        'Magnesium Glycinate (NMDA receptor co-factor)',
        'N-Acetyl Cysteine (NAC — bladder protection, glutathione precursor)',
        'Omega-3 Fish Oil (anti-inflammatory, brain recovery)',
        'Alpha-Lipoic Acid',
        'L-Theanine (glutamate modulation)',
        'Probiotics',
        'B-Complex Vitamins',
        'Vitamin D3',
        'D-Mannose (bladder/urinary tract support)',
        'Curcumin/Turmeric (anti-inflammatory)',
      ],
      timeline:
        'Days 1-7: Acute psychological withdrawal — cravings, depression, cognitive fog. Weeks 1-4: Sleep normalizes, mood begins stabilizing, dissociative symptoms decrease. Months 1-3: NMDA receptors begin normalizing, cognitive function improves significantly. Months 3-6: Bladder symptoms may improve (if not permanently damaged), psychological symptoms stabilize. Months 6-12: Near-complete recovery for most cognitive functions. Full recovery: 6-12 months; bladder damage and persistent perceptual disturbances may be irreversible depending on severity and duration of use.',
    },
    philippines: {
      legality: 'Prescription medication regulated by the Philippine FDA (primarily veterinary use). Possession without a valid prescription is illegal. Diversion of veterinary ketamine is a known problem. Prosecuted under RA 9165 when possessed or distributed illicitly.',
      penalties: 'Possession without prescription: may be charged under RA 9165. Unlawful sale/distribution: 12 years + 1 day to 20 years imprisonment + fine up to ₱10,000,000. Veterinary clinics that illegally distribute face license revocation and criminal charges.',
      commonForm: 'Clear liquid solution (injectable, diverted from veterinary sources — 50mg/ml or 100mg/ml ampoules). Crystalline powder (evaporated from liquid for intranasal use). Less commonly found as pressed tablets. Intranasal use (snorting) is the most common recreational route.',
      streetPrice: 'Liquid (veterinary ampoule): ₱500-2,000 per vial. Powder: ₱1,000-3,000 per gram. Tableted: ₱200-500 per tablet. Prices vary by region and availability. More common in Metro Manila nightlife districts, Cebu, and Boracay. Often sourced from veterinary supply chains.',
    },
    harmReduction: [
      'Start with a low dose and wait 10-15 minutes before considering redosing — onset is rapid when snorted',
      'Avoid frequent use — bladder damage (ulcerative cystitis) is cumulative and may be irreversible',
      'Stay hydrated to protect your bladder — ketamine is directly toxic to bladder epithelium',
      'Never mix with alcohol, other dissociatives, or stimulants — unpredictable and dangerous interactions',
      'Use in a safe, quiet environment with trusted people present — dissociative states can be frightening',
      'Avoid use if you have a personal or family history of psychosis or schizophrenia',
      'Monitor urinary symptoms — seek medical help immediately if you experience pain, blood in urine, or frequent urgency',
      'Do not drive or operate machinery — motor coordination and perception are severely impaired',
      'Limit use to once per week maximum to reduce tolerance and bladder damage',
      'Consider esketamine (Spravato) as a legal, supervised alternative if using for depression — available through psychiatrists',
    ],
  },

  lsd: {
    id: 'lsd',
    name: 'LSD (Lysergic Acid Diethylamide)',
    aliases: ['Lysergic Acid Diethylamide', 'Acid', 'Lucy', 'LSD-25'],
    streetNames: ['Acid', 'Tabs', 'Doses', 'Hits', 'Blotters', 'Microdots', 'Window Pane', 'Sugar Cubes'],
    category: 'hallucinogen',
    schedule: 'Schedule I (PH: Illegal under RA 9165 — classified as a dangerous drug)',
    dangerLevel: 3,
    description:
      'LSD (lysergic acid diethylamide) is a semi-synthetic ergoline alkaloid and one of the most potent psychoactive substances known, with active doses measured in micrograms (μg). It acts primarily as a full agonist at serotonin 5-HT2A receptors, which is the primary mechanism responsible for its hallucinogenic effects — altered perception, synesthesia, ego dissolution, and profound changes in consciousness and thought patterns. LSD also modulates 5-HT1A, 5-HT2C, 5-HT5A, 5-HT6, 5-HT7, and dopamine D2 receptors, contributing to its complex pharmacological profile. Unlike most recreational drugs, LSD has very low physiological toxicity — LD50 in humans is estimated at 12,000-15,000 times the active dose. However, psychological risks are significant: LSD can trigger prolonged psychotic reactions (LSD psychosis) in predisposed individuals, hallucinogen persisting perception disorder (HPPD — "flashbacks"), and severe anxiety during difficult psychedelic experiences ("bad trips"). Research has shown potential therapeutic applications for LSD in treating anxiety, depression, PTSD, and substance use disorders when used in controlled, supervised settings. In the Philippines, LSD is less common than methamphetamine or MDMA but is available in urban underground markets.',
    primaryDamage: {
      items: [
        'Risk of hallucinogen persisting perception disorder (HPPD) — ongoing visual disturbances',
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
        'LSD presents an unusual risk profile — while its physiological toxicity is extremely low (virtually impossible to fatally overdose on), its psychological effects can be profound and occasionally lasting. The primary dangers are psychological: triggering latent mental illness, causing HPPD (persistent visual disturbances), and producing traumatic experiences during poorly managed trips. Unlike substances that cause progressive organ damage, LSD\'s harm is predominantly acute and psychological. However, frequent use can downregulate 5-HT2A receptors and create persistent changes in perception and cognition. Therapeutic use in controlled settings has shown remarkable efficacy for anxiety, depression, and addiction, highlighting the importance of set (mindset), setting (environment), and integration (processing the experience).',
    },
    pharmacology: {
      mechanism:
        'Full agonist at 5-HT2A receptors (primary hallucinogenic mechanism — located on cortical pyramidal neurons). Also agonist/partial agonist at 5-HT1A, 5-HT2C, 5-HT5A, 5-HT6, 5-HT7, and dopamine D2 receptors. The hallucinogenic effects are primarily mediated by 5-HT2A activation in the prefrontal cortex, which increases cortical excitability, reduces default mode network (DMN) activity (ego dissolution), and enhances cross-modal connectivity between brain regions (synesthesia). Increases glutamate release in the prefrontal cortex secondary to 5-HT2A activation.',
      halfLife: '3-5 hours (primary); extended subjective effects up to 10-12 hours due to active metabolites and receptor kinetics. LSD is one of the longest-acting classic psychedelics.',
      onset: 'Oral (blotter/tabs): 30-90 minutes; Sublingual: 15-45 minutes; Liquid (sublingual): 15-30 minutes',
      peak: 'Oral: 2.5-4 hours after ingestion (peak intensity)',
      duration: 'Oral: 8-12 hours total experience. Residual effects ("afterglow" or "tail"): 2-6 additional hours. Most intense effects in the middle 4-6 hours.',
      metabolites: 'Nor-LSD (N-desethyl-LSD, inactive), 2-oxo-3-hydroxy-LSD (O-H-LSD, inactive — primary urinary metabolite used for drug testing, detectable up to 72 hours). Iso-LSD and lumi-LSD (inactive degradation products from light exposure). Metabolized primarily by hepatic CYP2D6 and CYP3A4.',
    },
    withdrawal: {
      timeline: 'No classical physical withdrawal. Psychological aftereffects: 1-7 days. HPPD: weeks to potentially permanent.',
      symptoms: [
        'No significant physical withdrawal symptoms (LSD is not physically addictive)',
        'Transient anxiety and mood instability (1-3 days post-use)',
        'Fatigue and emotional exhaustion after intense experiences',
        'Visual disturbances (trailing, halos, geometric patterns — HPPD risk with heavy use)',
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
        'Days 1-3: Acute aftereffects resolve — sleep returns, anxiety diminishes. Days 3-7: Normal perception largely restored, psychological processing of the experience. Weeks 1-4: 5-HT2A receptor density normalizes, visual disturbances resolve for most users. Months 1-3: Any HPPD symptoms should be evaluated by a neurologist or psychiatrist. Complete psychological integration: weeks to months depending on the depth of the psychedelic experience and quality of therapeutic support.',
    },
    philippines: {
      legality: 'Illegal under Republic Act No. 9165. LSD is classified as a dangerous drug. Possession, sale, manufacture, and distribution are criminal offenses. There is no recognized medical or therapeutic use of LSD in the Philippines.',
      penalties: 'Possession: 6 months + 4 years imprisonment + fine up to ₱500,000. Sale/trading: 12 years + 1 day to 20 years + fine up to ₱10,000,000. Manufacturing/importation: Life imprisonment to death + fine up to ₱50,000,000.',
      commonForm: 'Blotter paper tabs (small squares of absorbent paper soaked in LSD solution, often decorated with artwork) — most common form. Liquid LSD (dropped on sugar cubes, candy, or directly on tongue). Occasionally found as microdots (small gelatin pills). Blotter art and branding are common identifiers. Active dose is typically 50-200 micrograms per tab.',
      streetPrice: '₱200-800 per tab (single dose blotter). ₱1,500-5,000 per "sheet" (10 tabs). Higher-dose "premium" tabs may cost ₱500-1,500 each. Price and availability vary — more accessible in underground art, music, and spiritual communities in Metro Manila. Generally less available than other party drugs.',
    },
    harmReduction: [
      'Test your substance — LSD is frequently counterfeited with NBOMe compounds (25I-NBOMe) which are significantly more dangerous and have caused deaths',
      'Start with a low dose (50-100μg for first-timers) and wait 2 hours before considering taking more',
      'Set and setting are everything — use only when in a positive mindset, with trusted people, in a safe comfortable environment',
      'Have a trusted "trip sitter" who remains sober and can help if the experience becomes overwhelming',
      'Avoid if you have a personal or family history of schizophrenia, bipolar disorder, or psychotic disorders',
      'Don\'t mix with lithium, tramadol, or other serotonergic drugs (risk of seizures and serotonin syndrome)',
      'Avoid mixing with stimulants or alcohol — increases anxiety and cardiovascular strain',
      'If having a difficult experience: change the music, move to a different room, focus on breathing, remind yourself it is temporary',
      'Allow minimum 1-2 weeks between experiences for tolerance to reset (cross-tolerance with other psychedelics lasts 3-7 days)',
      'Consider integration therapy with a trained professional after significant psychedelic experiences to process insights and emotions',
    ],
  },

  nicotine: {
    id: 'nicotine',
    name: 'Nicotine',
    aliases: ['Nicotine', 'Nicotiana', 'Cotinine', '3-(1-Methyl-2-pyrrolidinyl)pyridine', 'Nic'],
    streetNames: ['Smokes', 'Cigs', 'Yosi', 'Vape', 'Dip', 'Chew', 'Snus', 'Gudang', 'Sticks'],
    category: 'stimulant',
    schedule: 'Legal for adults 18+ (PH: Regulated under RA 9211 — NOT under RA 9165, subject to sin tax and flavor bans)',
    dangerLevel: 3,
    description:
      'Nicotine is a naturally occurring alkaloid found in the leaves of the tobacco plant (Nicotiana tabacum). It acts as an agonist at nicotinic acetylcholine receptors (nAChRs) throughout the brain and body, with the α4β2 receptor subtype being the primary mediator of nicotine addiction. Nicotine stimulates dopamine release in the nucleus accumbens (mesolimbic pathway), creating powerful reward and reinforcement signals. Simultaneously, it enhances norepinephrine (alertness), serotonin (mood), and beta-endorphin (relaxation) release, explaining its complex effects of both stimulation and relaxation depending on context. Despite nicotine\'s relatively mild acute toxicity, it is one of the most addictive substances known — comparable to or exceeding heroin and cocaine in dependence potential. This is primarily due to the rapid delivery to the brain (smoking reaches brain within 10-20 seconds), the short half-life creating frequent withdrawal cycles, and the deeply conditioned behavioral patterns surrounding smoking. The health devastation of nicotine comes not from nicotine itself but from the delivery method: combustion of tobacco produces over 7,000 chemicals, including at least 69 known carcinogens. In the Philippines, smoking rates remain high, with approximately 23.8% of adults being smokers, and the emergence of e-cigarettes/vaping has created new public health concerns, particularly among youth.',
    primaryDamage: {
      items: [
        'Severe cardiovascular damage (atherosclerosis, coronary artery disease, peripheral vascular disease)',
        'Respiratory destruction (COPD, emphysema, chronic bronchitis)',
        'Cancer risk from tobacco combustion products (lung, throat, mouth, esophageal, bladder, pancreatic)',
        'Endothelial dysfunction and impaired nitric oxide bioavailability',
        'Systemic inflammation and elevated C-reactive protein (CRP)',
        'Insulin resistance and metabolic dysregulation',
        'Accelerated skin aging and tissue hypoxia',
        'Reduced immune function and delayed wound healing',
        'Reproductive harm (reduced fertility, pregnancy complications, low birth weight)',
        'Dental and periodontal disease',
      ],
      summary:
        'While nicotine itself is relatively benign compared to its delivery system, tobacco combustion causes catastrophic systemic damage. Smoking is the single largest preventable cause of death worldwide, responsible for approximately 8 million deaths annually. The cardiovascular damage from smoking is progressive and often irreversible — atherosclerosis begins within years of starting and continues for decades. Respiratory destruction from COPD causes progressive, debilitating breathlessness. Cancer risk from the 69+ known carcinogens in tobacco smoke affects virtually every organ system. Vaping, while avoiding combustion, introduces new concerns about flavoring chemicals, heavy metal exposure, and unknown long-term effects of aerosolized propylene glycol and glycerol.',
    },
    pharmacology: {
      mechanism:
        'Agonist at nicotinic acetylcholine receptors (nAChRs), particularly α4β2 subtype (addiction), α3β4 (ganglionic/autonomic), α7 (cognitive, neuroprotection). Activation triggers dopamine release in the nucleus accumbens via ventral tegmental area (VTA) stimulation. Also releases norepinephrine (locus coeruleus — alertness), serotonin (raphe nuclei — mood), beta-endorphin (arcuate nucleus — relaxation), and glutamate (learning/memory). Additionally stimulates adrenal medulla to release epinephrine (adrenaline), causing tachycardia, hypertension, and increased blood glucose.',
      halfLife: 'Nicotine: 1-3 hours (average 2 hours). Cotinine (primary metabolite): 16-20 hours. Short half-life creates rapid withdrawal cycling, reinforcing frequent use.',
      onset: 'Smoking: 10-20 seconds (fastest drug delivery method to brain). Vaping: 5-10 seconds. Chewing tobacco/snus: 5-30 minutes. Nicotine gum/lozenge: 5-20 minutes. Nicotine patch: 1-2 hours.',
      peak: 'Smoking: 1-5 minutes (peak plasma concentration). Vaping: 3-5 minutes. Oral tobacco: 30-60 minutes. Patch: 4-8 hours (steady state).',
      duration: 'Smoking: 30-60 minutes (subjective effects fade as receptors desensitize). Vaping: 30-60 minutes. Patch: 16-24 hours. User typically re-doses every 30-60 minutes when smoking (creating hourly withdrawal cycles).',
      metabolites: 'Cotinine (primary, inactive — used as biomarker, detectable 1-4 days; up to 2 weeks in heavy users), Nicotine N-oxide (inactive), Trans-3\'-hydroxycotinine (inactive, most abundant urinary metabolite). Nornicotine (minor, active). Metabolized primarily by hepatic CYP2A6 enzyme (polymorphic — affects addiction risk and quitting success). Also metabolized by FMO3 and UGTs.',
    },
    withdrawal: {
      timeline: 'Onset: 2-4 hours after last cigarette. Peak: 2-3 days. Acute: 1-3 weeks. Subacute: 2-4 weeks. Protracted: months',
      symptoms: [
        'Intense cravings (peak in first 1-2 weeks)',
        'Irritability, frustration, and anger',
        'Anxiety and restlessness',
        'Difficulty concentrating and cognitive impairment',
        'Increased appetite and weight gain (average 2-5 kg)',
        'Depressed mood and sadness',
        'Insomnia and sleep disturbances',
        'Headaches and dizziness',
        'Fatigue and decreased energy',
        'Constipation and GI discomfort',
      ],
      severity: 'moderate',
      paws:
        'Post-Acute Withdrawal Syndrome from nicotine can persist for 3-12 months. Characterized by intermittent craving episodes triggered by situational cues (stress, social situations, after meals, morning routine), mood instability, and difficulty concentrating. The deeply conditioned behavioral and environmental associations with smoking are often the last aspects to resolve — ex-smokers may continue to experience occasional cravings years after cessation, particularly in contexts previously associated with smoking. Weight management remains a challenge during this period. Most PAWS symptoms from nicotine are manageable and gradually diminish over time.',
    },
    recoveryFocus: {
      neurotransmitters: ['Dopamine', 'Norepinephrine', 'Serotonin', 'Acetylcholine', 'Beta-endorphin'],
      organs: ['Lungs (respiratory tissue regeneration)', 'Heart and blood vessels (endothelial repair)', 'Brain (nAChR upregulation reversal)', 'Gastrointestinal tract', 'Oral cavity (dental and periodontal healing)'],
      prioritySupplements: [
        'L-Theanine (reduces anxiety and improves focus during withdrawal)',
        'N-Acetyl Cysteine (NAC — reduces cravings and supports lung health)',
        'Vitamin C (smoking depletes Vitamin C by up to 40%)',
        'Omega-3 Fish Oil (reduces inflammation, supports cardiovascular repair)',
        'B-Complex Vitamins (smoking depletes B-vitamins)',
        'Magnesium Glycinate (reduces irritability, supports relaxation)',
        'Probiotics (smoking disrupts gut microbiome)',
        'Coenzyme Q10 (supports cardiovascular and lung tissue repair)',
        'L-Tyrosine (supports dopamine production during withdrawal)',
        'Vitamin D3 (often deficient in smokers)',
      ],
      timeline:
        'Hours 1-24: Carbon monoxide clears from lungs, oxygen levels normalize. Days 1-3: Nicotine cleared from body, acute withdrawal peaks. Days 3-7: Cravings and withdrawal symptoms begin subsiding. Weeks 1-4: Circulation improves, lung function begins increasing (up to 30% improvement). Months 1-3: Coughing decreases, energy improves, senses of taste and smell enhance. Months 3-9: Lung cilia regenerate, significant cardiovascular risk reduction. Year 1: Heart disease risk drops to 50% of smoker\'s level. Year 5-10: Stroke risk drops to non-smoker level; cancer risk drops by 50%. Full recovery: 10-15 years for cancer risk to approach non-smoker levels.',
    },
    philippines: {
      legality: 'Legal for adults 18 years and older. Regulated under Republic Act No. 9211 (Tobacco Regulation Act of 2003). Subject to sin tax under RA 10351. E-cigarettes/vapes regulated under RA 11900 (Vaporized Nicotine Products Regulation Act). Graphic health warnings required on packaging. Designated smoking areas required in public places. Sale to minors prohibited.',
      penalties: 'Legal substance — no criminal penalties for possession or consumption by adults. Selling to minors: ₱500-10,000 fine and/or imprisonment. Smoking in prohibited public places: ₱500-10,000 fine per violation. Sale of non-compliant products: product seizure and fines under FDA regulations.',
      commonForm: 'Cigarettes (Fortune, Mighty, Marlboro, Winston — local and international brands). Vaping devices and e-liquids (increasingly popular among youth). Roll-your-own tobacco. Chewing tobacco (less common in the Philippines). "Yosi" is the ubiquitous Filipino term for cigarettes. Cheap local brands (Fortune at ₱2-3 per stick) make cigarettes extremely accessible.',
      streetPrice: 'Local cigarettes (Fortune, Mighty): ₱2-5 per stick, ₱30-50 per pack. Premium brands (Marlboro): ₱5-8 per stick, ₱70-120 per pack. Vaping pods: ₱100-300 per pod. Loose tobacco for rolling: ₱50-100 per pack. Extremely affordable local brands keep smoking rates high, particularly among lower-income groups.',
    },
    harmReduction: [
      'Switch to vaping as a harm reduction step — while not risk-free, vaping eliminates combustion and most carcinogens',
      'Use nicotine replacement therapy (NRT) — patches, gum, or lozenges effectively manage cravings without tar exposure',
      'Set a quit date and tell friends and family — social support significantly increases success rates',
      'Avoid triggers — identify and modify situations, people, and emotions that trigger the urge to smoke',
      'Exercise regularly — even moderate exercise significantly reduces cravings and improves mood during withdrawal',
      'Drink plenty of water — helps flush nicotine metabolites and reduces oral fixation cravings',
      'Consider bupropion (Zyban) or varenicline (Chantix) — prescription medications that double to triple quit success rates',
      'If vaping, avoid high-nicotine concentrations and sweet flavors that increase dependency risk (especially for youth)',
      'Join a quitline or support group — PDEA and DOH Philippines offer smoking cessation resources',
      'Don\'t be discouraged by relapse — most smokers require multiple quit attempts; each attempt teaches valuable coping strategies',
    ],
  },

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
      paws:
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
      paws:
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

export const SUBSTANCE_LIST = Object.values(SUBSTANCES).sort((a, b) => {
  if (b.dangerLevel !== a.dangerLevel) {
    return b.dangerLevel - a.dangerLevel;
  }
  return a.name.localeCompare(b.name);
});
export const SUBSTANCE_IDS = SUBSTANCE_LIST.map((s) => s.id);
