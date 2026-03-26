'use client'

import React, { useState } from 'react'
import { useQuestionnaire } from '@/context/questionnaire-context'
import { ClientDetails, questionnaireQuestions } from '@/lib/questionnaire-data'

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

  if (!isOpen) return null

  const isLastQuestion = currentQuestionIndex === questionnaireQuestions.length - 1
  const currentQuestion = questionnaireQuestions[currentQuestionIndex]

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Close button */}
        <button
          onClick={closeQuestionnaire}
          className="absolute right-6 top-6 text-gray-500 hover:text-gray-700 text-2xl z-10"
        >
          ×
        </button>

        {currentStep === 'client-details' && (
          <div className="p-6 md:p-8">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Client Details</h2>
            <form onSubmit={handleClientDetailsSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  placeholder="Enter your full name"
                  value={clientDetails.name}
                  onChange={e => handleClientDetailsChange('name', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Contact Number *
                </label>
                <input
                  type="tel"
                  placeholder="Enter your phone number"
                  value={clientDetails.contactNumber}
                  onChange={e => handleClientDetailsChange('contactNumber', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email ID *
                </label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={clientDetails.email}
                  onChange={e => handleClientDetailsChange('email', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Project Address *
                </label>
                <input
                  type="text"
                  placeholder="Enter project address"
                  value={clientDetails.projectAddress}
                  onChange={e => handleClientDetailsChange('projectAddress', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Project Type *
                </label>
                <select
                  value={clientDetails.projectType}
                  onChange={e => handleClientDetailsChange('projectType', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="">Select project type</option>
                  <option value="apartment">Apartment</option>
                  <option value="villa">Villa</option>
                  <option value="independent-house">Independent House</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  BHK Type *
                </label>
                <select
                  value={clientDetails.bhkType}
                  onChange={e => handleClientDetailsChange('bhkType', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="">Select BHK type</option>
                  <option value="1bhk">1 BHK</option>
                  <option value="2bhk">2 BHK</option>
                  <option value="3bhk">3 BHK</option>
                  <option value="duplex">Duplex</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-lg transition-colors mt-6"
              >
                Continue to Questions
              </button>
            </form>
          </div>
        )}

        {currentStep === 'questions' && (
          <div className="p-6 md:p-8">
            <h2 className="text-lg font-bold text-gray-800 mb-2">
              {currentQuestion.section}
            </h2>
            <p className="text-sm text-gray-600 mb-6">
              Question {currentQuestionIndex + 1} of {questionnaireQuestions.length}
            </p>

            <div>
              <h3 className="text-xl font-semibold mb-6 text-gray-800">{currentQuestion.title}</h3>
              <div className="space-y-3">
                {currentQuestion.options.map(option => (
                  <div key={option.id} className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      id={option.id}
                      checked={answers[currentQuestion.id]?.includes(option.id) || false}
                      onChange={() => handleAnswerSelect(option.id)}
                      className="w-5 h-5 text-blue-600 rounded cursor-pointer"
                    />
                    <label htmlFor={option.id} className="text-base text-gray-700 cursor-pointer">
                      {option.label}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-between gap-3 pt-8 mt-8 border-t border-gray-200">
              <button
                onClick={handlePreviousQuestion}
                disabled={currentQuestionIndex === 0}
                className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Previous
              </button>

              {!isLastQuestion ? (
                <button
                  onClick={handleNextQuestion}
                  className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
                >
                  Next
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-colors"
                >
                  Submit
                </button>
              )}
            </div>
          </div>
        )}

        {currentStep === 'thank-you' && (
          <div className="p-6 md:p-8 flex flex-col items-center justify-center py-12">
            <div className="text-7xl mb-6">🎉</div>
            <h2 className="text-3xl font-bold text-center mb-3 text-gray-800">Thank You!</h2>
            <p className="text-gray-600 text-center mb-8 max-w-sm">
              We have received your questionnaire. Our team will contact you soon with personalized recommendations.
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
  )
}

