// ─── Mind & Psychology Data ─────────────────────────────────────────────────
// Comprehensive mental wellness framework for substance recovery
// Integrates cognitive science, contemplative practices, and practical psychology

export interface ComparativeMindset {
  id: string;
  name: string;
  description: string;
  addictionMindset: string;
  recoveryMindset: string;
  keyShift: string;
  practices: string[];
  science: string;
}

export interface WellnessTool {
  id: string;
  name: string;
  category: 'cognitive' | 'somatic' | 'behavioral' | 'social' | 'spiritual';
  description: string;
  duration: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  steps: string[];
  benefits: string[];
  science: string;
  whenToUse: string;
}

export interface ContemplativePractice {
  id: string;
  name: string;
  theme: 'grace' | 'love' | 'mercy' | 'forgiveness' | 'gratitude' | 'surrender';
  description: string;
  duration: string;
  script: string;
  benefits: string[];
  origin: string;
}

// ─── COMPARATIVE MINDS ───────────────────────────────────────────────────────

export const COMPARATIVE_MINDSETS: ComparativeMindset[] = [
  {
    id: 'pleasure-vs-meaning',
    name: 'Pleasure vs. Meaning',
    description: 'The fundamental shift from short-term pleasure-seeking to long-term meaning-building. This is the core psychological transformation in recovery — moving from a brain wired for instant gratification to one capable of finding satisfaction in sustained effort and genuine connection.',
    addictionMindset: '"I need to feel good right now. If I don\'t get relief immediately, the discomfort is unbearable. The substance is the only thing that works. Nothing else matters except getting to the next high."',
    recoveryMindset: '"Discomfort is temporary and information, not an emergency. True satisfaction comes from overcoming challenges, not avoiding them. The delayed reward of a healthy life far exceeds any fleeting pleasure."',
    keyShift: 'From dopamine-driven instant gratification to meaning-driven delayed gratification. The brain\'s reward system must be retrained to find pleasure in effort, connection, and growth rather than chemical shortcuts.',
    practices: [
      'Practice the "10-minute rule" — when a craving hits, wait 10 minutes before acting. The wave will pass.',
      'Build a "meaning list" — write down 5 things that give your life meaning beyond pleasure.',
      'Daily journaling: "What gave me satisfaction today that required effort?"',
      'Practice delayed gratification daily (exercise before TV, cook before ordering food)',
      'Identify your "dopamine triggers" — situations that create urgency for immediate relief',
    ],
    science: 'The brain\'s mesolimbic dopamine system, which evolved to motivate survival behaviors (food, sex, social connection), is hijacked by substances that provide supranormal stimulation. This causes D2 receptor downregulation, making normal rewards feel unrewarding. Recovery requires sustained abstinence to allow receptor upregulation (2-4 weeks minimum), combined with behavioral activation that demonstrates to the brain that natural rewards can be satisfying again. Each positive experience during recovery creates new neural pathways that compete with substance-use memories.',
  },
  {
    id: 'isolation-vs-connection',
    name: 'Isolation vs. Connection',
    description: 'Substance use thrives in secrecy and isolation. Recovery flourishes in openness and connection. This mindset shift addresses the core paradox of addiction: the substance that initially connects you to a feeling (euphoria, belonging, confidence) ultimately isolates you from everyone and everything authentic.',
    addictionMindset: '"No one understands what I\'m going through. I can\'t tell anyone — they\'ll judge me. I have to handle this alone. People would reject me if they knew the truth about my use."',
    recoveryMindset: '"My vulnerability is my strength. Sharing my struggle connects me to others who understand. I am not alone — millions of people are walking this same path. Asking for help is the bravest thing I can do."',
    keyShift: 'From shame-driven secrecy to courage-driven openness. The act of sharing your recovery journey with even one trusted person rewires the brain\'s social reward circuitry, demonstrating that authentic connection provides what substances only simulated.',
    practices: [
      'Attend one support meeting per week (NA, SMART Recovery, online groups)',
      'Share honestly with one trusted person daily — even a text message counts',
      'Practice saying "I\'m struggling" instead of pretending everything is fine',
      'Volunteer or help someone else — service work is the antidote to self-obsession',
      'Replace using rituals with recovery rituals (morning intentions, evening reflection)',
      'Join an online recovery community (RecoveryPH, Reddit communities)',
    ],
    science: 'Social isolation activates the same brain circuits as physical pain (anterior cingulate cortex). Loneliness increases cortisol, reduces immune function, and impairs cognitive function. Conversely, social connection releases oxytocin, which directly opposes the stress response and reduces cravings. Studies show that social support is the single strongest predictor of sustained recovery — more important than the type of treatment, the specific substance, or the duration of use.',
  },
  {
    id: 'shame-vs-self-compassion',
    name: 'Shame vs. Self-Compassion',
    description: 'Shame is the emotional fuel of addiction. The cycle goes: use → guilt → shame → negative self-image → emotional pain → use to escape. Breaking this cycle requires replacing shame with self-compassion — not as an excuse for behavior, but as the foundation for genuine change.',
    addictionMindset: '"I\'m weak, broken, defective. I don\'t deserve help or happiness. My addiction proves I\'m a bad person. I should be ashamed of myself. If people really knew me, they\'d reject me."',
    recoveryMindset: '"I am a human being who is struggling with a health condition, not a moral failure. Self-compassion isn\'t weakness — it\'s the courage to treat myself with the same kindness I\'d offer a friend. My past choices don\'t define my future."',
    keyShift: 'From internalized stigma and self-punishment to evidence-based self-compassion. Research by Dr. Kristin Neff shows that self-compassion (vs. self-criticism) is associated with greater motivation to change, less procrastination, and more resilience after setbacks.',
    practices: [
      'Self-compassion break: "This is a moment of suffering. Suffering is part of the human experience. May I be kind to myself."',
      'Write a letter to yourself from the perspective of a compassionate friend',
      'When you relapse or struggle: "What would I say to a friend in this exact situation?"',
      'Daily gratitude: name 3 things you appreciate about yourself (not just your circumstances)',
      'Identify your "shame triggers" — people, places, thoughts that activate shame spirals',
      'Replace "I should" with "I choose to" or "I am learning to"',
    ],
    science: 'Shame activates the brain\'s threat system (amygdala, HPA axis), increasing cortisol and impairing prefrontal cortex function — the exact conditions that make relapse more likely. Self-compassion, by contrast, activates the mammalian caregiving system (oxytocin, vagus nerve), reducing cortisol and improving executive function. Studies show that self-compassionate individuals are more likely to seek help, less likely to relapse, and recover faster from setbacks. Self-compassion is not self-indulgence — it is the neurological foundation for change.',
  },
  {
    id: 'control-vs-surrender',
    name: 'Control vs. Surrender',
    description: 'Addiction is characterized by the illusion of control — "I can stop whenever I want" — followed by the reality of powerlessness. Recovery requires a paradoxical shift: surrendering the illusion of control in order to gain actual control over your life. This is not about giving up, but about accepting reality as the starting point for genuine change.',
    addictionMindset: '"I can handle it this time. I just need to control my usage better. I\'m not like those people who can\'t stop. One more time won\'t hurt. I\'ll quit tomorrow/next week/after this event."',
    recoveryMindset: '"I accept that I cannot safely use substances. This acceptance is not weakness — it is the most honest and powerful acknowledgment I can make. By accepting what I cannot control, I gain the ability to change what I can."',
    keyShift: 'From the illusion of control (denial) to radical acceptance (surrender). The Serenity Prayer encapsulates this perfectly: the wisdom to know the difference between what can and cannot be changed. This shift reduces the constant mental energy spent on "managing" use and redirects it toward building a meaningful life.',
    practices: [
      'Radical acceptance meditation: "I accept this moment exactly as it is, without fighting it."',
      'Make a list: "Things I cannot control" vs "Things I can influence"',
      'Practice the Serenity Prayer daily (works for all belief systems)',
      'When the urge to control arises: pause, breathe, ask "Is this within my circle of influence?"',
      'Surrender rituals: write what you\'re letting go of on paper, then destroy the paper',
      'Accept uncertainty — you don\'t need to know how your recovery will unfold',
    ],
    science: 'The attempt to control addictive behavior activates the brain\'s "cognitive control" network (dorsolateral prefrontal cortex), which is already impaired by chronic substance use. This creates a resource conflict: the more you try to "not think about" using, the more the brain\'s monitoring system focuses on it (ironic process theory). Surrender, by contrast, deactivates this conflict by removing the goal of control. Brain imaging studies show that acceptance-based strategies reduce activity in the amygdala (threat response) and increase connectivity between the prefrontal cortex and emotional brain regions, improving self-regulation without the depletion caused by willpower-based approaches.',
  },
  {
    id: 'scarcity-vs-abundance',
    name: 'Scarcity vs. Abundance',
    description: 'The addicted mind operates in scarcity mode: scarce dopamine, scarce money, scarce time, scarce connection, scarce hope. This scarcity mindset drives impulsive decision-making (grab what\'s available now because nothing is guaranteed later). Recovery requires building an abundance mindset — recognizing the richness of life beyond the substance.',
    addictionMindset: '"There\'s never enough. I need more to feel normal. Money is for getting high. Time without the substance is wasted time. Nothing else matters or brings joy. Life without it is empty and meaningless."',
    recoveryMindset: '"My brain is healing and natural pleasures are returning. Every sober day adds to my reserves of health, money, connection, and time. The world is full of experiences I haven\'t had yet. My capacity for joy is growing, not diminishing."',
    keyShift: 'From zero-sum thinking (the substance is the only source of pleasure) to growth mindset (my capacity for enjoyment is expanding daily). As the brain heals, natural rewards become more satisfying — but you have to actually experience them to build the neural pathways that prove this to your brain.',
    practices: [
      'Daily "abundance log" — write 3 good things that happened (no matter how small)',
      'Track money saved and visible accumulation (watch the number grow)',
      'Try one new experience per week — your brain needs novelty to build new pathways',
      'Practice "savoring" — when something feels good, pause and amplify the experience',
      'Replace "I can\'t" with "I\'m choosing not to" (agency language)',
      'Build a "sober fun list" — activities that genuinely bring you joy without substances',
    ],
    science: 'Scarcity mindset activates the brain\'s threat system, increasing cortisol and impairing prefrontal cortex function. This creates a "narrowing effect" — the brain literally cannot perceive opportunities and options that are available. Research by Dr. Eldar Shafir shows that scarcity (whether of money, time, or social connection) reduces cognitive bandwidth by the equivalent of 13 IQ points. As recovery progresses and neurotransmitter systems normalize, the brain\'s capacity to perceive abundance increases — but this process is accelerated by deliberately practicing gratitude, novelty-seeking, and savoring.',
  },
];

// ─── WELLNESS TOOLS ─────────────────────────────────────────────────────────

export const WELLNESS_TOOLS: WellnessTool[] = [
  {
    id: 'box-breathing',
    name: 'Box Breathing',
    category: 'somatic',
    description: 'A controlled breathing technique used by Navy SEALs, first responders, and elite athletes to manage acute stress, reduce anxiety, and reset the autonomic nervous system. Equal ratios of inhale, hold, exhale, and hold activate the parasympathetic nervous system within 90 seconds.',
    duration: '2-5 minutes',
    difficulty: 'Beginner',
    steps: [
      'Sit comfortably with your back straight. Close your eyes if comfortable.',
      'Exhale completely through your mouth, making a whoosh sound.',
      'INHALE slowly through your nose for a count of 4 (filling belly first, then chest).',
      'HOLD your breath for a count of 4 (do not clench — stay relaxed).',
      'EXHALE slowly through your mouth for a count of 4 (control the release).',
      'HOLD with empty lungs for a count of 4.',
      'Repeat for 4-8 cycles. Notice the shift in your body and mind.',
    ],
    benefits: [
      'Reduces cortisol (stress hormone) by up to 23%',
      'Activates vagus nerve → parasympathetic nervous system (calm mode)',
      'Reduces heart rate and blood pressure within 90 seconds',
      'Improves focus and cognitive clarity by increasing oxygen to the prefrontal cortex',
      'Breaks the stress-anxiety cycle that fuels cravings',
      'Can be done anywhere, anytime — invisible to others',
    ],
    science: 'Box breathing works by directly stimulating the vagus nerve through controlled diaphragmatic breathing. The vagus nerve is the primary component of the parasympathetic nervous system, which counteracts the "fight or flight" stress response. During the hold phases, CO2 slightly increases in the blood, which paradoxically causes vasodilation and a calming effect. Regular practice strengthens the vagal tone, making the calm response more automatic over time.',
    whenToUse: 'Acute anxiety, panic attack onset, craving wave, before a stressful situation, during withdrawal symptoms, before sleep.',
  },
  {
    id: 'grounding-5-4-3-2-1',
    name: '5-4-3-2-1 Grounding Technique',
    category: 'cognitive',
    description: 'A sensory awareness technique that pulls your attention from internal anxiety/urges into the present moment through structured observation of your environment. Effective for interrupting rumination, dissociation, and craving spirals.',
    duration: '5-10 minutes',
    difficulty: 'Beginner',
    steps: [
      'Take a deep breath. Look around you and name:',
      '5 things you can SEE (describe them in detail — color, shape, texture)',
      '4 things you can TOUCH/FEEL (reach out and physically touch them)',
      '3 things you can HEAR (close your eyes and focus on sounds)',
      '2 things you can SMELL (bring scent to nose if needed)',
      '1 thing you can TASTE (take a sip of water, notice the taste)',
      'Take another deep breath. Notice how you feel now compared to when you started.',
    ],
    benefits: [
      'Immediately interrupts rumination and craving spirals',
      'Engages the prefrontal cortex (logical brain), reducing amygdala hijack',
      'Reduces dissociation by anchoring you in physical reality',
      'Can be done anywhere — no equipment needed',
      'Creates a "pattern interrupt" that breaks automatic behavior loops',
      'Builds present-moment awareness (essential for PAWS management)',
    ],
    science: 'This technique works by engaging the brain\'s dorsal attention network (external focus) while simultaneously reducing default mode network activity (internal rumination). The structured sensory input requires active cognitive processing, which shifts resources away from the amygdala (threat/fear center) and toward the prefrontal cortex (rational thinking). Studies show that present-moment awareness techniques reduce craving intensity by up to 50% and reduce relapse risk.',
    whenToUse: 'During intense cravings, anxiety spikes, dissociation, emotional flashbacks, panic onset, or when feeling "trapped" in negative thought loops.',
  },
  {
    id: 'cold-exposure',
    name: 'Cold Exposure (Dive Reflex)',
    category: 'somatic',
    description: 'Brief cold exposure activates the mammalian dive reflex, which immediately shifts the autonomic nervous system from sympathetic (fight/flight) to parasympathetic (rest/digest). Used as a harm reduction tool in recovery communities worldwide for acute craving management.',
    duration: '30 seconds to 3 minutes',
    difficulty: 'Beginner',
    steps: [
      'Start with cold water on your face and wrists (30 seconds).',
      'Progress to a cold shower: start warm, then gradually turn to cold for the last 30-60 seconds.',
      'Focus on deep, controlled breathing during the cold exposure.',
      'If possible, end with 1-2 minutes of cold water.',
      'Afterward, warm up gradually. Notice the mental clarity and alertness.',
      'Safety: never use cold immersion if you have heart conditions without medical clearance.',
    ],
    benefits: [
      'Immediate dopamine increase of up to 250% that lasts for several hours',
      'Reduces anxiety and improves mood through endorphin release',
      'Activates the dive reflex (vagus nerve stimulation) for instant calm',
      'Increases norepinephrine (focus, alertness, energy) by 200-300%',
      'Builds mental resilience and willpower (psychological benefit)',
      'Reduces inflammation and improves immune function',
    ],
    science: 'Cold exposure activates the mammalian dive reflex: when cold water hits the face, the vagus nerve signals the heart to slow down (bradycardia) and peripheral blood vessels to constrict, redirecting blood to the brain and core organs. Simultaneously, cold exposure triggers a massive release of norepinephrine (up to 5x baseline) and dopamine (up to 250% increase), providing a natural, sustained mood boost without the neurotoxicity of substances. Regular cold exposure also increases brown fat (which burns calories to generate heat) and improves cold tolerance.',
    whenToUse: 'Acute cravings, morning energy boost, anxiety management, after exercise, when feeling emotionally numb.',
  },
  {
    id: 'journaling-cbt',
    name: 'Structured Recovery Journaling (CBT-Based)',
    category: 'cognitive',
    description: 'Cognitive Behavioral Therapy-based journaling that identifies and challenges the automatic negative thoughts (ANTs) that drive substance use. This structured approach helps you recognize thought patterns, evaluate their accuracy, and replace them with recovery-supportive alternatives.',
    duration: '10-15 minutes',
    difficulty: 'Intermediate',
    steps: [
      'Write the SITUATION: What happened? (Trigger, event, interaction, thought)',
      'Write your AUTOMATIC THOUGHT: What did you tell yourself? (The immediate thought)',
      'Rate the EMOTION: What did you feel? (Name it, rate intensity 0-10)',
      'CHALLENGE the thought: Is this 100% true? What evidence contradicts it? Would you say this to a friend?',
      'Write a BALANCED THOUGHT: A more accurate, recovery-supportive perspective',
      'Identify an ACTION: What will you do differently next time?',
      'Notice how your emotion intensity shifts after challenging the thought.',
    ],
    benefits: [
      'Breaks automatic thought-behavior patterns that lead to relapse',
      'Improves emotional awareness and regulation',
      'Creates a written record of recovery progress you can review during difficult times',
      'Reduces rumination by "externalizing" thoughts onto paper',
      'Builds cognitive flexibility — the ability to see situations from multiple perspectives',
      'Evidence-based: CBT journaling is as effective as medication for mild-moderate depression',
    ],
    science: 'CBT is the most evidence-based psychological treatment for substance use disorders. The core mechanism is identifying and modifying cognitive distortions (thinking errors) that maintain addictive behavior. Common distortions in recovery include: all-or-nothing thinking ("I relapsed once, I\'m a total failure"), catastrophizing ("This craving will never end"), fortune telling ("I know I\'m going to relapse"), and emotional reasoning ("I feel hopeless, so the situation must be hopeless"). Journaling externalizes these thought patterns, making them visible and therefore challengeable.',
    whenToUse: 'Daily practice (morning or evening), after challenging situations, during PAWS episodes, when you notice negative thought loops.',
  },
  {
    id: 'progressive-muscle-relaxation',
    name: 'Progressive Muscle Relaxation (PMR)',
    category: 'somatic',
    description: 'A systematic technique of tensing and releasing muscle groups to reduce physical tension and promote deep relaxation. Particularly effective for the muscle tension, tremors, and restlessness that accompany withdrawal and early recovery.',
    duration: '15-20 minutes',
    difficulty: 'Beginner',
    steps: [
      'Lie down or sit comfortably. Close your eyes. Take 5 deep breaths.',
      'Starting with your FEET: tense the muscles as tight as you can for 5 seconds.',
      'Release suddenly and completely. Notice the contrast between tension and relaxation for 15 seconds.',
      'Move to CALVES: tense for 5 seconds, release, observe for 15 seconds.',
      'THIGHS: tense, release, observe.',
      'STOMACH: tense, release, observe.',
      'CHEST and SHOULDERS: tense, release, observe.',
      'HANDS and ARMS: make fists, tense arms, release, observe.',
      'NECK and FACE: scrunch face, tense neck, release, observe.',
      'After completing all groups, lie still for 1-2 minutes and scan your body for any remaining tension.',
      'Take 3 deep breaths. Slowly open your eyes.',
    ],
    benefits: [
      'Reduces physical symptoms of withdrawal (tremors, tension, restlessness)',
      'Improves sleep quality and sleep onset latency',
      'Reduces cortisol levels by promoting parasympathetic activation',
      'Increases body awareness — helps identify stress before it becomes overwhelming',
      'Can be combined with guided imagery for enhanced relaxation',
      'No equipment needed, can be done in bed',
    ],
    science: 'PMR works through a principle called "reciprocal inhibition": when you voluntarily tense a muscle and then release it, the muscle automatically relaxes to a level lower than the baseline tension. This progressive deepening of relaxation reduces sympathetic nervous system activity (fight/flight) and activates the parasympathetic system (rest/digest). Regular PMR practice reduces baseline muscle tension over time, making you less reactive to stress. Studies show PMR is effective for anxiety reduction, insomnia, and craving management.',
    whenToUse: 'Before sleep (excellent for withdrawal-related insomnia), during anxiety spikes, after stressful events, during PAWS episodes with muscle tension.',
  },
];

// ─── CONTEMPLATIVE PRACTICES ─────────────────────────────────────────────────

export const CONTEMPLATIVE_PRACTICES: ContemplativePractice[] = [
  {
    id: 'grace-meditation',
    name: 'Grace Meditation',
    theme: 'grace',
    description: 'A contemplative meditation on grace — receiving what you don\'t deserve and could never earn. This practice addresses the shame and self-judgment that are the heaviest burdens in recovery. Grace is not about deserving recovery; it\'s about accepting that recovery is available to you regardless of your past.',
    duration: '10-15 minutes',
    script: `Find a comfortable position and close your eyes. Take three deep breaths.

Begin by acknowledging: "I am here. I am alive. That itself is an act of grace."

Bring to mind your recovery journey — not the struggles, but the moments of unexpected help. The friend who didn't give up on you. The morning you woke up and chose differently. The stranger who showed kindness. These were not accidents.

Repeat slowly: "I did not earn this day, but I can receive it."

Feel the weight of self-judgment you carry. Notice where it lives in your body — chest, stomach, throat. Now imagine that weight being held by something larger than yourself. You don't have to carry it alone.

Whisper: "Grace is not something I achieve. It is something I accept."

Sit in this acceptance for a few moments. There is nothing to prove, nothing to earn, no performance required. You are worthy of recovery simply because you exist.

Close with: "May I extend to myself the same grace I would give to someone I love deeply."

Slowly open your eyes when ready.`,
    benefits: [
      'Reduces shame and self-judgment — primary drivers of relapse',
      'Activates compassion circuits in the brain (insula, prefrontal cortex)',
      'Reduces cortisol and improves immune function',
      'Creates psychological safety — the foundation for genuine change',
      'Counters the perfectionism that makes setbacks feel catastrophic',
    ],
    origin: 'Rooted in contemplative Christian tradition, adapted for universal recovery use. Grace as a concept exists in many traditions — Buddhist compassion, secular humanistic kindness, Islamic rahma (mercy).',
  },
  {
    id: 'loving-kindness',
    name: 'Loving-Kindness Meditation (Metta)',
    theme: 'love',
    description: 'A Buddhist meditation practice that systematically cultivates feelings of warmth, goodwill, and compassion — first toward yourself, then toward others. In recovery, this directly addresses the self-hatred and isolation that fuel addictive behavior by rebuilding the capacity for genuine connection.',
    duration: '10-20 minutes',
    script: `Sit comfortably. Close your eyes. Take three deep breaths.

Begin with yourself. Silently repeat, with feeling:
"May I be safe. May I be healthy. May I be happy. May I live with ease."
(Repeat 3-4 times, letting each phrase sink in)

Now think of someone you love unconditionally — a child, parent, pet, or dear friend. Visualize their face. Direct the same phrases to them:
"May you be safe. May you be healthy. May you be happy. May you live with ease."
(Repeat 3-4 times)

Now think of a neutral person — a stranger, a coworker, someone you see regularly but don't know well. Extend the same wish:
"May you be safe. May you be healthy. May you be happy. May you live with ease."

Now, if you are able, think of someone who has caused you pain. This is the hardest level. Extend the wish (even if it feels forced at first):
"May you be safe. May you be healthy. May you be happy. May you live with ease."

Finally, extend loving-kindness to all beings everywhere:
"May all beings be safe. May all beings be healthy. May all beings be happy. May all beings live with ease."

Sit quietly for a moment, noticing any warmth in your chest or lightness in your mind.`,
    benefits: [
      'Increases vagal tone — measurable improvement in parasympathetic nervous system function',
      'Reduces self-criticism and builds self-compassion',
      'Decreases anger, resentment, and interpersonal conflict',
      'Increases positive emotions and life satisfaction',
      'Reduces implicit bias and increases empathy for others',
      'Improves social connection — the strongest predictor of recovery success',
    ],
    origin: 'From the Buddhist Metta (Loving-Kindness) tradition, dating back 2,500 years. Extensively studied in modern clinical psychology with strong evidence for reducing depression, anxiety, and PTSD symptoms.',
  },
  {
    id: 'forgiveness-practice',
    name: 'Forgiveness and Release Practice',
    theme: 'mercy',
    description: 'A structured contemplative practice for processing anger, resentment, and guilt. Forgiveness in this context does not mean condoning harmful behavior — it means releasing the emotional burden that keeps you tethered to the past. Unforgiven anger is like drinking poison and expecting the other person to die.',
    duration: '15-20 minutes',
    script: `Sit quietly. Close your eyes. Take five deep breaths.

Bring to mind someone you need to forgive. This could be:
- Someone who hurt you
- Yourself (for things you did while using)
- Someone who didn't support you when you needed them
- The situation itself

Acknowledge the pain without minimizing it: "What happened was real and it hurt. My anger is justified."

Now ask yourself: "Is holding onto this anger serving me? Is it helping me recover? Or is it keeping me chained to the past?"

Feel the weight of this burden. Notice where you carry it in your body.

Now, in your own time and at your own pace, speak these words internally:
"I release the need for this person (or myself) to suffer before I can be free."
"I release the debt I believe is owed to me."
"I choose to carry forward only what serves my recovery."

This does not mean forgetting. It means you choose your future over your past.

Take a deep breath. As you exhale, visualize the weight lifting — not because the situation changed, but because you changed your relationship to it.

Close with: "I am free to move forward. The past is a teacher, not a prison."

Open your eyes slowly when ready.`,
    benefits: [
      'Reduces chronic anger and resentment (which activate the same brain circuits as substance cravings)',
      'Lowers cortisol and improves cardiovascular health',
      'Improves sleep quality by reducing nighttime rumination',
      'Increases emotional freedom and reduces relapse triggers',
      'Builds psychological resilience — forgiveness is a skill that strengthens with practice',
    ],
    origin: 'Drawn from multiple contemplative traditions. Research by Dr. Everett Worthington (REACH model) shows that forgiveness reduces stress hormones, improves immune function, and reduces depression. Forgiveness is one of the strongest predictors of long-term recovery outcomes.',
  },
  {
    id: 'gratitude-surrender',
    name: 'Gratitude and Surrender Meditation',
    theme: 'gratitude',
    description: 'A dual-focus meditation that combines gratitude (acknowledging what is good in your life right now) with surrender (releasing the need to control outcomes). This practice builds the psychological foundation for sustained recovery: appreciation for the present moment and acceptance of what you cannot change.',
    duration: '10-15 minutes',
    script: `Sit comfortably. Close your eyes. Breathe naturally.

Begin with GRATITUDE. Bring to mind three things you are genuinely grateful for today. Not abstract things — specific, concrete details:

"A warm shower this morning. The taste of my coffee. My bed."

Feel the texture of gratitude in your body. It often manifests as warmth in the chest or a softening around the eyes.

Now expand your gratitude to include difficult things:
"I am grateful for my struggle, because it is making me stronger."
"I am grateful for my pain, because it is teaching me compassion."
"I am grateful for uncertainty, because it keeps me present."

Now shift to SURRENDER. Bring to mind something you are trying to control:
- Your recovery timeline
- What other people think of you
- Whether you will relapse
- The past

Speak internally: "I release my grip on this. I cannot control [this thing], and my attempt to control it is causing more suffering than the thing itself."

Feel the relief of unclenching — like releasing a fist you didn't realize you were making.

"I trust the process. I trust myself. I take the next right action and let go of the outcome."

Sit in this space of gratitude + surrender for several breaths. Notice how they work together: gratitude fills you, surrender empties you. Together, they create space for something new.

Close with: "I have enough. I am enough. This moment is enough."`,
    benefits: [
      'Increases activity in the medial prefrontal cortex (associated with positive emotion and self-reference)',
      'Reduces activity in the default mode network (associated with rumination and self-referential worry)',
      'Improves sleep quality when practiced before bed',
      'Reduces materialistic tendencies and increases life satisfaction',
      'Builds psychological flexibility — the ability to adapt to changing circumstances',
      'Reduces the "never enough" mindset that fuels both addiction and consumerism',
    ],
    origin: 'Gratitude practices from positive psychology (Robert Emmons, Martin Seligman) combined with acceptance principles from ACT (Acceptance and Commitment Therapy) and contemplative surrender traditions. Research shows that regular gratitude practice increases happiness by 25% and improves physical health markers including sleep quality and immune function.',
  },
];

export const MIND_CATEGORIES = ['Comparative Minds', 'Wellness Tools', 'Contemplative'] as const;
export const CONTEMPLATIVE_THEMES = ['grace', 'love', 'mercy', 'forgiveness', 'gratitude', 'surrender'] as const;
