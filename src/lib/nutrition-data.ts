// ─── Nutrition & Juices Data ───────────────────────────────────────────────
// Evidence-based nutritional reconstruction for substance recovery
// Designed for the Philippines — uses locally available ingredients

export interface JuiceRecipe {
  id: string;
  name: string;
  tagline: string;
  category: 'detox' | 'brain-repair' | 'gut-heal' | 'energy' | 'calm' | 'immunity';
  prepTime: string;
  servings: number;
  ingredients: { item: string; amount: string; benefit: string }[];
  instructions: string[];
  science: string;
  bestTime: string;
  calories: number;
  difficulty: 'Easy' | 'Medium';
  phNotes: string;
}

export interface NutritionProtocol {
  id: string;
  name: string;
  phase: string;
  description: string;
  principles: string[];
  mealStructure: { meal: string; timing: string; foods: string[]; avoid: string[] }[];
  keyNutrients: { nutrient: string; why: string; sources: string }[];
  hydration: string;
  phTips: string;
}

export interface NutrientGuide {
  id: string;
  name: string;
  category: 'vitamin' | 'mineral' | 'amino-acid' | 'fatty-acid' | 'antioxidant' | 'phytonutrient';
  role: string;
  deficiencySymptoms: string[];
  recoveryImportance: string;
  foodSources: string[];
  phSources: string[];
  dailyTarget: string;
  timing: string;
  cautions: string;
}

// ─── JUICE RECIPES ──────────────────────────────────────────────────────────

export const JUICE_RECIPES: JuiceRecipe[] = [
  {
    id: 'brain-fuel-green',
    name: 'Brain Fuel Green Juice',
    tagline: 'Dopamine + Serotonin Support',
    category: 'brain-repair',
    prepTime: '5 min',
    servings: 1,
    ingredients: [
      { item: 'Malunggay (Moringa) leaves', amount: '1 cup packed', benefit: 'Complete amino acid profile, supports dopamine synthesis' },
      { item: 'Banana (saba or lakatan)', amount: '1 medium', benefit: 'Potassium, tryptophan for serotonin, vitamin B6' },
      { item: 'Calamansi juice', amount: '2 tbsp', benefit: 'Vitamin C — regenerates glutathione' },
      { item: 'Coconut water', amount: '1 cup', benefit: 'Electrolytes, cytokinins for cellular repair' },
      { item: 'Honey', amount: '1 tsp (optional)', benefit: 'Natural sweetener, mild antimicrobial' },
    ],
    instructions: [
      'Wash malunggay leaves thoroughly and remove stems',
      'Peel banana and cut into chunks',
      'Add all ingredients to blender with coconut water',
      'Blend on high for 60 seconds until smooth',
      'Strain if desired (pulp contains fiber — consider keeping it)',
      'Drink immediately for maximum nutrient potency',
    ],
    science: 'Malunggay is one of the most nutrient-dense plants on earth, containing all essential amino acids including L-tyrosine (dopamine precursor) and L-tryptophan (serotonin precursor). Combined with banana (vitamin B6 cofactor for neurotransmitter conversion) and calamansi (vitamin C for glutathione recycling), this juice provides raw materials for brain repair.',
    bestTime: 'Morning — within 30 minutes of waking',
    calories: 180,
    difficulty: 'Easy',
    phNotes: 'Malunggay grows wild across the Philippines and is free. Available at palengkes nationwide. Saba banana is the cheapest fruit in the country.',
  },
  {
    id: 'gut-heal-elixir',
    name: 'Gut-Heal Elixir',
    tagline: 'Leaky Gut Repair + Microbiome Restore',
    category: 'gut-heal',
    prepTime: '10 min',
    servings: 1,
    ingredients: [
      { item: 'Papaya (ripe)', amount: '1 cup cubed', benefit: 'Papain enzyme — aids protein digestion, reduces gut inflammation' },
      { item: 'Aloe vera gel (fresh)', amount: '2 tbsp', benefit: 'Mucilaginous — coats and heals intestinal lining' },
      { item: 'Carrot', amount: '1 medium', benefit: 'Beta-carotene, supports intestinal mucosa repair' },
      { item: 'Ginger (luya)', amount: '1 inch piece', benefit: 'Anti-inflammatory, reduces gut spasms and nausea' },
      { item: 'Coconut water', amount: '1/2 cup', benefit: 'Electrolytes, supports hydration of gut lining' },
      { item: 'Chia seeds', amount: '1 tbsp', benefit: 'Mucilage fiber — feeds beneficial gut bacteria, forms protective gel' },
    ],
    instructions: [
      'Scoop fresh aloe vera gel (avoid outer leaf skin — can be laxative)',
      'Peel and chop carrot into small pieces for easier blending',
      'Peel ginger and slice thinly',
      'Add papaya, carrot, ginger, and coconut water to blender',
      'Blend until completely smooth (60-90 seconds)',
      'Pour into glass and stir in chia seeds',
      'Let chia seeds soak for 5 minutes before drinking (forms protective gel)',
    ],
    science: 'Methamphetamine use causes severe intestinal vasoconstriction, leading to ischemic damage and "leaky gut" (increased intestinal permeability). This allows bacterial endotoxins (LPS) to enter the bloodstream, causing systemic inflammation that impairs brain function. This elixir addresses all three pillars of gut repair: papain (enzyme support for digestion), aloe mucilage (physical coating of damaged intestinal lining), and chia fiber (prebiotic to feed beneficial bacteria and form a protective gel layer).',
    bestTime: 'Morning on empty stomach — 30 min before breakfast',
    calories: 150,
    difficulty: 'Easy',
    phNotes: 'Papaya and aloe vera grow abundantly in the Philippines. Fresh aloe vera can be found at palengkes or grown at home. Chia seeds are available at Healthy Options, Watsons, Lazada.',
  },
  {
    id: 'liver-detox-citrus',
    name: 'Liver Detox Citrus Blast',
    tagline: 'Phase I/II Detoxification Support',
    category: 'detox',
    prepTime: '5 min',
    servings: 1,
    ingredients: [
      { item: 'Calamansi juice', amount: '4 pcs squeezed', benefit: 'Vitamin C — cofactor for liver detoxification enzymes' },
      { item: 'Dalandan (sweet orange)', amount: '1 pc', benefit: 'D-Limonene — enhances Phase I and Phase II liver detox' },
      { item: 'Carrot', amount: '1 large', benefit: 'Beta-carotene — protects hepatocytes (liver cells)' },
      { item: 'Apple (Fuji or local)', amount: '1/2', benefit: 'Pectin fiber — binds toxins for elimination' },
      { item: 'Turmeric (luyang dilaw)', amount: '1 inch piece', benefit: 'Curcumin — boosts glutathione, anti-inflammatory' },
      { item: 'Black pepper', amount: '1 pinch', benefit: 'Piperine — increases curcumin absorption by 2000%' },
      { item: 'Water', amount: '1/2 cup', benefit: 'Hydration for toxin elimination' },
    ],
    instructions: [
      'Peel dalandan and remove seeds',
      'Peel and chop carrot into small pieces',
      'Peel turmeric (use gloves — stains fingers)',
      'Add dalandan segments to blender first',
      'Add carrot, turmeric, apple, calamansi juice, and water',
      'Blend on high for 60 seconds',
      'Add a pinch of black pepper and stir',
      'Drink immediately — calamansi oxidizes quickly',
    ],
    science: 'The liver is the primary organ responsible for metabolizing substances and their byproducts. Chronic use overwhelms the liver\'s two-phase detoxification system. This juice supports both phases: Vitamin C and limonene support Phase I (cytochrome P450 enzymes), while curcumin (activated by piperine) boosts Phase II conjugation pathways, particularly glutathione-S-transferase. Apple pectin binds partially metabolized toxins in the gut, preventing reabsorption (enterohepatic recirculation).',
    bestTime: 'Morning — between breakfast and lunch',
    calories: 160,
    difficulty: 'Easy',
    phNotes: 'Calamansi and dalandan are available at every palengke and sari-sari store in the Philippines. Fresh luyang dilaw (turmeric) is a staple in Filipino cooking and extremely affordable.',
  },
  {
    id: 'calm-and-repair',
    name: 'Calm & Repair Smoothie',
    tagline: 'GABA Boost + Cortisol Reduction',
    category: 'calm',
    prepTime: '5 min',
    servings: 1,
    ingredients: [
      { item: 'Banana (latundan or lakatan)', amount: '1 large', benefit: 'Tryptophan + B6 → serotonin, potassium for nerve function' },
      { item: 'Sweet potato (kamote)', amount: '1/2 cup cooked', benefit: 'Complex carbs → steady blood sugar → reduced cortisol' },
      { item: 'Almond milk or coconut milk', amount: '1 cup', benefit: 'Magnesium from almonds, MCTs from coconut' },
      { item: 'Peanut butter', amount: '1 tbsp', benefit: 'Tryptophan, magnesium, healthy fats for brain' },
      { item: 'Cacao powder (tablea)', amount: '1 tbsp', benefit: 'Theobromine — mild stimulant, anandamide (bliss molecule)' },
      { item: 'Honey', amount: '1 tsp', benefit: 'Natural sweetener, mild prebiotic' },
    ],
    instructions: [
      'Cook sweet potato if not already prepared (boil or steam, 15 min)',
      'Add all ingredients to blender with almond/coconut milk',
      'Blend on high for 60 seconds until creamy',
      'Add ice if desired for a thicker texture',
      'Enjoy slowly — savor the flavor as a mindfulness practice',
    ],
    science: 'This smoothie combines multiple pathways to promote calm: tryptophan from banana and peanut butter (serotonin precursor), magnesium from almond milk (NMDA receptor modulation, GABA enhancement), complex carbs from kamote (steady glucose = stable cortisol), and cacao/tablea which contains theobromine (mild, non-jittery stimulant) and anandamide (the "bliss molecule" that binds to CB1 receptors, mimicking THC\'s calming effects without psychoactivity). This combination is particularly effective for afternoon anxiety and PAWS episodes.',
    bestTime: 'Afternoon (3-5 PM) — when cortisol naturally dips and anxiety peaks',
    calories: 320,
    difficulty: 'Easy',
    phNotes: 'Kamote (sweet potato) is one of the cheapest and most nutritious foods in the Philippines. Tablea (native cacao) is available everywhere. Local peanut butter is affordable at sari-sari stores.',
  },
  {
    id: 'mito-energy-shot',
    name: 'Mito Energy Shot',
    tagline: 'Mitochondrial Repair + Natural Energy',
    category: 'energy',
    prepTime: '5 min',
    servings: 1,
    ingredients: [
      { item: 'Watermelon (pakwan)', amount: '1 cup cubed', benefit: 'Citrulline → arginine → nitric oxide (blood flow to brain)' },
      { item: 'Coconut water', amount: '1/2 cup', benefit: 'Potassium, electrolytes, cytokinins' },
      { item: 'Calamansi juice', amount: '1 tbsp', benefit: 'Vitamin C, enhances iron absorption' },
      { item: 'Mint leaves (yerba buena)', amount: '5-6 leaves', benefit: 'Menthol — mental clarity, mild stimulant, digestive aid' },
      { item: 'Honey', amount: '1 tsp', benefit: 'Quick glucose for brain energy, antimicrobial' },
      { item: 'Beet (optional)', amount: '1/4 small', benefit: 'Nitrates → nitric oxide → improved blood flow to brain' },
    ],
    instructions: [
      'Cube watermelon, removing seeds',
      'Wash mint leaves thoroughly',
      'If using beet, peel and chop into small pieces',
      'Add all ingredients to blender',
      'Blend on high for 45 seconds',
      'Strain through fine mesh for a smoother shot texture',
      'Drink in one serving for a quick energy boost',
    ],
    science: 'Substance use damages mitochondria (the energy-producing organelles in every cell) through oxidative stress. This shot addresses mitochondrial recovery through multiple pathways: watermelon provides L-citrulline, which converts to L-arginine and then nitric oxide, improving blood flow and oxygen delivery to the brain. Coconut water provides electrolytes (potassium, magnesium) needed for ATP production. The combination supports both energy production and mitochondrial membrane repair.',
    bestTime: 'Morning or before exercise',
    calories: 90,
    difficulty: 'Easy',
    phNotes: 'Watermelon is abundant and cheap during Philippine summer months. Yerba buena (mint) grows wild and is a traditional Filipino herbal remedy for stomach ailments.',
  },
  {
    id: 'immune-shield',
    name: 'Immune Shield Booster',
    tagline: 'Immune Rebuild + Anti-inflammatory',
    category: 'immunity',
    prepTime: '5 min',
    servings: 1,
    ingredients: [
      { item: 'Calamansi juice', amount: '3 pcs squeezed', benefit: 'High Vitamin C — immune cell function, antioxidant' },
      { item: 'Carrot', amount: '1 medium', benefit: 'Beta-carotene → Vitamin A — immune defense, mucosal repair' },
      { item: 'Ginger (luya)', amount: '1 inch piece', benefit: 'Gingerols — anti-inflammatory, anti-nausea, antimicrobial' },
      { item: 'Garlic', amount: '1 small clove', benefit: 'Allicin — potent antimicrobial, immune stimulant' },
      { item: 'Honey', amount: '1 tbsp', benefit: 'Enzymatic activity, antimicrobial, throat soothing' },
      { item: 'Turmeric (luyang dilaw)', amount: '1/2 inch piece', benefit: 'Curcumin — modulates immune response, anti-inflammatory' },
      { item: 'Warm water', amount: '1 cup', benefit: 'Enhances absorption, soothing' },
    ],
    instructions: [
      'Squeeze calamansi and strain seeds',
      'Peel and chop carrot, ginger, and turmeric into small pieces',
      'Crush garlic and let sit 5 minutes (activates allicin)',
      'Blend carrot, ginger, turmeric, and garlic with warm water',
      'Strain through fine mesh',
      'Mix in calamansi juice and honey',
      'Drink warm — not hot (destroys vitamin C)',
    ],
    science: 'Chronic substance use severely suppresses the immune system through multiple mechanisms: oxidative stress, cortisol elevation, malnutrition, and disrupted sleep. This booster combines the most evidence-based immune-supportive ingredients available in the Philippines: high-dose vitamin C from calamansi (essential for T-cell and B-cell function), allicin from garlic (potent antimicrobial that activates immune cell proliferation), gingerols from ginger (anti-inflammatory that reduces cytokine storm risk), and curcumin from luyang dilaw (immunomodulator that reduces excessive inflammation while supporting appropriate immune responses).',
    bestTime: 'Morning on empty stomach, or when feeling run down',
    calories: 120,
    difficulty: 'Easy',
    phNotes: 'All ingredients are staple Filipino kitchen items. Luya, bawang, and luyang dilaw are in every Philippine household. This is the most affordable recipe in the collection.',
  },
];

// ─── NUTRITION PROTOCOLS ────────────────────────────────────────────────────

export const NUTRITION_PROTOCOLS: NutritionProtocol[] = [
  {
    id: 'acute-withdrawal-nutrition',
    name: 'Acute Withdrawal Nutrition',
    phase: 'Days 1-14',
    description: 'During acute withdrawal, the body is under extreme stress. The gut may be damaged, appetite may be absent or excessive, and blood sugar can be highly unstable. The goal is gentle, frequent, nutrient-dense eating that supports neurotransmitter recovery without overwhelming the digestive system. Focus on easily digestible foods, stable blood sugar, and maximum nutrient density per calorie.',
    principles: [
      'Eat small, frequent meals (6x/day) rather than 3 large meals',
      'Prioritize protein at every meal — amino acids are the raw materials for neurotransmitters',
      'Keep simple carbs low to prevent blood sugar crashes that trigger cravings',
      'Hydrate aggressively — coconut water is the ideal Philippine electrolyte source',
      'Include fermented foods daily to rebuild gut microbiome',
      'Avoid caffeine, alcohol, and all mind-altering substances including cannabis',
      'Do not force eating if nauseous — sip nutrient-dense liquids instead',
      'Take a quality multivitamin daily as nutritional insurance',
    ],
    mealStructure: [
      { meal: 'Breakfast', timing: 'Within 1 hour of waking', foods: ['Eggs (2) — complete protein, choline for brain', 'Oatmeal with banana — complex carbs, tryptophan, potassium', 'Calamansi water — vitamin C'], avoid: ['Sugary cereals', 'White bread', 'Coffee on empty stomach'] },
      { meal: 'Mid-Morning Snack', timing: '10:00 AM', foods: ['Peanut butter on whole wheat bread — protein + complex carbs', 'Banana — potassium, B6', 'Coconut water — electrolytes'], avoid: ['Chips, junk food', 'Soda'] },
      { meal: 'Lunch', timing: '12:00 PM', foods: ['Fish (galunggong, bangus) or chicken — lean protein, omega-3', 'Brown rice or brown rice — B vitamins, fiber', 'Malunggay leaves (cooked) — complete amino acids, iron', 'Calamansi-soy dip — vitamin C, fermentation benefits'], avoid: ['Fried food', 'Processed meat', 'Fast food'] },
      { meal: 'Afternoon Snack', timing: '3:00 PM', foods: ['Green juice (Brain Fuel recipe) — neurotransmitter precursors', 'Nuts (peanuts, cashews) — magnesium, zinc, healthy fats', 'Papaya — papain enzyme, vitamin A'], avoid: ['Sweets', 'Energy drinks'] },
      { meal: 'Dinner', timing: '6:00-7:00 PM', foods: ['Fish or tofu — protein for overnight tissue repair', 'Sweet potato (kamote) — complex carbs, beta-carotene, fiber', 'Green leafy vegetables (kangkong, pechay) — folate, iron, magnesium', 'Tomato — lycopene, vitamin C'], avoid: ['Heavy meals after 8 PM', 'Spicy food (disrupts sleep)'] },
      { meal: 'Before Bed', timing: '9:00 PM', foods: ['Chamomile or ginger tea — promotes sleep, reduces anxiety', 'Small banana or handful of nuts if hungry — tryptophan, magnesium'], avoid: ['Screens before bed', 'Heavy food', 'Sugar'] },
    ],
    keyNutrients: [
      { nutrient: 'L-Tyrosine', why: 'Direct dopamine precursor — critical during meth/stimulant withdrawal crash', sources: 'Eggs, chicken, fish, peanuts, banana' },
      { nutrient: 'L-Tryptophan', why: 'Direct serotonin precursor — essential for mood stabilization and sleep', sources: 'Banana, turkey, chicken, eggs, oats, peanuts' },
      { nutrient: 'Magnesium', why: 'NMDA receptor modulation, GABA activation, sleep support, reduces cravings', sources: 'Dark chocolate, nuts, brown rice, leafy greens' },
      { nutrient: 'B-Complex Vitamins', why: 'Cofactors for ALL neurotransmitter synthesis pathways', sources: 'Eggs, chicken, fish, brown rice, oats' },
      { nutrient: 'Vitamin C', why: 'Glutathione regeneration, immune support, dopamine synthesis cofactor', sources: 'Calamansi, dalandan, papaya, malunggay, kangkong' },
      { nutrient: 'Omega-3 (EPA/DHA)', why: 'Brain cell membrane repair, neuroinflammation reduction, BDNF support', sources: 'Galunggong, bangus, tilapia, sardines' },
      { nutrient: 'Zinc', why: 'Testosterone support, immune function, NMDA/GABA modulation', sources: 'Oysters, pumpkin seeds, beef, chicken, peanuts' },
      { nutrient: 'Glutamine', why: 'Gut repair, GABA precursor, blood sugar regulation, craving reduction', sources: 'Bone broth, eggs, fish, cabbage, beans' },
    ],
    hydration: 'Drink at least 3 liters of water daily. Add coconut water (buko juice) 2x daily for electrolytes. Avoid sugary drinks — they cause blood sugar crashes that trigger cravings. Calamansi water with a pinch of sea salt is an excellent homemade electrolyte drink.',
    phTips: 'Coconut water (fresh from the buko vendor) is the perfect Philippine electrolyte source — cheaper and more effective than any sports drink. Malunggay grows everywhere and is free. Galunggong and bangus are the cheapest fish sources of omega-3. Sardines in tomato sauce (available at every sari-sari store) are an excellent budget omega-3 source.',
  },
  {
    id: 'early-recovery-nutrition',
    name: 'Early Recovery Nutrition',
    phase: 'Days 14-90',
    description: 'In early recovery, appetite returns and the body begins to rebuild. This protocol focuses on comprehensive nutritional rehabilitation — repairing the gut-brain axis, restoring neurotransmitter production, and building sustainable eating habits that support long-term recovery. The emphasis shifts from "survival eating" to "strategic nutrition" that actively accelerates brain healing.',
    principles: [
      'Transition to 3 balanced meals + 2 planned snacks',
      'Prioritize protein at every meal (minimum 1g per kg body weight daily)',
      'Add fermented foods daily (kimchi, yogurt, atchara, burong mangga)',
      'Practice mindful eating — eat slowly, without screens, in a calm environment',
      'Begin tracking food-mood connections (what you eat affects how you feel)',
      'Cook at home — control ingredients, avoid hidden additives and excess sodium',
      'Plan meals ahead — hunger + no plan = relapse trigger',
      'Include "rainbow eating" — different colored fruits/vegetables daily for phytonutrient diversity',
    ],
    mealStructure: [
      { meal: 'Breakfast', timing: 'Within 1 hour of waking', foods: ['Eggs (2-3) any style — choline, B12, complete protein', 'Avocado or coconut — healthy fats for brain', 'Whole grain toast or oats — B vitamins, fiber', 'Fresh fruit (papaya, banana, mango) — vitamins, enzymes', 'Green tea — L-theanine for calm focus'], avoid: ['Instant noodles', 'Processed meats (longganisa, tocino daily)', 'Sugar-heavy breakfast'] },
      { meal: 'Lunch', timing: '12:00 PM', foods: ['Fish (grilled or steamed) — omega-3, lean protein', 'Brown or red rice — B vitamins, sustained energy', '2-3 vegetable dishes (malunggay, kangkong, sitaw, talong)', 'Calamansi or vinegar dip — aids mineral absorption', 'Clear soup (tinola, sinigang broth) — hydration, nutrients'], avoid: ['Deep-fried food daily', 'Soda with meals', 'Excessive soy sauce (sodium)'] },
      { meal: 'Snack', timing: '3:00 PM', foods: ['Green smoothie (rotate recipes) — nutrient density', 'Mixed nuts — magnesium, zinc, healthy fats', 'Fresh fruit — vitamins, fiber, natural sugars'], avoid: ['Chicharrón', 'Candy bars', 'Energy drinks'] },
      { meal: 'Dinner', timing: '6:00-7:00 PM', foods: ['Lean protein (fish, chicken breast, tofu)', 'Sweet potato or rice — complex carbs', 'Vegetable soup or salad — fiber, micronutrients', 'Fermented food side (atchara, kimchi) — probiotics'], avoid: ['Late-night eating after 8 PM', 'Alcohol'] },
    ],
    keyNutrients: [
      { nutrient: 'Protein (complete)', why: 'Amino acids are building blocks for ALL neurotransmitters and tissue repair', sources: 'Eggs, fish, chicken, tofu, beans' },
      { nutrient: 'Omega-3 EPA/DHA', why: 'Brain cell membrane repair, reduces neuroinflammation, enhances BDNF', sources: 'Galunggong, bangus, sardines, tuna' },
      { nutrient: 'Magnesium', why: 'Over 300 enzymatic reactions, GABA support, sleep quality, craving reduction', sources: 'Dark chocolate, nuts, seeds, leafy greens' },
      { nutrient: 'Vitamin D3', why: 'Regulates dopamine/serotonin genes, immune function, bone health', sources: 'Sunlight (15 min AM), fatty fish, egg yolks' },
      { nutrient: 'B-Complex', why: 'Energy metabolism, nerve repair, neurotransmitter cofactors', sources: 'Whole grains, eggs, meat, leafy greens' },
      { nutrient: 'Zinc', why: 'Testosterone, immunity, taste/smell recovery, GABA function', sources: 'Oysters, pumpkin seeds, beef, peanuts' },
      { nutrient: 'Probiotics/Fermented Foods', why: 'Gut-brain axis repair, 95% of serotonin produced in gut', sources: 'Kimchi, yogurt, atchara, burong mangga, kefir' },
    ],
    hydration: 'Continue 2-3 liters daily. Add green tea (2-3 cups) for L-theanine. Limit caffeine to 1 cup in the morning only.',
    phTips: 'The Filipino diet is naturally rich in recovery-supportive foods: fish is cheap and abundant, malunggay is everywhere, coconut products provide MCTs and electrolytes. Challenge: minimize the daily rice-overload and add more vegetables. Swap white rice for brown rice (50/50 mix if full brown is too difficult).',
  },
];

// ─── NUTRIENT GUIDES ────────────────────────────────────────────────────────

export const NUTRIENT_GUIDES: NutrientGuide[] = [
  {
    id: 'vitamin-c',
    name: 'Vitamin C (Ascorbic Acid)',
    category: 'antioxidant',
    role: 'Water-soluble antioxidant essential for immune function, neurotransmitter synthesis (dopamine beta-hydroxylase), collagen repair, and iron absorption. Directly regenerates glutathione (the body\'s master antioxidant). Critical during withdrawal when oxidative stress is at its peak.',
    deficiencySymptoms: ['Impaired immune function', 'Slow wound healing', 'Fatigue and weakness', 'Bleeding gums', 'Depression and mood instability', 'Poor iron absorption (anemia)'],
    recoveryImportance: 'Substance users have dramatically elevated oxidative stress. Vitamin C is the first line of defense — it directly neutralizes free radicals, supports immune function during vulnerable withdrawal periods, and is a required cofactor for dopamine beta-hydroxylase (converting dopamine to norepinephrine). Deficiency is nearly universal in chronic substance users due to poor diet, increased metabolic demand, and direct depletion.',
    foodSources: ['Citrus fruits (oranges, lemons, grapefruit)', 'Bell peppers', 'Strawberries', 'Broccoli', 'Kiwi', 'Tomatoes'],
    phSources: ['Calamansi (richest local source)', 'Dalandan', 'Papaya', 'Malunggay', 'Kangkong', 'Camote tops', 'Guava', 'Sour soup (sinigang) base'],
    dailyTarget: '500-2000mg (split doses throughout the day)',
    timing: 'With meals (enhances iron absorption from food)',
    cautions: 'Excess is excreted in urine — split doses for better absorption. High doses may cause loose stools. If taking NAC, separate by 2 hours for optimal glutathione recycling.',
  },
  {
    id: 'omega-3',
    name: 'Omega-3 Fatty Acids (EPA/DHA)',
    category: 'fatty-acid',
    role: 'Essential structural components of brain cell membranes. DHA constitutes 40% of all polyunsaturated fatty acids in neuronal membranes. EPA reduces neuroinflammation by competing with omega-6 for COX/LOX enzymes. Both enhance BDNF (brain-derived neurotrophic factor) expression, supporting neuroplasticity and brain repair.',
    deficiencySymptoms: ['Brain fog and poor memory', 'Depression and mood swings', 'Dry skin and hair', 'Poor concentration', 'Increased inflammation', 'Joint stiffness'],
    recoveryImportance: 'The brain is 60% fat. DHA is the primary structural fat in neurons. Chronic substance use depletes omega-3 stores through oxidative damage and poor diet. Supplementation has been shown in clinical trials to reduce depression, improve cognitive function, and support overall brain recovery. This is arguably the most important long-term supplement for brain recovery.',
    foodSources: ['Salmon', 'Mackerel', 'Sardines', 'Anchovies', 'Walnuts', 'Flaxseeds', 'Chia seeds'],
    phSources: ['Galunggong (round scad) — excellent budget source', 'Bangus (milkfish)', 'Tilapia', 'Sardines in tomato sauce', 'Tamban', 'Alumahan'],
    dailyTarget: '1000-2000mg combined EPA + DHA',
    timing: 'With meals (fat-soluble — requires dietary fat for absorption)',
    cautions: 'Choose smaller fish (galunggong, sardines) to minimize mercury exposure. Large predatory fish accumulate more toxins. If supplementing, choose molecularly distilled fish oil. Mild blood-thinning effect — caution with anticoagulant medications.',
  },
  {
    id: 'l-tyrosine',
    name: 'L-Tyrosine',
    category: 'amino-acid',
    role: 'Direct precursor to L-DOPA, which converts to dopamine, norepinephrine, and epinephrine. The catecholamine neurotransmitters responsible for motivation, reward, focus, and stress resilience. Also supports thyroid hormone production (T3, T4) and melanin synthesis.',
    deficiencySymptoms: ['Profound anhedonia (inability to feel pleasure)', 'Lack of motivation and drive', 'Brain fog', 'Poor stress tolerance', 'Fatigue', 'Difficulty concentrating'],
    recoveryImportance: 'During early recovery from stimulants, dopamine levels crash dramatically. L-Tyrosine provides the raw material for dopamine synthesis, accelerating recovery of the brain\'s reward system. Particularly effective for improving cognitive performance under stress and reducing the fatigue and brain fog that characterize withdrawal. Essential for the "flat" feeling of early recovery.',
    foodSources: ['Eggs', 'Chicken', 'Turkey', 'Fish', 'Dairy', 'Soy', 'Peanuts', 'Almonds', 'Avocado', 'Bananas'],
    phSources: ['Eggs (itlog) — richest everyday source', 'Chicken and fish', 'Peanut butter — cheap and available', 'Tofu and tokwa', 'Monggo (mung beans)', 'Kesong puti (cheese)'],
    dailyTarget: '500-1500mg (supplement) or 2-4g from food sources',
    timing: 'Morning only — late-day use disrupts sleep. Take on empty stomach (amino acid competition with other proteins)',
    cautions: 'Do NOT use with MAOIs — hypertensive crisis risk. Caution with L-DOPA or Parkinson\'s medications. Start with 500mg and increase only if well-tolerated. Take separately from 5-HTP (they compete for the same transporter). Cycle: 2-3 weeks on, 1 week off.',
  },
  {
    id: 'magnesium',
    name: 'Magnesium',
    category: 'mineral',
    role: 'Cofactor in over 300 enzymatic reactions. Modulates NMDA receptors (reducing glutamate excitotoxicity), activates GABA-A receptors (promoting calm), blocks calcium channels (reducing neuronal overexcitation), and serves as cofactor for tyrosine hydroxylase (dopamine synthesis) and tryptophan hydroxylase (serotonin synthesis). Required for ATP (cellular energy) production.',
    deficiencySymptoms: ['Anxiety and insomnia', 'Muscle cramps and tremors', 'Sugar cravings', 'Irritability and mood swings', 'Poor sleep quality', 'Fatigue and low energy', 'Elevated blood pressure', 'Constipation'],
    recoveryImportance: 'Virtually every recovering user is magnesium-deficient due to substance-induced depletion, poor diet, and stress (stress depletes magnesium). This is the SINGLE most important mineral for recovery because it supports neurotransmitter synthesis (dopamine + serotonin), reduces excitotoxicity (NMDA modulation), promotes sleep (GABA activation), and repairs the gut barrier. The glycinate form provides additional calming effects through the glycine component.',
    foodSources: ['Dark chocolate', 'Pumpkin seeds', 'Spinach', 'Almonds', 'Black beans', 'Avocado', 'Bananas'],
    phSources: ['Dark chocolate (tablea) — rich source', 'Peanuts and peanut butter', 'Kamote (sweet potato)', 'Malunggay', 'Mung beans (monggo)', 'Brown rice', 'Banana (saba/lakatan)'],
    dailyTarget: '300-400mg elemental magnesium (supplement)',
    timing: '1-2 hours before bed for optimal sleep benefits. Can split AM/PM if using >400mg.',
    cautions: 'Start with 200mg and increase gradually to avoid loose stools. Choose glycinate form — oxide and citrate are poorly absorbed. Avoid taking with calcium (they compete for absorption). Take separately from zinc (2+ hours apart) for optimal absorption.',
  },
  {
    id: 'b-complex',
    name: 'B-Complex Vitamins',
    category: 'vitamin',
    role: 'Essential cofactors for virtually every step of neurotransmitter synthesis and energy metabolism. B6 is particularly critical as a cofactor for converting 5-HTP to serotonin and L-DOPA to dopamine. B12 and folate are essential for myelin repair and methylation. B3 (niacin) is required for NAD+/NADH cellular energy production.',
    deficiencySymptoms: ['Fatigue and low energy', 'Brain fog', 'Peripheral neuropathy (tingling hands/feet)', 'Depression', 'Poor memory', 'Cracked lips and mouth sores', 'Skin rash', 'Irritability'],
    recoveryImportance: 'Substance use severely depletes B-vitamin stores through increased metabolic demand, poor nutrition, and direct urinary excretion (particularly with stimulant use). Every neurotransmitter synthesis pathway requires B-vitamins as cofactors. Without adequate B-vitamins, no amount of amino acid precursors will produce optimal neurotransmitter levels. B6 specifically is the "gatekeeper" enzyme that converts raw amino acids into active neurotransmitters.',
    foodSources: ['Eggs', 'Meat', 'Fish', 'Dairy', 'Whole grains', 'Leafy greens', 'Legumes', 'Nuts'],
    phSources: ['Eggs — nature\'s B-vitamin multivitamin', 'Fish (galunggong, bangus)', 'Chicken liver (occasional — richest source)', 'Brown/red rice', 'Monggo (mung beans)', 'Kangkong', 'Malunggay'],
    dailyTarget: 'B-50 complex once daily (therapeutic dose, not just RDA)',
    timing: 'Morning with food — B-vitamins can be stimulating and may disrupt sleep if taken late',
    cautions: 'B-50 provides therapeutic doses of all 8 B vitamins. B6 over 100mg/day can cause neuropathy (B-50 provides 50mg — safe). B-vitamins will turn urine bright yellow (normal — riboflavin/B2 excretion, harmless). Take with food to prevent nausea.',
  },
];

export const JUICE_CATEGORIES = ['All', 'Brain Repair', 'Gut Heal', 'Detox', 'Calm', 'Energy', 'Immunity'] as const;

// ─── SYMPTOM-SUPPLEMENT MAPPING ──────────────────────────────────────────────

export interface SymptomSupplement {
  symptom: string;
  supplements: { name: string; dosage: string; note: string }[];
}

export const SYMPTOM_SUPPLEMENT_MAP: SymptomSupplement[] = [
  {
    symptom: 'Low motivation, fatigue, mental fog',
    supplements: [
      { name: 'L-Tyrosine', dosage: '500-1000mg AM', note: 'Dopamine precursor for motivation and focus' },
      { name: 'DLPA', dosage: '500-750mg AM', note: 'Endorphin + dopamine dual pathway support' },
      { name: 'B-Complex', dosage: 'B-50 AM', note: 'Energy metabolism and nerve repair' },
    ],
  },
  {
    symptom: 'Emotional/physical pain, "blah" mood',
    supplements: [
      { name: 'DLPA', dosage: '500-750mg AM', note: 'Rebuilds endorphin production for pain management' },
      { name: 'Omega-3 Fish Oil', dosage: '2000mg AM', note: 'Reduces neuroinflammation affecting pain perception' },
      { name: 'Ashwagandha', dosage: '300-600mg PM', note: 'Reduces cortisol, improves stress resilience' },
    ],
  },
  {
    symptom: 'Anxiety, overstimulation, racing thoughts',
    supplements: [
      { name: 'L-Theanine', dosage: '200-400mg as needed', note: 'Calms without sedation, increases alpha brain waves' },
      { name: 'GABA supplement', dosage: '100-300mg PM', note: 'Direct calming neurotransmitter support' },
      { name: 'Magnesium Glycinate', dosage: '300-400mg PM', note: 'NMDA receptor modulation, natural calm' },
      { name: 'Lemon Balm', dosage: '300-600mg PM', note: 'GABA transaminase inhibitor, mild calming' },
    ],
  },
  {
    symptom: 'Difficulty winding down at night',
    supplements: [
      { name: 'Magnesium Glycinate', dosage: '300-400mg PM', note: 'Primary sleep support, muscle relaxation' },
      { name: '5-HTP', dosage: '50-100mg PM', note: 'Serotonin → melatonin pathway' },
      { name: 'L-Theanine', dosage: '200mg PM', note: 'Reduces pre-sleep anxiety' },
      { name: 'Melatonin', dosage: '0.3-1mg 30min before bed', note: 'Circadian rhythm reset' },
    ],
  },
  {
    symptom: 'Alcohol/sugar cravings, gut issues',
    supplements: [
      { name: 'L-Glutamine', dosage: '5-10g daily', note: 'Gut fuel + craving reduction via blood sugar regulation' },
      { name: 'Probiotics', dosage: '10-25B CFU AM', note: 'Restores gut bacteria that produce neurotransmitters' },
      { name: 'B-Complex', dosage: 'B-50 AM', note: 'Cofactors for neurotransmitter synthesis' },
      { name: 'Chromium Picolinate', dosage: '200-400mcg AM', note: 'Blood sugar stabilization' },
    ],
  },
  {
    symptom: 'Mood instability, cravings',
    supplements: [
      { name: '5-HTP', dosage: '150-300mg PM', note: 'Restores serotonin for mood stability' },
      { name: 'Omega-3 Fish Oil', dosage: '2000mg AM', note: 'Brain membrane repair, mood support' },
      { name: 'Vitamin D3', dosage: '2000-5000 IU AM', note: 'Regulates serotonin and dopamine gene expression' },
      { name: 'Mucuna Pruriens', dosage: '250-500mg AM', note: 'Dopamine restoration for motivation' },
    ],
  },
  {
    symptom: 'Low libido, low energy, hormonal issues',
    supplements: [
      { name: 'Tongkat Ali', dosage: '200-400mg AM', note: 'Boosts free testosterone naturally' },
      { name: 'Zinc', dosage: '15-30mg PM', note: 'Essential for testosterone production' },
      { name: 'Shilajit', dosage: '250-500mg AM', note: 'Enhances mitochondrial energy and T-levels' },
      { name: 'Vitamin D3 + K2', dosage: '2000-5000 IU AM', note: 'Hormone regulation' },
      { name: 'Ashwagandha', dosage: '300-600mg PM', note: 'Reduces cortisol which suppresses testosterone' },
    ],
  },
  {
    symptom: 'Gut issues: bloating, irregular digestion',
    supplements: [
      { name: 'L-Glutamine', dosage: '5-10g daily', note: 'Repairs intestinal lining, primary gut fuel' },
      { name: 'Probiotics', dosage: '10-50B CFU AM', note: 'Restores gut bacteria diversity' },
      { name: 'Prebiotics (Inulin/FOS)', dosage: '5-15g daily', note: 'Feeds beneficial bacteria' },
      { name: 'DGL', dosage: '500mg before meals', note: 'Soothes and protects stomach lining' },
      { name: 'Aloe Vera', dosage: '50-100mg daily', note: 'Reduces intestinal inflammation' },
    ],
  },
];

// ─── HYDRATION STRATEGY DATA ────────────────────────────────────────────────

export interface BeverageEntry {
  id: string;
  name: string;
  category: 'primary' | 'supplementary' | 'probiotic' | 'juice-recommended' | 'juice-caution' | 'juice-avoid';
  benefits: string[];
  dosage: string;
  frequency: string;
  limitations: string[];
  bestFor: string;
  rating: number; // 1-5
}

export const HYDRATION_BEVERAGES: BeverageEntry[] = [
  { id: 'water', name: 'Water', category: 'primary', benefits: ['Primary hydration', 'Cellular function', 'Toxin elimination', 'Temperature regulation'], dosage: '11-16 cups daily', frequency: 'Throughout the day', limitations: ['Needs electrolyte support for full recovery', 'Can be boring alone'], bestFor: 'Primary hydration foundation', rating: 5 },
  { id: 'buko-juice', name: 'Buko Juice (Coconut Water)', category: 'supplementary', benefits: ['Natural electrolyte replacement', 'Better hydration than plain water', 'Low calorie', 'Supports heart and kidney health', 'Aids muscle recovery', 'Reduces cramps'], dosage: '1 cup daily', frequency: 'Post-workout or afternoon', limitations: ['Low in sodium compared to sports drinks', 'Not a complete meal', 'Natural sugars 9-11g per cup', 'Variable nutrient content by brand'], bestFor: 'Electrolyte replenishment, post-workout rehydration', rating: 5 },
  { id: 'green-juice', name: 'Green/Vegetable Juice', category: 'juice-recommended', benefits: ['Vitamins A, C, K for immune and tissue repair', 'Reduces inflammation', 'Supports detoxification', 'Aid nutrient absorption'], dosage: '1 small glass (8 oz)', frequency: 'Daily', limitations: ['Can be acidic', 'Not a meal replacement', 'Fiber removed during juicing'], bestFor: 'Antioxidant support, detox, reducing inflammation', rating: 5 },
  { id: 'berry-juice', name: 'Berry Juice (Blueberry, Pomegranate)', category: 'juice-recommended', benefits: ['Rich antioxidants combat oxidative stress', 'Reduce inflammation', 'Support muscle recovery', 'Pomegranate has more antioxidants than green tea'], dosage: '1 small glass (4-6 oz)', frequency: '2-3x weekly', limitations: ['High natural sugars', 'Limit portions', 'Best fresh, not from concentrate'], bestFor: 'Antioxidant protection, muscle recovery', rating: 4 },
  { id: 'probiotic-drinks', name: 'Probiotic Drinks', category: 'probiotic', benefits: ['Reduces cravings by up to 90%', 'Improves sleep quality', 'Increases appetite', 'Repairs gut damage', 'Supports dopamine/serotonin'], dosage: '1.8-30B CFU daily', frequency: 'Daily (with breakfast)', limitations: ['Takes weeks/months for effects', 'Individual variation', 'Not standalone treatment', 'Needs consistency', 'Quality varies'], bestFor: 'Cravings, mood, gut repair', rating: 5 },
  { id: 'citrus-juice', name: 'Citrus Juice (Calamansi, Dalandan)', category: 'juice-recommended', benefits: ['High vitamin C for immune support', 'Folate, potassium, magnesium', 'Flavonoids for anti-inflammatory', 'Cardiovascular support'], dosage: '1 small glass', frequency: '2-3x weekly', limitations: ['Can be acidic', 'May irritate sensitive digestion', 'Citric acid can damage tooth enamel with frequent exposure'], bestFor: 'Immune support, vitamin C source', rating: 4 },
  { id: 'herbal-tea', name: 'Herbal Tea (Green tea, Chamomile, Ginger)', category: 'supplementary', benefits: ['Green tea: L-Theanine + antioxidants', 'Chamomile: sleep and calm support', 'Ginger: anti-nausea and anti-inflammatory'], dosage: '2-3 cups daily', frequency: 'AM and PM', limitations: ['Caffeine in green tea (limit PM use)', 'Can interfere with iron absorption'], bestFor: 'Calm support, antioxidants, digestion', rating: 4 },
  { id: 'high-sugar-juice', name: 'High-Sugar Juices & Soda', category: 'juice-avoid', benefits: [], dosage: 'Avoid', frequency: 'Never', limitations: ['Spikes blood sugar and worsens mood swings', 'May trigger cravings', 'Dehydrating', 'Feeds harmful gut bacteria', 'Empty calories with zero recovery value'], bestFor: 'AVOID during recovery', rating: 1 },
  { id: 'carbonated', name: 'Carbonated Drinks', category: 'juice-avoid', benefits: [], dosage: 'Avoid', frequency: 'Never', limitations: ['Dehydrate the body', 'Interfere with nutrient absorption', 'Damage gut lining with chronic use', 'Feeds sugar cravings'], bestFor: 'AVOID during recovery', rating: 1 },
  { id: 'caffeine-excess', name: 'Excessive Caffeine', category: 'juice-avoid', benefits: [], dosage: 'Limit to 1 cup AM', frequency: 'AM only (before noon)', limitations: ['Interferes with sleep', 'Increases anxiety and cortisol', 'Disrupts gut repair', 'Dehydrating'], bestFor: 'Limit to 1 cup before noon only', rating: 2 },
  { id: 'alcohol', name: 'Alcoholic Beverages', category: 'juice-avoid', benefits: [], dosage: 'Avoid', frequency: 'Never during early recovery', limitations: ['Dehydrate and interfere with medications', 'Trigger relapse risk', 'Destroy gut bacteria', 'Damage sleep architecture', 'Suppress testosterone'], bestFor: 'AVOID completely during recovery (first 90 days minimum)', rating: 1 },
];

export interface HydrationSchedule {
  timeOfDay: string;
  beverages: { name: string; amount: string; purpose: string }[];
}

export const DAILY_HYDRATION_SCHEDULE: HydrationSchedule[] = [
  { timeOfDay: 'Morning (AM)', beverages: [
    { name: 'Water', amount: '1-2 cups', purpose: 'Rehydrate after sleep' },
    { name: 'Probiotic', amount: 'As directed', purpose: 'Gut bacteria restoration (with breakfast)' },
    { name: 'L-Glutamine', amount: '3-5g', purpose: 'Gut lining repair' },
    { name: 'Calamansi water', amount: '1 glass with pinch of sea salt', purpose: 'Electrolytes + vitamin C' },
  ]},
  { timeOfDay: 'Midday', beverages: [
    { name: 'Water', amount: '2-3 cups', purpose: 'Stay hydrated through the day' },
    { name: 'Green tea or herbal tea', amount: '1 cup', purpose: 'L-theanine and antioxidants' },
    { name: 'Fermented food', amount: '1 serving (yogurt, kimchi, atchara)', purpose: 'Natural probiotics + prebiotics' },
    { name: 'High-fiber food', amount: '1 serving', purpose: 'Prebiotic fiber for gut bacteria' },
    { name: 'Berry juice', amount: '4-6 oz (2-3x weekly)', purpose: 'Antioxidant support' },
  ]},
  { timeOfDay: 'Afternoon', beverages: [
    { name: 'Buko juice (coconut water)', amount: '1 cup', purpose: 'Electrolyte replenishment' },
    { name: 'Water', amount: '2 cups', purpose: 'Continue hydration' },
    { name: 'Green/vegetable juice', amount: '8 oz', purpose: 'Antioxidant and detox support' },
  ]},
  { timeOfDay: 'Evening', beverages: [
    { name: 'Water', amount: '1-2 cups', purpose: 'Evening hydration' },
    { name: 'L-Glutamine', amount: '3-5g', purpose: 'Gut repair support' },
    { name: 'DGL', amount: '500mg', purpose: 'Soothe intestinal lining' },
    { name: 'Prebiotic fiber', amount: 'From food (garlic, onion, asparagus)', purpose: 'Feed beneficial bacteria overnight' },
  ]},
  { timeOfDay: 'Bedtime', beverages: [
    { name: 'Magnesium Glycinate', amount: '300-400mg', purpose: 'Sleep support + gut healing' },
    { name: 'Herbal tea', amount: '1 cup (chamomile or ginger)', purpose: 'Promotes sleep and reduces anxiety' },
  ]},
];
