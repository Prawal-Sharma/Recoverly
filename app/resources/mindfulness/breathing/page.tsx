'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { 
  Play, Pause, RotateCcw, Wind, Heart, Mountain, 
  ChevronLeft, Settings, Volume2, VolumeX, Zap
} from 'lucide-react'
import Link from 'next/link'

interface BreathingSession {
  id: string
  date: string
  technique: string
  duration: number
  completed: boolean
}

const breathingTechniques = [
  {
    id: '478',
    name: '4-7-8 Breathing',
    description: 'Inhale for 4, hold for 7, exhale for 8',
    icon: Wind,
    pattern: { inhale: 4, hold: 7, exhale: 8, pause: 0 },
    cycles: 4,
    benefits: 'Reduces anxiety, promotes sleep',
    color: 'bg-blue-500'
  },
  {
    id: 'box',
    name: 'Box Breathing',
    description: 'Equal timing for all phases',
    icon: Mountain,
    pattern: { inhale: 4, hold: 4, exhale: 4, pause: 4 },
    cycles: 6,
    benefits: 'Improves focus, reduces stress',
    color: 'bg-green-500'
  },
  {
    id: 'belly',
    name: 'Belly Breathing',
    description: 'Deep diaphragmatic breathing',
    icon: Heart,
    pattern: { inhale: 6, hold: 2, exhale: 8, pause: 0 },
    cycles: 5,
    benefits: 'Activates relaxation response',
    color: 'bg-purple-500'
  },
  {
    id: 'coherent',
    name: 'Coherent Breathing',
    description: 'Balanced 5-5 rhythm',
    icon: Zap,
    pattern: { inhale: 5, hold: 0, exhale: 5, pause: 0 },
    cycles: 8,
    benefits: 'Balances nervous system',
    color: 'bg-orange-500'
  }
]

const breathingPhases = [
  { key: 'inhale', label: 'Breathe In', color: 'text-blue-500' },
  { key: 'hold', label: 'Hold', color: 'text-yellow-500' },
  { key: 'exhale', label: 'Breathe Out', color: 'text-green-500' },
  { key: 'pause', label: 'Pause', color: 'text-gray-500' }
] as const

export default function BreathingPage() {
  const [selectedTechnique, setSelectedTechnique] = useState(breathingTechniques[0])
  const [isActive, setIsActive] = useState(false)
  const [currentPhase, setCurrentPhase] = useState<'inhale' | 'hold' | 'exhale' | 'pause'>('inhale')
  const [phaseTime, setPhaseTime] = useState(0)
  const [currentCycle, setCurrentCycle] = useState(0)
  const [totalTime, setTotalTime] = useState(0)
  const [sessions, setSessions] = useState<BreathingSession[]>([])
  const [soundEnabled, setSoundEnabled] = useState(true)
  const [circleScale, setCircleScale] = useState(1)
  
  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const startTimeRef = useRef<number>(0)

  // Load sessions
  useEffect(() => {
    const saved = localStorage.getItem('breathingSessions')
    if (saved) {
      setSessions(JSON.parse(saved))
    }
  }, [])

  // Save sessions
  useEffect(() => {
    if (sessions.length > 0) {
      localStorage.setItem('breathingSessions', JSON.stringify(sessions))
    }
  }, [sessions])

  const getCurrentPhaseDuration = useCallback(() => {
    return selectedTechnique.pattern[currentPhase] || 1
  }, [selectedTechnique, currentPhase])

  const getNextPhase = useCallback((phase: typeof currentPhase) => {
    const pattern = selectedTechnique.pattern
    const phases: (keyof typeof pattern)[] = ['inhale', 'hold', 'exhale', 'pause']
    
    // Filter out phases with 0 duration
    const activePhases = phases.filter(p => pattern[p] > 0)
    const currentIndex = activePhases.indexOf(phase)
    const nextIndex = (currentIndex + 1) % activePhases.length
    
    return activePhases[nextIndex]
  }, [selectedTechnique])

  const playSound = useCallback((phase: typeof currentPhase) => {
    if (!soundEnabled) return
    // In a real app, you would play different sounds for each phase
    // For now, just use a simple beep for phase transitions
    const audio = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBjih')
    audio.volume = 0.3
    audio.play().catch(() => {})
  }, [soundEnabled])

  const completeSession = useCallback(() => {
    const newSession: BreathingSession = {
      id: Date.now().toString(),
      date: new Date().toISOString(),
      technique: selectedTechnique.name,
      duration: totalTime,
      completed: true
    }
    
    setSessions(prev => [newSession, ...prev])
    alert('Breathing session completed! Well done.')
  }, [selectedTechnique.name, totalTime])

  // Main breathing timer
  useEffect(() => {
    if (isActive) {
      intervalRef.current = setInterval(() => {
        setPhaseTime(prev => {
          const currentDuration = getCurrentPhaseDuration()
          
          if (prev >= currentDuration - 1) {
            // Move to next phase
            const nextPhase = getNextPhase(currentPhase)
            playSound(nextPhase)
            
            // Check if we completed a full cycle
            if (currentPhase === 'exhale' || (currentPhase === 'pause' && selectedTechnique.pattern.pause > 0)) {
              setCurrentCycle(cycle => {
                const newCycle = cycle + 1
                if (newCycle >= selectedTechnique.cycles) {
                  // Session complete
                  setIsActive(false)
                  completeSession()
                  return 0
                }
                return newCycle
              })
            }
            
            setCurrentPhase(nextPhase)
            return 0
          }
          
          return prev + 1
        })
        
        setTotalTime(prev => prev + 1)
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
  }, [isActive, currentPhase, getCurrentPhaseDuration, getNextPhase, playSound, selectedTechnique.cycles, completeSession])

  // Animate circle based on phase
  useEffect(() => {
    const duration = getCurrentPhaseDuration()
    const progress = phaseTime / duration
    
    switch (currentPhase) {
      case 'inhale':
        setCircleScale(1 + (progress * 0.5)) // Grow from 1 to 1.5
        break
      case 'hold':
        setCircleScale(1.5) // Stay large
        break
      case 'exhale':
        setCircleScale(1.5 - (progress * 0.5)) // Shrink from 1.5 to 1
        break
      case 'pause':
        setCircleScale(1) // Stay small
        break
    }
  }, [currentPhase, phaseTime, getCurrentPhaseDuration])

  const handleStart = () => {
    setIsActive(true)
    setCurrentPhase('inhale')
    setPhaseTime(0)
    setCurrentCycle(0)
    setTotalTime(0)
    startTimeRef.current = Date.now()
    playSound('inhale')
  }

  const handlePause = () => {
    setIsActive(false)
  }

  const handleReset = () => {
    setIsActive(false)
    setCurrentPhase('inhale')
    setPhaseTime(0)
    setCurrentCycle(0)
    setTotalTime(0)
    setCircleScale(1)
  }

  const handleTechniqueChange = (technique: typeof breathingTechniques[0]) => {
    setSelectedTechnique(technique)
    handleReset()
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  const progress = ((phaseTime / getCurrentPhaseDuration()) * 100)
  const sessionProgress = ((currentCycle / selectedTechnique.cycles) * 100)
  const currentPhaseInfo = breathingPhases.find(p => p.key === currentPhase)
  const remainingTime = getCurrentPhaseDuration() - phaseTime

  return (
    <div className="container max-w-5xl py-10">
      {/* Header */}
      <div className="mb-8">
        <Link href="/resources/mindfulness" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-4">
          <ChevronLeft className="mr-1 h-4 w-4" />
          Back to Mindfulness Resources
        </Link>
        <h1 className="text-4xl font-bold mb-4 flex items-center gap-2">
          <Wind className="h-8 w-8 text-primary" />
          Breathing Exercises
        </h1>
        <p className="text-xl text-muted-foreground">
          Guided breathing techniques to calm your mind and body
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
            <p className="text-2xl font-bold">
              {Math.floor(sessions.reduce((acc, s) => acc + s.duration, 0) / 60)} min
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Favorite Technique</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-lg font-medium">{selectedTechnique.name}</p>
          </CardContent>
        </Card>
      </div>

      {/* Technique Selection */}
      {!isActive && (
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Choose Your Technique</CardTitle>
            <CardDescription>Select a breathing pattern that works for you</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2">
              {breathingTechniques.map((technique) => {
                const Icon = technique.icon
                return (
                  <div
                    key={technique.id}
                    className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                      selectedTechnique.id === technique.id
                        ? 'border-primary bg-primary/5'
                        : 'border-muted hover:border-primary/50'
                    }`}
                    onClick={() => handleTechniqueChange(technique)}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`p-2 rounded-lg ${technique.color} text-white`}>
                        <Icon className="h-5 w-5" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold">{technique.name}</h3>
                        <p className="text-sm text-muted-foreground mb-2">{technique.description}</p>
                        <p className="text-xs text-muted-foreground">{technique.benefits}</p>
                        <div className="flex gap-1 mt-2">
                          <Badge variant="outline" className="text-xs">
                            {technique.cycles} cycles
                          </Badge>
                          <Badge variant="outline" className="text-xs">
                            ~{Math.ceil(technique.cycles * Object.values(technique.pattern).reduce((a, b) => a + b, 0) / 60)} min
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Breathing Visualizer */}
      <Card className="mb-6">
        <CardContent className="pt-8 pb-8">
          <div className="text-center space-y-6">
            {/* Animated Circle */}
            <div className="relative flex items-center justify-center h-80">
              <div 
                className={`w-48 h-48 rounded-full ${selectedTechnique.color} opacity-30 transition-transform duration-1000 ease-in-out`}
                style={{ transform: `scale(${circleScale})` }}
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <div className={`text-4xl font-bold mb-2 ${currentPhaseInfo?.color}`}>
                  {currentPhaseInfo?.label}
                </div>
                {isActive && (
                  <div className="text-6xl font-mono font-bold text-primary">
                    {remainingTime}
                  </div>
                )}
                {!isActive && (
                  <div className="text-lg text-muted-foreground">
                    {selectedTechnique.name}
                  </div>
                )}
              </div>
            </div>

            {/* Progress Indicators */}
            {isActive && (
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Current Phase</span>
                    <span>{currentPhaseInfo?.label} ({remainingTime}s remaining)</span>
                  </div>
                  <Progress value={progress} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Session Progress</span>
                    <span>{currentCycle}/{selectedTechnique.cycles} cycles</span>
                  </div>
                  <Progress value={sessionProgress} className="h-2" />
                </div>
                <div className="text-sm text-muted-foreground">
                  Total time: {formatTime(totalTime)}
                </div>
              </div>
            )}

            {/* Controls */}
            <div className="flex justify-center gap-4">
              {!isActive ? (
                <Button size="lg" onClick={handleStart}>
                  <Play className="mr-2 h-5 w-5" />
                  Start Breathing
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
          </div>
        </CardContent>
      </Card>

      {/* Instructions */}
      {!isActive && (
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>How to Use {selectedTechnique.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="grid grid-cols-4 gap-4 text-center">
                {breathingPhases.map((phase) => {
                  const duration = selectedTechnique.pattern[phase.key]
                  if (duration === 0) return null
                  
                  return (
                    <div key={phase.key} className="p-3 border rounded-lg">
                      <div className={`font-semibold ${phase.color}`}>
                        {phase.label}
                      </div>
                      <div className="text-2xl font-bold">{duration}s</div>
                    </div>
                  )
                })}
              </div>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Find a comfortable seated position with your back straight</li>
                <li>• Place one hand on your chest, one on your belly</li>
                <li>• Follow the visual guide and breathe through your nose</li>
                <li>• Focus on making your belly rise more than your chest</li>
                <li>• Don't force your breathing - let it flow naturally</li>
                <li>• If you feel dizzy, pause and return to normal breathing</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Recent Sessions */}
      {sessions.length > 0 && !isActive && (
        <Card>
          <CardHeader>
            <CardTitle>Recent Sessions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {sessions.slice(0, 5).map((session) => (
                <div key={session.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="font-medium">{session.technique}</p>
                    <p className="text-sm text-muted-foreground">
                      {new Date(session.date).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">{formatTime(session.duration)}</p>
                    {session.completed && (
                      <Badge variant="outline" className="text-xs">
                        Completed
                      </Badge>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Benefits */}
      {!isActive && (
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Benefits of Breathing Exercises</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="grid md:grid-cols-2 gap-2 text-sm text-muted-foreground">
              <li>• Reduces stress and anxiety</li>
              <li>• Lowers blood pressure</li>
              <li>• Improves focus and concentration</li>
              <li>• Promotes better sleep</li>
              <li>• Activates the relaxation response</li>
              <li>• Helps manage cravings and urges</li>
              <li>• Increases mindfulness and presence</li>
              <li>• Balances the nervous system</li>
            </ul>
          </CardContent>
        </Card>
      )}
    </div>
  )
}