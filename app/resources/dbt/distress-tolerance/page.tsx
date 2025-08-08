import { Metadata } from 'next'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ChevronRight, Shield, Flame, Snowflake, Activity } from 'lucide-react'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'DBT Distress Tolerance | Recovery Tools',
  description: 'Learn DBT distress tolerance skills to survive crisis without making it worse.',
}

export default function DistressTolerancePage() {
  return (
    <div className="container max-w-4xl py-10">
      <div className="mb-8">
        <Link href="/resources/dbt" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-4">
          <ChevronRight className="h-4 w-4 rotate-180" />
          Back to DBT Overview
        </Link>
        <h1 className="text-4xl font-bold mb-4 flex items-center gap-3">
          <Shield className="h-8 w-8 text-red-600" />
          DBT Distress Tolerance
        </h1>
        <p className="text-xl text-muted-foreground">
          Crisis survival skills to tolerate painful emotions and urges without making things worse.
        </p>
      </div>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Core Distress Tolerance Skills</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="p-4 border rounded-lg">
            <h3 className="font-semibold mb-2">TIPP - Change Body Chemistry</h3>
            <ul className="text-sm space-y-1 text-muted-foreground">
              <li>• Temperature - Cold water to calm quickly</li>
              <li>• Intense exercise - Burn off stress hormones</li>
              <li>• Paced breathing - Longer exhales to relax</li>
              <li>• Progressive muscle relaxation</li>
            </ul>
            <Link href="/resources/dbt/tipp">
              <Button size="sm" className="mt-3">Practice TIPP</Button>
            </Link>
          </div>

          <div className="p-4 border rounded-lg">
            <h3 className="font-semibold mb-2">ACCEPTS - Distract from Pain</h3>
            <ul className="text-sm space-y-1 text-muted-foreground">
              <li>• Activities - Do something engaging</li>
              <li>• Contributing - Help someone else</li>
              <li>• Comparisons - Perspective on your situation</li>
              <li>• Emotions - Create different feelings</li>
              <li>• Pushing away - Mental distance from pain</li>
              <li>• Thoughts - Count, do puzzles</li>
              <li>• Sensations - Safe physical sensations</li>
            </ul>
          </div>

          <div className="p-4 border rounded-lg">
            <h3 className="font-semibold mb-2">IMPROVE - Make the Moment Better</h3>
            <ul className="text-sm space-y-1 text-muted-foreground">
              <li>• Imagery - Visualize peaceful scenes</li>
              <li>• Meaning - Find purpose in the pain</li>
              <li>• Prayer - Connect with higher power</li>
              <li>• Relaxation - Release physical tension</li>
              <li>• One thing at a time - Focus on now</li>
              <li>• Vacation - Brief mental break</li>
              <li>• Encouragement - Self-compassionate talk</li>
            </ul>
          </div>

          <div className="p-4 border rounded-lg">
            <h3 className="font-semibold mb-2">Radical Acceptance</h3>
            <p className="text-sm text-muted-foreground">
              Accept reality as it is, without approval or resignation. 
              Stop fighting what you cannot change and focus energy on what you can control.
            </p>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-2">
        <Card className="hover:shadow-lg transition-shadow">
          <Link href="/resources/dbt/emotion-regulation">
            <CardHeader>
              <CardTitle className="text-lg">Next: Emotion Regulation</CardTitle>
              <CardDescription>Manage emotions effectively</CardDescription>
            </CardHeader>
          </Link>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <Link href="/resources/mindfulness/emergency">
            <CardHeader>
              <CardTitle className="text-lg">Crisis Calm Techniques</CardTitle>
              <CardDescription>Quick relief for intense moments</CardDescription>
            </CardHeader>
          </Link>
        </Card>
      </div>
    </div>
  )
}