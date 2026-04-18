import { SubstanceData } from './types';

const benzodiazepines: SubstanceData = {
    id: 'benzodiazepines',
    name: 'Benzodiazepines',
    aliases: ['Benzos', 'Diazepam', 'Alprazolam', 'Clonazepam', 'Lorazepam', 'Flunitrazepam'],
    streetNames: ['Vals', 'Xans', 'Bars', 'Kpin', 'V', 'Zannies', 'Roofies', 'Rowies', 'Jellies'],
    category: 'depressant',
    schedule: 'Schedule IV (PH: Regulated under FDA, illegal possession without prescription -- penalties under RA 9165)',
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
        'Muscle weakness and increased fall risk (especially in elderly -- hip fractures)',
        'Liver enzyme induction affecting drug metabolism (CYP3A4 interactions)',
        'Emotional blunting and inability to process natural emotions',
      ],
      summary:
        'Benzodiazepines cause profound GABAergic dysregulation through receptor downregulation and altered subunit expression. The brain becomes chronically hyperexcitable when the drug is removed, creating a withdrawal syndrome that can be more dangerous than the condition it treats. Long-term cognitive effects include measurable declines in memory, processing speed, and executive function -- some of which may be partially or fully irreversible, especially with years of daily use. The combination of benzodiazepines with opioids or alcohol is particularly lethal, accounting for a significant proportion of drug-related deaths globally.',
    },
    pharmacology: {
      mechanism:
        'Binds to the benzodiazepine site on GABA-A receptors (between α and γ subunits), acting as a positive allosteric modulator. Increases the frequency of chloride channel opening in response to GABA, enhancing inhibitory neurotransmission. Different subtypes of GABA-A receptors mediate different effects: α1 (sedation/amnesia), α2/α3 (anxiolysis/muscle relaxation), α5 (cognition). Does not directly activate GABA-A receptors -- requires endogenous GABA presence.',
      halfLife: 'Ultra-short: midazolam 1-4 hours. Short: alprazolam 6-12 hours. Intermediate: lorazepam 10-20 hours. Long: diazepam 20-50 hours (active metabolite desmethyldiazepam up to 100 hours). Longer-acting benzos produce more prolonged withdrawal.',
      onset: 'Oral: 15-60 minutes (varies by specific drug and formulation); Sublingual: 5-15 minutes (lorazepam, alprazolam); IV: 1-5 minutes; IM: 15-30 minutes',
      peak: 'Oral: 1-2 hours; IV: 5-15 minutes; Sublingual: 30-60 minutes',
      duration: 'Short-acting (alprazolam, midazolam): 4-6 hours. Intermediate (lorazepam, clonazepam): 8-12 hours. Long-acting (diazepam, clonazepam): 12-24+ hours. Duration depends on half-life and active metabolites.',
      metabolites: 'Diazepam → desmethyldiazepam (active, 36-200h half-life) → oxazepam (active). Alprazolam → α-hydroxyalprazolam (weakly active). Lorazepam (glucuronidated, no active metabolites -- preferred in liver impairment). Metabolized primarily by hepatic CYP3A4.',
    },
    withdrawal: {
      timeline: 'Short-acting benzos: onset 6-12 hours, peak 2-4 days. Long-acting benzos: onset 2-7 days, peak 1-2 weeks. Acute: 2-4 weeks. Protracted: months to over a year',
      symptoms: [
        'Severe anxiety and panic (rebound anxiety exceeding pre-treatment levels)',
        'Insomnia and severe sleep disturbances (rebound insomnia)',
        'Tremors, muscle spasms, and twitching',
        'Perceptual disturbances (visual, auditory, tactile hallucinations)',
        'Seizures (grand mal -- potentially life-threatening)',
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
        'Ashwagandha (Withania somnifera -- GABA-mimetic anxiolytic)',
        'Passionflower Extract (Passiflora -- binds GABA-A benzodiazepine site)',
        'GABA supplement (limited BBB penetration but helpful for enteric nervous system)',
        'Lemon Balm (Melissa officinalis -- GABA transaminase inhibitor)',
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
      commonForm: 'Oral tablets -- most commonly diazepam (Valium, 5mg/10mg), alprazolam (Xanax, 0.25mg/0.5mg/1mg), clonazepam (Rivotril, 0.5mg/2mg), and lorazepam (Ativan, 1mg/2mg). Occasionally diverted from pharmacies or obtained through fraudulent prescriptions. Injected forms exist but are primarily used in medical settings.',
      streetPrice: 'Alprazolam (Xanax): ₱50-150 per 1mg tablet. Diazepam (Valium): ₱30-80 per 10mg tablet. Clonazepam: ₱60-200 per 2mg tablet. Flunitrazepam (Rohypnol): ₱100-300 per tablet (rare, high demand). Prices vary significantly by availability and region. More accessible in urban areas with multiple pharmacies.',
    },
    harmReduction: [
      'NEVER stop benzodiazepines abruptly -- sudden discontinuation can cause life-threatening seizures and delirium',
      'Follow the Ashton Manual taper protocol: reduce by 10% every 1-4 weeks (slower is better)',
      'Switch to a long-acting benzodiazepine (diazepam) before tapering to stabilize blood levels',
      'Never mix with opioids or alcohol -- this combination is the leading cause of fatal polydrug overdoses',
      'Keep your prescriber informed about your use patterns and desire to reduce',
      'Supplement with magnesium, L-theanine, and ashwagandha during tapering to support GABA function',
      'Avoid driving or operating machinery while on benzodiazepines -- reaction time is significantly impaired',
      'Store medications securely to prevent misuse by others, especially youth',
      'Seek cognitive behavioral therapy (CBT) -- it has proven efficacy for anxiety and can reduce benzo dependence',
      'Join a support group -- benzo withdrawal can be isolating and understanding from peers is invaluable',
    ],
    recoveryTips: [
      'Follow the Ashton Manual taper protocol -- slow is safe, 10% reductions every 1-4 weeks',
      'L-theanine (200-400mg) can help manage anxiety naturally during the taper process',
      'Magnesium glycinate supports GABA receptor function -- take 400mg before bed',
      'Cognitive behavioral therapy (CBT) addresses the underlying anxiety that benzos were masking',
      'Expect setbacks -- benzo withdrawal is non-linear. A bad day does not erase progress.',
    ],
  };

export default benzodiazepines;
