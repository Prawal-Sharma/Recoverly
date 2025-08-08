import { Metadata } from 'next'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ChevronRight, Users, MessageCircle, Heart } from 'lucide-react'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'DBT Interpersonal Effectiveness | Recovery Tools',
  description: 'Build healthy relationships and communicate effectively in recovery.',
}

export default function InterpersonalEffectivenessPage() {
  return (
    <div className="container max-w-4xl py-10">
      <div className="mb-8">
        <Link href="/resources/dbt" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-4">
          <ChevronRight className="h-4 w-4 rotate-180" />
          Back to DBT Overview
        </Link>
        <h1 className="text-4xl font-bold mb-4 flex items-center gap-3">
          <Users className="h-8 w-8 text-purple-600" />
          DBT Interpersonal Effectiveness
        </h1>
        <p className="text-xl text-muted-foreground">
          Skills for asking for what you need, saying no, and maintaining relationships while respecting yourself.
        </p>
      </div>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Core Interpersonal Skills</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="p-4 border rounded-lg">
            <h3 className="font-semibold mb-2">DEARMAN - Getting What You Want</h3>
            <ul className="text-sm space-y-1 text-muted-foreground">
              <li>• <strong>D</strong>escribe - State the facts</li>
              <li>• <strong>E</strong>xpress - Share your feelings</li>
              <li>• <strong>A</strong>ssert - Ask clearly for what you want</li>
              <li>• <strong>R</strong>einforce - Explain benefits</li>
              <li>• <strong>M</strong>indful - Stay focused on your goal</li>
              <li>• <strong>A</strong>ppear confident - Eye contact, steady voice</li>
              <li>• <strong>N</strong>egotiate - Be willing to compromise</li>
            </ul>
          </div>

          <div className="p-4 border rounded-lg">
            <h3 className="font-semibold mb-2">GIVE - Maintaining Relationships</h3>
            <ul className="text-sm space-y-1 text-muted-foreground">
              <li>• <strong>G</strong>entle - Be kind, no attacks</li>
              <li>• <strong>I</strong>nterested - Listen actively</li>
              <li>• <strong>V</strong>alidate - Acknowledge their perspective</li>
              <li>• <strong>E</strong>asy manner - Use humor, smile</li>
            </ul>
          </div>

          <div className="p-4 border rounded-lg">
            <h3 className="font-semibold mb-2">FAST - Maintaining Self-Respect</h3>
            <ul className="text-sm space-y-1 text-muted-foreground">
              <li>• <strong>F</strong>air - Be fair to yourself and others</li>
              <li>• <strong>A</strong>pologies - Don't over-apologize</li>
              <li>• <strong>S</strong>tick to values - Don't compromise your values</li>
              <li>• <strong>T</strong>ruthful - Be honest, don't lie</li>
            </ul>
          </div>

          <div className="p-4 border rounded-lg">
            <h3 className="font-semibold mb-2">Setting Boundaries</h3>
            <p className="text-sm text-muted-foreground">
              Learn to say no effectively while maintaining relationships:
            </p>
            <ul className="text-sm space-y-1 text-muted-foreground mt-2">
              <li>• Be clear and direct</li>
              <li>• Don't over-explain or justify</li>
              <li>• Offer alternatives when appropriate</li>
              <li>• Stay firm but respectful</li>
            </ul>
          </div>
        </CardContent>
      </Card>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Recovery-Specific Applications</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="p-3 border rounded-lg">
            <p className="font-semibold text-sm">Asking for support when struggling</p>
            <p className="text-sm text-muted-foreground">Use DEARMAN to clearly ask for help</p>
          </div>
          <div className="p-3 border rounded-lg">
            <p className="font-semibold text-sm">Setting boundaries with users</p>
            <p className="text-sm text-muted-foreground">Use FAST to maintain self-respect</p>
          </div>
          <div className="p-3 border rounded-lg">
            <p className="font-semibold text-sm">Repairing damaged relationships</p>
            <p className="text-sm text-muted-foreground">Use GIVE to rebuild trust</p>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-2">
        <Card className="hover:shadow-lg transition-shadow">
          <Link href="/resources/dbt/skills-practice">
            <CardHeader>
              <CardTitle className="text-lg">Skills Practice</CardTitle>
              <CardDescription>Practice all DBT skills</CardDescription>
            </CardHeader>
          </Link>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <Link href="/resources/dbt/diary-card">
            <CardHeader>
              <CardTitle className="text-lg">Daily Diary Card</CardTitle>
              <CardDescription>Track your skill usage</CardDescription>
            </CardHeader>
          </Link>
        </Card>
      </div>
    </div>
  )
}