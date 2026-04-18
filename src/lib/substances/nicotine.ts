import { SubstanceData } from './types';

const nicotine: SubstanceData = {
    id: 'nicotine',
    name: 'Nicotine',
    aliases: ['Nicotine', 'Nicotiana', 'Cotinine', '3-(1-Methyl-2-pyrrolidinyl)pyridine', 'Nic'],
    streetNames: ['Smokes', 'Cigs', 'Yosi', 'Vape', 'Dip', 'Chew', 'Snus', 'Gudang', 'Sticks'],
    category: 'stimulant',
    schedule: 'Legal for adults 18+ (PH: Regulated under RA 9211 -- NOT under RA 9165, subject to sin tax and flavor bans)',
    dangerLevel: 3,
    description:
      'Nicotine is a naturally occurring alkaloid found in the leaves of the tobacco plant (Nicotiana tabacum). It acts as an agonist at nicotinic acetylcholine receptors (nAChRs) throughout the brain and body, with the α4β2 receptor subtype being the primary mediator of nicotine addiction. Nicotine stimulates dopamine release in the nucleus accumbens (mesolimbic pathway), creating powerful reward and reinforcement signals. Simultaneously, it enhances norepinephrine (alertness), serotonin (mood), and beta-endorphin (relaxation) release, explaining its complex effects of both stimulation and relaxation depending on context. Despite nicotine\'s relatively mild acute toxicity, it is one of the most addictive substances known -- comparable to or exceeding heroin and cocaine in dependence potential. This is primarily due to the rapid delivery to the brain (smoking reaches brain within 10-20 seconds), the short half-life creating frequent withdrawal cycles, and the deeply conditioned behavioral patterns surrounding smoking. The health devastation of nicotine comes not from nicotine itself but from the delivery method: combustion of tobacco produces over 7,000 chemicals, including at least 69 known carcinogens. In the Philippines, smoking rates remain high, with approximately 23.8% of adults being smokers, and the emergence of e-cigarettes/vaping has created new public health concerns, particularly among youth.',
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
        'While nicotine itself is relatively benign compared to its delivery system, tobacco combustion causes catastrophic systemic damage. Smoking is the single largest preventable cause of death worldwide, responsible for approximately 8 million deaths annually. The cardiovascular damage from smoking is progressive and often irreversible -- atherosclerosis begins within years of starting and continues for decades. Respiratory destruction from COPD causes progressive, debilitating breathlessness. Cancer risk from the 69+ known carcinogens in tobacco smoke affects virtually every organ system. Vaping, while avoiding combustion, introduces new concerns about flavoring chemicals, heavy metal exposure, and unknown long-term effects of aerosolized propylene glycol and glycerol.',
    },
    pharmacology: {
      mechanism:
        'Agonist at nicotinic acetylcholine receptors (nAChRs), particularly α4β2 subtype (addiction), α3β4 (ganglionic/autonomic), α7 (cognitive, neuroprotection). Activation triggers dopamine release in the nucleus accumbens via ventral tegmental area (VTA) stimulation. Also releases norepinephrine (locus coeruleus -- alertness), serotonin (raphe nuclei -- mood), beta-endorphin (arcuate nucleus -- relaxation), and glutamate (learning/memory). Additionally stimulates adrenal medulla to release epinephrine (adrenaline), causing tachycardia, hypertension, and increased blood glucose.',
      halfLife: 'Nicotine: 1-3 hours (average 2 hours). Cotinine (primary metabolite): 16-20 hours. Short half-life creates rapid withdrawal cycling, reinforcing frequent use.',
      onset: 'Smoking: 10-20 seconds (fastest drug delivery method to brain). Vaping: 5-10 seconds. Chewing tobacco/snus: 5-30 minutes. Nicotine gum/lozenge: 5-20 minutes. Nicotine patch: 1-2 hours.',
      peak: 'Smoking: 1-5 minutes (peak plasma concentration). Vaping: 3-5 minutes. Oral tobacco: 30-60 minutes. Patch: 4-8 hours (steady state).',
      duration: 'Smoking: 30-60 minutes (subjective effects fade as receptors desensitize). Vaping: 30-60 minutes. Patch: 16-24 hours. User typically re-doses every 30-60 minutes when smoking (creating hourly withdrawal cycles).',
      metabolites: 'Cotinine (primary, inactive -- used as biomarker, detectable 1-4 days; up to 2 weeks in heavy users), Nicotine N-oxide (inactive), Trans-3\'-hydroxycotinine (inactive, most abundant urinary metabolite). Nornicotine (minor, active). Metabolized primarily by hepatic CYP2A6 enzyme (polymorphic -- affects addiction risk and quitting success). Also metabolized by FMO3 and UGTs.',
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
        'Post-Acute Withdrawal Syndrome from nicotine can persist for 3-12 months. Characterized by intermittent craving episodes triggered by situational cues (stress, social situations, after meals, morning routine), mood instability, and difficulty concentrating. The deeply conditioned behavioral and environmental associations with smoking are often the last aspects to resolve -- ex-smokers may continue to experience occasional cravings years after cessation, particularly in contexts previously associated with smoking. Weight management remains a challenge during this period. Most PAWS symptoms from nicotine are manageable and gradually diminish over time.',
    },
    recoveryFocus: {
      neurotransmitters: ['Dopamine', 'Norepinephrine', 'Serotonin', 'Acetylcholine', 'Beta-endorphin'],
      organs: ['Lungs (respiratory tissue regeneration)', 'Heart and blood vessels (endothelial repair)', 'Brain (nAChR upregulation reversal)', 'Gastrointestinal tract', 'Oral cavity (dental and periodontal healing)'],
      prioritySupplements: [
        'L-Theanine (reduces anxiety and improves focus during withdrawal)',
        'N-Acetyl Cysteine (NAC -- reduces cravings and supports lung health)',
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
      penalties: 'Legal substance -- no criminal penalties for possession or consumption by adults. Selling to minors: ₱500-10,000 fine and/or imprisonment. Smoking in prohibited public places: ₱500-10,000 fine per violation. Sale of non-compliant products: product seizure and fines under FDA regulations.',
      commonForm: 'Cigarettes (Fortune, Mighty, Marlboro, Winston -- local and international brands). Vaping devices and e-liquids (increasingly popular among youth). Roll-your-own tobacco. Chewing tobacco (less common in the Philippines). "Yosi" is the ubiquitous Filipino term for cigarettes. Cheap local brands (Fortune at ₱2-3 per stick) make cigarettes extremely accessible.',
      streetPrice: 'Local cigarettes (Fortune, Mighty): ₱2-5 per stick, ₱30-50 per pack. Premium brands (Marlboro): ₱5-8 per stick, ₱70-120 per pack. Vaping pods: ₱100-300 per pod. Loose tobacco for rolling: ₱50-100 per pack. Extremely affordable local brands keep smoking rates high, particularly among lower-income groups.',
    },
    harmReduction: [
      'Switch to vaping as a harm reduction step -- while not risk-free, vaping eliminates combustion and most carcinogens',
      'Use nicotine replacement therapy (NRT) -- patches, gum, or lozenges effectively manage cravings without tar exposure',
      'Set a quit date and tell friends and family -- social support significantly increases success rates',
      'Avoid triggers -- identify and modify situations, people, and emotions that trigger the urge to smoke',
      'Exercise regularly -- even moderate exercise significantly reduces cravings and improves mood during withdrawal',
      'Drink plenty of water -- helps flush nicotine metabolites and reduces oral fixation cravings',
      'Consider bupropion (Zyban) or varenicline (Chantix) -- prescription medications that double to triple quit success rates',
      'If vaping, avoid high-nicotine concentrations and sweet flavors that increase dependency risk (especially for youth)',
      'Join a quitline or support group -- PDEA and DOH Philippines offer smoking cessation resources',
      'Don\'t be discouraged by relapse -- most smokers require multiple quit attempts; each attempt teaches valuable coping strategies',
    ],
    recoveryTips: [
      'Nicotine replacement therapy (NRT) doubles quit success rates -- patch + gum combination is most effective',
      'Exercise produces natural dopamine release that partially replaces the nicotine reward signal',
      'Vitamin C supplementation (500-1000mg) helps metabolize nicotine faster and reduce cravings',
      'Identify your smoking triggers (coffee, stress, social) and plan alternative responses in advance',
      'The worst cravings last only 3-5 minutes -- develop a "craving toolkit" of distractions (water, breathing, walking)',
    ],
  };

export default nicotine;
