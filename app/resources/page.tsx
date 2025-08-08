import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BookOpen, Users, Heart, Shield, Brain, Lightbulb, Target, AlertTriangle, ArrowRight } from "lucide-react"

const resources = [
  {
    title: "First Meeting Guide",
    description: "Everything you need to know before attending your first recovery meeting",
    icon: Users,
    href: "/resources/first-meeting",
    topics: ["What to expect", "Meeting etiquette", "Common concerns", "Tips for success"]
  },
  {
    title: "Coping Strategies",
    description: "Practical tools and techniques for managing cravings and difficult emotions",
    icon: Brain,
    href: "/resources/coping",
    topics: ["HALT technique", "Mindfulness", "Distraction methods", "Emergency toolkit"]
  },
  {
    title: "Family Support",
    description: "Resources for loved ones supporting someone in recovery",
    icon: Heart,
    href: "/resources/family",
    topics: ["Understanding addiction", "Setting boundaries", "Communication tips", "Self-care"]
  },
  {
    title: "Crisis Help",
    description: "Immediate support and resources for crisis situations",
    icon: AlertTriangle,
    href: "/resources/crisis",
    topics: ["24/7 hotlines", "Emergency contacts", "Safety planning", "What to do"]
  }
]

const additionalResources = [
  {
    title: "Understanding Addiction",
    description: "Learn about the science of addiction and recovery",
    icon: BookOpen
  },
  {
    title: "Relapse Prevention",
    description: "Strategies to maintain long-term recovery",
    icon: Shield
  },
  {
    title: "Building New Habits",
    description: "Creating positive routines and lifestyle changes",
    icon: Target
  },
  {
    title: "Finding Purpose",
    description: "Discovering meaning and goals in recovery",
    icon: Lightbulb
  }
]

export default function ResourcesPage() {
  return (
    <div className="container max-w-7xl py-10">
      <div className="mb-10">
        <h1 className="text-4xl font-bold mb-4">Interactive Recovery Tools</h1>
        <p className="text-xl text-muted-foreground">
          11 fully-functional interactive tools to support your recovery journey. 
          Practice CBT, DBT, mindfulness, track progress, and build your personalized recovery toolkit - all tools are working and ready to use.
        </p>
      </div>

      {/* Main Resources */}
      <div className="grid gap-6 md:grid-cols-2 mb-12">
        {resources.map((resource) => {
          const Icon = resource.icon
          return (
            <Card key={resource.title} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <Icon className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-xl">{resource.title}</CardTitle>
                <CardDescription>{resource.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <p className="text-sm font-semibold mb-2">Topics covered:</p>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    {resource.topics.map((topic) => (
                      <li key={topic} className="flex items-start gap-1">
                        <span className="text-primary mt-0.5">•</span>
                        <span>{topic}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <Button asChild className="w-full">
                  <Link href={resource.href}>
                    Read Guide <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Helpful Links */}
      <Card>
        <CardHeader>
          <CardTitle>Additional Support</CardTitle>
          <CardDescription>External resources and organizations</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <h3 className="font-semibold mb-2">National Organizations</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="https://www.samhsa.gov" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                    SAMHSA - Substance Abuse and Mental Health Services
                  </a>
                </li>
                <li>
                  <a href="https://www.niaaa.nih.gov" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                    NIAAA - National Institute on Alcohol Abuse
                  </a>
                </li>
                <li>
                  <a href="https://nida.nih.gov" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                    NIDA - National Institute on Drug Abuse
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Educational Resources</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="https://www.recovery.org" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                    Recovery.org - Information and Resources
                  </a>
                </li>
                <li>
                  <a href="https://www.rethinkingdrinking.niaaa.nih.gov" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                    Rethinking Drinking
                  </a>
                </li>
                <li>
                  <a href="https://www.facesandvoicesofrecovery.org" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                    Faces & Voices of Recovery
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="mt-8 text-center">
        <Card className="bg-primary text-primary-foreground">
          <CardHeader>
            <CardTitle>Need Immediate Help?</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4">If you're in crisis or need immediate support, help is available 24/7.</p>
            <Button size="lg" variant="secondary" asChild>
              <Link href="/resources/crisis">
                Access Crisis Resources
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}