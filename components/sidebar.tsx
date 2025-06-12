"use client"

import { useState, useEffect } from "react"
import { Plus, Sun, Moon, Info } from "lucide-react"
import { useTheme } from "@/context/theme-context"
import { useLanguage } from "@/context/language-context"
import { useTranslation } from "@/hooks/use-translation"
import Image from "next/image"

interface SidebarProps {
  setCurrentPage: (page: "main" | "about-us" | "about-tasko") => void
}

export function Sidebar({ setCurrentPage }: SidebarProps) {
  const { t } = useTranslation()
  const { darkMode, setDarkMode } = useTheme()
  const { language, setLanguage } = useLanguage()
  const [showLanguageMenu, setShowLanguageMenu] = useState(false)
  const [showAboutMenu, setShowAboutMenu] = useState(false)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element

      // Check if click is outside language menu
      if (showLanguageMenu) {
        const languageButton = document.querySelector("[data-language-button]")
        const languageMenu = document.querySelector("[data-language-menu]")

        if (languageButton && languageMenu && !languageButton.contains(target) && !languageMenu.contains(target)) {
          setShowLanguageMenu(false)
        }
      }

      // Check if click is outside about menu
      if (showAboutMenu) {
        const aboutButton = document.querySelector("[data-about-button]")
        const aboutMenu = document.querySelector("[data-about-menu]")

        if (aboutButton && aboutMenu && !aboutButton.contains(target) && !aboutMenu.contains(target)) {
          setShowAboutMenu(false)
        }
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [showLanguageMenu, showAboutMenu])

  return (
    <div
      style={{ zIndex: 9999 }}
      className={`fixed left-0 top-0 h-full w-16 flex flex-col items-center py-4 space-y-6 
      ${darkMode ? "border-r border-gray-800 bg-[#131313]" : "bg-gray-100 border-r border-gray-200"}`}
    >
      <div className="w-8 h-8 relative">
        <Image
          src={darkMode ? "/images/tasko-dark.png" : "/images/tasko-light.png"}
          alt="Tasko Logo"
          width={32}
          height={32}
          className="w-full h-full object-contain"
          priority
        />
      </div>

      <button
        onClick={() => {
          setCurrentPage("main")
          document.dispatchEvent(new CustomEvent("open-task-form"))
        }}
        className={`p-2 rounded-lg transition-colors ${darkMode ? "hover:bg-gray-700" : "hover:bg-gray-200"}`}
        title={t.addTask}
      >
        <Plus size={20} />
      </button>

      <button
        onClick={() => setDarkMode(!darkMode)}
        className={`p-2 rounded-lg transition-colors ${darkMode ? "hover:bg-gray-700" : "hover:bg-gray-200"}`}
        title={t.toggleTheme}
      >
        {darkMode ? <Sun size={20} /> : <Moon size={20} />}
      </button>

      {/* Language selector */}
      <div className="relative">
        <button
          data-language-button
          onClick={() => setShowLanguageMenu(!showLanguageMenu)}
          className="transition-transform hover:scale-110"
          title={t.language}
        >
          <div className="w-7 h-7 relative">
            <Image
              src={darkMode ? "/images/translate-dark.png" : "/images/translate-light.png"}
              alt="Language/Translate"
              width={28}
              height={28}
              className="w-full h-full object-contain"
            />
          </div>
        </button>

        {showLanguageMenu && (
          <div
            data-language-menu
            className={`absolute left-full ml-2 w-40 rounded-lg shadow-lg z-[9999]
            ${darkMode ? "bg-[#131313] border border-gray-800" : "bg-white border border-gray-200"}`}
            style={{ zIndex: 9999 }}
          >
            <div className="py-1">
              <button
                className={`w-full text-left px-4 py-2 text-sm font-mono 
                ${language === "id" ? "bg-blue-500/20 text-blue-400" : ""} 
                ${darkMode ? "hover:bg-gray-800" : "hover:bg-gray-100"}`}
                onClick={() => {
                  setLanguage("id")
                  setShowLanguageMenu(false)
                }}
              >
                {t.indonesian}
              </button>
              <button
                className={`w-full text-left px-4 py-2 text-sm font-mono 
                ${language === "en" ? "bg-blue-500/20 text-blue-400" : ""} 
                ${darkMode ? "hover:bg-gray-800" : "hover:bg-gray-100"}`}
                onClick={() => {
                  setLanguage("en")
                  setShowLanguageMenu(false)
                }}
              >
                {t.english}
              </button>
            </div>
          </div>
        )}
      </div>

      {/* About menu */}
      <div className="relative">
        <button
          data-about-button
          onClick={() => setShowAboutMenu(!showAboutMenu)}
          className={`p-2 rounded-lg transition-colors ${darkMode ? "hover:bg-gray-700" : "hover:bg-gray-200"}`}
          title={t.about}
        >
          <Info size={20} />
        </button>

        {showAboutMenu && (
          <div
            data-about-menu
            className={`absolute left-full ml-2 w-36 rounded-lg shadow-lg z-[9999]
            ${darkMode ? "bg-[#131313] border border-gray-800" : "bg-white border border-gray-200"}`}
          >
            <div className="py-1">
              <button
                className={`w-full text-left px-4 py-2 text-sm font-mono 
                ${darkMode ? "hover:bg-gray-800" : "hover:bg-gray-100"}`}
                style={{ zIndex: 9999 }}
                onClick={() => {
                  setCurrentPage("about-us")
                  setShowAboutMenu(false)
                }}
              >
                {t.aboutUs}
              </button>
              <button
                className={`w-full text-left px-4 py-2 text-sm font-mono 
                ${darkMode ? "hover:bg-gray-800" : "hover:bg-gray-100"}`}
                onClick={() => {
                  setCurrentPage("about-tasko")
                  setShowAboutMenu(false)
                }}
              >
                {t.aboutTasko}
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="flex-1" />

      <div className="text-xs font-mono opacity-50 writing-mode-vertical">Tasko</div>
    </div>
  )
}
