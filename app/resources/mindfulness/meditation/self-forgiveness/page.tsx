'use client'

import { useState, useEffect, useRef } from 'react'
import { Metadata } from 'next'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { PlayCircle, PauseCircle, RotateCcw, Volume2, ChevronRight, Heart, Sparkles } from 'lucide-react'
import Link from 'next/link'

const meditationSteps = [
  {
    duration: 30,
    text: "Welcome to the Self-Forgiveness Meditation. Find a comfortable position, placing one hand on your heart if that feels right.",
    instruction: "Get comfortable"
  },
  {
    duration: 30,
    text: "Take three deep, gentle breaths. With each exhale, release any tension you're holding.",
    instruction: "Gentle breathing"
  },
  {
    duration: 45,
    text: "Bring to mind something you've been holding against yourself. Notice where you feel this in your body.",
    instruction: "Acknowledge the burden"
  },
  {
    duration: 60,
    text: "Say to yourself: 'I am human. Like all humans, I make mistakes. This is part of the shared human experience.'",
    instruction: "Common humanity"
  },
  {
    duration: 60,
    text: "Place your hand on your heart and say: 'I forgive myself for my mistakes. I am learning and growing every day.'",
    instruction: "Self-forgiveness statement"
  },
  {
    duration: 45,
    text: "Imagine your younger self who made this mistake. What would you say to them with compassion?",
    instruction: "Compassionate perspective"
  },
  {
    duration: 60,
    text: "Breathe in self-compassion, breathe out self-judgment. Let each breath soften the harsh voice within.",
    instruction: "Compassionate breathing"
  },
  {
    duration: 60,
    text: "Repeat: 'I release myself from the prison of past mistakes. I choose healing and growth instead of shame.'",
    instruction: "Release statement"
  },
  {
    duration: 45,
    text: "Feel the weight of self-blame beginning to lift. You deserve the same compassion you'd give a dear friend.",
    instruction: "Feel the release"
  },
  {
    duration: 45,
    text: "Say: 'I am worthy of love and belonging, especially from myself. My recovery is an act of self-love.'",
    instruction: "Worthiness affirmation"
  },
  {
    duration: 30,
    text: "Take three more deep breaths. When you're ready, open your eyes, carrying this self-compassion with you.",
    instruction: "Return with compassion"
  }
]

export default function SelfForgivenessMeditationPage() {
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
          <Heart className="h-8 w-8 text-pink-600" />
          Self-Forgiveness Meditation
        </h1>
        <p className="text-xl text-muted-foreground">
          Practice loving-kindness towards yourself and release shame. This 12-minute meditation helps you heal from past mistakes with compassion.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3 mb-8">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Duration</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">12 minutes</p>
            <p className="text-xs text-muted-foreground">Intermediate level</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Focus</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">Self-Compassion</p>
            <p className="text-xs text-muted-foreground">Healing & forgiveness</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Technique</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">Loving-Kindness</p>
            <p className="text-xs text-muted-foreground">Affirmations & visualization</p>
          </CardContent>
        </Card>
      </div>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Guided Meditation</CardTitle>
          <CardDescription>
            Follow along with compassionate guidance towards self-forgiveness
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

            <Card className="bg-pink-50 dark:bg-pink-950/20 border-pink-200 dark:border-pink-900/50">
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Volume2 className="h-5 w-5 text-pink-600 mt-1 flex-shrink-0" />
                    <div className="space-y-2">
                      <p className="text-lg leading-relaxed">
                        {meditationSteps[currentStep].text}
                      </p>
                      <Badge variant="secondary" className="bg-pink-100 dark:bg-pink-900/50">
                        {meditationSteps[currentStep].instruction}
                      </Badge>
                    </div>
                  </div>
                  <div className="text-center text-3xl font-bold text-pink-600">
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
              <Heart className="h-5 w-5 text-primary" />
              Why Self-Forgiveness Matters
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-sm text-muted-foreground">
              Self-forgiveness is crucial for recovery. Shame keeps us stuck in destructive patterns.
            </p>
            <ul className="space-y-2 text-sm">
              <li className="flex gap-2">
                <span className="text-primary">•</span>
                Reduces shame and guilt that can trigger relapse
              </li>
              <li className="flex gap-2">
                <span className="text-primary">•</span>
                Increases self-compassion and emotional healing
              </li>
              <li className="flex gap-2">
                <span className="text-primary">•</span>
                Supports emotional healing and growth
              </li>
              <li className="flex gap-2">
                <span className="text-primary">•</span>
                Builds self-worth essential for recovery
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
              <Badge variant="outline">Reduces shame and guilt</Badge>
              <Badge variant="outline">Increases self-compassion</Badge>
              <Badge variant="outline">Supports emotional healing</Badge>
              <Badge variant="outline">Builds self-worth</Badge>
              <Badge variant="outline">Improves emotional regulation</Badge>
              <Badge variant="outline">Strengthens recovery</Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Self-Forgiveness Affirmations</CardTitle>
          <CardDescription>
            Use these affirmations during your practice or throughout the day
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 md:grid-cols-2">
            <div className="p-4 bg-muted/50 rounded-lg">
              <p className="text-sm italic">"I forgive myself for my past mistakes. They do not define me."</p>
            </div>
            <div className="p-4 bg-muted/50 rounded-lg">
              <p className="text-sm italic">"I am worthy of love and compassion, especially from myself."</p>
            </div>
            <div className="p-4 bg-muted/50 rounded-lg">
              <p className="text-sm italic">"My recovery is proof of my strength and commitment to growth."</p>
            </div>
            <div className="p-4 bg-muted/50 rounded-lg">
              <p className="text-sm italic">"I release shame and embrace healing with an open heart."</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Tips for Practice</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <h3 className="font-semibold">During Meditation</h3>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>• Be patient - self-forgiveness takes time</li>
                <li>• If emotions arise, let them flow naturally</li>
                <li>• Speak affirmations with genuine intention</li>
                <li>• Place hand on heart for added comfort</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold">Daily Practice</h3>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>• Practice self-forgiveness daily, even for small things</li>
                <li>• Write forgiveness letters to yourself</li>
                <li>• Replace self-criticism with self-compassion</li>
                <li>• Celebrate progress, not perfection</li>
              </ul>
            </div>
          </div>
          <div className="p-4 bg-pink-50 dark:bg-pink-950/20 rounded-lg">
            <p className="text-sm">
              <strong>Remember:</strong> You deserve the same compassion you would give to a dear friend. 
              Self-forgiveness is not about excusing harmful behavior, but about releasing the shame that keeps you stuck.
            </p>
          </div>
        </CardContent>
      </Card>

      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Related Tools</h2>
        <div className="grid gap-4 md:grid-cols-3">
          <Card className="hover:shadow-lg transition-shadow">
            <Link href="/resources/cbt/thought-record">
              <CardHeader>
                <CardTitle className="text-lg">Thought Record</CardTitle>
                <CardDescription>Challenge self-critical thoughts</CardDescription>
              </CardHeader>
            </Link>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <Link href="/resources/mindfulness/body-scan">
              <CardHeader>
                <CardTitle className="text-lg">Body Scan</CardTitle>
                <CardDescription>Release tension and connect with yourself</CardDescription>
              </CardHeader>
            </Link>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <Link href="/recovery-plan">
              <CardHeader>
                <CardTitle className="text-lg">Recovery Plan</CardTitle>
                <CardDescription>Build a compassionate recovery path</CardDescription>
              </CardHeader>
            </Link>
          </Card>
        </div>
      </div>
    </div>
  )
}