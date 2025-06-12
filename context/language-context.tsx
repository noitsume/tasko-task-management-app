"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import { useStorage } from "@/context/storage-context"

type Language = "id" | "en"

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
}

const LanguageContext = createContext<LanguageContextType>({
  language: "id",
  setLanguage: () => {},
})

export const useLanguage = () => useContext(LanguageContext)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>("id")
  const [isInitialized, setIsInitialized] = useState(false)
  const { saveData, loadData } = useStorage()

  useEffect(() => {
    const data = loadData()
    console.log("Loading language from storage:", data.language)
    setLanguageState(data.language as Language)
    setIsInitialized(true)
  }, [loadData])

  const setLanguage = async (lang: Language) => {
    setLanguageState(lang)
    if (isInitialized) {
      await saveData({ language: lang })
    }
  }

  return <LanguageContext.Provider value={{ language, setLanguage }}>{children}</LanguageContext.Provider>
}
