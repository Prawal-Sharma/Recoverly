import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Recovery Programs",
  description: "Compare different recovery programs including AA, SMART Recovery, Recovery Dharma, and more. Find the approach that works for you.",
  openGraph: {
    title: "Recovery Programs | Recoverly",
    description: "Compare different recovery programs and find the approach that works for you.",
  },
}

export default function ProgramsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}