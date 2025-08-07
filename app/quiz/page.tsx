"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Progress } from "@/components/ui/progress"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, ArrowRight, RefreshCw, CheckCircle } from "lucide-react"
import { quizQuestions, calculateResults, type QuizResult } from "@/lib/quiz-data"
import { getProgramById } from "@/lib/programs-data"
import Link from "next/link"

export default function QuizPage() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [showResults, setShowResults] = useState(false)
  const [results, setResults] = useState<QuizResult | null>(null)

  const currentQuestion = quizQuestions[currentStep]
  const progress = ((currentStep + 1) / quizQuestions.length) * 100
  const isLastQuestion = currentStep === quizQuestions.length - 1

  useEffect(() => {
    // Load saved progress from localStorage
    const saved = localStorage.getItem("quiz-progress")
    if (saved) {
      const parsed = JSON.parse(saved)
      setAnswers(parsed.answers || {})
      setCurrentStep(parsed.step || 0)
    }
  }, [])

  useEffect(() => {
    // Save progress to localStorage
    if (Object.keys(answers).length > 0) {
      localStorage.setItem("quiz-progress", JSON.stringify({
        answers,
        step: currentStep
      }))
    }
  }, [answers, currentStep])

  const handleAnswer = (value: string) => {
    setAnswers(prev => ({
      ...prev,
      [currentQuestion.id]: value
    }))
  }

  const handleNext = () => {
    if (isLastQuestion) {
      const quizResults = calculateResults(answers)
      setResults(quizResults)
      setShowResults(true)
      
      // Save results to localStorage
      localStorage.setItem("quiz-results", JSON.stringify(quizResults))
      localStorage.removeItem("quiz-progress")
    } else {
      setCurrentStep(prev => prev + 1)
    }
  }

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1)
    }
  }

  const handleRestart = () => {
    setAnswers({})
    setCurrentStep(0)
    setShowResults(false)
    setResults(null)
    localStorage.removeItem("quiz-progress")
    localStorage.removeItem("quiz-results")
  }

  if (showResults && results) {
    return (
      <div className="container max-w-4xl py-10">
        <Card>
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <CheckCircle className="h-12 w-12 text-green-600" />
            </div>
            <CardTitle className="text-3xl">Your Personalized Recommendations</CardTitle>
            <CardDescription className="text-lg mt-2">
              Based on your answers, here are the recovery programs that best match your needs and beliefs
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              {results.recommendedPrograms.map((programId, index) => {
                const program = getProgramById(programId)
                if (!program) return null
                
                return (
                  <Card key={programId} className={index === 0 ? "border-primary" : ""}>
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div>
                          {index === 0 && (
                            <Badge className="mb-2" variant="default">
                              Best Match
                            </Badge>
                          )}
                          <CardTitle className="text-xl">{program.fullName}</CardTitle>
                          <CardDescription className="mt-2">
                            {program.description}
                          </CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div>
                          <p className="font-semibold text-sm mb-1">Why this might work for you:</p>
                          <ul className="text-sm text-muted-foreground space-y-1">
                            {program.bestFor.slice(0, 2).map((item, i) => (
                              <li key={i} className="flex items-start gap-1">
                                <span className="text-primary mt-0.5">•</span>
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        <Button asChild className="w-full">
                          <Link href={`/programs/${program.id}`}>
                            Learn More About {program.name}
                          </Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>

            <div className="bg-muted/50 p-4 rounded-lg">
              <h3 className="font-semibold mb-2">Your Profile Scores:</h3>
              <div className="grid grid-cols-2 gap-2 text-sm">
                {Object.entries(results.scores).map(([key, value]) => (
                  <div key={key} className="flex justify-between">
                    <span className="capitalize">{key}:</span>
                    <span className="font-medium">{value}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button onClick={handleRestart} variant="outline">
                <RefreshCw className="mr-2 h-4 w-4" />
                Retake Quiz
              </Button>
              <Button asChild>
                <Link href="/programs">
                  Browse All Programs
                </Link>
              </Button>
              <Button asChild variant="secondary">
                <Link href="/meetings">
                  Find Meetings
                </Link>
              </Button>
            </div>

            <p className="text-center text-sm text-muted-foreground">
              Remember: These are suggestions based on your responses. 
              Feel free to explore any program that interests you.
            </p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="container max-w-3xl py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Find Your Recovery Path</h1>
        <p className="text-muted-foreground">
          Answer a few questions to get personalized program recommendations
        </p>
        <Progress value={progress} className="mt-4" />
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between mb-2">
            <Badge variant="outline">
              Question {currentStep + 1} of {quizQuestions.length}
            </Badge>
          </div>
          <CardTitle className="text-xl">{currentQuestion.question}</CardTitle>
          {currentQuestion.description && (
            <CardDescription>{currentQuestion.description}</CardDescription>
          )}
        </CardHeader>
        <CardContent>
          <RadioGroup
            value={answers[currentQuestion.id] || ""}
            onValueChange={handleAnswer}
            className="space-y-3"
          >
            {currentQuestion.options.map((option) => (
              <div
                key={option.value}
                className="flex items-center space-x-3 p-3 rounded-lg border hover:bg-muted/50 transition-colors"
              >
                <RadioGroupItem value={option.value} id={option.value} />
                <Label
                  htmlFor={option.value}
                  className="flex-1 cursor-pointer font-normal"
                >
                  {option.label}
                </Label>
              </div>
            ))}
          </RadioGroup>

          <div className="flex justify-between mt-6">
            <Button
              variant="outline"
              onClick={handleBack}
              disabled={currentStep === 0}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Button>
            <Button
              onClick={handleNext}
              disabled={!answers[currentQuestion.id]}
            >
              {isLastQuestion ? "Get Results" : "Next"}
              {!isLastQuestion && <ArrowRight className="ml-2 h-4 w-4" />}
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="mt-6 text-center">
        <Button variant="ghost" onClick={handleRestart}>
          <RefreshCw className="mr-2 h-4 w-4" />
          Start Over
        </Button>
      </div>
    </div>
  )
}