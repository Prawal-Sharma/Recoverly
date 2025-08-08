'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Brain, Save, Download, Trash2, ChevronLeft, Calendar, TrendingDown, TrendingUp, Target, MapPin, Zap, Heart } from 'lucide-react'
import Link from 'next/link'
import { cognitiveDistortions } from '@/lib/cbt-data'

interface ThoughtRecord {
  id: string
  date: string
  time: string
  situation: string
  automaticThought: string
  emotion: string
  emotionIntensity: number
  distortions: string[]
  evidenceFor: string
  evidenceAgainst: string
  balancedThought: string
  newEmotionIntensity: number
}

export default function ThoughtRecordPage() {
  const [records, setRecords] = useState<ThoughtRecord[]>([])
  const [currentRecord, setCurrentRecord] = useState<Partial<ThoughtRecord>>({
    date: new Date().toISOString().split('T')[0],
    time: new Date().toTimeString().slice(0, 5),
    emotionIntensity: 5,
    newEmotionIntensity: 3,
    distortions: []
  })
  const [viewMode, setViewMode] = useState<'form' | 'history'>('form')

  // Load records from localStorage on mount
  useEffect(() => {
    const savedRecords = localStorage.getItem('thoughtRecords')
    if (savedRecords) {
      setRecords(JSON.parse(savedRecords))
    }
  }, [])

  // Save records to localStorage whenever they change
  useEffect(() => {
    if (records.length > 0) {
      localStorage.setItem('thoughtRecords', JSON.stringify(records))
    }
  }, [records])

  const [errors, setErrors] = useState<Record<string, string>>({})
  const [touched, setTouched] = useState<Record<string, boolean>>({})

  const validateField = (field: string, value: any) => {
    const newErrors = { ...errors }
    
    switch (field) {
      case 'situation':
        if (!value?.trim()) {
          newErrors.situation = 'Please describe the situation'
        } else {
          delete newErrors.situation
        }
        break
      case 'automaticThought':
        if (!value?.trim()) {
          newErrors.automaticThought = 'Please enter your automatic thought'
        } else {
          delete newErrors.automaticThought
        }
        break
      case 'emotion':
        if (!value?.trim()) {
          newErrors.emotion = 'Please identify your emotion'
        } else {
          delete newErrors.emotion
        }
        break
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const announceToScreenReader = (message: string, priority: 'polite' | 'assertive' = 'polite') => {
    const liveRegion = document.getElementById('live-region')
    if (liveRegion) {
      liveRegion.setAttribute('aria-live', priority)
      liveRegion.textContent = message
      setTimeout(() => {
        liveRegion.textContent = ''
      }, 2000)
    }
  }

  const handleSave = () => {
    const isValid = 
      validateField('situation', currentRecord.situation) &&
      validateField('automaticThought', currentRecord.automaticThought) &&
      validateField('emotion', currentRecord.emotion)

    if (!isValid) {
      // Focus first error field
      const firstErrorField = Object.keys(errors)[0]
      document.getElementById(firstErrorField)?.focus()
      
      // Announce errors to screen readers
      const errorCount = Object.keys(errors).length
      const announcement = `There ${errorCount === 1 ? 'is' : 'are'} ${errorCount} error${errorCount === 1 ? '' : 's'} in the form. Please review and correct.`
      announceToScreenReader(announcement, 'assertive')
      return
    }

    const newRecord: ThoughtRecord = {
      id: Date.now().toString(),
      date: currentRecord.date || new Date().toISOString().split('T')[0],
      time: currentRecord.time || new Date().toTimeString().slice(0, 5),
      situation: currentRecord.situation || '',
      automaticThought: currentRecord.automaticThought || '',
      emotion: currentRecord.emotion || '',
      emotionIntensity: currentRecord.emotionIntensity || 5,
      distortions: currentRecord.distortions || [],
      evidenceFor: currentRecord.evidenceFor || '',
      evidenceAgainst: currentRecord.evidenceAgainst || '',
      balancedThought: currentRecord.balancedThought || '',
      newEmotionIntensity: currentRecord.newEmotionIntensity || 3
    }

    setRecords([newRecord, ...records])
    
    // Reset form
    setCurrentRecord({
      date: new Date().toISOString().split('T')[0],
      time: new Date().toTimeString().slice(0, 5),
      emotionIntensity: 5,
      newEmotionIntensity: 3,
      distortions: []
    })
    
    // Success announcement for screen readers
    announceToScreenReader('Thought record saved successfully!', 'polite')
  }

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this record?')) {
      setRecords(records.filter(r => r.id !== id))
    }
  }

  const handleExport = () => {
    const dataStr = JSON.stringify(records, null, 2)
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr)
    
    const exportFileDefaultName = `thought-records-${new Date().toISOString().split('T')[0]}.json`
    
    const linkElement = document.createElement('a')
    linkElement.setAttribute('href', dataUri)
    linkElement.setAttribute('download', exportFileDefaultName)
    linkElement.click()
  }

  const toggleDistortion = (distortionId: string) => {
    setCurrentRecord(prev => ({
      ...prev,
      distortions: prev.distortions?.includes(distortionId)
        ? prev.distortions.filter(d => d !== distortionId)
        : [...(prev.distortions || []), distortionId]
    }))
  }

  return (
    <div className="container max-w-5xl py-10">
      {/* Header */}
      <div className="mb-8">
        <Link href="/resources/cbt" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-4">
          <ChevronLeft className="mr-1 h-4 w-4" />
          Back to CBT Resources
        </Link>
        <h1 className="text-4xl font-bold mb-4 flex items-center gap-2">
          <Brain className="h-8 w-8 text-primary" />
          Thought Record
        </h1>
        <p className="text-xl text-muted-foreground">
          Transform negative thinking patterns by examining evidence and building balanced perspectives. 
          This powerful CBT tool helps you respond to situations with clarity instead of reacting from emotion.
        </p>
      </div>

      {/* View Toggle */}
      <div className="flex gap-2 mb-6">
        <Button
          variant={viewMode === 'form' ? 'default' : 'outline'}
          onClick={() => setViewMode('form')}
        >
          New Record
        </Button>
        <Button
          variant={viewMode === 'history' ? 'default' : 'outline'}
          onClick={() => setViewMode('history')}
        >
          History ({records.length})
        </Button>
        {records.length > 0 && (
          <Button variant="outline" onClick={handleExport}>
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        )}
      </div>

      {viewMode === 'form' ? (
        <div className="space-y-6">
          {/* Step 1: Situation */}
          <Card>
            <CardHeader>
              <CardTitle>Step 1: Describe the Situation</CardTitle>
              <CardDescription>What happened? Where were you? Who was involved?</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <Label htmlFor="date">Date</Label>
                  <Input
                    id="date"
                    type="date"
                    value={currentRecord.date}
                    onChange={(e) => setCurrentRecord({...currentRecord, date: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="time">Time</Label>
                  <Input
                    id="time"
                    type="time"
                    value={currentRecord.time}
                    onChange={(e) => setCurrentRecord({...currentRecord, time: e.target.value})}
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="situation">Situation *</Label>
                <Textarea
                  id="situation"
                  name="situation"
                  placeholder="Describe what happened..."
                  value={currentRecord.situation || ''}
                  onChange={(e) => {
                    setCurrentRecord({...currentRecord, situation: e.target.value})
                    if (touched.situation) {
                      validateField('situation', e.target.value)
                    }
                  }}
                  onBlur={() => {
                    setTouched({...touched, situation: true})
                    validateField('situation', currentRecord.situation)
                  }}
                  rows={3}
                  aria-describedby={`situation-help ${errors.situation ? 'situation-error' : ''}`}
                  aria-required="true"
                  aria-invalid={!!errors.situation}
                  className={errors.situation ? 'border-destructive focus:border-destructive' : ''}
                />
                <div id="situation-help" className="text-sm text-muted-foreground mt-1">
                  Be specific about the circumstances. This field is required.
                </div>
                {errors.situation && (
                  <div id="situation-error" className="text-sm text-destructive mt-1" role="alert">
                    <AlertCircle className="inline w-4 h-4 mr-1" aria-hidden="true" />
                    {errors.situation}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Step 2: Automatic Thought */}
          <Card>
            <CardHeader>
              <CardTitle>Step 2: Identify Your Automatic Thought</CardTitle>
              <CardDescription>What went through your mind? What were you thinking?</CardDescription>
            </CardHeader>
            <CardContent>
              <Textarea
                placeholder="Write your automatic thought exactly as it occurred..."
                value={currentRecord.automaticThought || ''}
                onChange={(e) => setCurrentRecord({...currentRecord, automaticThought: e.target.value})}
                rows={3}
              />
            </CardContent>
          </Card>

          {/* Step 3: Emotions */}
          <Card>
            <CardHeader>
              <CardTitle>Step 3: Identify Your Emotions</CardTitle>
              <CardDescription>What emotion did you feel? How intense was it?</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="emotion">Primary Emotion</Label>
                <Input
                  id="emotion"
                  placeholder="e.g., Anxious, Sad, Angry, Ashamed..."
                  value={currentRecord.emotion || ''}
                  onChange={(e) => setCurrentRecord({...currentRecord, emotion: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="intensity">Emotion Intensity (0-10)</Label>
                <div className="flex items-center gap-4">
                  <input
                    id="intensity"
                    type="range"
                    min="0"
                    max="10"
                    value={currentRecord.emotionIntensity}
                    onChange={(e) => setCurrentRecord({...currentRecord, emotionIntensity: parseInt(e.target.value)})}
                    className="flex-1"
                  />
                  <span className="text-2xl font-bold w-8">{currentRecord.emotionIntensity}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Step 4: Cognitive Distortions */}
          <Card>
            <CardHeader>
              <CardTitle>Step 4: Identify Cognitive Distortions</CardTitle>
              <CardDescription>Which thinking errors might be present in your thought?</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-2 md:grid-cols-2">
                {cognitiveDistortions.map((distortion) => (
                  <div
                    key={distortion.id}
                    className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                      currentRecord.distortions?.includes(distortion.id)
                        ? 'bg-primary/10 border-primary'
                        : 'hover:bg-muted'
                    }`}
                    onClick={() => toggleDistortion(distortion.id)}
                  >
                    <p className="font-medium text-sm">{distortion.name}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Step 5: Evidence */}
          <Card>
            <CardHeader>
              <CardTitle>Step 5: Examine the Evidence</CardTitle>
              <CardDescription>Look at the facts objectively</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="evidenceFor">Evidence FOR the thought</Label>
                <Textarea
                  id="evidenceFor"
                  placeholder="What facts support this thought?"
                  value={currentRecord.evidenceFor || ''}
                  onChange={(e) => setCurrentRecord({...currentRecord, evidenceFor: e.target.value})}
                  rows={3}
                />
              </div>
              <div>
                <Label htmlFor="evidenceAgainst">Evidence AGAINST the thought</Label>
                <Textarea
                  id="evidenceAgainst"
                  placeholder="What facts contradict this thought?"
                  value={currentRecord.evidenceAgainst || ''}
                  onChange={(e) => setCurrentRecord({...currentRecord, evidenceAgainst: e.target.value})}
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>

          {/* Step 6: Balanced Thought */}
          <Card>
            <CardHeader>
              <CardTitle>Step 6: Create a Balanced Thought</CardTitle>
              <CardDescription>Based on the evidence, what's a more realistic thought?</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Textarea
                  placeholder="Write a more balanced, realistic thought..."
                  value={currentRecord.balancedThought || ''}
                  onChange={(e) => setCurrentRecord({...currentRecord, balancedThought: e.target.value})}
                  rows={3}
                />
              </div>
              <div>
                <Label htmlFor="newIntensity">New Emotion Intensity (0-10)</Label>
                <div className="flex items-center gap-4">
                  <input
                    id="newIntensity"
                    type="range"
                    min="0"
                    max="10"
                    value={currentRecord.newEmotionIntensity}
                    onChange={(e) => setCurrentRecord({...currentRecord, newEmotionIntensity: parseInt(e.target.value)})}
                    className="flex-1"
                  />
                  <span className="text-2xl font-bold w-8">{currentRecord.newEmotionIntensity}</span>
                </div>
                {currentRecord.emotionIntensity !== undefined && currentRecord.newEmotionIntensity !== undefined && (
                  <div className="flex items-center gap-2 text-sm">
                    {currentRecord.newEmotionIntensity < currentRecord.emotionIntensity ? (
                      <>
                        <TrendingDown className="h-4 w-4 text-green-600" />
                        <span className="text-green-600">
                          Emotion reduced by {currentRecord.emotionIntensity - currentRecord.newEmotionIntensity} points
                        </span>
                      </>
                    ) : (
                      <>
                        <TrendingUp className="h-4 w-4 text-amber-600" />
                        <span className="text-amber-600">
                          Keep working on the balanced thought
                        </span>
                      </>
                    )}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Save Button */}
          <div className="flex justify-end">
            <Button size="lg" onClick={handleSave}>
              <Save className="mr-2 h-4 w-4" />
              Save Thought Record
            </Button>
          </div>
        </div>
      ) : (
        /* History View */
        <div className="space-y-4">
          {records.length === 0 ? (
            <Card>
              <CardContent className="py-12 text-center">
                <p className="text-muted-foreground">No thought records yet. Create your first one!</p>
              </CardContent>
            </Card>
          ) : (
            records.map((record) => (
              <Card key={record.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        {new Date(record.date).toLocaleDateString()} at {record.time}
                      </CardTitle>
                      <CardDescription>{record.situation}</CardDescription>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDelete(record.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Automatic Thought:</p>
                    <p className="text-sm">{record.automaticThought}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Emotion:</p>
                    <p className="text-sm">
                      {record.emotion} (Intensity: {record.emotionIntensity}/10 → {record.newEmotionIntensity}/10)
                    </p>
                  </div>
                  {record.distortions.length > 0 && (
                    <div>
                      <p className="text-sm font-medium text-muted-foreground mb-1">Distortions:</p>
                      <div className="flex flex-wrap gap-1">
                        {record.distortions.map(d => {
                          const distortion = cognitiveDistortions.find(cd => cd.id === d)
                          return distortion ? (
                            <Badge key={d} variant="outline" className="text-xs">
                              {distortion.name}
                            </Badge>
                          ) : null
                        })}
                      </div>
                    </div>
                  )}
                  {record.balancedThought && (
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Balanced Thought:</p>
                      <p className="text-sm">{record.balancedThought}</p>
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
          <CardTitle>Tips for Effective Thought Records</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>• Complete thought records as soon as possible after the triggering event</li>
            <li>• Be specific and detailed in describing the situation</li>
            <li>• Write your automatic thought exactly as it occurred, even if it seems irrational</li>
            <li>• Look for facts, not interpretations, when examining evidence</li>
            <li>• Your balanced thought should acknowledge both the evidence for and against</li>
            <li>• Practice regularly - the more you use this tool, the more automatic it becomes</li>
          </ul>
        </CardContent>
      </Card>

      {/* Related CBT Tools */}
      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Related CBT Tools</CardTitle>
          <CardDescription>Continue building your cognitive skills with these tools</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card className="hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-center gap-3 mb-2">
                  <Target className="h-5 w-5 text-primary" />
                  <h4 className="font-semibold">Distortion Quiz</h4>
                </div>
                <p className="text-sm text-muted-foreground mb-3">
                  Test your ability to identify cognitive distortions
                </p>
                <Button size="sm" variant="outline" asChild className="w-full">
                  <Link href="/resources/cbt/distortion-quiz">Take Quiz</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-center gap-3 mb-2">
                  <MapPin className="h-5 w-5 text-primary" />
                  <h4 className="font-semibold">Trigger Mapper</h4>
                </div>
                <p className="text-sm text-muted-foreground mb-3">
                  Map your triggers and develop coping strategies
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
                  Emergency techniques for intense emotions
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
                  <h4 className="font-semibold">Recovery Plan</h4>
                </div>
                <p className="text-sm text-muted-foreground mb-3">
                  Include thought challenging in your recovery plan
                </p>
                <Button size="sm" variant="outline" asChild className="w-full">
                  <Link href="/recovery-plan">Build Plan</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}