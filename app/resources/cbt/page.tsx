import { Metadata } from 'next'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Brain, Target, Lightbulb, Clock, ChevronRight, BookOpen, Activity } from 'lucide-react'
import Link from 'next/link'
import { cognitiveDistortions, cbtExercises, cbtTips } from '@/lib/cbt-data'

export const metadata: Metadata = {
  title: 'CBT for Recovery | Cognitive Behavioral Therapy',
  description: 'Learn Cognitive Behavioral Therapy techniques for addiction recovery. Interactive exercises, thought challenging, and evidence-based strategies.',
}

export default function CBTPage() {
  return (
    <div className="container max-w-7xl py-10">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">Cognitive Behavioral Therapy (CBT)</h1>
        <p className="text-xl text-muted-foreground">
          Evidence-based techniques to change negative thought patterns and behaviors that contribute to addiction.
        </p>
      </div>

      {/* Introduction Card */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5 text-primary" />
            What is CBT?
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground">
            Cognitive Behavioral Therapy is a practical, goal-oriented approach that helps you identify and change 
            destructive thought patterns that negatively influence behavior and emotions. In addiction recovery, 
            CBT helps you recognize triggers, develop coping strategies, and build healthier thinking patterns.
          </p>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="space-y-2">
              <h3 className="font-semibold">Identify</h3>
              <p className="text-sm text-muted-foreground">
                Recognize negative thoughts and behaviors that fuel addiction
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold">Challenge</h3>
              <p className="text-sm text-muted-foreground">
                Question and reframe distorted thinking patterns
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold">Replace</h3>
              <p className="text-sm text-muted-foreground">
                Develop healthier thoughts and coping strategies
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Interactive Tools */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Interactive CBT Tools</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <Link href="/resources/cbt/thought-record">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  Thought Record
                  <ChevronRight className="h-5 w-5" />
                </CardTitle>
                <CardDescription>
                  Track and challenge automatic negative thoughts
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Badge variant="secondary">Interactive</Badge>
              </CardContent>
            </Link>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <Link href="/resources/cbt/distortions">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  Cognitive Distortions
                  <ChevronRight className="h-5 w-5" />
                </CardTitle>
                <CardDescription>
                  Identify thinking errors that fuel addiction
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Badge variant="secondary">Educational</Badge>
              </CardContent>
            </Link>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <Link href="/resources/cbt/trigger-map">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  Trigger Mapper
                  <ChevronRight className="h-5 w-5" />
                </CardTitle>
                <CardDescription>
                  Map your triggers and create coping strategies
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Badge variant="secondary">Planning Tool</Badge>
              </CardContent>
            </Link>
          </Card>
        </div>
      </div>

      {/* Cognitive Distortions */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Common Cognitive Distortions in Addiction</CardTitle>
          <CardDescription>
            Recognizing these thinking patterns is the first step to changing them
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            {cognitiveDistortions.slice(0, 6).map((distortion) => (
              <div key={distortion.id} className="space-y-2 p-4 border rounded-lg">
                <h3 className="font-semibold">{distortion.name}</h3>
                <p className="text-sm text-muted-foreground">{distortion.description}</p>
                <p className="text-sm italic">Example: "{distortion.example}"</p>
              </div>
            ))}
          </div>
          <div className="mt-4">
            <Link href="/resources/cbt/distortions">
              <Button variant="outline">
                View All Distortions
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>

      {/* CBT Exercises */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">CBT Exercises for Recovery</h2>
        <div className="grid gap-4">
          {cbtExercises.slice(0, 4).map((exercise) => (
            <Card key={exercise.id}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-lg">{exercise.title}</CardTitle>
                    <CardDescription>{exercise.description}</CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <Badge variant="outline">
                      <Clock className="mr-1 h-3 w-3" />
                      {exercise.duration}
                    </Badge>
                    <Badge variant={
                      exercise.difficulty === 'beginner' ? 'default' :
                      exercise.difficulty === 'intermediate' ? 'secondary' : 'outline'
                    }>
                      {exercise.difficulty}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-3">
                  Category: {exercise.category}
                </p>
                <Link href={`/resources/cbt/exercises/${exercise.id}`}>
                  <Button variant="outline" size="sm">
                    <Activity className="mr-2 h-4 w-4" />
                    Start Exercise
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Quick Tips */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lightbulb className="h-5 w-5 text-primary" />
            Quick CBT Tips for Recovery
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 md:grid-cols-2">
            {cbtTips.map((tip) => (
              <div key={tip.id} className="flex gap-3">
                <Target className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                <div>
                  <Badge variant="outline" className="mb-1">{tip.category}</Badge>
                  <p className="text-sm">{tip.tip}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Resources */}
      <Card>
        <CardHeader>
          <CardTitle>Learn More About CBT</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <h3 className="font-semibold mb-2">Recommended Reading</h3>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>• Feeling Good by David Burns</li>
                <li>• Mind Over Mood by Greenberger & Padesky</li>
                <li>• The CBT Workbook for Addiction</li>
                <li>• Cognitive Therapy of Substance Abuse</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Online Resources</h3>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>• Beck Institute for Cognitive Therapy</li>
                <li>• Association for Behavioral and Cognitive Therapies</li>
                <li>• SMART Recovery (CBT-based program)</li>
                <li>• Psychology Tools worksheets</li>
              </ul>
            </div>
          </div>
          <div className="pt-4 border-t">
            <p className="text-sm text-muted-foreground">
              <strong>Note:</strong> While these exercises are helpful, they work best when combined with 
              professional therapy and a comprehensive recovery program. Consider working with a therapist 
              trained in CBT for addiction.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Call to Action */}
      <div className="mt-8 text-center p-6 bg-muted/50 rounded-lg">
        <h2 className="text-2xl font-bold mb-2">Ready to Start?</h2>
        <p className="text-muted-foreground mb-4">
          Begin with a simple thought record to track your thinking patterns
        </p>
        <Link href="/resources/cbt/thought-record">
          <Button>
            <BookOpen className="mr-2 h-4 w-4" />
            Start Thought Record
          </Button>
        </Link>
      </div>
    </div>
  )
}