'use client'

import { useState } from 'react'
import { Metadata } from 'next'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { AlertTriangle, Phone, MessageCircle, Shield, Wind, Snowflake, Activity, ChevronRight, ExternalLink } from 'lucide-react'
import Link from 'next/link'

export default function EmergencyCalmPage() {
  const [selectedTechnique, setSelectedTechnique] = useState<string | null>(null)

  const techniques = [
    {
      id: 'cold',
      name: 'Cold Water Technique',
      icon: Snowflake,
      time: '30 seconds',
      instructions: [
        'Fill a bowl with cold water and ice',
        'Hold your breath and dunk your face for 15-30 seconds',
        'Alternative: Hold ice cubes or frozen peas on your temples',
        'Or: Take a cold shower focusing on the sensation'
      ],
      why: 'Activates the dive response, immediately slowing heart rate and calming the nervous system'
    },
    {
      id: 'breathing',
      name: 'Crisis Breathing',
      icon: Wind,
      time: '2 minutes',
      instructions: [
        'Breathe IN for 4 counts',
        'HOLD for 7 counts',
        'Breathe OUT for 8 counts',
        'Repeat 4-8 times',
        'Focus only on counting'
      ],
      why: 'Longer exhales activate parasympathetic nervous system, reducing panic quickly'
    },
    {
      id: 'movement',
      name: 'Intense Movement',
      icon: Activity,
      time: '5 minutes',
      instructions: [
        'Do jumping jacks for 60 seconds',
        'Run in place lifting knees high',
        'Do push-ups until tired',
        'Dance vigorously to loud music',
        'Sprint up and down stairs'
      ],
      why: 'Burns off adrenaline and stress hormones, redirects intense energy'
    },
    {
      id: 'grounding',
      name: '5-4-3-2-1 Grounding',
      icon: Shield,
      time: '3 minutes',
      instructions: [
        'Name 5 things you can SEE',
        'Name 4 things you can TOUCH',
        'Name 3 things you can HEAR',
        'Name 2 things you can SMELL',
        'Name 1 thing you can TASTE'
      ],
      why: 'Anchors you in the present moment, interrupting panic and dissociation'
    }
  ]

  return (
    <div className="container max-w-4xl py-10">
      <div className="mb-8">
        <Link href="/resources/mindfulness" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-4">
          <ChevronRight className="h-4 w-4 rotate-180" />
          Back to Mindfulness
        </Link>
        <h1 className="text-4xl font-bold mb-4 flex items-center gap-3">
          <AlertTriangle className="h-8 w-8 text-red-600" />
          Crisis Calm Techniques
        </h1>
        <p className="text-xl text-muted-foreground">
          Quick, powerful techniques to calm intense emotions and prevent crisis escalation. Use these when you need immediate relief.
        </p>
      </div>

      <Alert className="mb-8 border-red-200 bg-red-50 dark:bg-red-950/20">
        <AlertTriangle className="h-5 w-5 text-red-600" />
        <AlertDescription className="text-sm">
          <strong className="block mb-2">If you're in immediate danger or having thoughts of self-harm:</strong>
          <div className="flex flex-wrap gap-3 mt-3">
            <Link href="tel:988">
              <Button variant="destructive" size="sm">
                <Phone className="mr-2 h-4 w-4" />
                Call 988 Crisis Lifeline
              </Button>
            </Link>
            <Link href="sms:741741">
              <Button variant="destructive" size="sm">
                <MessageCircle className="mr-2 h-4 w-4" />
                Text HOME to 741741
              </Button>
            </Link>
            <Link href="/resources/crisis">
              <Button variant="outline" size="sm">
                More Crisis Resources
                <ExternalLink className="ml-2 h-3 w-3" />
              </Button>
            </Link>
          </div>
        </AlertDescription>
      </Alert>

      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Quick Crisis Techniques</h2>
        <p className="text-muted-foreground mb-6">
          Choose a technique that matches your current situation and comfort level
        </p>
        <div className="grid gap-4 md:grid-cols-2">
          {techniques.map((technique) => {
            const Icon = technique.icon
            return (
              <Card 
                key={technique.id}
                className={`cursor-pointer transition-all hover:shadow-lg ${
                  selectedTechnique === technique.id ? 'ring-2 ring-primary' : ''
                }`}
                onClick={() => setSelectedTechnique(technique.id)}
              >
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span className="flex items-center gap-2">
                      <Icon className="h-5 w-5 text-primary" />
                      {technique.name}
                    </span>
                    <Badge variant="outline">{technique.time}</Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-3">
                    {technique.why}
                  </p>
                  <Button 
                    variant={selectedTechnique === technique.id ? "default" : "outline"}
                    size="sm"
                    className="w-full"
                  >
                    {selectedTechnique === technique.id ? "Selected" : "Try This"}
                  </Button>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>

      {selectedTechnique && (
        <Card className="mb-8 border-primary">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              {(() => {
                const technique = techniques.find(t => t.id === selectedTechnique)
                const Icon = technique?.icon
                return Icon ? <Icon className="h-5 w-5 text-primary" /> : null
              })()}
              {techniques.find(t => t.id === selectedTechnique)?.name} Instructions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ol className="space-y-3">
              {techniques.find(t => t.id === selectedTechnique)?.instructions.map((instruction, index) => (
                <li key={index} className="flex gap-3">
                  <span className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-sm font-semibold">
                    {index + 1}
                  </span>
                  <span className="pt-1">{instruction}</span>
                </li>
              ))}
            </ol>
            <div className="mt-6 p-4 bg-muted/50 rounded-lg">
              <p className="text-sm">
                <strong>Why this works:</strong> {techniques.find(t => t.id === selectedTechnique)?.why}
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>TIPP Protocol for Extreme Distress</CardTitle>
          <CardDescription>
            When emotions are at 8-10/10 intensity, use TIPP to quickly change your body chemistry
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="p-4 border rounded-lg">
              <h3 className="font-semibold flex items-center gap-2 mb-2">
                <span className="text-primary">T</span> - Temperature
              </h3>
              <p className="text-sm text-muted-foreground">
                Cold water on face, ice packs, cold shower. Shocks the system and resets emotions.
              </p>
            </div>
            <div className="p-4 border rounded-lg">
              <h3 className="font-semibold flex items-center gap-2 mb-2">
                <span className="text-primary">I</span> - Intense Exercise
              </h3>
              <p className="text-sm text-muted-foreground">
                Sprint, jumping jacks, push-ups for 10-15 minutes. Burns off stress hormones.
              </p>
            </div>
            <div className="p-4 border rounded-lg">
              <h3 className="font-semibold flex items-center gap-2 mb-2">
                <span className="text-primary">P</span> - Paced Breathing
              </h3>
              <p className="text-sm text-muted-foreground">
                Exhale longer than inhale (4 in, 6 out). Activates calming response.
              </p>
            </div>
            <div className="p-4 border rounded-lg">
              <h3 className="font-semibold flex items-center gap-2 mb-2">
                <span className="text-primary">P</span> - Progressive Relaxation
              </h3>
              <p className="text-sm text-muted-foreground">
                Tense and release muscle groups. Releases physical tension.
              </p>
            </div>
          </div>
          <div className="text-center pt-4">
            <Link href="/resources/dbt/tipp">
              <Button>
                Learn Full TIPP Practice
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-2 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>When to Use Crisis Techniques</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm">
              <li className="flex gap-2">
                <AlertTriangle className="h-4 w-4 text-red-600 mt-0.5" />
                <span>Overwhelming cravings threatening relapse</span>
              </li>
              <li className="flex gap-2">
                <AlertTriangle className="h-4 w-4 text-red-600 mt-0.5" />
                <span>Panic attacks or extreme anxiety</span>
              </li>
              <li className="flex gap-2">
                <AlertTriangle className="h-4 w-4 text-red-600 mt-0.5" />
                <span>Intense anger that might lead to harm</span>
              </li>
              <li className="flex gap-2">
                <AlertTriangle className="h-4 w-4 text-red-600 mt-0.5" />
                <span>Dissociation or feeling disconnected</span>
              </li>
              <li className="flex gap-2">
                <AlertTriangle className="h-4 w-4 text-red-600 mt-0.5" />
                <span>Self-harm urges</span>
              </li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>After the Crisis</CardTitle>
          </CardHeader>
          <CardContent>
            <ol className="space-y-2 text-sm">
              <li>1. Practice self-compassion - you did great by using skills</li>
              <li>2. Identify what triggered the crisis</li>
              <li>3. Plan how to handle similar situations</li>
              <li>4. Reach out to your support system</li>
              <li>5. Schedule self-care activities</li>
              <li>6. Consider if you need professional support</li>
            </ol>
          </CardContent>
        </Card>
      </div>

      <Card className="mb-8 border-orange-200 bg-orange-50 dark:bg-orange-950/20">
        <CardHeader>
          <CardTitle>Build Your Crisis Plan</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Having a plan before crisis hits can save your recovery. Write down:
          </p>
          <div className="grid gap-3 md:grid-cols-2">
            <div className="p-3 bg-white dark:bg-background rounded-lg">
              <h4 className="font-semibold text-sm mb-2">My Warning Signs</h4>
              <p className="text-xs text-muted-foreground">Physical sensations, thoughts, or behaviors that signal crisis</p>
            </div>
            <div className="p-3 bg-white dark:bg-background rounded-lg">
              <h4 className="font-semibold text-sm mb-2">My Go-To Techniques</h4>
              <p className="text-xs text-muted-foreground">2-3 techniques that work best for you</p>
            </div>
            <div className="p-3 bg-white dark:bg-background rounded-lg">
              <h4 className="font-semibold text-sm mb-2">My Support Contacts</h4>
              <p className="text-xs text-muted-foreground">3 people you can call, plus crisis hotlines</p>
            </div>
            <div className="p-3 bg-white dark:bg-background rounded-lg">
              <h4 className="font-semibold text-sm mb-2">My Safe Places</h4>
              <p className="text-xs text-muted-foreground">Physical locations where you feel secure</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="text-center p-6 bg-muted/50 rounded-lg">
        <h2 className="text-2xl font-bold mb-2">Remember: This Too Shall Pass</h2>
        <p className="text-muted-foreground mb-4">
          Every crisis is temporary. You have survived 100% of your worst days so far.
        </p>
        <div className="flex justify-center gap-4">
          <Link href="/resources/crisis">
            <Button variant="outline">
              <Phone className="mr-2 h-4 w-4" />
              Crisis Resources
            </Button>
          </Link>
          <Link href="/resources/mindfulness/meditation/anxiety-relief">
            <Button>
              Try Anxiety Relief Meditation
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}