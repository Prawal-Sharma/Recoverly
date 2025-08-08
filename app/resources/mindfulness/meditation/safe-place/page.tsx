'use client'

import { useState, useEffect, useRef } from 'react'
import { Metadata } from 'next'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { PlayCircle, PauseCircle, RotateCcw, Volume2, ChevronRight, Home, Sparkles, Shield } from 'lucide-react'
import Link from 'next/link'

const meditationSteps = [
  {
    duration: 30,
    text: "Welcome to your Safe Place meditation. Sit or lie down comfortably. Close your eyes and take three deep breaths.",
    instruction: "Get comfortable"
  },
  {
    duration: 40,
    text: "Imagine a place where you feel completely safe and peaceful. It can be real or imaginary - a beach, forest, room, or anywhere.",
    instruction: "Choose your place"
  },
  {
    duration: 45,
    text: "Look around your safe place. What do you see? Notice the colors, shapes, and light. Take in every detail.",
    instruction: "Visual details"
  },
  {
    duration: 45,
    text: "What sounds are in your safe place? Perhaps waves, birds, a gentle breeze, or peaceful silence. Let these sounds soothe you.",
    instruction: "Sounds of safety"
  },
  {
    duration: 45,
    text: "Notice any scents in your safe place. Fresh air, flowers, the ocean, or your favorite comforting smell. Breathe it in.",
    instruction: "Comforting scents"
  },
  {
    duration: 40,
    text: "What can you touch in your safe place? Feel the textures - soft sand, cool grass, warm sunlight on your skin.",
    instruction: "Physical sensations"
  },
  {
    duration: 60,
    text: "In this safe place, you are completely protected. Nothing can harm you here. You can return anytime you need peace.",
    instruction: "Feel the safety"
  },
  {
    duration: 45,
    text: "Place your hand on your heart and say: 'I carry this safe place within me. I can access peace whenever I need it.'",
    instruction: "Inner sanctuary"
  },
  {
    duration: 30,
    text: "Take a moment to thank yourself for creating this sanctuary. Know you can return here anytime.",
    instruction: "Gratitude"
  },
  {
    duration: 30,
    text: "When you're ready, take three deep breaths and slowly open your eyes, bringing the peace with you.",
    instruction: "Return gently"
  }
]

const safePlaceOptions = [
  { name: "Beach", icon: "🏖️", description: "Warm sand, gentle waves" },
  { name: "Forest", icon: "🌲", description: "Peaceful trees, soft earth" },
  { name: "Mountain", icon: "⛰️", description: "Clear air, vast views" },
  { name: "Garden", icon: "🌻", description: "Flowers, sunshine" },
  { name: "Cozy Room", icon: "🏠", description: "Warmth, comfort, safety" },
  { name: "Meadow", icon: "🌾", description: "Open space, gentle breeze" }
]

export default function SafePlaceMeditationPage() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)
  const [timeRemaining, setTimeRemaining] = useState(meditationSteps[0].duration)
  const [totalElapsed, setTotalElapsed] = useState(0)
  const [selectedPlace, setSelectedPlace] = useState('')
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
          <Home className="h-8 w-8 text-purple-600" />
          Safe Place Visualization
        </h1>
        <p className="text-xl text-muted-foreground">
          Create an inner sanctuary you can visit anytime you need peace. This 8-minute practice builds a mental refuge for difficult moments.
        </p>
      </div>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Choose Your Safe Place</CardTitle>
          <CardDescription>
            Select a setting that feels most peaceful to you (optional)
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 md:grid-cols-3">
            {safePlaceOptions.map((place) => (
              <Button
                key={place.name}
                variant={selectedPlace === place.name ? "default" : "outline"}
                className="h-auto p-4 justify-start"
                onClick={() => setSelectedPlace(place.name)}
              >
                <div className="flex items-start gap-3">
                  <span className="text-2xl">{place.icon}</span>
                  <div className="text-left">
                    <div className="font-semibold">{place.name}</div>
                    <div className="text-xs text-muted-foreground">{place.description}</div>
                  </div>
                </div>
              </Button>
            ))}
          </div>
          {selectedPlace && (
            <p className="mt-4 text-sm text-muted-foreground text-center">
              Your safe place: <span className="font-semibold text-primary">{selectedPlace}</span>
            </p>
          )}
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-3 mb-8">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Duration</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">8 minutes</p>
            <p className="text-xs text-muted-foreground">Beginner friendly</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Focus</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">Inner Safety</p>
            <p className="text-xs text-muted-foreground">Mental refuge</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Technique</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">Visualization</p>
            <p className="text-xs text-muted-foreground">Guided imagery</p>
          </CardContent>
        </Card>
      </div>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Guided Visualization</CardTitle>
          <CardDescription>
            Build your inner sanctuary step by step
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

            <Card className="bg-purple-50 dark:bg-purple-950/20 border-purple-200 dark:border-purple-900/50">
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Volume2 className="h-5 w-5 text-purple-600 mt-1 flex-shrink-0" />
                    <div className="space-y-2">
                      <p className="text-lg leading-relaxed">
                        {meditationSteps[currentStep].text}
                      </p>
                      <Badge variant="secondary" className="bg-purple-100 dark:bg-purple-900/50">
                        {meditationSteps[currentStep].instruction}
                      </Badge>
                    </div>
                  </div>
                  <div className="text-center text-3xl font-bold text-purple-600">
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
              <Shield className="h-5 w-5 text-primary" />
              The Power of Safe Place
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-sm text-muted-foreground">
              Creating a mental safe place gives you an instant refuge during difficult moments.
            </p>
            <ul className="space-y-2 text-sm">
              <li className="flex gap-2">
                <span className="text-primary">•</span>
                Creates mental refuge from stress
              </li>
              <li className="flex gap-2">
                <span className="text-primary">•</span>
                Reduces stress and anxiety quickly
              </li>
              <li className="flex gap-2">
                <span className="text-primary">•</span>
                Builds coping resources for triggers
              </li>
              <li className="flex gap-2">
                <span className="text-primary">•</span>
                Enhances feelings of safety and control
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
              <Badge variant="outline">Creates mental refuge</Badge>
              <Badge variant="outline">Reduces stress quickly</Badge>
              <Badge variant="outline">Builds coping resources</Badge>
              <Badge variant="outline">Enhances feelings of safety</Badge>
              <Badge variant="outline">Improves emotional regulation</Badge>
              <Badge variant="outline">Accessible anytime</Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Personalizing Your Safe Place</CardTitle>
          <CardDescription>
            Make your safe place uniquely yours
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-3">
              <h3 className="font-semibold">Add Personal Elements</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Include supportive people or pets</li>
                <li>• Add meaningful objects or symbols</li>
                <li>• Incorporate favorite colors</li>
                <li>• Include comforting sounds or music</li>
                <li>• Add protective boundaries or shields</li>
              </ul>
            </div>
            <div className="space-y-3">
              <h3 className="font-semibold">Strengthen Your Sanctuary</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Visit daily to reinforce the visualization</li>
                <li>• Draw or write about your safe place</li>
                <li>• Create a physical reminder (photo, object)</li>
                <li>• Practice accessing it quickly</li>
                <li>• Update it as your needs change</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>When to Use Your Safe Place</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <h3 className="font-semibold">Everyday Moments</h3>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>• Before sleep for peaceful rest</li>
                <li>• During work breaks</li>
                <li>• After stressful conversations</li>
                <li>• When feeling overwhelmed</li>
                <li>• As daily meditation practice</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold">Recovery Situations</h3>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>• When experiencing cravings</li>
                <li>• Before challenging social situations</li>
                <li>• During emotional vulnerability</li>
                <li>• After trauma triggers</li>
                <li>• When needing instant calm</li>
              </ul>
            </div>
          </div>
          <div className="p-4 bg-purple-50 dark:bg-purple-950/20 rounded-lg">
            <p className="text-sm">
              <strong>Quick Access Tip:</strong> Practice a "rapid safe place" technique - take one deep breath, 
              close your eyes, and instantly transport yourself to your sanctuary. With practice, you can access 
              peace in just seconds.
            </p>
          </div>
        </CardContent>
      </Card>

      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Related Tools</h2>
        <div className="grid gap-4 md:grid-cols-3">
          <Card className="hover:shadow-lg transition-shadow">
            <Link href="/resources/mindfulness/meditation/anxiety-relief">
              <CardHeader>
                <CardTitle className="text-lg">Anxiety Relief</CardTitle>
                <CardDescription>Calm racing thoughts</CardDescription>
              </CardHeader>
            </Link>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <Link href="/resources/mindfulness/body-scan">
              <CardHeader>
                <CardTitle className="text-lg">Body Scan</CardTitle>
                <CardDescription>Physical relaxation</CardDescription>
              </CardHeader>
            </Link>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <Link href="/resources/dbt/tipp">
              <CardHeader>
                <CardTitle className="text-lg">TIPP Crisis Skills</CardTitle>
                <CardDescription>Emergency calming techniques</CardDescription>
              </CardHeader>
            </Link>
          </Card>
        </div>
      </div>
    </div>
  )
}