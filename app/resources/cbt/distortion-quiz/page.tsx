'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { 
  Brain, ChevronLeft, ChevronRight, RotateCcw, Award,
  Target, TrendingUp, BookOpen, CheckCircle, X
} from 'lucide-react'
import Link from 'next/link'
import { cognitiveDistortions } from '@/lib/cbt-data'

interface QuizQuestion {
  id: string
  scenario: string
  thought: string
  options: string[]
  correctAnswer: string
  explanation: string
  category: 'recovery' | 'relationships' | 'self-worth' | 'daily-life'
}

interface QuizResult {
  id: string
  date: string
  score: number
  totalQuestions: number
  distortionPatterns: { [key: string]: number }
  timeSpent: number
  completed: boolean
}

const quizQuestions: QuizQuestion[] = [
  {
    id: '1',
    scenario: 'You attend your first recovery meeting and notice some people talking and laughing before it starts.',
    thought: 'Everyone here already knows each other. They probably think I don\'t belong here.',
    options: ['All-or-Nothing Thinking', 'Jumping to Conclusions', 'Mental Filter', 'Personalization'],
    correctAnswer: 'jumping-conclusions',
    explanation: 'You\'re making assumptions about what others think without evidence. This is mind-reading, a form of jumping to conclusions.',
    category: 'recovery'
  },
  {
    id: '2', 
    scenario: 'You had 30 days of sobriety but had a drink at a stressful family dinner.',
    thought: 'I\'m a complete failure. I\'ll never be able to stay sober.',
    options: ['Overgeneralization', 'All-or-Nothing Thinking', 'Emotional Reasoning', 'Labeling'],
    correctAnswer: 'all-or-nothing',
    explanation: 'You\'re seeing one slip as complete failure, ignoring the 30 successful days. Recovery has setbacks - one event doesn\'t define your entire journey.',
    category: 'recovery'
  },
  {
    id: '3',
    scenario: 'Your sponsor compliments you on your progress in the program.',
    thought: 'They\'re just being nice. My progress isn\'t really that impressive.',
    options: ['Disqualifying the Positive', 'Mental Filter', 'Should Statements', 'Minimization'],
    correctAnswer: 'disqualifying-positive',
    explanation: 'You\'re dismissing genuine positive feedback by assuming it "doesn\'t count." This prevents you from acknowledging your real progress.',
    category: 'recovery'
  },
  {
    id: '4',
    scenario: 'You feel anxious before giving a presentation at work.',
    thought: 'I feel terrified, so this presentation is going to be a disaster.',
    options: ['Emotional Reasoning', 'Fortune Telling', 'Catastrophizing', 'All-or-Nothing Thinking'],
    correctAnswer: 'emotional-reasoning',
    explanation: 'You\'re assuming your anxious feelings reflect reality. Feeling nervous doesn\'t mean the presentation will go badly.',
    category: 'daily-life'
  },
  {
    id: '5',
    scenario: 'A friend cancels plans with you at the last minute.',
    thought: 'I must have done something wrong. They probably don\'t want to be around me anymore.',
    options: ['Personalization', 'Jumping to Conclusions', 'Mental Filter', 'Overgeneralization'],
    correctAnswer: 'personalization',
    explanation: 'You\'re taking responsibility for something that likely has nothing to do with you. People cancel plans for many reasons.',
    category: 'relationships'
  },
  {
    id: '6',
    scenario: 'You have a productive day but make one small mistake at work.',
    thought: 'This mistake ruined my whole day. I can\'t do anything right.',
    options: ['Mental Filter', 'All-or-Nothing Thinking', 'Magnification', 'Overgeneralization'],
    correctAnswer: 'mental-filter',
    explanation: 'You\'re focusing entirely on one small negative detail while ignoring all the positive things you accomplished today.',
    category: 'daily-life'
  },
  {
    id: '7',
    scenario: 'You\'ve been sober for 6 months and someone asks how you did it.',
    thought: 'I should be further along by now. Six months isn\'t really that long.',
    options: ['Should Statements', 'Disqualifying the Positive', 'Minimization', 'Mental Filter'],
    correctAnswer: 'should-statements',
    explanation: 'You\'re being unreasonably demanding of yourself with "should" thinking. Six months is a significant achievement worthy of recognition.',
    category: 'recovery'
  },
  {
    id: '8',
    scenario: 'You have a conflict with your partner about household chores.',
    thought: 'I\'m a terrible partner. I always mess up our relationship.',
    options: ['Labeling', 'Overgeneralization', 'All-or-Nothing Thinking', 'Emotional Reasoning'],
    correctAnswer: 'labeling',
    explanation: 'You\'re defining yourself globally based on one situation. One disagreement doesn\'t make you a "terrible partner."',
    category: 'relationships'
  },
  {
    id: '9',
    scenario: 'You receive constructive feedback from your therapist about a pattern you have.',
    thought: 'They think I\'m hopeless. I\'m not making any progress in therapy.',
    options: ['Jumping to Conclusions', 'All-or-Nothing Thinking', 'Emotional Reasoning', 'Personalization'],
    correctAnswer: 'jumping-conclusions',
    explanation: 'You\'re mind-reading by assuming what your therapist thinks. Constructive feedback is actually a sign they believe you can grow.',
    category: 'recovery'
  },
  {
    id: '10',
    scenario: 'You attend a social event where alcohol is served and you feel tempted but don\'t drink.',
    thought: 'That was too close. I almost relapsed - I\'m not as strong as I thought.',
    options: ['Disqualifying the Positive', 'Magnification', 'All-or-Nothing Thinking', 'Mental Filter'],
    correctAnswer: 'disqualifying-positive',
    explanation: 'You successfully resisted temptation, which shows strength, but you\'re dismissing this victory and focusing on the difficulty instead.',
    category: 'recovery'
  }
]

export default function DistortionQuizPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<string>('')
  const [showExplanation, setShowExplanation] = useState(false)
  const [answers, setAnswers] = useState<string[]>([])
  const [quizStartTime, setQuizStartTime] = useState<number>(0)
  const [results, setResults] = useState<QuizResult[]>([])
  const [isCompleted, setIsCompleted] = useState(false)
  const [currentScore, setCurrentScore] = useState(0)

  // Load results from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('distortionQuizResults')
    if (saved) {
      setResults(JSON.parse(saved))
    }
    setQuizStartTime(Date.now())
  }, [])

  // Save results to localStorage
  useEffect(() => {
    if (results.length > 0) {
      localStorage.setItem('distortionQuizResults', JSON.stringify(results))
    }
  }, [results])

  const handleAnswerSelect = (optionIndex: number) => {
    const question = quizQuestions[currentQuestion]
    const selectedOption = question.options[optionIndex]
    const distortionKey = question.correctAnswer
    const isCorrect = cognitiveDistortions.find(d => d.id === distortionKey)?.name === selectedOption
    
    setSelectedAnswer(selectedOption)
    setAnswers([...answers, isCorrect ? 'correct' : 'incorrect'])
    
    if (isCorrect) {
      setCurrentScore(currentScore + 1)
    }
    
    setShowExplanation(true)
  }

  const handleNext = () => {
    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
      setSelectedAnswer('')
      setShowExplanation(false)
    } else {
      completeQuiz()
    }
  }

  const completeQuiz = () => {
    const endTime = Date.now()
    const timeSpent = Math.floor((endTime - quizStartTime) / 1000)
    
    // Calculate distortion patterns
    const patterns: { [key: string]: number } = {}
    quizQuestions.forEach((question, index) => {
      if (answers[index] === 'correct') {
        const distortionName = cognitiveDistortions.find(d => d.id === question.correctAnswer)?.name || question.correctAnswer
        patterns[distortionName] = (patterns[distortionName] || 0) + 1
      }
    })

    const newResult: QuizResult = {
      id: Date.now().toString(),
      date: new Date().toISOString(),
      score: currentScore,
      totalQuestions: quizQuestions.length,
      distortionPatterns: patterns,
      timeSpent,
      completed: true
    }

    setResults([newResult, ...results])
    setIsCompleted(true)
  }

  const resetQuiz = () => {
    setCurrentQuestion(0)
    setSelectedAnswer('')
    setShowExplanation(false)
    setAnswers([])
    setCurrentScore(0)
    setIsCompleted(false)
    setQuizStartTime(Date.now())
  }

  const getCurrentDistortion = () => {
    const question = quizQuestions[currentQuestion]
    return cognitiveDistortions.find(d => d.id === question.correctAnswer)
  }

  const progress = ((currentQuestion + 1) / quizQuestions.length) * 100
  const averageScore = results.length > 0 
    ? results.reduce((acc, result) => acc + result.score, 0) / results.length 
    : 0

  if (isCompleted) {
    const lastResult = results[0]
    const percentage = Math.round((lastResult.score / lastResult.totalQuestions) * 100)
    
    return (
      <div className="container max-w-4xl py-10">
        <div className="text-center space-y-6">
          <div className="flex justify-center">
            <Award className="h-16 w-16 text-primary" />
          </div>
          
          <h1 className="text-4xl font-bold">Quiz Complete!</h1>
          
          <Card>
            <CardHeader>
              <CardTitle>Your Results</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-3">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary">{lastResult.score}/{lastResult.totalQuestions}</div>
                  <div className="text-sm text-muted-foreground">Correct Answers</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary">{percentage}%</div>
                  <div className="text-sm text-muted-foreground">Accuracy</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary">{Math.floor(lastResult.timeSpent / 60)}m</div>
                  <div className="text-sm text-muted-foreground">Time Spent</div>
                </div>
              </div>

              {Object.keys(lastResult.distortionPatterns).length > 0 && (
                <div>
                  <h3 className="font-semibold mb-2">Distortions You Identified Correctly:</h3>
                  <div className="flex flex-wrap gap-2">
                    {Object.entries(lastResult.distortionPatterns).map(([distortion, count]) => (
                      <Badge key={distortion} variant="secondary">
                        {distortion} ({count})
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex gap-4 justify-center">
                <Button onClick={resetQuiz}>
                  <RotateCcw className="mr-2 h-4 w-4" />
                  Take Again
                </Button>
                <Button variant="outline" asChild>
                  <Link href="/resources/cbt">
                    <BookOpen className="mr-2 h-4 w-4" />
                    Learn More CBT
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          {results.length > 1 && (
            <Card>
              <CardHeader>
                <CardTitle>Your Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Average Score</span>
                    <span>{Math.round(averageScore)}/{quizQuestions.length}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Quizzes Taken</span>
                    <span>{results.length}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Best Score</span>
                    <span>{Math.max(...results.map(r => r.score))}/{quizQuestions.length}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    )
  }

  const currentQuestionData = quizQuestions[currentQuestion]
  const currentDistortion = getCurrentDistortion()

  return (
    <div className="container max-w-4xl py-10">
      {/* Header */}
      <div className="mb-8">
        <Link href="/resources/cbt" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-4">
          <ChevronLeft className="mr-1 h-4 w-4" />
          Back to CBT Resources
        </Link>
        <h1 className="text-4xl font-bold mb-4 flex items-center gap-2">
          <Brain className="h-8 w-8 text-primary" />
          Cognitive Distortion Quiz
        </h1>
        <p className="text-xl text-muted-foreground">
          Test your ability to identify thinking patterns in recovery scenarios
        </p>
      </div>

      {/* Progress */}
      <div className="mb-6">
        <div className="flex justify-between text-sm mb-2">
          <span>Question {currentQuestion + 1} of {quizQuestions.length}</span>
          <span>Score: {currentScore}/{currentQuestion + (showExplanation ? 1 : 0)}</span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      {/* Quiz Card */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <Badge variant="outline">{currentQuestionData.category}</Badge>
            <Badge variant="secondary">
              <Target className="h-3 w-3 mr-1" />
              Pattern Recognition
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Scenario */}
          <div>
            <h3 className="font-semibold mb-2">Scenario:</h3>
            <p className="text-muted-foreground">{currentQuestionData.scenario}</p>
          </div>

          {/* Thought */}
          <div>
            <h3 className="font-semibold mb-2">Automatic Thought:</h3>
            <p className="italic border-l-4 border-primary pl-4 py-2 bg-muted/50">
              "{currentQuestionData.thought}"
            </p>
          </div>

          {/* Question */}
          <div>
            <h3 className="font-semibold mb-4">
              What type of cognitive distortion is this?
            </h3>
            
            {!showExplanation ? (
              <div className="grid gap-3">
                {currentQuestionData.options.map((option, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    className="justify-start h-auto py-4 px-6 text-left"
                    onClick={() => handleAnswerSelect(index)}
                    disabled={selectedAnswer !== ''}
                  >
                    {option}
                  </Button>
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                <div className="grid gap-3">
                  {currentQuestionData.options.map((option, index) => {
                    const isSelected = option === selectedAnswer
                    const isCorrect = currentDistortion?.name === option
                    
                    return (
                      <div
                        key={index}
                        className={`p-4 border-2 rounded-lg flex items-center justify-between ${
                          isSelected && isCorrect
                            ? 'border-green-500 bg-green-50'
                            : isSelected && !isCorrect
                            ? 'border-red-500 bg-red-50'
                            : isCorrect
                            ? 'border-green-500 bg-green-50'
                            : 'border-muted'
                        }`}
                      >
                        <span>{option}</span>
                        {isSelected && isCorrect && <CheckCircle className="h-5 w-5 text-green-600" />}
                        {isSelected && !isCorrect && <X className="h-5 w-5 text-red-600" />}
                        {!isSelected && isCorrect && <CheckCircle className="h-5 w-5 text-green-600" />}
                      </div>
                    )
                  })}
                </div>

                {/* Explanation */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h4 className="font-semibold text-blue-900 mb-2">Explanation:</h4>
                  <p className="text-blue-800 text-sm mb-3">{currentQuestionData.explanation}</p>
                  
                  {currentDistortion && (
                    <div className="border-t border-blue-200 pt-3">
                      <h5 className="font-medium text-blue-900 mb-1">{currentDistortion.name}</h5>
                      <p className="text-xs text-blue-700">{currentDistortion.description}</p>
                    </div>
                  )}
                </div>

                {/* Next Button */}
                <div className="flex justify-end">
                  <Button onClick={handleNext}>
                    {currentQuestion < quizQuestions.length - 1 ? (
                      <>
                        Next Question
                        <ChevronRight className="ml-2 h-4 w-4" />
                      </>
                    ) : (
                      'Complete Quiz'
                    )}
                  </Button>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Tips */}
      {!showExplanation && (
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Tips for Success</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• Read each scenario carefully and put yourself in that situation</li>
              <li>• Focus on the pattern of thinking, not just the content</li>
              <li>• Consider: Is this thought helpful? Is it based on facts?</li>
              <li>• Remember: We all have these patterns - awareness is the first step</li>
            </ul>
          </CardContent>
        </Card>
      )}
    </div>
  )
}