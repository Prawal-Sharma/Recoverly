'use client'

import { useState, useEffect, useRef } from 'react'
import { Metadata } from 'next'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { PlayCircle, PauseCircle, RotateCcw, Volume2, ChevronRight, Shield, Wind, Heart } from 'lucide-react'
import Link from 'next/link'

const meditationSteps = [
  {
    duration: 30,
    text: "Welcome. You are safe in this moment. Find a comfortable position and place one hand on your chest, one on your belly.",
    instruction: "Get grounded"
  },
  {
    duration: 40,
    text: "Take a deep breath in for 4 counts... Hold for 4... Exhale for 6. This activates your calming response.",
    instruction: "4-4-6 breathing"
  },
  {
    duration: 40,
    text: "Continue this breathing pattern. In for 4... Hold for 4... Out for 6. Feel your body beginning to relax.",
    instruction: "Continue breathing"
  },
  {
    duration: 45,
    text: "Notice where you feel anxiety in your body. Don't try to change it, just observe it with curiosity.",
    instruction: "Body awareness"
  },
  {
    duration: 60,
    text: "Imagine your anxiety as a storm cloud. Watch it from a safe distance. You are not the storm, you are the observer.",
    instruction: "Observe the anxiety"
  },
  {
    duration: 45,
    text: "Say to yourself: 'This feeling is temporary. I am safe right now. I can handle this moment.'",
    instruction: "Safety affirmation"
  },
  {
    duration: 60,
    text: "Visualize roots growing from your body into the earth, grounding you. You are stable, secure, and supported.",
    instruction: "Grounding visualization"
  },
  {
    duration: 45,
    text: "Return to your breath. Each exhale releases tension. Each inhale brings calm. You are in control of your breath.",
    instruction: "Calming breaths"
  },
  {
    duration: 45,
    text: "Place both hands on your heart. Feel it beating steadily. Send yourself compassion for this difficult moment.",
    instruction: "Self-compassion"
  },
  {
    duration: 30,
    text: "Take three final deep breaths. Notice how your anxiety has shifted. When ready, slowly open your eyes.",
    instruction: "Return to calm"
  }
]

export default function AnxietyReliefMeditationPage() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)
  const [timeRemaining, setTimeRemaining] = useState(meditationSteps[0].duration)
  const [totalElapsed, setTotalElapsed] = useState(0)
  const [anxietyLevel, setAnxietyLevel] = useState(5)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  const totalDuration = meditationSteps.reduce((sum, step) => sum + step.duration, 0)
  const progress = (totalElapsed / totalDuration) * 100

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

  const getAnxietyColor = (level: number) => {
    if (level <= 3) return 'text-green-600'
    if (level <= 6) return 'text-yellow-600'
    return 'text-red-600'
  }

  return (
    <div className="container max-w-4xl py-10">
      <div className="mb-8">
        <Link href="/resources/mindfulness" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-4">
          <ChevronRight className="h-4 w-4 rotate-180" />
          Back to Mindfulness
        </Link>
        <h1 className="text-4xl font-bold mb-4 flex items-center gap-3">
          <Shield className="h-8 w-8 text-blue-600" />
          Anxiety Relief Meditation
        </h1>
        <p className="text-xl text-muted-foreground">
          Calm racing thoughts and soothe anxiety naturally. This 10-minute practice helps you find peace in the present moment.
        </p>
      </div>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Current Anxiety Level</CardTitle>
          <CardDescription>
            How anxious are you feeling right now? (1 = calm, 10 = very anxious)
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <span className="text-sm w-8">1</span>
              <input
                type="range"
                min="1"
                max="10"
                value={anxietyLevel}
                onChange={(e) => setAnxietyLevel(Number(e.target.value))}
                className="flex-1"
              />
              <span className="text-sm w-8">10</span>
            </div>
            <div className="text-center">
              <span className={`text-2xl font-bold ${getAnxietyColor(anxietyLevel)}`}>
                {anxietyLevel}/10
              </span>
              <p className="text-sm text-muted-foreground mt-1">
                {anxietyLevel <= 3 && "You're feeling relatively calm"}
                {anxietyLevel > 3 && anxietyLevel <= 6 && "Moderate anxiety - this meditation will help"}
                {anxietyLevel > 6 && "High anxiety - let's work on calming your nervous system"}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-3 mb-8">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Duration</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">10 minutes</p>
            <p className="text-xs text-muted-foreground">Quick relief</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Focus</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">Anxiety Relief</p>
            <p className="text-xs text-muted-foreground">Calm racing thoughts</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Technique</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">Grounding</p>
            <p className="text-xs text-muted-foreground">Present-moment focus</p>
          </CardContent>
        </Card>
      </div>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Guided Anxiety Relief</CardTitle>
          <CardDescription>
            Follow along to calm your mind and body
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

            <Card className="bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-900/50">
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Volume2 className="h-5 w-5 text-blue-600 mt-1 flex-shrink-0" />
                    <div className="space-y-2">
                      <p className="text-lg leading-relaxed">
                        {meditationSteps[currentStep].text}
                      </p>
                      <Badge variant="secondary" className="bg-blue-100 dark:bg-blue-900/50">
                        {meditationSteps[currentStep].instruction}
                      </Badge>
                    </div>
                  </div>
                  <div className="text-center text-3xl font-bold text-blue-600">
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
              <Wind className="h-5 w-5 text-primary" />
              How It Calms Anxiety
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-sm text-muted-foreground">
              This meditation uses proven techniques to activate your body's relaxation response.
            </p>
            <ul className="space-y-2 text-sm">
              <li className="flex gap-2">
                <span className="text-primary">•</span>
                Slows racing thoughts through focused attention
              </li>
              <li className="flex gap-2">
                <span className="text-primary">•</span>
                Activates parasympathetic nervous system
              </li>
              <li className="flex gap-2">
                <span className="text-primary">•</span>
                Reduces stress hormones like cortisol
              </li>
              <li className="flex gap-2">
                <span className="text-primary">•</span>
                Creates sense of safety and control
              </li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Heart className="h-5 w-5 text-primary" />
              Benefits
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              <Badge variant="outline">Reduces anxiety symptoms</Badge>
              <Badge variant="outline">Slows racing thoughts</Badge>
              <Badge variant="outline">Activates relaxation response</Badge>
              <Badge variant="outline">Improves emotional regulation</Badge>
              <Badge variant="outline">Builds coping resources</Badge>
              <Badge variant="outline">Prevents panic escalation</Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Quick Anxiety Relief Techniques</CardTitle>
          <CardDescription>
            Use these anytime you need immediate relief
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="p-4 border rounded-lg">
              <h3 className="font-semibold mb-2">5-4-3-2-1 Grounding</h3>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>• 5 things you can see</li>
                <li>• 4 things you can touch</li>
                <li>• 3 things you can hear</li>
                <li>• 2 things you can smell</li>
                <li>• 1 thing you can taste</li>
              </ul>
            </div>
            <div className="p-4 border rounded-lg">
              <h3 className="font-semibold mb-2">Box Breathing</h3>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>• Breathe in for 4 counts</li>
                <li>• Hold for 4 counts</li>
                <li>• Breathe out for 4 counts</li>
                <li>• Hold for 4 counts</li>
                <li>• Repeat 4-8 times</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>When to Use This Meditation</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <h3 className="font-semibold">Ideal Moments</h3>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>• When anxiety starts building</li>
                <li>• Before stressful situations</li>
                <li>• After triggering events</li>
                <li>• During sleepless nights</li>
                <li>• As daily prevention practice</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold">Recovery-Specific</h3>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>• When cravings trigger anxiety</li>
                <li>• Before/after support meetings</li>
                <li>• During emotional vulnerability</li>
                <li>• When facing recovery milestones</li>
                <li>• During PAWS symptoms</li>
              </ul>
            </div>
          </div>
          <div className="p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
            <p className="text-sm">
              <strong>Remember:</strong> Anxiety is a normal part of recovery. Your nervous system is recalibrating. 
              With practice, you'll develop stronger emotional regulation skills.
            </p>
          </div>
        </CardContent>
      </Card>

      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Related Tools</h2>
        <div className="grid gap-4 md:grid-cols-3">
          <Card className="hover:shadow-lg transition-shadow">
            <Link href="/resources/dbt/tipp">
              <CardHeader>
                <CardTitle className="text-lg">TIPP Crisis Skills</CardTitle>
                <CardDescription>Emergency anxiety techniques</CardDescription>
              </CardHeader>
            </Link>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <Link href="/resources/mindfulness/breathing">
              <CardHeader>
                <CardTitle className="text-lg">Breathing Exercises</CardTitle>
                <CardDescription>Calm your nervous system</CardDescription>
              </CardHeader>
            </Link>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <Link href="/resources/cbt/thought-record">
              <CardHeader>
                <CardTitle className="text-lg">Thought Record</CardTitle>
                <CardDescription>Challenge anxious thoughts</CardDescription>
              </CardHeader>
            </Link>
          </Card>
        </div>
      </div>
    </div>
  )
}