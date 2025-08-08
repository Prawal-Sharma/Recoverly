import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRight, Users, BookOpen, MapPin, Heart, Shield, Compass } from "lucide-react"

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-primary/10 to-background py-16 px-4 sm:py-20 md:py-32">
        <div className="container max-w-6xl">
          <div className="text-center space-y-6 sm:space-y-8">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl">
              Your Recovery Journey <br className="hidden sm:block" />
              <span className="block sm:inline text-primary">Starts Here</span>
            </h1>
            <p className="mx-auto max-w-[600px] text-base text-muted-foreground sm:text-lg md:text-xl px-4 sm:px-0">
              Discover recovery programs that align with your beliefs and values. 
              Find meetings, resources, and support—all in one place.
            </p>
            <div className="flex flex-col gap-3 justify-center px-4 sm:px-0 sm:flex-row sm:gap-4">
              <Button size="lg" asChild className="w-full sm:w-auto min-h-[44px] text-base">
                <Link href="/quiz">
                  Find Your Path <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="w-full sm:w-auto min-h-[44px] text-base">
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
                <CardTitle>Interactive Tools</CardTitle>
                <CardDescription>
                  11 evidence-based tools including CBT, DBT, mindfulness, and daily tracking
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="ghost" asChild>
                  <Link href="/tools">
                    Try Interactive Tools <ArrowRight className="ml-2 h-4 w-4" />
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
              17 Recovery Programs Available
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              From traditional 12-step to modern alternatives - find the approach that resonates with you
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 mb-8">
            <Card className="border-2 hover:border-primary/50 transition-colors">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center justify-between">
                  Substance Recovery
                  <span className="text-2xl font-bold text-primary">8</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-2">
                  For alcohol and drug addiction
                </p>
                <div className="flex flex-wrap gap-1">
                  <span className="text-xs bg-muted px-2 py-1 rounded">AA</span>
                  <span className="text-xs bg-muted px-2 py-1 rounded">NA</span>
                  <span className="text-xs bg-muted px-2 py-1 rounded">SMART</span>
                  <span className="text-xs bg-muted px-2 py-1 rounded">LifeRing</span>
                  <span className="text-xs bg-muted px-2 py-1 rounded">+4 more</span>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-primary/50 transition-colors">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center justify-between">
                  Family & Friends
                  <span className="text-2xl font-bold text-primary">3</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-2">
                  Support for loved ones
                </p>
                <div className="flex flex-wrap gap-1">
                  <span className="text-xs bg-muted px-2 py-1 rounded">Al-Anon</span>
                  <span className="text-xs bg-muted px-2 py-1 rounded">CoDA</span>
                  <span className="text-xs bg-muted px-2 py-1 rounded">ACA</span>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-primary/50 transition-colors">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center justify-between">
                  Behavioral
                  <span className="text-2xl font-bold text-primary">4</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-2">
                  Gambling, eating, and more
                </p>
                <div className="flex flex-wrap gap-1">
                  <span className="text-xs bg-muted px-2 py-1 rounded">GA</span>
                  <span className="text-xs bg-muted px-2 py-1 rounded">OA</span>
                  <span className="text-xs bg-muted px-2 py-1 rounded">SAA</span>
                  <span className="text-xs bg-muted px-2 py-1 rounded">+1 more</span>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-primary/50 transition-colors">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center justify-between">
                  Mindfulness-Based
                  <span className="text-2xl font-bold text-primary">2</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-2">
                  Buddhist-inspired paths
                </p>
                <div className="flex flex-wrap gap-1">
                  <span className="text-xs bg-muted px-2 py-1 rounded">Recovery Dharma</span>
                  <span className="text-xs bg-muted px-2 py-1 rounded">Refuge Recovery</span>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-primary/50 transition-colors">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center justify-between">
                  Moderation
                  <span className="text-2xl font-bold text-primary">2</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-2">
                  Harm reduction approach
                </p>
                <div className="flex flex-wrap gap-1">
                  <span className="text-xs bg-muted px-2 py-1 rounded">HAMS</span>
                  <span className="text-xs bg-muted px-2 py-1 rounded">MM</span>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-primary/50 transition-colors">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center justify-between">
                  Specialized
                  <span className="text-2xl font-bold text-primary">1</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-2">
                  Women-specific recovery
                </p>
                <div className="flex flex-wrap gap-1">
                  <span className="text-xs bg-muted px-2 py-1 rounded">Women for Sobriety</span>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="bg-primary/5 rounded-lg p-6 mb-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div>
                <p className="text-3xl font-bold text-primary">7</p>
                <p className="text-sm text-muted-foreground">12-Step Programs</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-primary">6</p>
                <p className="text-sm text-muted-foreground">Secular Options</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-primary">3</p>
                <p className="text-sm text-muted-foreground">Faith-Based</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-primary">All</p>
                <p className="text-sm text-muted-foreground">Available Online</p>
              </div>
            </div>
          </div>

          <div className="text-center">
            <Button asChild size="lg">
              <Link href="/programs">
                Explore All 17 Programs <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <p className="mt-4 text-sm text-muted-foreground">
              Compare approaches, philosophies, and find your perfect fit
            </p>
          </div>
        </div>
      </section>

      {/* Interactive Tools Section */}
      <section className="py-16 px-4 md:py-24">
        <div className="container max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              11 Interactive Recovery Tools
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Evidence-based tools to support your recovery journey daily
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 mb-8">
            <Card className="border-2 hover:border-primary/50 transition-colors">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center justify-between">
                  CBT Tools
                  <span className="text-2xl font-bold text-primary">4</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-2">
                  Cognitive Behavioral Therapy exercises
                </p>
                <div className="flex flex-wrap gap-1">
                  <span className="text-xs bg-muted px-2 py-1 rounded">Thought Record</span>
                  <span className="text-xs bg-muted px-2 py-1 rounded">Distortion Quiz</span>
                  <span className="text-xs bg-muted px-2 py-1 rounded">Trigger Map</span>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-primary/50 transition-colors">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center justify-between">
                  DBT Tools
                  <span className="text-2xl font-bold text-primary">2</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-2">
                  Dialectical Behavior Therapy skills
                </p>
                <div className="flex flex-wrap gap-1">
                  <span className="text-xs bg-muted px-2 py-1 rounded">TIPP Crisis Skills</span>
                  <span className="text-xs bg-muted px-2 py-1 rounded">Daily Diary Card</span>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-primary/50 transition-colors">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center justify-between">
                  Mindfulness Tools
                  <span className="text-2xl font-bold text-primary">3</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-2">
                  Meditation and mindfulness practices
                </p>
                <div className="flex flex-wrap gap-1">
                  <span className="text-xs bg-muted px-2 py-1 rounded">Meditation Timer</span>
                  <span className="text-xs bg-muted px-2 py-1 rounded">Body Scan</span>
                  <span className="text-xs bg-muted px-2 py-1 rounded">Breathing</span>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-primary/50 transition-colors">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center justify-between">
                  Daily Tools
                  <span className="text-2xl font-bold text-primary">2</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-2">
                  Track progress and stay accountable
                </p>
                <div className="flex flex-wrap gap-1">
                  <span className="text-xs bg-muted px-2 py-1 rounded">Sobriety Tracker</span>
                  <span className="text-xs bg-muted px-2 py-1 rounded">Daily Check-in</span>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-primary/50 transition-colors">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center justify-between">
                  Planning Tools
                  <span className="text-2xl font-bold text-primary">1</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-2">
                  Build your comprehensive recovery plan
                </p>
                <div className="flex flex-wrap gap-1">
                  <span className="text-xs bg-muted px-2 py-1 rounded">Recovery Plan Builder</span>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="text-center">
            <Button asChild size="lg" variant="outline">
              <Link href="/resources">
                Explore All Interactive Tools <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <p className="mt-4 text-sm text-muted-foreground">
              Evidence-based tools you can use anytime, anywhere
            </p>
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