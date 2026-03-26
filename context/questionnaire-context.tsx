'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'

interface QuestionnaireContextType {
  isOpen: boolean
  openQuestionnaire: () => void
  closeQuestionnaire: () => void
  shouldShowToday: boolean
}

const QuestionnaireContext = createContext<QuestionnaireContextType | undefined>(undefined)

export function QuestionnaireProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)
  const [shouldShowToday, setShouldShowToday] = useState(false)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
    
    // Small delay to ensure DOM is ready
    const timer = setTimeout(() => {
      const lastShownDate = localStorage.getItem('questionnaire-shown-date')
      const today = new Date().toDateString()

      if (lastShownDate !== today) {
        setShouldShowToday(true)
        setIsOpen(true)
        localStorage.setItem('questionnaire-shown-date', today)
      }
    }, 500)

    return () => clearTimeout(timer)
  }, [])

  const openQuestionnaire = () => setIsOpen(true)
  const closeQuestionnaire = () => setIsOpen(false)

  return (
    <QuestionnaireContext.Provider value={{ isOpen, openQuestionnaire, closeQuestionnaire, shouldShowToday }}>
      {children}
    </QuestionnaireContext.Provider>
  )
}

export function useQuestionnaire() {
  const context = useContext(QuestionnaireContext)
  if (!context) {
    throw new Error('useQuestionnaire must be used within QuestionnaireProvider')
  }
  return context
}
