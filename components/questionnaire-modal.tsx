'use client'

import React, { useState, useEffect } from 'react'
import { useQuestionnaire } from '@/context/questionnaire-context'
import { ClientDetails, questionnaireQuestions } from '@/lib/questionnaire-data'

type Step = 'client-details' | 'questions' | 'thank-you'

export function QuestionnaireModal() {
  const { isOpen, closeQuestionnaire } = useQuestionnaire()
  const [currentStep, setCurrentStep] = useState<Step>('client-details')
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [isMounted, setIsMounted] = useState(false)

  const [clientDetails, setClientDetails] = useState<ClientDetails>({
    name: '',
    contactNumber: '',
    email: '',
    projectAddress: '',
    projectType: '',
    bhkType: '',
  })

  const [answers, setAnswers] = useState<Record<string, string[]>>({})

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const handleClientDetailsChange = (field: keyof ClientDetails, value: string) => {
    setClientDetails(prev => ({ ...prev, [field]: value }))
  }

  const handleClientDetailsSubmit = (e: React.FormEvent) => {
    e.preventDefault()
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
    const completeData = {
      clientDetails,
      answers,
      submittedAt: new Date().toISOString(),
    }
    console.log('Form submitted:', completeData)
    setCurrentStep('thank-you')
  }

  if (!isMounted || !isOpen) return null

  const isLastQuestion = currentQuestionIndex === questionnaireQuestions.length - 1
  const currentQuestion = questionnaireQuestions[currentQuestionIndex]

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-40 bg-black bg-opacity-50 transition-opacity duration-300"
        onClick={closeQuestionnaire}
        aria-hidden="true"
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
        <div className="bg-white rounded-lg shadow-2xl max-w-2xl w-full my-auto relative">
          {/* Close button */}
          <button
            onClick={closeQuestionnaire}
            className="absolute -right-3 -top-3 w-10 h-10 rounded-full bg-white border-2 border-gray-300 text-gray-600 hover:text-gray-800 hover:bg-gray-100 flex items-center justify-center text-xl font-bold transition-colors"
            aria-label="Close dialog"
          >
            ×
          </button>

          {/* Content wrapper */}
          <div className="max-h-[85vh] overflow-y-auto">
            {currentStep === 'client-details' && (
              <div className="p-6 md:p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" />
                    </svg>
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800">Client Details</h2>
                    <p className="text-sm text-gray-500">Step 1 of 2</p>
                  </div>
                </div>

                <form onSubmit={handleClientDetailsSubmit} className="space-y-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Enter your full name"
                      value={clientDetails.name}
                      onChange={e => handleClientDetailsChange('name', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Contact Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      placeholder="Enter your phone number"
                      value={clientDetails.contactNumber}
                      onChange={e => handleClientDetailsChange('contactNumber', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email ID <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      placeholder="Enter your email"
                      value={clientDetails.email}
                      onChange={e => handleClientDetailsChange('email', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Project Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Enter project address"
                      value={clientDetails.projectAddress}
                      onChange={e => handleClientDetailsChange('projectAddress', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Project Type <span className="text-red-500">*</span>
                      </label>
                      <select
                        value={clientDetails.projectType}
                        onChange={e => handleClientDetailsChange('projectType', e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                        required
                      >
                        <option value="">Select type</option>
                        <option value="apartment">Apartment</option>
                        <option value="villa">Villa</option>
                        <option value="independent-house">Independent House</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        BHK Type <span className="text-red-500">*</span>
                      </label>
                      <select
                        value={clientDetails.bhkType}
                        onChange={e => handleClientDetailsChange('bhkType', e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                        required
                      >
                        <option value="">Select BHK</option>
                        <option value="1bhk">1 BHK</option>
                        <option value="2bhk">2 BHK</option>
                        <option value="3bhk">3 BHK</option>
                        <option value="duplex">Duplex</option>
                      </select>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-lg transition-colors mt-8 flex items-center justify-center gap-2"
                  >
                    Continue to Questions
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </button>
                </form>
              </div>
            )}

            {currentStep === 'questions' && (
              <div className="p-6 md:p-8">
                <div className="mb-6">
                  <p className="text-sm font-medium text-blue-600 mb-2">
                    QUESTION {currentQuestionIndex + 1} OF {questionnaireQuestions.length}
                  </p>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${((currentQuestionIndex + 1) / questionnaireQuestions.length) * 100}%` }}
                    />
                  </div>
                </div>

                <h2 className="text-lg font-bold text-gray-800 mb-2">
                  {currentQuestion.section}
                </h2>
                <h3 className="text-2xl font-semibold mb-6 text-gray-800">{currentQuestion.title}</h3>

                <div className="space-y-4 mb-8">
                  {currentQuestion.options.map(option => (
                    <div key={option.id} className="flex items-start gap-4">
                      <input
                        type="checkbox"
                        id={option.id}
                        checked={answers[currentQuestion.id]?.includes(option.id) || false}
                        onChange={() => handleAnswerSelect(option.id)}
                        className="w-5 h-5 text-blue-600 rounded cursor-pointer mt-1 flex-shrink-0"
                      />
                      <label htmlFor={option.id} className="text-base text-gray-700 cursor-pointer flex-1 py-1">
                        {option.label}
                      </label>
                    </div>
                  ))}
                </div>

                <div className="flex justify-between gap-3 pt-8 border-t border-gray-200">
                  <button
                    onClick={handlePreviousQuestion}
                    disabled={currentQuestionIndex === 0}
                    className="px-6 py-2 border-2 border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    Previous
                  </button>

                  {!isLastQuestion ? (
                    <button
                      onClick={handleNextQuestion}
                      className="px-8 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
                    >
                      Next
                    </button>
                  ) : (
                    <button
                      onClick={handleSubmit}
                      className="px-8 py-2 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-colors flex items-center gap-2"
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
              <div className="p-6 md:p-8 flex flex-col items-center justify-center py-16">
                <div className="text-7xl mb-6 animate-bounce">🎉</div>
                <h2 className="text-3xl font-bold text-center mb-3 text-gray-800">Thank You!</h2>
                <p className="text-gray-600 text-center mb-8 max-w-md leading-relaxed">
                  We have received your questionnaire. Our team will contact you soon with personalized interior design recommendations.
                </p>
                <button
                  onClick={closeQuestionnaire}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-lg transition-colors"
                >
                  Close
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

