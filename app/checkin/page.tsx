'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { 
  Sun, Moon, Target, Heart, Brain, Coffee, 
  Droplets, Activity, Award, TrendingUp, Calendar,
  ChevronLeft, CheckCircle, Circle, Star, Trophy, Timer
} from 'lucide-react'
import Link from 'next/link'

interface CheckIn {
  id: string
  date: string
  time: 'morning' | 'evening'
  // Morning specific
  intention?: string
  goals?: string[]
  gratefulFor?: string[]
  energyLevel?: number
  // Evening specific
  accomplishments?: string[]
  challenges?: string[]
  tomorrowFocus?: string
  overallDay?: number
  // Shared
  mood: number
  selfCare: string[]
  notes: string
}

const selfCareActivities = [
  { id: 'water', label: 'Stayed Hydrated', icon: Droplets },
  { id: 'exercise', label: 'Exercised', icon: Activity },
  { id: 'sleep', label: 'Good Sleep', icon: Moon },
  { id: 'nutrition', label: 'Healthy Eating', icon: Coffee },
  { id: 'meditation', label: 'Meditation', icon: Brain },
  { id: 'social', label: 'Social Connection', icon: Heart },
  { id: 'nature', label: 'Time in Nature', icon: Sun },
  { id: 'creative', label: 'Creative Activity', icon: Star },
]

const moodDescriptions = [
  'Struggling',
  'Difficult',
  'Okay',
  'Good',
  'Excellent'
]

export default function CheckInPage() {
  const [checkins, setCheckins] = useState<CheckIn[]>([])
  const [currentCheckin, setCurrentCheckin] = useState<Partial<CheckIn>>({
    date: new Date().toISOString().split('T')[0],
    time: new Date().getHours() < 12 ? 'morning' : 'evening',
    mood: 3,
    selfCare: [],
    notes: '',
    energyLevel: 3,
    overallDay: 3
  })
  const [streak, setStreak] = useState(0)
  const [totalCheckins, setTotalCheckins] = useState(0)

  // Load checkins from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('dailyCheckins')
    if (saved) {
      const parsed = JSON.parse(saved)
      setCheckins(parsed)
      setTotalCheckins(parsed.length)
      calculateStreak(parsed)
    }
  }, [])

  // Save checkins to localStorage
  useEffect(() => {
    if (checkins.length > 0) {
      localStorage.setItem('dailyCheckins', JSON.stringify(checkins))
    }
  }, [checkins])

  const calculateStreak = (checkinList: CheckIn[]) => {
    if (checkinList.length === 0) {
      setStreak(0)
      return
    }

    // Sort by date
    const sorted = [...checkinList].sort((a, b) => 
      new Date(b.date).getTime() - new Date(a.date).getTime()
    )

    let currentStreak = 1
    let currentDate = new Date(sorted[0].date)
    
    for (let i = 1; i < sorted.length; i++) {
      const prevDate = new Date(sorted[i].date)
      const dayDiff = Math.floor((currentDate.getTime() - prevDate.getTime()) / (1000 * 60 * 60 * 24))
      
      if (dayDiff === 1) {
        currentStreak++
        currentDate = prevDate
      } else {
        break
      }
    }

    setStreak(currentStreak)
  }

  const handleSave = () => {
    const newCheckin: CheckIn = {
      id: Date.now().toString(),
      date: currentCheckin.date || new Date().toISOString().split('T')[0],
      time: currentCheckin.time || 'morning',
      mood: currentCheckin.mood || 3,
      selfCare: currentCheckin.selfCare || [],
      notes: currentCheckin.notes || '',
      ...(currentCheckin.time === 'morning' ? {
        intention: currentCheckin.intention,
        goals: currentCheckin.goals,
        gratefulFor: currentCheckin.gratefulFor,
        energyLevel: currentCheckin.energyLevel
      } : {
        accomplishments: currentCheckin.accomplishments,
        challenges: currentCheckin.challenges,
        tomorrowFocus: currentCheckin.tomorrowFocus,
        overallDay: currentCheckin.overallDay
      })
    }

    const updated = [newCheckin, ...checkins]
    setCheckins(updated)
    calculateStreak(updated)
    setTotalCheckins(updated.length)
    
    // Reset form
    setCurrentCheckin({
      date: new Date().toISOString().split('T')[0],
      time: new Date().getHours() < 12 ? 'morning' : 'evening',
      mood: 3,
      selfCare: [],
      notes: '',
      energyLevel: 3,
      overallDay: 3
    })
    
    alert(`${currentCheckin.time === 'morning' ? 'Morning' : 'Evening'} check-in saved!`)
  }

  const toggleSelfCare = (activityId: string) => {
    setCurrentCheckin(prev => ({
      ...prev,
      selfCare: prev.selfCare?.includes(activityId)
        ? prev.selfCare.filter(a => a !== activityId)
        : [...(prev.selfCare || []), activityId]
    }))
  }

  const isMorning = currentCheckin.time === 'morning'

  return (
    <div className="container max-w-4xl py-10">
      {/* Header */}
      <div className="mb-8">
        <Link href="/tracker" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-4">
          <ChevronLeft className="mr-1 h-4 w-4" />
          Back to Tracker
        </Link>
        <h1 className="text-4xl font-bold mb-4 flex items-center gap-2">
          {isMorning ? (
            <>
              <Sun className="h-8 w-8 text-yellow-500" />
              Morning Check-in
            </>
          ) : (
            <>
              <Moon className="h-8 w-8 text-purple-500" />
              Evening Reflection
            </>
          )}
        </h1>
        <p className="text-xl text-muted-foreground">
          {isMorning 
            ? "Start your day with intention and clarity"
            : "Reflect on your day and celebrate your progress"}
        </p>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-3 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Current Streak</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              <span className="text-2xl font-bold">{streak} days</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Total Check-ins</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-500" />
              <span className="text-2xl font-bold">{totalCheckins}</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>This Week</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex gap-1">
              {[...Array(7)].map((_, i) => {
                const date = new Date()
                date.setDate(date.getDate() - (6 - i))
                const dateStr = date.toISOString().split('T')[0]
                const hasCheckin = checkins.some(c => c.date === dateStr)
                return (
                  <div
                    key={i}
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      hasCheckin ? 'bg-primary text-primary-foreground' : 'bg-muted'
                    }`}
                  >
                    {hasCheckin ? <Check className="h-4 w-4" /> : ''}
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Time Toggle */}
      <Card className="mb-6">
        <CardContent className="pt-6">
          <div className="flex gap-2">
            <Button
              variant={isMorning ? 'default' : 'outline'}
              className="flex-1"
              onClick={() => setCurrentCheckin({...currentCheckin, time: 'morning'})}
            >
              <Sun className="mr-2 h-4 w-4" />
              Morning Check-in
            </Button>
            <Button
              variant={!isMorning ? 'default' : 'outline'}
              className="flex-1"
              onClick={() => setCurrentCheckin({...currentCheckin, time: 'evening'})}
            >
              <Moon className="mr-2 h-4 w-4" />
              Evening Reflection
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Check-in Form */}
      <div className="space-y-6">
        {/* Mood */}
        <Card>
          <CardHeader>
            <CardTitle>How are you feeling?</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="flex justify-between mb-2">
                {['😔', '😕', '😐', '🙂', '😊'].map((emoji, index) => (
                  <button
                    key={index}
                    className={`text-4xl p-3 rounded-lg transition-all ${
                      currentCheckin.mood === index + 1
                        ? 'bg-primary/20 scale-110'
                        : 'hover:bg-muted'
                    }`}
                    onClick={() => setCurrentCheckin({...currentCheckin, mood: index + 1})}
                  >
                    {emoji}
                  </button>
                ))}
              </div>
              <p className="text-center text-sm text-muted-foreground">
                {moodDescriptions[currentCheckin.mood! - 1]}
              </p>
            </div>
          </CardContent>
        </Card>

        {isMorning ? (
          <>
            {/* Morning Intention */}
            <Card>
              <CardHeader>
                <CardTitle>Set Your Intention</CardTitle>
                <CardDescription>What's your focus for today?</CardDescription>
              </CardHeader>
              <CardContent>
                <Textarea
                  placeholder="Today I will focus on..."
                  value={currentCheckin.intention || ''}
                  onChange={(e) => setCurrentCheckin({...currentCheckin, intention: e.target.value})}
                  rows={3}
                />
              </CardContent>
            </Card>

            {/* Morning Goals */}
            <Card>
              <CardHeader>
                <CardTitle>Today's Goals</CardTitle>
                <CardDescription>What do you want to accomplish?</CardDescription>
              </CardHeader>
              <CardContent>
                <Textarea
                  placeholder="1. \n2. \n3. "
                  value={currentCheckin.goals?.join('\n') || ''}
                  onChange={(e) => setCurrentCheckin({
                    ...currentCheckin, 
                    goals: e.target.value.split('\n').filter(g => g.trim())
                  })}
                  rows={4}
                />
              </CardContent>
            </Card>

            {/* Gratitude */}
            <Card>
              <CardHeader>
                <CardTitle>Gratitude</CardTitle>
                <CardDescription>What are you grateful for this morning?</CardDescription>
              </CardHeader>
              <CardContent>
                <Textarea
                  placeholder="I'm grateful for..."
                  value={currentCheckin.gratefulFor?.join('\n') || ''}
                  onChange={(e) => setCurrentCheckin({
                    ...currentCheckin,
                    gratefulFor: e.target.value.split('\n').filter(g => g.trim())
                  })}
                  rows={3}
                />
              </CardContent>
            </Card>

            {/* Energy Level */}
            <Card>
              <CardHeader>
                <CardTitle>Energy Level</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4">
                  <input
                    type="range"
                    min="1"
                    max="5"
                    value={currentCheckin.energyLevel}
                    onChange={(e) => setCurrentCheckin({...currentCheckin, energyLevel: parseInt(e.target.value)})}
                    className="flex-1"
                  />
                  <span className="text-2xl font-bold w-8">{currentCheckin.energyLevel}/5</span>
                </div>
              </CardContent>
            </Card>
          </>
        ) : (
          <>
            {/* Accomplishments */}
            <Card>
              <CardHeader>
                <CardTitle>Today's Wins</CardTitle>
                <CardDescription>What did you accomplish today?</CardDescription>
              </CardHeader>
              <CardContent>
                <Textarea
                  placeholder="I accomplished..."
                  value={currentCheckin.accomplishments?.join('\n') || ''}
                  onChange={(e) => setCurrentCheckin({
                    ...currentCheckin,
                    accomplishments: e.target.value.split('\n').filter(a => a.trim())
                  })}
                  rows={4}
                />
              </CardContent>
            </Card>

            {/* Challenges */}
            <Card>
              <CardHeader>
                <CardTitle>Challenges Faced</CardTitle>
                <CardDescription>What was difficult today?</CardDescription>
              </CardHeader>
              <CardContent>
                <Textarea
                  placeholder="I struggled with..."
                  value={currentCheckin.challenges?.join('\n') || ''}
                  onChange={(e) => setCurrentCheckin({
                    ...currentCheckin,
                    challenges: e.target.value.split('\n').filter(c => c.trim())
                  })}
                  rows={3}
                />
              </CardContent>
            </Card>

            {/* Tomorrow's Focus */}
            <Card>
              <CardHeader>
                <CardTitle>Tomorrow's Focus</CardTitle>
                <CardDescription>What's one thing you'll focus on tomorrow?</CardDescription>
              </CardHeader>
              <CardContent>
                <Input
                  placeholder="Tomorrow I will..."
                  value={currentCheckin.tomorrowFocus || ''}
                  onChange={(e) => setCurrentCheckin({...currentCheckin, tomorrowFocus: e.target.value})}
                />
              </CardContent>
            </Card>

            {/* Overall Day Rating */}
            <Card>
              <CardHeader>
                <CardTitle>Rate Your Day</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4">
                  <input
                    type="range"
                    min="1"
                    max="5"
                    value={currentCheckin.overallDay}
                    onChange={(e) => setCurrentCheckin({...currentCheckin, overallDay: parseInt(e.target.value)})}
                    className="flex-1"
                  />
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-5 w-5 ${
                          i < currentCheckin.overallDay!
                            ? 'fill-yellow-500 text-yellow-500'
                            : 'text-muted-foreground'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </>
        )}

        {/* Self-Care */}
        <Card>
          <CardHeader>
            <CardTitle>Self-Care Activities</CardTitle>
            <CardDescription>Check off what you did {isMorning ? 'yesterday' : 'today'}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {selfCareActivities.map((activity) => {
                const Icon = activity.icon
                const isSelected = currentCheckin.selfCare?.includes(activity.id)
                return (
                  <button
                    key={activity.id}
                    className={`p-3 rounded-lg border-2 transition-all ${
                      isSelected
                        ? 'bg-primary/10 border-primary'
                        : 'border-muted hover:bg-muted'
                    }`}
                    onClick={() => toggleSelfCare(activity.id)}
                  >
                    <Icon className={`h-6 w-6 mx-auto mb-1 ${
                      isSelected ? 'text-primary' : 'text-muted-foreground'
                    }`} />
                    <p className="text-xs font-medium">{activity.label}</p>
                  </button>
                )
              })}
            </div>
          </CardContent>
        </Card>

        {/* Notes */}
        <Card>
          <CardHeader>
            <CardTitle>Additional Notes</CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea
              placeholder="Any other thoughts..."
              value={currentCheckin.notes}
              onChange={(e) => setCurrentCheckin({...currentCheckin, notes: e.target.value})}
              rows={4}
            />
          </CardContent>
        </Card>

        {/* Save Button */}
        <Button onClick={handleSave} size="lg" className="w-full">
          <CheckCircle className="mr-2 h-5 w-5" />
          Complete {isMorning ? 'Morning' : 'Evening'} Check-in
        </Button>
      </div>

      {/* Recent Check-ins */}
      {checkins.length > 0 && (
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Recent Check-ins</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {checkins.slice(0, 5).map((checkin) => (
                <div key={checkin.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    {checkin.time === 'morning' ? (
                      <Sun className="h-5 w-5 text-yellow-500" />
                    ) : (
                      <Moon className="h-5 w-5 text-purple-500" />
                    )}
                    <div>
                      <p className="font-medium">
                        {new Date(checkin.date).toLocaleDateString('en-US', { 
                          weekday: 'short', 
                          month: 'short', 
                          day: 'numeric' 
                        })}
                      </p>
                      <p className="text-sm text-muted-foreground capitalize">
                        {checkin.time} check-in
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">
                      {['😔', '😕', '😐', '🙂', '😊'][checkin.mood - 1]}
                    </Badge>
                    {checkin.selfCare.length > 0 && (
                      <Badge variant="secondary">
                        {checkin.selfCare.length} self-care
                      </Badge>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Related Tools */}
      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Related Daily Tools</CardTitle>
          <CardDescription>Tools that complement your daily wellness routine</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card className="hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-center gap-3 mb-2">
                  <Trophy className="h-5 w-5 text-primary" />
                  <h4 className="font-semibold">Sobriety Tracker</h4>
                </div>
                <p className="text-sm text-muted-foreground mb-3">
                  Track your recovery journey and milestones
                </p>
                <Button size="sm" variant="outline" asChild className="w-full">
                  <Link href="/tracker">Track Progress</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-center gap-3 mb-2">
                  <Calendar className="h-5 w-5 text-primary" />
                  <h4 className="font-semibold">DBT Diary Card</h4>
                </div>
                <p className="text-sm text-muted-foreground mb-3">
                  Deep dive into emotions and DBT skills
                </p>
                <Button size="sm" variant="outline" asChild className="w-full">
                  <Link href="/resources/dbt/diary-card">Track DBT Skills</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-center gap-3 mb-2">
                  <Timer className="h-5 w-5 text-primary" />
                  <h4 className="font-semibold">Meditation Timer</h4>
                </div>
                <p className="text-sm text-muted-foreground mb-3">
                  Add mindfulness to your daily routine
                </p>
                <Button size="sm" variant="outline" asChild className="w-full">
                  <Link href="/resources/mindfulness/timer">Meditate</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-center gap-3 mb-2">
                  <Heart className="h-5 w-5 text-primary" />
                  <h4 className="font-semibold">Recovery Plan</h4>
                </div>
                <p className="text-sm text-muted-foreground mb-3">
                  Build your comprehensive recovery plan
                </p>
                <Button size="sm" variant="outline" asChild className="w-full">
                  <Link href="/recovery-plan">Build Plan</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function Check({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      viewBox="0 0 24 24"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  )
}