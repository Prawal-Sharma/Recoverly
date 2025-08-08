import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { programs } from "@/lib/programs-data"
import { ArrowRight, Users, Brain, Heart, Church, Sparkles, Calendar, Filter, Check } from "lucide-react"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: 'Recovery Programs | Find Your Path',
  description: 'Explore 17 different recovery programs including AA, NA, SMART Recovery, Al-Anon, and more. Find the right approach for your recovery journey.',
}

const approachIcons = {
  spiritual: <Sparkles className="h-5 w-5" />,
  secular: <Brain className="h-5 w-5" />,
  religious: <Church className="h-5 w-5" />
}

const approachColors = {
  spiritual: "text-purple-600 bg-purple-50 border-purple-200",
  secular: "text-blue-600 bg-blue-50 border-blue-200",
  religious: "text-amber-600 bg-amber-50 border-amber-200"
}

// Organize programs by category
const programCategories = [
  {
    title: "Substance Recovery Programs",
    description: "For those recovering from alcohol and drug addiction",
    programs: programs.filter(p => ['aa', 'na', 'smart', 'lifering', 'sos', 'celebrate', 'dharma', 'refuge'].includes(p.id))
  },
  {
    title: "Family & Friends Support",
    description: "For loved ones affected by someone else's addiction",
    programs: programs.filter(p => ['alanon', 'aca', 'coda'].includes(p.id))
  },
  {
    title: "Moderation & Harm Reduction",
    description: "Alternative approaches to complete abstinence",
    programs: programs.filter(p => ['hams', 'mm'].includes(p.id))
  },
  {
    title: "Behavioral & Process Addictions",
    description: "For gambling, eating, sex, and other behavioral addictions",
    programs: programs.filter(p => ['ga', 'oa', 'saa'].includes(p.id))
  },
  {
    title: "Specialized Programs",
    description: "Programs designed for specific populations",
    programs: programs.filter(p => ['wfs'].includes(p.id))
  }
]

export default function ProgramsPage() {
  return (
    <div className="container py-10 max-w-7xl">
      {/* Header Section */}
      <div className="mb-10">
        <div className="flex items-center gap-2 mb-4">
          <h1 className="text-4xl font-bold tracking-tight">Recovery Programs for Your Journey</h1>
          <Badge variant="secondary" className="text-lg px-3 py-1">
            {programs.length} Programs
          </Badge>
        </div>
        <p className="text-xl text-muted-foreground max-w-3xl">
          Discover recovery approaches that align with your values and support your unique journey. 
          Every path to recovery is valid—what matters is finding what works for you.
        </p>
      </div>

      {/* Approach Legend */}
      <div className="mb-8 p-4 bg-muted/30 rounded-lg">
        <div className="flex flex-wrap items-center gap-6">
          <span className="text-sm font-medium">Program Approaches:</span>
          <div className="flex flex-wrap gap-4 text-sm">
            <div className="flex items-center gap-2">
              <div className={`p-1 rounded border ${approachColors.spiritual}`}>
                {approachIcons.spiritual}
              </div>
              <span>Spiritual (Higher Power)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className={`p-1 rounded border ${approachColors.secular}`}>
                {approachIcons.secular}
              </div>
              <span>Secular (Non-religious)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className={`p-1 rounded border ${approachColors.religious}`}>
                {approachIcons.religious}
              </div>
              <span>Religious (Faith-based)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid gap-4 md:grid-cols-4 mb-10">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">12-Step Programs</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">7</p>
            <p className="text-sm text-muted-foreground">Traditional approach</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Secular Options</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">6</p>
            <p className="text-sm text-muted-foreground">Non-religious paths</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Family Programs</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">3</p>
            <p className="text-sm text-muted-foreground">Support for loved ones</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Online Available</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">All</p>
            <p className="text-sm text-muted-foreground">Virtual meetings</p>
          </CardContent>
        </Card>
      </div>

      {/* Programs by Category */}
      <div className="space-y-12">
        {programCategories.map((category, categoryIndex) => (
          <div key={categoryIndex} className="space-y-6">
            <div className="border-b pb-4">
              <h2 className="text-2xl font-bold mb-2">{category.title}</h2>
              <p className="text-muted-foreground">{category.description}</p>
            </div>
            
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {category.programs.map((program) => (
                <Card key={program.id} className="hover:shadow-lg transition-all hover:-translate-y-1">
                  <CardHeader>
                    <div className="flex items-start justify-between mb-2">
                      <div className={`p-2 rounded-lg border ${approachColors[program.approach]}`}>
                        {approachIcons[program.approach]}
                      </div>
                      <span className="text-sm text-muted-foreground flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        Since {program.founded}
                      </span>
                    </div>
                    <CardTitle className="text-xl">{program.name}</CardTitle>
                    <CardDescription className="text-sm font-medium">
                      {program.fullName}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                      {program.description}
                    </p>
                    
                    <div className="space-y-3 mb-4">
                      <div>
                        <h4 className="font-semibold text-xs mb-2 text-muted-foreground uppercase tracking-wide">
                          Key Features
                        </h4>
                        <div className="flex flex-wrap gap-1">
                          {program.keyPrinciples.slice(0, 3).map((principle, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {principle.split(' ').slice(0, 3).join(' ')}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold text-xs mb-1 text-muted-foreground uppercase tracking-wide">
                          Best For
                        </h4>
                        <ul className="text-sm text-muted-foreground space-y-1">
                          {program.bestFor.slice(0, 2).map((item, index) => (
                            <li key={index} className="flex items-start gap-1">
                              <Check className="h-3 w-3 text-green-600 mt-0.5 flex-shrink-0" />
                              <span className="text-xs">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <Button asChild className="w-full" variant="outline">
                      <Link href={`/programs/${program.id}`}>
                        Learn More <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* CTA Section */}
      <div className="mt-16 grid gap-6 md:grid-cols-2">
        <Card className="bg-primary/5 border-primary/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Need Help Choosing?
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              Take our brief assessment to get personalized recommendations based on your beliefs, 
              preferences, and recovery goals.
            </p>
            <Button asChild>
              <Link href="/quiz">
                Take the Assessment <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="bg-primary/5 border-primary/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Heart className="h-5 w-5" />
              Find a Meeting Today
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              Ready to take the first step? Browse online and in-person meetings 
              happening today across all programs.
            </p>
            <Button asChild>
              <Link href="/meetings">
                Find Meetings <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Footer Note */}
      <div className="mt-12 p-6 bg-muted/30 rounded-lg text-center">
        <p className="text-sm text-muted-foreground">
          <strong>Remember:</strong> There's no "right" or "wrong" program. The best program is the one that 
          helps you achieve and maintain recovery. Many people try several programs before finding their fit, 
          and some combine elements from multiple approaches.
        </p>
      </div>
    </div>
  )
}