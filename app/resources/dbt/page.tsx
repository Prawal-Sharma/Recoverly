import { Metadata } from 'next'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Heart, Shield, Smile, Users, ChevronRight, Target, Zap, BookOpen } from 'lucide-react'
import Link from 'next/link'
import { dbtModules, dbtAcronyms } from '@/lib/dbt-data'

export const metadata: Metadata = {
  title: 'DBT for Recovery | Dialectical Behavior Therapy',
  description: 'Learn Dialectical Behavior Therapy skills for addiction recovery. Master mindfulness, distress tolerance, emotion regulation, and interpersonal effectiveness.',
}

const moduleIcons = {
  mindfulness: Heart,
  'distress-tolerance': Shield,
  'emotion-regulation': Smile,
  'interpersonal-effectiveness': Users,
}

const moduleColors = {
  mindfulness: 'text-blue-600',
  'distress-tolerance': 'text-red-600',
  'emotion-regulation': 'text-green-600',
  'interpersonal-effectiveness': 'text-purple-600',
}

export default function DBTPage() {
  return (
    <div className="container max-w-7xl py-10">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">Dialectical Behavior Therapy (DBT)</h1>
        <p className="text-xl text-muted-foreground">
          Build a life worth living with skills for managing emotions, tolerating distress, and improving relationships.
        </p>
      </div>

      {/* Introduction */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5 text-primary" />
            What is DBT?
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground">
            Dialectical Behavior Therapy combines acceptance and change strategies to help you build a life worth living. 
            Originally developed for borderline personality disorder, DBT has proven highly effective for addiction recovery 
            by teaching practical skills for managing intense emotions and urges without turning to substances.
          </p>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <h3 className="font-semibold">Dialectical Thinking</h3>
              <p className="text-sm text-muted-foreground">
                Hold two seemingly opposite truths at once: "I accept myself as I am AND I need to change"
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold">Skills-Based Approach</h3>
              <p className="text-sm text-muted-foreground">
                Learn concrete skills you can use immediately to handle life's challenges without substances
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Four Modules */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">The Four DBT Modules</h2>
        <div className="grid gap-4 md:grid-cols-2">
          {dbtModules.map((module) => {
            const Icon = moduleIcons[module.id as keyof typeof moduleIcons]
            const colorClass = moduleColors[module.id as keyof typeof moduleColors]
            
            return (
              <Card key={module.id} className="hover:shadow-lg transition-shadow">
                <Link href={`/resources/dbt/${module.id}`}>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span className="flex items-center gap-2">
                        <Icon className={`h-5 w-5 ${colorClass}`} />
                        {module.name}
                      </span>
                      <ChevronRight className="h-5 w-5" />
                    </CardTitle>
                    <CardDescription>{module.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <Badge variant="outline">{module.skills.length} Core Skills</Badge>
                      <p className="text-sm text-muted-foreground">
                        Key skills: {module.skills.map(s => s.name).join(', ')}
                      </p>
                    </div>
                  </CardContent>
                </Link>
              </Card>
            )
          })}
        </div>
      </div>

      {/* Interactive Tools */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">DBT Practice Tools</h2>
        <div className="grid gap-4 md:grid-cols-3">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <Link href="/resources/dbt/diary-card">
              <CardHeader>
                <CardTitle className="text-lg">Daily Diary Card</CardTitle>
                <CardDescription>Track emotions, urges, and skills used</CardDescription>
              </CardHeader>
              <CardContent>
                <Badge variant="secondary">Daily Practice</Badge>
              </CardContent>
            </Link>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <Link href="/resources/dbt/tipp">
              <CardHeader>
                <CardTitle className="text-lg">TIPP Crisis Skills</CardTitle>
                <CardDescription>Interactive guide for crisis survival techniques</CardDescription>
              </CardHeader>
              <CardContent>
                <Badge variant="secondary">Emergency Tool</Badge>
              </CardContent>
            </Link>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <Link href="/resources/dbt/skills-practice">
              <CardHeader>
                <CardTitle className="text-lg">Skills Practice</CardTitle>
                <CardDescription>Guided exercises for each module</CardDescription>
              </CardHeader>
              <CardContent>
                <Badge variant="secondary">Interactive</Badge>
              </CardContent>
            </Link>
          </Card>
        </div>
      </div>

      {/* Quick Reference - Acronyms */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Quick Reference: DBT Acronyms</CardTitle>
          <CardDescription>
            Memorable acronyms help you remember skills in the moment you need them
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 md:grid-cols-2">
            {dbtAcronyms.map((item) => (
              <div key={item.acronym} className="flex gap-3 p-3 border rounded-lg">
                <Badge className="self-start">{item.acronym}</Badge>
                <p className="text-sm">{item.full}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* How DBT Helps with Addiction */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>How DBT Helps in Recovery</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <h3 className="font-semibold flex items-center gap-2">
                <Target className="h-4 w-4 text-primary" />
                Craving Management
              </h3>
              <p className="text-sm text-muted-foreground">
                Distress tolerance skills help you "surf" urges without acting on them, 
                while TIPP can quickly reduce emotional intensity that triggers cravings.
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold flex items-center gap-2">
                <Target className="h-4 w-4 text-primary" />
                Emotional Stability
              </h3>
              <p className="text-sm text-muted-foreground">
                Emotion regulation skills reduce vulnerability to negative emotions that 
                often precede relapse, helping maintain sobriety during tough times.
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold flex items-center gap-2">
                <Target className="h-4 w-4 text-primary" />
                Relationship Repair
              </h3>
              <p className="text-sm text-muted-foreground">
                Interpersonal skills help rebuild relationships damaged by addiction and 
                create healthy boundaries with people who may trigger use.
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold flex items-center gap-2">
                <Target className="h-4 w-4 text-primary" />
                Present-Moment Awareness
              </h3>
              <p className="text-sm text-muted-foreground">
                Mindfulness skills keep you grounded in the present rather than ruminating 
                on past mistakes or future fears that can trigger relapse.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Sample Skills */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Try These Skills Today</h2>
        <div className="grid gap-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">TIPP for Intense Cravings</CardTitle>
              <Badge className="w-fit">Distress Tolerance</Badge>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm text-muted-foreground">
                When cravings feel overwhelming, use TIPP to quickly change your body chemistry:
              </p>
              <ul className="space-y-2 text-sm">
                <li className="flex gap-2">
                  <span className="font-semibold">T:</span> 
                  <span>Hold ice or splash cold water on your face</span>
                </li>
                <li className="flex gap-2">
                  <span className="font-semibold">I:</span> 
                  <span>Do intense exercise for 10-15 minutes</span>
                </li>
                <li className="flex gap-2">
                  <span className="font-semibold">P:</span> 
                  <span>Practice paced breathing (exhale longer than inhale)</span>
                </li>
                <li className="flex gap-2">
                  <span className="font-semibold">P:</span> 
                  <span>Progressive muscle relaxation</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">PLEASE for Emotional Vulnerability</CardTitle>
              <Badge className="w-fit">Emotion Regulation</Badge>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm text-muted-foreground">
                Reduce vulnerability to negative emotions with daily self-care:
              </p>
              <ul className="space-y-2 text-sm">
                <li>• Treat PhysicaL illness and take medications</li>
                <li>• Balance Eating - don't skip meals</li>
                <li>• Avoid mood-Altering substances</li>
                <li>• Balance Sleep - aim for 7-9 hours</li>
                <li>• Get Exercise - even 20 minutes helps</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Resources */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>DBT Resources</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <h3 className="font-semibold mb-2">Recommended Books</h3>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>• DBT Skills Training Manual by Marsha Linehan</li>
                <li>• The Dialectical Behavior Therapy Skills Workbook</li>
                <li>• DBT Made Simple by Sheri Van Dijk</li>
                <li>• Calming the Emotional Storm</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Online Resources</h3>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>• DBT Self Help website</li>
                <li>• Behavioral Tech (Linehan's organization)</li>
                <li>• DBT peer support groups</li>
                <li>• YouTube: DBT skill demonstrations</li>
              </ul>
            </div>
          </div>
          <div className="pt-4 border-t">
            <p className="text-sm text-muted-foreground">
              <strong>Note:</strong> DBT skills are powerful tools for recovery, but work best as part of 
              a comprehensive treatment approach. Consider joining a DBT skills group or working with a 
              DBT-trained therapist.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Call to Action */}
      <div className="text-center p-6 bg-muted/50 rounded-lg">
        <h2 className="text-2xl font-bold mb-2">Start Building Your Life Worth Living</h2>
        <p className="text-muted-foreground mb-4">
          Begin with the foundation - mindfulness skills
        </p>
        <Link href="/resources/dbt/mindfulness">
          <Button>
            <BookOpen className="mr-2 h-4 w-4" />
            Explore Mindfulness Module
          </Button>
        </Link>
      </div>
    </div>
  )
}