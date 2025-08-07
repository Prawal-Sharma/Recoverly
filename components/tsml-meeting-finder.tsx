"use client"

import { useEffect, useState, useRef } from "react"
import Script from "next/script"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { AlertCircle, Globe, ExternalLink } from "lucide-react"

declare global {
  interface Window {
    tsml_react_config: any
  }
}

const LOAD_TIMEOUT = 30000 // 30 seconds

export default function TSMLMeetingFinder() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [showFallback, setShowFallback] = useState(false)
  const timeoutRef = useRef<NodeJS.Timeout>()

  useEffect(() => {
    // Set up TSML configuration
    if (typeof window !== "undefined") {
      window.tsml_react_config = {
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        map: {
          key: '',
          style: ''
        }
      }
    }

    // Set timeout for loading
    timeoutRef.current = setTimeout(() => {
      if (!isLoaded) {
        setShowFallback(true)
      }
    }, LOAD_TIMEOUT)

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [isLoaded])

  const handleLoad = () => {
    setIsLoaded(true)
    setError(null)
    setShowFallback(false)
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
  }

  const handleError = () => {
    setError("Failed to load meeting finder. Please try the alternative options below.")
    setIsLoaded(true)
    setShowFallback(true)
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
  }

  if (showFallback || error) {
    return (
      <div className="space-y-6">
        <Card className="border-amber-200 bg-amber-50/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-amber-600" />
              Meeting Finder Unavailable
            </CardTitle>
            <CardDescription>
              The integrated meeting finder is currently unavailable. Please use the alternative resources below to find meetings.
            </CardDescription>
          </CardHeader>
        </Card>

        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">AA Online Intergroup</CardTitle>
              <CardDescription>24/7 Alcoholics Anonymous meetings worldwide</CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild className="w-full">
                <a href="https://aa-intergroup.org/meetings" target="_blank" rel="noopener noreferrer">
                  <Globe className="mr-2 h-4 w-4" />
                  Find AA Meetings
                  <ExternalLink className="ml-2 h-3 w-3" />
                </a>
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">SMART Recovery</CardTitle>
              <CardDescription>Science-based recovery meetings online and in-person</CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild className="w-full">
                <a href="https://meetings.smartrecovery.org/meetings/location/" target="_blank" rel="noopener noreferrer">
                  <Globe className="mr-2 h-4 w-4" />
                  Find SMART Meetings
                  <ExternalLink className="ml-2 h-3 w-3" />
                </a>
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">NA Meeting Search</CardTitle>
              <CardDescription>Narcotics Anonymous meetings worldwide</CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild className="w-full">
                <a href="https://www.na.org/meetingsearch/" target="_blank" rel="noopener noreferrer">
                  <Globe className="mr-2 h-4 w-4" />
                  Find NA Meetings
                  <ExternalLink className="ml-2 h-3 w-3" />
                </a>
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Recovery Dharma</CardTitle>
              <CardDescription>Buddhist-inspired recovery meetings</CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild className="w-full">
                <a href="https://recoverydharma.online/schedule/" target="_blank" rel="noopener noreferrer">
                  <Globe className="mr-2 h-4 w-4" />
                  Find Dharma Meetings
                  <ExternalLink className="ml-2 h-3 w-3" />
                </a>
              </Button>
            </CardContent>
          </Card>
        </div>

        <Card className="bg-muted/50">
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground">
              <strong>Tip:</strong> Most recovery programs offer both online and in-person meetings. 
              Online meetings are a great way to start, especially if you're nervous about attending in person. 
              You can also call the helplines listed on our <a href="/resources/crisis" className="text-primary hover:underline">crisis resources page</a> for 
              help finding local meetings.
            </p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <>
      {/* TSML UI Container */}
      <div id="tsml-ui" className="min-h-[600px]">
        {!isLoaded && !showFallback && (
          <div className="flex items-center justify-center h-[600px] text-muted-foreground">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
              <p>Loading meeting finder...</p>
              <p className="text-sm mt-2">This may take a moment...</p>
            </div>
          </div>
        )}
      </div>

      {/* Load TSML Script */}
      {typeof window !== "undefined" && !showFallback && (
        <Script
          src="https://tsml-ui.code4recovery.org/app.js"
          strategy="afterInteractive"
          onLoad={handleLoad}
          onError={handleError}
        />
      )}
    </>
  )
}