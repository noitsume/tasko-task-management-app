"use client"

import { useState, useEffect } from "react"
import { Bell, X } from "lucide-react"
import { useNotification } from "@/context/notification-context"
import { useTheme } from "@/context/theme-context"
import { useTranslation } from "@/hooks/use-translation"

export function NotificationPermissionBanner() {
  const [showBanner, setShowBanner] = useState(false)
  const [dismissed, setDismissed] = useState(false)
  const { requestNotificationPermission } = useNotification()
  const { darkMode } = useTheme()
  const { t } = useTranslation()

  useEffect(() => {
    // Check if we should show the banner
    const checkNotificationPermission = () => {
      if ("Notification" in window) {
        const permission = Notification.permission
        const hasAutomaticTasks = localStorage.getItem("tasko-data")

        if (hasAutomaticTasks) {
          try {
            const data = JSON.parse(hasAutomaticTasks)
            const hasAutoTasks = data.tasks && data.tasks.some((task: any) => task.isAutomatic)

            if (permission === "default" && hasAutoTasks && !dismissed) {
              setShowBanner(true)
            }
          } catch (error) {
            console.error("Error parsing localStorage data:", error)
          }
        }
      }
    }

    checkNotificationPermission()

    // Check periodically in case user adds automatic tasks
    const interval = setInterval(checkNotificationPermission, 5000)
    return () => clearInterval(interval)
  }, [dismissed])

  const handleEnableNotifications = async () => {
    const granted = await requestNotificationPermission()
    if (granted) {
      setShowBanner(false)
    }
  }

  const handleDismiss = () => {
    setDismissed(true)
    setShowBanner(false)
  }

  if (!showBanner) return null

  return (
    <div
      className={`fixed top-0 left-0 right-0 z-40 p-4 border-b ${
        darkMode ? "bg-blue-900/20 border-blue-800 text-blue-100" : "bg-blue-50 border-blue-200 text-blue-900"
      }`}
    >
      <div className="max-w-4xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Bell className="w-5 h-5" />
          <div>
            <p className="font-mono font-medium text-sm">
              {t.language === "id"
                ? "Aktifkan notifikasi untuk mendapat pemberitahuan saat tugas otomatis dimulai"
                : "Enable notifications to get alerts when automatic tasks start"}
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={handleEnableNotifications}
            className={`px-4 py-2 rounded-lg font-mono text-sm transition-colors ${
              darkMode ? "bg-blue-600 hover:bg-blue-700 text-white" : "bg-blue-600 hover:bg-blue-700 text-white"
            }`}
          >
            {t.language === "id" ? "Aktifkan" : "Enable"}
          </button>
          <button
            onClick={handleDismiss}
            className={`p-2 rounded-lg transition-colors ${darkMode ? "hover:bg-blue-800" : "hover:bg-blue-100"}`}
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  )
}
