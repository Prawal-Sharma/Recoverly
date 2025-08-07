import Link from "next/link"
import { Heart } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t">
      <div className="container py-8 md:py-12">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <Heart className="h-6 w-6 text-primary" />
              <span className="font-bold text-xl">Recoverly</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Your journey to recovery starts here. Find the path that works for you.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold mb-3">Programs</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/programs/aa" className="text-muted-foreground hover:text-foreground">
                  AA
                </Link>
              </li>
              <li>
                <Link href="/programs/smart" className="text-muted-foreground hover:text-foreground">
                  SMART Recovery
                </Link>
              </li>
              <li>
                <Link href="/programs/dharma" className="text-muted-foreground hover:text-foreground">
                  Recovery Dharma
                </Link>
              </li>
              <li>
                <Link href="/programs/celebrate" className="text-muted-foreground hover:text-foreground">
                  Celebrate Recovery
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-3">Resources</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/resources/first-meeting" className="text-muted-foreground hover:text-foreground">
                  First Meeting Guide
                </Link>
              </li>
              <li>
                <Link href="/resources/coping" className="text-muted-foreground hover:text-foreground">
                  Coping Strategies
                </Link>
              </li>
              <li>
                <Link href="/resources/family" className="text-muted-foreground hover:text-foreground">
                  Family Support
                </Link>
              </li>
              <li>
                <Link href="/resources/crisis" className="text-muted-foreground hover:text-foreground">
                  Crisis Help
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-3">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/meetings" className="text-muted-foreground hover:text-foreground">
                  Find Meetings
                </Link>
              </li>
              <li>
                <Link href="/quiz" className="text-muted-foreground hover:text-foreground">
                  Find Your Path
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-muted-foreground hover:text-foreground">
                  About
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-muted-foreground hover:text-foreground">
                  Privacy
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 border-t pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; 2025 Recoverly. All rights reserved.</p>
          <p className="mt-2">
            If you're in crisis, please call 988 (Suicide & Crisis Lifeline) or text HOME to 741741 (Crisis Text Line)
          </p>
        </div>
      </div>
    </footer>
  )
}