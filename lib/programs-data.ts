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
  },
  {
    id: "na",
    name: "NA",
    fullName: "Narcotics Anonymous",
    description: "A 12-step program for recovery from drug addiction, adapted from AA principles.",
    approach: "spiritual",
    founded: "1953",
    philosophy: "Recovery from the disease of addiction through working the 12 steps and helping other addicts.",
    keyPrinciples: [
      "Complete abstinence from all drugs",
      "Addiction as a disease",
      "Spiritual principles over specific substances",
      "Unity and service",
      "Anonymity and non-affiliation"
    ],
    meetingFormat: "Group meetings with readings, speaker shares, and open discussion. Various meeting formats available.",
    pros: [
      "Addresses all drug addictions",
      "Worldwide availability",
      "Free to attend",
      "Strong fellowship",
      "24-hour support network"
    ],
    cons: [
      "Spiritual focus may not suit everyone",
      "Abstinence-only approach",
      "Can be triggering to hear drug stories",
      "Quality varies by group"
    ],
    bestFor: [
      "People with drug addiction",
      "Those seeking spiritual approach",
      "Individuals wanting peer support",
      "People needing structure"
    ],
    notIdealFor: [
      "Those preferring secular approaches",
      "People wanting moderation",
      "Individuals uncomfortable with spirituality"
    ],
    website: "https://na.org"
  },
  {
    id: "alanon",
    name: "Al-Anon",
    fullName: "Al-Anon Family Groups",
    description: "Support groups for families and friends of alcoholics, whether the alcoholic is still drinking or not.",
    approach: "spiritual",
    founded: "1951",
    philosophy: "Recovery from the effects of living with an alcoholic through the 12 steps and mutual support.",
    keyPrinciples: [
      "Focus on your own recovery",
      "Detachment with love",
      "You didn't cause it, can't control it, can't cure it",
      "Let go and let God",
      "Keep the focus on yourself"
    ],
    meetingFormat: "Group meetings with topic discussions, step work, and sharing experiences.",
    pros: [
      "Specifically for family members",
      "Worldwide availability",
      "Free to attend",
      "Alateen for teenagers",
      "Literature and resources"
    ],
    cons: [
      "Spiritual focus",
      "Can feel victim-focused to some",
      "May enable codependency",
      "Limited to alcohol focus"
    ],
    bestFor: [
      "Family members of alcoholics",
      "Spouses and partners",
      "Adult children of alcoholics",
      "Those dealing with alcoholic loved ones"
    ],
    notIdealFor: [
      "The alcoholic themselves",
      "Those preferring action-oriented approaches",
      "People wanting professional therapy"
    ],
    website: "https://al-anon.org"
  },
  {
    id: "aca",
    name: "ACA",
    fullName: "Adult Children of Alcoholics",
    description: "A 12-step program for adults who grew up in alcoholic or dysfunctional families.",
    approach: "spiritual",
    founded: "1978",
    philosophy: "Healing from childhood trauma and dysfunction through reparenting ourselves and breaking generational patterns.",
    keyPrinciples: [
      "Identifying the 14 traits of adult children",
      "Inner child work",
      "Reparenting ourselves",
      "Breaking the cycle",
      "Grieving childhood losses"
    ],
    meetingFormat: "Topic meetings, step study groups, and workbook meetings focused on healing childhood wounds.",
    pros: [
      "Addresses root causes",
      "Trauma-informed approach",
      "Breaking generational patterns",
      "Deep emotional work",
      "Supportive community"
    ],
    cons: [
      "Can be emotionally intense",
      "Focuses on past",
      "May retraumatize without proper support",
      "Progress can be slow"
    ],
    bestFor: [
      "Adults from dysfunctional families",
      "Children of alcoholics/addicts",
      "Those with childhood trauma",
      "People seeking deep healing"
    ],
    notIdealFor: [
      "Those wanting immediate symptom relief",
      "People uncomfortable with emotional work",
      "Individuals preferring present-focused approaches"
    ],
    website: "https://adultchildren.org"
  },
  {
    id: "coda",
    name: "CoDA",
    fullName: "Codependents Anonymous",
    description: "A 12-step program for people seeking healthy, loving relationships.",
    approach: "spiritual",
    founded: "1986",
    philosophy: "Recovery from codependency through developing healthy relationships with self, others, and Higher Power.",
    keyPrinciples: [
      "Identifying codependent patterns",
      "Developing healthy boundaries",
      "Self-care and self-love",
      "Interdependence vs codependence",
      "Emotional sobriety"
    ],
    meetingFormat: "Topic meetings, step studies, and pattern workshops focused on relationship recovery.",
    pros: [
      "Addresses relationship patterns",
      "Helps with boundaries",
      "Supportive community",
      "Free to attend",
      "Complements other programs"
    ],
    cons: [
      "Can feel vague or unfocused",
      "Slow progress",
      "May overanalyze relationships",
      "Limited scientific backing"
    ],
    bestFor: [
      "People with relationship issues",
      "Those who lose themselves in relationships",
      "Individuals with poor boundaries",
      "People from dysfunctional families"
    ],
    notIdealFor: [
      "Those wanting quick fixes",
      "People preferring concrete goals",
      "Individuals uncomfortable with spiritual concepts"
    ],
    website: "https://coda.org"
  },
  {
    id: "sos",
    name: "SOS",
    fullName: "Secular Organizations for Sobriety",
    description: "A non-religious, self-empowerment approach to recovery from alcohol and drug addiction.",
    approach: "secular",
    founded: "1985",
    philosophy: "Sobriety through personal responsibility, self-reliance, and the power of the sober self.",
    keyPrinciples: [
      "Sobriety is Priority #1",
      "Personal responsibility",
      "Self-reliance and self-determination",
      "No supernatural beliefs required",
      "Rational decision-making"
    ],
    meetingFormat: "Crosstalk meetings where members can directly respond to and support each other.",
    pros: [
      "Completely secular",
      "Self-directed recovery",
      "Crosstalk encouraged",
      "Free to attend",
      "Respects individual paths"
    ],
    cons: [
      "Limited availability",
      "Less structured than 12-step",
      "Smaller community",
      "Fewer resources"
    ],
    bestFor: [
      "Atheists and agnostics",
      "Those preferring self-reliance",
      "People wanting secular support",
      "Individuals valuing personal responsibility"
    ],
    notIdealFor: [
      "Those wanting spiritual approach",
      "People needing extensive structure",
      "Individuals preferring larger communities"
    ],
    website: "https://www.sossobriety.org"
  },
  {
    id: "hams",
    name: "HAMS",
    fullName: "Harm Reduction, Abstinence, and Moderation Support",
    description: "A peer support group offering flexible goals from safer drinking to reduced drinking to quitting.",
    approach: "secular",
    founded: "2007",
    philosophy: "Better is better - any positive change in drinking habits is an improvement worth celebrating.",
    keyPrinciples: [
      "You choose your own goal",
      "Harm reduction strategies",
      "No judgment or coercion",
      "Better is better",
      "17 optional elements"
    ],
    meetingFormat: "Online forums, chat rooms, and some in-person meetings with peer support.",
    pros: [
      "Flexible goals",
      "Non-judgmental",
      "Harm reduction focus",
      "Online accessibility",
      "Evidence-based strategies"
    ],
    cons: [
      "May enable continued drinking",
      "Not for severe addiction",
      "Limited in-person meetings",
      "Less accountability"
    ],
    bestFor: [
      "Problem drinkers",
      "Those wanting moderation",
      "People not ready for abstinence",
      "Individuals seeking flexibility"
    ],
    notIdealFor: [
      "Severe alcohol dependence",
      "Those needing abstinence",
      "People wanting strict structure"
    ],
    website: "https://hams.cc"
  },
  {
    id: "mm",
    name: "MM",
    fullName: "Moderation Management",
    description: "A behavioral change program for problem drinkers seeking to moderate their alcohol consumption.",
    approach: "secular",
    founded: "1994",
    philosophy: "Problem drinking is a learned behavior that can be modified through self-management and behavioral change.",
    keyPrinciples: [
      "9-step program",
      "30-day abstinence period",
      "Moderate drinking guidelines",
      "Self-monitoring tools",
      "Cognitive-behavioral techniques"
    ],
    meetingFormat: "Online and in-person meetings focused on moderation strategies and support.",
    pros: [
      "Moderation option",
      "Evidence-based",
      "Clear guidelines",
      "Self-assessment tools",
      "CBT techniques"
    ],
    cons: [
      "Not for severe addiction",
      "Requires strong self-control",
      "May delay needed abstinence",
      "Limited availability"
    ],
    bestFor: [
      "Early-stage problem drinkers",
      "Those wanting to moderate",
      "People with strong self-control",
      "Individuals preferring CBT approach"
    ],
    notIdealFor: [
      "Severe alcohol dependence",
      "Those with liver disease",
      "People unable to moderate"
    ],
    website: "https://moderation.org"
  },
  {
    id: "wfs",
    name: "WFS",
    fullName: "Women for Sobriety",
    description: "A self-help program specifically designed for women overcoming alcohol and drug addiction.",
    approach: "secular",
    founded: "1975",
    philosophy: "Recovery through positive thinking, self-discovery, and emotional and spiritual growth tailored for women.",
    keyPrinciples: [
      "13 Acceptance Statements",
      "Positive thinking",
      "Emotional and spiritual growth",
      "Taking responsibility",
      "Creating a new life"
    ],
    meetingFormat: "Women-only meetings focusing on building self-esteem and addressing women-specific issues.",
    pros: [
      "Women-specific focus",
      "Addresses trauma and shame",
      "Positive, empowering approach",
      "Small, intimate groups",
      "Emphasis on emotional growth"
    ],
    cons: [
      "Limited to women",
      "Smaller network",
      "Less availability",
      "May feel too positive for some"
    ],
    bestFor: [
      "Women in recovery",
      "Those dealing with shame",
      "Women seeking empowerment",
      "Individuals wanting positive focus"
    ],
    notIdealFor: [
      "Men",
      "Those preferring co-ed groups",
      "People wanting larger networks"
    ],
    website: "https://womenforsobriety.org"
  },
  {
    id: "ga",
    name: "GA",
    fullName: "Gamblers Anonymous",
    description: "A 12-step program for people with gambling addiction seeking to stop gambling entirely.",
    approach: "spiritual",
    founded: "1957",
    philosophy: "Recovery from compulsive gambling through abstinence, the 12 steps, and helping other gamblers.",
    keyPrinciples: [
      "Complete abstinence from gambling",
      "20 questions for self-diagnosis",
      "Unity and recovery",
      "Making financial amends",
      "Rebuilding trust"
    ],
    meetingFormat: "Group meetings with GA literature, personal stories, and mutual support.",
    pros: [
      "Specifically for gambling",
      "Proven 12-step model",
      "Gam-Anon for families",
      "Financial recovery focus",
      "Free to attend"
    ],
    cons: [
      "Abstinence-only",
      "Limited availability in some areas",
      "Spiritual focus",
      "May not address underlying issues"
    ],
    bestFor: [
      "Compulsive gamblers",
      "Those with gambling debts",
      "People losing control",
      "Individuals seeking abstinence"
    ],
    notIdealFor: [
      "Casual gamblers",
      "Those wanting moderation",
      "People preferring secular approaches"
    ],
    website: "https://www.gamblersanonymous.org"
  },
  {
    id: "saa",
    name: "SAA",
    fullName: "Sex Addicts Anonymous",
    description: "A 12-step program for people seeking recovery from addictive sexual behavior.",
    approach: "spiritual",
    founded: "1977",
    philosophy: "Recovery from sex addiction through defining personal sobriety, working the steps, and helping others.",
    keyPrinciples: [
      "Three circles of behavior",
      "Personal sobriety definition",
      "Accountability and honesty",
      "Healthy sexuality",
      "Spiritual principles"
    ],
    meetingFormat: "Gender-specific and mixed meetings with sharing and step work.",
    pros: [
      "Addresses sex addiction",
      "Flexible sobriety definition",
      "Safe, confidential space",
      "Partners programs available",
      "Literature and tools"
    ],
    cons: [
      "Shame and stigma",
      "Can be triggering",
      "Limited availability",
      "Spiritual focus"
    ],
    bestFor: [
      "Sex addicts",
      "Those with compulsive sexual behavior",
      "People seeking accountability",
      "Individuals wanting recovery"
    ],
    notIdealFor: [
      "Those uncomfortable with topic",
      "People wanting quick fixes",
      "Individuals preferring therapy only"
    ],
    website: "https://saa-recovery.org"
  },
  {
    id: "oa",
    name: "OA",
    fullName: "Overeaters Anonymous",
    description: "A 12-step program for people with eating disorders including overeating, undereating, and bulimia.",
    approach: "spiritual",
    founded: "1960",
    philosophy: "Recovery from compulsive eating through abstinence from compulsive eating behaviors and working the 12 steps.",
    keyPrinciples: [
      "Abstinence from compulsive eating",
      "No specific food plans",
      "Physical, emotional, spiritual recovery",
      "Tools of recovery",
      "Sponsor guidance"
    ],
    meetingFormat: "Various meeting types including speaker, literature, and writing meetings.",
    pros: [
      "Addresses all eating disorders",
      "No weigh-ins or diets",
      "Free to attend",
      "Worldwide availability",
      "Multiple meeting formats"
    ],
    cons: [
      "Can be food-focused",
      "Abstinence hard to define",
      "May trigger eating disorders",
      "Spiritual approach"
    ],
    bestFor: [
      "Compulsive eaters",
      "People with binge eating",
      "Those with bulimia",
      "Individuals seeking support"
    ],
    notIdealFor: [
      "Those needing medical treatment",
      "People wanting diet programs",
      "Individuals preferring secular approaches"
    ],
    website: "https://oa.org"
  }
]

export function getProgramById(id: string): Program | undefined {
  return programs.find(p => p.id === id)
}

export function getProgramsByApproach(approach: "spiritual" | "secular" | "religious"): Program[] {
  return programs.filter(p => p.approach === approach)
}