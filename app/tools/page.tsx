import { Metadata } from 'next'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  Brain, 
  Shield, 
  Heart, 
  Activity,
  ClipboardList,
  Target,
  Timer,
  Wind,
  Scan,
  Calendar,
  CheckCircle,
  Map,
  ArrowRight
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'Interactive Recovery Tools | Recoverly',
  description: 'Access 11 evidence-based interactive tools for your recovery journey including CBT, DBT, mindfulness, and tracking tools.',
}

const tools = [
  {
    category: 'CBT Tools',
    icon: Brain,
    color: 'text-blue-600',
    bgColor: 'bg-blue-50 dark:bg-blue-950/20',
    tools: [
      {
        title: 'Thought Record',
        description: 'Challenge negative thoughts and identify thinking patterns',
        href: '/resources/cbt/thought-record',
        icon: ClipboardList,
        time: '10-15 min',
        type: 'Interactive'
      },
      {
        title: 'Distortion Quiz',
        description: 'Test your ability to identify cognitive distortions',
        href: '/resources/cbt/distortion-quiz',
        icon: Brain,
        time: '5-10 min',
        type: 'Quiz'
      },
      {
        title: 'Trigger Mapper',
        description: 'Map your triggers and develop coping strategies',
        href: '/resources/cbt/trigger-map',
        icon: Map,
        time: '15-20 min',
        type: 'Planning Tool'
      }
    ]
  },
  {
    category: 'DBT Tools',
    icon: Shield,
    color: 'text-purple-600',
    bgColor: 'bg-purple-50 dark:bg-purple-950/20',
    tools: [
      {
        title: 'TIPP Crisis Skills',
        description: 'Emergency techniques for intense emotions',
        href: '/resources/dbt/tipp',
        icon: Shield,
        time: '5-10 min',
        type: 'Crisis Tool'
      },
      {
        title: 'Daily Diary Card',
        description: 'Track emotions, urges, and skills used',
        href: '/resources/dbt/diary-card',
        icon: Calendar,
        time: '5 min daily',
        type: 'Tracker'
      }
    ]
  },
  {
    category: 'Mindfulness Tools',
    icon: Heart,
    color: 'text-green-600',
    bgColor: 'bg-green-50 dark:bg-green-950/20',
    tools: [
      {
        title: 'Meditation Timer',
        description: 'Customizable timer with multiple meditation styles',
        href: '/resources/mindfulness/meditation-timer',
        icon: Timer,
        time: '5-30 min',
        type: 'Timer'
      },
      {
        title: 'Breathing Exercises',
        description: 'Interactive breathing techniques for calm',
        href: '/resources/mindfulness/breathing',
        icon: Wind,
        time: '2-5 min',
        type: 'Interactive'
      },
      {
        title: 'Body Scan Guide',
        description: 'Visual guided body awareness meditation',
        href: '/resources/mindfulness/body-scan',
        icon: Scan,
        time: '10-20 min',
        type: 'Guided'
      }
    ]
  },
  {
    category: 'Daily Support Tools',
    icon: Activity,
    color: 'text-orange-600',
    bgColor: 'bg-orange-50 dark:bg-orange-950/20',
    tools: [
      {
        title: 'Sobriety Tracker',
        description: 'Track milestones and celebrate progress',
        href: '/tracker',
        icon: Target,
        time: '2 min',
        type: 'Tracker'
      },
      {
        title: 'Daily Check-in',
        description: 'Quick wellness assessment and mood tracking',
        href: '/checkin',
        icon: CheckCircle,
        time: '3-5 min',
        type: 'Daily Tool'
      },
      {
        title: 'Recovery Plan Builder',
        description: 'Create your personalized recovery roadmap',
        href: '/recovery-plan',
        icon: Map,
        time: '20-30 min',
        type: 'Planner'
      }
    ]
  }
]

export default function InteractiveToolsPage() {
  const totalTools = tools.reduce((sum, category) => sum + category.tools.length, 0)

  return (
    <div className="container max-w-7xl py-10">
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-4xl font-bold mb-4">11 Interactive Recovery Tools</h1>
        <p className="text-xl text-muted-foreground">
          Evidence-based tools you can use right now. Track progress, practice therapeutic techniques, 
          and build skills for lasting recovery - all completely free and private.
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">{totalTools}</div>
            <p className="text-xs text-muted-foreground">Interactive Tools</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">100%</div>
            <p className="text-xs text-muted-foreground">Free & Private</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">24/7</div>
            <p className="text-xs text-muted-foreground">Available Anytime</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">0</div>
            <p className="text-xs text-muted-foreground">Sign-ups Required</p>
          </CardContent>
        </Card>
      </div>

      {/* Tool Categories */}
      <div className="space-y-10">
        {tools.map((category) => {
          const CategoryIcon = category.icon
          return (
            <div key={category.category}>
              <div className="flex items-center gap-3 mb-6">
                <CategoryIcon className={`h-6 w-6 ${category.color}`} />
                <h2 className="text-2xl font-bold">{category.category}</h2>
                <Badge variant="secondary">{category.tools.length} tools</Badge>
              </div>
              
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {category.tools.map((tool) => {
                  const ToolIcon = tool.icon
                  return (
                    <Card key={tool.title} className="hover:shadow-lg transition-all hover:-translate-y-1">
                      <CardHeader>
                        <div className="flex items-start justify-between mb-2">
                          <ToolIcon className={`h-8 w-8 ${category.color}`} />
                          <div className="flex gap-2">
                            <Badge variant="outline" className="text-xs">
                              {tool.time}
                            </Badge>
                            <Badge className={`text-xs ${category.bgColor} ${category.color} border-0`}>
                              {tool.type}
                            </Badge>
                          </div>
                        </div>
                        <CardTitle className="text-lg">{tool.title}</CardTitle>
                        <CardDescription>{tool.description}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <Link href={tool.href}>
                          <Button className="w-full">
                            Start Using Tool
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </Button>
                        </Link>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>

      {/* Bottom CTA */}
      <div className="mt-16 text-center p-8 bg-primary/5 rounded-lg">
        <h2 className="text-2xl font-bold mb-4">Ready to Start?</h2>
        <p className="text-muted-foreground mb-6">
          All tools save your progress locally - your data stays private on your device.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/quiz">
            <Button size="lg">
              Take Our Quiz
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
          <Link href="/tracker">
            <Button size="lg" variant="outline">
              Start Tracking Sobriety
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}