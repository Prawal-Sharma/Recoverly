export interface Program {
  id: string
  name: string
  fullName: string
  description: string
  approach: "spiritual" | "secular" | "religious"
  founded: string
  philosophy: string
  keyPrinciples: string[]
  meetingFormat: string
  pros: string[]
  cons: string[]
  bestFor: string[]
  notIdealFor: string[]
  website?: string
  additionalInfo?: string
}

export const programs: Program[] = [
  {
    id: "aa",
    name: "AA",
    fullName: "Alcoholics Anonymous",
    description: "The original 12-step program for alcohol addiction recovery, based on spiritual principles and peer support.",
    approach: "spiritual",
    founded: "1935",
    philosophy: "Recovery through surrender to a Higher Power, making amends, and helping others recover from alcoholism.",
    keyPrinciples: [
      "Admission of powerlessness over alcohol",
      "Belief in a Higher Power",
      "Moral inventory and making amends",
      "Service to others in recovery",
      "One day at a time approach"
    ],
    meetingFormat: "Group meetings with speaker shares, step work with sponsors, and fellowship activities.",
    pros: [
      "Widely available worldwide",
      "Free to attend",
      "Strong community support",
      "Proven track record since 1935",
      "24/7 support through sponsors"
    ],
    cons: [
      "Spiritual focus may not suit everyone",
      "Abstinence-only approach",
      "Can feel dogmatic to some",
      "Limited scientific backing for some aspects"
    ],
    bestFor: [
      "People open to spiritual approaches",
      "Those who benefit from structured programs",
      "People seeking lifelong community support",
      "Those who respond well to peer mentorship"
    ],
    notIdealFor: [
      "Atheists or agnostics uncomfortable with spiritual concepts",
      "People seeking medication-assisted treatment",
      "Those preferring evidence-based approaches only"
    ],
    website: "https://www.aa.org"
  },
  {
    id: "smart",
    name: "SMART Recovery",
    fullName: "Self-Management and Recovery Training",
    description: "A science-based, secular program using cognitive-behavioral techniques and motivational tools.",
    approach: "secular",
    founded: "1994",
    philosophy: "Self-empowerment and self-reliance using scientific knowledge and proven psychological techniques.",
    keyPrinciples: [
      "Building motivation to change",
      "Coping with urges and cravings",
      "Managing thoughts and behaviors",
      "Living a balanced life",
      "4-Point Program framework"
    ],
    meetingFormat: "Educational meetings with tools and techniques, group discussions, and workbook exercises.",
    pros: [
      "Evidence-based approach",
      "No spiritual requirements",
      "Teaches practical coping skills",
      "Supports medication-assisted treatment",
      "Online meetings available"
    ],
    cons: [
      "Less widespread than AA",
      "May lack the fellowship aspect",
      "Requires more self-direction",
      "Less structured than 12-step programs"
    ],
    bestFor: [
      "People preferring scientific approaches",
      "Those uncomfortable with spirituality",
      "Self-motivated individuals",
      "People seeking practical tools and techniques"
    ],
    notIdealFor: [
      "Those needing extensive peer support",
      "People who prefer spiritual frameworks",
      "Those wanting daily meetings"
    ],
    website: "https://www.smartrecovery.org"
  },
  {
    id: "dharma",
    name: "Recovery Dharma",
    fullName: "Recovery Dharma",
    description: "A peer-led movement using Buddhist principles and meditation to overcome addiction.",
    approach: "spiritual",
    founded: "2019",
    philosophy: "Recovery through understanding the Four Noble Truths and following the Eightfold Path, emphasizing mindfulness and compassion.",
    keyPrinciples: [
      "Four Noble Truths about suffering",
      "Eightfold Path to end suffering",
      "Mindfulness and meditation",
      "Compassion for self and others",
      "Community (Sangha) support"
    ],
    meetingFormat: "Meetings include meditation, dharma teachings, and sharing, with emphasis on mindfulness practices.",
    pros: [
      "Trauma-informed approach",
      "Inclusive and non-theistic",
      "Emphasizes meditation and mindfulness",
      "Free and open to all",
      "Growing online presence"
    ],
    cons: [
      "Relatively new program",
      "Limited availability in some areas",
      "May be challenging for those unfamiliar with Buddhism",
      "Less structured than traditional programs"
    ],
    bestFor: [
      "People interested in mindfulness",
      "Those seeking trauma-informed recovery",
      "Individuals drawn to Eastern philosophy",
      "People wanting inclusive, non-judgmental spaces"
    ],
    notIdealFor: [
      "Those uncomfortable with meditation",
      "People wanting highly structured programs",
      "Those preferring Western approaches"
    ],
    website: "https://recoverydharma.org"
  },
  {
    id: "celebrate",
    name: "Celebrate Recovery",
    fullName: "Celebrate Recovery",
    description: "A Christ-centered 12-step program addressing all types of hurts, habits, and hang-ups.",
    approach: "religious",
    founded: "1991",
    philosophy: "Recovery through faith in Jesus Christ, biblical principles, and the 12 steps adapted for Christian beliefs.",
    keyPrinciples: [
      "Eight Recovery Principles based on Beatitudes",
      "12 Steps with biblical comparisons",
      "Accountability through sponsors",
      "Small group support",
      "Worship and testimony"
    ],
    meetingFormat: "Large group worship and teaching, followed by gender-specific small groups for sharing.",
    pros: [
      "Addresses all types of addictions and issues",
      "Strong faith-based community",
      "Family programs available",
      "Structured curriculum",
      "Available in many churches"
    ],
    cons: [
      "Explicitly Christian focus",
      "May feel exclusive to non-Christians",
      "Can mix recovery with evangelism",
      "Less diverse than secular programs"
    ],
    bestFor: [
      "Christians seeking faith-based recovery",
      "People wanting to integrate faith and recovery",
      "Those dealing with various life issues beyond addiction",
      "Individuals seeking church community support"
    ],
    notIdealFor: [
      "Non-Christians",
      "Those preferring secular approaches",
      "People uncomfortable with evangelical settings"
    ],
    website: "https://www.celebraterecovery.com"
  },
  {
    id: "lifering",
    name: "LifeRing",
    fullName: "LifeRing Secular Recovery",
    description: "A secular, abstinence-based organization offering peer support for addiction recovery.",
    approach: "secular",
    founded: "1999",
    philosophy: "Sobriety, secularity, and self-help - empowering individuals to build their own recovery program.",
    keyPrinciples: [
      "Sobriety is the priority",
      "Secular approach - no prayer or Higher Power",
      "Self-help through personal effort",
      "Positive peer support",
      "Personal recovery plans"
    ],
    meetingFormat: "Conversational meetings focusing on the present week's challenges and successes.",
    pros: [
      "Completely secular",
      "Encourages personalized recovery",
      "Focus on present and future",
      "Crosstalk encouraged",
      "Online meetings available"
    ],
    cons: [
      "Limited availability",
      "Smaller community than AA",
      "Less structured program",
      "Fewer resources than larger organizations"
    ],
    bestFor: [
      "Atheists and agnostics",
      "People wanting conversational meetings",
      "Those preferring self-directed recovery",
      "Individuals focused on practical sobriety"
    ],
    notIdealFor: [
      "Those needing extensive structure",
      "People wanting spiritual components",
      "Those needing daily meeting options"
    ],
    website: "https://lifering.org"
  },
  {
    id: "refuge",
    name: "Refuge Recovery",
    fullName: "Refuge Recovery",
    description: "A Buddhist-inspired approach to recovery based on the Four Noble Truths.",
    approach: "spiritual",
    founded: "2014",
    philosophy: "Recovery through Buddhist practices, understanding the nature of suffering, and following the path to liberation.",
    keyPrinciples: [
      "Four Noble Truths",
      "Eightfold Path",
      "Three Jewels (Buddha, Dharma, Sangha)",
      "Meditation and mindfulness",
      "Ethical living"
    ],
    meetingFormat: "Meetings include meditation, readings from Buddhist texts, and group sharing.",
    pros: [
      "Non-theistic spiritual approach",
      "Strong meditation component",
      "Addresses root causes of suffering",
      "Inclusive community",
      "Growing availability"
    ],
    cons: [
      "Organization has faced challenges",
      "May overlap with Recovery Dharma",
      "Requires commitment to meditation",
      "Buddhist concepts may be unfamiliar"
    ],
    bestFor: [
      "People drawn to Buddhism",
      "Those seeking meditation-based recovery",
      "Individuals wanting spiritual but non-theistic approach",
      "People interested in mindfulness"
    ],
    notIdealFor: [
      "Those uncomfortable with meditation",
      "People wanting traditional structure",
      "Those preferring action-based recovery"
    ],
    website: "https://refugerecovery.org"
  }
]

export function getProgramById(id: string): Program | undefined {
  return programs.find(p => p.id === id)
}

export function getProgramsByApproach(approach: "spiritual" | "secular" | "religious"): Program[] {
  return programs.filter(p => p.approach === approach)
}