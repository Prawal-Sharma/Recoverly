'use client'

import { useState, useEffect, useRef } from 'react'
import { Metadata } from 'next'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { PlayCircle, PauseCircle, RotateCcw, Volume2, ChevronRight, Activity, Sparkles, Brain } from 'lucide-react'
import Link from 'next/link'

const meditationSteps = [
  {
    duration: 30,
    text: "Welcome to the Recovery Body Scan. Lie down or sit comfortably. Close your eyes and take three deep breaths.",
    instruction: "Get comfortable",
    bodyPart: "whole"
  },
  {
    duration: 45,
    text: "Bring your attention to the top of your head. Notice any sensations - tingling, warmth, or tension. Just observe without judgment.",
    instruction: "Crown of head",
    bodyPart: "head"
  },
  {
    duration: 45,
    text: "Move your awareness to your face - forehead, eyes, cheeks, jaw. Notice if you're holding tension here. Let it soften.",
    instruction: "Face and jaw",
    bodyPart: "head"
  },
  {
    duration: 45,
    text: "Scan your neck and shoulders. These areas often hold stress from recovery. Breathe into any tightness you find.",
    instruction: "Neck and shoulders",
    bodyPart: "shoulders"
  },
  {
    duration: 60,
    text: "Focus on your chest and heart area. This is where we often feel emotions. Send compassion to whatever you find here.",
    instruction: "Heart center",
    bodyPart: "chest"
  },
  {
    duration: 45,
    text: "Move to your stomach and abdomen. Notice your breath moving this area. This is where cravings often manifest.",
    instruction: "Core awareness",
    bodyPart: "abdomen"
  },
  {
    duration: 45,
    text: "Scan your arms from shoulders to fingertips. Feel the life and energy in your arms. They are tools for positive action.",
    instruction: "Arms and hands",
    bodyPart: "arms"
  },
  {
    duration: 60,
    text: "Bring awareness to your back, from upper to lower. Your back supports you. Thank it for carrying you through recovery.",
    instruction: "Back support",
    bodyPart: "back"
  },
  {
    duration: 45,
    text: "Focus on your hips and pelvis. This is your foundation. Feel yourself grounded and stable in your recovery.",
    instruction: "Foundation",
    bodyPart: "hips"
  },
  {
    duration: 60,
    text: "Scan your legs from thighs to feet. Your legs carry you forward on your recovery path. Feel their strength.",
    instruction: "Legs and feet",
    bodyPart: "legs"
  },
  {
    duration: 60,
    text: "Now sense your whole body as one. Feel the aliveness within you. Your body is healing and recovering every day.",
    instruction: "Whole body awareness",
    bodyPart: "whole"
  },
  {
    duration: 45,
    text: "Take three deep breaths, wiggle your fingers and toes, and when ready, slowly open your eyes. You are reconnected.",
    instruction: "Return to present",
    bodyPart: "whole"
  }
]

export default function RecoveryBodyScanPage() {
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

  const getBodyPartHighlight = (part: string) => {
    return meditationSteps[currentStep].bodyPart === part ? 'text-primary' : 'text-muted-foreground'
  }

  return (
    <div className="container max-w-4xl py-10">
      <div className="mb-8">
        <Link href="/resources/mindfulness" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-4">
          <ChevronRight className="h-4 w-4 rotate-180" />
          Back to Mindfulness
        </Link>
        <h1 className="text-4xl font-bold mb-4 flex items-center gap-3">
          <Activity className="h-8 w-8 text-green-600" />
          Recovery Body Scan
        </h1>
        <p className="text-xl text-muted-foreground">
          Release tension and reconnect with your healing body. This 15-minute practice helps you develop body awareness and relaxation.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3 mb-8">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Duration</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">15 minutes</p>
            <p className="text-xs text-muted-foreground">Beginner friendly</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Focus</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">Body Awareness</p>
            <p className="text-xs text-muted-foreground">Physical relaxation</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Technique</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">Progressive Scan</p>
            <p className="text-xs text-muted-foreground">Systematic awareness</p>
          </CardContent>
        </Card>
      </div>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Guided Body Scan</CardTitle>
          <CardDescription>
            Systematically relax and reconnect with each part of your body
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

            <div className="grid gap-4 md:grid-cols-2">
              <Card className="bg-green-50 dark:bg-green-950/20 border-green-200 dark:border-green-900/50">
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <Volume2 className="h-5 w-5 text-green-600 mt-1 flex-shrink-0" />
                      <div className="space-y-2">
                        <p className="text-lg leading-relaxed">
                          {meditationSteps[currentStep].text}
                        </p>
                        <Badge variant="secondary" className="bg-green-100 dark:bg-green-900/50">
                          {meditationSteps[currentStep].instruction}
                        </Badge>
                      </div>
                    </div>
                    <div className="text-center text-3xl font-bold text-green-600">
                      {formatTime(timeRemaining)}
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm">Body Map</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm">
                    <div className={`flex items-center gap-2 ${getBodyPartHighlight('head')}`}>
                      <div className="w-2 h-2 rounded-full bg-current" />
                      Head & Face
                    </div>
                    <div className={`flex items-center gap-2 ${getBodyPartHighlight('shoulders')}`}>
                      <div className="w-2 h-2 rounded-full bg-current" />
                      Neck & Shoulders
                    </div>
                    <div className={`flex items-center gap-2 ${getBodyPartHighlight('chest')}`}>
                      <div className="w-2 h-2 rounded-full bg-current" />
                      Chest & Heart
                    </div>
                    <div className={`flex items-center gap-2 ${getBodyPartHighlight('arms')}`}>
                      <div className="w-2 h-2 rounded-full bg-current" />
                      Arms & Hands
                    </div>
                    <div className={`flex items-center gap-2 ${getBodyPartHighlight('abdomen')}`}>
                      <div className="w-2 h-2 rounded-full bg-current" />
                      Abdomen
                    </div>
                    <div className={`flex items-center gap-2 ${getBodyPartHighlight('back')}`}>
                      <div className="w-2 h-2 rounded-full bg-current" />
                      Back
                    </div>
                    <div className={`flex items-center gap-2 ${getBodyPartHighlight('hips')}`}>
                      <div className="w-2 h-2 rounded-full bg-current" />
                      Hips & Pelvis
                    </div>
                    <div className={`flex items-center gap-2 ${getBodyPartHighlight('legs')}`}>
                      <div className="w-2 h-2 rounded-full bg-current" />
                      Legs & Feet
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

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
              Body Scan Benefits
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-sm text-muted-foreground">
              Body scanning helps you reconnect with your physical self, often neglected during addiction.
            </p>
            <ul className="space-y-2 text-sm">
              <li className="flex gap-2">
                <span className="text-primary">•</span>
                Releases physical tension and stress
              </li>
              <li className="flex gap-2">
                <span className="text-primary">•</span>
                Improves body awareness and mindfulness
              </li>
              <li className="flex gap-2">
                <span className="text-primary">•</span>
                Promotes relaxation and better sleep
              </li>
              <li className="flex gap-2">
                <span className="text-primary">•</span>
                Helps identify where emotions manifest physically
              </li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-primary" />
              Recovery Benefits
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              <Badge variant="outline">Releases physical tension</Badge>
              <Badge variant="outline">Improves body awareness</Badge>
              <Badge variant="outline">Promotes relaxation</Badge>
              <Badge variant="outline">Reduces stress</Badge>
              <Badge variant="outline">Enhances feelings of safety</Badge>
              <Badge variant="outline">Supports physical healing</Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Tips for Body Scan Practice</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <h3 className="font-semibold">During Practice</h3>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>• If you find tension, breathe into that area</li>
                <li>• Don't try to change sensations, just observe</li>
                <li>• If your mind wanders, gently return to the body</li>
                <li>• It's okay to adjust position for comfort</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold">Best Times to Practice</h3>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>• Before sleep to promote relaxation</li>
                <li>• After stressful situations</li>
                <li>• When feeling disconnected from your body</li>
                <li>• As part of daily mindfulness routine</li>
              </ul>
            </div>
          </div>
          <div className="p-4 bg-green-50 dark:bg-green-950/20 rounded-lg">
            <p className="text-sm">
              <strong>Recovery Note:</strong> Your body has been through a lot. This practice helps you rebuild 
              a positive relationship with your physical self, recognizing your body as an ally in recovery, not an enemy.
            </p>
          </div>
        </CardContent>
      </Card>

      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Related Tools</h2>
        <div className="grid gap-4 md:grid-cols-3">
          <Card className="hover:shadow-lg transition-shadow">
            <Link href="/resources/mindfulness/body-scan">
              <CardHeader>
                <CardTitle className="text-lg">Interactive Body Scan</CardTitle>
                <CardDescription>Visual guided body awareness</CardDescription>
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
            <Link href="/checkin">
              <CardHeader>
                <CardTitle className="text-lg">Daily Check-in</CardTitle>
                <CardDescription>Track physical and emotional wellness</CardDescription>
              </CardHeader>
            </Link>
          </Card>
        </div>
      </div>
    </div>
  )
}