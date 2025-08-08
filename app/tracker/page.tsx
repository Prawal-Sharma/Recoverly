'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  Calendar, Trophy, TrendingUp, Heart, Target, Sparkles, 
  AlertCircle, ChevronRight, Download, RefreshCw, Flame,
  Star, Award, Shield, Zap, Coffee, Moon, Sun
} from 'lucide-react'
import Link from 'next/link'

interface SobrietyData {
  startDate: string
  substance: string
  milestones: string[]
  longestStreak: number
  totalResets: number
  motivations: string[]
  emergencyContacts: Array<{
    name: string
    phone: string
    relationship: string
  }>
}

interface DailyLog {
  id: string
  date: string
  mood: number // 1-5
  cravingIntensity: number // 0-10
  triggers: string[]
  copingUsed: string[]
  notes: string
  gratitude: string
}

const milestonesList = [
  { days: 1, label: '24 Hours', icon: Star, color: 'text-yellow-500' },
  { days: 3, label: '3 Days', icon: Zap, color: 'text-blue-500' },
  { days: 7, label: '1 Week', icon: Trophy, color: 'text-green-500' },
  { days: 14, label: '2 Weeks', icon: Shield, color: 'text-purple-500' },
  { days: 30, label: '1 Month', icon: Award, color: 'text-orange-500' },
  { days: 60, label: '2 Months', icon: Heart, color: 'text-red-500' },
  { days: 90, label: '3 Months', icon: Flame, color: 'text-pink-500' },
  { days: 180, label: '6 Months', icon: Star, color: 'text-indigo-500' },
  { days: 365, label: '1 Year', icon: Trophy, color: 'text-yellow-600' },
  { days: 730, label: '2 Years', icon: Award, color: 'text-green-600' },
]

const motivationalQuotes = [
  "One day at a time.",
  "Progress, not perfection.",
  "Your best days are ahead of you.",
  "Recovery is possible.",
  "You are stronger than you know.",
  "Every day clean is a victory.",
  "Keep going. You're doing great.",
  "This too shall pass.",
  "You are not alone.",
  "Your recovery matters.",
]

const commonTriggers = [
  'Stress', 'Boredom', 'Loneliness', 'Anger', 'Celebration',
  'Social pressure', 'Specific places', 'Certain people', 'Fatigue', 'Hunger'
]

const copingStrategies = [
  'Called sponsor', 'Went to meeting', 'Exercise', 'Meditation',
  'Deep breathing', 'Journaling', 'Called friend', 'Used DBT skills',
  'Distraction', 'Self-care', 'Prayer', 'Read recovery literature'
]

export default function TrackerPage() {
  const [sobrietyData, setSobrietyData] = useState<SobrietyData | null>(null)
  const [dailyLogs, setDailyLogs] = useState<DailyLog[]>([])
  const [isSetup, setIsSetup] = useState(false)
  const [todaysLog, setTodaysLog] = useState<Partial<DailyLog>>({
    date: new Date().toISOString().split('T')[0],
    mood: 3,
    cravingIntensity: 0,
    triggers: [],
    copingUsed: [],
    notes: '',
    gratitude: ''
  })
  const [setupData, setSetupData] = useState<Partial<SobrietyData>>({
    startDate: new Date().toISOString().split('T')[0],
    substance: '',
    motivations: [],
    emergencyContacts: []
  })
  const [currentQuote, setCurrentQuote] = useState('')

  // Load data from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('sobrietyData')
    const logs = localStorage.getItem('dailyLogs')
    
    if (saved) {
      setSobrietyData(JSON.parse(saved))
      setIsSetup(true)
    }
    
    if (logs) {
      setDailyLogs(JSON.parse(logs))
    }

    // Set random quote
    setCurrentQuote(motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)])
  }, [])

  // Save data to localStorage
  useEffect(() => {
    if (sobrietyData) {
      localStorage.setItem('sobrietyData', JSON.stringify(sobrietyData))
    }
  }, [sobrietyData])

  useEffect(() => {
    if (dailyLogs.length > 0) {
      localStorage.setItem('dailyLogs', JSON.stringify(dailyLogs))
    }
  }, [dailyLogs])

  const calculateDaysSober = () => {
    if (!sobrietyData) return 0
    const start = new Date(sobrietyData.startDate)
    const today = new Date()
    const diffTime = Math.abs(today.getTime() - start.getTime())
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
  }

  const getNextMilestone = () => {
    const days = calculateDaysSober()
    return milestonesList.find(m => m.days > days) || milestonesList[milestonesList.length - 1]
  }

  const getAchievedMilestones = () => {
    const days = calculateDaysSober()
    return milestonesList.filter(m => m.days <= days)
  }

  const handleSetup = () => {
    const newData: SobrietyData = {
      startDate: setupData.startDate || new Date().toISOString().split('T')[0],
      substance: setupData.substance || 'Substance',
      milestones: [],
      longestStreak: 0,
      totalResets: 0,
      motivations: setupData.motivations || [],
      emergencyContacts: setupData.emergencyContacts || []
    }
    setSobrietyData(newData)
    setIsSetup(true)
  }

  const handleReset = () => {
    if (confirm('Are you sure you want to reset your sobriety date? This action cannot be undone.')) {
      const currentDays = calculateDaysSober()
      setSobrietyData(prev => ({
        ...prev!,
        startDate: new Date().toISOString().split('T')[0],
        longestStreak: Math.max(prev!.longestStreak, currentDays),
        totalResets: prev!.totalResets + 1
      }))
    }
  }

  const handleDailyLog = () => {
    const newLog: DailyLog = {
      id: Date.now().toString(),
      date: todaysLog.date || new Date().toISOString().split('T')[0],
      mood: todaysLog.mood || 3,
      cravingIntensity: todaysLog.cravingIntensity || 0,
      triggers: todaysLog.triggers || [],
      copingUsed: todaysLog.copingUsed || [],
      notes: todaysLog.notes || '',
      gratitude: todaysLog.gratitude || ''
    }
    
    setDailyLogs([newLog, ...dailyLogs])
    
    // Reset form
    setTodaysLog({
      date: new Date().toISOString().split('T')[0],
      mood: 3,
      cravingIntensity: 0,
      triggers: [],
      copingUsed: [],
      notes: '',
      gratitude: ''
    })
    
    alert('Daily log saved successfully!')
  }

  const handleExport = () => {
    const data = {
      sobrietyData,
      dailyLogs
    }
    const dataStr = JSON.stringify(data, null, 2)
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr)
    
    const exportFileDefaultName = `recovery-data-${new Date().toISOString().split('T')[0]}.json`
    
    const linkElement = document.createElement('a')
    linkElement.setAttribute('href', dataUri)
    linkElement.setAttribute('download', exportFileDefaultName)
    linkElement.click()
  }

  const daysSober = calculateDaysSober()
  const nextMilestone = getNextMilestone()
  const achievedMilestones = getAchievedMilestones()
  const progressToNext = nextMilestone ? (daysSober / nextMilestone.days) * 100 : 100

  if (!isSetup) {
    return (
      <div className="container max-w-2xl py-10">
        <Card>
          <CardHeader>
            <CardTitle>Set Up Your Sobriety Tracker</CardTitle>
            <CardDescription>Let's get started on tracking your recovery journey</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="startDate">Sobriety Start Date</Label>
              <Input
                id="startDate"
                type="date"
                value={setupData.startDate}
                onChange={(e) => setSetupData({...setupData, startDate: e.target.value})}
              />
            </div>
            <div>
              <Label htmlFor="substance">What are you recovering from?</Label>
              <Input
                id="substance"
                placeholder="e.g., Alcohol, Drugs, Gambling, etc."
                value={setupData.substance}
                onChange={(e) => setSetupData({...setupData, substance: e.target.value})}
              />
            </div>
            <div>
              <Label htmlFor="motivation">Why do you want to stay sober? (optional)</Label>
              <textarea
                id="motivation"
                className="w-full min-h-[100px] rounded-md border border-input bg-background px-3 py-2 text-sm"
                placeholder="Your motivations..."
                onChange={(e) => setSetupData({...setupData, motivations: e.target.value.split('\n').filter(m => m)})}
              />
            </div>
            <Button onClick={handleSetup} className="w-full">
              Start Tracking
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="container max-w-6xl py-10">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">Recovery Tracker</h1>
        <p className="text-xl text-muted-foreground">{currentQuote}</p>
      </div>

      {/* Main Stats */}
      <div className="grid gap-4 md:grid-cols-3 mb-8">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle className="text-6xl font-bold text-primary">
              {daysSober}
            </CardTitle>
            <CardDescription className="text-xl">
              Days free from {sobrietyData?.substance || 'substances'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Progress to {nextMilestone?.label}</span>
                  <span>{nextMilestone ? `${nextMilestone.days - daysSober} days to go` : 'Amazing!'}</span>
                </div>
                <Progress value={progressToNext} className="h-3" />
              </div>
              <div className="flex items-center justify-between">
                <div className="text-sm">
                  <p className="text-muted-foreground">Started</p>
                  <p className="font-medium">{sobrietyData ? new Date(sobrietyData.startDate).toLocaleDateString() : 'N/A'}</p>
                </div>
                <div className="text-sm text-right">
                  <p className="text-muted-foreground">Longest Streak</p>
                  <p className="font-medium">{sobrietyData ? Math.max(sobrietyData.longestStreak, daysSober) : 0} days</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Today's Check-in</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <Button className="w-full" variant="default" asChild>
                <Link href="#daily-log">
                  Log Today <ChevronRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button className="w-full" variant="outline" asChild>
                <Link href="/checkin">
                  Full Check-in <ChevronRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Milestones */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Milestones</CardTitle>
          <CardDescription>Celebrate your achievements</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {milestonesList.slice(0, 10).map((milestone) => {
              const achieved = daysSober >= milestone.days
              const Icon = milestone.icon
              return (
                <div
                  key={milestone.days}
                  className={`text-center p-4 rounded-lg border-2 transition-all ${
                    achieved 
                      ? 'bg-primary/10 border-primary' 
                      : 'bg-muted/50 border-muted opacity-50'
                  }`}
                >
                  <Icon className={`h-8 w-8 mx-auto mb-2 ${achieved ? milestone.color : 'text-muted-foreground'}`} />
                  <p className="font-medium text-sm">{milestone.label}</p>
                  {achieved && (
                    <Badge variant="default" className="mt-1 text-xs">
                      Achieved!
                    </Badge>
                  )}
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Daily Log Form */}
      <Card className="mb-8" id="daily-log">
        <CardHeader>
          <CardTitle>Daily Log</CardTitle>
          <CardDescription>Track your daily progress and reflections</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="mood">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="mood">Mood</TabsTrigger>
              <TabsTrigger value="cravings">Cravings</TabsTrigger>
              <TabsTrigger value="coping">Coping</TabsTrigger>
              <TabsTrigger value="reflection">Reflection</TabsTrigger>
            </TabsList>

            <TabsContent value="mood" className="space-y-4">
              <div>
                <Label>How are you feeling today?</Label>
                <div className="flex justify-between mt-2">
                  {['😔', '😕', '😐', '🙂', '😊'].map((emoji, index) => (
                    <button
                      key={index}
                      className={`text-3xl p-2 rounded-lg transition-all ${
                        todaysLog.mood === index + 1
                          ? 'bg-primary/20 scale-110'
                          : 'hover:bg-muted'
                      }`}
                      onClick={() => setTodaysLog({...todaysLog, mood: index + 1})}
                    >
                      {emoji}
                    </button>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="cravings" className="space-y-4">
              <div>
                <Label>Craving Intensity (0-10)</Label>
                <div className="flex items-center gap-4 mt-2">
                  <input
                    type="range"
                    min="0"
                    max="10"
                    value={todaysLog.cravingIntensity}
                    onChange={(e) => setTodaysLog({...todaysLog, cravingIntensity: parseInt(e.target.value)})}
                    className="flex-1"
                  />
                  <span className="text-2xl font-bold w-8">{todaysLog.cravingIntensity}</span>
                </div>
              </div>
              <div>
                <Label>Triggers (if any)</Label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2">
                  {commonTriggers.map((trigger) => (
                    <div
                      key={trigger}
                      className={`p-2 text-sm border rounded-lg cursor-pointer transition-colors ${
                        todaysLog.triggers?.includes(trigger)
                          ? 'bg-primary/10 border-primary'
                          : 'hover:bg-muted'
                      }`}
                      onClick={() => {
                        const triggers = todaysLog.triggers || []
                        setTodaysLog({
                          ...todaysLog,
                          triggers: triggers.includes(trigger)
                            ? triggers.filter(t => t !== trigger)
                            : [...triggers, trigger]
                        })
                      }}
                    >
                      {trigger}
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="coping" className="space-y-4">
              <div>
                <Label>Coping Strategies Used</Label>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  {copingStrategies.map((strategy) => (
                    <div
                      key={strategy}
                      className={`p-2 text-sm border rounded-lg cursor-pointer transition-colors ${
                        todaysLog.copingUsed?.includes(strategy)
                          ? 'bg-primary/10 border-primary'
                          : 'hover:bg-muted'
                      }`}
                      onClick={() => {
                        const coping = todaysLog.copingUsed || []
                        setTodaysLog({
                          ...todaysLog,
                          copingUsed: coping.includes(strategy)
                            ? coping.filter(c => c !== strategy)
                            : [...coping, strategy]
                        })
                      }}
                    >
                      {strategy}
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="reflection" className="space-y-4">
              <div>
                <Label htmlFor="gratitude">What are you grateful for today?</Label>
                <Input
                  id="gratitude"
                  placeholder="One thing you're grateful for..."
                  value={todaysLog.gratitude}
                  onChange={(e) => setTodaysLog({...todaysLog, gratitude: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="notes">Additional notes</Label>
                <textarea
                  id="notes"
                  className="w-full min-h-[100px] rounded-md border border-input bg-background px-3 py-2 text-sm"
                  placeholder="Any thoughts about today..."
                  value={todaysLog.notes}
                  onChange={(e) => setTodaysLog({...todaysLog, notes: e.target.value})}
                />
              </div>
            </TabsContent>
          </Tabs>

          <Button onClick={handleDailyLog} className="w-full mt-4">
            Save Daily Log
          </Button>
        </CardContent>
      </Card>

      {/* Recent Logs */}
      {dailyLogs.length > 0 && (
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Recent Logs</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {dailyLogs.slice(0, 5).map((log) => (
                <div key={log.id} className="p-3 border rounded-lg">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="font-medium">
                        {new Date(log.date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
                      </p>
                      <div className="flex gap-2 mt-1">
                        <Badge variant="outline">
                          Mood: {['😔', '😕', '😐', '🙂', '😊'][log.mood - 1]}
                        </Badge>
                        {log.cravingIntensity > 0 && (
                          <Badge variant={log.cravingIntensity > 5 ? 'destructive' : 'secondary'}>
                            Craving: {log.cravingIntensity}/10
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                  {log.gratitude && (
                    <p className="text-sm text-muted-foreground mt-2">
                      Grateful for: {log.gratitude}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Crisis Support */}
      <Card className="mb-8 border-amber-200 bg-amber-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-amber-700">
            <AlertCircle className="h-5 w-5" />
            Having Cravings or Difficult Thoughts?
          </CardTitle>
          <CardDescription className="text-amber-600">
            Use these tools to help you through challenging moments
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-3">
              <h3 className="font-semibold text-amber-800">Immediate Support</h3>
              <div className="space-y-2">
                <Button size="sm" variant="outline" asChild className="w-full justify-start">
                  <Link href="/resources/dbt/tipp">
                    <Zap className="mr-2 h-4 w-4" />
                    TIPP Crisis Skills
                  </Link>
                </Button>
                <Button size="sm" variant="outline" asChild className="w-full justify-start">
                  <Link href="/resources/cbt/trigger-map">
                    <Target className="mr-2 h-4 w-4" />
                    Map Your Triggers
                  </Link>
                </Button>
                <Button size="sm" variant="outline" asChild className="w-full justify-start">
                  <Link href="/resources/crisis">
                    <Heart className="mr-2 h-4 w-4" />
                    Crisis Resources
                  </Link>
                </Button>
              </div>
            </div>
            
            <div className="space-y-3">
              <h3 className="font-semibold text-amber-800">Emergency Contacts</h3>
              <div className="space-y-2 text-sm">
                <div className="p-2 bg-amber-100 rounded">
                  <p className="font-medium">Crisis & Suicide Prevention</p>
                  <p className="text-amber-700">Call or text <strong>988</strong></p>
                </div>
                <div className="p-2 bg-amber-100 rounded">
                  <p className="font-medium">Crisis Text Line</p>
                  <p className="text-amber-700">Text <strong>HOME</strong> to <strong>741741</strong></p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Actions */}
      <div className="flex gap-4">
        <Button variant="outline" onClick={handleExport}>
          <Download className="mr-2 h-4 w-4" />
          Export Data
        </Button>
        <Button variant="destructive" onClick={handleReset}>
          <RefreshCw className="mr-2 h-4 w-4" />
          Reset Date
        </Button>
      </div>
    </div>
  )
}