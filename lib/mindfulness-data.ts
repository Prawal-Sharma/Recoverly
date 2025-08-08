export interface Meditation {
  id: string
  title: string
  description: string
  duration: number // in minutes
  category: 'breath' | 'body-scan' | 'loving-kindness' | 'visualization' | 'craving' | 'anxiety'
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  script: string[]
  benefits: string[]
}

export interface BreathingExercise {
  id: string
  name: string
  description: string
  pattern: {
    inhale: number
    hold?: number
    exhale: number
    pause?: number
  }
  rounds: number
  benefits: string[]
  instructions: string[]
}

export const meditations: Meditation[] = [
  {
    id: 'craving-surf',
    title: 'Craving Surfing',
    description: 'Learn to ride out cravings like waves without giving in to them.',
    duration: 10,
    category: 'craving',
    difficulty: 'beginner',
    script: [
      'Find a comfortable seated position with your back straight but relaxed.',
      'Close your eyes or soften your gaze downward.',
      'Take three deep breaths, releasing tension with each exhale.',
      'Now, bring to mind the craving you\'re experiencing. Don\'t try to push it away.',
      'Notice where you feel the craving in your body. Is it in your chest? Your stomach? Your head?',
      'Observe the sensation without judgment, like a curious scientist.',
      'Imagine the craving as a wave in the ocean. It rises, peaks, and falls.',
      'You are the surfer, riding on top of this wave, not being pulled under by it.',
      'Breathe deeply and steadily as you ride the wave.',
      'Notice how the intensity changes. Waves always pass. Cravings always pass.',
      'Continue breathing and observing as the wave naturally subsides.',
      'Remember: you don\'t have to act on the craving. You can simply observe it.',
      'Take three more deep breaths, feeling proud of your strength.',
      'When you\'re ready, slowly open your eyes.'
    ],
    benefits: [
      'Reduces craving intensity',
      'Builds distress tolerance',
      'Increases self-awareness',
      'Develops non-reactive observation'
    ]
  },
  {
    id: 'recovery-body-scan',
    title: 'Recovery Body Scan',
    description: 'Release tension and reconnect with your healing body.',
    duration: 15,
    category: 'body-scan',
    difficulty: 'beginner',
    script: [
      'Lie down comfortably on your back, arms at your sides.',
      'Close your eyes and take five slow, deep breaths.',
      'Begin by bringing attention to your toes. Notice any sensations.',
      'Thank your feet for carrying you on this recovery journey.',
      'Move your attention to your ankles, then calves. Release any tension.',
      'Notice your knees, thighs. Your legs are strong and supporting you.',
      'Bring awareness to your hips and pelvis. Let them relax into the surface.',
      'Move to your abdomen. This area may hold stress. Breathe kindness here.',
      'Notice your chest rising and falling. Your heart is healing.',
      'Observe your shoulders. Let them drop and release their burdens.',
      'Feel your arms, heavy and relaxed. They\'re learning new, healthy habits.',
      'Notice your neck and throat. You\'re finding your voice in recovery.',
      'Bring attention to your face. Soften your jaw, eyes, forehead.',
      'Finally, notice your whole body. Healed, healing, whole.',
      'Rest here for a moment in complete acceptance.',
      'When ready, wiggle your fingers and toes, and slowly open your eyes.'
    ],
    benefits: [
      'Releases physical tension',
      'Improves body awareness',
      'Promotes relaxation',
      'Supports physical healing'
    ]
  },
  {
    id: 'self-forgiveness',
    title: 'Self-Forgiveness Meditation',
    description: 'Practice loving-kindness towards yourself and release shame.',
    duration: 12,
    category: 'loving-kindness',
    difficulty: 'intermediate',
    script: [
      'Sit comfortably with your hands resting on your heart.',
      'Close your eyes and breathe naturally.',
      'Feel the warmth of your hands on your chest.',
      'Begin by acknowledging: "I am human. I have made mistakes."',
      'Breathe in compassion, breathe out judgment.',
      'Silently repeat: "I forgive myself for my past actions."',
      'Continue breathing as you say: "I was doing the best I could with what I knew then."',
      'Place both hands on your heart and feel its steady beat.',
      'Say to yourself: "I am worthy of love and forgiveness."',
      '"I release the shame that no longer serves me."',
      '"I embrace the person I am becoming."',
      '"I am proud of my courage to change."',
      'Feel the weight of shame lifting from your shoulders.',
      'Take a deep breath and repeat: "I am enough, just as I am."',
      'Rest in this feeling of self-compassion for a few moments.',
      'When ready, lower your hands and open your eyes.'
    ],
    benefits: [
      'Reduces shame and guilt',
      'Increases self-compassion',
      'Supports emotional healing',
      'Builds self-worth'
    ]
  },
  {
    id: 'morning-intention',
    title: 'Morning Recovery Intention',
    description: 'Start your day with purpose and commitment to your recovery.',
    duration: 5,
    category: 'visualization',
    difficulty: 'beginner',
    script: [
      'Sit up in bed or in a chair, feet flat on the floor.',
      'Take three energizing breaths, filling your lungs completely.',
      'Place one hand on your heart, one on your belly.',
      'Set your intention: "Today, I choose recovery."',
      'Visualize yourself moving through your day with strength and clarity.',
      'See yourself handling challenges with your new tools and skills.',
      'Imagine reaching bedtime, proud of your choices.',
      'Take a deep breath and state: "I am capable of staying clean/sober today."',
      '"I have the tools I need."',
      '"I am supported and not alone."',
      '"Today is a gift I give myself."',
      'Take one final deep breath, feeling ready for the day.',
      'Open your eyes and begin your day with purpose.'
    ],
    benefits: [
      'Sets positive daily intention',
      'Builds commitment',
      'Increases motivation',
      'Creates mental clarity'
    ]
  },
  {
    id: 'anxiety-relief',
    title: 'Anxiety Relief Meditation',
    description: 'Calm racing thoughts and soothe anxiety naturally.',
    duration: 10,
    category: 'anxiety',
    difficulty: 'beginner',
    script: [
      'Find a quiet, safe space where you won\'t be disturbed.',
      'Sit or lie down in a comfortable position.',
      'Close your eyes and begin to notice your breath.',
      'Don\'t change it yet, just observe its natural rhythm.',
      'Now, slowly deepen your breathing. In for 4, out for 6.',
      'With each exhale, imagine releasing worry and tension.',
      'If anxious thoughts arise, see them as clouds passing in the sky.',
      'You are the sky - vast, unchanging, peaceful.',
      'The clouds of worry will pass. They always do.',
      'Return your attention to your breath whenever your mind wanders.',
      'Feel your body becoming heavier, more grounded.',
      'You are safe in this moment. Right here, right now, you are okay.',
      'Continue this peaceful breathing for a few more moments.',
      'When ready, slowly open your eyes, carrying this calm with you.'
    ],
    benefits: [
      'Reduces anxiety symptoms',
      'Slows racing thoughts',
      'Activates relaxation response',
      'Improves emotional regulation'
    ]
  },
  {
    id: 'safe-place',
    title: 'Safe Place Visualization',
    description: 'Create an inner sanctuary you can visit anytime you need peace.',
    duration: 8,
    category: 'visualization',
    difficulty: 'beginner',
    script: [
      'Close your eyes and take three calming breaths.',
      'Imagine a place where you feel completely safe and peaceful.',
      'It could be real or imaginary - a beach, forest, room, or garden.',
      'See this place clearly in your mind. Notice the colors.',
      'What do you hear? Birds? Waves? Gentle music? Silence?',
      'What do you smell? Fresh air? Flowers? The ocean?',
      'Feel the temperature. Is it warm? Cool? Just right?',
      'Notice what you\'re sitting or standing on. Feel its texture.',
      'This is your safe place. No one can enter without your permission.',
      'Here, you are protected from cravings, stress, and negativity.',
      'Take a moment to add anything that makes you feel safer.',
      'Know that you can return here anytime by closing your eyes.',
      'Take three deep breaths, memorizing this feeling of safety.',
      'When ready, slowly return to the present and open your eyes.'
    ],
    benefits: [
      'Creates mental refuge',
      'Reduces stress',
      'Builds coping resources',
      'Enhances feelings of safety'
    ]
  }
]

export const breathingExercises: BreathingExercise[] = [
  {
    id: '4-7-8',
    name: '4-7-8 Breathing',
    description: 'A powerful technique to calm the nervous system and reduce cravings.',
    pattern: {
      inhale: 4,
      hold: 7,
      exhale: 8
    },
    rounds: 4,
    benefits: [
      'Activates parasympathetic nervous system',
      'Reduces anxiety quickly',
      'Helps with sleep',
      'Interrupts craving cycles'
    ],
    instructions: [
      'Sit comfortably with your back straight',
      'Exhale completely through your mouth',
      'Close your mouth and inhale through your nose for 4 counts',
      'Hold your breath for 7 counts',
      'Exhale completely through your mouth for 8 counts',
      'This is one cycle. Repeat 3 more times',
      'If you feel dizzy, return to normal breathing'
    ]
  },
  {
    id: 'box-breathing',
    name: 'Box Breathing',
    description: 'Used by Navy SEALs to stay calm under pressure. Perfect for stressful situations.',
    pattern: {
      inhale: 4,
      hold: 4,
      exhale: 4,
      pause: 4
    },
    rounds: 5,
    benefits: [
      'Reduces stress hormones',
      'Improves focus',
      'Regulates emotions',
      'Builds distress tolerance'
    ],
    instructions: [
      'Sit upright in a comfortable position',
      'Exhale all air from your lungs',
      'Inhale through your nose for 4 counts',
      'Hold your breath for 4 counts',
      'Exhale through your mouth for 4 counts',
      'Hold empty for 4 counts',
      'Repeat for 5 complete rounds',
      'Visualize drawing a box with each cycle'
    ]
  },
  {
    id: 'belly-breathing',
    name: 'Belly Breathing',
    description: 'Simple diaphragmatic breathing to ground yourself and reduce anxiety.',
    pattern: {
      inhale: 5,
      exhale: 5
    },
    rounds: 10,
    benefits: [
      'Reduces blood pressure',
      'Decreases heart rate',
      'Improves core stability',
      'Promotes relaxation'
    ],
    instructions: [
      'Place one hand on your chest, one on your belly',
      'Breathe normally and notice which hand moves more',
      'Now, breathe deeply into your belly',
      'Your belly hand should rise more than your chest hand',
      'Inhale slowly through your nose for 5 counts',
      'Exhale slowly through your mouth for 5 counts',
      'Focus on expanding your belly, not your chest',
      'Continue for 10 breaths'
    ]
  },
  {
    id: 'coherent-breathing',
    name: 'Coherent Breathing',
    description: 'Balance your nervous system with this steady, rhythmic breathing.',
    pattern: {
      inhale: 5,
      exhale: 5
    },
    rounds: 20,
    benefits: [
      'Balances autonomic nervous system',
      'Improves heart rate variability',
      'Enhances emotional balance',
      'Builds resilience'
    ],
    instructions: [
      'Sit or lie down comfortably',
      'Begin breathing at a rate of 5 breaths per minute',
      'Inhale for 5 counts',
      'Exhale for 5 counts',
      'Keep the breath smooth and even',
      'No pauses between inhale and exhale',
      'Continue for at least 20 breaths',
      'This creates a coherent heart rhythm'
    ]
  },
  {
    id: 'emergency-calm',
    name: 'Emergency Calm Breath',
    description: 'Quick technique for immediate relief during panic or intense cravings.',
    pattern: {
      inhale: 2,
      exhale: 4
    },
    rounds: 6,
    benefits: [
      'Immediate anxiety relief',
      'Interrupts panic response',
      'Can be done anywhere',
      'Quickly shifts nervous system'
    ],
    instructions: [
      'This can be done anywhere, anytime',
      'Take a quick inhale through nose for 2 counts',
      'Exhale slowly through pursed lips for 4 counts',
      'Make your exhale twice as long as inhale',
      'Repeat 6 times',
      'Return to normal breathing',
      'Use whenever you need quick calm'
    ]
  }
]

export const mindfulnessTips = [
  {
    id: '1',
    category: 'Daily Practice',
    tip: 'Start with just 3 minutes a day. Consistency matters more than duration.'
  },
  {
    id: '2',
    category: 'Cravings',
    tip: 'When a craving hits, pause and take 10 mindful breaths before deciding what to do.'
  },
  {
    id: '3',
    category: 'Thoughts',
    tip: 'You are not your thoughts. You are the observer of your thoughts.'
  },
  {
    id: '4',
    category: 'Present Moment',
    tip: 'Use your five senses to anchor yourself in the present when your mind time-travels.'
  },
  {
    id: '5',
    category: 'Acceptance',
    tip: 'Mindfulness isn\'t about feeling good. It\'s about feeling what you feel without judgment.'
  },
  {
    id: '6',
    category: 'Walking',
    tip: 'Turn any walk into a meditation by focusing on the sensation of your feet touching the ground.'
  },
  {
    id: '7',
    category: 'Eating',
    tip: 'Practice mindful eating: notice colors, textures, and flavors. Eat slowly without distractions.'
  },
  {
    id: '8',
    category: 'HALT',
    tip: 'When triggered, check if you\'re Hungry, Angry, Lonely, or Tired. Address the real need.'
  }
]