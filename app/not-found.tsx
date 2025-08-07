import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Home, Search, Heart, Users } from "lucide-react"

export default function NotFound() {
  return (
    <div className="container max-w-4xl py-20">
      <div className="text-center mb-8">
        <h1 className="text-6xl font-bold mb-4">404</h1>
        <h2 className="text-3xl font-semibold mb-2">Page Not Found</h2>
        <p className="text-xl text-muted-foreground">
          Sorry, we couldn't find the page you're looking for.
        </p>
      </div>

      <Card className="mb-8">
        <CardHeader className="text-center">
          <CardTitle>Let's Get You Back on Track</CardTitle>
          <CardDescription>
            Here are some helpful places to start
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-2">
            <Button asChild variant="outline" className="justify-start">
              <Link href="/">
                <Home className="mr-2 h-4 w-4" />
                Go to Homepage
              </Link>
            </Button>
            <Button asChild variant="outline" className="justify-start">
              <Link href="/programs">
                <Search className="mr-2 h-4 w-4" />
                Browse Programs
              </Link>
            </Button>
            <Button asChild variant="outline" className="justify-start">
              <Link href="/meetings">
                <Users className="mr-2 h-4 w-4" />
                Find Meetings
              </Link>
            </Button>
            <Button asChild variant="outline" className="justify-start">
              <Link href="/resources/crisis">
                <Heart className="mr-2 h-4 w-4" />
                Crisis Resources
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="text-center">
        <p className="text-muted-foreground mb-4">
          If you need immediate help, please visit our crisis resources page or call:
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild size="lg">
            <a href="tel:988">
              Call 988 (Crisis Lifeline)
            </a>
          </Button>
          <Button asChild size="lg" variant="outline">
            <a href="sms:741741?body=HOME">
              Text HOME to 741741
            </a>
          </Button>
        </div>
      </div>
    </div>
  )
}