'use client'

import { useState, useEffect, useRef } from 'react'
import { Metadata } from 'next'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { PlayCircle, PauseCircle, RotateCcw, Volume2, ChevronRight, Sunrise, Target } from 'lucide-react'
import Link from 'next/link'

export default function MorningIntentionPage() {
  return (
    <div className="container max-w-4xl py-10">
      <div className="mb-8">
        <Link href="/resources/mindfulness" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-4">
          <ChevronRight className="h-4 w-4 rotate-180" />
          Back to Mindfulness
        </Link>
        <h1 className="text-4xl font-bold mb-4 flex items-center gap-3">
          <Sunrise className="h-8 w-8 text-yellow-600" />
          Morning Intention Setting
        </h1>
        <p className="text-xl text-muted-foreground">
          Start your day with clarity and purpose. Set a positive intention for your recovery journey today.
        </p>
      </div>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Quick Morning Practice</CardTitle>
          <CardDescription>
            A simple 3-minute practice to set your daily intention
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="p-6 bg-yellow-50 dark:bg-yellow-950/20 rounded-lg text-center">
            <Sunrise className="h-12 w-12 text-yellow-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Today's Practice</h3>
            <p className="text-muted-foreground mb-4">
              Take a moment to set your intention for today
            </p>
            <Link href="/resources/mindfulness/meditation/morning-recovery">
              <Button size="lg">
                <PlayCircle className="mr-2 h-5 w-5" />
                Start Morning Meditation
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-2 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Morning Intention Ideas</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm">
              <li className="flex gap-2">
                <Target className="h-4 w-4 text-primary mt-0.5" />
                <span>"Today I choose sobriety and self-care"</span>
              </li>
              <li className="flex gap-2">
                <Target className="h-4 w-4 text-primary mt-0.5" />
                <span>"I will practice patience and compassion"</span>
              </li>
              <li className="flex gap-2">
                <Target className="h-4 w-4 text-primary mt-0.5" />
                <span>"I am grateful for this new day in recovery"</span>
              </li>
              <li className="flex gap-2">
                <Target className="h-4 w-4 text-primary mt-0.5" />
                <span>"I will seek support when I need it"</span>
              </li>
              <li className="flex gap-2">
                <Target className="h-4 w-4 text-primary mt-0.5" />
                <span>"Today I focus on progress, not perfection"</span>
              </li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Steps</CardTitle>
          </CardHeader>
          <CardContent>
            <ol className="space-y-2 text-sm">
              <li>1. Find a quiet moment before starting your day</li>
              <li>2. Take three deep, centering breaths</li>
              <li>3. Ask yourself: "What do I need today?"</li>
              <li>4. Set one clear intention for the day</li>
              <li>5. Visualize yourself living this intention</li>
              <li>6. Write it down or say it aloud</li>
              <li>7. Return to it throughout the day</li>
            </ol>
          </CardContent>
        </Card>
      </div>

      <div className="text-center p-6 bg-muted/50 rounded-lg">
        <h2 className="text-2xl font-bold mb-2">Ready for a Full Practice?</h2>
        <p className="text-muted-foreground mb-4">
          Try our complete 5-minute morning recovery meditation
        </p>
        <Link href="/resources/mindfulness/meditation/morning-recovery">
          <Button>
            <Sunrise className="mr-2 h-4 w-4" />
            Start Morning Recovery Meditation
          </Button>
        </Link>
      </div>
    </div>
  )
}