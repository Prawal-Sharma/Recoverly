'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Progress } from '@/components/ui/progress'
import { 
  FileText, Target, Users, Shield, Calendar, 
  Download, Save, Plus, X, Edit, CheckCircle2,
  AlertCircle, Heart, Phone, Home, Zap
} from 'lucide-react'
import Link from 'next/link'

interface RecoveryPlan {
  id: string
  createdDate: string
  lastUpdated: string
  personalInfo: {
    name: string
    recoveryDate: string
    substance: string
    motivation: string
  }
  goals: {
    shortTerm: string[]
    longTerm: string[]
    values: string[]
  }
  supportNetwork: {
    sponsor: { name: string; phone: string }
    therapist: { name: string; phone: string }
    friends: { name: string; phone: string; relationship: string }[]
    family: { name: string; phone: string; relationship: string }[]
    groups: string[]
  }
  triggers: {
    people: string[]
    places: string[]
    emotions: string[]
    situations: string[]
  }
  copingStrategies: {
    immediate: string[]
    longTerm: string[]
    emergency: string[]
  }
  dailyRoutine: {
    morning: string[]
    afternoon: string[]
    evening: string[]
  }
  emergencyPlan: string
  selfCareActivities: string[]
  completedSections: string[]
}

const defaultPlan: RecoveryPlan = {
  id: '',
  createdDate: '',
  lastUpdated: '',
  personalInfo: {
    name: '',
    recoveryDate: '',
    substance: '',
    motivation: ''
  },
  goals: {
    shortTerm: [],
    longTerm: [],
    values: []
  },
  supportNetwork: {
    sponsor: { name: '', phone: '' },
    therapist: { name: '', phone: '' },
    friends: [],
    family: [],
    groups: []
  },
  triggers: {
    people: [],
    places: [],
    emotions: [],
    situations: []
  },
  copingStrategies: {
    immediate: [],
    longTerm: [],
    emergency: []
  },
  dailyRoutine: {
    morning: [],
    afternoon: [],
    evening: []
  },
  emergencyPlan: '',
  selfCareActivities: [],
  completedSections: []
}

const planSections = [
  { id: 'personal', title: 'Personal Information', icon: FileText },
  { id: 'goals', title: 'Goals & Values', icon: Target },
  { id: 'support', title: 'Support Network', icon: Users },
  { id: 'triggers', title: 'Triggers & Risks', icon: AlertCircle },
  { id: 'coping', title: 'Coping Strategies', icon: Shield },
  { id: 'routine', title: 'Daily Routine', icon: Calendar },
  { id: 'emergency', title: 'Emergency Plan', icon: Phone },
  { id: 'selfcare', title: 'Self-Care', icon: Heart }
]

const commonValues = [
  'Family', 'Health', 'Freedom', 'Honesty', 'Growth', 'Peace',
  'Adventure', 'Creativity', 'Service', 'Independence', 'Love',
  'Achievement', 'Security', 'Fun', 'Spirituality', 'Learning'
]

const commonCopingStrategies = [
  'Call sponsor/friend', 'Go to a meeting', 'Exercise/walk', 'Meditate',
  'Journal', 'Listen to music', 'Take a shower', 'Eat healthy food',
  'Use breathing exercises', 'Practice gratitude', 'Read recovery literature',
  'Clean/organize', 'Do a hobby', 'Help someone else', 'Pray',
  'Use grounding techniques'
]

const commonSelfCareActivities = [
  'Regular sleep schedule', 'Healthy meals', 'Exercise', 'Meditation',
  'Time in nature', 'Reading', 'Creative activities', 'Social connection',
  'Hobbies', 'Professional development', 'Relaxation', 'Spiritual practice'
]

export default function RecoveryPlanPage() {
  const [plan, setPlan] = useState<RecoveryPlan>(defaultPlan)
  const [activeTab, setActiveTab] = useState('personal')
  const [isEditing, setIsEditing] = useState(true)
  const [newItem, setNewItem] = useState('')
  const [showPreview, setShowPreview] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem('recoveryPlan')
    if (saved) {
      const savedPlan = JSON.parse(saved)
      setPlan(savedPlan)
      setIsEditing(false)
    } else {
      const newPlan = {
        ...defaultPlan,
        id: Date.now().toString(),
        createdDate: new Date().toISOString(),
        lastUpdated: new Date().toISOString()
      }
      setPlan(newPlan)
    }
  }, [])

  const savePlan = () => {
    const updatedPlan = {
      ...plan,
      lastUpdated: new Date().toISOString()
    }
    setPlan(updatedPlan)
    localStorage.setItem('recoveryPlan', JSON.stringify(updatedPlan))
    setIsEditing(false)
  }

  const updatePlan = (section: string, field: string, value: any) => {
    setPlan(prev => ({
      ...prev,
      [section]: {
        ...prev[section as keyof RecoveryPlan] as any,
        [field]: value
      }
    }))
  }

  const addArrayItem = (section: string, field: string, item: string) => {
    if (!item.trim()) return
    
    setPlan(prev => {
      const currentSection = prev[section as keyof RecoveryPlan] as any
      const currentArray = currentSection[field] || []
      return {
        ...prev,
        [section]: {
          ...currentSection,
          [field]: [...currentArray, item.trim()]
        }
      }
    })
    setNewItem('')
  }

  const removeArrayItem = (section: string, field: string, index: number) => {
    setPlan(prev => {
      const currentSection = prev[section as keyof RecoveryPlan] as any
      const currentArray = currentSection[field] || []
      return {
        ...prev,
        [section]: {
          ...currentSection,
          [field]: currentArray.filter((_: any, i: number) => i !== index)
        }
      }
    })
  }

  const addSupportPerson = (type: 'friends' | 'family', name: string, phone: string, relationship: string) => {
    if (!name.trim()) return
    
    setPlan(prev => ({
      ...prev,
      supportNetwork: {
        ...prev.supportNetwork,
        [type]: [...prev.supportNetwork[type], { name: name.trim(), phone: phone.trim(), relationship: relationship.trim() }]
      }
    }))
  }

  const exportPlan = () => {
    const exportData = {
      ...plan,
      exportDate: new Date().toISOString()
    }
    
    const dataStr = JSON.stringify(exportData, null, 2)
    const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr)
    
    const exportFileDefaultName = `recovery-plan-${new Date().toISOString().split('T')[0]}.json`
    
    const linkElement = document.createElement('a')
    linkElement.setAttribute('href', dataUri)
    linkElement.setAttribute('download', exportFileDefaultName)
    linkElement.click()
  }

  const getCompletionPercentage = () => {
    let completed = 0
    let total = 8 // number of sections
    
    // Check each section for completion
    if (plan.personalInfo.name && plan.personalInfo.motivation) completed++
    if (plan.goals.shortTerm.length > 0 || plan.goals.longTerm.length > 0) completed++
    if (plan.supportNetwork.sponsor.name || plan.supportNetwork.friends.length > 0) completed++
    if (plan.triggers.people.length > 0 || plan.triggers.emotions.length > 0) completed++
    if (plan.copingStrategies.immediate.length > 0) completed++
    if (plan.dailyRoutine.morning.length > 0 || plan.dailyRoutine.evening.length > 0) completed++
    if (plan.emergencyPlan.trim()) completed++
    if (plan.selfCareActivities.length > 0) completed++
    
    return Math.round((completed / total) * 100)
  }

  return (
    <div className="container max-w-6xl py-10">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4 flex items-center gap-2">
          <FileText className="h-8 w-8 text-primary" />
          Recovery Plan Builder
        </h1>
        <p className="text-xl text-muted-foreground">
          Build your personalized roadmap for lasting recovery. Create a plan that works with your unique needs and goals.
        </p>
      </div>

      {/* Progress and Actions */}
      <div className="grid gap-4 md:grid-cols-3 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Plan Completion</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-2xl font-bold">{getCompletionPercentage()}%</span>
                <CheckCircle2 className="h-5 w-5 text-green-500" />
              </div>
              <Progress value={getCompletionPercentage()} className="h-2" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Last Updated</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <Save className="h-5 w-5 text-blue-500" />
              <span className="text-sm">
                {plan.lastUpdated ? new Date(plan.lastUpdated).toLocaleDateString() : 'Not saved'}
              </span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex gap-2">
              <Button onClick={savePlan} size="sm">
                <Save className="mr-2 h-4 w-4" />
                Save Plan
              </Button>
              <Button onClick={exportPlan} variant="outline" size="sm">
                <Download className="mr-2 h-4 w-4" />
                Export
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-4">
        {/* Section Navigation */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Plan Sections</CardTitle>
            </CardHeader>
            <CardContent className="space-y-1">
              {planSections.map((section) => {
                const Icon = section.icon
                const isActive = activeTab === section.id
                return (
                  <button
                    key={section.id}
                    className={`w-full p-3 text-left rounded-lg transition-colors ${
                      isActive
                        ? 'bg-primary text-primary-foreground'
                        : 'hover:bg-muted'
                    }`}
                    onClick={() => setActiveTab(section.id)}
                  >
                    <div className="flex items-center gap-2">
                      <Icon className="h-4 w-4" />
                      <span className="text-sm font-medium">{section.title}</span>
                    </div>
                  </button>
                )
              })}
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            {/* Personal Information */}
            <TabsContent value="personal">
              <Card>
                <CardHeader>
                  <CardTitle>Personal Information</CardTitle>
                  <CardDescription>Basic information about your recovery journey</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <Label htmlFor="name">Your Name</Label>
                      <Input
                        id="name"
                        value={plan.personalInfo.name}
                        onChange={(e) => updatePlan('personalInfo', 'name', e.target.value)}
                        placeholder="Enter your name"
                      />
                    </div>
                    <div>
                      <Label htmlFor="recoveryDate">Recovery Start Date</Label>
                      <Input
                        id="recoveryDate"
                        type="date"
                        value={plan.personalInfo.recoveryDate}
                        onChange={(e) => updatePlan('personalInfo', 'recoveryDate', e.target.value)}
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="substance">Primary Substance/Behavior</Label>
                    <Input
                      id="substance"
                      value={plan.personalInfo.substance}
                      onChange={(e) => updatePlan('personalInfo', 'substance', e.target.value)}
                      placeholder="e.g., Alcohol, Cocaine, Gambling"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="motivation">Why I Want Recovery</Label>
                    <Textarea
                      id="motivation"
                      value={plan.personalInfo.motivation}
                      onChange={(e) => updatePlan('personalInfo', 'motivation', e.target.value)}
                      placeholder="Describe your motivation for recovery..."
                      rows={4}
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Goals & Values */}
            <TabsContent value="goals">
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Recovery Goals</CardTitle>
                    <CardDescription>Set short-term and long-term goals</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label>Short-term Goals (30-90 days)</Label>
                      <div className="flex gap-2 mt-2">
                        <Input
                          value={newItem}
                          onChange={(e) => setNewItem(e.target.value)}
                          placeholder="Add a short-term goal"
                          onKeyPress={(e) => {
                            if (e.key === 'Enter') {
                              addArrayItem('goals', 'shortTerm', newItem)
                            }
                          }}
                        />
                        <Button onClick={() => addArrayItem('goals', 'shortTerm', newItem)}>
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {plan.goals.shortTerm.map((goal, index) => (
                          <Badge key={index} variant="secondary" className="gap-1">
                            {goal}
                            <button onClick={() => removeArrayItem('goals', 'shortTerm', index)}>
                              <X className="h-3 w-3" />
                            </button>
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div>
                      <Label>Long-term Goals (6+ months)</Label>
                      <div className="flex gap-2 mt-2">
                        <Input
                          value={newItem}
                          onChange={(e) => setNewItem(e.target.value)}
                          placeholder="Add a long-term goal"
                          onKeyPress={(e) => {
                            if (e.key === 'Enter') {
                              addArrayItem('goals', 'longTerm', newItem)
                            }
                          }}
                        />
                        <Button onClick={() => addArrayItem('goals', 'longTerm', newItem)}>
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {plan.goals.longTerm.map((goal, index) => (
                          <Badge key={index} variant="secondary" className="gap-1">
                            {goal}
                            <button onClick={() => removeArrayItem('goals', 'longTerm', index)}>
                              <X className="h-3 w-3" />
                            </button>
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Core Values</CardTitle>
                    <CardDescription>What matters most to you in life?</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-2 md:grid-cols-4 mb-4">
                      {commonValues.map((value) => (
                        <button
                          key={value}
                          className={`p-2 text-sm rounded border transition-colors ${
                            plan.goals.values.includes(value)
                              ? 'bg-primary text-primary-foreground'
                              : 'hover:bg-muted'
                          }`}
                          onClick={() => {
                            if (plan.goals.values.includes(value)) {
                              const index = plan.goals.values.indexOf(value)
                              removeArrayItem('goals', 'values', index)
                            } else {
                              addArrayItem('goals', 'values', value)
                            }
                          }}
                        >
                          {value}
                        </button>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      <Input
                        value={newItem}
                        onChange={(e) => setNewItem(e.target.value)}
                        placeholder="Add custom value"
                        onKeyPress={(e) => {
                          if (e.key === 'Enter') {
                            addArrayItem('goals', 'values', newItem)
                          }
                        }}
                      />
                      <Button onClick={() => addArrayItem('goals', 'values', newItem)}>
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Support Network */}
            <TabsContent value="support">
              <Card>
                <CardHeader>
                  <CardTitle>Support Network</CardTitle>
                  <CardDescription>People and groups who support your recovery</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <Label>Sponsor/Mentor</Label>
                      <div className="space-y-2 mt-2">
                        <Input
                          value={plan.supportNetwork.sponsor.name}
                          onChange={(e) => updatePlan('supportNetwork', 'sponsor', { ...plan.supportNetwork.sponsor, name: e.target.value })}
                          placeholder="Sponsor name"
                        />
                        <Input
                          value={plan.supportNetwork.sponsor.phone}
                          onChange={(e) => updatePlan('supportNetwork', 'sponsor', { ...plan.supportNetwork.sponsor, phone: e.target.value })}
                          placeholder="Phone number"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <Label>Therapist/Counselor</Label>
                      <div className="space-y-2 mt-2">
                        <Input
                          value={plan.supportNetwork.therapist.name}
                          onChange={(e) => updatePlan('supportNetwork', 'therapist', { ...plan.supportNetwork.therapist, name: e.target.value })}
                          placeholder="Therapist name"
                        />
                        <Input
                          value={plan.supportNetwork.therapist.phone}
                          onChange={(e) => updatePlan('supportNetwork', 'therapist', { ...plan.supportNetwork.therapist, phone: e.target.value })}
                          placeholder="Phone number"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <Label>Support Groups</Label>
                    <div className="flex gap-2 mt-2">
                      <Input
                        value={newItem}
                        onChange={(e) => setNewItem(e.target.value)}
                        placeholder="Add support group (e.g., AA, SMART Recovery)"
                        onKeyPress={(e) => {
                          if (e.key === 'Enter') {
                            addArrayItem('supportNetwork', 'groups', newItem)
                          }
                        }}
                      />
                      <Button onClick={() => addArrayItem('supportNetwork', 'groups', newItem)}>
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {plan.supportNetwork.groups.map((group, index) => (
                        <Badge key={index} variant="outline" className="gap-1">
                          {group}
                          <button onClick={() => removeArrayItem('supportNetwork', 'groups', index)}>
                            <X className="h-3 w-3" />
                          </button>
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Triggers & Risks */}
            <TabsContent value="triggers">
              <Card>
                <CardHeader>
                  <CardTitle>Triggers & High-Risk Situations</CardTitle>
                  <CardDescription>Identify what might threaten your recovery</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {[
                    { key: 'people', label: 'High-Risk People', placeholder: 'e.g., Old drinking buddies' },
                    { key: 'places', label: 'High-Risk Places', placeholder: 'e.g., Bars, old neighborhood' },
                    { key: 'emotions', label: 'Triggering Emotions', placeholder: 'e.g., Stress, loneliness, anger' },
                    { key: 'situations', label: 'High-Risk Situations', placeholder: 'e.g., Work stress, family gatherings' }
                  ].map((trigger) => (
                    <div key={trigger.key}>
                      <Label>{trigger.label}</Label>
                      <div className="flex gap-2 mt-2">
                        <Input
                          value={newItem}
                          onChange={(e) => setNewItem(e.target.value)}
                          placeholder={trigger.placeholder}
                          onKeyPress={(e) => {
                            if (e.key === 'Enter') {
                              addArrayItem('triggers', trigger.key, newItem)
                            }
                          }}
                        />
                        <Button onClick={() => addArrayItem('triggers', trigger.key, newItem)}>
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {(plan.triggers[trigger.key as keyof typeof plan.triggers] as string[]).map((item, index) => (
                          <Badge key={index} variant="destructive" className="gap-1">
                            {item}
                            <button onClick={() => removeArrayItem('triggers', trigger.key, index)}>
                              <X className="h-3 w-3" />
                            </button>
                          </Badge>
                        ))}
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Coping Strategies */}
            <TabsContent value="coping">
              <Card>
                <CardHeader>
                  <CardTitle>Coping Strategies</CardTitle>
                  <CardDescription>Your toolkit for handling cravings and challenges</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <Label>Immediate Strategies (for cravings)</Label>
                    <div className="grid gap-2 md:grid-cols-3 mb-2 mt-2">
                      {commonCopingStrategies.slice(0, 9).map((strategy) => (
                        <button
                          key={strategy}
                          className={`p-2 text-xs text-left rounded border transition-colors ${
                            plan.copingStrategies.immediate.includes(strategy)
                              ? 'bg-primary text-primary-foreground'
                              : 'hover:bg-muted'
                          }`}
                          onClick={() => {
                            if (plan.copingStrategies.immediate.includes(strategy)) {
                              const index = plan.copingStrategies.immediate.indexOf(strategy)
                              removeArrayItem('copingStrategies', 'immediate', index)
                            } else {
                              addArrayItem('copingStrategies', 'immediate', strategy)
                            }
                          }}
                        >
                          {strategy}
                        </button>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      <Input
                        value={newItem}
                        onChange={(e) => setNewItem(e.target.value)}
                        placeholder="Add custom strategy"
                        onKeyPress={(e) => {
                          if (e.key === 'Enter') {
                            addArrayItem('copingStrategies', 'immediate', newItem)
                          }
                        }}
                      />
                      <Button onClick={() => addArrayItem('copingStrategies', 'immediate', newItem)}>
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  <div>
                    <Label>Emergency Plan</Label>
                    <Textarea
                      value={plan.emergencyPlan}
                      onChange={(e) => updatePlan('', 'emergencyPlan', e.target.value)}
                      placeholder="What will you do if you have intense cravings or are close to relapse?&#10;&#10;1. Call [name] at [number]&#10;2. Go to [safe place]&#10;3. Use [specific technique]&#10;4. If still struggling, [backup plan]"
                      rows={6}
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Daily Routine */}
            <TabsContent value="routine">
              <Card>
                <CardHeader>
                  <CardTitle>Daily Recovery Routine</CardTitle>
                  <CardDescription>Structure your day to support recovery</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {[
                    { key: 'morning', label: 'Morning Routine', placeholder: 'e.g., Meditation, exercise, healthy breakfast' },
                    { key: 'afternoon', label: 'Afternoon Activities', placeholder: 'e.g., Work, hobbies, social activities' },
                    { key: 'evening', label: 'Evening Routine', placeholder: 'e.g., Journal, reading, early bedtime' }
                  ].map((routine) => (
                    <div key={routine.key}>
                      <Label>{routine.label}</Label>
                      <div className="flex gap-2 mt-2">
                        <Input
                          value={newItem}
                          onChange={(e) => setNewItem(e.target.value)}
                          placeholder={routine.placeholder}
                          onKeyPress={(e) => {
                            if (e.key === 'Enter') {
                              addArrayItem('dailyRoutine', routine.key, newItem)
                            }
                          }}
                        />
                        <Button onClick={() => addArrayItem('dailyRoutine', routine.key, newItem)}>
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {(plan.dailyRoutine[routine.key as keyof typeof plan.dailyRoutine] as string[]).map((item, index) => (
                          <Badge key={index} variant="outline" className="gap-1">
                            {item}
                            <button onClick={() => removeArrayItem('dailyRoutine', routine.key, index)}>
                              <X className="h-3 w-3" />
                            </button>
                          </Badge>
                        ))}
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Emergency Plan */}
            <TabsContent value="emergency">
              <Card>
                <CardHeader>
                  <CardTitle>Crisis & Emergency Plan</CardTitle>
                  <CardDescription>Your step-by-step plan for crisis situations</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Textarea
                    value={plan.emergencyPlan}
                    onChange={(e) => updatePlan('', 'emergencyPlan', e.target.value)}
                    placeholder="My Emergency Action Plan:&#10;&#10;1. STOP - Pause and breathe&#10;2. Call my sponsor: [phone number]&#10;3. If no answer, call: [backup number]&#10;4. Go to safe location: [specific place]&#10;5. Use coping skill: [specific technique]&#10;6. If still struggling: [next step]&#10;&#10;Crisis Numbers:&#10;- National Suicide Prevention: 988&#10;- Crisis Text Line: Text HOME to 741741&#10;- Local emergency: [your number]"
                    rows={15}
                    className="font-mono text-sm"
                  />
                  
                  <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                    <h3 className="font-semibold text-red-800 mb-2">Emergency Contacts</h3>
                    <div className="grid gap-2 text-sm">
                      <div>National Suicide Prevention Lifeline: <strong>Call or text 988</strong></div>
                      <div>Crisis Text Line: <strong>Text HOME to 741741</strong></div>
                      <div>SAMHSA National Helpline: <strong>1-800-662-4357</strong></div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Self-Care */}
            <TabsContent value="selfcare">
              <Card>
                <CardHeader>
                  <CardTitle>Self-Care Activities</CardTitle>
                  <CardDescription>Activities that nurture your wellbeing</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-2 md:grid-cols-3 mb-4">
                    {commonSelfCareActivities.map((activity) => (
                      <button
                        key={activity}
                        className={`p-2 text-sm text-left rounded border transition-colors ${
                          plan.selfCareActivities.includes(activity)
                            ? 'bg-primary text-primary-foreground'
                            : 'hover:bg-muted'
                        }`}
                        onClick={() => {
                          if (plan.selfCareActivities.includes(activity)) {
                            const index = plan.selfCareActivities.indexOf(activity)
                            removeArrayItem('', 'selfCareActivities', index)
                          } else {
                            addArrayItem('', 'selfCareActivities', activity)
                          }
                        }}
                      >
                        {activity}
                      </button>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <Input
                      value={newItem}
                      onChange={(e) => setNewItem(e.target.value)}
                      placeholder="Add custom self-care activity"
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          addArrayItem('', 'selfCareActivities', newItem)
                        }
                      }}
                    />
                    <Button onClick={() => addArrayItem('', 'selfCareActivities', newItem)}>
                      <Plus className="h-4 w-4" />
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
          <CardTitle>Recovery Plan Tips</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>• Update your plan regularly as you learn and grow in recovery</li>
            <li>• Share relevant parts of your plan with your support network</li>
            <li>• Keep a printed copy of your emergency plan easily accessible</li>
            <li>• Review your plan weekly to stay connected to your goals</li>
            <li>• Be specific and realistic - vague plans are less effective</li>
            <li>• Include phone numbers and addresses for quick access during crisis</li>
          </ul>
        </CardContent>
      </Card>

      {/* Related Tools */}
      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Related Tools to Support Your Plan</CardTitle>
          <CardDescription>These tools can help you implement and maintain your recovery plan</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card className="hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-center gap-3 mb-2">
                  <Target className="h-5 w-5 text-primary" />
                  <h4 className="font-semibold">Sobriety Tracker</h4>
                </div>
                <p className="text-sm text-muted-foreground mb-3">
                  Track your progress and celebrate milestones from your plan
                </p>
                <Button size="sm" variant="outline" asChild className="w-full">
                  <Link href="/tracker">Start Tracking</Link>
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
                  Daily reflection on your plan's goals and self-care activities
                </p>
                <Button size="sm" variant="outline" asChild className="w-full">
                  <Link href="/checkin">Daily Check-in</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-center gap-3 mb-2">
                  <AlertCircle className="h-5 w-5 text-primary" />
                  <h4 className="font-semibold">Trigger Mapper</h4>
                </div>
                <p className="text-sm text-muted-foreground mb-3">
                  Identify triggers and strategies to add to your plan
                </p>
                <Button size="sm" variant="outline" asChild className="w-full">
                  <Link href="/resources/cbt/trigger-map">Map Triggers</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-center gap-3 mb-2">
                  <Zap className="h-5 w-5 text-primary" />
                  <h4 className="font-semibold">TIPP Crisis Skills</h4>
                </div>
                <p className="text-sm text-muted-foreground mb-3">
                  Emergency techniques to add to your crisis action plan
                </p>
                <Button size="sm" variant="outline" asChild className="w-full">
                  <Link href="/resources/dbt/tipp">Learn TIPP</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-center gap-3 mb-2">
                  <Heart className="h-5 w-5 text-primary" />
                  <h4 className="font-semibold">Mindfulness Timer</h4>
                </div>
                <p className="text-sm text-muted-foreground mb-3">
                  Practice meditation as part of your daily routine
                </p>
                <Button size="sm" variant="outline" asChild className="w-full">
                  <Link href="/resources/mindfulness/meditation-timer">Start Meditating</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-center gap-3 mb-2">
                  <Phone className="h-5 w-5 text-primary" />
                  <h4 className="font-semibold">Crisis Resources</h4>
                </div>
                <p className="text-sm text-muted-foreground mb-3">
                  Emergency contacts and support for your crisis plan
                </p>
                <Button size="sm" variant="outline" asChild className="w-full">
                  <Link href="/resources/crisis">Crisis Support</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}