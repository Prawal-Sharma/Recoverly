'use client'

import { useState, useEffect, useRef } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  Play, Pause, RotateCcw, ChevronLeft, 
  Timer, User, Volume2, VolumeX,
  CheckCircle2, Circle, Sparkles
} from 'lucide-react'
import Link from 'next/link'

interface BodyScanSession {
  id: string
  date: string
  duration: number
  bodyParts: string[]
  tensionBefore: number
  tensionAfter: number
  notes: string
  completed: boolean
}

interface BodyPart {
  id: string
  name: string
  displayName: string
  instructions: string[]
  duration: number // in seconds
  position: { x: number; y: number }
}

const bodyParts: BodyPart[] = [
  {
    id: 'head',
    name: 'head',
    displayName: 'Head & Scalp',
    instructions: [
      'Focus on the top of your head and scalp',
      'Notice any tension, tingling, or warmth',
      'Allow your facial muscles to soften',
      'Let go of any furrows in your brow'
    ],
    duration: 45,
    position: { x: 50, y: 10 }
  },
  {
    id: 'face',
    name: 'face',
    displayName: 'Face & Jaw',
    instructions: [
      'Bring attention to your forehead',
      'Soften around your eyes and temples',
      'Release any tension in your jaw',
      'Let your tongue rest gently in your mouth'
    ],
    duration: 45,
    position: { x: 50, y: 15 }
  },
  {
    id: 'neck',
    name: 'neck',
    displayName: 'Neck & Throat',
    instructions: [
      'Notice the back of your neck',
      'Feel the sides of your neck',
      'Observe your throat area',
      'Allow any tightness to melt away'
    ],
    duration: 30,
    position: { x: 50, y: 20 }
  },
  {
    id: 'shoulders',
    name: 'shoulders',
    displayName: 'Shoulders',
    instructions: [
      'Feel across your left shoulder',
      'Notice your right shoulder',
      'Let them drop and release',
      'Feel the weight lifting from your shoulders'
    ],
    duration: 40,
    position: { x: 50, y: 25 }
  },
  {
    id: 'arms',
    name: 'arms',
    displayName: 'Arms & Hands',
    instructions: [
      'Focus on your upper arms',
      'Notice your elbows and forearms',
      'Feel into your wrists and hands',
      'Observe each finger, letting them rest'
    ],
    duration: 60,
    position: { x: 30, y: 35 }
  },
  {
    id: 'chest',
    name: 'chest',
    displayName: 'Chest',
    instructions: [
      'Bring attention to your chest',
      'Notice your heartbeat',
      'Feel your ribcage expanding and contracting',
      'Allow your chest to feel open and spacious'
    ],
    duration: 45,
    position: { x: 50, y: 35 }
  },
  {
    id: 'back',
    name: 'back',
    displayName: 'Back',
    instructions: [
      'Feel your upper back',
      'Notice your shoulder blades',
      'Scan down your spine',
      'Let your back settle and release'
    ],
    duration: 50,
    position: { x: 50, y: 40 }
  },
  {
    id: 'abdomen',
    name: 'abdomen',
    displayName: 'Abdomen',
    instructions: [
      'Place attention on your belly',
      'Notice it rising and falling with breath',
      'Feel any sensations in your stomach',
      'Allow this area to soften and relax'
    ],
    duration: 45,
    position: { x: 50, y: 50 }
  },
  {
    id: 'hips',
    name: 'hips',
    displayName: 'Hips & Pelvis',
    instructions: [
      'Focus on your hip area',
      'Notice your pelvis',
      'Feel where your body meets the surface',
      'Let this area feel stable and grounded'
    ],
    duration: 40,
    position: { x: 50, y: 58 }
  },
  {
    id: 'thighs',
    name: 'thighs',
    displayName: 'Thighs',
    instructions: [
      'Bring attention to your upper legs',
      'Feel the front of your thighs',
      'Notice the back of your thighs',
      'Let them feel heavy and relaxed'
    ],
    duration: 45,
    position: { x: 50, y: 68 }
  },
  {
    id: 'knees',
    name: 'knees',
    displayName: 'Knees',
    instructions: [
      'Focus on your kneecaps',
      'Notice the area behind your knees',
      'Feel any sensations around the joints',
      'Allow them to rest completely'
    ],
    duration: 30,
    position: { x: 50, y: 75 }
  },
  {
    id: 'calves',
    name: 'calves',
    displayName: 'Calves & Shins',
    instructions: [
      'Feel your calf muscles',
      'Notice your shins',
      'Observe any tension or relaxation',
      'Let these muscles completely let go'
    ],
    duration: 40,
    position: { x: 50, y: 82 }
  },
  {
    id: 'feet',
    name: 'feet',
    displayName: 'Feet & Toes',
    instructions: [
      'Bring attention to your ankles',
      'Feel the tops and bottoms of your feet',
      'Notice each toe individually',
      'Let your feet feel completely at rest'
    ],
    duration: 50,
    position: { x: 50, y: 92 }
  }
]

const guidedOptions = [
  {
    id: 'quick',
    name: 'Quick Scan',
    duration: '8 minutes',
    bodyPartsCount: 8,
    description: 'Focus on major body regions'
  },
  {
    id: 'full',
    name: 'Full Body Scan',
    duration: '15 minutes',
    bodyPartsCount: 13,
    description: 'Complete detailed body scan'
  },
  {
    id: 'custom',
    name: 'Custom',
    duration: 'Variable',
    bodyPartsCount: 0,
    description: 'Choose your own body parts'
  }
]

export default function BodyScanPage() {
  const [selectedOption, setSelectedOption] = useState('full')
  const [isActive, setIsActive] = useState(false)
  const [currentPartIndex, setCurrentPartIndex] = useState(0)
  const [currentInstructionIndex, setCurrentInstructionIndex] = useState(0)
  const [timeRemaining, setTimeRemaining] = useState(0)
  const [totalTime, setTotalTime] = useState(0)
  const [sessions, setSessions] = useState<BodyScanSession[]>([])
  const [tensionBefore, setTensionBefore] = useState(5)
  const [tensionAfter, setTensionAfter] = useState(5)
  const [sessionNotes, setSessionNotes] = useState('')
  const [showCompletion, setShowCompletion] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [selectedBodyParts, setSelectedBodyParts] = useState<string[]>([])
  
  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const audioContextRef = useRef<AudioContext | null>(null)

  useEffect(() => {
    const saved = localStorage.getItem('bodyScanSessions')
    if (saved) {
      setSessions(JSON.parse(saved))
    }
  }, [])

  useEffect(() => {
    if (sessions.length > 0) {
      localStorage.setItem('bodyScanSessions', JSON.stringify(sessions))
    }
  }, [sessions])

  useEffect(() => {
    if (selectedOption === 'quick') {
      setSelectedBodyParts(['head', 'shoulders', 'arms', 'chest', 'back', 'abdomen', 'thighs', 'feet'])
    } else if (selectedOption === 'full') {
      setSelectedBodyParts(bodyParts.map(bp => bp.id))
    }
  }, [selectedOption])

  useEffect(() => {
    if (isActive && timeRemaining > 0) {
      intervalRef.current = setInterval(() => {
        setTimeRemaining(prev => {
          if (prev <= 1) {
            // Move to next instruction or body part
            const currentBodyPart = getActiveBodyParts()[currentPartIndex]
            if (currentBodyPart && currentInstructionIndex < currentBodyPart.instructions.length - 1) {
              setCurrentInstructionIndex(prev => prev + 1)
              return 15 // 15 seconds per instruction
            } else if (currentPartIndex < getActiveBodyParts().length - 1) {
              setCurrentPartIndex(prev => prev + 1)
              setCurrentInstructionIndex(0)
              const nextBodyPart = getActiveBodyParts()[currentPartIndex + 1]
              return nextBodyPart ? Math.floor(nextBodyPart.duration / nextBodyPart.instructions.length) : 15
            } else {
              // Session complete
              completeSession()
              return 0
            }
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
  }, [isActive, timeRemaining, currentPartIndex, currentInstructionIndex])

  const getActiveBodyParts = () => {
    return bodyParts.filter(bp => selectedBodyParts.includes(bp.id))
  }

  const playChime = () => {
    if (isMuted) return
    
    try {
      if (!audioContextRef.current) {
        audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)()
      }
      
      const ctx = audioContextRef.current
      const oscillator = ctx.createOscillator()
      const gainNode = ctx.createGain()
      
      oscillator.connect(gainNode)
      gainNode.connect(ctx.destination)
      
      oscillator.frequency.value = 800
      oscillator.type = 'sine'
      
      gainNode.gain.setValueAtTime(0.1, ctx.currentTime)
      gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.5)
      
      oscillator.start(ctx.currentTime)
      oscillator.stop(ctx.currentTime + 0.5)
    } catch (error) {
      console.log('Audio not supported')
    }
  }

  const startSession = () => {
    const activeParts = getActiveBodyParts()
    if (activeParts.length === 0) return
    
    setIsActive(true)
    setCurrentPartIndex(0)
    setCurrentInstructionIndex(0)
    setShowCompletion(false)
    
    const firstPart = activeParts[0]
    const initialTime = Math.floor(firstPart.duration / firstPart.instructions.length)
    setTimeRemaining(initialTime)
    setTotalTime(activeParts.reduce((sum, part) => sum + part.duration, 0))
    
    playChime()
  }

  const pauseSession = () => {
    setIsActive(false)
  }

  const resetSession = () => {
    setIsActive(false)
    setCurrentPartIndex(0)
    setCurrentInstructionIndex(0)
    setTimeRemaining(0)
    setTotalTime(0)
    setShowCompletion(false)
  }

  const completeSession = () => {
    const activeParts = getActiveBodyParts()
    const session: BodyScanSession = {
      id: Date.now().toString(),
      date: new Date().toISOString(),
      duration: totalTime,
      bodyParts: activeParts.map(bp => bp.name),
      tensionBefore,
      tensionAfter,
      notes: sessionNotes,
      completed: true
    }
    
    setSessions(prev => [session, ...prev.slice(0, 9)]) // Keep last 10 sessions
    setIsActive(false)
    setShowCompletion(true)
    setSessionNotes('')
    playChime()
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const getProgress = () => {
    if (totalTime === 0) return 0
    const elapsed = totalTime - timeRemaining
    return (elapsed / totalTime) * 100
  }

  const currentBodyPart = getActiveBodyParts()[currentPartIndex]
  const currentInstruction = currentBodyPart?.instructions[currentInstructionIndex] || ''

  const toggleBodyPart = (bodyPartId: string) => {
    if (selectedOption !== 'custom') return
    
    setSelectedBodyParts(prev => 
      prev.includes(bodyPartId) 
        ? prev.filter(id => id !== bodyPartId)
        : [...prev, bodyPartId]
    )
  }

  return (
    <div className="container max-w-6xl py-10">
      {/* Header */}
      <div className="mb-8">
        <Link href="/resources/mindfulness" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-4">
          <ChevronLeft className="mr-1 h-4 w-4" />
          Back to Mindfulness Resources
        </Link>
        <h1 className="text-4xl font-bold mb-4 flex items-center gap-2">
          <User className="h-8 w-8 text-primary" />
          Body Scan Meditation
        </h1>
        <p className="text-xl text-muted-foreground">
          Guided mindfulness practice to develop body awareness and relaxation
        </p>
      </div>

      {/* Session Options */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Choose Your Body Scan Type</CardTitle>
          <CardDescription>Select duration and body parts to focus on</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3 mb-6">
            {guidedOptions.map((option) => (
              <button
                key={option.id}
                className={`p-4 text-left rounded-lg border-2 transition-all ${
                  selectedOption === option.id
                    ? 'border-primary bg-primary/5'
                    : 'border-muted hover:border-primary/50'
                }`}
                onClick={() => setSelectedOption(option.id)}
                disabled={isActive}
              >
                <h3 className="font-semibold">{option.name}</h3>
                <p className="text-sm text-muted-foreground mb-2">{option.description}</p>
                <div className="flex gap-2">
                  <Badge variant="outline">{option.duration}</Badge>
                  {option.bodyPartsCount > 0 && (
                    <Badge variant="secondary">{option.bodyPartsCount} areas</Badge>
                  )}
                </div>
              </button>
            ))}
          </div>

          {/* Custom Body Parts Selection */}
          {selectedOption === 'custom' && (
            <div className="space-y-4">
              <h3 className="font-semibold">Select Body Parts:</h3>
              <div className="grid gap-2 md:grid-cols-3">
                {bodyParts.map((bodyPart) => (
                  <button
                    key={bodyPart.id}
                    className={`p-3 text-sm text-left rounded-lg border transition-colors ${
                      selectedBodyParts.includes(bodyPart.id)
                        ? 'bg-primary text-primary-foreground'
                        : 'hover:bg-muted'
                    }`}
                    onClick={() => toggleBodyPart(bodyPart.id)}
                    disabled={isActive}
                  >
                    <div className="flex items-center gap-2">
                      {selectedBodyParts.includes(bodyPart.id) ? (
                        <CheckCircle2 className="h-4 w-4" />
                      ) : (
                        <Circle className="h-4 w-4" />
                      )}
                      {bodyPart.displayName}
                    </div>
                  </button>
                ))}
              </div>
              <p className="text-sm text-muted-foreground">
                Selected: {selectedBodyParts.length} body parts, 
                ~{Math.round(bodyParts.filter(bp => selectedBodyParts.includes(bp.id)).reduce((sum, bp) => sum + bp.duration, 0) / 60)} minutes
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Body Diagram */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Body Map</CardTitle>
              <CardDescription>Visual guide for current focus area</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="relative w-full h-96 bg-muted/10 rounded-lg overflow-hidden">
                {/* Simple body outline SVG */}
                <svg viewBox="0 0 100 100" className="w-full h-full">
                  {/* Head */}
                  <ellipse cx="50" cy="12" rx="8" ry="10" fill={currentBodyPart?.id === 'head' || currentBodyPart?.id === 'face' ? '#3b82f6' : '#e5e7eb'} stroke="#374151" strokeWidth="0.5"/>
                  
                  {/* Neck */}
                  <rect x="47" y="20" width="6" height="5" fill={currentBodyPart?.id === 'neck' ? '#3b82f6' : '#e5e7eb'} stroke="#374151" strokeWidth="0.5"/>
                  
                  {/* Shoulders */}
                  <ellipse cx="50" cy="28" rx="15" ry="4" fill={currentBodyPart?.id === 'shoulders' ? '#3b82f6' : '#e5e7eb'} stroke="#374151" strokeWidth="0.5"/>
                  
                  {/* Arms */}
                  <ellipse cx="35" cy="35" rx="4" ry="12" fill={currentBodyPart?.id === 'arms' ? '#3b82f6' : '#e5e7eb'} stroke="#374151" strokeWidth="0.5"/>
                  <ellipse cx="65" cy="35" rx="4" ry="12" fill={currentBodyPart?.id === 'arms' ? '#3b82f6' : '#e5e7eb'} stroke="#374151" strokeWidth="0.5"/>
                  
                  {/* Torso */}
                  <rect x="42" y="28" width="16" height="25" rx="2" fill={
                    currentBodyPart?.id === 'chest' || currentBodyPart?.id === 'back' || currentBodyPart?.id === 'abdomen' ? '#3b82f6' : '#e5e7eb'
                  } stroke="#374151" strokeWidth="0.5"/>
                  
                  {/* Hips */}
                  <ellipse cx="50" cy="58" rx="12" ry="5" fill={currentBodyPart?.id === 'hips' ? '#3b82f6' : '#e5e7eb'} stroke="#374151" strokeWidth="0.5"/>
                  
                  {/* Thighs */}
                  <ellipse cx="45" cy="68" rx="5" ry="10" fill={currentBodyPart?.id === 'thighs' ? '#3b82f6' : '#e5e7eb'} stroke="#374151" strokeWidth="0.5"/>
                  <ellipse cx="55" cy="68" rx="5" ry="10" fill={currentBodyPart?.id === 'thighs' ? '#3b82f6' : '#e5e7eb'} stroke="#374151" strokeWidth="0.5"/>
                  
                  {/* Knees */}
                  <circle cx="45" cy="78" r="3" fill={currentBodyPart?.id === 'knees' ? '#3b82f6' : '#e5e7eb'} stroke="#374151" strokeWidth="0.5"/>
                  <circle cx="55" cy="78" r="3" fill={currentBodyPart?.id === 'knees' ? '#3b82f6' : '#e5e7eb'} stroke="#374151" strokeWidth="0.5"/>
                  
                  {/* Calves */}
                  <ellipse cx="45" cy="85" rx="4" ry="8" fill={currentBodyPart?.id === 'calves' ? '#3b82f6' : '#e5e7eb'} stroke="#374151" strokeWidth="0.5"/>
                  <ellipse cx="55" cy="85" rx="4" ry="8" fill={currentBodyPart?.id === 'calves' ? '#3b82f6' : '#e5e7eb'} stroke="#374151" strokeWidth="0.5"/>
                  
                  {/* Feet */}
                  <ellipse cx="45" cy="94" rx="3" ry="4" fill={currentBodyPart?.id === 'feet' ? '#3b82f6' : '#e5e7eb'} stroke="#374151" strokeWidth="0.5"/>
                  <ellipse cx="55" cy="94" rx="3" ry="4" fill={currentBodyPart?.id === 'feet' ? '#3b82f6' : '#e5e7eb'} stroke="#374151" strokeWidth="0.5"/>
                </svg>
                
                {/* Current body part indicator */}
                {currentBodyPart && (
                  <div className="absolute top-2 left-2 right-2 text-center">
                    <Badge className="bg-primary text-primary-foreground">
                      {currentBodyPart.displayName}
                    </Badge>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Recent Sessions */}
          {sessions.length > 0 && (
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Recent Sessions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {sessions.slice(0, 5).map((session) => (
                    <div key={session.id} className="flex items-center justify-between text-sm p-2 bg-muted/50 rounded">
                      <div className="flex items-center gap-2">
                        <Sparkles className="h-4 w-4 text-blue-500" />
                        <span>{formatTime(session.duration)}</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <span>{session.tensionBefore}→{session.tensionAfter}</span>
                        <span>{new Date(session.date).toLocaleDateString()}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Main Practice Area */}
        <div className="lg:col-span-2">
          <Tabs defaultValue="practice" className="space-y-6">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="practice">Practice</TabsTrigger>
              <TabsTrigger value="info">About Body Scan</TabsTrigger>
            </TabsList>

            <TabsContent value="practice">
              <Card>
                <CardHeader>
                  <CardTitle>Guided Body Scan Session</CardTitle>
                  <CardDescription>
                    {getActiveBodyParts().length} body parts • ~{Math.round(getActiveBodyParts().reduce((sum, bp) => sum + bp.duration, 0) / 60)} minutes
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Timer and Progress */}
                  <div className="text-center space-y-4">
                    <div className="text-4xl font-bold">
                      {formatTime(timeRemaining)}
                    </div>
                    
                    {totalTime > 0 && (
                      <div className="space-y-2">
                        <Progress value={getProgress()} className="h-2" />
                        <p className="text-sm text-muted-foreground">
                          Part {currentPartIndex + 1} of {getActiveBodyParts().length}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Controls */}
                  <div className="flex justify-center gap-4">
                    {!isActive ? (
                      <Button 
                        onClick={startSession} 
                        size="lg"
                        disabled={getActiveBodyParts().length === 0}
                      >
                        <Play className="mr-2 h-4 w-4" />
                        Start Session
                      </Button>
                    ) : (
                      <Button onClick={pauseSession} variant="secondary" size="lg">
                        <Pause className="mr-2 h-4 w-4" />
                        Pause
                      </Button>
                    )}
                    <Button onClick={resetSession} variant="outline" size="lg">
                      <RotateCcw className="mr-2 h-4 w-4" />
                      Reset
                    </Button>
                    <Button
                      variant="outline"
                      size="lg"
                      onClick={() => setIsMuted(!isMuted)}
                    >
                      {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                    </Button>
                  </div>

                  {/* Current Instruction */}
                  {isActive && currentInstruction && (
                    <Card className="border-2 border-primary/20 bg-primary/5">
                      <CardContent className="pt-6">
                        <div className="text-center">
                          <h3 className="font-semibold text-lg mb-2">
                            {currentBodyPart?.displayName}
                          </h3>
                          <p className="text-lg leading-relaxed">
                            {currentInstruction}
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  )}

                  {/* Pre-session Setup */}
                  {!isActive && !showCompletion && (
                    <div className="space-y-4 p-4 bg-muted/20 rounded-lg">
                      <h3 className="font-semibold">Before You Begin:</h3>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        <li>• Find a comfortable lying position</li>
                        <li>• Close your eyes or soften your gaze</li>
                        <li>• Allow your body to settle and relax</li>
                        <li>• Take a few deep breaths to center yourself</li>
                      </ul>
                      
                      <div>
                        <label className="block text-sm font-medium mb-2">
                          Current tension level (1-10):
                        </label>
                        <input
                          type="range"
                          min="1"
                          max="10"
                          value={tensionBefore}
                          onChange={(e) => setTensionBefore(parseInt(e.target.value))}
                          className="w-full"
                        />
                        <div className="flex justify-between text-xs text-muted-foreground">
                          <span>1 - Very relaxed</span>
                          <span className="font-semibold">{tensionBefore}</span>
                          <span>10 - Very tense</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Completion */}
                  {showCompletion && (
                    <Card className="border-green-200 bg-green-50">
                      <CardContent className="pt-6">
                        <div className="space-y-4">
                          <div className="text-center">
                            <CheckCircle2 className="h-8 w-8 text-green-600 mx-auto mb-2" />
                            <h3 className="font-semibold text-green-800">Session Complete!</h3>
                            <p className="text-sm text-green-700">
                              You've completed a {formatTime(totalTime)} body scan meditation
                            </p>
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium mb-2">
                              How relaxed do you feel now? (1-10):
                            </label>
                            <input
                              type="range"
                              min="1"
                              max="10"
                              value={tensionAfter}
                              onChange={(e) => setTensionAfter(parseInt(e.target.value))}
                              className="w-full"
                            />
                            <div className="flex justify-between text-xs text-muted-foreground">
                              <span>1 - Very relaxed</span>
                              <span className="font-semibold">{tensionAfter}</span>
                              <span>10 - Very tense</span>
                            </div>
                          </div>

                          <div>
                            <label className="block text-sm font-medium mb-2">
                              Session notes (optional):
                            </label>
                            <textarea
                              value={sessionNotes}
                              onChange={(e) => setSessionNotes(e.target.value)}
                              className="w-full p-2 border rounded text-sm"
                              rows={2}
                              placeholder="How did this session feel? What did you notice?"
                            />
                          </div>

                          <div className="text-center">
                            <p className="text-green-700 font-medium">
                              Tension: {tensionBefore} → {tensionAfter}
                              {tensionAfter < tensionBefore && (
                                <span className="text-green-600 ml-2">
                                  ✓ Reduced by {tensionBefore - tensionAfter}
                                </span>
                              )}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="info">
              <Card>
                <CardHeader>
                  <CardTitle>About Body Scan Meditation</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h3 className="font-semibold mb-2">What is Body Scan?</h3>
                    <p className="text-sm text-muted-foreground">
                      Body scan meditation is a foundational mindfulness practice that involves 
                      systematically focusing attention on different parts of your body. This practice 
                      helps develop body awareness, reduce physical tension, and cultivate present-moment attention.
                    </p>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-2">Benefits for Recovery:</h3>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      <li>• Reduces physical tension and stress</li>
                      <li>• Increases awareness of body sensations</li>
                      <li>• Helps identify where you hold stress</li>
                      <li>• Promotes relaxation and better sleep</li>
                      <li>• Develops mindfulness skills</li>
                      <li>• Can reduce cravings by increasing body awareness</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-2">Tips for Practice:</h3>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      <li>• Find a quiet, comfortable space where you won't be disturbed</li>
                      <li>• Lie down if possible, or sit comfortably</li>
                      <li>• There's no "right" way to feel - just notice what's there</li>
                      <li>• If you fall asleep, that's okay - your body may need rest</li>
                      <li>• Don't try to change sensations, just observe them</li>
                      <li>• Practice regularly for best results</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-2">When to Use:</h3>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      <li>• Before sleep to help with insomnia</li>
                      <li>• During periods of high stress or anxiety</li>
                      <li>• When feeling physically tense</li>
                      <li>• As part of a daily mindfulness routine</li>
                      <li>• When you want to reconnect with your body</li>
                    </ul>
                  </div>

                  <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <h3 className="font-semibold text-blue-800 mb-2">Remember:</h3>
                    <p className="text-sm text-blue-700">
                      Body scan is a practice of gentle attention, not relaxation technique. 
                      While relaxation often occurs, the goal is simply to notice and be present 
                      with whatever sensations arise.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}