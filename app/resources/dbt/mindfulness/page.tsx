'use client'

import { useState } from 'react'
import { Metadata } from 'next'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ChevronRight, Brain, Eye, Lightbulb, Heart, CheckCircle2 } from 'lucide-react'
import Link from 'next/link'

export default function DBTMindfulnessPage() {
  const [completedSkills, setCompletedSkills] = useState<string[]>([])

  const toggleSkill = (skillId: string) => {
    setCompletedSkills(prev => 
      prev.includes(skillId) 
        ? prev.filter(id => id !== skillId)
        : [...prev, skillId]
    )
  }

  const coreSkills = [
    {
      id: 'wise-mind',
      name: 'Wise Mind',
      description: 'Balance emotion mind and reasonable mind',
      practice: 'Sit quietly and ask your wise mind a question. Listen for the answer that feels both logical and emotionally right.'
    },
    {
      id: 'what-skills',
      name: '"What" Skills',
      description: 'Observe, Describe, Participate',
      practice: 'Observe your thoughts without judgment, describe them factually, then fully participate in the present moment.'
    },
    {
      id: 'how-skills',
      name: '"How" Skills',
      description: 'Non-judgmentally, One-mindfully, Effectively',
      practice: 'Practice doing things without judgment, focus on one thing at a time, and do what works in the situation.'
    }
  ]

  return (
    <div className="container max-w-4xl py-10">
      <div className="mb-8">
        <Link href="/resources/dbt" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-4">
          <ChevronRight className="h-4 w-4 rotate-180" />
          Back to DBT Overview
        </Link>
        <h1 className="text-4xl font-bold mb-4 flex items-center gap-3">
          <Heart className="h-8 w-8 text-blue-600" />
          DBT Mindfulness Module
        </h1>
        <p className="text-xl text-muted-foreground">
          The foundation of DBT. Learn to observe your thoughts and feelings without judgment, staying present in the moment.
        </p>
      </div>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Module Overview</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground">
            Mindfulness is the foundation of all DBT skills. It teaches you to be present in the moment, 
            observe without judgment, and access your "wise mind" - the synthesis of emotion and logic.
          </p>
          <div className="flex flex-wrap gap-2">
            <Badge>Core DBT Module</Badge>
            <Badge variant="outline">3 Core Skills</Badge>
            <Badge variant="outline">Daily Practice</Badge>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="skills" className="mb-8">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="skills">Core Skills</TabsTrigger>
          <TabsTrigger value="practice">Practice Exercises</TabsTrigger>
          <TabsTrigger value="recovery">For Recovery</TabsTrigger>
        </TabsList>

        <TabsContent value="skills" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="h-5 w-5 text-primary" />
                The Three States of Mind
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-3">
                <div className="p-4 border rounded-lg">
                  <h3 className="font-semibold text-red-600 mb-2">Emotion Mind</h3>
                  <p className="text-sm text-muted-foreground">
                    Ruled by feelings, moods, and urges. Decisions based on how you feel in the moment.
                  </p>
                  <p className="text-xs mt-2 italic">
                    "I feel terrible, I need to use now!"
                  </p>
                </div>
                <div className="p-4 border rounded-lg">
                  <h3 className="font-semibold text-blue-600 mb-2">Reasonable Mind</h3>
                  <p className="text-sm text-muted-foreground">
                    Ruled by facts, logic, and thinking. Decisions based on data and rationality.
                  </p>
                  <p className="text-xs mt-2 italic">
                    "Using will damage my health and relationships."
                  </p>
                </div>
                <div className="p-4 border rounded-lg bg-green-50 dark:bg-green-950/20">
                  <h3 className="font-semibold text-green-600 mb-2">Wise Mind</h3>
                  <p className="text-sm text-muted-foreground">
                    The synthesis of emotion and reason. Intuitive knowing what's right.
                  </p>
                  <p className="text-xs mt-2 italic">
                    "I feel the urge, but I know I can get through this."
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {coreSkills.map(skill => (
            <Card key={skill.id}>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>{skill.name}</span>
                  <Button
                    size="sm"
                    variant={completedSkills.includes(skill.id) ? "default" : "outline"}
                    onClick={() => toggleSkill(skill.id)}
                  >
                    {completedSkills.includes(skill.id) ? (
                      <>
                        <CheckCircle2 className="h-4 w-4 mr-2" />
                        Practiced
                      </>
                    ) : (
                      'Mark as Practiced'
                    )}
                  </Button>
                </CardTitle>
                <CardDescription>{skill.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="p-4 bg-muted/50 rounded-lg">
                  <p className="text-sm">
                    <strong>Practice:</strong> {skill.practice}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="practice" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Daily Mindfulness Exercises</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="p-4 border rounded-lg">
                  <h3 className="font-semibold mb-2">Morning: Wise Mind Breathing</h3>
                  <p className="text-sm text-muted-foreground mb-2">
                    5 minutes to access your wise mind
                  </p>
                  <ol className="text-sm space-y-1">
                    <li>1. Sit comfortably and close your eyes</li>
                    <li>2. Breathe normally, focusing on your breath</li>
                    <li>3. Imagine breathing into your wise mind (center of yourself)</li>
                    <li>4. Ask your wise mind: "What do I need today?"</li>
                    <li>5. Listen without forcing an answer</li>
                  </ol>
                </div>

                <div className="p-4 border rounded-lg">
                  <h3 className="font-semibold mb-2">Afternoon: Observe & Describe</h3>
                  <p className="text-sm text-muted-foreground mb-2">
                    10 minutes of mindful observation
                  </p>
                  <ol className="text-sm space-y-1">
                    <li>1. Choose an object or activity</li>
                    <li>2. Observe it with all your senses</li>
                    <li>3. Describe what you observe (just facts)</li>
                    <li>4. Notice when judgments arise</li>
                    <li>5. Return to observing without judgment</li>
                  </ol>
                </div>

                <div className="p-4 border rounded-lg">
                  <h3 className="font-semibold mb-2">Evening: Participate Fully</h3>
                  <p className="text-sm text-muted-foreground mb-2">
                    15 minutes of full engagement
                  </p>
                  <ol className="text-sm space-y-1">
                    <li>1. Choose a simple activity (walking, eating, listening to music)</li>
                    <li>2. Throw yourself completely into it</li>
                    <li>3. Let go of self-consciousness</li>
                    <li>4. Become one with the experience</li>
                    <li>5. Notice the difference from half-attention</li>
                  </ol>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="recovery" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Mindfulness for Recovery</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="p-4 bg-orange-50 dark:bg-orange-950/20 rounded-lg">
                  <h3 className="font-semibold mb-2">Urge Surfing with Mindfulness</h3>
                  <p className="text-sm text-muted-foreground mb-2">
                    Use mindfulness skills to ride out cravings:
                  </p>
                  <ul className="text-sm space-y-1">
                    <li>• <strong>Observe:</strong> Notice the craving without judgment</li>
                    <li>• <strong>Describe:</strong> "I'm having the thought that I want to use"</li>
                    <li>• <strong>Participate:</strong> Fully engage in a different activity</li>
                    <li>• <strong>Non-judgmentally:</strong> Don't judge yourself for having cravings</li>
                    <li>• <strong>One-mindfully:</strong> Focus on one moment at a time</li>
                  </ul>
                </div>

                <div className="p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
                  <h3 className="font-semibold mb-2">Wise Mind in Recovery Decisions</h3>
                  <p className="text-sm text-muted-foreground mb-2">
                    Access wise mind when facing recovery challenges:
                  </p>
                  <ul className="text-sm space-y-1">
                    <li>• Before making decisions about recovery</li>
                    <li>• When emotion mind wants to relapse</li>
                    <li>• When reasonable mind is too harsh</li>
                    <li>• To find balance between acceptance and change</li>
                    <li>• To know when to ask for help</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Common Recovery Challenges</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="p-3 border rounded-lg">
                  <p className="font-semibold text-sm">Challenge: "I can't stop thinking about using"</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    <strong>Mindfulness Response:</strong> Observe the thoughts like clouds passing. 
                    You are the sky, not the clouds.
                  </p>
                </div>
                <div className="p-3 border rounded-lg">
                  <p className="font-semibold text-sm">Challenge: "I feel overwhelmed by emotions"</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    <strong>Mindfulness Response:</strong> Describe emotions factually: 
                    "I notice tightness in my chest, racing thoughts."
                  </p>
                </div>
                <div className="p-3 border rounded-lg">
                  <p className="font-semibold text-sm">Challenge: "I'm constantly judging myself"</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    <strong>Mindfulness Response:</strong> Notice judgments as mental events. 
                    Replace with facts: "I had a craving" not "I'm weak."
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Your Mindfulness Practice Progress</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
              <span className="font-semibold">Skills Practiced</span>
              <span className="text-2xl font-bold text-primary">
                {completedSkills.length} / {coreSkills.length}
              </span>
            </div>
            {completedSkills.length === coreSkills.length && (
              <div className="p-4 bg-green-50 dark:bg-green-950/20 rounded-lg text-center">
                <CheckCircle2 className="h-8 w-8 text-green-600 mx-auto mb-2" />
                <p className="font-semibold">Excellent work!</p>
                <p className="text-sm text-muted-foreground">
                  You've practiced all core mindfulness skills. Keep practicing daily!
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-2">
        <Card className="hover:shadow-lg transition-shadow">
          <Link href="/resources/dbt/distress-tolerance">
            <CardHeader>
              <CardTitle className="text-lg">Next: Distress Tolerance</CardTitle>
              <CardDescription>Learn crisis survival skills</CardDescription>
            </CardHeader>
          </Link>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <Link href="/resources/dbt/diary-card">
            <CardHeader>
              <CardTitle className="text-lg">Daily Diary Card</CardTitle>
              <CardDescription>Track your mindfulness practice</CardDescription>
            </CardHeader>
          </Link>
        </Card>
      </div>
    </div>
  )
}