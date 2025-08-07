import dynamic from "next/dynamic"
import { Suspense } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MapPin, Globe, Users, Calendar, Clock } from "lucide-react"

// Dynamic import with no SSR to prevent hydration issues
const TSMLMeetingFinder = dynamic(
  () => import("@/components/tsml-meeting-finder"),
  { 
    ssr: false,
    loading: () => (
      <div className="flex items-center justify-center h-[600px] text-muted-foreground">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p>Loading meeting finder...</p>
        </div>
      </div>
    )
  }
)

export default function MeetingsPage() {
  return (
    <div className="container max-w-7xl py-10">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">Find Recovery Meetings</h1>
        <p className="text-xl text-muted-foreground">
          Search for in-person and online meetings across multiple recovery programs.
        </p>
      </div>

      {/* Meeting Type Cards */}
      <div className="grid gap-6 md:grid-cols-3 mb-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-primary" />
              In-Person Meetings
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-3">
              Find local meetings in your area. Connect face-to-face with your recovery community.
            </p>
            <Badge variant="secondary">Location-based search</Badge>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="h-5 w-5 text-primary" />
              Online Meetings
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-3">
              Join virtual meetings from anywhere. Perfect for remote access or when traveling.
            </p>
            <Badge variant="secondary">24/7 availability</Badge>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5 text-primary" />
              All Programs
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-3">
              Search meetings from AA, NA, SMART Recovery, and other programs all in one place.
            </p>
            <Badge variant="secondary">Multiple programs</Badge>
          </CardContent>
        </Card>
      </div>

      {/* TSML UI Integration */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Meeting Finder</CardTitle>
          <CardDescription>
            Search by location, day, time, or meeting type. Data provided by local recovery organizations.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Suspense fallback={
            <div className="flex items-center justify-center h-[600px] text-muted-foreground">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
                <p>Loading meeting finder...</p>
              </div>
            </div>
          }>
            <TSMLMeetingFinder />
          </Suspense>
        </CardContent>
      </Card>

      {/* Popular Online Meetings */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Popular Online Meeting Resources</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>AA Online Intergroup</CardTitle>
              <CardDescription>24/7 Alcoholics Anonymous meetings</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Hundreds of online AA meetings happening around the clock via Zoom.
              </p>
              <Button asChild>
                <a href="https://aa-intergroup.org" target="_blank" rel="noopener noreferrer">
                  <Globe className="mr-2 h-4 w-4" />
                  Browse AA Meetings
                </a>
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>SMART Recovery Online</CardTitle>
              <CardDescription>Science-based recovery meetings</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Online SMART Recovery meetings with tools and worksheets.
              </p>
              <Button asChild>
                <a href="https://www.smartrecovery.org/community/calendar.php" target="_blank" rel="noopener noreferrer">
                  <Globe className="mr-2 h-4 w-4" />
                  Find SMART Meetings
                </a>
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recovery Dharma Online</CardTitle>
              <CardDescription>Buddhist-inspired recovery meetings</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Daily online meditation and recovery meetings.
              </p>
              <Button asChild>
                <a href="https://recoverydharma.online" target="_blank" rel="noopener noreferrer">
                  <Globe className="mr-2 h-4 w-4" />
                  Join Dharma Meetings
                </a>
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>In The Rooms</CardTitle>
              <CardDescription>Global online recovery community</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Live video meetings for various 12-step programs.
              </p>
              <Button asChild>
                <a href="https://www.intherooms.com" target="_blank" rel="noopener noreferrer">
                  <Globe className="mr-2 h-4 w-4" />
                  Join Community
                </a>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Tips Section */}
      <Card>
        <CardHeader>
          <CardTitle>Tips for Finding the Right Meeting</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <h3 className="font-semibold mb-2">Meeting Types</h3>
              <ul className="space-y-1 text-muted-foreground">
                <li>• <strong>Open:</strong> Anyone can attend</li>
                <li>• <strong>Closed:</strong> Only for those with addiction</li>
                <li>• <strong>Speaker:</strong> One person shares their story</li>
                <li>• <strong>Discussion:</strong> Group sharing</li>
                <li>• <strong>Big Book:</strong> Reading and discussion</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-2">First Meeting?</h3>
              <ul className="space-y-1 text-muted-foreground">
                <li>• Arrive a few minutes early</li>
                <li>• You don't have to share</li>
                <li>• It's okay to just listen</li>
                <li>• Try different meetings to find your fit</li>
                <li>• Online meetings are a great start</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="mt-8 p-4 bg-muted/50 rounded-lg text-center">
        <p className="text-sm text-muted-foreground">
          <strong>Note:</strong> Meeting information is provided by local service organizations and may change. 
          Always verify meeting details before attending.
        </p>
      </div>
    </div>
  )
}