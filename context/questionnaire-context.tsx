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
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    // Check if questionnaire was shown today
    const lastShownDate = localStorage.getItem('questionnaire-shown-date')
    const today = new Date().toDateString()

    if (lastShownDate !== today) {
      setShouldShowToday(true)
      setIsOpen(true)
      localStorage.setItem('questionnaire-shown-date', today)
    }
  }, [])

  const openQuestionnaire = () => setIsOpen(true)
  const closeQuestionnaire = () => setIsOpen(false)

  if (!mounted) {
    return <>{children}</>
  }

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
