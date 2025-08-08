export interface Meeting {
  id: string
  program: string
  name: string
  day: string
  time: string
  timezone: string
  type: 'online' | 'in-person' | 'hybrid'
  format: string[]
  url?: string
  location?: string
  description?: string
  language?: string
  isOpen?: boolean
}

export const meetings: Meeting[] = [
  // AA Meetings
  {
    id: 'aa-1',
    program: 'Alcoholics Anonymous',
    name: 'Daily Reflections',
    day: 'Daily',
    time: '7:00 AM',
    timezone: 'EST',
    type: 'online',
    format: ['Open', 'Discussion'],
    url: 'https://aa-intergroup.org/meetings',
    description: 'Start your day with daily reflections and sharing',
    language: 'English',
    isOpen: true
  },
  {
    id: 'aa-2',
    program: 'Alcoholics Anonymous',
    name: 'Big Book Study',
    day: 'Monday',
    time: '8:00 PM',
    timezone: 'PST',
    type: 'online',
    format: ['Open', 'Book Study'],
    url: 'https://aa-intergroup.org/meetings',
    description: 'Weekly Big Book study and discussion',
    language: 'English',
    isOpen: true
  },
  {
    id: 'aa-3',
    program: 'Alcoholics Anonymous',
    name: 'Women\'s Meeting',
    day: 'Wednesday',
    time: '7:00 PM',
    timezone: 'CST',
    type: 'online',
    format: ['Closed', 'Women Only'],
    url: 'https://aa-intergroup.org/meetings',
    description: 'Safe space for women in recovery',
    language: 'English',
    isOpen: false
  },
  {
    id: 'aa-4',
    program: 'Alcoholics Anonymous',
    name: 'Young People\'s Meeting',
    day: 'Friday',
    time: '9:00 PM',
    timezone: 'EST',
    type: 'online',
    format: ['Open', 'Young People'],
    url: 'https://aa-intergroup.org/meetings',
    description: 'For young people in recovery',
    language: 'English',
    isOpen: true
  },
  {
    id: 'aa-5',
    program: 'Alcoholics Anonymous',
    name: 'Spanish Speaking Meeting',
    day: 'Tuesday',
    time: '6:00 PM',
    timezone: 'PST',
    type: 'online',
    format: ['Open', 'Discussion'],
    url: 'https://aa-intergroup.org/meetings',
    description: 'Reunión en español',
    language: 'Spanish',
    isOpen: true
  },

  // SMART Recovery Meetings
  {
    id: 'smart-1',
    program: 'SMART Recovery',
    name: '4-Point Program Meeting',
    day: 'Monday',
    time: '7:00 PM',
    timezone: 'EST',
    type: 'online',
    format: ['Open', 'Tools & Discussion'],
    url: 'https://meetings.smartrecovery.org',
    description: 'Learn and practice SMART Recovery tools',
    language: 'English',
    isOpen: true
  },
  {
    id: 'smart-2',
    program: 'SMART Recovery',
    name: 'Family & Friends',
    day: 'Thursday',
    time: '8:00 PM',
    timezone: 'CST',
    type: 'online',
    format: ['Open', 'Family Support'],
    url: 'https://meetings.smartrecovery.org',
    description: 'Support for family and friends of those with addictive behaviors',
    language: 'English',
    isOpen: true
  },
  {
    id: 'smart-3',
    program: 'SMART Recovery',
    name: 'Cross-Talk Welcome',
    day: 'Wednesday',
    time: '6:30 PM',
    timezone: 'PST',
    type: 'online',
    format: ['Open', 'Interactive'],
    url: 'https://meetings.smartrecovery.org',
    description: 'Interactive discussion and problem-solving',
    language: 'English',
    isOpen: true
  },

  // Recovery Dharma Meetings
  {
    id: 'rd-1',
    program: 'Recovery Dharma',
    name: 'Monday Night Sangha',
    day: 'Monday',
    time: '7:30 PM',
    timezone: 'EST',
    type: 'online',
    format: ['Open', 'Meditation & Discussion'],
    url: 'https://recoverydharma.online',
    description: 'Guided meditation followed by dharma discussion',
    language: 'English',
    isOpen: true
  },
  {
    id: 'rd-2',
    program: 'Recovery Dharma',
    name: 'Morning Meditation',
    day: 'Daily',
    time: '6:00 AM',
    timezone: 'PST',
    type: 'online',
    format: ['Open', 'Meditation'],
    url: 'https://recoverydharma.online',
    description: 'Start your day with guided meditation',
    language: 'English',
    isOpen: true
  },
  {
    id: 'rd-3',
    program: 'Recovery Dharma',
    name: 'Book Study',
    day: 'Sunday',
    time: '10:00 AM',
    timezone: 'CST',
    type: 'online',
    format: ['Open', 'Book Study'],
    url: 'https://recoverydharma.online',
    description: 'Study of Recovery Dharma book',
    language: 'English',
    isOpen: true
  },

  // Narcotics Anonymous Meetings
  {
    id: 'na-1',
    program: 'Narcotics Anonymous',
    name: 'Just for Today',
    day: 'Daily',
    time: '12:00 PM',
    timezone: 'EST',
    type: 'online',
    format: ['Open', 'Daily Reflection'],
    url: 'https://virtual-na.org',
    description: 'Daily noon meeting with Just for Today reading',
    language: 'English',
    isOpen: true
  },
  {
    id: 'na-2',
    program: 'Narcotics Anonymous',
    name: 'Clean & Serene',
    day: 'Saturday',
    time: '8:00 PM',
    timezone: 'PST',
    type: 'online',
    format: ['Open', 'Speaker'],
    url: 'https://virtual-na.org',
    description: 'Saturday night speaker meeting',
    language: 'English',
    isOpen: true
  },
  {
    id: 'na-3',
    program: 'Narcotics Anonymous',
    name: 'Living Clean',
    day: 'Tuesday',
    time: '7:30 PM',
    timezone: 'CST',
    type: 'online',
    format: ['Open', 'Book Study'],
    url: 'https://virtual-na.org',
    description: 'Living Clean book study',
    language: 'English',
    isOpen: true
  },

  // Refuge Recovery Meetings
  {
    id: 'rr-1',
    program: 'Refuge Recovery',
    name: 'Monday Night Refuge',
    day: 'Monday',
    time: '7:00 PM',
    timezone: 'EST',
    type: 'online',
    format: ['Open', 'Meditation & Discussion'],
    url: 'https://refugerecovery.org/meetings',
    description: 'Buddhist-inspired recovery meeting',
    language: 'English',
    isOpen: true
  },
  {
    id: 'rr-2',
    program: 'Refuge Recovery',
    name: 'Sunday Sangha',
    day: 'Sunday',
    time: '11:00 AM',
    timezone: 'PST',
    type: 'online',
    format: ['Open', 'Meditation'],
    url: 'https://refugerecovery.org/meetings',
    description: 'Sunday morning meditation and recovery',
    language: 'English',
    isOpen: true
  },

  // LifeRing Meetings
  {
    id: 'lr-1',
    program: 'LifeRing',
    name: 'Monday Morning Check-in',
    day: 'Monday',
    time: '9:00 AM',
    timezone: 'EST',
    type: 'online',
    format: ['Open', 'Check-in'],
    url: 'https://lifering.org/online-meetings',
    description: 'Start your week with supportive check-in',
    language: 'English',
    isOpen: true
  },
  {
    id: 'lr-2',
    program: 'LifeRing',
    name: 'Secular Recovery',
    day: 'Thursday',
    time: '8:00 PM',
    timezone: 'CST',
    type: 'online',
    format: ['Open', 'Discussion'],
    url: 'https://lifering.org/online-meetings',
    description: 'Secular approach to recovery support',
    language: 'English',
    isOpen: true
  },

  // Women for Sobriety
  {
    id: 'wfs-1',
    program: 'Women for Sobriety',
    name: 'New Life Program',
    day: 'Tuesday',
    time: '7:00 PM',
    timezone: 'EST',
    type: 'online',
    format: ['Closed', 'Women Only'],
    url: 'https://womenforsobriety.org/meetings',
    description: 'Women supporting women in recovery',
    language: 'English',
    isOpen: false
  },
  {
    id: 'wfs-2',
    program: 'Women for Sobriety',
    name: 'Saturday Sisterhood',
    day: 'Saturday',
    time: '10:00 AM',
    timezone: 'PST',
    type: 'online',
    format: ['Closed', 'Women Only'],
    url: 'https://womenforsobriety.org/meetings',
    description: 'Weekend support and connection',
    language: 'English',
    isOpen: false
  }
]

export function searchMeetings(query: string): Meeting[] {
  const searchTerm = query.toLowerCase()
  return meetings.filter(meeting => 
    meeting.name.toLowerCase().includes(searchTerm) ||
    meeting.program.toLowerCase().includes(searchTerm) ||
    meeting.format.some(f => f.toLowerCase().includes(searchTerm)) ||
    meeting.description?.toLowerCase().includes(searchTerm) ||
    meeting.day.toLowerCase().includes(searchTerm)
  )
}

export function filterMeetings(filters: {
  program?: string
  type?: 'online' | 'in-person' | 'hybrid'
  day?: string
  isOpen?: boolean
  language?: string
}): Meeting[] {
  return meetings.filter(meeting => {
    if (filters.program && meeting.program !== filters.program) return false
    if (filters.type && meeting.type !== filters.type) return false
    if (filters.day && meeting.day !== filters.day && meeting.day !== 'Daily') return false
    if (filters.isOpen !== undefined && meeting.isOpen !== filters.isOpen) return false
    if (filters.language && meeting.language !== filters.language) return false
    return true
  })
}

export function getMeetingsByProgram(program: string): Meeting[] {
  return meetings.filter(m => m.program === program)
}

export function getTodayMeetings(): Meeting[] {
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
  const today = days[new Date().getDay()]
  return meetings.filter(m => m.day === today || m.day === 'Daily')
}