export interface QuizQuestion {
  id: string
  question: string
  description?: string
  options: {
    value: string
    label: string
    weight: {
      spiritual?: number
      secular?: number
      religious?: number
      structured?: number
      flexible?: number
      community?: number
      solo?: number
    }
  }[]
}

export interface QuizResult {
  recommendedPrograms: string[]
  scores: {
    spiritual: number
    secular: number
    religious: number
    structured: number
    flexible: number
    community: number
    solo: number
  }
  timestamp: string
}

export const quizQuestions: QuizQuestion[] = [
  {
    id: "belief-system",
    question: "What best describes your belief system?",
    description: "This helps us recommend programs that align with your worldview",
    options: [
      {
        value: "spiritual-not-religious",
        label: "I'm spiritual but not religious",
        weight: { spiritual: 3, secular: 0, religious: 0 }
      },
      {
        value: "religious",
        label: "I follow a specific religion",
        weight: { spiritual: 1, secular: 0, religious: 3 }
      },
      {
        value: "agnostic-atheist",
        label: "I'm agnostic or atheist",
        weight: { spiritual: 0, secular: 3, religious: 0 }
      },
      {
        value: "open",
        label: "I'm open to different approaches",
        weight: { spiritual: 1, secular: 1, religious: 1 }
      }
    ]
  },
  {
    id: "structure-preference",
    question: "How much structure do you prefer in a recovery program?",
    description: "Some programs have strict steps, others are more flexible",
    options: [
      {
        value: "highly-structured",
        label: "I want clear steps and guidelines to follow",
        weight: { structured: 3, flexible: 0 }
      },
      {
        value: "some-structure",
        label: "I like some structure but with flexibility",
        weight: { structured: 2, flexible: 1 }
      },
      {
        value: "flexible",
        label: "I prefer to create my own path",
        weight: { structured: 0, flexible: 3 }
      },
      {
        value: "not-sure",
        label: "I'm not sure yet",
        weight: { structured: 1, flexible: 1 }
      }
    ]
  },
  {
    id: "meeting-style",
    question: "What type of meeting environment appeals to you?",
    description: "Different programs have different meeting formats",
    options: [
      {
        value: "sharing-listening",
        label: "Sharing personal stories and listening to others",
        weight: { community: 3, solo: 0 }
      },
      {
        value: "educational",
        label: "Learning tools and techniques",
        weight: { community: 1, solo: 1, secular: 2 }
      },
      {
        value: "meditation",
        label: "Meditation and mindfulness practices",
        weight: { spiritual: 3, community: 2 }
      },
      {
        value: "discussion",
        label: "Open discussion and feedback",
        weight: { community: 2, flexible: 2 }
      }
    ]
  },
  {
    id: "higher-power",
    question: "How do you feel about the concept of a 'Higher Power'?",
    description: "Some programs emphasize this more than others",
    options: [
      {
        value: "essential",
        label: "It's essential to my recovery",
        weight: { spiritual: 3, religious: 2, secular: 0 }
      },
      {
        value: "open-interpretation",
        label: "I'm okay with it if I can interpret it my way",
        weight: { spiritual: 2, religious: 1, secular: 1 }
      },
      {
        value: "uncomfortable",
        label: "I'm uncomfortable with spiritual concepts",
        weight: { spiritual: 0, religious: 0, secular: 3 }
      },
      {
        value: "neutral",
        label: "I'm neutral about it",
        weight: { spiritual: 1, religious: 1, secular: 1 }
      }
    ]
  },
  {
    id: "recovery-approach",
    question: "Which approach to recovery resonates most with you?",
    description: "Different philosophies work for different people",
    options: [
      {
        value: "surrender-acceptance",
        label: "Surrender and acceptance",
        weight: { spiritual: 3, structured: 2 }
      },
      {
        value: "self-empowerment",
        label: "Self-empowerment and personal responsibility",
        weight: { secular: 3, flexible: 2 }
      },
      {
        value: "mindfulness-compassion",
        label: "Mindfulness and compassion",
        weight: { spiritual: 2, flexible: 2 }
      },
      {
        value: "faith-based",
        label: "Faith and religious principles",
        weight: { religious: 3, structured: 2 }
      }
    ]
  },
  {
    id: "support-preference",
    question: "What kind of support system do you prefer?",
    description: "Consider how you best connect with others",
    options: [
      {
        value: "sponsor-mentorship",
        label: "One-on-one mentorship (like a sponsor)",
        weight: { structured: 3, community: 2 }
      },
      {
        value: "group-support",
        label: "Group support and fellowship",
        weight: { community: 3, structured: 1 }
      },
      {
        value: "professional",
        label: "Professional guidance with peer support",
        weight: { secular: 2, structured: 2 }
      },
      {
        value: "self-directed",
        label: "Mostly self-directed with occasional support",
        weight: { flexible: 3, solo: 3 }
      }
    ]
  },
  {
    id: "time-commitment",
    question: "How much time can you commit to recovery activities?",
    description: "Different programs have different time expectations",
    options: [
      {
        value: "daily",
        label: "Daily meetings or practices",
        weight: { structured: 3, community: 3 }
      },
      {
        value: "few-times-week",
        label: "A few times per week",
        weight: { structured: 2, community: 2 }
      },
      {
        value: "weekly",
        label: "Once a week",
        weight: { flexible: 2, solo: 1 }
      },
      {
        value: "as-needed",
        label: "As needed or when I can",
        weight: { flexible: 3, solo: 2 }
      }
    ]
  },
  {
    id: "past-experience",
    question: "Have you tried recovery programs before?",
    description: "Your past experiences can inform future choices",
    options: [
      {
        value: "yes-12-step",
        label: "Yes, 12-step programs",
        weight: { secular: 1, flexible: 1 }
      },
      {
        value: "yes-other",
        label: "Yes, other programs",
        weight: { spiritual: 1, structured: 1 }
      },
      {
        value: "no-first-time",
        label: "No, this is my first time",
        weight: { structured: 2, community: 2 }
      },
      {
        value: "prefer-not-say",
        label: "Prefer not to say",
        weight: {}
      }
    ]
  }
]

export function calculateResults(answers: Record<string, string>): QuizResult {
  const scores = {
    spiritual: 0,
    secular: 0,
    religious: 0,
    structured: 0,
    flexible: 0,
    community: 0,
    solo: 0
  }

  // Calculate scores based on answers
  Object.entries(answers).forEach(([questionId, answer]) => {
    const question = quizQuestions.find(q => q.id === questionId)
    const option = question?.options.find(o => o.value === answer)
    
    if (option?.weight) {
      Object.entries(option.weight).forEach(([key, value]) => {
        scores[key as keyof typeof scores] += value
      })
    }
  })

  // Determine recommended programs based on scores
  const recommendedPrograms: string[] = []
  
  // Primary recommendations based on highest scores
  if (scores.secular > scores.spiritual && scores.secular > scores.religious) {
    recommendedPrograms.push("smart", "lifering")
  } else if (scores.religious > scores.spiritual && scores.religious > scores.secular) {
    recommendedPrograms.push("celebrate", "aa")
  } else if (scores.spiritual > scores.secular) {
    if (scores.flexible > scores.structured) {
      recommendedPrograms.push("dharma", "refuge")
    } else {
      recommendedPrograms.push("aa", "dharma")
    }
  }

  // Add AA if structured and community are high
  if (scores.structured > 5 && scores.community > 5 && !recommendedPrograms.includes("aa")) {
    recommendedPrograms.push("aa")
  }

  // Add SMART if secular and flexible are high
  if (scores.secular > 5 && scores.flexible > 3 && !recommendedPrograms.includes("smart")) {
    recommendedPrograms.push("smart")
  }

  // Ensure at least 2 recommendations
  if (recommendedPrograms.length < 2) {
    if (!recommendedPrograms.includes("aa")) recommendedPrograms.push("aa")
    if (!recommendedPrograms.includes("smart")) recommendedPrograms.push("smart")
  }

  // Limit to top 3
  return {
    recommendedPrograms: recommendedPrograms.slice(0, 3),
    scores,
    timestamp: new Date().toISOString()
  }
}