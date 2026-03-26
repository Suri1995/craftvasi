'use client'

import React, { useState } from 'react'
import { questionnaireQuestions } from '@/lib/questionnaire-data'

export function QuestionnaireForm() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string[]>>({})
  const [isSubmitted, setIsSubmitted] = useState(false)

  // Start from question 2 (index 2) to skip client details
  const questionsToShow = questionnaireQuestions.slice(2)
  const currentQuestion = questionsToShow[currentQuestionIndex]

  const handleAnswerSelect = (optionId: string) => {
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
    if (currentQuestionIndex < questionsToShow.length - 1) {
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
      answers,
      submittedAt: new Date().toISOString(),
    }
    console.log('Questionnaire submitted:', completeData)
    setIsSubmitted(true)
    setTimeout(() => {
      setIsSubmitted(false)
      setCurrentQuestionIndex(0)
      setAnswers({})
    }, 3000)
  }

  const isLastQuestion = currentQuestionIndex === questionsToShow.length - 1
  const progress = ((currentQuestionIndex + 1) / questionsToShow.length) * 100

  return (
    <div className="w-full">
      {isSubmitted ? (
        <div className="flex flex-col items-center justify-center py-16">
          <div className="text-6xl mb-4">✓</div>
          <h3 className="text-2xl font-bold text-primary mb-2">Thank You!</h3>
          <p className="text-foreground/70 text-center max-w-md">
            Thank you for completing the questionnaire. We'll use your preferences to create the perfect design for your space.
          </p>
        </div>
      ) : (
        <div className="space-y-8">
          {/* Progress Bar */}
          <div>
            <div className="flex justify-between mb-3">
              <p className="text-sm font-medium text-primary">
                Question {currentQuestionIndex + 1} of {questionsToShow.length}
              </p>
              <p className="text-sm font-medium text-accent">{Math.round(progress)}%</p>
            </div>
            <div className="w-full bg-secondary rounded-full h-2">
              <div
                className="bg-accent h-2 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* Question */}
          <div>
            <h3 className="text-lg font-semibold text-primary mb-2">
              {currentQuestion.section}
            </h3>
            <h2 className="text-2xl font-bold text-primary mb-6">
              {currentQuestion.title}
            </h2>

            {/* Options */}
            <div className="space-y-4">
              {currentQuestion.options.map(option => (
                <div
                  key={option.id}
                  className="flex items-start gap-4 p-4 border border-border rounded-lg hover:border-accent hover:bg-secondary/50 transition-all cursor-pointer group"
                  onClick={() => handleAnswerSelect(option.id)}
                >
                  <input
                    type="checkbox"
                    id={option.id}
                    checked={answers[currentQuestion.id]?.includes(option.id) || false}
                    onChange={() => handleAnswerSelect(option.id)}
                    className="w-5 h-5 text-accent rounded cursor-pointer mt-1 flex-shrink-0"
                  />
                  <label htmlFor={option.id} className="text-base text-foreground cursor-pointer flex-1 py-1">
                    {option.label}
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-between gap-4 pt-8">
            <button
              onClick={handlePreviousQuestion}
              disabled={currentQuestionIndex === 0}
              className="px-6 py-3 border-2 border-border rounded-lg font-semibold text-primary hover:border-accent hover:bg-secondary disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              Previous
            </button>

            {!isLastQuestion ? (
              <button
                onClick={handleNextQuestion}
                className="px-6 py-3 bg-accent hover:bg-accent/90 text-white rounded-lg font-semibold transition-all"
              >
                Next
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold transition-all"
              >
                Submit
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
