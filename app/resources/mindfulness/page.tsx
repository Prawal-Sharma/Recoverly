import { Metadata } from 'next'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Brain, Wind, Heart, Timer, Sparkles, ChevronRight, PlayCircle, Target } from 'lucide-react'
import Link from 'next/link'
import { meditations, breathingExercises, mindfulnessTips } from '@/lib/mindfulness-data'

export const metadata: Metadata = {
  title: 'Mindfulness & Meditation | Recovery Tools',
  description: 'Guided meditations, breathing exercises, and mindfulness techniques for addiction recovery. Manage cravings, reduce anxiety, and find inner peace.',
}

const categoryIcons = {
  breath: Wind,
  'body-scan': Brain,
  'loving-kindness': Heart,
  visualization: Sparkles,
  craving: Target,
  anxiety: Brain,
}

const categoryColors = {
  breath: 'text-blue-600',
  'body-scan': 'text-green-600',
  'loving-kindness': 'text-pink-600',
  visualization: 'text-purple-600',
  craving: 'text-orange-600',
  anxiety: 'text-red-600',
}

export default function MindfulnessPage() {
  return (
    <div className="container max-w-7xl py-10">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">Mindfulness & Meditation</h1>
        <p className="text-xl text-muted-foreground">
          Discover calming practices to manage cravings, reduce stress, and build resilience in your recovery. 
          These tools help you stay present and grounded in difficult moments.
        </p>
      </div>

      {/* Introduction */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5 text-primary" />
            The Power of Mindfulness in Recovery
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground">
            Mindfulness is the practice of paying attention to the present moment without judgment. 
            In recovery, it helps you observe cravings without acting on them, manage difficult emotions, 
            and break the cycle of automatic reactions that fuel addiction.
          </p>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="space-y-2">
              <h3 className="font-semibold">Craving Management</h3>
              <p className="text-sm text-muted-foreground">
                Learn to observe cravings as temporary experiences that will pass
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold">Emotional Regulation</h3>
              <p className="text-sm text-muted-foreground">
                Respond to emotions thoughtfully rather than react impulsively
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold">Stress Reduction</h3>
              <p className="text-sm text-muted-foreground">
                Activate your body's relaxation response to manage stress naturally
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Access Tools */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Quick Access</h2>
        <div className="grid gap-4 md:grid-cols-4">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <Link href="/resources/mindfulness/timer">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Timer className="h-5 w-5 text-primary" />
                  Meditation Timer
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>Simple timer with bells</CardDescription>
              </CardContent>
            </Link>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <Link href="/resources/mindfulness/breathing">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Wind className="h-5 w-5 text-primary" />
                  Breathing Guide
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>Interactive breathing exercises</CardDescription>
              </CardContent>
            </Link>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <Link href="/resources/mindfulness/body-scan">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Brain className="h-5 w-5 text-primary" />
                  Body Scan
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>Guided body awareness</CardDescription>
              </CardContent>
            </Link>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <Link href="/resources/mindfulness/emergency">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Target className="h-5 w-5 text-primary" />
                  Crisis Calm
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>Quick relief techniques</CardDescription>
              </CardContent>
            </Link>
          </Card>
        </div>
      </div>

      {/* Guided Meditations */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Guided Meditations for Recovery</h2>
        <div className="grid gap-4 md:grid-cols-2">
          {meditations.map((meditation) => {
            const Icon = categoryIcons[meditation.category]
            const colorClass = categoryColors[meditation.category]
            
            return (
              <Card key={meditation.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <CardTitle className="text-lg flex items-center gap-2">
                        <Icon className={`h-4 w-4 ${colorClass}`} />
                        {meditation.title}
                      </CardTitle>
                      <CardDescription>{meditation.description}</CardDescription>
                    </div>
                    <div className="flex flex-col gap-1 items-end">
                      <Badge variant="outline">{meditation.duration} min</Badge>
                      <Badge variant="secondary">{meditation.difficulty}</Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex flex-wrap gap-2">
                      {meditation.benefits.map((benefit, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {benefit}
                        </Badge>
                      ))}
                    </div>
                    <Link href={`/resources/mindfulness/meditation/${meditation.id}`}>
                      <Button size="sm" className="w-full">
                        <PlayCircle className="mr-2 h-4 w-4" />
                        Start Meditation
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>

      {/* Breathing Exercises */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Breathing Exercises</CardTitle>
          <CardDescription>
            Simple techniques to calm your nervous system and manage cravings
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            {breathingExercises.map((exercise) => (
              <div key={exercise.id} className="space-y-2 p-4 border rounded-lg">
                <div className="flex items-start justify-between">
                  <h3 className="font-semibold">{exercise.name}</h3>
                  <Badge variant="outline">
                    {exercise.pattern.inhale}-
                    {exercise.pattern.hold && `${exercise.pattern.hold}-`}
                    {exercise.pattern.exhale}
                    {exercise.pattern.pause && `-${exercise.pattern.pause}`}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">{exercise.description}</p>
                <div className="flex items-center gap-2 text-sm">
                  <Wind className="h-3 w-3" />
                  <span>{exercise.rounds} rounds</span>
                </div>
                <Link href={`/resources/mindfulness/breathing/${exercise.id}`}>
                  <Button variant="outline" size="sm" className="w-full">
                    Practice
                  </Button>
                </Link>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Daily Practice Guide */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Building Your Daily Practice</CardTitle>
          <CardDescription>
            Start small and build consistency with these simple steps
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-3">
              <h3 className="font-semibold">Morning (5 minutes)</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex gap-2">
                  <span className="text-primary">1.</span>
                  Set daily intention meditation (2 min)
                </li>
                <li className="flex gap-2">
                  <span className="text-primary">2.</span>
                  Three mindful breaths (1 min)
                </li>
                <li className="flex gap-2">
                  <span className="text-primary">3.</span>
                  Gratitude reflection (2 min)
                </li>
              </ul>
            </div>
            <div className="space-y-3">
              <h3 className="font-semibold">Evening (10 minutes)</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex gap-2">
                  <span className="text-primary">1.</span>
                  Body scan relaxation (5 min)
                </li>
                <li className="flex gap-2">
                  <span className="text-primary">2.</span>
                  Reflection on the day (3 min)
                </li>
                <li className="flex gap-2">
                  <span className="text-primary">3.</span>
                  Loving-kindness practice (2 min)
                </li>
              </ul>
            </div>
          </div>
          <div className="p-4 bg-muted/50 rounded-lg">
            <p className="text-sm">
              <strong>Remember:</strong> Even one minute of mindfulness is better than none. 
              Start where you are and build gradually. The goal is progress, not perfection.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Quick Tips */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Mindfulness Quick Tips</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 md:grid-cols-2">
            {mindfulnessTips.map((tip) => (
              <div key={tip.id} className="flex gap-3">
                <Sparkles className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
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
          <CardTitle>Learn More</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <h3 className="font-semibold mb-2">Recommended Apps</h3>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>• Headspace - Guided meditations</li>
                <li>• Calm - Sleep stories and meditation</li>
                <li>• Insight Timer - Free meditation library</li>
                <li>• Ten Percent Happier - Skeptic-friendly</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Books & Resources</h3>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>• Wherever You Go, There You Are - Jon Kabat-Zinn</li>
                <li>• The Miracle of Mindfulness - Thich Nhat Hanh</li>
                <li>• Recovery Dharma book (free online)</li>
                <li>• UCLA Mindful Awareness Research Center</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Call to Action */}
      <div className="mt-8 text-center p-6 bg-muted/50 rounded-lg">
        <h2 className="text-2xl font-bold mb-2">Start Your Practice Now</h2>
        <p className="text-muted-foreground mb-4">
          Just 5 minutes of mindfulness can change your entire day
        </p>
        <Link href="/resources/mindfulness/meditation/morning-intention">
          <Button>
            <PlayCircle className="mr-2 h-4 w-4" />
            Try Morning Intention Meditation
          </Button>
        </Link>
      </div>
    </div>
  )
}