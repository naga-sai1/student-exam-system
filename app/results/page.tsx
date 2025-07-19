"use client"

import { useEffect, useState } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Trophy, Target, CheckCircle, XCircle, Home, RotateCcw } from "lucide-react"

export default function ResultsPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [examResult, setExamResult] = useState<any>(null)

  const subject = searchParams.get("subject")
  const score = Number.parseInt(searchParams.get("score") || "0")
  const total = Number.parseInt(searchParams.get("total") || "20")

  useEffect(() => {
    // Get the latest exam result for detailed view
    const results = JSON.parse(localStorage.getItem("examResults") || "[]")
    const latestResult = results[results.length - 1]
    setExamResult(latestResult)
  }, [])

  const percentage = Math.round((score / total) * 100)

  const getGrade = (percentage: number) => {
    if (percentage >= 90) return { grade: "A+", color: "bg-green-600" }
    if (percentage >= 80) return { grade: "A", color: "bg-green-500" }
    if (percentage >= 70) return { grade: "B", color: "bg-blue-500" }
    if (percentage >= 60) return { grade: "C", color: "bg-yellow-500" }
    if (percentage >= 50) return { grade: "D", color: "bg-orange-500" }
    return { grade: "F", color: "bg-red-500" }
  }

  const gradeInfo = getGrade(percentage)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <h1 className="text-2xl font-bold text-gray-900">Exam Results</h1>
            <div className="flex space-x-2">
              <Button variant="outline" onClick={() => router.push("/dashboard")}>
                <Home className="h-4 w-4 mr-2" />
                Dashboard
              </Button>
              <Button onClick={() => router.push(`/exam/${subject}`)}>
                <RotateCcw className="h-4 w-4 mr-2" />
                Retake Exam
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Score Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="text-center">
            <CardHeader>
              <div
                className={`w-16 h-16 rounded-full ${gradeInfo.color} flex items-center justify-center mx-auto mb-2`}
              >
                <Trophy className="h-8 w-8 text-white" />
              </div>
              <CardTitle>Grade</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{gradeInfo.grade}</div>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <div className="w-16 h-16 rounded-full bg-blue-500 flex items-center justify-center mx-auto mb-2">
                <Target className="h-8 w-8 text-white" />
              </div>
              <CardTitle>Score</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">
                {score}/{total}
              </div>
              <div className="text-sm text-gray-500">{percentage}%</div>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <div className="w-16 h-16 rounded-full bg-purple-500 flex items-center justify-center mx-auto mb-2">
                <CheckCircle className="h-8 w-8 text-white" />
              </div>
              <CardTitle>Subject</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{subject?.toUpperCase()}</div>
            </CardContent>
          </Card>
        </div>

        {/* Performance Analysis */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Performance Analysis</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium">Overall Performance</span>
                  <span className="text-sm text-gray-500">{percentage}%</span>
                </div>
                <Progress value={percentage} className="h-3" />
              </div>

              <div className="grid grid-cols-2 gap-4 mt-6">
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                  <span>Correct Answers: {score}</span>
                </div>
                <div className="flex items-center">
                  <XCircle className="h-5 w-5 text-red-500 mr-2" />
                  <span>Incorrect Answers: {total - score}</span>
                </div>
              </div>

              <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                <h4 className="font-medium mb-2">Performance Feedback:</h4>
                <p className="text-sm text-gray-600">
                  {percentage >= 80
                    ? "Excellent work! You have a strong understanding of the subject."
                    : percentage >= 60
                      ? "Good job! There's room for improvement in some areas."
                      : "Keep practicing! Review the concepts and try again."}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Detailed Results */}
        {examResult && (
          <Card>
            <CardHeader>
              <CardTitle>Question Review</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {examResult.questions.map((question: any, index: number) => {
                  const userAnswer = examResult.answers[index]
                  const isCorrect = userAnswer === question.correctAnswer

                  return (
                    <div key={index} className="border-b pb-4 last:border-b-0">
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="font-medium text-sm">Question {index + 1}</h4>
                        <Badge variant={isCorrect ? "default" : "destructive"}>
                          {isCorrect ? "Correct" : "Incorrect"}
                        </Badge>
                      </div>

                      <p className="text-sm mb-3">{question.question}</p>

                      <div className="space-y-2">
                        {question.options.map((option: string, optionIndex: number) => (
                          <div
                            key={optionIndex}
                            className={`p-2 rounded text-sm ${
                              optionIndex === question.correctAnswer
                                ? "bg-green-100 border border-green-300"
                                : optionIndex === userAnswer && !isCorrect
                                  ? "bg-red-100 border border-red-300"
                                  : "bg-gray-50"
                            }`}
                          >
                            <div className="flex items-center">
                              {optionIndex === question.correctAnswer && (
                                <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                              )}
                              {optionIndex === userAnswer && !isCorrect && (
                                <XCircle className="h-4 w-4 text-red-600 mr-2" />
                              )}
                              <span>{option}</span>
                            </div>
                          </div>
                        ))}
                      </div>

                      {userAnswer === undefined && <p className="text-sm text-gray-500 mt-2">Not answered</p>}
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
