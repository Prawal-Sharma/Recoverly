import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { ArrowLeft, Clock, Users, MessageSquare, Heart, MapPin, Coffee, BookOpen } from "lucide-react"

export default function FirstMeetingGuidePage() {
  return (
    <div className="container max-w-4xl py-10">
      <Button variant="ghost" asChild className="mb-6">
        <Link href="/resources">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Resources
        </Link>
      </Button>

      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">Your First Recovery Meeting</h1>
        <p className="text-xl text-muted-foreground">
          A complete guide to help you feel prepared and confident for your first meeting.
        </p>
      </div>

      {/* What to Expect */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="text-2xl">What to Expect</CardTitle>
          <CardDescription>Every meeting is different, but here's the general format</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-start gap-3">
            <Clock className="h-5 w-5 text-primary mt-1" />
            <div>
              <h3 className="font-semibold mb-1">Meeting Length</h3>
              <p className="text-muted-foreground">Most meetings last 60-90 minutes. You can leave early if needed.</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Users className="h-5 w-5 text-primary mt-1" />
            <div>
              <h3 className="font-semibold mb-1">Group Size</h3>
              <p className="text-muted-foreground">Meetings can range from 5 to 50+ people. Smaller meetings are more intimate, larger ones offer more perspectives.</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <MessageSquare className="h-5 w-5 text-primary mt-1" />
            <div>
              <h3 className="font-semibold mb-1">Sharing</h3>
              <p className="text-muted-foreground">You never have to share if you don't want to. It's perfectly fine to just listen, especially at first.</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Coffee className="h-5 w-5 text-primary mt-1" />
            <div>
              <h3 className="font-semibold mb-1">Atmosphere</h3>
              <p className="text-muted-foreground">Most meetings are casual and welcoming. There's often coffee and sometimes snacks. People genuinely want to help.</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Before You Go */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="text-2xl">Before You Go</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <h3 className="font-semibold">Preparation Tips:</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="text-green-600 mt-1">✓</span>
                Check the meeting type (Open vs. Closed, Discussion vs. Speaker)
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 mt-1">✓</span>
                Arrive 5-10 minutes early to get settled
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 mt-1">✓</span>
                Bring a notebook if you want to take notes
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 mt-1">✓</span>
                Turn off your phone or put it on silent
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 mt-1">✓</span>
                Remember: everyone was new once
              </li>
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* Common Concerns */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="text-2xl">Common Concerns</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="font-semibold mb-2">"What if I see someone I know?"</h3>
            <p className="text-muted-foreground">
              They're there for the same reason you are. What's shared in meetings stays in meetings (anonymity is a core principle).
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-2">"Do I have to admit I'm an addict/alcoholic?"</h3>
            <p className="text-muted-foreground">
              No. You can introduce yourself however you're comfortable. Many people just say "I'm here to listen" when new.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-2">"What if I get emotional?"</h3>
            <p className="text-muted-foreground">
              It's completely normal and accepted. Many people cry at meetings. Tissues are usually available, and no one will judge you.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-2">"Do I have to believe in God?"</h3>
            <p className="text-muted-foreground">
              No. While some programs mention a "Higher Power," there are secular options like SMART Recovery. Choose what works for you.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Meeting Etiquette */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="text-2xl">Meeting Etiquette</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <h3 className="font-semibold text-green-600 mb-2">Do's</h3>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>• Listen respectfully to others</li>
                <li>• Keep what's shared confidential</li>
                <li>• Turn off your phone</li>
                <li>• Be honest if you choose to share</li>
                <li>• Thank people for sharing</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-red-600 mb-2">Don'ts</h3>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>• Don't give advice unless asked</li>
                <li>• Don't interrupt others</li>
                <li>• Don't talk about specific drugs/amounts</li>
                <li>• Don't feel pressured to share</li>
                <li>• Don't judge others' stories</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Types of Meetings */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="text-2xl">Types of Meetings</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Badge>Open Meeting</Badge>
              </div>
              <p className="text-sm text-muted-foreground">Anyone can attend, including family and friends</p>
            </div>

            <div>
              <div className="flex items-center gap-2 mb-1">
                <Badge>Closed Meeting</Badge>
              </div>
              <p className="text-sm text-muted-foreground">Only for people who have a desire to stop drinking/using</p>
            </div>

            <div>
              <div className="flex items-center gap-2 mb-1">
                <Badge>Speaker Meeting</Badge>
              </div>
              <p className="text-sm text-muted-foreground">One or two people share their story in detail</p>
            </div>

            <div>
              <div className="flex items-center gap-2 mb-1">
                <Badge>Discussion Meeting</Badge>
              </div>
              <p className="text-sm text-muted-foreground">Group discussion on a topic, everyone can share</p>
            </div>

            <div>
              <div className="flex items-center gap-2 mb-1">
                <Badge>Big Book/Step Meeting</Badge>
              </div>
              <p className="text-sm text-muted-foreground">Reading and discussing program literature</p>
            </div>

            <div>
              <div className="flex items-center gap-2 mb-1">
                <Badge>Online Meeting</Badge>
              </div>
              <p className="text-sm text-muted-foreground">Virtual meetings via Zoom or other platforms</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* After the Meeting */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="text-2xl">After Your First Meeting</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <p className="text-muted-foreground">Give yourself credit for going - it takes courage!</p>
            
            <h3 className="font-semibold">Next Steps:</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li className="flex items-start gap-2">
                <Heart className="h-4 w-4 text-primary mt-1" />
                <span>Try different meetings to find where you feel comfortable</span>
              </li>
              <li className="flex items-start gap-2">
                <Heart className="h-4 w-4 text-primary mt-1" />
                <span>Consider getting phone numbers (but no pressure)</span>
              </li>
              <li className="flex items-start gap-2">
                <Heart className="h-4 w-4 text-primary mt-1" />
                <span>Think about what you heard - what resonated with you?</span>
              </li>
              <li className="flex items-start gap-2">
                <Heart className="h-4 w-4 text-primary mt-1" />
                <span>Plan to attend another meeting soon</span>
              </li>
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* CTA */}
      <div className="text-center space-y-4">
        <h2 className="text-2xl font-bold">Ready to Find a Meeting?</h2>
        <p className="text-muted-foreground">Use our meeting finder to locate meetings near you or online.</p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button size="lg" asChild>
            <Link href="/meetings">
              <MapPin className="mr-2 h-4 w-4" />
              Find Meetings
            </Link>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <Link href="/quiz">
              Find Your Program
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}