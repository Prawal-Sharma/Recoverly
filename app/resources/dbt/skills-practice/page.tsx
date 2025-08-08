import { Metadata } from 'next'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ChevronRight, BookOpen, Brain, Target, Sparkles } from 'lucide-react'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'DBT Skills Practice | Recovery Tools',
  description: 'Practice and master all DBT skills for your recovery journey.',
}

export default function DBTSkillsPracticePage() {
  return (
    <div className="container max-w-4xl py-10">
      <div className="mb-8">
        <Link href="/resources/dbt" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-4">
          <ChevronRight className="h-4 w-4 rotate-180" />
          Back to DBT Overview
        </Link>
        <h1 className="text-4xl font-bold mb-4 flex items-center gap-3">
          <BookOpen className="h-8 w-8 text-indigo-600" />
          DBT Skills Practice
        </h1>
        <p className="text-xl text-muted-foreground">
          Guided exercises and practice scenarios for mastering all four DBT modules.
        </p>
      </div>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Daily Skills Practice</CardTitle>
          <CardDescription>
            Pick one skill from each module to practice today
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="p-4 border rounded-lg bg-blue-50 dark:bg-blue-950/20">
              <h3 className="font-semibold mb-2 flex items-center gap-2">
                <Brain className="h-4 w-4" />
                Today's Mindfulness
              </h3>
              <p className="text-sm text-muted-foreground mb-3">
                Practice "Observe & Describe" for 5 minutes
              </p>
              <Link href="/resources/dbt/mindfulness">
                <Button size="sm" variant="outline">Practice</Button>
              </Link>
            </div>

            <div className="p-4 border rounded-lg bg-red-50 dark:bg-red-950/20">
              <h3 className="font-semibold mb-2 flex items-center gap-2">
                <Target className="h-4 w-4" />
                Today's Distress Tolerance
              </h3>
              <p className="text-sm text-muted-foreground mb-3">
                Use TIPP when emotions hit 7/10 intensity
              </p>
              <Link href="/resources/dbt/tipp">
                <Button size="sm" variant="outline">Practice</Button>
              </Link>
            </div>

            <div className="p-4 border rounded-lg bg-green-50 dark:bg-green-950/20">
              <h3 className="font-semibold mb-2 flex items-center gap-2">
                <Sparkles className="h-4 w-4" />
                Today's Emotion Regulation
              </h3>
              <p className="text-sm text-muted-foreground mb-3">
                Check the facts on one strong emotion
              </p>
              <Link href="/resources/dbt/emotion-regulation">
                <Button size="sm" variant="outline">Practice</Button>
              </Link>
            </div>

            <div className="p-4 border rounded-lg bg-purple-50 dark:bg-purple-950/20">
              <h3 className="font-semibold mb-2 flex items-center gap-2">
                <Target className="h-4 w-4" />
                Today's Interpersonal
              </h3>
              <p className="text-sm text-muted-foreground mb-3">
                Use GIVE in one conversation today
              </p>
              <Link href="/resources/dbt/interpersonal-effectiveness">
                <Button size="sm" variant="outline">Practice</Button>
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Recovery Scenarios</CardTitle>
          <CardDescription>
            Practice applying DBT skills to common recovery challenges
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="p-4 border rounded-lg">
            <h3 className="font-semibold text-sm mb-2">Scenario: Intense Craving</h3>
            <p className="text-sm text-muted-foreground mb-2">
              You're alone and experiencing a strong craving (8/10).
            </p>
            <p className="text-sm">
              <strong>Skills to use:</strong> TIPP, Urge Surfing, Distraction (ACCEPTS), Call support
            </p>
          </div>

          <div className="p-4 border rounded-lg">
            <h3 className="font-semibold text-sm mb-2">Scenario: Family Conflict</h3>
            <p className="text-sm text-muted-foreground mb-2">
              Family member brings up past mistakes during dinner.
            </p>
            <p className="text-sm">
              <strong>Skills to use:</strong> GIVE, Check the Facts, Opposite Action to anger
            </p>
          </div>

          <div className="p-4 border rounded-lg">
            <h3 className="font-semibold text-sm mb-2">Scenario: Social Pressure</h3>
            <p className="text-sm text-muted-foreground mb-2">
              Friends invite you to a bar for a celebration.
            </p>
            <p className="text-sm">
              <strong>Skills to use:</strong> DEARMAN to suggest alternative, FAST for self-respect
            </p>
          </div>
        </CardContent>
      </Card>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Quick Reference</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 md:grid-cols-2">
            <div className="space-y-2">
              <h3 className="font-semibold text-sm">Crisis Skills (Use First)</h3>
              <div className="flex flex-wrap gap-1">
                <Badge variant="outline">TIPP</Badge>
                <Badge variant="outline">ACCEPTS</Badge>
                <Badge variant="outline">IMPROVE</Badge>
                <Badge variant="outline">Pros & Cons</Badge>
              </div>
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold text-sm">Daily Skills (Prevention)</h3>
              <div className="flex flex-wrap gap-1">
                <Badge variant="outline">Wise Mind</Badge>
                <Badge variant="outline">PLEASE</Badge>
                <Badge variant="outline">ABC</Badge>
                <Badge variant="outline">GIVE</Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-2">
        <Card className="hover:shadow-lg transition-shadow">
          <Link href="/resources/dbt/diary-card">
            <CardHeader>
              <CardTitle className="text-lg">Daily Diary Card</CardTitle>
              <CardDescription>Track your skill usage</CardDescription>
            </CardHeader>
          </Link>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <Link href="/resources/dbt">
            <CardHeader>
              <CardTitle className="text-lg">DBT Overview</CardTitle>
              <CardDescription>Review all modules</CardDescription>
            </CardHeader>
          </Link>
        </Card>
      </div>
    </div>
  )
}