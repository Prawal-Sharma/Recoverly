'use client'

import { useState, useEffect, useRef } from 'react'
import { Metadata } from 'next'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { PlayCircle, PauseCircle, RotateCcw, Volume2, ChevronRight, Waves, Brain, Target } from 'lucide-react'
import Link from 'next/link'

const meditationSteps = [
  {
    duration: 30,
    text: "Welcome to Craving Surfing. Find a comfortable position and close your eyes if you feel safe to do so.",
    instruction: "Get comfortable"
  },
  {
    duration: 30,
    text: "Take three deep breaths. Breathe in slowly through your nose, hold for a moment, then exhale through your mouth.",
    instruction: "Deep breathing"
  },
  {
    duration: 45,
    text: "Notice the craving in your body. Where do you feel it? Is it in your chest, stomach, or head? Just observe without judgment.",
    instruction: "Body awareness"
  },
  {
    duration: 60,
    text: "Imagine your craving as a wave in the ocean. Watch it rise, knowing that like all waves, it will eventually fall and pass.",
    instruction: "Visualize the wave"
  },
  {
    duration: 60,
    text: "You are the surfer, riding on top of this wave. You don't need to fight it or give in to it. Just stay balanced on your board.",
    instruction: "Ride the wave"
  },
  {
    duration: 45,
    text: "Notice how the intensity changes. Cravings always peak and then subside. You're doing great by simply observing.",
    instruction: "Observe changes"
  },
  {
    duration: 60,
    text: "Breathe into the sensation. Send your breath to wherever you feel the craving most strongly. Let your breath soften the edges.",
    instruction: "Breathe into sensation"
  },
  {
    duration: 45,
    text: "Remember: This craving is temporary. It will pass whether you act on it or not. You have the strength to ride it out.",
    instruction: "Remember impermanence"
  },
  {
    duration: 45,
    text: "As the wave begins to subside, feel proud of yourself for surfing through this moment without being pulled under.",
    instruction: "Acknowledge success"
  },
  {
    duration: 30,
    text: "Take three more deep breaths. When you're ready, slowly open your eyes. You've successfully surfed the craving wave.",
    instruction: "Return to present"
  }
]

export default function CravingSurfMeditationPage() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)
  const [timeRemaining, setTimeRemaining] = useState(meditationSteps[0].duration)
  const [totalElapsed, setTotalElapsed] = useState(0)
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

  return (
    <div className="container max-w-4xl py-10">
      <div className="mb-8">
        <Link href="/resources/mindfulness" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-4">
          <ChevronRight className="h-4 w-4 rotate-180" />
          Back to Mindfulness
        </Link>
        <h1 className="text-4xl font-bold mb-4 flex items-center gap-3">
          <Waves className="h-8 w-8 text-orange-600" />
          Craving Surfing Meditation
        </h1>
        <p className="text-xl text-muted-foreground">
          Learn to ride out cravings like waves without giving in to them. This 10-minute practice helps you observe urges with curiosity rather than fear.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3 mb-8">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Duration</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">10 minutes</p>
            <p className="text-xs text-muted-foreground">Beginner friendly</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Focus</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">Craving Management</p>
            <p className="text-xs text-muted-foreground">Non-reactive observation</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Technique</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">Urge Surfing</p>
            <p className="text-xs text-muted-foreground">Mindful awareness</p>
          </CardContent>
        </Card>
      </div>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Guided Meditation</CardTitle>
          <CardDescription>
            Follow along with the guided instructions below
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

            <Card className="bg-muted/50 border-primary/20">
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Volume2 className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                    <div className="space-y-2">
                      <p className="text-lg leading-relaxed">
                        {meditationSteps[currentStep].text}
                      </p>
                      <Badge variant="secondary">
                        {meditationSteps[currentStep].instruction}
                      </Badge>
                    </div>
                  </div>
                  <div className="text-center text-3xl font-bold text-primary">
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
              <Brain className="h-5 w-5 text-primary" />
              How It Works
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-sm text-muted-foreground">
              Urge surfing is a mindfulness technique that helps you ride out cravings without acting on them.
            </p>
            <ul className="space-y-2 text-sm">
              <li className="flex gap-2">
                <span className="text-primary">•</span>
                Cravings are like ocean waves - they rise, peak, and fall
              </li>
              <li className="flex gap-2">
                <span className="text-primary">•</span>
                By observing without reacting, you prove you can survive the urge
              </li>
              <li className="flex gap-2">
                <span className="text-primary">•</span>
                Each time you surf successfully, you build confidence
              </li>
              <li className="flex gap-2">
                <span className="text-primary">•</span>
                The craving will pass whether you act on it or not
              </li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5 text-primary" />
              Benefits
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              <Badge variant="outline">Reduces craving intensity</Badge>
              <Badge variant="outline">Builds distress tolerance</Badge>
              <Badge variant="outline">Increases self-awareness</Badge>
              <Badge variant="outline">Develops non-reactive observation</Badge>
              <Badge variant="outline">Strengthens recovery skills</Badge>
              <Badge variant="outline">Prevents impulsive actions</Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Tips for Success</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <h3 className="font-semibold">During Practice</h3>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>• Don't fight the craving - observe it with curiosity</li>
                <li>• If your mind wanders, gently return to the wave image</li>
                <li>• Remember: you're the surfer, not the wave</li>
                <li>• Be patient and compassionate with yourself</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold">When to Use</h3>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>• When you feel a craving starting to build</li>
                <li>• During scheduled "craving times" in your day</li>
                <li>• After exposure to triggers</li>
                <li>• As part of your daily recovery practice</li>
              </ul>
            </div>
          </div>
          <div className="p-4 bg-muted/50 rounded-lg">
            <p className="text-sm">
              <strong>Remember:</strong> Most cravings last only 15-20 minutes. By practicing urge surfing, 
              you're proving to yourself that you can outlast any craving without giving in.
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
                <CardDescription>Emergency techniques for intense urges</CardDescription>
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
            <Link href="/resources/cbt/trigger-map">
              <CardHeader>
                <CardTitle className="text-lg">Trigger Mapper</CardTitle>
                <CardDescription>Identify and manage triggers</CardDescription>
              </CardHeader>
            </Link>
          </Card>
        </div>
      </div>
    </div>
  )
}