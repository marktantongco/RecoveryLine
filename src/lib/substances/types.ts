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
  recoveryTips?: string[];
  recoveryPhases?: {
    name: string;
    timeline: string;
    neurochemicalState?: string;
    prioritySupplements: { name: string; dosage: string }[];
    dietaryFocus: string[];
    milestones: string[];
    medicalNote?: string;
  }[];
}
