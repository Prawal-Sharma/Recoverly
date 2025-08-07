import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { ArrowLeft, Brain, Pause, Activity, Users, Shield, Zap, Timer, Heart } from "lucide-react"

export default function CopingStrategiesPage() {
  return (
    <div className="container max-w-4xl py-10">
      <Button variant="ghost" asChild className="mb-6">
        <Link href="/resources">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Resources
        </Link>
      </Button>

      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">Coping Strategies Toolkit</h1>
        <p className="text-xl text-muted-foreground">
          Practical techniques to manage cravings, stress, and difficult emotions in recovery.
        </p>
      </div>

      {/* HALT Technique */}
      <Card className="mb-8 border-primary">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-2xl">The HALT Technique</CardTitle>
            <Badge variant="default">Essential Tool</Badge>
          </div>
          <CardDescription>Check in with yourself when cravings hit</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="mb-4 text-muted-foreground">
            HALT is a simple acronym to help identify vulnerable states that can trigger cravings:
          </p>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-3">
              <div>
                <h3 className="font-bold text-lg">H - Hungry</h3>
                <p className="text-muted-foreground">Low blood sugar affects mood and decision-making. Eat regular, nutritious meals.</p>
              </div>
              <div>
                <h3 className="font-bold text-lg">A - Angry</h3>
                <p className="text-muted-foreground">Anger and frustration can trigger impulsive decisions. Process emotions healthily.</p>
              </div>
            </div>
            <div className="space-y-3">
              <div>
                <h3 className="font-bold text-lg">L - Lonely</h3>
                <p className="text-muted-foreground">Isolation can lead to negative thinking. Reach out for connection and support.</p>
              </div>
              <div>
                <h3 className="font-bold text-lg">T - Tired</h3>
                <p className="text-muted-foreground">Exhaustion weakens willpower. Prioritize rest and good sleep hygiene.</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Immediate Coping Strategies */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="text-2xl flex items-center gap-2">
            <Zap className="h-6 w-6 text-primary" />
            Immediate Coping Strategies
          </CardTitle>
          <CardDescription>Quick techniques for when cravings strike</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <Timer className="h-5 w-5 text-primary mt-1" />
              <div>
                <h3 className="font-semibold mb-1">The 5-Minute Rule</h3>
                <p className="text-muted-foreground">Tell yourself to wait just 5 minutes. Often cravings pass quickly. If still struggling after 5 minutes, wait another 5.</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Activity className="h-5 w-5 text-primary mt-1" />
              <div>
                <h3 className="font-semibold mb-1">Change Your Environment</h3>
                <p className="text-muted-foreground">Go for a walk, move to a different room, or step outside. Physical movement can shift your mental state.</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Brain className="h-5 w-5 text-primary mt-1" />
              <div>
                <h3 className="font-semibold mb-1">Urge Surfing</h3>
                <p className="text-muted-foreground">Visualize the craving as a wave. Watch it rise, peak, and fall without acting on it. Cravings always pass.</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Users className="h-5 w-5 text-primary mt-1" />
              <div>
                <h3 className="font-semibold mb-1">Call Someone</h3>
                <p className="text-muted-foreground">Reach out to a sponsor, friend, or support person. Sometimes just talking helps the craving pass.</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Distraction Techniques */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="text-2xl">Distraction Techniques</CardTitle>
          <CardDescription>Redirect your focus when thoughts become overwhelming</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 md:grid-cols-2">
            <div>
              <h3 className="font-semibold mb-2">Mental Distractions</h3>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>• Count backwards from 100 by 7s</li>
                <li>• Name 5 things you see, 4 you hear, 3 you touch</li>
                <li>• Recite lyrics or poems</li>
                <li>• Do a crossword or sudoku</li>
                <li>• Plan your ideal vacation in detail</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Physical Distractions</h3>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>• Take a cold shower</li>
                <li>• Do 20 jumping jacks</li>
                <li>• Clean or organize something</li>
                <li>• Cook a healthy meal</li>
                <li>• Work on a hobby or craft</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Mindfulness & Breathing */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="text-2xl flex items-center gap-2">
            <Pause className="h-6 w-6 text-primary" />
            Mindfulness & Breathing
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">4-7-8 Breathing Technique</h3>
              <ol className="space-y-1 text-muted-foreground list-decimal list-inside">
                <li>Exhale completely</li>
                <li>Inhale through nose for 4 counts</li>
                <li>Hold breath for 7 counts</li>
                <li>Exhale through mouth for 8 counts</li>
                <li>Repeat 3-4 times</li>
              </ol>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Body Scan Meditation</h3>
              <p className="text-muted-foreground">
                Starting at your toes, slowly focus on each part of your body. Notice sensations without judgment. 
                This grounds you in the present moment.
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-2">STOP Technique</h3>
              <ul className="space-y-1 text-muted-foreground">
                <li><strong>S</strong> - Stop what you're doing</li>
                <li><strong>T</strong> - Take a breath</li>
                <li><strong>O</strong> - Observe your thoughts and feelings</li>
                <li><strong>P</strong> - Proceed with intention</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Long-term Strategies */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="text-2xl flex items-center gap-2">
            <Shield className="h-6 w-6 text-primary" />
            Long-term Resilience Building
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div>
              <h3 className="font-semibold mb-1">Develop Healthy Routines</h3>
              <p className="text-muted-foreground">Regular sleep, exercise, and meal times create stability and reduce stress.</p>
            </div>

            <div>
              <h3 className="font-semibold mb-1">Build Your Support Network</h3>
              <p className="text-muted-foreground">Cultivate relationships with people who support your recovery. Isolation is dangerous.</p>
            </div>

            <div>
              <h3 className="font-semibold mb-1">Practice Self-Compassion</h3>
              <p className="text-muted-foreground">Treat yourself with kindness. Recovery is hard, and perfection isn't the goal - progress is.</p>
            </div>

            <div>
              <h3 className="font-semibold mb-1">Find Meaning and Purpose</h3>
              <p className="text-muted-foreground">Engage in activities that give your life meaning - volunteering, creative pursuits, helping others.</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Emergency Toolkit */}
      <Card className="mb-8 border-red-200">
        <CardHeader>
          <CardTitle className="text-2xl text-red-900 dark:text-red-100">Emergency Craving Kit</CardTitle>
          <CardDescription>Keep these ready for tough moments</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <p className="font-semibold mb-3">Create a physical or digital kit with:</p>
            <ul className="space-y-2 text-muted-foreground">
              <li className="flex items-start gap-2">
                <Heart className="h-4 w-4 text-red-600 mt-1" />
                <span>List of reasons you're in recovery</span>
              </li>
              <li className="flex items-start gap-2">
                <Heart className="h-4 w-4 text-red-600 mt-1" />
                <span>Photos of loved ones or meaningful moments</span>
              </li>
              <li className="flex items-start gap-2">
                <Heart className="h-4 w-4 text-red-600 mt-1" />
                <span>Emergency contact numbers</span>
              </li>
              <li className="flex items-start gap-2">
                <Heart className="h-4 w-4 text-red-600 mt-1" />
                <span>Favorite recovery quotes or affirmations</span>
              </li>
              <li className="flex items-start gap-2">
                <Heart className="h-4 w-4 text-red-600 mt-1" />
                <span>List of activities that help you feel better</span>
              </li>
              <li className="flex items-start gap-2">
                <Heart className="h-4 w-4 text-red-600 mt-1" />
                <span>Recovery app or meditation app</span>
              </li>
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* Remember Section */}
      <Card className="mb-8 bg-primary/5">
        <CardContent className="pt-6">
          <h3 className="font-semibold mb-3 text-center">Remember</h3>
          <div className="space-y-2 text-center text-muted-foreground">
            <p>• Cravings are temporary - they always pass</p>
            <p>• You've survived 100% of your worst days</p>
            <p>• It's okay to ask for help</p>
            <p>• Progress, not perfection</p>
            <p>• One moment at a time</p>
          </div>
        </CardContent>
      </Card>

      {/* CTA */}
      <div className="text-center space-y-4">
        <h2 className="text-2xl font-bold">Need More Support?</h2>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button size="lg" asChild>
            <Link href="/meetings">
              Find Support Meetings
            </Link>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <Link href="/resources/crisis">
              Crisis Resources
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}