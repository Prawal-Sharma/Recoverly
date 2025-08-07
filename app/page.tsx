import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRight, Users, BookOpen, MapPin, Heart, Shield, Compass } from "lucide-react"

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-primary/10 to-background py-20 px-4 md:py-32">
        <div className="container max-w-6xl">
          <div className="text-center space-y-8">
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
              Your Recovery Journey <br />
              <span className="text-primary">Starts Here</span>
            </h1>
            <p className="mx-auto max-w-[700px] text-lg text-muted-foreground md:text-xl">
              Discover recovery programs that align with your beliefs and values. 
              Find meetings, resources, and support—all in one place.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link href="/quiz">
                  Find Your Path <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/meetings">
                  Find Meetings Near You
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 md:py-24">
        <div className="container max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Everything You Need for Recovery
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Resources, tools, and support to help you on your journey
            </p>
          </div>
          
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <Compass className="h-10 w-10 text-primary mb-2" />
                <CardTitle>Find Your Path</CardTitle>
                <CardDescription>
                  Take our quiz to discover which recovery program aligns with your beliefs and needs
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="ghost" asChild>
                  <Link href="/quiz">
                    Take the Quiz <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Users className="h-10 w-10 text-primary mb-2" />
                <CardTitle>Compare Programs</CardTitle>
                <CardDescription>
                  Explore different recovery approaches from AA to SMART Recovery and beyond
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="ghost" asChild>
                  <Link href="/programs">
                    View Programs <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <MapPin className="h-10 w-10 text-primary mb-2" />
                <CardTitle>Find Meetings</CardTitle>
                <CardDescription>
                  Locate in-person and online meetings for various recovery programs
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="ghost" asChild>
                  <Link href="/meetings">
                    Search Meetings <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <BookOpen className="h-10 w-10 text-primary mb-2" />
                <CardTitle>Educational Resources</CardTitle>
                <CardDescription>
                  Guides, articles, and tools to support your recovery journey
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="ghost" asChild>
                  <Link href="/resources">
                    Browse Resources <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Heart className="h-10 w-10 text-primary mb-2" />
                <CardTitle>Family Support</CardTitle>
                <CardDescription>
                  Resources and guidance for friends and family members
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="ghost" asChild>
                  <Link href="/resources/family">
                    Get Support <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Shield className="h-10 w-10 text-primary mb-2" />
                <CardTitle>Crisis Help</CardTitle>
                <CardDescription>
                  Immediate support and emergency resources when you need them most
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="ghost" asChild>
                  <Link href="/resources/crisis">
                    Get Help Now <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Programs Overview */}
      <section className="py-16 px-4 md:py-24 bg-muted/50">
        <div className="container max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Recovery Programs We Cover
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              No single path works for everyone. Explore your options.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>12-Step Programs</CardTitle>
                <CardDescription>Spiritual & Traditional</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <span className="font-semibold mr-2">AA:</span>
                    <span className="text-muted-foreground">The original 12-step program for alcohol addiction</span>
                  </li>
                  <li className="flex items-start">
                    <span className="font-semibold mr-2">NA:</span>
                    <span className="text-muted-foreground">Narcotics Anonymous for drug addiction</span>
                  </li>
                  <li className="flex items-start">
                    <span className="font-semibold mr-2">Celebrate Recovery:</span>
                    <span className="text-muted-foreground">Christian-based recovery program</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Alternative Programs</CardTitle>
                <CardDescription>Secular & Modern Approaches</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <span className="font-semibold mr-2">SMART Recovery:</span>
                    <span className="text-muted-foreground">Science-based, self-empowerment approach</span>
                  </li>
                  <li className="flex items-start">
                    <span className="font-semibold mr-2">Recovery Dharma:</span>
                    <span className="text-muted-foreground">Buddhist-inspired path to recovery</span>
                  </li>
                  <li className="flex items-start">
                    <span className="font-semibold mr-2">LifeRing:</span>
                    <span className="text-muted-foreground">Secular, self-directed recovery</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-8">
            <Button asChild>
              <Link href="/programs">
                Compare All Programs <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 md:py-24">
        <div className="container max-w-4xl">
          <Card className="bg-primary text-primary-foreground">
            <CardHeader className="text-center">
              <CardTitle className="text-3xl">Ready to Start Your Recovery Journey?</CardTitle>
              <CardDescription className="text-primary-foreground/80 text-lg mt-4">
                Take our quick assessment to find recovery programs that match your needs and beliefs
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <Button size="lg" variant="secondary" asChild>
                <Link href="/quiz">
                  Get Started Now <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <p className="mt-4 text-sm text-primary-foreground/60">
                Takes less than 5 minutes • Completely confidential
              </p>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  )
}