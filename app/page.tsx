"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BookOpen, Users, Award, TrendingUp } from "lucide-react"

export default function HomePage() {
  const [loginData, setLoginData] = useState({ email: "", password: "" })
  const [registerData, setRegisterData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  })

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    // Store user session (in real app, this would be handled by authentication)
    localStorage.setItem(
      "user",
      JSON.stringify({
        email: loginData.email,
        name: loginData.email.split("@")[0],
      }),
    )
    window.location.href = "/dashboard"
  }

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault()
    if (registerData.password !== registerData.confirmPassword) {
      alert("Passwords do not match!")
      return
    }
    // Store user session
    localStorage.setItem(
      "user",
      JSON.stringify({
        email: registerData.email,
        name: registerData.name,
      }),
    )
    window.location.href = "/dashboard"
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <BookOpen className="h-8 w-8 text-indigo-600" />
              <h1 className="ml-2 text-2xl font-bold text-gray-900">ExamPortal</h1>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Hero content */}
          <div>
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Master Programming with Interactive Exams</h2>
            <p className="text-xl text-gray-600 mb-8">
              Test your knowledge in HTML, CSS, Python, Java, C, and C++ with our comprehensive exam system. Each exam
              features 20 carefully crafted questions with intelligent shuffling.
            </p>

            <div className="grid grid-cols-2 gap-6 mb-8">
              <div className="flex items-center">
                <Users className="h-6 w-6 text-indigo-600 mr-3" />
                <span className="text-gray-700">Multiple Subjects</span>
              </div>
              <div className="flex items-center">
                <Award className="h-6 w-6 text-indigo-600 mr-3" />
                <span className="text-gray-700">Instant Results</span>
              </div>
              <div className="flex items-center">
                <TrendingUp className="h-6 w-6 text-indigo-600 mr-3" />
                <span className="text-gray-700">Progress Tracking</span>
              </div>
              <div className="flex items-center">
                <BookOpen className="h-6 w-6 text-indigo-600 mr-3" />
                <span className="text-gray-700">20 Questions/Exam</span>
              </div>
            </div>
          </div>

          {/* Right side - Login/Register forms */}
          <div>
            <Card className="w-full max-w-md mx-auto">
              <CardHeader>
                <CardTitle>Welcome to ExamPortal</CardTitle>
                <CardDescription>Login or create an account to start your exam journey</CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="login" className="w-full">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="login">Login</TabsTrigger>
                    <TabsTrigger value="register">Register</TabsTrigger>
                  </TabsList>

                  <TabsContent value="login">
                    <form onSubmit={handleLogin} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="Enter your email"
                          value={loginData.email}
                          onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="password">Password</Label>
                        <Input
                          id="password"
                          type="password"
                          placeholder="Enter your password"
                          value={loginData.password}
                          onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                          required
                        />
                      </div>
                      <Button type="submit" className="w-full">
                        Login
                      </Button>
                    </form>
                  </TabsContent>

                  <TabsContent value="register">
                    <form onSubmit={handleRegister} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        <Input
                          id="name"
                          type="text"
                          placeholder="Enter your full name"
                          value={registerData.name}
                          onChange={(e) => setRegisterData({ ...registerData, name: e.target.value })}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="reg-email">Email</Label>
                        <Input
                          id="reg-email"
                          type="email"
                          placeholder="Enter your email"
                          value={registerData.email}
                          onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="reg-password">Password</Label>
                        <Input
                          id="reg-password"
                          type="password"
                          placeholder="Create a password"
                          value={registerData.password}
                          onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="confirm-password">Confirm Password</Label>
                        <Input
                          id="confirm-password"
                          type="password"
                          placeholder="Confirm your password"
                          value={registerData.confirmPassword}
                          onChange={(e) => setRegisterData({ ...registerData, confirmPassword: e.target.value })}
                          required
                        />
                      </div>
                      <Button type="submit" className="w-full">
                        Register
                      </Button>
                    </form>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
