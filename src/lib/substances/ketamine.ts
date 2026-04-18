import { SubstanceData } from './types';

const ketamine: SubstanceData = {
    id: 'ketamine',
    name: 'Ketamine',
    aliases: ['Ketalar', 'Ketaset', 'Ketamine Hydrochloride', 'Special K', 'Vitamin K', 'K'],
    streetNames: ['Special K', 'K', 'Jet', 'Kit Kat', 'Super K', 'Green', 'Purple', 'Horse Tranquilizer'],
    category: 'dissociative',
    schedule: 'Schedule III (PH: Regulated prescription drug, illegal possession without prescription -- penalties under RA 9165)',
    dangerLevel: 3,
    description:
      'Ketamine is a dissociative anesthetic that acts primarily as a non-competitive NMDA receptor antagonist, blocking glutamate signaling at NMDA receptors throughout the brain. Originally developed as a safer alternative to phencyclidine (PCP) for veterinary and human anesthesia, ketamine produces a unique state of dissociation -- a sense of detachment from one\'s body, environment, and sense of self (the "K-hole" at higher doses). At sub-anesthetic doses, ketamine also blocks the reuptake of dopamine and serotonin and has potent anti-inflammatory effects through inhibition of the NF-κB pathway. Remarkably, ketamine has shown rapid antidepressant effects in treatment-resistant depression, mediated through enhanced AMPA receptor signaling and increased BDNF (brain-derived neurotrophic factor) expression. However, recreational abuse causes NMDA receptor upregulation (tolerance), potential neurotoxicity (Olney\'s lesions in animal studies), severe urological damage (ketamine-induced ulcerative cystitis), and profound psychological dependence. The dissociative state can trigger lasting psychosis in susceptible individuals. In the Philippines, ketamine is diverted from veterinary sources and is popular in club and party scenes.',
    primaryDamage: {
      items: [
        'Ketamine-induced ulcerative cystitis (severe bladder damage -- urgency, hematuria, fibrosis)',
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
        'Ketamine is unique among recreational drugs in its dual nature -- it has legitimate rapid-acting antidepressant properties at sub-anesthetic doses, yet chronic recreational use causes devastating urological damage (ketamine bladder syndrome) and cognitive decline. The NMDA receptor antagonism that provides therapeutic benefit also leads to receptor upregulation and tolerance, creating a dangerous cycle of escalating use. The dissociative effects can trigger lasting psychological changes, including persistent depersonalization and psychosis in vulnerable individuals. Chronic bladder damage may be irreversible and can require surgical intervention.',
    },
    pharmacology: {
      mechanism:
        'Non-competitive antagonist at NMDA receptors (binds to the PCP site within the ion channel, blocking glutamate signaling). Also inhibits dopamine and serotonin reuptake (DAT/SERT blockade). At sub-anesthetic doses, enhances AMPA receptor throughput, increasing BDNF expression and mTOR signaling -- the basis for its rapid antidepressant effect. Activates μ-opioid receptors (contributing to analgesia). Potent inhibitor of NF-κB inflammatory pathway.',
      halfLife: 'Ketamine: 2-3 hours (primary); Norketamine (active metabolite): 4-5 hours. Duration of dissociative effects shorter than elimination half-life.',
      onset: 'Oral: 5-30 minutes; Intranasal: 5-15 minutes; IV: 30 seconds to 1 minute; IM: 3-5 minutes; Rectal: 5-15 minutes',
      peak: 'IV: 1-5 minutes; Intranasal: 15-30 minutes; Oral: 20-60 minutes; IM: 5-15 minutes',
      duration: 'IV/IM: 30-60 minutes; Intranasal: 45-90 minutes; Oral: 1-3 hours. After-effects ("afterglow" or "comedown"): 2-4 hours.',
      metabolites: 'Norketamine (active, 1/3 to 1/5 potency of parent compound), Dehydronorketamine (DHNK, inactive), Hydroxynorketamine (HNK -- may contribute to antidepressant effect). Metabolized primarily by hepatic CYP2B6, CYP2C9, and CYP3A4. Excreted renally.',
    },
    withdrawal: {
      timeline: 'Onset: 24-72 hours after last dose. Acute: 3-14 days. Subacute: 2-4 weeks. Protracted: 1-3 months',
      symptoms: [
        'Severe cravings and psychological dependence',
        'Depression and anhedonia (especially in those using for self-medication)',
        'Anxiety and panic attacks',
        'Cognitive impairment ("K-crud" -- brain fog, memory problems)',
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
        'N-Acetyl Cysteine (NAC -- bladder protection, glutathione precursor)',
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
        'Days 1-7: Acute psychological withdrawal -- cravings, depression, cognitive fog. Weeks 1-4: Sleep normalizes, mood begins stabilizing, dissociative symptoms decrease. Months 1-3: NMDA receptors begin normalizing, cognitive function improves significantly. Months 3-6: Bladder symptoms may improve (if not permanently damaged), psychological symptoms stabilize. Months 6-12: Near-complete recovery for most cognitive functions. Full recovery: 6-12 months; bladder damage and persistent perceptual disturbances may be irreversible depending on severity and duration of use.',
    },
    philippines: {
      legality: 'Prescription medication regulated by the Philippine FDA (primarily veterinary use). Possession without a valid prescription is illegal. Diversion of veterinary ketamine is a known problem. Prosecuted under RA 9165 when possessed or distributed illicitly.',
      penalties: 'Possession without prescription: may be charged under RA 9165. Unlawful sale/distribution: 12 years + 1 day to 20 years imprisonment + fine up to ₱10,000,000. Veterinary clinics that illegally distribute face license revocation and criminal charges.',
      commonForm: 'Clear liquid solution (injectable, diverted from veterinary sources -- 50mg/ml or 100mg/ml ampoules). Crystalline powder (evaporated from liquid for intranasal use). Less commonly found as pressed tablets. Intranasal use (snorting) is the most common recreational route.',
      streetPrice: 'Liquid (veterinary ampoule): ₱500-2,000 per vial. Powder: ₱1,000-3,000 per gram. Tableted: ₱200-500 per tablet. Prices vary by region and availability. More common in Metro Manila nightlife districts, Cebu, and Boracay. Often sourced from veterinary supply chains.',
    },
    harmReduction: [
      'Start with a low dose and wait 10-15 minutes before considering redosing -- onset is rapid when snorted',
      'Avoid frequent use -- bladder damage (ulcerative cystitis) is cumulative and may be irreversible',
      'Stay hydrated to protect your bladder -- ketamine is directly toxic to bladder epithelium',
      'Never mix with alcohol, other dissociatives, or stimulants -- unpredictable and dangerous interactions',
      'Use in a safe, quiet environment with trusted people present -- dissociative states can be frightening',
      'Avoid use if you have a personal or family history of psychosis or schizophrenia',
      'Monitor urinary symptoms -- seek medical help immediately if you experience pain, blood in urine, or frequent urgency',
      'Do not drive or operate machinery -- motor coordination and perception are severely impaired',
      'Limit use to once per week maximum to reduce tolerance and bladder damage',
      'Consider esketamine (Spravato) as a legal, supervised alternative if using for depression -- available through psychiatrists',
    ],
    recoveryTips: [
      'Hydration is critical -- drink at least 3 liters of water daily to support kidney and bladder recovery',
      'Omega-3 fatty acids (2-4g daily) reduce neuroinflammation and support cognitive healing',
      'Bladder pain management: DMSO supplements and cranberry extract may provide relief',
      'Abstinence allows significant NMDA receptor normalization within 3-6 months',
      'If using for depression, explore legal ketamine therapy clinics for supervised, therapeutic use',
    ],
  };

export default ketamine;
