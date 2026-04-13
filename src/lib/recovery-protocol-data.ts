// ─── Recovery Foundation: Symbiotic Protocol Data ─────────────────────────────
// A comprehensive 3-part protocol for biochemical recovery
// Integrating nutritional, psychological, and lifestyle interventions

export interface ProtocolSection {
  id: string;
  name: string;
  subtitle: string;
  icon: string;
  description: string;
  principles: string[];
  phases: {
    name: string;
    timeline: string;
    actions: string[];
    supplements: { name: string; dosage: string; reason: string }[];
    nutrition: string[];
    expectedOutcomes: string[];
  }[];
  faq: { question: string; answer: string }[];
}

export const SYMBIOTIC_PROTOCOL: ProtocolSection[] = [
  {
    id: 'neurochemical-restoration',
    name: 'Neurochemical Restoration',
    subtitle: 'Rebuilding the Brain\'s Chemical Systems',
    icon: 'brain',
    description: 'The Symbiotic Protocol\'s first pillar focuses on the systematic restoration of neurotransmitter systems damaged by chronic substance use. Rather than merely suppressing withdrawal symptoms, this phase actively rebuilds the brain\'s chemical infrastructure — dopamine receptors, serotonin transporters, GABA tone, and glutamate balance — using targeted nutrition, supplementation, and behavioral interventions at each phase of recovery. The term "symbiotic" reflects the interdependence of these systems: you cannot fix dopamine without addressing serotonin, and neither functions properly without balanced glutamate and GABA.',
    principles: [
      'Neurotransmitter systems are interconnected — you must address all of them, not just one',
      'Recovery follows a non-linear path with plateaus, setbacks, and breakthroughs',
      'The brain has remarkable neuroplasticity — it can and will heal given the right conditions',
      'Nutrition is the foundation: you cannot supplement your way out of a bad diet',
      'Sleep is not optional — it is the primary time when the brain repairs itself',
      'Exercise is medicine: it is the most potent natural tool for neurotransmitter restoration',
      'Patience is the hardest and most important skill in recovery',
    ],
    phases: [
      {
        name: 'Phase 1: Stabilization',
        timeline: 'Days 1-14 (Acute Withdrawal)',
        actions: [
          'Get medical support if possible — acute withdrawal can be dangerous',
          'Focus exclusively on sleep, hydration, and basic nutrition',
          'Take foundational supplements: Magnesium Glycinate (300mg PM), B-Complex (AM), Vitamin C (500mg AM)',
          'Do not attempt to "push through" — rest is productive during this phase',
          'Remove all triggers: people, places, things, social media accounts associated with use',
          'Have a trusted support person available 24/7',
          'Use grounding techniques (5-4-3-2-1) and box breathing for anxiety/cravings',
          'Cold showers for acute anxiety (activates dive reflex within 30 seconds)',
          'Eat small, frequent, nutrient-dense meals even without appetite',
        ],
        supplements: [
          { name: 'Magnesium Glycinate', dosage: '300-400mg at bedtime', reason: 'Blocks NMDA receptors (prevents glutamate excitotoxicity), promotes sleep, reduces anxiety' },
          { name: 'B-Complex (B-50)', dosage: '1 capsule in the morning with food', reason: 'Cofactors for all neurotransmitter synthesis pathways, brain energy metabolism' },
          { name: 'Vitamin C', dosage: '500mg AM + 500mg PM', reason: 'Highest oxidative stress period — massive free radical damage, immune support' },
          { name: 'Melatonin', dosage: '0.3-1mg, 30 min before bed', reason: 'Sleep architecture is destroyed — resetting circadian rhythm is a top priority' },
          { name: 'L-Glutamine', dosage: '3-5g on empty stomach', reason: 'Repairs gut barrier, supports GABA production, reduces sugar cravings' },
          { name: 'Probiotics', dosage: '10-25 billion CFU, AM on empty stomach', reason: 'Gut barrier is compromised — LPS translocation worsens systemic inflammation and brain fog' },
        ],
        nutrition: 'Small, frequent meals (6x/day). Focus on easily digestible proteins (eggs, fish, chicken), complex carbs (oats, brown rice, kamote), and vegetables. Drink 3+ liters of water daily plus coconut water for electrolytes. Avoid sugar, caffeine, and processed food.',
        expectedOutcomes: ['Sleep begins to normalize (7-10 days)', 'Acute anxiety peaks days 3-7 then gradually decreases', 'Brain fog slowly lifts', 'First moments of genuine emotion return (often sadness — this is progress)', 'Physical cravings decrease in frequency after day 7'],
      },
      {
        name: 'Phase 2: Active Rebuilding',
        timeline: 'Days 14-90 (Early Recovery)',
        actions: [
          'Establish a daily routine — structure is your greatest ally',
          'Begin light exercise: 30-minute walk daily (boosts BDNF, dopamine naturally)',
          'Add neurotransmitter precursor supplements (L-Tyrosine AM, 5-HTP PM)',
          'Start CBT journaling: identify automatic negative thoughts and challenge them',
          'Attend support meetings (NA, SMART Recovery, online communities)',
          'Practice a contemplative technique daily (grace meditation, metta, forgiveness)',
          'Begin the "Comparative Minds" reframing exercises',
          'Eat 3 balanced meals + 2 planned snacks (never let yourself get too hungry)',
          'Track your food-mood connections in a journal',
          'Learn your personal trigger patterns and develop a relapse prevention plan',
        ],
        supplements: [
          { name: 'L-Tyrosine', dosage: '500-1000mg AM on empty stomach', reason: 'NOW we support dopamine synthesis — receptors are beginning to upregulate' },
          { name: '5-HTP', dosage: '50-100mg PM', reason: 'Serotonin precursor — restores mood and sleep. Cycle 2 weeks on, 1 week off' },
          { name: 'Omega-3 Fish Oil', dosage: '1000-2000mg EPA+DHA with meals', reason: 'Brain cell membrane repair, neuroinflammation reduction, BDNF support' },
          { name: 'NAC', dosage: '600mg AM on empty stomach', reason: 'Clinically proven to reduce cravings, supports glutathione, modulates glutamate' },
          { name: 'Zinc Picolinate', dosage: '15-30mg PM with dinner', reason: 'Testosterone support, immune function, NMDA/GABA modulation' },
          { name: 'Vitamin D3', dosage: '2000-4000 IU AM with fatty meal', reason: 'Regulates dopamine/serotonin gene expression, immune function, mood' },
          { name: 'Alpha-Lipoic Acid', dosage: '300mg AM on empty stomach', reason: 'Universal antioxidant, mitochondrial repair, crosses blood-brain barrier' },
        ],
        nutrition: 'Transition to 3 meals + 2 snacks. Prioritize protein at every meal (minimum 1g/kg body weight). Add fermented foods daily (kimchi, yogurt, atchara). Begin "rainbow eating" — different colored vegetables daily. Start cooking at home for ingredient control.',
        expectedOutcomes: ['Mood significantly improves (weeks 3-6)', 'Natural pleasures become more rewarding (food, exercise, socializing)', 'Sleep architecture normalizes (deep sleep returns)', 'Cognitive function improves (memory, focus, decision-making)', 'Cravings shift from physical to psychological', 'Energy and motivation increase noticeably', 'Emotional range returns — able to feel joy again'],
      },
      {
        name: 'Phase 3: Optimization',
        timeline: 'Months 3-12+ (Intermediate to Long-Term Recovery)',
        actions: [
          'Increase exercise intensity: strength training 3x/week + cardio 3x/week',
          'Reduce/phase off acute recovery supplements (L-Tyrosine, 5-HTP, Mucuna)',
          'Maintain foundational supplements long-term (Magnesium, Omega-3, Vitamin D3, B-Complex, Probiotics)',
          'Deepen contemplative practice: daily meditation + weekly reflection',
          'Pursue meaningful goals: career, education, relationships, creativity',
          'Build new sober social connections and activities',
          'Mentor or support newer people in recovery',
          'Practice identifying and managing PAWS episodes when they arrive',
          'Create a comprehensive relapse prevention plan with specific coping strategies',
          'Consider therapy (CBT, DBT) if accessible — work on deeper psychological patterns',
        ],
        supplements: [
          { name: 'Continue Foundation Stack', dosage: 'Magnesium, Omega-3, B-Complex, Vitamin D3, Probiotics', reason: 'These are for overall health, not just recovery. Maintain indefinitely.' },
          { name: 'Ashwagandha KSM-66', dosage: '300-600mg PM', reason: 'HPA axis normalization, cortisol management, stress resilience, sleep improvement' },
          { name: 'L-Theanine', dosage: '200mg as needed', reason: 'Daytime calm without sedation, social anxiety support, synergizes with caffeine' },
          { name: 'Phosphatidylserine', dosage: '100-300mg', reason: 'Brain cell membrane repair, cognitive enhancement, continued synaptic plasticity' },
        ],
        nutrition: 'Maintain structured eating with flexibility. Focus on whole foods, adequate protein, diverse vegetables, healthy fats. Treat food as fuel for your brain and body. Meal prep on weekends to maintain structure during busy weeks. Continue fermented foods for gut health.',
        expectedOutcomes: ['Dopamine receptor density at 80-95% of normal', 'Natural reward processing fully restored', 'Cravings rare and easily dismissed', 'Excellent sleep quality', 'High energy and physical vitality', 'Genuine confidence and self-worth', 'Emotional maturity and resilience', 'Strong sense of purpose and identity beyond recovery'],
      },
    ],
    faq: [
      {
        question: 'How long does full neurotransmitter recovery take?',
        answer: 'It depends on the substance, duration of use, and individual factors. For methamphetamine: 6-18 months for near-complete recovery. For MDMA: 6-12 months for serotonin systems. For cannabis: 3-6 months for endocannabinoid system recovery. The first 2 weeks are the hardest, 1-3 months show dramatic improvement, and 6-12 months approach full recovery for most functions.',
      },
      {
        question: 'Can I accelerate neurotransmitter recovery?',
        answer: 'Yes, through the "Big Three": (1) Targeted supplementation providing raw materials (amino acid precursors, cofactors), (2) Exercise that boosts BDNF and neurotransmitter release naturally, and (3) Sleep quality optimization. Additionally, avoiding all substances (including alcohol and cannabis) prevents further damage and allows uninterrupted healing. Nutrition is the foundation — supplements cannot compensate for a poor diet.',
      },
      {
        question: 'Why do I feel worse before I feel better?',
        answer: 'This is expected and temporary. When you stop using, neurotransmitter levels crash below baseline because receptors are downregulated AND production is suppressed. The brain is in a deficit state. Over 2-4 weeks, precursor enzymes reactivate, receptors begin upregulating, and production normalizes. Each PAWS (Post-Acute Withdrawal Syndrome) wave is less intense and shorter than the previous one. The trajectory is always upward, even when it doesn\'t feel that way.',
      },
      {
        question: 'What about PAWS (Post-Acute Withdrawal Syndrome)?',
        answer: 'PAWS consists of intermittent waves of withdrawal symptoms (depression, anxiety, brain fog, cravings) that occur after the acute withdrawal phase has passed. These waves are triggered by stress, sleep deprivation, poor nutrition, social isolation, or cue exposure. PAWS is a sign of ongoing brain healing — each wave represents your brain recalibrating. Management: maintain your supplement stack, practice stress management (box breathing, meditation), maintain routine and sleep hygiene, and remember that each wave is temporary and less severe than the last.',
      },
      {
        question: 'Should I take all supplements at once?',
        answer: 'No. Follow the phased approach: start with the foundational supplements (Magnesium, B-Complex, Vitamin C, Melatonin) during acute withdrawal (Days 1-14). Add neurotransmitter precursors (L-Tyrosine, 5-HTP) only in early recovery (Days 14+) when receptors begin upregulating. Some supplements compete for absorption and must be taken at different times. Follow the timing and stacking notes provided in the Stack Builder tool.',
      },
      {
        question: 'Can I drink alcohol or use cannabis during recovery?',
        answer: 'This is strongly discouraged, especially in the first 90 days. Both alcohol and cannabis affect neurotransmitter systems and can reset your recovery progress. Alcohol is a CNS depressant that impairs GABA rebound, disrupts sleep architecture, and damages the gut lining. Cannabis downregulates CB1 receptors and blunts motivation. If you must, wait until at least 6 months of sustained recovery, and understand that any substance use carries relapse risk. Discuss with your support network or therapist.',
      },
    ],
  },
  {
    id: 'gut-brain-axis-repair',
    name: 'Gut-Brain Axis Repair',
    subtitle: 'Restoring the Second Brain',
    icon: 'gut',
    description: 'The gut-brain axis is the bidirectional communication system between your digestive system and your brain. 95% of your body\'s serotonin is produced in the gut. The gut microbiome produces GABA, dopamine, and acetylcholine. Substance use — particularly methamphetamine (intestinal vasoconstriction), alcohol (direct toxicity), and poor nutrition — devastates this system, creating "leaky gut" that allows bacterial endotoxins to enter the bloodstream and cause systemic inflammation affecting brain function, mood, and cravings. Repairing the gut-brain axis is not optional for recovery — it is foundational.',
    principles: [
      'The gut is the "second brain" — it produces 95% of serotonin and communicates directly with the brain via the vagus nerve',
      'Leaky gut (intestinal permeability) allows bacterial endotoxins (LPS) into the bloodstream, causing neuroinflammation',
      'The gut microbiome can be rebuilt with targeted nutrition, probiotics, and lifestyle changes',
      'Healing the gut reduces cravings, improves mood, sharpens cognition, and strengthens immunity',
      'Stress damages the gut (cortisol increases intestinal permeability) — the gut-brain connection goes both ways',
      'Fiber is the primary food for beneficial gut bacteria — the Philippine diet is often fiber-deficient',
    ],
    phases: [
      {
        name: 'Phase 1: Gut Stabilization',
        timeline: 'Days 1-30',
        actions: [
          'Remove gut irritants: alcohol, processed food, excess sugar, artificial sweeteners',
          'Start probiotics (10-25 billion CFU, multi-strain, on empty stomach)',
          'Drink Gut-Heal Elixir daily (papaya, aloe, ginger, chia)',
          'Eat prebiotic foods: banana, garlic, onion, kamote, oats',
          'Chew food thoroughly (digestion begins in the mouth)',
          'Eat fermented foods: atchara, kimchi, yogurt, burong mangga',
          'Take L-Glutamine (3-5g/day) — primary fuel for intestinal cell repair',
          'Manage stress (box breathing, meditation) — stress directly damages the gut',
        ],
        supplements: [
          { name: 'Probiotics (Multi-Strain)', dosage: '10-25 billion CFU, AM empty stomach', reason: 'Restores beneficial bacteria populations that produce neurotransmitters locally in the gut' },
          { name: 'L-Glutamine', dosage: '3-5g AM on empty stomach', reason: 'Primary fuel for enterocytes — directly repairs intestinal tight junctions and gut barrier' },
          { name: 'NAC (N-Acetyl Cysteine)', dosage: '600mg AM empty stomach', reason: 'Breaks down biofilms protecting harmful bacteria, supports glutathione in gut lining' },
          { name: 'Zinc Carnosine', dosage: '75mg twice daily', reason: 'Specific compound for stomach/intestinal lining repair, mucosal protection' },
        ],
        nutrition: 'Bone broth daily (collagen for gut lining repair). Fermented foods with every meal. Prebiotic fiber from bananas, garlic, onions, asparagus, oats. Avoid NSAIDs (ibuprofen, aspirin) which damage gut lining. Gradually increase fiber to avoid gas/bloating.',
        expectedOutcomes: ['Reduced bloating and digestive discomfort', 'Improved stool regularity', 'Brain fog begins to lift (less LPS in bloodstream)', 'Reduced sugar cravings (stabilized blood sugar)', 'Improved mood (better serotonin production from healed gut)'],
      },
      {
        name: 'Phase 2: Microbiome Rebuild',
        timeline: 'Months 1-6',
        actions: [
          'Continue daily probiotics — consider rotating brands for diversity',
          'Eat 30+ different plant foods per week (diversity feeds diverse bacteria)',
          'Include polyphenol-rich foods: dark chocolate, berries, green tea',
          'Minimize antibiotic use (kills beneficial bacteria)',
          'Add prebiotic supplements if needed (inulin, FOS powder)',
          'Regular exercise boosts microbiome diversity',
          'Get adequate sleep (microbiome has a circadian rhythm too)',
          'Limit artificial sweeteners and emulsifiers (damage gut lining)',
        ],
        supplements: [
          { name: 'Continue Probiotics', dosage: '10-25 billion CFU daily', reason: 'Long-term maintenance of healthy gut microbiome' },
          { name: 'Omega-3 Fish Oil', dosage: '1000-2000mg EPA+DHA', reason: 'Reduces intestinal inflammation, supports gut mucosa' },
          { name: 'Prebiotic Fiber (Inulin/FOS)', dosage: '5-10g daily', reason: 'Feeds beneficial bacteria, produces short-chain fatty acids (butyrate) that strengthen gut barrier' },
        ],
        nutrition: 'Diverse, fiber-rich diet. Aim for "eat the rainbow" — different colored vegetables provide different polyphenols that feed different bacterial species. Include resistant starch (cooled rice, green bananas) which feeds butyrate-producing bacteria. Continue fermented foods. Minimize processed food.',
        expectedOutcomes: ['Significant improvement in mood stability', 'Enhanced cognitive function', 'Stronger immune system', 'Reduced anxiety and depression', 'Normal appetite regulation', 'Improved energy levels'],
      },
    ],
    faq: [
      {
        question: 'Why is gut health important for recovery from addiction?',
        answer: 'The gut produces 95% of your serotonin, significant amounts of GABA and dopamine, and communicates with the brain via the vagus nerve. When the gut is damaged (leaky gut), bacterial endotoxins enter the bloodstream and cause neuroinflammation — brain inflammation that impairs mood, cognition, and increases cravings. Healing the gut literally heals the brain from the bottom up.',
      },
      {
        question: 'What Filipino foods support gut health?',
        answer: 'Atchara (pickled papaya) — natural probiotics. Burong mangga (pickled mango) — fermented, probiotic-rich. Kimchi — excellent probiotic source (available at most groceries). Yogurt — live cultures. Kintsay (Chinese celery) — prebiotic fiber. Malunggay — supports beneficial bacteria. Kamote (sweet potato) — prebiotic fiber. Saba banana — resistant starch when cooled (feeds good bacteria). Lukewarm calamansi water in the morning — stimulates digestion.',
      },
      {
        question: 'How long does it take to heal the gut?',
        answer: 'The intestinal lining regenerates every 3-5 days, so significant improvement is possible within 1-2 weeks with proper support. The microbiome takes longer to fully rebuild — 3-6 months for significant diversity restoration. Complete gut-brain axis recovery parallels overall recovery: 6-12 months for most functions. Consistent probiotic use, diverse plant foods, and stress management accelerate the process.',
      },
    ],
  },
  {
    id: 'lifestyle-synergy',
    name: 'Lifestyle Synergy',
    subtitle: 'Creating the Conditions for Lasting Recovery',
    icon: 'lifestyle',
    description: 'The third pillar recognizes that recovery is not just about supplements and nutrition — it is about creating a lifestyle that makes sustained recovery the path of least resistance. This section integrates sleep optimization, exercise science, social connection, stress management, and purpose-building into a coherent framework that supports and amplifies the neurochemical and gut-brain repair from the other two pillars.',
    principles: [
      'Recovery is not about white-knuckling through each day — it is about building a life where recovery is natural',
      'Every habit either supports or undermines your brain\'s healing process',
      'The "Big Five" recovery habits: Sleep, Exercise, Nutrition, Connection, Purpose',
      'Environment is stronger than willpower — design your environment for success',
      'Boredom is the #1 relapse trigger — a meaningful life is the best relapse prevention',
      'Your social circle is your future — you become the average of the people you spend time with',
    ],
    phases: [
      {
        name: 'Phase 1: Survival Structure',
        timeline: 'Days 1-30',
        actions: [
          'Fix sleep schedule: same bedtime/wake time every day, even weekends',
          'Daily walk: 30 minutes (even if slow) — non-negotiable',
          'Eat 3 meals at regular times — hunger triggers cravings',
          'Daily gratitude practice (5 minutes before bed)',
          'Attend 1 support meeting per week (minimum)',
          'Remove all paraphernalia, dealer contacts, and triggering social media',
          'Create a "morning recovery protocol" — first 30 minutes set the tone for the day',
          'Screen-free hour before bed',
        ],
        supplements: [
          { name: 'Melatonin', dosage: '0.3-1mg, 30 min before bed', reason: 'Sleep architecture repair — the most critical lifestyle intervention' },
          { name: 'Magnesium Glycinate', dosage: '300-400mg PM', reason: 'Sleep quality, muscle relaxation, anxiety reduction' },
        ],
        nutrition: 'Consistent meal times. No eating after 8 PM. Limit caffeine to before noon. Coconut water for hydration. Green tea for L-theanine (afternoon calm focus).',
        expectedOutcomes: ['Established daily routine provides stability', 'Sleep quality improves measurably', 'Physical cravings decrease', 'First genuine sober friendships form', 'Sense of agency returns'],
      },
      {
        name: 'Phase 2: Growth Building',
        timeline: 'Months 1-6',
        actions: [
          'Increase exercise: strength training 2-3x/week + cardio 3-5x/week',
          'Build a sober social network (recovery meetings, exercise groups, classes)',
          'Learn a new skill (music, language, sport, craft) — neuroplasticity is highest during recovery',
          'Set 3-month, 6-month, and 12-month recovery goals',
          'Begin therapy (CBT, DBT) if accessible',
          'Create a "sober fun list" — 20 activities you genuinely enjoy without substances',
          'Volunteer or help others in recovery — service work accelerates your own healing',
          'Practice a contemplative technique daily (meditation, journaling, prayer)',
          'Repair relationships damaged during active use',
          'Practice identifying and managing PAWS episodes',
        ],
        supplements: [
          { name: 'Ashwagandha KSM-66', dosage: '300-600mg PM', reason: 'HPA axis normalization, stress resilience, sleep quality' },
          { name: 'L-Theanine', dosage: '100-200mg as needed', reason: 'Daytime calm without sedation, social anxiety support' },
          { name: 'Vitamin D3 + K2', dosage: '2000-5000 IU D3 + 100mcg K2', reason: 'Mood regulation, immune support, bone health' },
        ],
        nutrition: 'Meal prep on weekends. Maintain diverse, whole-food diet. Continue fermented foods. Adequate protein for muscle recovery (if exercising). Pre-workout: complex carbs + caffeine (before noon). Post-workout: protein within 30 minutes.',
        expectedOutcomes: ['Exercise becomes genuinely enjoyable', 'New identity as an active, capable person', 'Deep, meaningful sober friendships', 'Career/educational goals advancing', 'Comprehensive relapse prevention plan in place', 'PAWS episodes manageable with practiced tools'],
      },
    ],
    faq: [
      {
        question: 'How important is exercise really for recovery?',
        answer: 'Extremely important. Exercise is the single most potent natural intervention for brain recovery. It boosts BDNF (brain-derived neurotrophic factor) by 200-300%, increases dopamine and serotonin availability, reduces cortisol, improves sleep, builds self-efficacy, provides natural reward processing, and creates new neural pathways that compete with substance-use memories. Research shows that regular exercise reduces relapse rates by up to 50% and significantly reduces PAWS symptoms. Even a 30-minute walk daily produces measurable brain benefits.',
      },
      {
        question: 'What should my morning recovery routine look like?',
        answer: 'The first 30-60 minutes of your day determine its trajectory. A recovery-optimized morning: (1) Wake up at the same time daily, (2) Hydrate immediately (water + calamansi + pinch of sea salt), (3) 5 minutes of gratitude journaling or contemplative practice, (4) 10-30 minutes of exercise (even walking), (5) Nutrient-dense breakfast within 1 hour of waking (eggs, whole grain, fruit), (6) Set 3 daily intentions. This routine takes 45-60 minutes and sets up your neurochemistry, blood sugar, and psychology for a successful day.',
      },
      {
        question: 'How do I deal with boredom during recovery?',
        answer: 'Boredom is the #1 relapse trigger and is expected during early recovery. The brain is adjusting to life without the intense dopamine spikes of substance use, making normal activities feel flat and unrewarding. Solutions: (1) Accept boredom as a healing phase — it means your brain is recalibrating, (2) Build a "boredom protocol" — a list of activities to do when boredom hits, (3) Pursue novelty — the brain needs new experiences to build new neural pathways, (4) Learn a skill that requires focus (instrument, language, craft) — flow state produces natural dopamine, (5) Socialize — connection releases oxytocin and reduces boredom, (6) Exercise — the most reliable natural dopamine boost available.',
      },
    ],
  },
];
