"use client"

import { useEffect, useState } from "react"
import Script from "next/script"

declare global {
  interface Window {
    tsml_react_config: any
  }
}

export default function TSMLMeetingFinder() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [error, setError] = useState<string | null>(null)

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
  }, [])

  const handleLoad = () => {
    setIsLoaded(true)
    setError(null)
  }

  const handleError = () => {
    setError("Failed to load meeting finder. Please try refreshing the page.")
    setIsLoaded(true)
  }

  return (
    <>
      {/* TSML UI Container */}
      <div id="tsml-ui" className="min-h-[600px]">
        {!isLoaded && !error && (
          <div className="flex items-center justify-center h-[600px] text-muted-foreground">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
              <p>Loading meeting finder...</p>
            </div>
          </div>
        )}
        {error && (
          <div className="flex items-center justify-center h-[600px]">
            <div className="text-center">
              <p className="text-red-600 mb-4">{error}</p>
              <button 
                onClick={() => window.location.reload()} 
                className="px-4 py-2 bg-primary text-white rounded hover:bg-primary/90"
              >
                Refresh Page
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Load TSML Script */}
      {typeof window !== "undefined" && (
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