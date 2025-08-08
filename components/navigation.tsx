"use client"

import * as React from "react"
import Link from "next/link"
import { Menu, X, Heart, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { cn } from "@/lib/utils"

const programCategories = [
  {
    category: "12-Step Programs",
    programs: [
      { title: "AA", href: "/programs/aa", description: "Alcoholics Anonymous" },
      { title: "NA", href: "/programs/na", description: "Narcotics Anonymous" },
      { title: "Celebrate Recovery", href: "/programs/celebrate", description: "Christian-based recovery" },
    ]
  },
  {
    category: "Secular Programs",
    programs: [
      { title: "SMART Recovery", href: "/programs/smart", description: "Science-based approach" },
      { title: "LifeRing", href: "/programs/lifering", description: "Self-directed recovery" },
      { title: "SOS", href: "/programs/sos", description: "Secular Organizations for Sobriety" },
    ]
  },
  {
    category: "Mindfulness-Based",
    programs: [
      { title: "Recovery Dharma", href: "/programs/dharma", description: "Buddhist-inspired path" },
      { title: "Refuge Recovery", href: "/programs/refuge", description: "Buddhist recovery program" },
    ]
  },
  {
    category: "Moderation & Harm Reduction",
    programs: [
      { title: "HAMS", href: "/programs/hams", description: "Harm reduction approach" },
      { title: "Moderation Management", href: "/programs/mm", description: "Controlled drinking" },
    ]
  },
  {
    category: "Family & Friends",
    programs: [
      { title: "Al-Anon", href: "/programs/alanon", description: "For families of alcoholics" },
      { title: "CoDA", href: "/programs/coda", description: "Codependents Anonymous" },
      { title: "ACA", href: "/programs/aca", description: "Adult Children of Alcoholics" },
    ]
  },
  {
    category: "Specialized Programs",
    programs: [
      { title: "Women for Sobriety", href: "/programs/wfs", description: "Women-only recovery" },
      { title: "GA", href: "/programs/ga", description: "Gamblers Anonymous" },
      { title: "OA", href: "/programs/oa", description: "Overeaters Anonymous" },
      { title: "SAA", href: "/programs/saa", description: "Sex Addicts Anonymous" },
    ]
  }
]

const resourceCategories = [
  {
    category: "Therapy Tools",
    resources: [
      { title: "CBT Exercises", href: "/resources/cbt", description: "Cognitive Behavioral Therapy" },
      { title: "Distortion Quiz", href: "/resources/cbt/distortion-quiz", description: "Test your thinking patterns" },
      { title: "DBT Skills", href: "/resources/dbt", description: "Dialectical Behavior Therapy" },
      { title: "Mindfulness", href: "/resources/mindfulness", description: "Meditation & breathing" },
      { title: "Breathing Exercises", href: "/resources/mindfulness/breathing", description: "Guided breathing techniques" },
    ]
  },
  {
    category: "Recovery Tools",
    resources: [
      { title: "Sobriety Tracker", href: "/tracker", description: "Track your recovery journey" },
      { title: "Daily Check-in", href: "/checkin", description: "Daily reflection & goals" },
      { title: "Recovery Plan", href: "/recovery-plan", description: "Build your personal plan" },
    ]
  },
  {
    category: "Getting Started",
    resources: [
      { title: "First Meeting Guide", href: "/resources/first-meeting", description: "What to expect" },
      { title: "Find Your Path Quiz", href: "/quiz", description: "Personalized recommendations" },
      { title: "Coping Strategies", href: "/resources/coping", description: "Managing cravings" },
    ]
  },
  {
    category: "Support Resources",
    resources: [
      { title: "Crisis Help", href: "/resources/crisis", description: "Emergency support" },
      { title: "Family Support", href: "/resources/family", description: "For loved ones" },
    ]
  }
]

export function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <nav className="container flex h-16 items-center justify-between" role="navigation" aria-label="Main navigation">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center space-x-2" aria-label="Recoverly Home">
            <Heart className="h-6 w-6 text-primary" aria-hidden="true" />
            <span className="font-bold text-xl">Recoverly</span>
          </Link>

          <NavigationMenu className="hidden md:flex">
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger 
                  onClick={(e) => {
                    if (e.ctrlKey || e.metaKey || e.shiftKey) {
                      window.open('/programs', '_blank')
                      e.preventDefault()
                    }
                  }}
                  onDoubleClick={() => window.location.href = '/programs'}
                >
                  Programs
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="w-[750px] p-4">
                    <div className="mb-3 pb-3 border-b">
                      <Link 
                        href="/programs" 
                        className="text-sm font-medium hover:text-primary transition-colors"
                        onClick={(e) => e.stopPropagation()}
                      >
                        Browse All 18 Recovery Programs →
                      </Link>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      {programCategories.map((category) => (
                        <div key={category.category} className="space-y-2">
                          <h4 className="text-sm font-medium text-muted-foreground mb-2">
                            {category.category}
                          </h4>
                          <ul className="space-y-1">
                            {category.programs.map((program) => (
                              <li key={program.href}>
                                <NavigationMenuLink asChild>
                                  <Link
                                    href={program.href}
                                    className="block select-none space-y-1 rounded-md p-2 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                                  >
                                    <div className="text-sm font-medium leading-none">{program.title}</div>
                                    <p className="line-clamp-1 text-xs leading-snug text-muted-foreground">
                                      {program.description}
                                    </p>
                                  </Link>
                                </NavigationMenuLink>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                    <div className="mt-4 pt-4 border-t">
                      <NavigationMenuLink asChild>
                        <Link
                          href="/programs"
                          className="flex items-center text-sm text-primary hover:underline"
                        >
                          View all programs
                          <ChevronRight className="ml-1 h-4 w-4" />
                        </Link>
                      </NavigationMenuLink>
                    </div>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
              
              <NavigationMenuItem>
                <NavigationMenuTrigger
                  onClick={(e) => {
                    if (e.ctrlKey || e.metaKey || e.shiftKey) {
                      window.open('/resources', '_blank')
                      e.preventDefault()
                    }
                  }}
                  onDoubleClick={() => window.location.href = '/resources'}
                >
                  Resources
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="w-[600px] p-4">
                    <div className="mb-3 pb-3 border-b">
                      <Link 
                        href="/resources" 
                        className="text-sm font-medium hover:text-primary transition-colors"
                        onClick={(e) => e.stopPropagation()}
                      >
                        Explore All Resources →
                      </Link>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      {resourceCategories.map((category) => (
                        <div key={category.category} className="space-y-2">
                          <h4 className="text-sm font-medium text-muted-foreground mb-2">
                            {category.category}
                          </h4>
                          <ul className="space-y-1">
                            {category.resources.map((resource) => (
                              <li key={resource.href}>
                                <NavigationMenuLink asChild>
                                  <Link
                                    href={resource.href}
                                    className="block select-none space-y-1 rounded-md p-2 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                                  >
                                    <div className="text-sm font-medium leading-none">{resource.title}</div>
                                    <p className="line-clamp-1 text-xs leading-snug text-muted-foreground">
                                      {resource.description}
                                    </p>
                                  </Link>
                                </NavigationMenuLink>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                    <div className="mt-4 pt-4 border-t">
                      <NavigationMenuLink asChild>
                        <Link
                          href="/resources"
                          className="flex items-center text-sm text-primary hover:underline"
                        >
                          View all resources
                          <ChevronRight className="ml-1 h-4 w-4" />
                        </Link>
                      </NavigationMenuLink>
                    </div>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <Link href="/meetings" legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    Find Meetings
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <Link href="/quiz" legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    Find Your Path
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        <div className="hidden md:flex items-center gap-4">
          <Button variant="outline" asChild>
            <Link href="/resources/crisis">Crisis Help</Link>
          </Button>
        </div>

        <button
          className="md:hidden p-2"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileMenuOpen}
          aria-controls="mobile-menu"
        >
          {mobileMenuOpen ? (
            <X className="h-6 w-6" aria-hidden="true" />
          ) : (
            <Menu className="h-6 w-6" aria-hidden="true" />
          )}
        </button>
      </nav>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden" id="mobile-menu" role="menu">
          <div className="space-y-1 px-4 pb-3 pt-2">
            <Link
              href="/programs"
              className="block px-3 py-2 text-base font-medium"
              onClick={() => setMobileMenuOpen(false)}
            >
              Programs
            </Link>
            <Link
              href="/meetings"
              className="block px-3 py-2 text-base font-medium"
              onClick={() => setMobileMenuOpen(false)}
            >
              Find Meetings
            </Link>
            <Link
              href="/resources"
              className="block px-3 py-2 text-base font-medium"
              onClick={() => setMobileMenuOpen(false)}
            >
              Resources
            </Link>
            <Link
              href="/quiz"
              className="block px-3 py-2 text-base font-medium"
              onClick={() => setMobileMenuOpen(false)}
            >
              Find Your Path
            </Link>
            <Link
              href="/resources/crisis"
              className="block px-3 py-2 text-base font-medium text-destructive"
              onClick={() => setMobileMenuOpen(false)}
            >
              Crisis Help
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}