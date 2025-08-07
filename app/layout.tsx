import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: {
    default: "Recoverly - Your Recovery Journey Starts Here",
    template: "%s | Recoverly"
  },
  description: "Find the right recovery program for you. Compare AA, SMART Recovery, Recovery Dharma & more. Access meetings, resources, and crisis support.",
  keywords: ["recovery", "addiction recovery", "AA", "SMART Recovery", "Recovery Dharma", "12 step", "recovery programs", "addiction help", "recovery meetings", "sobriety"],
  authors: [{ name: "Recoverly" }],
  creator: "Recoverly",
  publisher: "Recoverly",
  metadataBase: new URL("https://recoverly.net"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://recoverly.net",
    siteName: "Recoverly",
    title: "Recoverly - Your Recovery Journey Starts Here",
    description: "Find the right recovery program for you. Compare programs, find meetings, access resources.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Recoverly - Recovery Resources Hub",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Recoverly - Your Recovery Journey Starts Here",
    description: "Find the right recovery program for you. Compare programs, find meetings, access resources.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://recoverly.net",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex min-h-screen flex-col">
          <Navigation />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  )
}