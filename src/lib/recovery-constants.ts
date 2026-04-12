import { MoodInfo, SafetyRule } from './recovery-types';

export const MOODS: Record<string, MoodInfo> = {
  terrible: { emoji: '😫', label: 'Terrible', color: '#ef4444' },
  bad: { emoji: '😔', label: 'Bad', color: '#f97316' },
  guilty: { emoji: '😔', label: 'Guilty', color: '#f97316' },
  anxious: { emoji: '😰', label: 'Anxious', color: '#f59e0b' },
  okay: { emoji: '😐', label: 'Okay', color: '#eab308' },
  neutral: { emoji: '😐', label: 'Neutral', color: '#eab308' },
  good: { emoji: '🙂', label: 'Good', color: '#22c55e' },
  relieved: { emoji: '😌', label: 'Relieved', color: '#22c55e' },
  great: { emoji: '😊', label: 'Great', color: '#10b981' },
  happy: { emoji: '🙂', label: 'Happy', color: '#06b6d4' },
  high: { emoji: '🤪', label: 'High', color: '#a855f7' },
};

// Universal moods — same choices for both sober and use modes
export const UNIVERSAL_MOODS = ['great', 'good', 'relieved', 'happy', 'okay', 'neutral', 'anxious', 'guilty', 'bad', 'terrible', 'high'] as const;

// Legacy aliases kept for any remaining references
export const SOBER_MOODS = [...UNIVERSAL_MOODS];
export const USE_MOODS = [...UNIVERSAL_MOODS];

export const MEDICATIONS = [
  'SSRI (e.g., Sertraline, Fluoxetine)',
  'MAOI (e.g., Phenelzine, Tranylcypromine)',
  'Stimulant (e.g., Methylphenidate, Amphetamine)',
  'Benzodiazepine (e.g., Alprazolam, Diazepam)',
  'Antipsychotic (e.g., Olanzapine, Risperidone)',
  'Mood Stabilizer (e.g., Lithium, Valproate)',
  'Naltrexone',
  'Acamprosate',
  'Disulfiram',
];

export const SUPPLEMENTS = [
  '5-HTP',
  'L-Tyrosine',
  'L-Glutamine',
  'Magnesium',
  'B-Complex Vitamins',
  'Vitamin C',
  'Omega-3 Fish Oil',
  'Probiotics',
  'Prebiotics',
  'Ashwagandha',
  'Valerian Root',
  'Melatonin',
];

export const SAFETY_RULES: SafetyRule[] = [
  {
    id: 'rule-1',
    level: 'CRITICAL',
    medications: ['SSRI (e.g., Sertraline, Fluoxetine)', 'MAOI (e.g., Phenelzine, Tranylcypromine)'],
    supplements: ['5-HTP'],
    message: 'Serotonin Syndrome Risk',
    description:
      'Combining SSRIs/MAOIs with 5-HTP can cause dangerously high serotonin levels. This is a medical emergency. Consult your doctor immediately.',
  },
  {
    id: 'rule-2',
    level: 'WARNING',
    medications: ['Stimulant (e.g., Methylphenidate, Amphetamine)'],
    supplements: ['L-Tyrosine'],
    message: 'Blood Pressure Caution',
    description:
      'L-Tyrosine may enhance stimulant effects, potentially increasing blood pressure and heart rate. Monitor vitals closely.',
  },
  {
    id: 'rule-3',
    level: 'INFO',
    medications: [],
    supplements: ['Probiotics'],
    message: 'Synbiotic Tip',
    description:
      'Taking probiotics without prebiotics may reduce effectiveness. Consider adding a prebiotic (inulin, garlic, banana) for better gut health support.',
  },
];

export const EMERGENCY_HOTLINES = [
  { name: 'Natl. Mental Health Crisis Hotline', number: '1553', description: '24/7 mental health support' },
  { name: 'Natl. Disaster Risk Reduction', number: '911', description: 'Emergency assistance' },
  { name: 'Magsaysay Hotline', number: '1-555-8888', description: 'Substance abuse support' },
  { name: 'PWD Senior Citizen Emergency', number: '911', description: 'Emergency line' },
  { name: 'Bukas Palad Crisis Center', number: '(02) 433-1757', description: 'Counseling services' },
  { name: 'Kalahi Foundation', number: '(02) 928-3911', description: 'Drug rehabilitation referral' },
];

export const SUPPLEMENT_STORES = [
  { name: 'Healthy Options', locations: 'Multiple malls nationwide', note: 'Premium supplements, wide selection' },
  { name: 'Watsons / Mercury Drug', locations: 'Nationwide', note: 'Common pharmacies with basic supplements' },
  { name: 'Herbalife', locations: 'Mall branches', note: 'Herbal supplements & protein shakes' },
  { name: 'South Star Drug', locations: 'Visayas & Mindanao', note: 'Affordable pharmacy supplements' },
  { name: 'Lazada / Shopee', locations: 'Online', note: 'Online delivery, verify seller ratings' },
];

export const NATURAL_ALTERNATIVES = [
  { name: 'Exercise (Walking/Running)', benefit: 'Natural endorphin boost, reduces cravings' },
  { name: 'Meditation & Deep Breathing', benefit: 'Reduces anxiety, improves emotional regulation' },
  { name: 'Cold Shower Therapy', benefit: 'Increases dopamine, reduces stress' },
  { name: 'Bananas (Potassium + Tryptophan)', benefit: 'Supports mood and muscle recovery' },
  { name: 'Green Tea (L-Theanine)', benefit: 'Calming effect without drowsiness' },
  { name: 'Journaling', benefit: 'Emotional processing, self-awareness' },
  { name: 'Social Connection', benefit: 'Accountability, reduces isolation' },
  { name: 'Sunlight Exposure (AM)', benefit: 'Vitamin D, circadian rhythm regulation' },
];

export const DAY_NAMES = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export const STORAGE_KEY = 'recoveryline_v2';

export const CURRENCY = '₱';
