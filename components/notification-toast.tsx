"use client"
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from "lucide-react"
import { useNotification } from "@/context/notification-context"
import { useTheme } from "@/context/theme-context"

export function NotificationToast() {
  const { notifications, removeNotification } = useNotification()
  const { darkMode } = useTheme()

  const getIcon = (type: string) => {
    switch (type) {
      case "success":
        return <CheckCircle className="w-6 h-6 text-green-500" />
      case "error":
        return <AlertCircle className="w-6 h-6 text-red-500" />
      case "warning":
        return <AlertTriangle className="w-6 h-6 text-yellow-500" />
      default:
        return <Info className="w-6 h-6 text-blue-500" />
    }
  }

  const getBorderColor = (type: string) => {
    switch (type) {
      case "success":
        return "border-l-green-500"
      case "error":
        return "border-l-red-500"
      case "warning":
        return "border-l-yellow-500"
      default:
        return "border-l-blue-500"
    }
  }

  if (notifications.length === 0) return null

  // Hanya ambil notifikasi terbaru
  const latestNotification = notifications[notifications.length - 1]

  // Format judul khusus untuk task yang dimulai
  const formattedTitle = latestNotification.title.includes("Task")
    ? `Task "${latestNotification.message}" is starting...`
    : latestNotification.title

  return (
    <div className="fixed top-4 right-4 z-50">
      <div
        className={`min-w-[320px] max-w-md shadow-lg rounded-lg pointer-events-auto border-l-4 ${getBorderColor(
          latestNotification.type,
        )} ${
          darkMode ? "bg-gray-800 border-gray-700 text-white" : "bg-white border-gray-200 text-gray-900"
        } animate-in slide-in-from-right duration-300`}
      >
        <div className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="flex-shrink-0">{getIcon(latestNotification.type)}</div>
              <div className="ml-3">
                <p className="text-base font-medium font-mono">{formattedTitle}</p>
              </div>
            </div>
            <button
              className={`rounded-md inline-flex transition-colors ${
                darkMode ? "text-gray-400 hover:text-gray-200" : "text-gray-400 hover:text-gray-600"
              }`}
              onClick={() => removeNotification(latestNotification.id)}
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
