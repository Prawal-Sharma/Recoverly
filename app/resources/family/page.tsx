import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { ArrowLeft, Heart, Shield, Users, BookOpen, AlertCircle, Lightbulb, MessageSquare } from "lucide-react"

export default function FamilySupportPage() {
  return (
    <div className="container max-w-4xl py-10">
      <Button variant="ghost" asChild className="mb-6">
        <Link href="/resources">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Resources
        </Link>
      </Button>

      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">Family & Friends Support Guide</h1>
        <p className="text-xl text-muted-foreground">
          Supporting a loved one through recovery is challenging but crucial. Here's how to help while taking care of yourself.
        </p>
      </div>

      {/* Understanding Addiction */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="text-2xl flex items-center gap-2">
            <BookOpen className="h-6 w-6 text-primary" />
            Understanding Addiction
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">Key Things to Know</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  Addiction is a complex disease, not a moral failing or lack of willpower
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  Recovery is possible, but it's rarely a straight path
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  Relapse can be part of recovery, not a failure
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  Your loved one needs support, not judgment
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  You cannot force someone into recovery - they must want it
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Common Misconceptions</h3>
              <div className="space-y-2 text-muted-foreground">
                <p><strong>Myth:</strong> "They should just stop using."</p>
                <p className="pl-4 text-sm">Reality: Addiction changes brain chemistry. Stopping requires support and often medical help.</p>
                
                <p><strong>Myth:</strong> "If they loved me, they'd quit."</p>
                <p className="pl-4 text-sm">Reality: Addiction isn't about love. It's a disease that affects decision-making.</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* How to Help */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="text-2xl flex items-center gap-2">
            <Heart className="h-6 w-6 text-primary" />
            How You Can Help
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-green-600 mb-2">DO's</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-green-600">✓</span>
                  Educate yourself about addiction and recovery
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600">✓</span>
                  Express concern without judgment
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600">✓</span>
                  Set and maintain healthy boundaries
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600">✓</span>
                  Celebrate small victories in their recovery
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600">✓</span>
                  Take care of your own mental health
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600">✓</span>
                  Be patient - recovery takes time
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-red-600 mb-2">DON'Ts</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-red-600">✗</span>
                  Enable their addiction by covering up consequences
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-600">✗</span>
                  Give money that might be used for substances
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-600">✗</span>
                  Make threats you won't follow through on
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-600">✗</span>
                  Take their behavior personally
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-600">✗</span>
                  Try to control their recovery
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-600">✗</span>
                  Neglect your own needs
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Setting Boundaries */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="text-2xl flex items-center gap-2">
            <Shield className="h-6 w-6 text-primary" />
            Setting Healthy Boundaries
          </CardTitle>
          <CardDescription>Boundaries protect both you and your loved one</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">Examples of Healthy Boundaries</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  "I love you, but I won't give you money"
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  "You're welcome here when you're sober"
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  "I'll support your recovery, but I won't lie for you"
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  "I need to take care of myself too"
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-2">How to Maintain Boundaries</h3>
              <ol className="space-y-2 text-muted-foreground list-decimal list-inside">
                <li>Be clear and specific about your boundaries</li>
                <li>Communicate them calmly and firmly</li>
                <li>Follow through consistently</li>
                <li>Don't negotiate or make exceptions when emotions run high</li>
                <li>Remember: boundaries are about your behavior, not controlling theirs</li>
              </ol>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Communication Tips */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="text-2xl flex items-center gap-2">
            <MessageSquare className="h-6 w-6 text-primary" />
            Communication Strategies
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">Use "I" Statements</h3>
              <div className="space-y-2 text-muted-foreground">
                <p>Instead of: "You're ruining everything!"</p>
                <p className="pl-4">Try: "I feel scared when you use."</p>
                
                <p>Instead of: "You never listen!"</p>
                <p className="pl-4">Try: "I feel unheard when we talk about this."</p>
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Good Times to Talk</h3>
              <ul className="space-y-1 text-muted-foreground">
                <li>• When they're sober and calm</li>
                <li>• In a private, comfortable setting</li>
                <li>• When you're not angry or emotional</li>
                <li>• After preparing what you want to say</li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Avoid These Conversations</h3>
              <ul className="space-y-1 text-muted-foreground">
                <li>• When they're intoxicated</li>
                <li>• During family gatherings or public events</li>
                <li>• When you're angry or upset</li>
                <li>• Through text or social media</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Self-Care */}
      <Card className="mb-8 border-primary">
        <CardHeader>
          <CardTitle className="text-2xl">Taking Care of Yourself</CardTitle>
          <Badge variant="default">Essential</Badge>
        </CardHeader>
        <CardContent>
          <p className="mb-4 text-muted-foreground">
            You cannot pour from an empty cup. Taking care of yourself isn't selfish—it's necessary.
          </p>
          
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <Heart className="h-5 w-5 text-primary mt-1" />
              <div>
                <h3 className="font-semibold">Seek Your Own Support</h3>
                <p className="text-muted-foreground text-sm">Consider Al-Anon, Nar-Anon, or therapy for yourself</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Heart className="h-5 w-5 text-primary mt-1" />
              <div>
                <h3 className="font-semibold">Maintain Your Life</h3>
                <p className="text-muted-foreground text-sm">Keep up with your hobbies, friendships, and interests</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Heart className="h-5 w-5 text-primary mt-1" />
              <div>
                <h3 className="font-semibold">Practice Self-Compassion</h3>
                <p className="text-muted-foreground text-sm">You're doing your best in a difficult situation</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Heart className="h-5 w-5 text-primary mt-1" />
              <div>
                <h3 className="font-semibold">Set Limits</h3>
                <p className="text-muted-foreground text-sm">It's okay to take breaks and step back when needed</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Warning Signs */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="text-2xl flex items-center gap-2">
            <AlertCircle className="h-6 w-6 text-amber-600" />
            When to Seek Immediate Help
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-3 text-muted-foreground">Call 911 or go to the emergency room if:</p>
          <ul className="space-y-2 text-muted-foreground">
            <li className="flex items-start gap-2">
              <span className="text-amber-600">⚠</span>
              They're threatening to harm themselves or others
            </li>
            <li className="flex items-start gap-2">
              <span className="text-amber-600">⚠</span>
              They're experiencing overdose symptoms
            </li>
            <li className="flex items-start gap-2">
              <span className="text-amber-600">⚠</span>
              They're having severe withdrawal symptoms
            </li>
            <li className="flex items-start gap-2">
              <span className="text-amber-600">⚠</span>
              You fear for your safety or theirs
            </li>
          </ul>
        </CardContent>
      </Card>

      {/* Resources for Families */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="text-2xl">Resources for Families</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div>
              <h3 className="font-semibold">Al-Anon Family Groups</h3>
              <p className="text-muted-foreground text-sm mb-2">Support for families and friends of alcoholics</p>
              <Button size="sm" variant="outline" asChild>
                <a href="https://al-anon.org" target="_blank" rel="noopener noreferrer">
                  Visit Al-Anon
                </a>
              </Button>
            </div>

            <div>
              <h3 className="font-semibold">Nar-Anon</h3>
              <p className="text-muted-foreground text-sm mb-2">Support for families affected by drug addiction</p>
              <Button size="sm" variant="outline" asChild>
                <a href="https://nar-anon.org" target="_blank" rel="noopener noreferrer">
                  Visit Nar-Anon
                </a>
              </Button>
            </div>

            <div>
              <h3 className="font-semibold">SMART Recovery Family & Friends</h3>
              <p className="text-muted-foreground text-sm mb-2">Science-based support for families</p>
              <Button size="sm" variant="outline" asChild>
                <a href="https://www.smartrecovery.org/family/" target="_blank" rel="noopener noreferrer">
                  Learn More
                </a>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Remember */}
      <Card className="mb-8 bg-primary/5">
        <CardContent className="pt-6">
          <div className="flex items-start gap-3">
            <Lightbulb className="h-6 w-6 text-primary mt-1" />
            <div>
              <h3 className="font-semibold mb-2">Remember</h3>
              <ul className="space-y-1 text-muted-foreground">
                <li>• You didn't cause the addiction</li>
                <li>• You can't control it</li>
                <li>• You can't cure it</li>
                <li>• But you can take care of yourself</li>
                <li>• And you can offer support without enabling</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* CTA */}
      <div className="text-center space-y-4">
        <h2 className="text-2xl font-bold">Need More Support?</h2>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button size="lg" asChild>
            <Link href="/programs">
              Learn About Recovery Programs
            </Link>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <Link href="/resources/crisis">
              Crisis Resources
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}