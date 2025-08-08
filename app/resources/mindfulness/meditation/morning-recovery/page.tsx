'use client'

import { useState, useEffect, useRef } from 'react'
import { Metadata } from 'next'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { PlayCircle, PauseCircle, RotateCcw, Volume2, ChevronRight, Sun, Target, Sparkles } from 'lucide-react'
import Link from 'next/link'

const meditationSteps = [
  {
    duration: 20,
    text: "Good morning. Welcome to this new day in your recovery. Sit comfortably and take a deep breath.",
    instruction: "Welcome the day"
  },
  {
    duration: 30,
    text: "Place your feet firmly on the ground. Feel your connection to the earth. You are grounded and present.",
    instruction: "Ground yourself"
  },
  {
    duration: 30,
    text: "Take three deep breaths. With each inhale, breathe in possibility. With each exhale, release yesterday.",
    instruction: "Cleansing breaths"
  },
  {
    duration: 40,
    text: "Today is a fresh start. Say to yourself: 'Today I choose recovery. Today I choose life.'",
    instruction: "Daily commitment"
  },
  {
    duration: 40,
    text: "Set your intention for today. What quality do you want to cultivate? Courage? Patience? Gratitude?",
    instruction: "Set intention"
  },
  {
    duration: 30,
    text: "Visualize yourself moving through your day with this intention, making choices aligned with your recovery.",
    instruction: "Visualize success"
  },
  {
    duration: 40,
    text: "Remember your 'why'. Why are you in recovery? Let this motivation fill your heart with purpose.",
    instruction: "Connect with purpose"
  },
  {
    duration: 30,
    text: "Acknowledge that challenges may arise today. You have the tools and strength to handle them.",
    instruction: "Prepare for challenges"
  },
  {
    duration: 30,
    text: "Send gratitude to yourself for showing up today, for choosing recovery one more day.",
    instruction: "Self-gratitude"
  },
  {
    duration: 20,
    text: "Take one final deep breath. Open your eyes when ready. You are prepared for this day.",
    instruction: "Begin your day"
  }
]

export default function MorningRecoveryMeditationPage() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)
  const [timeRemaining, setTimeRemaining] = useState(meditationSteps[0].duration)
  const [totalElapsed, setTotalElapsed] = useState(0)
  const [selectedIntention, setSelectedIntention] = useState('')
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  const totalDuration = meditationSteps.reduce((sum, step) => sum + step.duration, 0)
  const progress = (totalElapsed / totalDuration) * 100

  const intentions = [
    "Courage", "Patience", "Gratitude", "Compassion", "Strength", 
    "Peace", "Hope", "Acceptance", "Wisdom", "Joy"
  ]

  useEffect(() => {
    if (isPlaying && timeRemaining > 0) {
      intervalRef.current = setInterval(() => {
        setTimeRemaining(prev => {
          if (prev <= 1) {
            if (currentStep < meditationSteps.length - 1) {
              setCurrentStep(current => current + 1)
              return meditationSteps[currentStep + 1].duration
            } else {
              setIsPlaying(false)
              return 0
            }
          }
          return prev - 1
        })
        setTotalElapsed(prev => prev + 1)
      }, 1000)
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [isPlaying, timeRemaining, currentStep])

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying)
  }

  const handleReset = () => {
    setIsPlaying(false)
    setCurrentStep(0)
    setTimeRemaining(meditationSteps[0].duration)
    setTotalElapsed(0)
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  return (
    <div className="container max-w-4xl py-10">
      <div className="mb-8">
        <Link href="/resources/mindfulness" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-4">
          <ChevronRight className="h-4 w-4 rotate-180" />
          Back to Mindfulness
        </Link>
        <h1 className="text-4xl font-bold mb-4 flex items-center gap-3">
          <Sun className="h-8 w-8 text-yellow-600" />
          Morning Recovery Intention
        </h1>
        <p className="text-xl text-muted-foreground">
          Start your day with purpose and commitment to your recovery. This 5-minute practice sets a positive tone for the day ahead.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3 mb-8">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Duration</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">5 minutes</p>
            <p className="text-xs text-muted-foreground">Perfect for mornings</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Focus</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">Daily Intention</p>
            <p className="text-xs text-muted-foreground">Purpose & commitment</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Best Time</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">Morning</p>
            <p className="text-xs text-muted-foreground">Start of your day</p>
          </CardContent>
        </Card>
      </div>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Set Your Intention</CardTitle>
          <CardDescription>
            Choose a quality to cultivate today (optional)
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {intentions.map((intention) => (
              <Button
                key={intention}
                variant={selectedIntention === intention ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedIntention(intention)}
              >
                {intention}
              </Button>
            ))}
          </div>
          {selectedIntention && (
            <p className="mt-4 text-sm text-muted-foreground">
              Today's intention: <span className="font-semibold text-primary">{selectedIntention}</span>
            </p>
          )}
        </CardContent>
      </Card>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Guided Morning Meditation</CardTitle>
          <CardDescription>
            Set your recovery intention for the day
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Badge variant="outline" className="text-lg px-3 py-1">
                Step {currentStep + 1} of {meditationSteps.length}
              </Badge>
              <span className="text-sm text-muted-foreground">
                {formatTime(totalDuration - totalElapsed)} remaining
              </span>
            </div>

            <Progress value={progress} className="h-2" />

            <Card className="bg-yellow-50 dark:bg-yellow-950/20 border-yellow-200 dark:border-yellow-900/50">
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Volume2 className="h-5 w-5 text-yellow-600 mt-1 flex-shrink-0" />
                    <div className="space-y-2">
                      <p className="text-lg leading-relaxed">
                        {meditationSteps[currentStep].text}
                      </p>
                      <Badge variant="secondary" className="bg-yellow-100 dark:bg-yellow-900/50">
                        {meditationSteps[currentStep].instruction}
                      </Badge>
                    </div>
                  </div>
                  <div className="text-center text-3xl font-bold text-yellow-600">
                    {formatTime(timeRemaining)}
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-center gap-4">
              <Button
                size="lg"
                variant="outline"
                onClick={handleReset}
                disabled={totalElapsed === 0}
              >
                <RotateCcw className="h-5 w-5" />
                <span className="ml-2">Reset</span>
              </Button>
              <Button
                size="lg"
                onClick={handlePlayPause}
                className="min-w-[120px]"
              >
                {isPlaying ? (
                  <>
                    <PauseCircle className="h-5 w-5" />
                    <span className="ml-2">Pause</span>
                  </>
                ) : (
                  <>
                    <PlayCircle className="h-5 w-5" />
                    <span className="ml-2">{totalElapsed === 0 ? 'Start' : 'Resume'}</span>
                  </>
                )}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-2 mb-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5 text-primary" />
              Why Morning Intentions Matter
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-sm text-muted-foreground">
              Starting your day with intention creates a foundation for mindful choices.
            </p>
            <ul className="space-y-2 text-sm">
              <li className="flex gap-2">
                <span className="text-primary">•</span>
                Sets positive daily intention
              </li>
              <li className="flex gap-2">
                <span className="text-primary">•</span>
                Builds commitment to recovery
              </li>
              <li className="flex gap-2">
                <span className="text-primary">•</span>
                Creates mental clarity for the day
              </li>
              <li className="flex gap-2">
                <span className="text-primary">•</span>
                Increases motivation and purpose
              </li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-primary" />
              Benefits
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              <Badge variant="outline">Sets positive daily intention</Badge>
              <Badge variant="outline">Builds commitment</Badge>
              <Badge variant="outline">Increases motivation</Badge>
              <Badge variant="outline">Creates mental clarity</Badge>
              <Badge variant="outline">Enhances feelings of purpose</Badge>
              <Badge variant="outline">Strengthens recovery mindset</Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Morning Affirmations</CardTitle>
          <CardDescription>
            Use these affirmations to strengthen your morning practice
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 md:grid-cols-2">
            <div className="p-4 bg-muted/50 rounded-lg">
              <p className="text-sm italic">"Today I choose recovery over everything else."</p>
            </div>
            <div className="p-4 bg-muted/50 rounded-lg">
              <p className="text-sm italic">"I have the strength to face whatever comes my way."</p>
            </div>
            <div className="p-4 bg-muted/50 rounded-lg">
              <p className="text-sm italic">"Each day in recovery is a gift I give myself."</p>
            </div>
            <div className="p-4 bg-muted/50 rounded-lg">
              <p className="text-sm italic">"I am building a life I don't want to escape from."</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Making It a Habit</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <h3 className="font-semibold">Morning Routine</h3>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>• Practice immediately upon waking</li>
                <li>• Pair with morning coffee or tea</li>
                <li>• Set a daily reminder on your phone</li>
                <li>• Keep it consistent, same time daily</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold">Quick Alternatives</h3>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>• 3 deep breaths with intention</li>
                <li>• Write today's intention in a journal</li>
                <li>• Say a recovery prayer or mantra</li>
                <li>• 1-minute gratitude practice</li>
              </ul>
            </div>
          </div>
          <div className="p-4 bg-yellow-50 dark:bg-yellow-950/20 rounded-lg">
            <p className="text-sm">
              <strong>Pro Tip:</strong> Write your intention on a sticky note and place it somewhere you'll see throughout the day - 
              bathroom mirror, car dashboard, or phone wallpaper.
            </p>
          </div>
        </CardContent>
      </Card>

      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Complete Your Morning Routine</h2>
        <div className="grid gap-4 md:grid-cols-3">
          <Card className="hover:shadow-lg transition-shadow">
            <Link href="/checkin">
              <CardHeader>
                <CardTitle className="text-lg">Daily Check-in</CardTitle>
                <CardDescription>Track your mood and wellness</CardDescription>
              </CardHeader>
            </Link>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <Link href="/tracker">
              <CardHeader>
                <CardTitle className="text-lg">Sobriety Tracker</CardTitle>
                <CardDescription>Log your progress</CardDescription>
              </CardHeader>
            </Link>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <Link href="/resources/mindfulness/breathing">
              <CardHeader>
                <CardTitle className="text-lg">Breathing Exercise</CardTitle>
                <CardDescription>Energize for the day</CardDescription>
              </CardHeader>
            </Link>
          </Card>
        </div>
      </div>
    </div>
  )
}