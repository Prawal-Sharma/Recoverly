'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { 
  Play, Pause, RotateCcw, Volume2, VolumeX, ChevronLeft, 
  Clock, Heart, Sparkles, Wind, Mountain, Waves
} from 'lucide-react'
import Link from 'next/link'

interface MeditationSession {
  id: string
  date: string
  duration: number
  type: string
  completed: boolean
}

const presetDurations = [
  { value: 60, label: '1 minute', description: 'Quick mindful moment' },
  { value: 180, label: '3 minutes', description: 'Brief breathing space' },
  { value: 300, label: '5 minutes', description: 'Short meditation' },
  { value: 600, label: '10 minutes', description: 'Standard practice' },
  { value: 900, label: '15 minutes', description: 'Extended session' },
  { value: 1200, label: '20 minutes', description: 'Deep practice' },
  { value: 1800, label: '30 minutes', description: 'Long meditation' },
  { value: 2700, label: '45 minutes', description: 'Intensive practice' },
]

const meditationTypes = [
  { id: 'breath', name: 'Breath Awareness', icon: Wind, description: 'Focus on your natural breathing' },
  { id: 'body', name: 'Body Scan', icon: Heart, description: 'Progressive relaxation through the body' },
  { id: 'loving', name: 'Loving-Kindness', icon: Sparkles, description: 'Cultivate compassion and kindness' },
  { id: 'mountain', name: 'Mountain Meditation', icon: Mountain, description: 'Embody the stability of a mountain' },
  { id: 'ocean', name: 'Ocean Breathing', icon: Waves, description: 'Rhythmic breathing like ocean waves' },
]

const ambientSounds = [
  { id: 'none', name: 'Silence' },
  { id: 'bells', name: 'Tibetan Bells' },
  { id: 'rain', name: 'Rain' },
  { id: 'ocean', name: 'Ocean Waves' },
  { id: 'forest', name: 'Forest' },
  { id: 'singing-bowl', name: 'Singing Bowl' },
]

export default function MeditationTimerPage() {
  const [selectedDuration, setSelectedDuration] = useState(300) // 5 minutes default
  const [customDuration, setCustomDuration] = useState('')
  const [timeRemaining, setTimeRemaining] = useState(300)
  const [isRunning, setIsRunning] = useState(false)
  const [selectedType, setSelectedType] = useState('breath')
  const [selectedSound, setSelectedSound] = useState('none')
  const [soundEnabled, setSoundEnabled] = useState(true)
  const [sessions, setSessions] = useState<MeditationSession[]>([])
  const [totalMeditationTime, setTotalMeditationTime] = useState(0)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const startTimeRef = useRef<number>(0)
  const elapsedRef = useRef<number>(0)

  // Load sessions from localStorage
  useEffect(() => {
    const savedSessions = localStorage.getItem('meditationSessions')
    if (savedSessions) {
      const parsed = JSON.parse(savedSessions)
      setSessions(parsed)
      // Calculate total time
      const total = parsed.reduce((acc: number, session: MeditationSession) => {
        return acc + (session.completed ? session.duration : 0)
      }, 0)
      setTotalMeditationTime(total)
    }
  }, [])

  const playSound = useCallback((type: 'start' | 'complete' | 'interval') => {
    if (!soundEnabled) return
    // In a real app, you would play actual sounds here
    // For now, we'll just use the browser's notification sound if available
    if (type === 'complete') {
      // Play a completion sound
      const audio = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBjih')
      audio.play().catch(() => {})
    }
  }, [soundEnabled])

  const handleComplete = useCallback(() => {
    setIsRunning(false)
    playSound('complete')
    
    // Save session
    const actualDuration = selectedDuration - timeRemaining
    const newSession: MeditationSession = {
      id: Date.now().toString(),
      date: new Date().toISOString(),
      duration: actualDuration,
      type: meditationTypes.find(t => t.id === selectedType)?.name || 'Meditation',
      completed: timeRemaining === 0
    }
    
    const updatedSessions = [newSession, ...sessions]
    setSessions(updatedSessions)
    localStorage.setItem('meditationSessions', JSON.stringify(updatedSessions))
    
    // Update total time
    if (newSession.completed) {
      setTotalMeditationTime(prev => prev + actualDuration)
    }
    
    // Show completion message
    if (timeRemaining === 0) {
      alert('Meditation complete! Well done on completing your practice.')
    }
  }, [selectedDuration, timeRemaining, selectedType, sessions, playSound])

  // Timer logic
  useEffect(() => {
    if (isRunning && timeRemaining > 0) {
      intervalRef.current = setInterval(() => {
        setTimeRemaining(prev => {
          if (prev <= 1) {
            handleComplete()
            return 0
          }
          return prev - 1
        })
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
  }, [isRunning, timeRemaining, handleComplete])

  const handleStart = () => {
    setIsRunning(true)
    startTimeRef.current = Date.now()
    elapsedRef.current = 0
    playSound('start')
  }

  const handlePause = () => {
    setIsRunning(false)
    if (startTimeRef.current) {
      elapsedRef.current += Date.now() - startTimeRef.current
    }
  }

  const handleReset = () => {
    setIsRunning(false)
    setTimeRemaining(selectedDuration)
    startTimeRef.current = 0
    elapsedRef.current = 0
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  const formatDuration = (seconds: number) => {
    const hours = Math.floor(seconds / 3600)
    const mins = Math.floor((seconds % 3600) / 60)
    if (hours > 0) {
      return `${hours}h ${mins}m`
    }
    return `${mins} minutes`
  }

  const progress = ((selectedDuration - timeRemaining) / selectedDuration) * 100

  return (
    <div className="container max-w-5xl py-10">
      {/* Header */}
      <div className="mb-8">
        <Link href="/resources/mindfulness" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-4">
          <ChevronLeft className="mr-1 h-4 w-4" />
          Back to Mindfulness Resources
        </Link>
        <h1 className="text-4xl font-bold mb-4 flex items-center gap-2">
          <Clock className="h-8 w-8 text-primary" />
          Meditation Timer
        </h1>
        <p className="text-xl text-muted-foreground">
          Create space for mindfulness with a customizable meditation timer
        </p>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-3 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Total Sessions</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{sessions.length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Total Time</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{formatDuration(totalMeditationTime)}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Current Streak</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">
              {sessions.length > 0 ? '1 day' : '0 days'}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Timer Display */}
      <Card className="mb-6">
        <CardContent className="pt-8 pb-8">
          <div className="text-center space-y-6">
            {/* Timer */}
            <div className="relative">
              <div className="text-7xl md:text-8xl font-mono font-bold text-primary">
                {formatTime(timeRemaining)}
              </div>
              {isRunning && (
                <Progress value={progress} className="mt-4" />
              )}
            </div>

            {/* Controls */}
            <div className="flex justify-center gap-4">
              {!isRunning ? (
                <Button size="lg" onClick={handleStart} disabled={timeRemaining === 0}>
                  <Play className="mr-2 h-5 w-5" />
                  Start
                </Button>
              ) : (
                <Button size="lg" onClick={handlePause}>
                  <Pause className="mr-2 h-5 w-5" />
                  Pause
                </Button>
              )}
              <Button size="lg" variant="outline" onClick={handleReset}>
                <RotateCcw className="mr-2 h-5 w-5" />
                Reset
              </Button>
              <Button
                size="lg"
                variant="ghost"
                onClick={() => setSoundEnabled(!soundEnabled)}
              >
                {soundEnabled ? (
                  <Volume2 className="h-5 w-5" />
                ) : (
                  <VolumeX className="h-5 w-5" />
                )}
              </Button>
            </div>

            {/* Type indicator */}
            {!isRunning && (
              <div className="flex justify-center">
                <Badge variant="secondary" className="text-sm">
                  {meditationTypes.find(t => t.id === selectedType)?.name}
                </Badge>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Settings */}
      {!isRunning && (
        <div className="grid gap-6 md:grid-cols-2">
          {/* Duration Selection */}
          <Card>
            <CardHeader>
              <CardTitle>Duration</CardTitle>
              <CardDescription>Choose your meditation length</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-2">
                {presetDurations.slice(0, 6).map((preset) => (
                  <Button
                    key={preset.value}
                    variant={selectedDuration === preset.value ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => {
                      setSelectedDuration(preset.value)
                      setTimeRemaining(preset.value)
                    }}
                  >
                    {preset.label}
                  </Button>
                ))}
              </div>
              <div className="flex gap-2">
                <input
                  type="number"
                  placeholder="Custom (minutes)"
                  className="flex-1 rounded-md border border-input bg-background px-3 py-2 text-sm"
                  value={customDuration}
                  onChange={(e) => {
                    setCustomDuration(e.target.value)
                    const minutes = parseInt(e.target.value)
                    if (!isNaN(minutes) && minutes > 0) {
                      const seconds = minutes * 60
                      setSelectedDuration(seconds)
                      setTimeRemaining(seconds)
                    }
                  }}
                />
                <Button
                  variant="outline"
                  onClick={() => {
                    const minutes = parseInt(customDuration)
                    if (!isNaN(minutes) && minutes > 0) {
                      const seconds = minutes * 60
                      setSelectedDuration(seconds)
                      setTimeRemaining(seconds)
                    }
                  }}
                >
                  Set
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Meditation Type */}
          <Card>
            <CardHeader>
              <CardTitle>Meditation Type</CardTitle>
              <CardDescription>Select your practice focus</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {meditationTypes.map((type) => {
                  const Icon = type.icon
                  return (
                    <div
                      key={type.id}
                      className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                        selectedType === type.id
                          ? 'bg-primary/10 border-primary'
                          : 'hover:bg-muted'
                      }`}
                      onClick={() => setSelectedType(type.id)}
                    >
                      <div className="flex items-center gap-3">
                        <Icon className="h-5 w-5 text-primary" />
                        <div className="flex-1">
                          <p className="font-medium text-sm">{type.name}</p>
                          <p className="text-xs text-muted-foreground">{type.description}</p>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Guidance */}
      {isRunning && (
        <Card>
          <CardHeader>
            <CardTitle>
              {meditationTypes.find(t => t.id === selectedType)?.name} Guidance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 text-sm text-muted-foreground">
              {selectedType === 'breath' && (
                <>
                  <p>• Find a comfortable position and close your eyes or soften your gaze</p>
                  <p>• Notice your natural breath without trying to change it</p>
                  <p>• When your mind wanders, gently return attention to your breath</p>
                  <p>• There's no need to control your breathing - simply observe</p>
                </>
              )}
              {selectedType === 'body' && (
                <>
                  <p>• Start by noticing sensations at the top of your head</p>
                  <p>• Slowly move your attention down through your body</p>
                  <p>• Notice any tension, warmth, coolness, or other sensations</p>
                  <p>• Don't try to change anything - just observe with kindness</p>
                </>
              )}
              {selectedType === 'loving' && (
                <>
                  <p>• Begin by sending loving-kindness to yourself: "May I be happy, may I be peaceful"</p>
                  <p>• Extend these wishes to loved ones, neutral people, and difficult people</p>
                  <p>• Finally, send loving-kindness to all beings everywhere</p>
                  <p>• If difficult emotions arise, meet them with compassion</p>
                </>
              )}
              {selectedType === 'mountain' && (
                <>
                  <p>• Visualize a mountain - strong, grounded, and unshakeable</p>
                  <p>• Feel yourself embodying the mountain's stability and presence</p>
                  <p>• Weather may change around the mountain, but it remains steady</p>
                  <p>• Let thoughts and emotions pass like clouds around your mountain</p>
                </>
              )}
              {selectedType === 'ocean' && (
                <>
                  <p>• Breathe in slowly for a count of 4, like a wave drawing back</p>
                  <p>• Hold gently for a count of 2 at the peak</p>
                  <p>• Breathe out slowly for a count of 6, like a wave rolling to shore</p>
                  <p>• Find your own natural rhythm, like the eternal rhythm of the ocean</p>
                </>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Recent Sessions */}
      {sessions.length > 0 && !isRunning && (
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Recent Sessions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {sessions.slice(0, 5).map((session) => (
                <div key={session.id} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-3">
                    <Badge variant="outline">{session.type}</Badge>
                    <span className="text-muted-foreground">
                      {new Date(session.date).toLocaleDateString()}
                    </span>
                  </div>
                  <span className="font-medium">
                    {formatDuration(session.duration)}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Related Mindfulness Tools */}
      {!isRunning && (
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Related Mindfulness Tools</CardTitle>
            <CardDescription>Expand your mindfulness practice with these tools</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <Card className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <Heart className="h-5 w-5 text-primary" />
                    <h4 className="font-semibold">Body Scan</h4>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">
                    Guided body awareness practice
                  </p>
                  <Button size="sm" variant="outline" asChild className="w-full">
                    <Link href="/resources/mindfulness/body-scan">Start Body Scan</Link>
                  </Button>
                </CardContent>
              </Card>

              <Card className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <Wind className="h-5 w-5 text-primary" />
                    <h4 className="font-semibold">Breathing Exercise</h4>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">
                    Focused breathing techniques
                  </p>
                  <Button size="sm" variant="outline" asChild className="w-full">
                    <Link href="/resources/mindfulness/breathing">Practice Breathing</Link>
                  </Button>
                </CardContent>
              </Card>

              <Card className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <Calendar className="h-5 w-5 text-primary" />
                    <h4 className="font-semibold">Daily Check-in</h4>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">
                    Include mindfulness in daily wellness
                  </p>
                  <Button size="sm" variant="outline" asChild className="w-full">
                    <Link href="/checkin">Daily Check-in</Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Tips */}
      {!isRunning && (
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Meditation Tips</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• Find a quiet, comfortable space where you won't be disturbed</li>
              <li>• Sit upright but relaxed - you can use a chair, cushion, or mat</li>
              <li>• Start with shorter sessions and gradually increase duration</li>
              <li>• It's normal for your mind to wander - gently bring it back without judgment</li>
              <li>• Try to meditate at the same time each day to build a habit</li>
              <li>• Remember: there's no "perfect" meditation - just practice</li>
            </ul>
          </CardContent>
        </Card>
      )}
    </div>
  )
}