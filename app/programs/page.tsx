import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { programs } from "@/lib/programs-data"
import { ArrowRight, Users, Brain, Heart, Church, Sparkles, Calendar } from "lucide-react"

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

export default function ProgramsPage() {
  return (
    <div className="container py-10 max-w-7xl">
      <div className="mb-10">
        <h1 className="text-4xl font-bold tracking-tight mb-4">Recovery Programs</h1>
        <p className="text-xl text-muted-foreground max-w-3xl">
          Explore different recovery approaches to find the one that resonates with your beliefs and needs. 
          Remember, there's no "one size fits all" in recovery.
        </p>
      </div>

      <div className="mb-8 flex flex-wrap gap-2">
        <div className="flex items-center gap-6 text-sm">
          <div className="flex items-center gap-2">
            <div className={`p-1 rounded border ${approachColors.spiritual}`}>
              {approachIcons.spiritual}
            </div>
            <span>Spiritual</span>
          </div>
          <div className="flex items-center gap-2">
            <div className={`p-1 rounded border ${approachColors.secular}`}>
              {approachIcons.secular}
            </div>
            <span>Secular</span>
          </div>
          <div className="flex items-center gap-2">
            <div className={`p-1 rounded border ${approachColors.religious}`}>
              {approachIcons.religious}
            </div>
            <span>Religious</span>
          </div>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {programs.map((program) => (
          <Card key={program.id} className="hover:shadow-lg transition-shadow">
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
              <CardTitle className="text-2xl">{program.name}</CardTitle>
              <CardDescription className="text-base">
                {program.fullName}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                {program.description}
              </p>
              
              <div className="space-y-3 mb-4">
                <div>
                  <h4 className="font-semibold text-sm mb-1">Best For:</h4>
                  <ul className="text-sm text-muted-foreground">
                    {program.bestFor.slice(0, 2).map((item, index) => (
                      <li key={index} className="flex items-start gap-1">
                        <span className="text-primary mt-1">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <Button asChild className="w-full">
                <Link href={`/programs/${program.id}`}>
                  Learn More <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-12 p-6 bg-muted/50 rounded-lg">
        <h2 className="text-2xl font-bold mb-4">Not Sure Which Program Is Right for You?</h2>
        <p className="text-muted-foreground mb-4">
          Take our brief assessment to get personalized recommendations based on your beliefs, 
          preferences, and recovery goals.
        </p>
        <Button asChild size="lg">
          <Link href="/quiz">
            Take the Assessment <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>
    </div>
  )
}