'use client'

import React, { useState } from 'react'
import { questionnaireQuestions } from '@/lib/questionnaire-data'

type FormStep = 'client-details' | 'questions' | 'thank-you'

interface ClientDetailsForm {
  name: string
  email: string
  phone: string
  projectType: string
}

export function CombinedContactForm() {
  const [currentStep, setCurrentStep] = useState<FormStep>('client-details')
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)

  const [clientDetails, setClientDetails] = useState<ClientDetailsForm>({
    name: '',
    email: '',
    phone: '',
    projectType: '',
  })

  const [answers, setAnswers] = useState<Record<string, string[]>>({})

  const handleClientDetailsChange = (field: keyof ClientDetailsForm, value: string) => {
    setClientDetails(prev => ({ ...prev, [field]: value }))
  }

  const handleClientDetailsSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!clientDetails.name || !clientDetails.email || !clientDetails.phone || !clientDetails.projectType) {
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
    const completeData = {
      clientDetails,
      answers,
      submittedAt: new Date().toISOString(),
    }
    console.log('Form submitted:', completeData)
    setCurrentStep('thank-you')
  }

  const isLastQuestion = currentQuestionIndex === questionnaireQuestions.length - 1
  const currentQuestion = questionnaireQuestions[currentQuestionIndex]

  return (
    <div>
      {currentStep === 'client-details' && (
        <div>
          <h2 className="text-2xl font-heading font-bold text-primary mb-6">
            Send us a Message
          </h2>

          <form onSubmit={handleClientDetailsSubmit} className="space-y-4">
            {/* Name */}
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-semibold text-primary mb-2"
              >
                Full Name <span className="text-accent">*</span>
              </label>
              <input
                type="text"
                id="name"
                placeholder="Your name"
                value={clientDetails.name}
                onChange={e => handleClientDetailsChange('name', e.target.value)}
                required
                className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all"
              />
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-semibold text-primary mb-2"
              >
                Email Address <span className="text-accent">*</span>
              </label>
              <input
                type="email"
                id="email"
                placeholder="your@email.com"
                value={clientDetails.email}
                onChange={e => handleClientDetailsChange('email', e.target.value)}
                required
                className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all"
              />
            </div>

            {/* Phone */}
            <div>
              <label
                htmlFor="phone"
                className="block text-sm font-semibold text-primary mb-2"
              >
                Phone Number <span className="text-accent">*</span>
              </label>
              <input
                type="tel"
                id="phone"
                placeholder="+91 XXXXX XXXXX"
                value={clientDetails.phone}
                onChange={e => handleClientDetailsChange('phone', e.target.value)}
                required
                className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all"
              />
            </div>

            {/* Project Type */}
            <div>
              <label
                htmlFor="projectType"
                className="block text-sm font-semibold text-primary mb-2"
              >
                Project Type <span className="text-accent">*</span>
              </label>
              <select
                id="projectType"
                value={clientDetails.projectType}
                onChange={e => handleClientDetailsChange('projectType', e.target.value)}
                required
                className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all"
              >
                <option value="">Select a project type</option>
                <option value="residential">Residential Design</option>
                <option value="commercial">Commercial Space</option>
                <option value="renovation">Renovation</option>
                <option value="consultation">Consultation</option>
                <option value="other">Other</option>
              </select>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-[#1a1a3d] to-[#2d2d5f] text-white rounded-lg font-semibold hover:scale-105 transition-all flex items-center justify-center gap-2"
            >
              Continue to Design Questionnaire
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </button>
          </form>
        </div>
      )}

      {currentStep === 'questions' && (
        <div>
          <div className="mb-8">
            <div className="flex justify-between items-center mb-3">
              <h2 className="text-2xl font-heading font-bold text-primary">
                {currentQuestion.section}
              </h2>
              <span className="text-sm font-semibold text-accent">
                Question {currentQuestionIndex + 1} of {questionnaireQuestions.length}
              </span>
            </div>
            <div className="w-full bg-border rounded-full h-2">
              <div
                className="bg-gradient-to-r from-accent to-primary h-2 rounded-full transition-all duration-300"
                style={{ width: `${((currentQuestionIndex + 1) / questionnaireQuestions.length) * 100}%` }}
              />
            </div>
          </div>

          <div className="mb-8">
            <h3 className="text-xl font-semibold text-primary mb-6">{currentQuestion.title}</h3>
            <div className="space-y-4">
              {currentQuestion.options.map(option => (
                <div key={option.id} className="flex items-start gap-4">
                  <input
                    type="checkbox"
                    id={option.id}
                    checked={answers[currentQuestion.id]?.includes(option.id) || false}
                    onChange={() => handleAnswerSelect(option.id)}
                    className="w-5 h-5 text-accent rounded cursor-pointer mt-1 flex-shrink-0"
                  />
                  <label htmlFor={option.id} className="text-base text-foreground/80 cursor-pointer flex-1 py-1">
                    {option.label}
                  </label>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-between gap-3 pt-8 border-t border-border">
            <button
              onClick={handlePreviousQuestion}
              disabled={currentQuestionIndex === 0}
              className="px-6 py-3 border-2 border-border rounded-lg text-primary font-semibold hover:bg-secondary disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Previous
            </button>

            {!isLastQuestion ? (
              <button
                onClick={handleNextQuestion}
                className="px-6 py-3 bg-gradient-to-r from-[#1a1a3d] to-[#2d2d5f] text-white rounded-lg font-semibold hover:scale-105 transition-all flex items-center gap-2"
              >
                Next
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                className="px-6 py-3 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-lg font-semibold hover:scale-105 transition-all flex items-center gap-2"
              >
                Submit
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </button>
            )}
          </div>
        </div>
      )}

      {currentStep === 'thank-you' && (
        <div className="flex flex-col items-center justify-center py-16">
          <div className="text-7xl mb-6 animate-bounce">🎉</div>
          <h2 className="text-3xl font-heading font-bold text-center text-primary mb-3">
            Thank You!
          </h2>
          <p className="text-foreground/70 text-center mb-8 max-w-md leading-relaxed">
            We have received your questionnaire and contact information. Our team will review your preferences and contact you soon with personalized interior design recommendations.
          </p>
          <button
            onClick={() => {
              setCurrentStep('client-details')
              setCurrentQuestionIndex(0)
              setClientDetails({ name: '', email: '', phone: '', projectType: '' })
              setAnswers({})
            }}
            className="px-8 py-3 bg-gradient-to-r from-[#1a1a3d] to-[#2d2d5f] text-white rounded-lg font-semibold hover:scale-105 transition-all"
          >
            Submit Another Form
          </button>
        </div>
      )}
    </div>
  )
}
