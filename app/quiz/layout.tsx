import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Find Your Recovery Path",
  description: "Take our free assessment to discover which recovery programs align with your beliefs, preferences, and needs.",
  openGraph: {
    title: "Find Your Recovery Path | Recoverly",
    description: "Take our free assessment to find the right recovery program for you.",
  },
}

export default function QuizLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}