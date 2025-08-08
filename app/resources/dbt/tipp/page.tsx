'use client'

import { useState, useEffect, useRef } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  Thermometer, Activity, Wind, Zap, 
  ChevronLeft, Play, Pause, RotateCcw, 
  Timer, AlertCircle, CheckCircle2, Home, Phone
} from 'lucide-react'
import Link from 'next/link'

interface TippSession {
  id: string
  date: string
  technique: 'temperature' | 'exercise' | 'breathing' | 'muscle'
  duration: number
  intensity: number // 1-10 before
  finalIntensity: number // 1-10 after
  notes: string
}

const tippTechniques = [
  {
    id: 'temperature',
    name: 'Temperature',
    icon: Thermometer,
    color: 'text-blue-500',
    bgColor: 'bg-blue-50',
    borderColor: 'border-blue-200',
    description: 'Change your body temperature to quickly reduce emotional intensity',
    methods: [
      {
        name: 'Cold Water Face Splash',
        instructions: [
          'Fill a bowl with cold water (50-60°F)',
          'Hold your breath and immerse your face from temples to chin',
          'Stay submerged for 15-30 seconds',
          'Repeat 2-3 times if needed'
        ],
        duration: '1-2 minutes',
        intensity: 'High effectiveness'
      },
      {
        name: 'Ice Pack Hold',
        instructions: [
          'Wrap ice pack in thin towel',
          'Hold against temples, wrists, or back of neck',
          'Apply for 30-60 seconds',
          'Take 30 second break, repeat if needed'
        ],
        duration: '2-3 minutes',
        intensity: 'Medium-high effectiveness'
      },
      {
        name: 'Cold Shower',
        instructions: [
          'Set water to cold (but tolerable) temperature',
          'Focus on your face and upper body',
          'Stay in for 30-90 seconds',
          'Breathe steadily throughout'
        ],
        duration: '1-2 minutes',
        intensity: 'Very high effectiveness'
      }
    ],
    safety: 'Do not use if you have heart conditions, eating disorders, or are pregnant. Stop if you feel dizzy or unwell.',
    whenToUse: [
      'Intense anger or rage',
      'Panic attacks',
      'Overwhelming urges',
      'Suicidal thoughts',
      'Before acting impulsively'
    ]
  },
  {
    id: 'exercise',
    name: 'Intense Exercise',
    icon: Activity,
    color: 'text-green-500',
    bgColor: 'bg-green-50',
    borderColor: 'border-green-200',
    description: 'Use intense physical activity to burn off overwhelming emotions',
    methods: [
      {
        name: 'Sprint in Place',
        instructions: [
          'Stand with feet hip-width apart',
          'Run in place as fast as you can',
          'Pump your arms vigorously',
          'Continue for 10-15 minutes or until exhausted'
        ],
        duration: '10-15 minutes',
        intensity: 'Very high effectiveness'
      },
      {
        name: 'Jumping Jacks',
        instructions: [
          'Start in standing position',
          'Jump while spreading legs and raising arms overhead',
          'Jump back to starting position',
          'Repeat rapidly for 5-10 minutes'
        ],
        duration: '5-10 minutes',
        intensity: 'High effectiveness'
      },
      {
        name: 'Wall Push-ups',
        instructions: [
          'Stand arm length from wall',
          'Place palms flat against wall',
          'Do push-ups against wall rapidly',
          'Continue until muscles are fatigued'
        ],
        duration: '3-5 minutes',
        intensity: 'Medium-high effectiveness'
      }
    ],
    safety: 'Stop if you experience chest pain, severe shortness of breath, or dizziness. Consult doctor if you have heart conditions.',
    whenToUse: [
      'Built-up anger or frustration',
      'Restless energy',
      'Need to "burn off" emotions',
      'Feeling physically agitated',
      'Before confronting someone'
    ]
  },
  {
    id: 'breathing',
    name: 'Paced Breathing',
    icon: Wind,
    color: 'text-purple-500',
    bgColor: 'bg-purple-50',
    borderColor: 'border-purple-200',
    description: 'Slow, controlled breathing to activate your parasympathetic nervous system',
    methods: [
      {
        name: '4-7-8 Breathing',
        instructions: [
          'Inhale through nose for 4 counts',
          'Hold breath for 7 counts',
          'Exhale through mouth for 8 counts',
          'Repeat cycle 4-6 times'
        ],
        duration: '2-3 minutes',
        intensity: 'High effectiveness'
      },
      {
        name: 'Box Breathing',
        instructions: [
          'Inhale for 4 counts',
          'Hold for 4 counts',
          'Exhale for 4 counts',
          'Hold empty for 4 counts',
          'Repeat for 5-10 cycles'
        ],
        duration: '3-5 minutes',
        intensity: 'Medium-high effectiveness'
      },
      {
        name: 'Belly Breathing',
        instructions: [
          'Place one hand on chest, one on belly',
          'Breathe in slowly through nose (belly should rise)',
          'Exhale slowly through mouth (belly should fall)',
          'Make exhale longer than inhale'
        ],
        duration: '5-10 minutes',
        intensity: 'Medium effectiveness'
      }
    ],
    safety: 'If you feel lightheaded, return to normal breathing. Some people may feel anxious when focusing on breath - try a different technique.',
    whenToUse: [
      'Anxiety or panic',
      'Need to calm down',
      'Before sleep',
      'General stress relief',
      'Racing thoughts'
    ]
  },
  {
    id: 'muscle',
    name: 'Paired Muscle Relaxation',
    icon: Zap,
    color: 'text-orange-500',
    bgColor: 'bg-orange-50',
    borderColor: 'border-orange-200',
    description: 'Tense and release muscle groups while practicing paced breathing',
    methods: [
      {
        name: 'Progressive Muscle Relaxation',
        instructions: [
          'Start with your toes - tense for 5 seconds',
          'Release and breathe slowly for 10 seconds',
          'Move up to calves, thighs, abdomen, etc.',
          'End with facial muscles and scalp',
          'Combine with slow, deep breathing throughout'
        ],
        duration: '10-15 minutes',
        intensity: 'Medium-high effectiveness'
      },
      {
        name: 'Quick Tension Release',
        instructions: [
          'Tense your entire body for 10 seconds',
          'Hold breath while tensed',
          'Release everything and exhale slowly',
          'Repeat 3-5 times',
          'Focus on the contrast between tension and relaxation'
        ],
        duration: '3-5 minutes',
        intensity: 'Medium effectiveness'
      },
      {
        name: 'Shoulder and Face Focus',
        instructions: [
          'Raise shoulders to ears and tense for 5 seconds',
          'Drop shoulders while exhaling slowly',
          'Scrunch facial muscles tight for 5 seconds',
          'Release while breathing out slowly',
          'Repeat 5-10 times'
        ],
        duration: '5-7 minutes',
        intensity: 'Medium effectiveness'
      }
    ],
    safety: 'Avoid if you have muscle injuries. Do not tense muscles to the point of pain.',
    whenToUse: [
      'Physical tension from stress',
      'Difficulty sleeping',
      'Chronic muscle tension',
      'Need to relax after intense emotions',
      'Preparation for challenging situations'
    ]
  }
]

export default function TippPage() {
  const [activeTab, setActiveTab] = useState('temperature')
  const [currentMethod, setCurrentMethod] = useState(0)
  const [isActive, setIsActive] = useState(false)
  const [timeElapsed, setTimeElapsed] = useState(0)
  const [currentStep, setCurrentStep] = useState(0)
  const [sessions, setSessions] = useState<TippSession[]>([])
  const [intensityBefore, setIntensityBefore] = useState(5)
  const [intensityAfter, setIntensityAfter] = useState(5)
  const [sessionNotes, setSessionNotes] = useState('')
  const [showCompletion, setShowCompletion] = useState(false)
  
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    const saved = localStorage.getItem('tippSessions')
    if (saved) {
      setSessions(JSON.parse(saved))
    }
  }, [])

  useEffect(() => {
    if (sessions.length > 0) {
      localStorage.setItem('tippSessions', JSON.stringify(sessions))
    }
  }, [sessions])

  useEffect(() => {
    if (isActive) {
      intervalRef.current = setInterval(() => {
        setTimeElapsed(prev => prev + 1)
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
  }, [isActive])

  const currentTechnique = tippTechniques.find(t => t.id === activeTab)!
  const currentMethodData = currentTechnique.methods[currentMethod]
  const Icon = currentTechnique.icon

  const startSession = () => {
    setIsActive(true)
    setTimeElapsed(0)
    setCurrentStep(0)
    setShowCompletion(false)
  }

  const pauseSession = () => {
    setIsActive(false)
  }

  const resetSession = () => {
    setIsActive(false)
    setTimeElapsed(0)
    setCurrentStep(0)
    setShowCompletion(false)
  }

  const completeSession = () => {
    const session: TippSession = {
      id: Date.now().toString(),
      date: new Date().toISOString(),
      technique: activeTab as any,
      duration: timeElapsed,
      intensity: intensityBefore,
      finalIntensity: intensityAfter,
      notes: sessionNotes
    }
    
    setSessions(prev => [session, ...prev.slice(0, 9)]) // Keep last 10 sessions
    setIsActive(false)
    setShowCompletion(true)
    setSessionNotes('')
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const nextStep = () => {
    if (currentStep < currentMethodData.instructions.length - 1) {
      setCurrentStep(prev => prev + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1)
    }
  }

  return (
    <div className="container max-w-6xl py-10">
      {/* Header */}
      <div className="mb-8">
        <Link href="/resources/dbt" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-4">
          <ChevronLeft className="mr-1 h-4 w-4" />
          Back to DBT Resources
        </Link>
        <h1 className="text-4xl font-bold mb-4 flex items-center gap-2">
          <Zap className="h-8 w-8 text-primary" />
          TIPP Crisis Survival Skills
        </h1>
        <p className="text-xl text-muted-foreground">
          Four powerful techniques to quickly reduce emotional intensity in crisis moments
        </p>
      </div>

      {/* Crisis Warning */}
      <Card className="mb-8 border-red-200 bg-red-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-red-700">
            <AlertCircle className="h-5 w-5" />
            Crisis Support
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-red-700 mb-4">
            If you are having thoughts of suicide or self-harm, please reach out for help immediately:
          </p>
          <div className="grid gap-2 md:grid-cols-2 text-sm">
            <div>
              <strong>National Suicide Prevention Lifeline:</strong><br />
              Call or text <strong>988</strong>
            </div>
            <div>
              <strong>Crisis Text Line:</strong><br />
              Text <strong>HOME</strong> to <strong>741741</strong>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Technique Selection */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>TIPP Techniques</CardTitle>
              <CardDescription>Choose a technique based on your current needs</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              {tippTechniques.map((technique) => {
                const TechIcon = technique.icon
                return (
                  <button
                    key={technique.id}
                    className={`w-full p-3 text-left rounded-lg border-2 transition-all ${
                      activeTab === technique.id
                        ? `border-primary ${technique.bgColor}`
                        : 'border-muted hover:border-primary/50'
                    }`}
                    onClick={() => {
                      setActiveTab(technique.id)
                      setCurrentMethod(0)
                      resetSession()
                    }}
                  >
                    <div className="flex items-center gap-3">
                      <TechIcon className={`h-5 w-5 ${technique.color}`} />
                      <div className="flex-1">
                        <p className="font-medium">{technique.name}</p>
                        <p className="text-xs text-muted-foreground line-clamp-2">
                          {technique.description}
                        </p>
                      </div>
                    </div>
                  </button>
                )
              })}
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
                  {sessions.slice(0, 5).map((session) => {
                    const technique = tippTechniques.find(t => t.id === session.technique)!
                    return (
                      <div key={session.id} className="flex items-center justify-between text-sm p-2 bg-muted/50 rounded">
                        <div className="flex items-center gap-2">
                          <technique.icon className={`h-4 w-4 ${technique.color}`} />
                          <span>{technique.name}</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <span>{formatTime(session.duration)}</span>
                          <span>{session.intensity}→{session.finalIntensity}</span>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Main Content */}
        <div className="lg:col-span-2">
          <Tabs defaultValue="guide" className="space-y-6">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="guide">Interactive Guide</TabsTrigger>
              <TabsTrigger value="info">Technique Info</TabsTrigger>
            </TabsList>

            <TabsContent value="guide">
              {/* Method Selection */}
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Icon className={currentTechnique.color} />
                    {currentTechnique.name} Methods
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-2 md:grid-cols-3">
                    {currentTechnique.methods.map((method, index) => (
                      <button
                        key={index}
                        className={`p-3 text-left rounded-lg border-2 transition-all ${
                          currentMethod === index
                            ? `border-primary ${currentTechnique.bgColor}`
                            : 'border-muted hover:border-primary/50'
                        }`}
                        onClick={() => {
                          setCurrentMethod(index)
                          resetSession()
                        }}
                      >
                        <p className="font-medium text-sm">{method.name}</p>
                        <p className="text-xs text-muted-foreground">{method.duration}</p>
                      </button>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Interactive Session */}
              <Card className={`${currentTechnique.borderColor} ${currentTechnique.bgColor}`}>
                <CardHeader>
                  <CardTitle>{currentMethodData.name}</CardTitle>
                  <CardDescription>{currentMethodData.intensity}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Timer and Controls */}
                  <div className="text-center">
                    <div className="text-4xl font-bold mb-4">
                      {formatTime(timeElapsed)}
                    </div>
                    <div className="flex justify-center gap-4">
                      {!isActive ? (
                        <Button onClick={startSession} size="lg">
                          <Play className="mr-2 h-4 w-4" />
                          Start
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
                    </div>
                  </div>

                  {/* Step-by-step Guide */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold">Step-by-step Instructions</h3>
                      <Badge variant="outline">
                        Step {currentStep + 1} of {currentMethodData.instructions.length}
                      </Badge>
                    </div>
                    
                    <div className="p-4 bg-background rounded-lg border-2">
                      <p className="text-lg">{currentMethodData.instructions[currentStep]}</p>
                    </div>

                    <div className="flex justify-between">
                      <Button 
                        variant="outline" 
                        onClick={prevStep}
                        disabled={currentStep === 0}
                      >
                        Previous Step
                      </Button>
                      <Button 
                        variant="outline"
                        onClick={nextStep}
                        disabled={currentStep === currentMethodData.instructions.length - 1}
                      >
                        Next Step
                      </Button>
                    </div>

                    <Progress 
                      value={(currentStep + 1) / currentMethodData.instructions.length * 100}
                      className="w-full"
                    />
                  </div>

                  {/* Intensity Tracking */}
                  {isActive && (
                    <div className="space-y-6 p-4 bg-background rounded-lg border">
                      <div className="space-y-3">
                        <label className="block text-sm font-medium mb-3 text-center sm:text-left">
                          Rate your emotional intensity right now:
                        </label>
                        <div className="space-y-4">
                          <input
                            type="range"
                            min="1"
                            max="10"
                            value={intensityBefore}
                            onChange={(e) => setIntensityBefore(parseInt(e.target.value))}
                            className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer slider-thumb"
                            style={{
                              WebkitAppearance: 'none',
                              height: '12px',
                              background: '#e5e7eb',
                              borderRadius: '6px',
                              outline: 'none'
                            }}
                          />
                          <div className="flex justify-between text-xs text-muted-foreground px-1">
                            <span>1<br />Calm</span>
                            <span className="font-bold text-lg text-primary text-center">
                              {intensityBefore}
                              <br />
                              <span className="text-xs font-normal">
                                {intensityBefore <= 3 ? 'Low' : intensityBefore <= 7 ? 'Moderate' : 'High'}
                              </span>
                            </span>
                            <span>10<br />Extreme</span>
                          </div>
                        </div>
                      </div>

                      <Button onClick={completeSession} className="w-full min-h-[44px] text-base">
                        <CheckCircle2 className="mr-2 h-4 w-4" aria-hidden="true" />
                        Complete Session
                      </Button>
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
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium mb-2">
                              How do you feel now? (1-10):
                            </label>
                            <input
                              type="range"
                              min="1"
                              max="10"
                              value={intensityAfter}
                              onChange={(e) => setIntensityAfter(parseInt(e.target.value))}
                              className="w-full"
                            />
                            <div className="flex justify-between text-xs text-muted-foreground">
                              <span>1 - Calm</span>
                              <span className="font-semibold">{intensityAfter}</span>
                              <span>10 - Extreme</span>
                            </div>
                          </div>

                          <div>
                            <label className="block text-sm font-medium mb-2">
                              Notes (optional):
                            </label>
                            <textarea
                              value={sessionNotes}
                              onChange={(e) => setSessionNotes(e.target.value)}
                              className="w-full p-2 border rounded text-sm"
                              rows={2}
                              placeholder="How was this experience? What worked well?"
                            />
                          </div>

                          <div className="text-center">
                            <p className="text-green-700 font-medium">
                              Intensity: {intensityBefore} → {intensityAfter}
                              {intensityAfter < intensityBefore && (
                                <span className="text-green-600 ml-2">
                                  ✓ Decreased by {intensityBefore - intensityAfter}
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
                  <CardTitle className="flex items-center gap-2">
                    <Icon className={currentTechnique.color} />
                    {currentTechnique.name}
                  </CardTitle>
                  <CardDescription>{currentTechnique.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* When to Use */}
                  <div>
                    <h3 className="font-semibold mb-2">When to Use {currentTechnique.name}:</h3>
                    <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                      {currentTechnique.whenToUse.map((use, index) => (
                        <li key={index}>{use}</li>
                      ))}
                    </ul>
                  </div>

                  {/* Safety Information */}
                  <div>
                    <h3 className="font-semibold mb-2 text-yellow-700">Safety Information:</h3>
                    <p className="text-sm text-yellow-700 bg-yellow-50 p-3 rounded-lg border border-yellow-200">
                      {currentTechnique.safety}
                    </p>
                  </div>

                  {/* All Methods */}
                  <div>
                    <h3 className="font-semibold mb-3">Available Methods:</h3>
                    <div className="space-y-4">
                      {currentTechnique.methods.map((method, index) => (
                        <div key={index} className="border rounded-lg p-4">
                          <div className="flex justify-between items-start mb-3">
                            <h4 className="font-medium">{method.name}</h4>
                            <div className="flex gap-2">
                              <Badge variant="outline">{method.duration}</Badge>
                              <Badge variant="secondary">{method.intensity}</Badge>
                            </div>
                          </div>
                          <ol className="list-decimal list-inside space-y-1 text-sm text-muted-foreground">
                            {method.instructions.map((instruction, i) => (
                              <li key={i}>{instruction}</li>
                            ))}
                          </ol>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* Quick Access */}
      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Quick TIPP Reference</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {tippTechniques.map((technique) => {
              const TechIcon = technique.icon
              return (
                <div key={technique.id} className="text-center p-4 border rounded-lg">
                  <TechIcon className={`h-8 w-8 mx-auto mb-2 ${technique.color}`} />
                  <h3 className="font-semibold mb-1">{technique.name}</h3>
                  <p className="text-xs text-muted-foreground">
                    {technique.methods[0].name}
                  </p>
                </div>
              )
            })}
          </div>
          <div className="mt-4 p-4 bg-muted/50 rounded-lg text-center">
            <p className="text-sm text-muted-foreground">
              <strong>Remember:</strong> TIPP skills work best when you practice them regularly, 
              not just during crisis moments. The more you practice, the more effective they become.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Crisis Resources */}
      <Card className="mt-8 border-red-200 bg-red-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-red-700">
            <Phone className="h-5 w-5" />
            Need Additional Crisis Support?
          </CardTitle>
          <CardDescription className="text-red-600">
            If TIPP techniques aren't enough, reach out for immediate support
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-3">
              <h3 className="font-semibold text-red-800">Emergency Contacts</h3>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-red-600" />
                  <div>
                    <p className="font-medium">Crisis & Suicide Prevention</p>
                    <p className="text-red-700">Call or text <strong>988</strong></p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-red-600" />
                  <div>
                    <p className="font-medium">Crisis Text Line</p>
                    <p className="text-red-700">Text <strong>HOME</strong> to <strong>741741</strong></p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="space-y-3">
              <h3 className="font-semibold text-red-800">Additional Resources</h3>
              <div className="space-y-2">
                <Button size="sm" variant="outline" asChild className="w-full justify-start">
                  <Link href="/resources/crisis">
                    <AlertCircle className="mr-2 h-4 w-4" />
                    Complete Crisis Resources
                  </Link>
                </Button>
                <Button size="sm" variant="outline" asChild className="w-full justify-start">
                  <Link href="/recovery-plan">
                    <Home className="mr-2 h-4 w-4" />
                    Create Emergency Plan
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}