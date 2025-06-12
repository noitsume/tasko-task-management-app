"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import { useStorage } from "@/context/storage-context"

interface ThemeContextType {
  darkMode: boolean
  setDarkMode: (dark: boolean) => void
}

const ThemeContext = createContext<ThemeContextType>({
  darkMode: true,
  setDarkMode: () => {},
})

export const useTheme = () => useContext(ThemeContext)

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [darkMode, setDarkModeState] = useState(true)
  const [isInitialized, setIsInitialized] = useState(false)
  const { saveData, loadData } = useStorage()

  useEffect(() => {
    const data = loadData()
    console.log("Loading theme from storage:", data.settings.darkMode)
    setDarkModeState(data.settings.darkMode)
    setIsInitialized(true)
  }, [loadData])

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }, [darkMode])

  const setDarkMode = async (dark: boolean) => {
    setDarkModeState(dark)
    if (isInitialized) {
      await saveData({
        settings: {
          darkMode: dark,
          lastUpdated: new Date().toISOString(),
        },
      })
    }
  }

  return <ThemeContext.Provider value={{ darkMode, setDarkMode }}>{children}</ThemeContext.Provider>
}
