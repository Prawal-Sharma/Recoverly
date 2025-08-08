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
    category: "CBT Tools",
    resources: [
      { title: "CBT Overview", href: "/resources/cbt", description: "Cognitive Behavioral Therapy" },
      { title: "Thought Record", href: "/resources/cbt/thought-record", description: "Track and challenge negative thoughts" },
      { title: "Distortion Quiz", href: "/resources/cbt/distortion-quiz", description: "Test your thinking patterns" },
      { title: "Trigger Mapper", href: "/resources/cbt/trigger-map", description: "Map triggers and coping strategies" },
    ]
  },
  {
    category: "DBT Tools", 
    resources: [
      { title: "DBT Overview", href: "/resources/dbt", description: "Dialectical Behavior Therapy" },
      { title: "Daily Diary Card", href: "/resources/dbt/diary-card", description: "Track emotions and skills used" },
      { title: "TIPP Crisis Skills", href: "/resources/dbt/tipp", description: "Emergency techniques for intense emotions" },
    ]
  },
  {
    category: "Mindfulness Tools",
    resources: [
      { title: "Mindfulness Overview", href: "/resources/mindfulness", description: "Meditation & breathing practices" },
      { title: "Meditation Timer", href: "/resources/mindfulness/meditation-timer", description: "Guided meditation sessions" },
      { title: "Breathing Exercises", href: "/resources/mindfulness/breathing", description: "Interactive breathing techniques" },
      { title: "Body Scan Guide", href: "/resources/mindfulness/body-scan", description: "Guided body awareness meditation" },
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
    <>
      {/* Skip to content link */}
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 z-50 bg-primary text-primary-foreground px-4 py-2 rounded focus:ring-2 focus:ring-ring"
      >
        Skip to main content
      </a>
      
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
                        Browse All 17 Recovery Programs →
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
                  Interactive Tools
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="w-[600px] p-4">
                    <div className="mb-3 pb-3 border-b">
                      <Link 
                        href="/resources" 
                        className="text-sm font-medium hover:text-primary transition-colors"
                        onClick={(e) => e.stopPropagation()}
                      >
                        Explore All 11 Interactive Tools →
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
          className="md:hidden p-2 min-h-[44px] min-w-[44px] flex items-center justify-center"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileMenuOpen}
          aria-controls="mobile-menu"
          aria-haspopup="true"
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
        <div className="md:hidden" id="mobile-menu" role="menu" aria-label="Mobile navigation menu">
          <div className="space-y-2 px-4 pb-4 pt-3">
            <Link
              href="/programs"
              className="block px-4 py-3 text-base font-medium hover:bg-muted rounded-md focus:bg-muted focus:outline-none focus:ring-2 focus:ring-ring min-h-[44px] flex items-center"
              onClick={() => setMobileMenuOpen(false)}
              role="menuitem"
            >
              Programs
            </Link>
            <Link
              href="/meetings"
              className="block px-4 py-3 text-base font-medium hover:bg-muted rounded-md focus:bg-muted focus:outline-none focus:ring-2 focus:ring-ring min-h-[44px] flex items-center"
              onClick={() => setMobileMenuOpen(false)}
              role="menuitem"
            >
              Find Meetings
            </Link>
            <Link
              href="/resources"
              className="block px-4 py-3 text-base font-medium hover:bg-muted rounded-md focus:bg-muted focus:outline-none focus:ring-2 focus:ring-ring min-h-[44px] flex items-center"
              onClick={() => setMobileMenuOpen(false)}
              role="menuitem"
            >
              Interactive Tools
            </Link>
            <Link
              href="/quiz"
              className="block px-4 py-3 text-base font-medium hover:bg-muted rounded-md focus:bg-muted focus:outline-none focus:ring-2 focus:ring-ring min-h-[44px] flex items-center"
              onClick={() => setMobileMenuOpen(false)}
              role="menuitem"
            >
              Find Your Path
            </Link>
            
            {/* Crisis Help - Highlighted for mobile accessibility */}
            <div className="border-t border-muted mt-3 pt-3">
              <Link
                href="/resources/crisis"
                className="block px-4 py-3 text-base font-medium text-destructive bg-destructive/10 hover:bg-destructive/20 rounded-md focus:bg-destructive/20 focus:outline-none focus:ring-2 focus:ring-destructive min-h-[44px] flex items-center"
                onClick={() => setMobileMenuOpen(false)}
                role="menuitem"
              >
                🚨 Crisis Help
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
    </>
  )
}