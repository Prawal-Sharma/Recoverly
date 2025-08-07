import { notFound } from "next/navigation"
import Link from "next/link"
import { getProgramById, programs } from "@/lib/programs-data"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, ArrowRight, CheckCircle, XCircle, Users, Calendar, Globe, Sparkles, Brain, Church } from "lucide-react"

const approachIcons = {
  spiritual: <Sparkles className="h-5 w-5" />,
  secular: <Brain className="h-5 w-5" />,
  religious: <Church className="h-5 w-5" />
}

const approachLabels = {
  spiritual: "Spiritual Approach",
  secular: "Secular Approach",
  religious: "Religious Approach"
}

export function generateStaticParams() {
  return programs.map((program) => ({
    id: program.id,
  }))
}

export default function ProgramDetailPage({ params }: { params: { id: string } }) {
  const program = getProgramById(params.id)

  if (!program) {
    notFound()
  }

  return (
    <div className="container py-10 max-w-5xl">
      <Button variant="ghost" asChild className="mb-6">
        <Link href="/programs">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Programs
        </Link>
      </Button>

      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            {approachIcons[program.approach]}
            <span>{approachLabels[program.approach]}</span>
          </div>
          <span className="text-sm text-muted-foreground">•</span>
          <span className="text-sm text-muted-foreground flex items-center gap-1">
            <Calendar className="h-3 w-3" />
            Founded {program.founded}
          </span>
        </div>
        
        <h1 className="text-4xl font-bold tracking-tight mb-2">{program.fullName}</h1>
        <p className="text-xl text-muted-foreground">{program.description}</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 mb-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-600" />
              Pros
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {program.pros.map((pro, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="text-green-600 mt-1">✓</span>
                  <span>{pro}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <XCircle className="h-5 w-5 text-amber-600" />
              Considerations
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {program.cons.map((con, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="text-amber-600 mt-1">•</span>
                  <span>{con}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-8 mb-8">
        <div>
          <h2 className="text-2xl font-bold mb-4">Philosophy & Approach</h2>
          <Card>
            <CardContent className="pt-6">
              <p className="text-lg mb-4">{program.philosophy}</p>
              <h3 className="font-semibold mb-2">Key Principles:</h3>
              <ul className="space-y-1">
                {program.keyPrinciples.map((principle, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>{principle}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-4">Meeting Format</h2>
          <Card>
            <CardContent className="pt-6">
              <p>{program.meetingFormat}</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <h2 className="text-2xl font-bold mb-4">Best For</h2>
            <Card>
              <CardContent className="pt-6">
                <ul className="space-y-2">
                  {program.bestFor.map((item, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600 mt-1 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-4">May Not Be Ideal For</h2>
            <Card>
              <CardContent className="pt-6">
                <ul className="space-y-2">
                  {program.notIdealFor.map((item, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="text-amber-600 mt-1">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        {program.website && (
          <Button asChild size="lg">
            <a href={program.website} target="_blank" rel="noopener noreferrer">
              <Globe className="mr-2 h-4 w-4" />
              Visit Official Website
            </a>
          </Button>
        )}
        <Button asChild size="lg" variant="outline">
          <Link href="/meetings">
            <Users className="mr-2 h-4 w-4" />
            Find {program.name} Meetings
          </Link>
        </Button>
      </div>

      <div className="mt-12 p-6 bg-muted/50 rounded-lg text-center">
        <h3 className="text-xl font-bold mb-2">Still Exploring Your Options?</h3>
        <p className="text-muted-foreground mb-4">
          Take our assessment to get personalized program recommendations
        </p>
        <Button asChild>
          <Link href="/quiz">
            Take Assessment <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>
    </div>
  )
}