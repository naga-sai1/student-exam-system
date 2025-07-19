"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { BookOpen, Code, Database, Globe, Palette, Coffee, LogOut, Trophy, Clock, Target } from "lucide-react"
import Link from "next/link"

interface User {
  name: string
  email: string
}

interface ExamResult {
  subject: string
  score: number
  totalQuestions: number
  date: string
}

export default function Dashboard() {
  const [user, setUser] = useState<User | null>(null)
  const [examResults, setExamResults] = useState<ExamResult[]>([])

  useEffect(() => {
    const userData = localStorage.getItem("user")
    if (userData) {
      setUser(JSON.parse(userData))
    } else {
      window.location.href = "/"
    }

    // Load exam results
    const results = localStorage.getItem("examResults")
    if (results) {
      setExamResults(JSON.parse(results))
    }
  }, [])

  const handleLogout = () => {
    localStorage.removeItem("user")
    localStorage.removeItem("examResults")
    window.location.href = "/"
  }

  const subjects = [
    {
      name: "HTML",
      icon: Globe,
      color: "bg-orange-500",
      description: "HyperText Markup Language fundamentals",
      difficulty: "Beginner",
    },
    {
      name: "CSS",
      icon: Palette,
      color: "bg-blue-500",
      description: "Cascading Style Sheets and responsive design",
      difficulty: "Beginner",
    },
    {
      name: "Python",
      icon: Code,
      color: "bg-green-500",
      description: "Python programming and object-oriented concepts",
      difficulty: "Intermediate",
    },
    {
      name: "Java",
      icon: Coffee,
      color: "bg-red-500",
      description: "Java programming and OOP principles",
      difficulty: "Intermediate",
    },
    {
      name: "C",
      icon: Code,
      color: "bg-gray-600",
      description: "C programming language fundamentals",
      difficulty: "Intermediate",
    },
    {
      name: "C++",
      icon: Database,
      color: "bg-purple-500",
      description: "C++ and advanced object-oriented programming",
      difficulty: "Advanced",
    },
  ]

  const getSubjectStats = (subject: string) => {
    const subjectResults = examResults.filter((result) => result.subject === subject)
    if (subjectResults.length === 0) return null

    const totalAttempts = subjectResults.length
    const averageScore = subjectResults.reduce((sum, result) => sum + result.score, 0) / totalAttempts
    const bestScore = Math.max(...subjectResults.map((result) => result.score))

    return { totalAttempts, averageScore, bestScore }
  }

  if (!user) {
    return <div>Loading...</div>
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <BookOpen className="h-8 w-8 text-indigo-600" />
              <h1 className="ml-2 text-2xl font-bold text-gray-900">ExamPortal</h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-gray-700">Welcome, {user.name}</span>
              <Button variant="outline" onClick={handleLogout}>
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Exams Taken</CardTitle>
              <Target className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{examResults.length}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Average Score</CardTitle>
              <Trophy className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {examResults.length > 0
                  ? Math.round(
                      examResults.reduce((sum, result) => sum + (result.score / result.totalQuestions) * 100, 0) /
                        examResults.length,
                    )
                  : 0}
                %
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Best Score</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {examResults.length > 0
                  ? Math.max(...examResults.map((result) => Math.round((result.score / result.totalQuestions) * 100)))
                  : 0}
                %
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Available Exams */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Available Exams</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {subjects.map((subject) => {
              const stats = getSubjectStats(subject.name)
              const Icon = subject.icon

              return (
                <Card key={subject.name} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className={`p-2 rounded-lg ${subject.color}`}>
                          <Icon className="h-6 w-6 text-white" />
                        </div>
                        <div className="ml-3">
                          <CardTitle className="text-lg">{subject.name}</CardTitle>
                          <Badge variant="secondary">{subject.difficulty}</Badge>
                        </div>
                      </div>
                    </div>
                    <CardDescription className="mt-2">{subject.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {stats && (
                      <div className="mb-4 space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Attempts: {stats.totalAttempts}</span>
                          <span>Best: {Math.round((stats.bestScore / 20) * 100)}%</span>
                        </div>
                        <Progress value={(stats.averageScore / 20) * 100} className="h-2" />
                        <p className="text-xs text-gray-500">Average: {Math.round((stats.averageScore / 20) * 100)}%</p>
                      </div>
                    )}
                    <div className="flex justify-between items-center text-sm text-gray-500 mb-4">
                      <span>20 Questions</span>
                      <span>30 Minutes</span>
                    </div>
                    <Link href={`/exam/${subject.name.toLowerCase()}`}>
                      <Button className="w-full">Start Exam</Button>
                    </Link>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>

        {/* Recent Results */}
        {examResults.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Recent Results</h2>
            <Card>
              <CardHeader>
                <CardTitle>Exam History</CardTitle>
                <CardDescription>Your recent exam performances</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {examResults
                    .slice(-5)
                    .reverse()
                    .map((result, index) => (
                      <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center">
                          <div className="ml-3">
                            <p className="font-medium">{result.subject}</p>
                            <p className="text-sm text-gray-500">{result.date}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-lg">
                            {result.score}/{result.totalQuestions}
                          </p>
                          <p className="text-sm text-gray-500">
                            {Math.round((result.score / result.totalQuestions) * 100)}%
                          </p>
                        </div>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}
