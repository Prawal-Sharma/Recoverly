'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  Calendar, ChevronLeft, Save, Download, TrendingUp, TrendingDown, 
  Heart, Brain, Shield, Sparkles, AlertCircle, Check, X 
} from 'lucide-react'
import Link from 'next/link'

interface DiaryCard {
  id: string
  date: string
  // Emotions (0-5 scale)
  emotions: {
    sad: number
    angry: number
    anxious: number
    happy: number
    shame: number
    excited: number
  }
  // Urges (0-5 scale)
  urges: {
    selfHarm: number
    substance: number
    binge: number
    quit: number
  }
  // DBT Skills Used
  skillsUsed: {
    mindfulness: string[]
    distressTolerance: string[]
    emotionRegulation: string[]
    interpersonal: string[]
  }
  // Actions
  actions: {
    selfHarm: boolean
    substance: boolean
    binge: boolean
    liedToSomeone: boolean
    avoidedSituation: boolean
  }
  // Other tracking
  sleepHours: number
  medication: boolean
  therapy: boolean
  gratitude: string
  notes: string
}

const emotionsList = [
  { id: 'sad', label: 'Sad', icon: '😢' },
  { id: 'angry', label: 'Angry', icon: '😠' },
  { id: 'anxious', label: 'Anxious', icon: '😰' },
  { id: 'happy', label: 'Happy', icon: '😊' },
  { id: 'shame', label: 'Shame', icon: '😔' },
  { id: 'excited', label: 'Excited', icon: '🤗' }
]

const urgesList = [
  { id: 'selfHarm', label: 'Self-Harm' },
  { id: 'substance', label: 'Substance Use' },
  { id: 'binge', label: 'Binge/Purge' },
  { id: 'quit', label: 'Quit Therapy' }
]

const actionsList = [
  { id: 'selfHarm', label: 'Self-harmed' },
  { id: 'substance', label: 'Used substances' },
  { id: 'binge', label: 'Binged/Purged' },
  { id: 'liedToSomeone', label: 'Lied to someone' },
  { id: 'avoidedSituation', label: 'Avoided a situation' }
]

const dbtSkills = {
  mindfulness: [
    'Wise Mind', 'Observe', 'Describe', 'Participate', 
    'Non-judgmental', 'One-mindfully', 'Effectively'
  ],
  distressTolerance: [
    'TIPP', 'Distraction', 'Self-soothe', 'IMPROVE', 
    'Pros and Cons', 'Radical Acceptance', 'Distract with ACCEPTS'
  ],
  emotionRegulation: [
    'PLEASE', 'Opposite Action', 'Check the Facts', 'Problem Solving',
    'Accumulate Positives', 'Build Mastery', 'Cope Ahead'
  ],
  interpersonal: [
    'DEARMAN', 'GIVE', 'FAST', 'Validation', 
    'Boundaries', 'Self-respect', 'Relationship Effectiveness'
  ]
}

export default function DiaryCardPage() {
  const [cards, setCards] = useState<DiaryCard[]>([])
  const [currentCard, setCurrentCard] = useState<Partial<DiaryCard>>({
    date: new Date().toISOString().split('T')[0],
    emotions: { sad: 0, angry: 0, anxious: 0, happy: 0, shame: 0, excited: 0 },
    urges: { selfHarm: 0, substance: 0, binge: 0, quit: 0 },
    skillsUsed: { mindfulness: [], distressTolerance: [], emotionRegulation: [], interpersonal: [] },
    actions: { selfHarm: false, substance: false, binge: false, liedToSomeone: false, avoidedSituation: false },
    sleepHours: 7,
    medication: false,
    therapy: false,
    gratitude: '',
    notes: ''
  })
  const [viewMode, setViewMode] = useState<'today' | 'history'>('today')

  // Load cards from localStorage
  useEffect(() => {
    const savedCards = localStorage.getItem('dbtDiaryCards')
    if (savedCards) {
      setCards(JSON.parse(savedCards))
    }
  }, [])

  // Save cards to localStorage
  useEffect(() => {
    if (cards.length > 0) {
      localStorage.setItem('dbtDiaryCards', JSON.stringify(cards))
    }
  }, [cards])

  const handleSave = () => {
    const newCard: DiaryCard = {
      id: Date.now().toString(),
      date: currentCard.date || new Date().toISOString().split('T')[0],
      emotions: currentCard.emotions || { sad: 0, angry: 0, anxious: 0, happy: 0, shame: 0, excited: 0 },
      urges: currentCard.urges || { selfHarm: 0, substance: 0, binge: 0, quit: 0 },
      skillsUsed: currentCard.skillsUsed || { mindfulness: [], distressTolerance: [], emotionRegulation: [], interpersonal: [] },
      actions: currentCard.actions || { selfHarm: false, substance: false, binge: false, liedToSomeone: false, avoidedSituation: false },
      sleepHours: currentCard.sleepHours || 0,
      medication: currentCard.medication || false,
      therapy: currentCard.therapy || false,
      gratitude: currentCard.gratitude || '',
      notes: currentCard.notes || ''
    }

    setCards([newCard, ...cards])
    
    // Reset form for next day
    setCurrentCard({
      date: new Date().toISOString().split('T')[0],
      emotions: { sad: 0, angry: 0, anxious: 0, happy: 0, shame: 0, excited: 0 },
      urges: { selfHarm: 0, substance: 0, binge: 0, quit: 0 },
      skillsUsed: { mindfulness: [], distressTolerance: [], emotionRegulation: [], interpersonal: [] },
      actions: { selfHarm: false, substance: false, binge: false, liedToSomeone: false, avoidedSituation: false },
      sleepHours: 7,
      medication: false,
      therapy: false,
      gratitude: '',
      notes: ''
    })
    
    alert('Diary card saved successfully!')
  }

  const handleExport = () => {
    const dataStr = JSON.stringify(cards, null, 2)
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr)
    
    const exportFileDefaultName = `dbt-diary-cards-${new Date().toISOString().split('T')[0]}.json`
    
    const linkElement = document.createElement('a')
    linkElement.setAttribute('href', dataUri)
    linkElement.setAttribute('download', exportFileDefaultName)
    linkElement.click()
  }

  const toggleSkill = (category: keyof typeof dbtSkills, skill: string) => {
    setCurrentCard(prev => ({
      ...prev,
      skillsUsed: {
        ...prev.skillsUsed!,
        [category]: prev.skillsUsed![category].includes(skill)
          ? prev.skillsUsed![category].filter(s => s !== skill)
          : [...prev.skillsUsed![category], skill]
      }
    }))
  }

  return (
    <div className="container max-w-5xl py-10">
      {/* Header */}
      <div className="mb-8">
        <Link href="/resources/dbt" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-4">
          <ChevronLeft className="mr-1 h-4 w-4" />
          Back to DBT Resources
        </Link>
        <h1 className="text-4xl font-bold mb-4 flex items-center gap-2">
          <Heart className="h-8 w-8 text-primary" />
          DBT Daily Diary Card
        </h1>
        <p className="text-xl text-muted-foreground">
          Track your emotions, urges, skills practice, and daily progress
        </p>
      </div>

      {/* View Toggle */}
      <div className="flex gap-2 mb-6">
        <Button
          variant={viewMode === 'today' ? 'default' : 'outline'}
          onClick={() => setViewMode('today')}
        >
          Today's Card
        </Button>
        <Button
          variant={viewMode === 'history' ? 'default' : 'outline'}
          onClick={() => setViewMode('history')}
        >
          History ({cards.length})
        </Button>
        {cards.length > 0 && (
          <Button variant="outline" onClick={handleExport}>
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        )}
      </div>

      {viewMode === 'today' ? (
        <div className="space-y-6">
          {/* Date & Basics */}
          <Card>
            <CardHeader>
              <CardTitle>Daily Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-4">
                <div>
                  <Label htmlFor="date">Date</Label>
                  <Input
                    id="date"
                    type="date"
                    value={currentCard.date}
                    onChange={(e) => setCurrentCard({...currentCard, date: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="sleep">Sleep (hours)</Label>
                  <Input
                    id="sleep"
                    type="number"
                    min="0"
                    max="24"
                    value={currentCard.sleepHours}
                    onChange={(e) => setCurrentCard({...currentCard, sleepHours: parseInt(e.target.value) || 0})}
                  />
                </div>
                <div className="flex items-end gap-4">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={currentCard.medication}
                      onChange={(e) => setCurrentCard({...currentCard, medication: e.target.checked})}
                      className="w-4 h-4"
                    />
                    <span className="text-sm">Took Medication</span>
                  </label>
                </div>
                <div className="flex items-end gap-4">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={currentCard.therapy}
                      onChange={(e) => setCurrentCard({...currentCard, therapy: e.target.checked})}
                      className="w-4 h-4"
                    />
                    <span className="text-sm">Had Therapy</span>
                  </label>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Emotions */}
          <Card>
            <CardHeader>
              <CardTitle>Rate Your Emotions (0-5)</CardTitle>
              <CardDescription>0 = Not at all, 5 = Extremely intense</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                {emotionsList.map((emotion) => (
                  <div key={emotion.id} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label className="flex items-center gap-2">
                        <span>{emotion.icon}</span>
                        {emotion.label}
                      </Label>
                      <span className="text-2xl font-bold">{currentCard.emotions![emotion.id as keyof typeof currentCard.emotions]}</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="5"
                      value={currentCard.emotions![emotion.id as keyof typeof currentCard.emotions]}
                      onChange={(e) => setCurrentCard({
                        ...currentCard,
                        emotions: {
                          ...currentCard.emotions!,
                          [emotion.id]: parseInt(e.target.value)
                        }
                      })}
                      className="w-full"
                    />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Urges */}
          <Card>
            <CardHeader>
              <CardTitle>Rate Your Urges (0-5)</CardTitle>
              <CardDescription>0 = No urge, 5 = Very strong urge</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                {urgesList.map((urge) => (
                  <div key={urge.id} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label>{urge.label}</Label>
                      <span className="text-2xl font-bold">{currentCard.urges![urge.id as keyof typeof currentCard.urges]}</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="5"
                      value={currentCard.urges![urge.id as keyof typeof currentCard.urges]}
                      onChange={(e) => setCurrentCard({
                        ...currentCard,
                        urges: {
                          ...currentCard.urges!,
                          [urge.id]: parseInt(e.target.value)
                        }
                      })}
                      className="w-full"
                    />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* DBT Skills Used */}
          <Card>
            <CardHeader>
              <CardTitle>DBT Skills Practiced Today</CardTitle>
              <CardDescription>Select all skills you used</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="mindfulness">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="mindfulness">
                    <Brain className="h-4 w-4 mr-1" />
                    Mindfulness
                  </TabsTrigger>
                  <TabsTrigger value="distressTolerance">
                    <Shield className="h-4 w-4 mr-1" />
                    Distress
                  </TabsTrigger>
                  <TabsTrigger value="emotionRegulation">
                    <Heart className="h-4 w-4 mr-1" />
                    Emotion
                  </TabsTrigger>
                  <TabsTrigger value="interpersonal">
                    <Sparkles className="h-4 w-4 mr-1" />
                    Interpersonal
                  </TabsTrigger>
                </TabsList>
                
                {Object.entries(dbtSkills).map(([category, skills]) => (
                  <TabsContent key={category} value={category} className="mt-4">
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                      {skills.map((skill) => (
                        <div
                          key={skill}
                          className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                            currentCard.skillsUsed && currentCard.skillsUsed[category as keyof typeof currentCard.skillsUsed]?.includes(skill)
                              ? 'bg-primary/10 border-primary'
                              : 'hover:bg-muted'
                          }`}
                          onClick={() => toggleSkill(category as keyof typeof dbtSkills, skill)}
                        >
                          <p className="text-sm font-medium">{skill}</p>
                        </div>
                      ))}
                    </div>
                  </TabsContent>
                ))}
              </Tabs>
            </CardContent>
          </Card>

          {/* Target Behaviors */}
          <Card>
            <CardHeader>
              <CardTitle>Target Behaviors</CardTitle>
              <CardDescription>Check any that occurred today</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-3 md:grid-cols-2">
                {actionsList.map((action) => (
                  <label key={action.id} className="flex items-center gap-3 cursor-pointer p-3 border rounded-lg hover:bg-muted">
                    <input
                      type="checkbox"
                      checked={currentCard.actions![action.id as keyof typeof currentCard.actions]}
                      onChange={(e) => setCurrentCard({
                        ...currentCard,
                        actions: {
                          ...currentCard.actions!,
                          [action.id]: e.target.checked
                        }
                      })}
                      className="w-4 h-4"
                    />
                    <span className="text-sm font-medium">{action.label}</span>
                  </label>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Gratitude & Notes */}
          <Card>
            <CardHeader>
              <CardTitle>Reflection</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="gratitude">One thing I'm grateful for today</Label>
                <Input
                  id="gratitude"
                  placeholder="What went well today?"
                  value={currentCard.gratitude}
                  onChange={(e) => setCurrentCard({...currentCard, gratitude: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="notes">Additional notes</Label>
                <textarea
                  id="notes"
                  className="w-full min-h-[100px] rounded-md border border-input bg-background px-3 py-2 text-sm"
                  placeholder="Any other thoughts about today..."
                  value={currentCard.notes}
                  onChange={(e) => setCurrentCard({...currentCard, notes: e.target.value})}
                />
              </div>
            </CardContent>
          </Card>

          {/* Save Button */}
          <div className="flex justify-end">
            <Button size="lg" onClick={handleSave}>
              <Save className="mr-2 h-4 w-4" />
              Save Diary Card
            </Button>
          </div>
        </div>
      ) : (
        /* History View */
        <div className="space-y-4">
          {cards.length === 0 ? (
            <Card>
              <CardContent className="py-12 text-center">
                <p className="text-muted-foreground">No diary cards yet. Complete your first one!</p>
              </CardContent>
            </Card>
          ) : (
            cards.map((card) => (
              <Card key={card.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        {new Date(card.date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                      </CardTitle>
                      <div className="flex gap-4 mt-2">
                        <Badge variant={card.medication ? "default" : "outline"}>
                          {card.medication ? <Check className="h-3 w-3 mr-1" /> : <X className="h-3 w-3 mr-1" />}
                          Medication
                        </Badge>
                        <Badge variant={card.therapy ? "default" : "outline"}>
                          {card.therapy ? <Check className="h-3 w-3 mr-1" /> : <X className="h-3 w-3 mr-1" />}
                          Therapy
                        </Badge>
                        <Badge variant="outline">
                          {card.sleepHours} hrs sleep
                        </Badge>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Emotions Summary */}
                  <div>
                    <p className="text-sm font-medium text-muted-foreground mb-2">Emotions:</p>
                    <div className="flex flex-wrap gap-2">
                      {emotionsList.map(emotion => {
                        const value = card.emotions[emotion.id as keyof typeof card.emotions]
                        if (value > 0) {
                          return (
                            <Badge key={emotion.id} variant="secondary">
                              {emotion.icon} {emotion.label}: {value}/5
                            </Badge>
                          )
                        }
                        return null
                      })}
                    </div>
                  </div>

                  {/* Skills Used */}
                  {Object.entries(card.skillsUsed).some(([_, skills]) => skills.length > 0) && (
                    <div>
                      <p className="text-sm font-medium text-muted-foreground mb-2">Skills practiced:</p>
                      <div className="flex flex-wrap gap-1">
                        {Object.entries(card.skillsUsed).map(([category, skills]) => 
                          skills.map(skill => (
                            <Badge key={`${category}-${skill}`} variant="outline" className="text-xs">
                              {skill}
                            </Badge>
                          ))
                        )}
                      </div>
                    </div>
                  )}

                  {/* Target Behaviors */}
                  {Object.values(card.actions).some(v => v) && (
                    <div>
                      <p className="text-sm font-medium text-muted-foreground mb-2">
                        <AlertCircle className="inline h-3 w-3 mr-1" />
                        Target behaviors:
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {actionsList.map(action => {
                          if (card.actions[action.id as keyof typeof card.actions]) {
                            return (
                              <Badge key={action.id} variant="destructive" className="text-xs">
                                {action.label}
                              </Badge>
                            )
                          }
                          return null
                        })}
                      </div>
                    </div>
                  )}

                  {/* Gratitude */}
                  {card.gratitude && (
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Grateful for:</p>
                      <p className="text-sm italic">{card.gratitude}</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))
          )}
        </div>
      )}

      {/* Tips */}
      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Tips for Using Your Diary Card</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>• Complete your diary card at the same time each day for consistency</li>
            <li>• Be honest about your emotions and behaviors - this is for your growth</li>
            <li>• Celebrate the skills you used, even if they didn't work perfectly</li>
            <li>• Share your diary cards with your therapist to track patterns</li>
            <li>• Look for connections between emotions, urges, and behaviors over time</li>
            <li>• Remember: progress isn't linear - some days will be harder than others</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}