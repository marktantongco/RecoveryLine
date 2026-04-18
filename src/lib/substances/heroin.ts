import { SubstanceData } from './types';

const heroin: SubstanceData = {
    id: 'heroin',
    name: 'Heroin (Diacetylmorphine)',
    aliases: ['Diacetylmorphine', 'Diamorphine', 'Smack', 'Dope', 'Brown Sugar', 'H'],
    streetNames: ['Basul', 'Tirik', 'Mud', 'Brown', 'H', 'Smack', 'Gear', 'Dope', 'Skag'],
    category: 'depressant',
    schedule: 'Schedule I (PH: Illegal under RA 9165 -- Penalty: Life imprisonment to death)',
    dangerLevel: 5,
    description:
      'Heroin (diacetylmorphine) is a semi-synthetic opioid derived from morphine, which itself is extracted from the opium poppy (Papaver somniferum). Once in the brain, heroin is rapidly deacetylated to 6-monoacetylmorphine (6-MAM) and then to morphine, which binds to mu-opioid receptors (MOR) with high affinity. MOR activation produces profound analgesia, euphoria, sedation, and respiratory depression. Chronic heroin use causes severe mu-opioid receptor downregulation, disruption of the endogenous endorphin system, and catastrophic suppression of natural pain and reward pathways. The drug is particularly dangerous due to its narrow therapeutic index -- the difference between a euphoric dose and a lethal dose can be very small, especially when potency varies between batches. In the Philippines, heroin use is less common than methamphetamine but represents the highest overdose mortality risk among illicit drugs, compounded by the possibility of fentanyl-adulterated product.',
    primaryDamage: {
      items: [
        'Complete suppression of endogenous endorphin production (mu-opioid receptor downregulation)',
        'Respiratory depression leading to hypoxia-related brain damage',
        'Severe constipation and gastrointestinal dysmotility (opioid bowel dysfunction)',
        'Immune system suppression and increased infection susceptibility',
        'Hormonal disruption (HPG and HPA axis suppression -- low testosterone, cortisol abnormalities)',
        'Cardiovascular instability and risk of endocarditis (IV use)',
        'Hepatic damage from adulterants and chronic metabolic stress',
        'White matter degradation and impaired cognitive flexibility',
        'Neuroinflammation via toll-like receptor 4 (TLR4) activation by morphine metabolites',
        'Severe dopamine/reward circuitry disruption (inability to feel pleasure without opioids)',
      ],
      summary:
        'Heroin causes catastrophic disruption of the endogenous opioid system. By chronically stimulating mu-opioid receptors, it shuts down the brain\'s natural endorphin production, leaving the user physically dependent on the drug to function normally. Without heroin, even normal activities produce physical pain and psychological distress. The respiratory depression risk makes overdose potentially fatal within minutes, and IV use introduces risks of hepatitis B/C, HIV, endocarditis, and abscesses. Recovery requires complete rebuilding of the endorphin system -- a slow process that can take 6-12 months.',
    },
    pharmacology: {
      mechanism:
        'Heroin is a prodrug -- rapidly deacetylated to 6-MAM and morphine, which are the primary active compounds. These bind as full agonists to mu-opioid receptors (MOR), delta-opioid receptors (DOR), and kappa-opioid receptors (KOR) with highest affinity for MOR. MOR activation opens G-protein-coupled inwardly rectifying potassium (GIRK) channels, hyperpolarizing neurons and inhibiting neurotransmitter release. Also activates TLR4 receptors, contributing to neuroinflammation.',
      halfLife: 'Heroin: 2-6 minutes; 6-MAM: 6-25 minutes; Morphine: 2-3 hours. Duration of subjective effects longer due to active metabolites.',
      onset: 'IV injection: 10-20 seconds (rush); Insufflated: 5-10 minutes; Smoking ("chasing the dragon"): 5-15 seconds; Intramuscular: 5-8 minutes',
      peak: 'IV: 1-2 minutes; Smoking: 1-3 minutes; Insufflated: 5-15 minutes; IM: 5-10 minutes',
      duration: 'IV/Smoking: 3-5 hours; Insufflated: 3-5 hours; IM: 4-6 hours. Subjective effects shorter than detectable morphine levels.',
      metabolites: '6-Monoacetylmorphine (6-MAM, active -- unique heroin metabolite used for confirmation testing), Morphine (active, primary effector), Morphine-3-glucuronide (inactive), Morphine-6-glucuronide (active, more potent than morphine). Metabolized by plasma esterases, liver CE2, and UGT2B7.',
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
        'Post-Acute Withdrawal Syndrome from heroin is among the most prolonged of any substance, lasting 12-24 months or longer. Characterized by chronic low-grade pain (hyperalgesia), persistent anhedonia, depression, anxiety, sleep disturbances, and intermittent cravings. The endorphin system recovers very slowly -- studies show mu-opioid receptor density may take 6-12 months to normalize. PAWS episodes are often triggered by physical pain, emotional stress, or social situations previously associated with use. Medication-assisted treatment (MAT) with buprenorphine or methadone significantly reduces PAWS severity.',
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
        'Days 1-7: Acute withdrawal -- severe physical symptoms, peak at 48-72 hours. Days 7-14: Acute symptoms resolve, sleep and appetite slowly return. Weeks 2-4: Mood stabilizes, energy begins returning, GI function normalizes. Months 1-3: Endorphin system begins recovery, exercise tolerance improves. Months 3-6: Significant endorphin restoration, pain tolerance normalizes. Months 6-12: Near-complete opioid system recovery. Full recovery: 12-24 months for full endogenous endorphin function; some neuroadaptation may be permanent.',
    },
    philippines: {
      legality: 'Illegal under Republic Act No. 9165. Heroin is classified as a dangerous drug with the most severe penalties. Possession, sale, manufacture, importation, and use are criminal offenses.',
      penalties: 'Possession of small quantity: 6 months + 4 years imprisonment + fine up to ₱500,000. Sale/trading: 12 years + 1 day to 20 years + fine up to ₱10,000,000. Importation/manufacturing: Life imprisonment to death + fine up to ₱50,000,000. Possession of large quantities (10g+) carries life imprisonment.',
      commonForm: 'White or brown powder (insufflated, injected, or smoked). "Brown sugar" or "base heroin" (impure form, smoked). Occasionally found as black tar heroin (sticky dark substance). Adulterated with fentanyl or carfentanil is an emerging concern in Southeast Asia, dramatically increasing overdose risk.',
      streetPrice: '₱3,000-8,000 per gram. ₱500-1,500 per small bag. Black tar: ₱1,000-3,000 per "stick." Prices vary widely based on purity and supply. Heroin is less available than methamphetamine in the Philippines and commands premium prices in major cities like Metro Manila and Cebu.',
    },
    harmReduction: [
      'Always have naloxone (Narcan) available -- it reverses opioid overdose within 2-5 minutes and saves lives',
      'Never use alone -- have someone present who can call emergency services and administer naloxone',
      'Start with a test dose (quarter of usual) when using a new batch -- potency varies wildly and can be fatal',
      'Avoid mixing with benzodiazepines, alcohol, or other CNS depressants -- exponentially increases respiratory depression risk',
      'Use clean needles/syringes every time -- needle exchange programs reduce HIV and hepatitis transmission',
      'Rotate injection sites to prevent abscesses, cellulitis, and vein collapse',
      'Do not attempt to detox alone -- opioid withdrawal, while rarely fatal, is extremely painful and leads to high relapse rates',
      'Consider medication-assisted treatment (MAT) with buprenorphine or methadone -- the gold standard for opioid recovery',
      'Stay hydrated and maintain nutrition -- chronic opioid use causes severe constipation and malnutrition',
      'If someone overdoses: administer naloxone, perform rescue breathing, place in recovery position, call emergency services immediately',
    ],
    recoveryTips: [
      'DLPA (D,L-Phenylalanine) helps rebuild natural endorphin production -- take on empty stomach',
      'Gentle exercise like yoga or swimming supports endorphin recovery without physical strain',
      'Consider MAT (buprenorphine/methadone) -- it is not weakness, it is evidence-based medicine',
      'Hot baths with Epsom salts can ease muscle aches and promote relaxation during withdrawal',
      'Keep naloxone accessible at all times and ensure loved ones know how to administer it',
    ],
  };

export default heroin;
