"use client"

import { ArrowLeft, CheckCircle, Filter, Palette, Zap, Smartphone, Globe, Star } from "lucide-react"
import { useTheme } from "@/context/theme-context"
import { useTranslation } from "@/hooks/use-translation"
import Image from "next/image"

interface AboutTaskoPageProps {
  setCurrentPage: (page: "main" | "about-us" | "about-tasko") => void
}

export function AboutTaskoPage({ setCurrentPage }: AboutTaskoPageProps) {
  const { t } = useTranslation()
  const { darkMode } = useTheme()

  const features = [
    {
      icon: <CheckCircle className="w-8 h-8" />,
      title: t.taskManagement,
      description: t.taskManagementDesc,
      color: "from-blue-500 to-blue-600",
    },
    {
      icon: <Filter className="w-8 h-8" />,
      title: t.filterCategory,
      description: t.filterCategoryDesc,
      color: "from-green-500 to-green-600",
    },
    {
      icon: <Palette className="w-8 h-8" />,
      title: t.darkLightMode,
      description: t.darkLightModeDesc,
      color: "from-purple-500 to-purple-600",
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: t.advancedFeatures,
      description: t.advancedFeaturesDesc,
      color: "from-orange-500 to-orange-600",
    },
  ]

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
              {t.aboutAppTitle}
            </h1>
            <div className="h-1 w-32 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mt-2"></div>
          </div>
        </div>

        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="relative inline-block mb-8">
            <div className="w-40 h-40 mx-auto rounded-3xl bg-gradient-to-br from-blue-500 to-purple-600 p-1 shadow-2xl">
              <div
                className={`w-full h-full rounded-3xl flex items-center justify-center ${darkMode ? "bg-gray-900" : "bg-white"}`}
              >
                <Image
                  src={darkMode ? "/images/tasko-dark.png" : "/images/tasko-light.png"}
                  alt="Tasko Logo"
                  width={120}
                  height={120}
                  className="w-30 h-30 object-contain"
                  priority
                />
              </div>
            </div>
            <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
              <Star className="w-4 h-4 text-white fill-current" />
            </div>
          </div>
          <h2 className="text-3xl font-mono font-bold mb-4 bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
            {t.appName}
          </h2>
          <p className="text-xl font-mono opacity-80 mb-8">{t.tagline}</p>
          <div className="flex items-center justify-center space-x-6 text-sm opacity-70">
            <div className="flex items-center space-x-2">
              <Smartphone className="w-4 h-4" />
              <span className="font-mono">Cross-Platform</span>
            </div>
            <div className="flex items-center space-x-2">
              <Globe className="w-4 h-4" />
              <span className="font-mono">Web-Based</span>
            </div>
          </div>
        </div>

        {/* About Description */}
        <div
          className={`rounded-2xl border p-8 mb-16 ${
            darkMode
              ? "border-gray-800 bg-gradient-to-br from-gray-900/50 to-gray-800/50"
              : "border-gray-200 bg-gradient-to-br from-gray-50 to-white"
          }`}
        >
          <h3 className="text-2xl font-mono font-bold mb-6 bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
            {t.aboutApp}
          </h3>
          <div className="space-y-6">
            <p className="text-lg font-mono opacity-90 leading-relaxed">{t.aboutDescription1}</p>
            <p className="text-lg font-mono opacity-90 leading-relaxed">{t.aboutDescription2}</p>
            <p className="text-lg font-mono opacity-90 leading-relaxed">{t.aboutDescription3}</p>
          </div>
        </div>

        {/* Features Grid */}
        <div className="mb-16">
          <h3 className="text-2xl font-mono font-bold mb-8 text-center bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
            {t.mainFeatures}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className={`group relative overflow-hidden rounded-2xl border transition-all duration-500 hover:scale-105 hover:shadow-2xl ${
                  darkMode
                    ? "border-gray-800 bg-gradient-to-br from-gray-900 to-gray-800"
                    : "border-gray-200 bg-gradient-to-br from-white to-gray-50"
                }`}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative p-8">
                  <div
                    className={`inline-flex p-4 rounded-2xl bg-gradient-to-br ${feature.color} text-white mb-6 shadow-lg group-hover:shadow-xl transition-all duration-500`}
                  >
                    {feature.icon}
                  </div>
                  <h4 className="font-mono font-bold text-xl mb-4">{feature.title}</h4>
                  <p className="text-sm font-mono opacity-80 leading-relaxed">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Version Info */}
        <div
          className={`rounded-2xl border p-6 text-center mb-12 ${
            darkMode
              ? "border-gray-800 bg-gradient-to-br from-gray-900/30 to-gray-800/30"
              : "border-gray-200 bg-gradient-to-br from-gray-50 to-white"
          }`}
        >
          <h4 className="font-mono font-bold text-xl mb-3 bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
            {t.version}
          </h4>
          <div className="inline-block px-6 py-3 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 text-white font-mono font-bold">
            Tasko v2.0.0
          </div>
        </div>

        {/* Footer */}
        <div className="text-center border-t pt-8 mt-12">
          <p className="text-sm font-mono opacity-70">{t.copyright}</p>
        </div>
      </div>
    </div>
  )
}
