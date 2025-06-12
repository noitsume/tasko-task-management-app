"use client"

import { ArrowLeft, Github, Linkedin, Mail, MapPin, Globe, Heart } from "lucide-react"
import { useTheme } from "@/context/theme-context"
import { useTranslation } from "@/hooks/use-translation"

interface AboutUsPageProps {
  setCurrentPage: (page: "main" | "about-us" | "about-tasko") => void
}

export function AboutUsPage({ setCurrentPage }: AboutUsPageProps) {
  const { t } = useTranslation()
  const { darkMode } = useTheme()

  return (
    <div className="ml-16 p-8 min-h-screen">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center mb-12">
          <button
            onClick={() => setCurrentPage("main")}
            className={`p-3 rounded-xl mr-6 transition-all duration-300 hover:scale-110 ${
              darkMode ? "hover:bg-gray-800 bg-gray-900" : "hover:bg-gray-200 bg-gray-100"
            }`}
          >
            <ArrowLeft size={24} />
          </button>
          <div>
            <h1 className="text-4xl font-mono font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
              {t.teamTitle}
            </h1>
            <div className="h-1 w-32 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mt-2"></div>
          </div>
        </div>

        {/* Team Introduction */}
        <div className="text-center mb-16">
          <div className="max-w-3xl mx-auto">
            <p className="text-xl font-mono opacity-90 leading-relaxed mb-8">{t.teamIntro}</p>
            <div className="flex items-center justify-center space-x-2 text-sm opacity-70">
              <MapPin className="w-4 h-4" />
              <span className="font-mono">{t.addressValue}</span>
            </div>
          </div>
        </div>

        {/* Team Members */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {/* Havidz Andrian */}
          <div
            className={`group relative overflow-hidden rounded-2xl border transition-all duration-500 hover:scale-105 hover:shadow-2xl ${
              darkMode
                ? "border-gray-800 bg-gradient-to-br from-gray-900 to-gray-800"
                : "border-gray-200 bg-gradient-to-br from-white to-gray-50"
            }`}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative p-8 text-center">
              <div className="w-32 h-32 mx-auto mb-6 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-xl group-hover:shadow-blue-500/25 transition-all duration-500">
                <span className="text-white font-mono font-bold text-4xl">HA</span>
              </div>
              <h3 className="font-mono font-bold text-2xl mb-2">Havidz Andrian</h3>
              <div className="inline-block px-4 py-2 rounded-full bg-blue-500/20 text-blue-400 text-sm font-mono mb-4">
                {t.leadDeveloper}
              </div>
              <p className="text-sm font-mono opacity-80 leading-relaxed mb-6">{t.havidzDesc}</p>
              <div className="flex justify-center space-x-4">
                <div
                  className={`p-2 rounded-lg transition-colors ${darkMode ? "hover:bg-gray-700" : "hover:bg-gray-200"}`}
                >
                  <Github className="w-5 h-5" />
                </div>
                <div
                  className={`p-2 rounded-lg transition-colors ${darkMode ? "hover:bg-gray-700" : "hover:bg-gray-200"}`}
                >
                  <Linkedin className="w-5 h-5" />
                </div>
                <div
                  className={`p-2 rounded-lg transition-colors ${darkMode ? "hover:bg-gray-700" : "hover:bg-gray-200"}`}
                >
                  <Mail className="w-5 h-5" />
                </div>
              </div>
            </div>
          </div>

          {/* Howard Farel Hura */}
          <div
            className={`group relative overflow-hidden rounded-2xl border transition-all duration-500 hover:scale-105 hover:shadow-2xl ${
              darkMode
                ? "border-gray-800 bg-gradient-to-br from-gray-900 to-gray-800"
                : "border-gray-200 bg-gradient-to-br from-white to-gray-50"
            }`}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-teal-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative p-8 text-center">
              <div className="w-32 h-32 mx-auto mb-6 rounded-full bg-gradient-to-br from-green-500 to-teal-600 flex items-center justify-center shadow-xl group-hover:shadow-green-500/25 transition-all duration-500">
                <span className="text-white font-mono font-bold text-4xl">HF</span>
              </div>
              <h3 className="font-mono font-bold text-2xl mb-2">Howard Farel Hura</h3>
              <div className="inline-block px-4 py-2 rounded-full bg-green-500/20 text-green-400 text-sm font-mono mb-4">
                {t.uiuxDesigner}
              </div>
              <p className="text-sm font-mono opacity-80 leading-relaxed mb-6">{t.howardDesc}</p>
              <div className="flex justify-center space-x-4">
                <div
                  className={`p-2 rounded-lg transition-colors ${darkMode ? "hover:bg-gray-700" : "hover:bg-gray-200"}`}
                >
                  <Github className="w-5 h-5" />
                </div>
                <div
                  className={`p-2 rounded-lg transition-colors ${darkMode ? "hover:bg-gray-700" : "hover:bg-gray-200"}`}
                >
                  <Linkedin className="w-5 h-5" />
                </div>
                <div
                  className={`p-2 rounded-lg transition-colors ${darkMode ? "hover:bg-gray-700" : "hover:bg-gray-200"}`}
                >
                  <Mail className="w-5 h-5" />
                </div>
              </div>
            </div>
          </div>

          {/* Kevin Luther Kiyosaki Gultom */}
          <div
            className={`group relative overflow-hidden rounded-2xl border transition-all duration-500 hover:scale-105 hover:shadow-2xl ${
              darkMode
                ? "border-gray-800 bg-gradient-to-br from-gray-900 to-gray-800"
                : "border-gray-200 bg-gradient-to-br from-white to-gray-50"
            }`}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-red-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative p-8 text-center">
              <div className="w-32 h-32 mx-auto mb-6 rounded-full bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center shadow-xl group-hover:shadow-orange-500/25 transition-all duration-500">
                <span className="text-white font-mono font-bold text-4xl">KL</span>
              </div>
              <h3 className="font-mono font-bold text-2xl mb-2">Kevin Luther Kiyosaki Gultom</h3>
              <div className="inline-block px-4 py-2 rounded-full bg-orange-500/20 text-orange-400 text-sm font-mono mb-4">
                {t.backendEngineer}
              </div>
              <p className="text-sm font-mono opacity-80 leading-relaxed mb-6">{t.kevinDesc}</p>
              <div className="flex justify-center space-x-4">
                <div
                  className={`p-2 rounded-lg transition-colors ${darkMode ? "hover:bg-gray-700" : "hover:bg-gray-200"}`}
                >
                  <Github className="w-5 h-5" />
                </div>
                <div
                  className={`p-2 rounded-lg transition-colors ${darkMode ? "hover:bg-gray-700" : "hover:bg-gray-200"}`}
                >
                  <Linkedin className="w-5 h-5" />
                </div>
                <div
                  className={`p-2 rounded-lg transition-colors ${darkMode ? "hover:bg-gray-700" : "hover:bg-gray-200"}`}
                >
                  <Mail className="w-5 h-5" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Section */}
        <div
          className={`rounded-2xl border p-8 text-center mb-12 ${
            darkMode
              ? "border-gray-800 bg-gradient-to-br from-gray-900/50 to-gray-800/50"
              : "border-gray-200 bg-gradient-to-br from-gray-50 to-white"
          }`}
        >
          <h4 className="font-mono font-bold text-2xl mb-6 bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
            {t.contactUs}
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-center justify-center space-x-3">
              <Mail className="w-5 h-5 text-blue-500" />
              <span className="font-mono">teamdev@tasko.dev</span>
            </div>
            <div className="flex items-center justify-center space-x-3">
              <Globe className="w-5 h-5 text-green-500" />
              <span className="font-mono">www.tasko.dev</span>
            </div>
            <div className="flex items-center justify-center space-x-3">
              <MapPin className="w-5 h-5 text-orange-500" />
              <span className="font-mono text-sm">{t.addressValue}</span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center border-t pt-8 mt-12">
          <div className="flex items-center justify-center space-x-2 text-sm font-mono opacity-70">
            <span>{t.copyrightAboutUs.split("❤️")[0]}</span>
            <Heart className="w-4 h-4 text-red-500 fill-current" />
            <span>{t.copyrightAboutUs.split("❤️")[1]}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
