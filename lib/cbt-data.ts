export interface ThoughtRecord {
  id: string
  date: string
  situation: string
  automaticThought: string
  emotion: string
  emotionIntensity: number
  evidenceFor: string
  evidenceAgainst: string
  balancedThought: string
  newEmotionIntensity: number
}

export interface CognitiveDistortion {
  id: string
  name: string
  description: string
  example: string
  questions: string[]
}

export const cognitiveDistortions: CognitiveDistortion[] = [
  {
    id: 'all-or-nothing',
    name: 'All-or-Nothing Thinking',
    description: 'Seeing things in black and white categories. If your performance falls short of perfect, you see yourself as a total failure.',
    example: 'If I relapse once, I\'ve completely failed at recovery.',
    questions: [
      'Am I thinking in extremes?',
      'Is there a middle ground I\'m not seeing?',
      'Would I judge a friend this harshly?'
    ]
  },
  {
    id: 'overgeneralization',
    name: 'Overgeneralization',
    description: 'Seeing a single negative event as a never-ending pattern of defeat.',
    example: 'I couldn\'t resist a craving today. I\'ll never be able to stay sober.',
    questions: [
      'Am I assuming one event defines everything?',
      'What evidence contradicts this pattern?',
      'Have there been times when this wasn\'t true?'
    ]
  },
  {
    id: 'mental-filter',
    name: 'Mental Filter',
    description: 'Picking out a single negative detail and dwelling on it exclusively.',
    example: 'I had 29 good days this month, but all I can think about is the one bad day.',
    questions: [
      'Am I only focusing on the negative?',
      'What positive things am I overlooking?',
      'How would the full picture look?'
    ]
  },
  {
    id: 'disqualifying-positive',
    name: 'Disqualifying the Positive',
    description: 'Rejecting positive experiences by insisting they "don\'t count" for some reason.',
    example: 'I only stayed sober today because I was busy. It doesn\'t really count.',
    questions: [
      'Am I dismissing my accomplishments?',
      'Why don\'t positive things count?',
      'Would I dismiss a friend\'s achievements this way?'
    ]
  },
  {
    id: 'jumping-conclusions',
    name: 'Jumping to Conclusions',
    description: 'Making negative interpretations without actual evidence. Includes mind reading and fortune telling.',
    example: 'Everyone at the meeting thinks I\'m weak for relapsing.',
    questions: [
      'Do I have evidence for this conclusion?',
      'Am I reading minds or predicting the future?',
      'What are other possible explanations?'
    ]
  },
  {
    id: 'magnification',
    name: 'Magnification or Minimization',
    description: 'Exaggerating the importance of negative things while minimizing positives.',
    example: 'My slip-up is catastrophic, but my six months of sobriety before that was nothing special.',
    questions: [
      'Am I blowing things out of proportion?',
      'Am I minimizing my strengths?',
      'How would others view this situation?'
    ]
  },
  {
    id: 'emotional-reasoning',
    name: 'Emotional Reasoning',
    description: 'Assuming that negative emotions reflect the way things really are.',
    example: 'I feel hopeless, therefore recovery must be impossible for me.',
    questions: [
      'Am I confusing feelings with facts?',
      'Just because I feel it, does it make it true?',
      'What would the facts say?'
    ]
  },
  {
    id: 'should-statements',
    name: 'Should Statements',
    description: 'Criticizing yourself or others with shoulds, musts, and oughts.',
    example: 'I should be able to handle stress without any cravings by now.',
    questions: [
      'Am I being unreasonably demanding?',
      'Where did this "should" come from?',
      'What would be more realistic?'
    ]
  },
  {
    id: 'labeling',
    name: 'Labeling',
    description: 'Attaching a negative label to yourself or others instead of describing the error.',
    example: 'I\'m an addict. That\'s all I\'ll ever be.',
    questions: [
      'Am I defining myself by one aspect?',
      'Is this label accurate or helpful?',
      'How else could I describe this?'
    ]
  },
  {
    id: 'personalization',
    name: 'Personalization',
    description: 'Seeing yourself as the cause of negative events that you weren\'t responsible for.',
    example: 'My family member relapsed because I wasn\'t supportive enough.',
    questions: [
      'Am I taking responsibility for things outside my control?',
      'What other factors contributed?',
      'What is actually within my control?'
    ]
  }
]

export interface CBTExercise {
  id: string
  title: string
  description: string
  duration: string
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  category: string
  instructions: string[]
}

export const cbtExercises: CBTExercise[] = [
  {
    id: 'thought-challenging',
    title: 'Thought Challenging Worksheet',
    description: 'Identify and challenge negative automatic thoughts that trigger cravings or negative emotions.',
    duration: '15-20 minutes',
    difficulty: 'beginner',
    category: 'Cognitive Restructuring',
    instructions: [
      'Describe the situation that triggered your negative thought',
      'Write down your automatic thought exactly as it occurred',
      'Rate your emotion intensity from 0-100',
      'Identify which cognitive distortion applies',
      'List evidence that supports this thought',
      'List evidence against this thought',
      'Create a more balanced, realistic thought',
      'Rate your new emotion intensity from 0-100'
    ]
  },
  {
    id: 'behavioral-activation',
    title: 'Activity Scheduling',
    description: 'Plan enjoyable and meaningful activities to improve mood and reduce idle time that could lead to cravings.',
    duration: '10-15 minutes',
    difficulty: 'beginner',
    category: 'Behavioral Activation',
    instructions: [
      'List activities you used to enjoy before addiction',
      'Rate each activity for pleasure (0-10) and mastery (0-10)',
      'Schedule at least one activity for each day this week',
      'After completing, rate actual pleasure and mastery',
      'Notice patterns in what helps your mood',
      'Gradually increase activity frequency'
    ]
  },
  {
    id: 'pros-cons',
    title: 'Pros and Cons Analysis',
    description: 'Weigh the advantages and disadvantages of using substances versus staying sober.',
    duration: '20-30 minutes',
    difficulty: 'beginner',
    category: 'Decision Making',
    instructions: [
      'Draw a 2x2 grid on paper',
      'Label quadrants: Pros of Using, Cons of Using, Pros of Not Using, Cons of Not Using',
      'Fill each quadrant with honest responses',
      'Rate importance of each item (1-10)',
      'Calculate weighted totals for each choice',
      'Keep this worksheet for difficult moments'
    ]
  },
  {
    id: 'trigger-identification',
    title: 'Trigger Identification Map',
    description: 'Map out your personal triggers and develop coping strategies for each.',
    duration: '25-30 minutes',
    difficulty: 'intermediate',
    category: 'Relapse Prevention',
    instructions: [
      'List all situations that trigger cravings',
      'Categorize triggers: People, Places, Things, Emotions, Times',
      'Rate each trigger\'s intensity (1-10)',
      'For each trigger, write 3 coping strategies',
      'Identify which triggers you can avoid',
      'Create an action plan for unavoidable triggers',
      'Review and update weekly'
    ]
  },
  {
    id: 'behavior-chain',
    title: 'Behavior Chain Analysis',
    description: 'Understand the sequence of thoughts, feelings, and actions that lead to substance use.',
    duration: '30-40 minutes',
    difficulty: 'advanced',
    category: 'Behavioral Analysis',
    instructions: [
      'Identify a recent urge or relapse',
      'Work backward to find the initial trigger',
      'Map each link: Trigger → Thought → Feeling → Action → Consequence',
      'Identify vulnerability factors that made you susceptible',
      'Find the weakest links in the chain',
      'Develop strategies to break the chain at each link',
      'Practice alternative responses'
    ]
  },
  {
    id: 'values-clarification',
    title: 'Values Clarification Exercise',
    description: 'Identify your core values and align your recovery goals with what matters most to you.',
    duration: '20-25 minutes',
    difficulty: 'intermediate',
    category: 'Motivation',
    instructions: [
      'List your top 10 values (family, health, honesty, etc.)',
      'Rank them in order of importance',
      'Rate how well you\'re living each value (0-10)',
      'Identify how addiction conflicts with your values',
      'Set specific goals aligned with top 3 values',
      'Create action steps for each goal',
      'Review monthly and adjust as needed'
    ]
  },
  {
    id: 'craving-surf',
    title: 'Urge Surfing Technique',
    description: 'Learn to "ride out" cravings like waves without giving in to them.',
    duration: '10-15 minutes',
    difficulty: 'intermediate',
    category: 'Craving Management',
    instructions: [
      'When a craving hits, find a quiet place to sit',
      'Close your eyes and notice where you feel the craving in your body',
      'Observe the sensation without judgment',
      'Imagine the craving as a wave that will rise and fall',
      'Breathe deeply and "surf" the wave',
      'Notice as the intensity changes',
      'Remember: cravings typically peak at 20-30 minutes',
      'Record your success in riding out the craving'
    ]
  },
  {
    id: 'smart-goals',
    title: 'SMART Recovery Goals',
    description: 'Set Specific, Measurable, Achievable, Relevant, and Time-bound recovery goals.',
    duration: '15-20 minutes',
    difficulty: 'beginner',
    category: 'Goal Setting',
    instructions: [
      'Choose one area of recovery to focus on',
      'Make it Specific: What exactly will you do?',
      'Make it Measurable: How will you track progress?',
      'Make it Achievable: Is this realistic?',
      'Make it Relevant: Why does this matter to your recovery?',
      'Make it Time-bound: When will you complete this?',
      'Write your SMART goal statement',
      'Create weekly check-in reminders'
    ]
  }
]

export interface CBTTip {
  id: string
  category: string
  tip: string
}

export const cbtTips: CBTTip[] = [
  {
    id: '1',
    category: 'Thoughts',
    tip: 'Your thoughts are not facts. They are mental events that you can observe and question.'
  },
  {
    id: '2',
    category: 'Cravings',
    tip: 'Cravings are temporary. Most peak within 20-30 minutes. You can outlast them.'
  },
  {
    id: '3',
    category: 'Emotions',
    tip: 'Emotions are like weather - they come and go. You don\'t have to act on every feeling.'
  },
  {
    id: '4',
    category: 'Behavior',
    tip: 'Action drives motivation, not the other way around. Start small and motivation will follow.'
  },
  {
    id: '5',
    category: 'Recovery',
    tip: 'Progress, not perfection. Every positive choice strengthens your recovery.'
  },
  {
    id: '6',
    category: 'Relapse Prevention',
    tip: 'A lapse doesn\'t have to become a relapse. Get back on track immediately.'
  },
  {
    id: '7',
    category: 'Self-Talk',
    tip: 'Talk to yourself like you would to a good friend - with compassion and encouragement.'
  },
  {
    id: '8',
    category: 'Coping',
    tip: 'HALT: Check if you\'re Hungry, Angry, Lonely, or Tired when cravings hit.'
  }
]