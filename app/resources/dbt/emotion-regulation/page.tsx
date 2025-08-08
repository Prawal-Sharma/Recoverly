import { Metadata } from 'next'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ChevronRight, Smile, Heart, Brain } from 'lucide-react'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'DBT Emotion Regulation | Recovery Tools',
  description: 'Learn to understand and manage emotions effectively without substances.',
}

export default function EmotionRegulationPage() {
  return (
    <div className="container max-w-4xl py-10">
      <div className="mb-8">
        <Link href="/resources/dbt" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-4">
          <ChevronRight className="h-4 w-4 rotate-180" />
          Back to DBT Overview
        </Link>
        <h1 className="text-4xl font-bold mb-4 flex items-center gap-3">
          <Smile className="h-8 w-8 text-green-600" />
          DBT Emotion Regulation
        </h1>
        <p className="text-xl text-muted-foreground">
          Understand and manage emotions effectively to reduce vulnerability to negative emotions.
        </p>
      </div>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Core Emotion Regulation Skills</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="p-4 border rounded-lg">
            <h3 className="font-semibold mb-2">PLEASE - Reduce Vulnerability</h3>
            <ul className="text-sm space-y-1 text-muted-foreground">
              <li>• Treat PhysicaL illness - Take care of your body</li>
              <li>• Balance Eating - Don't skip meals</li>
              <li>• Avoid mood-Altering substances</li>
              <li>• Balance Sleep - Get 7-9 hours</li>
              <li>• Get Exercise - At least 20 minutes daily</li>
            </ul>
          </div>

          <div className="p-4 border rounded-lg">
            <h3 className="font-semibold mb-2">ABC - Accumulate Positives</h3>
            <ul className="text-sm space-y-1 text-muted-foreground">
              <li>• Accumulate positive emotions short-term (daily pleasant activities)</li>
              <li>• Build mastery - Do things that make you feel competent</li>
              <li>• Cope ahead - Plan for emotional situations</li>
            </ul>
          </div>

          <div className="p-4 border rounded-lg">
            <h3 className="font-semibold mb-2">Check the Facts</h3>
            <p className="text-sm text-muted-foreground mb-2">
              Examine if your emotional response fits the facts:
            </p>
            <ul className="text-sm space-y-1 text-muted-foreground">
              <li>• What emotion am I feeling?</li>
              <li>• What triggered this emotion?</li>
              <li>• Do the facts justify the intensity?</li>
              <li>• Am I assuming threats that don't exist?</li>
            </ul>
          </div>

          <div className="p-4 border rounded-lg">
            <h3 className="font-semibold mb-2">Opposite Action</h3>
            <p className="text-sm text-muted-foreground">
              When emotions don't fit facts or aren't effective, act opposite to the urge:
            </p>
            <ul className="text-sm space-y-1 text-muted-foreground">
              <li>• Fear → Approach what you're afraid of</li>
              <li>• Anger → Be kind, take a step back</li>
              <li>• Sadness → Get active, engage</li>
              <li>• Shame → Share with safe people</li>
            </ul>
          </div>
        </CardContent>
      </Card>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Emotion Regulation in Recovery</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-4">
            Substances were likely your primary emotion regulation tool. These skills replace that with healthier strategies.
          </p>
          <div className="flex flex-wrap gap-2">
            <Badge>Prevents emotional relapse</Badge>
            <Badge>Reduces PAWS symptoms</Badge>
            <Badge>Builds emotional resilience</Badge>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-2">
        <Card className="hover:shadow-lg transition-shadow">
          <Link href="/resources/dbt/interpersonal-effectiveness">
            <CardHeader>
              <CardTitle className="text-lg">Next: Interpersonal Effectiveness</CardTitle>
              <CardDescription>Build healthy relationships</CardDescription>
            </CardHeader>
          </Link>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <Link href="/resources/cbt/thought-record">
            <CardHeader>
              <CardTitle className="text-lg">Thought Record</CardTitle>
              <CardDescription>Track emotional triggers</CardDescription>
            </CardHeader>
          </Link>
        </Card>
      </div>
    </div>
  )
}