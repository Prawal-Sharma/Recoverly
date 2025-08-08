export interface DBTModule {
  id: string
  name: string
  acronym: string
  description: string
  skills: DBTSkill[]
  color: string
}

export interface DBTSkill {
  id: string
  name: string
  description: string
  howTo: string[]
  whenToUse: string[]
  example: string
}

export const dbtModules: DBTModule[] = [
  {
    id: 'mindfulness',
    name: 'Mindfulness',
    acronym: 'Core',
    description: 'The foundation of DBT. Learn to observe your thoughts and feelings without judgment, staying present in the moment.',
    color: 'blue',
    skills: [
      {
        id: 'wise-mind',
        name: 'Wise Mind',
        description: 'Finding balance between emotional mind and reasonable mind.',
        howTo: [
          'Recognize when you\'re in emotional mind (feelings-driven)',
          'Recognize when you\'re in reasonable mind (logic-driven)',
          'Find the middle path where both emotion and logic inform decisions',
          'Practice asking "What would wise mind say?"'
        ],
        whenToUse: [
          'Making important decisions',
          'When emotions feel overwhelming',
          'When logic alone isn\'t helping',
          'During recovery planning'
        ],
        example: 'Instead of "I feel terrible, I need to use" (emotional) or "Statistics show relapse is common" (reasonable), wise mind says "I\'m struggling right now, and I can use my coping skills to get through this."'
      },
      {
        id: 'what-skills',
        name: '"What" Skills',
        description: 'Observe, Describe, and Participate in the present moment.',
        howTo: [
          'OBSERVE: Notice without words, just experience',
          'DESCRIBE: Put words to your observations without judgment',
          'PARTICIPATE: Fully engage in the current activity'
        ],
        whenToUse: [
          'When cravings arise',
          'During triggering situations',
          'To ground yourself',
          'In recovery meetings'
        ],
        example: 'Observe: Notice tension in shoulders. Describe: "My shoulders are tight." Participate: Fully engage in a stretching exercise.'
      },
      {
        id: 'how-skills',
        name: '"How" Skills',
        description: 'Non-judgmentally, One-mindfully, and Effectively.',
        howTo: [
          'NON-JUDGMENTALLY: Stick to facts without evaluation',
          'ONE-MINDFULLY: Focus on one thing at a time',
          'EFFECTIVELY: Do what works, not what\'s "right"'
        ],
        whenToUse: [
          'When self-criticism arises',
          'During multi-tasking stress',
          'When perfectionism interferes',
          'In challenging relationships'
        ],
        example: 'Instead of "I\'m weak for having cravings" (judgmental), say "I\'m experiencing cravings" (non-judgmental).'
      }
    ]
  },
  {
    id: 'distress-tolerance',
    name: 'Distress Tolerance',
    acronym: 'DT',
    description: 'Crisis survival skills to tolerate painful emotions and urges without making things worse.',
    color: 'red',
    skills: [
      {
        id: 'tipp',
        name: 'TIPP',
        description: 'Temperature, Intense exercise, Paced breathing, Paired muscle relaxation.',
        howTo: [
          'TEMPERATURE: Splash cold water on face or hold ice',
          'INTENSE EXERCISE: Do jumping jacks or run for 10-15 minutes',
          'PACED BREATHING: Breathe out longer than you breathe in',
          'PAIRED MUSCLE RELAXATION: Tense and release muscle groups'
        ],
        whenToUse: [
          'Intense cravings',
          'Panic or extreme anxiety',
          'Urges to self-harm',
          'Before making impulsive decisions'
        ],
        example: 'Feeling overwhelmed with urge to use? Fill bowl with ice water, submerge face for 15-30 seconds. This activates the dive response and quickly reduces emotional intensity.'
      },
      {
        id: 'accepts',
        name: 'ACCEPTS',
        description: 'Activities, Contributing, Comparisons, Emotions, Push away, Thoughts, Sensations.',
        howTo: [
          'ACTIVITIES: Engage in distracting activities',
          'CONTRIBUTING: Help others or volunteer',
          'COMPARISONS: Compare to when you felt worse',
          'EMOTIONS: Create opposite emotions (watch comedy)',
          'PUSH AWAY: Mentally put the problem in a box',
          'THOUGHTS: Count, do puzzles, read',
          'SENSATIONS: Use intense sensations (hold ice, listen to loud music)'
        ],
        whenToUse: [
          'Need distraction from cravings',
          'Ruminating on problems',
          'Waiting for urges to pass',
          'Preventing impulsive actions'
        ],
        example: 'Craving alcohol? Try Contributing: Call someone in recovery who might need support, volunteer at a shelter, or help a neighbor.'
      },
      {
        id: 'improve',
        name: 'IMPROVE',
        description: 'Imagery, Meaning, Prayer, Relaxation, One thing, Vacation, Encouragement.',
        howTo: [
          'IMAGERY: Visualize a peaceful scene or successful coping',
          'MEANING: Find purpose in the pain',
          'PRAYER: Connect with higher power or values',
          'RELAXATION: Progressive muscle relaxation',
          'ONE THING: Focus on one moment at a time',
          'VACATION: Take a brief mental break',
          'ENCOURAGEMENT: Be your own cheerleader'
        ],
        whenToUse: [
          'Feeling hopeless',
          'Need motivation',
          'Emotional pain feels unbearable',
          'Building resilience'
        ],
        example: 'Use Encouragement: "I\'ve gotten through cravings before. This will pass. I\'m stronger than this urge. I can do hard things."'
      },
      {
        id: 'radical-acceptance',
        name: 'Radical Acceptance',
        description: 'Fully accepting reality as it is, without fighting or denying it.',
        howTo: [
          'Notice when you\'re fighting reality',
          'Remind yourself that reality is what it is',
          'Consider causes that led to this moment',
          'Practice accepting with your whole self',
          'List what you can still control',
          'Commit to acceptance repeatedly'
        ],
        whenToUse: [
          'Can\'t change a situation',
          'Past mistakes haunting you',
          'Others won\'t change',
          'Facing consequences of addiction'
        ],
        example: 'I cannot change that I have addiction. Fighting this reality causes more suffering. I accept this is my situation AND I can still work on recovery.'
      }
    ]
  },
  {
    id: 'emotion-regulation',
    name: 'Emotion Regulation',
    acronym: 'ER',
    description: 'Understanding and managing emotions effectively to reduce vulnerability to negative emotions.',
    color: 'green',
    skills: [
      {
        id: 'please',
        name: 'PLEASE',
        description: 'Treat PhysicaL illness, balance Eating, avoid mood-Altering substances, balance Sleep, get Exercise.',
        howTo: [
          'Treat PhysicaL illness: Take medications, see doctors',
          'Balance Eating: Don\'t skip meals, avoid sugar crashes',
          'Avoid mood-Altering substances: Stay clean and sober',
          'Balance Sleep: Aim for 7-9 hours, consistent schedule',
          'Get Exercise: 20 minutes daily, even just walking'
        ],
        whenToUse: [
          'Daily preventive care',
          'Feeling emotionally vulnerable',
          'Early recovery',
          'Mood swings'
        ],
        example: 'Create a PLEASE checklist: "Today I: took meds ✓, ate 3 meals ✓, stayed sober ✓, slept 8 hours ✓, walked 30 min ✓"'
      },
      {
        id: 'abc',
        name: 'ABC',
        description: 'Accumulate positive emotions, Build mastery, Cope ahead.',
        howTo: [
          'ACCUMULATE: Do pleasant activities daily',
          'BUILD MASTERY: Do something challenging that makes you feel competent',
          'COPE AHEAD: Plan for difficult situations'
        ],
        whenToUse: [
          'Building resilience',
          'Preventing relapse',
          'Improving mood',
          'Preparing for triggers'
        ],
        example: 'Cope Ahead for a family gathering: Visualize the event, imagine triggers, plan responses, practice saying no, arrange support.'
      },
      {
        id: 'check-facts',
        name: 'Check the Facts',
        description: 'Examine whether your emotional response fits the facts of the situation.',
        howTo: [
          'Identify the emotion and its intensity',
          'Describe the prompting event (just facts)',
          'List your interpretations/assumptions',
          'Question: "Am I assuming a threat?"',
          'Check if intensity matches the facts',
          'Adjust interpretation if needed'
        ],
        whenToUse: [
          'Feeling overwhelmed',
          'Emotional response seems too big',
          'Anxiety or fear',
          'Anger issues'
        ],
        example: 'Friend didn\'t text back. Emotion: Abandoned (9/10). Facts: They didn\'t reply for 2 hours. Check: They might be busy. Adjusted intensity: 3/10.'
      },
      {
        id: 'opposite-action',
        name: 'Opposite Action',
        description: 'Act opposite to your emotional urge when the emotion doesn\'t fit the facts.',
        howTo: [
          'Identify the emotion and action urge',
          'Check if emotion is justified',
          'If not justified or not effective, act opposite',
          'Do opposite action all the way',
          'Repeat until emotion changes'
        ],
        whenToUse: [
          'Unjustified emotions',
          'Emotions making things worse',
          'Breaking emotional patterns',
          'Fighting depression/anxiety'
        ],
        example: 'Depression says isolate → Opposite: Call a friend. Shame says hide → Opposite: Share in group. Fear says avoid → Opposite: Approach.'
      }
    ]
  },
  {
    id: 'interpersonal-effectiveness',
    name: 'Interpersonal Effectiveness',
    acronym: 'IE',
    description: 'Skills for asking for what you need, saying no, and maintaining relationships while respecting yourself.',
    color: 'purple',
    skills: [
      {
        id: 'dearman',
        name: 'DEARMAN',
        description: 'Describe, Express, Assert, Reinforce, Mindful, Appear confident, Negotiate.',
        howTo: [
          'DESCRIBE: State the facts of the situation',
          'EXPRESS: Share your feelings using "I" statements',
          'ASSERT: Ask for what you want clearly',
          'REINFORCE: Explain benefits of getting what you want',
          'MINDFUL: Stay focused, don\'t get sidetracked',
          'APPEAR CONFIDENT: Use confident body language',
          'NEGOTIATE: Be willing to compromise'
        ],
        whenToUse: [
          'Asking for support',
          'Setting boundaries',
          'Requesting changes',
          'Important conversations'
        ],
        example: 'Asking for support: "I noticed I\'m struggling with cravings (Describe). I feel scared I might relapse (Express). Could you check in with me daily this week? (Assert). It would really help me stay accountable (Reinforce)."'
      },
      {
        id: 'give',
        name: 'GIVE',
        description: 'Gentle, Interested, Validate, Easy manner - for maintaining relationships.',
        howTo: [
          'GENTLE: Be nice, no attacks or judgment',
          'INTERESTED: Listen, ask questions, show you care',
          'VALIDATE: Acknowledge the other person\'s feelings',
          'EASY MANNER: Be light-hearted when appropriate'
        ],
        whenToUse: [
          'Repairing relationships',
          'Difficult conversations',
          'Supporting others',
          'Family interactions'
        ],
        example: 'With family: Be Gentle (no blame), act Interested (ask about their feelings), Validate ("I understand this is hard for you too"), Easy manner (use humor appropriately).'
      },
      {
        id: 'fast',
        name: 'FAST',
        description: 'Fair, Apologies (no excessive), Stick to values, Truthful - for self-respect.',
        howTo: [
          'FAIR: Be fair to yourself and others',
          'APOLOGIES: Don\'t over-apologize',
          'STICK TO VALUES: Don\'t compromise your values',
          'TRUTHFUL: Be honest, don\'t lie or exaggerate'
        ],
        whenToUse: [
          'Maintaining self-respect',
          'Setting boundaries',
          'Saying no',
          'Being authentic'
        ],
        example: 'Saying no to enabling: Be Fair (to yourself), no excessive Apologies ("I can\'t do that" not "I\'m so sorry"), Stick to values (sobriety first), be Truthful (honest about boundaries).'
      }
    ]
  }
]

export interface DBTDiaryCard {
  date: string
  emotions: {
    emotion: string
    intensity: number // 0-10
  }[]
  urges: {
    urge: string
    intensity: number // 0-10
    acted: boolean
  }[]
  skillsUsed: string[]
  notes: string
}

export const dbtAcronyms = [
  { acronym: 'TIPP', full: 'Temperature, Intense exercise, Paced breathing, Paired muscle relaxation' },
  { acronym: 'ACCEPTS', full: 'Activities, Contributing, Comparisons, Emotions, Push away, Thoughts, Sensations' },
  { acronym: 'IMPROVE', full: 'Imagery, Meaning, Prayer, Relaxation, One thing, Vacation, Encouragement' },
  { acronym: 'PLEASE', full: 'PhysicaL illness, Eating, Avoid substances, Sleep, Exercise' },
  { acronym: 'DEARMAN', full: 'Describe, Express, Assert, Reinforce, Mindful, Appear confident, Negotiate' },
  { acronym: 'GIVE', full: 'Gentle, Interested, Validate, Easy manner' },
  { acronym: 'FAST', full: 'Fair, Apologies, Stick to values, Truthful' },
  { acronym: 'ABC', full: 'Accumulate positives, Build mastery, Cope ahead' }
]