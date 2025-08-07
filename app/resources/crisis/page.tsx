import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Phone, MessageSquare, Globe, Heart, AlertTriangle, Users, Clock, Shield } from "lucide-react"
import Link from "next/link"

export default function CrisisResourcesPage() {
  return (
    <div className="container max-w-5xl py-10">
      {/* Emergency Banner */}
      <Card className="mb-8 border-red-200 bg-red-50 dark:bg-red-950/20">
        <CardHeader>
          <div className="flex items-center gap-3">
            <AlertTriangle className="h-6 w-6 text-red-600" />
            <CardTitle className="text-2xl text-red-900 dark:text-red-100">
              If You're in Immediate Danger
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <p className="mb-4 text-red-800 dark:text-red-200">
            If you're thinking about hurting yourself or others, please reach out for help immediately.
          </p>
          <div className="flex flex-wrap gap-3">
            <Button size="lg" variant="destructive" asChild>
              <a href="tel:988">
                <Phone className="mr-2 h-4 w-4" />
                Call 988 Now
              </a>
            </Button>
            <Button size="lg" variant="outline" className="border-red-600 text-red-600 hover:bg-red-100" asChild>
              <a href="sms:741741?body=HOME">
                <MessageSquare className="mr-2 h-4 w-4" />
                Text HOME to 741741
              </a>
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">Crisis Resources & Emergency Help</h1>
        <p className="text-xl text-muted-foreground">
          You don't have to go through this alone. Help is available 24/7.
        </p>
      </div>

      {/* Primary Crisis Lines */}
      <div className="grid gap-6 md:grid-cols-2 mb-8">
        <Card>
          <CardHeader>
            <div className="flex items-start justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <Phone className="h-5 w-5" />
                  988 Suicide & Crisis Lifeline
                </CardTitle>
                <Badge className="mt-2" variant="default">Available 24/7</Badge>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="mb-4 text-muted-foreground">
              Free, confidential support for people in distress and crisis resources for loved ones.
            </p>
            <div className="space-y-2">
              <Button className="w-full" asChild>
                <a href="tel:988">
                  <Phone className="mr-2 h-4 w-4" />
                  Call 988
                </a>
              </Button>
              <Button variant="outline" className="w-full" asChild>
                <a href="https://988lifeline.org/chat/" target="_blank" rel="noopener noreferrer">
                  <MessageSquare className="mr-2 h-4 w-4" />
                  Chat Online
                </a>
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-start justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5" />
                  Crisis Text Line
                </CardTitle>
                <Badge className="mt-2" variant="default">Available 24/7</Badge>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="mb-4 text-muted-foreground">
              Free, 24/7 text support for those in crisis. Text with a trained crisis counselor.
            </p>
            <div className="space-y-2">
              <Button className="w-full" asChild>
                <a href="sms:741741?body=HOME">
                  <MessageSquare className="mr-2 h-4 w-4" />
                  Text HOME to 741741
                </a>
              </Button>
              <Button variant="outline" className="w-full" asChild>
                <a href="https://www.crisistextline.org/" target="_blank" rel="noopener noreferrer">
                  <Globe className="mr-2 h-4 w-4" />
                  Visit Website
                </a>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Specialized Resources */}
      <h2 className="text-2xl font-bold mb-4">Specialized Support Lines</h2>
      <div className="grid gap-4 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>SAMHSA National Helpline</CardTitle>
            <CardDescription>Substance Abuse and Mental Health Services</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-3">
              <Badge variant="secondary">24/7</Badge>
              <Badge variant="secondary">Free</Badge>
              <Badge variant="secondary">Confidential</Badge>
              <Badge variant="secondary">English & Spanish</Badge>
            </div>
            <p className="mt-3 mb-3 text-muted-foreground">
              Treatment referral and information service for individuals facing mental health and/or substance use disorders.
            </p>
            <Button asChild>
              <a href="tel:1-800-662-4357">
                <Phone className="mr-2 h-4 w-4" />
                1-800-662-HELP (4357)
              </a>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Veterans Crisis Line</CardTitle>
            <CardDescription>Support for Veterans and their families</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-3 text-muted-foreground">
              Confidential support for Veterans, service members, and their families.
            </p>
            <div className="flex flex-wrap gap-2">
              <Button size="sm" asChild>
                <a href="tel:988">
                  Call 988, Press 1
                </a>
              </Button>
              <Button size="sm" variant="outline" asChild>
                <a href="sms:838255">
                  Text 838255
                </a>
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>LGBTQ+ National Hotline</CardTitle>
            <CardDescription>Support for LGBTQ+ individuals</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-3 text-muted-foreground">
              Peer support and community connections for LGBTQ+ people.
            </p>
            <Button size="sm" asChild>
              <a href="tel:1-888-843-4564">
                1-888-843-4564
              </a>
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* What to Do Section */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="text-2xl">What to Do When You're in Crisis</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <Shield className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold mb-1">Ensure Your Safety</h3>
                <p className="text-muted-foreground">
                  Remove yourself from immediate danger. If you have means to harm yourself, give them to someone else or remove them from your environment.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Users className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold mb-1">Reach Out to Someone</h3>
                <p className="text-muted-foreground">
                  Call a crisis line, text a friend, or reach out to a family member. You don't have to go through this alone.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Clock className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold mb-1">Give Yourself Time</h3>
                <p className="text-muted-foreground">
                  Promise yourself to wait 24 hours before making any major decisions. Feelings and circumstances can change.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Heart className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold mb-1">Practice Self-Care</h3>
                <p className="text-muted-foreground">
                  Try to eat something, drink water, take deep breaths, or do something that usually calms you.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* For Friends and Family */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="text-2xl">For Friends and Family</CardTitle>
          <CardDescription>How to help someone in crisis</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <h3 className="font-semibold">Warning Signs to Watch For:</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                Talking about wanting to die or kill themselves
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                Looking for ways to harm themselves
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                Feeling hopeless or having no purpose
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                Withdrawing from friends and activities
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                Extreme mood swings
              </li>
            </ul>

            <h3 className="font-semibold mt-4">How You Can Help:</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="text-green-600 mt-1">✓</span>
                Take it seriously and listen without judgment
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 mt-1">✓</span>
                Stay with them or ensure they're not alone
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 mt-1">✓</span>
                Help them connect with professional help
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 mt-1">✓</span>
                Remove potential means of self-harm
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 mt-1">✓</span>
                Follow up and stay connected
              </li>
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* Additional Resources */}
      <Card>
        <CardHeader>
          <CardTitle>Additional Resources</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 sm:grid-cols-2">
            <Button variant="outline" asChild>
              <Link href="/resources/coping">
                Coping Strategies
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/resources/family">
                Family Support Guide
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/meetings">
                Find Support Meetings
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/programs">
                Explore Recovery Programs
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="mt-8 p-4 bg-muted/50 rounded-lg text-center">
        <p className="text-sm text-muted-foreground">
          <strong>Remember:</strong> Asking for help is a sign of strength, not weakness. 
          Recovery is possible, and you deserve support.
        </p>
      </div>
    </div>
  )
}