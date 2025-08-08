'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  MapPin, ChevronLeft, Plus, X, AlertTriangle, Shield, 
  Users, Home, Brain, Calendar, Download, Save, Target
} from 'lucide-react'
import Link from 'next/link'

interface Trigger {
  id: string
  name: string
  category: 'people' | 'places' | 'things' | 'emotions' | 'times' | 'thoughts'
  intensity: number // 1-10
  copingStrategies: string[]
  avoidable: boolean
  notes: string
}

interface TriggerMap {
  id: string
  date: string
  triggers: Trigger[]
  emergencyPlan: string
  lastUpdated: string
}

const triggerCategories = [
  { 
    id: 'people', 
    label: 'People', 
    icon: Users, 
    description: 'Specific individuals who trigger cravings',
    examples: ['Old drinking buddies', 'Toxic family members', 'Dealers', 'Co-workers who drink']
  },
  { 
    id: 'places', 
    label: 'Places', 
    icon: Home, 
    description: 'Locations that trigger urges',
    examples: ['Bars', 'Old neighborhood', 'Work happy hour', 'Casino']
  },
  { 
    id: 'things', 
    label: 'Things', 
    icon: Target, 
    description: 'Objects or substances that trigger cravings',
    examples: ['Alcohol bottles', 'Drug paraphernalia', 'Cigarettes', 'Prescription bottles']
  },
  { 
    id: 'emotions', 
    label: 'Emotions', 
    icon: Brain, 
    description: 'Feelings that lead to substance use',
    examples: ['Stress', 'Loneliness', 'Anger', 'Boredom', 'Depression', 'Anxiety']
  },
  { 
    id: 'times', 
    label: 'Times', 
    icon: Calendar, 
    description: 'Specific times when cravings are strongest',
    examples: ['After work', 'Weekends', 'Holidays', 'Anniversary dates', '5 PM']
  },
  { 
    id: 'thoughts', 
    label: 'Thoughts', 
    icon: AlertTriangle, 
    description: 'Thinking patterns that lead to relapse',
    examples: ['Just one won\'t hurt', 'I deserve this', 'Life is too hard', 'I\'ll never get better']
  }
]

const commonCopingStrategies = [
  'Call sponsor/therapist',
  'Go to a meeting',
  'Use breathing exercises', 
  'Exercise or go for a walk',
  'Listen to music',
  'Journal or write',
  'Take a shower',
  'Eat something healthy',
  'Text a friend',
  'Use the HALT check',
  'Practice mindfulness',
  'Review my why for recovery',
  'Go somewhere safe',
  'Use grounding techniques',
  'Read recovery literature',
  'Do a puzzle or hobby'
]

export default function TriggerMapPage() {
  const [triggerMap, setTriggerMap] = useState<TriggerMap | null>(null)
  const [activeCategory, setActiveCategory] = useState<string>('people')
  const [newTrigger, setNewTrigger] = useState<Partial<Trigger>>({
    name: '',
    category: 'people',
    intensity: 5,
    copingStrategies: [],
    avoidable: false,
    notes: ''
  })
  const [editingTrigger, setEditingTrigger] = useState<string | null>(null)
  const [emergencyPlan, setEmergencyPlan] = useState('')

  // Load trigger map from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('triggerMap')
    if (saved) {
      const map = JSON.parse(saved)
      setTriggerMap(map)
      setEmergencyPlan(map.emergencyPlan || '')
    } else {
      // Create new trigger map
      const newMap: TriggerMap = {
        id: Date.now().toString(),
        date: new Date().toISOString(),
        triggers: [],
        emergencyPlan: '',
        lastUpdated: new Date().toISOString()
      }
      setTriggerMap(newMap)
    }
  }, [])

  // Save to localStorage
  useEffect(() => {
    if (triggerMap) {
      const updatedMap = {
        ...triggerMap,
        emergencyPlan,
        lastUpdated: new Date().toISOString()
      }
      localStorage.setItem('triggerMap', JSON.stringify(updatedMap))
    }
  }, [triggerMap, emergencyPlan])

  const addTrigger = () => {
    if (!newTrigger.name || !triggerMap) return

    const trigger: Trigger = {
      id: Date.now().toString(),
      name: newTrigger.name,
      category: newTrigger.category as any || 'people',
      intensity: newTrigger.intensity || 5,
      copingStrategies: newTrigger.copingStrategies || [],
      avoidable: newTrigger.avoidable || false,
      notes: newTrigger.notes || ''
    }

    setTriggerMap({
      ...triggerMap,
      triggers: [...triggerMap.triggers, trigger]
    })

    // Reset form
    setNewTrigger({
      name: '',
      category: activeCategory as any,
      intensity: 5,
      copingStrategies: [],
      avoidable: false,
      notes: ''
    })
  }

  const deleteTrigger = (triggerId: string) => {
    if (!triggerMap) return
    
    setTriggerMap({
      ...triggerMap,
      triggers: triggerMap.triggers.filter(t => t.id !== triggerId)
    })
  }

  const updateTrigger = (triggerId: string, updates: Partial<Trigger>) => {
    if (!triggerMap) return

    setTriggerMap({
      ...triggerMap,
      triggers: triggerMap.triggers.map(t => 
        t.id === triggerId ? { ...t, ...updates } : t
      )
    })
  }

  const toggleCopingStrategy = (strategy: string) => {
    const current = newTrigger.copingStrategies || []
    setNewTrigger({
      ...newTrigger,
      copingStrategies: current.includes(strategy)
        ? current.filter(s => s !== strategy)
        : [...current, strategy]
    })
  }

  const updateTriggerCoping = (triggerId: string, strategy: string) => {
    const trigger = triggerMap?.triggers.find(t => t.id === triggerId)
    if (!trigger) return

    const updated = trigger.copingStrategies.includes(strategy)
      ? trigger.copingStrategies.filter(s => s !== strategy)
      : [...trigger.copingStrategies, strategy]

    updateTrigger(triggerId, { copingStrategies: updated })
  }

  const exportTriggerMap = () => {
    if (!triggerMap) return

    const exportData = {
      ...triggerMap,
      exportDate: new Date().toISOString()
    }

    const dataStr = JSON.stringify(exportData, null, 2)
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr)
    
    const exportFileDefaultName = `trigger-map-${new Date().toISOString().split('T')[0]}.json`
    
    const linkElement = document.createElement('a')
    linkElement.setAttribute('href', dataUri)
    linkElement.setAttribute('download', exportFileDefaultName)
    linkElement.click()
  }

  const getRiskLevel = (intensity: number) => {
    if (intensity >= 8) return { level: 'HIGH', color: 'text-red-600 bg-red-50', border: 'border-red-200' }
    if (intensity >= 5) return { level: 'MEDIUM', color: 'text-yellow-600 bg-yellow-50', border: 'border-yellow-200' }
    return { level: 'LOW', color: 'text-green-600 bg-green-50', border: 'border-green-200' }
  }

  const currentCategory = triggerCategories.find(c => c.id === activeCategory)
  const triggersInCategory = triggerMap?.triggers.filter(t => t.category === activeCategory) || []
  const totalTriggers = triggerMap?.triggers.length || 0
  const highRiskTriggers = triggerMap?.triggers.filter(t => t.intensity >= 8).length || 0

  return (
    <div className="container max-w-6xl py-10">
      {/* Header */}
      <div className="mb-8">
        <Link href="/resources/cbt" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-4">
          <ChevronLeft className="mr-1 h-4 w-4" />
          Back to CBT Resources
        </Link>
        <h1 className="text-4xl font-bold mb-4 flex items-center gap-2">
          <MapPin className="h-8 w-8 text-primary" />
          Trigger Mapping Tool
        </h1>
        <p className="text-xl text-muted-foreground">
          Identify your personal triggers and create coping strategies for each one
        </p>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-3 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Total Triggers</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <Target className="h-5 w-5 text-primary" />
              <span className="text-2xl font-bold">{totalTriggers}</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>High Risk Triggers</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-red-500" />
              <span className="text-2xl font-bold text-red-600">{highRiskTriggers}</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Last Updated</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <Save className="h-5 w-5 text-green-500" />
              <span className="text-sm">
                {triggerMap ? new Date(triggerMap.lastUpdated).toLocaleDateString() : 'Never'}
              </span>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Category Selection */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Trigger Categories</CardTitle>
              <CardDescription>Select a category to add triggers</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              {triggerCategories.map((category) => {
                const Icon = category.icon
                const count = triggerMap?.triggers.filter(t => t.category === category.id).length || 0
                return (
                  <button
                    key={category.id}
                    className={`w-full p-3 text-left rounded-lg border-2 transition-all ${
                      activeCategory === category.id
                        ? 'border-primary bg-primary/5'
                        : 'border-muted hover:border-primary/50'
                    }`}
                    onClick={() => setActiveCategory(category.id)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Icon className="h-5 w-5 text-primary" />
                        <div>
                          <p className="font-medium">{category.label}</p>
                          <p className="text-xs text-muted-foreground">{count} triggers</p>
                        </div>
                      </div>
                      {count > 0 && (
                        <Badge variant="secondary">{count}</Badge>
                      )}
                    </div>
                  </button>
                )
              })}
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-2">
          <Tabs defaultValue="triggers" className="space-y-6">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="triggers">Manage Triggers</TabsTrigger>
              <TabsTrigger value="emergency">Emergency Plan</TabsTrigger>
            </TabsList>

            <TabsContent value="triggers">
              {/* Add New Trigger */}
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    {currentCategory && <currentCategory.icon className="h-5 w-5" />}
                    Add {currentCategory?.label} Trigger
                  </CardTitle>
                  <CardDescription>{currentCategory?.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="triggerName">Trigger Name *</Label>
                    <Input
                      id="triggerName"
                      placeholder={`e.g., ${currentCategory?.examples[0]}`}
                      value={newTrigger.name}
                      onChange={(e) => setNewTrigger({...newTrigger, name: e.target.value})}
                    />
                  </div>

                  <div>
                    <Label>Risk Intensity (1-10)</Label>
                    <div className="flex items-center gap-4 mt-2">
                      <input
                        type="range"
                        min="1"
                        max="10"
                        value={newTrigger.intensity}
                        onChange={(e) => setNewTrigger({...newTrigger, intensity: parseInt(e.target.value)})}
                        className="flex-1"
                      />
                      <div className="flex items-center gap-2">
                        <span className="text-2xl font-bold w-6">{newTrigger.intensity}</span>
                        <Badge className={getRiskLevel(newTrigger.intensity || 5).color}>
                          {getRiskLevel(newTrigger.intensity || 5).level}
                        </Badge>
                      </div>
                    </div>
                  </div>

                  <div>
                    <Label>Coping Strategies</Label>
                    <p className="text-sm text-muted-foreground mb-2">Select strategies you can use when facing this trigger</p>
                    <div className="grid grid-cols-2 gap-2 max-h-40 overflow-y-auto">
                      {commonCopingStrategies.map((strategy) => (
                        <button
                          key={strategy}
                          className={`p-2 text-xs text-left rounded border transition-colors ${
                            newTrigger.copingStrategies?.includes(strategy)
                              ? 'bg-primary/10 border-primary'
                              : 'border-muted hover:bg-muted'
                          }`}
                          onClick={() => toggleCopingStrategy(strategy)}
                        >
                          {strategy}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={newTrigger.avoidable}
                        onChange={(e) => setNewTrigger({...newTrigger, avoidable: e.target.checked})}
                      />
                      <span className="text-sm">This trigger can be avoided</span>
                    </label>
                  </div>

                  <div>
                    <Label htmlFor="notes">Additional Notes</Label>
                    <Textarea
                      id="notes"
                      placeholder="Any additional details about this trigger..."
                      value={newTrigger.notes}
                      onChange={(e) => setNewTrigger({...newTrigger, notes: e.target.value})}
                      rows={2}
                    />
                  </div>

                  <Button onClick={addTrigger} disabled={!newTrigger.name} className="w-full">
                    <Plus className="mr-2 h-4 w-4" />
                    Add Trigger
                  </Button>
                </CardContent>
              </Card>

              {/* Current Triggers */}
              <Card>
                <CardHeader>
                  <CardTitle>
                    {currentCategory?.label} Triggers ({triggersInCategory.length})
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {triggersInCategory.length === 0 ? (
                    <div className="text-center py-8 text-muted-foreground">
                      <Target className="h-12 w-12 mx-auto mb-4 opacity-50" />
                      <p>No {currentCategory?.label.toLowerCase()} triggers added yet</p>
                      <p className="text-sm">Add your first trigger above</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {triggersInCategory.map((trigger) => {
                        const risk = getRiskLevel(trigger.intensity)
                        return (
                          <div key={trigger.id} className={`p-4 border-2 rounded-lg ${risk.border}`}>
                            <div className="flex items-start justify-between mb-3">
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                  <h3 className="font-semibold">{trigger.name}</h3>
                                  <Badge className={risk.color}>{risk.level}</Badge>
                                  {trigger.avoidable && (
                                    <Badge variant="outline" className="text-green-600">
                                      <Shield className="h-3 w-3 mr-1" />
                                      Avoidable
                                    </Badge>
                                  )}
                                </div>
                                <p className="text-sm text-muted-foreground">
                                  Intensity: {trigger.intensity}/10
                                </p>
                              </div>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => deleteTrigger(trigger.id)}
                              >
                                <X className="h-4 w-4" />
                              </Button>
                            </div>

                            {trigger.notes && (
                              <p className="text-sm mb-3 italic">{trigger.notes}</p>
                            )}

                            <div>
                              <p className="text-sm font-medium mb-2">Coping Strategies:</p>
                              <div className="flex flex-wrap gap-1">
                                {trigger.copingStrategies.map((strategy) => (
                                  <Badge key={strategy} variant="secondary" className="text-xs">
                                    {strategy}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="emergency">
              <Card>
                <CardHeader>
                  <CardTitle>Emergency Action Plan</CardTitle>
                  <CardDescription>
                    Create a step-by-step plan for when you're experiencing intense cravings
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Textarea
                    placeholder="My Emergency Plan:

1. STOP - Pause and breathe deeply
2. Call my sponsor: [phone number]
3. If no answer, call backup support: [phone number]
4. Use grounding technique: 5 things I see, 4 I hear, 3 I feel, 2 I smell, 1 I taste
5. Go to safe location: [specific place]
6. Review my reasons for recovery
7. If still struggling, go to emergency meeting or call crisis line

Crisis Numbers:
- National Suicide Prevention: 988
- Crisis Text Line: Text HOME to 741741
- Local support: [your number]

Remember: Cravings are temporary. This feeling will pass."
                    value={emergencyPlan}
                    onChange={(e) => setEmergencyPlan(e.target.value)}
                    rows={15}
                    className="font-mono text-sm"
                  />
                  
                  <div className="flex gap-4">
                    <Button onClick={exportTriggerMap}>
                      <Download className="mr-2 h-4 w-4" />
                      Export Trigger Map
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* Tips */}
      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Tips for Effective Trigger Mapping</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>• Be completely honest - no one else will see this unless you share it</li>
            <li>• Start with obvious triggers, then dig deeper into subtle ones</li>
            <li>• Update your map regularly as you discover new triggers</li>
            <li>• Practice your coping strategies before you need them</li>
            <li>• Share your emergency plan with trusted supporters</li>
            <li>• Remember: identifying triggers is progress, not failure</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}