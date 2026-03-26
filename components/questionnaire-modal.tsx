'use client'

import React, { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'
import { useQuestionnaire } from '@/context/questionnaire-context'
import { ClientDetails, questionnaireQuestions } from '@/lib/questionnaire-data'
import { X } from 'lucide-react'

type Step = 'client-details' | 'questions' | 'thank-you'

export function QuestionnaireModal() {
  const { isOpen, closeQuestionnaire } = useQuestionnaire()
  const [currentStep, setCurrentStep] = useState<Step>('client-details')
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)

  const [clientDetails, setClientDetails] = useState<ClientDetails>({
    name: '',
    contactNumber: '',
    email: '',
    projectAddress: '',
    projectType: '',
    bhkType: '',
  })

  const [answers, setAnswers] = useState<Record<string, string[]>>({})

  const handleClientDetailsChange = (field: keyof ClientDetails, value: string) => {
    setClientDetails(prev => ({ ...prev, [field]: value }))
  }

  const handleClientDetailsSubmit = () => {
    if (!clientDetails.name || !clientDetails.contactNumber || !clientDetails.email || !clientDetails.projectAddress || !clientDetails.projectType || !clientDetails.bhkType) {
      alert('Please fill in all fields')
      return
    }
    setCurrentStep('questions')
    setCurrentQuestionIndex(0)
  }

  const handleAnswerSelect = (optionId: string) => {
    const currentQuestion = questionnaireQuestions[currentQuestionIndex]
    setAnswers(prev => {
      const currentAnswers = prev[currentQuestion.id] || []
      if (currentQuestion.isMultiSelect) {
        if (currentAnswers.includes(optionId)) {
          return {
            ...prev,
            [currentQuestion.id]: currentAnswers.filter(id => id !== optionId),
          }
        }
        return {
          ...prev,
          [currentQuestion.id]: [...currentAnswers, optionId],
        }
      }
      return {
        ...prev,
        [currentQuestion.id]: [optionId],
      }
    })
  }

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questionnaireQuestions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1)
    }
  }

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1)
    }
  }

  const handleSubmit = () => {
    // Save the complete form data
    const completeData = {
      clientDetails,
      answers,
      submittedAt: new Date().toISOString(),
    }
    console.log('Form submitted:', completeData)
    // Here you would typically send this to your backend
    setCurrentStep('thank-you')
  }

  const isLastQuestion = currentQuestionIndex === questionnaireQuestions.length - 1
  const currentQuestion = questionnaireQuestions[currentQuestionIndex]

  return (
    <Dialog open={isOpen} onOpenChange={closeQuestionnaire}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Close button */}
        <button
          onClick={closeQuestionnaire}
          className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none"
        >
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </button>

        {currentStep === 'client-details' && (
          <>
            <DialogHeader>
              <DialogTitle>Client Details</DialogTitle>
            </DialogHeader>
            <div className="space-y-6 py-4">
              <div>
                <Label htmlFor="name">Full Name *</Label>
                <Input
                  id="name"
                  placeholder="Enter your full name"
                  value={clientDetails.name}
                  onChange={e => handleClientDetailsChange('name', e.target.value)}
                  className="mt-2"
                />
              </div>

              <div>
                <Label htmlFor="contact">Contact Number *</Label>
                <Input
                  id="contact"
                  placeholder="Enter your phone number"
                  value={clientDetails.contactNumber}
                  onChange={e => handleClientDetailsChange('contactNumber', e.target.value)}
                  className="mt-2"
                />
              </div>

              <div>
                <Label htmlFor="email">Email ID *</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={clientDetails.email}
                  onChange={e => handleClientDetailsChange('email', e.target.value)}
                  className="mt-2"
                />
              </div>

              <div>
                <Label htmlFor="address">Project Address *</Label>
                <Input
                  id="address"
                  placeholder="Enter project address"
                  value={clientDetails.projectAddress}
                  onChange={e => handleClientDetailsChange('projectAddress', e.target.value)}
                  className="mt-2"
                />
              </div>

              <div>
                <Label htmlFor="projectType">Project Type *</Label>
                <Select value={clientDetails.projectType} onValueChange={value => handleClientDetailsChange('projectType', value as any)}>
                  <SelectTrigger id="projectType" className="mt-2">
                    <SelectValue placeholder="Select project type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="apartment">Apartment</SelectItem>
                    <SelectItem value="villa">Villa</SelectItem>
                    <SelectItem value="independent-house">Independent House</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="bhkType">BHK Type *</Label>
                <Select value={clientDetails.bhkType} onValueChange={value => handleClientDetailsChange('bhkType', value as any)}>
                  <SelectTrigger id="bhkType" className="mt-2">
                    <SelectValue placeholder="Select BHK type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1bhk">1 BHK</SelectItem>
                    <SelectItem value="2bhk">2 BHK</SelectItem>
                    <SelectItem value="3bhk">3 BHK</SelectItem>
                    <SelectItem value="duplex">Duplex</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button onClick={handleClientDetailsSubmit} className="w-full">
                Continue to Questions
              </Button>
            </div>
          </>
        )}

        {currentStep === 'questions' && (
          <>
            <DialogHeader>
              <DialogTitle>
                {currentQuestion.section} - Question {currentQuestionIndex + 1} of {questionnaireQuestions.length}
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-6 py-4">
              <div>
                <h3 className="text-lg font-semibold mb-4">{currentQuestion.title}</h3>
                <div className="space-y-3">
                  {currentQuestion.options.map(option => (
                    <div key={option.id} className="flex items-center space-x-2">
                      <Checkbox
                        id={option.id}
                        checked={answers[currentQuestion.id]?.includes(option.id) || false}
                        onCheckedChange={() => handleAnswerSelect(option.id)}
                      />
                      <label htmlFor={option.id} className="text-sm cursor-pointer">
                        {option.label}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-between gap-3 pt-4">
                <Button
                  variant="outline"
                  onClick={handlePreviousQuestion}
                  disabled={currentQuestionIndex === 0}
                >
                  Previous
                </Button>

                {!isLastQuestion ? (
                  <Button onClick={handleNextQuestion}>
                    Next
                  </Button>
                ) : (
                  <Button onClick={handleSubmit} className="bg-green-600 hover:bg-green-700">
                    Submit
                  </Button>
                )}
              </div>
            </div>
          </>
        )}

        {currentStep === 'thank-you' && (
          <>
            <DialogHeader>
              <DialogTitle>Thank You!</DialogTitle>
            </DialogHeader>
            <div className="flex flex-col items-center justify-center py-8">
              <div className="text-6xl mb-4">🎉</div>
              <h3 className="text-2xl font-bold text-center mb-2">Thank You for Your Response!</h3>
              <p className="text-gray-600 text-center mb-6">
                We have received your questionnaire. Our team will contact you soon with personalized recommendations.
              </p>
              <Button onClick={closeQuestionnaire} className="w-full">
                Close
              </Button>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}
