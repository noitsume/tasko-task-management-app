"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import { useTranslation } from "@/hooks/use-translation"

interface Notification {
  id: string
  title: string
  message: string
  type: "info" | "success" | "warning" | "error"
  duration?: number
}

interface NotificationContextType {
  notifications: Notification[]
  addNotification: (notification: Omit<Notification, "id">) => void
  removeNotification: (id: string) => void
  requestNotificationPermission: () => Promise<boolean>
  showBrowserNotification: (title: string, message: string) => void
}

const NotificationContext = createContext<NotificationContextType>({
  notifications: [],
  addNotification: () => {},
  removeNotification: () => {},
  requestNotificationPermission: async () => false,
  showBrowserNotification: () => {},
})

export const useNotification = () => useContext(NotificationContext)

export function NotificationProvider({ children }: { children: React.ReactNode }) {
  const [notifications, setNotifications] = useState<Notification[]>([])
  const { t } = useTranslation()

  // Request notification permission on mount
  useEffect(() => {
    if ("Notification" in window && Notification.permission === "default") {
      requestNotificationPermission()
    }
  }, [])

  const addNotification = (notification: Omit<Notification, "id">) => {
    const id = Date.now().toString()
    const newNotification = { ...notification, id }

    setNotifications((prev) => [...prev, newNotification])

    // Auto remove notification after duration
    const duration = notification.duration || 5000
    setTimeout(() => {
      removeNotification(id)
    }, duration)
  }

  const removeNotification = (id: string) => {
    setNotifications((prev) => prev.filter((notification) => notification.id !== id))
  }

  const requestNotificationPermission = async (): Promise<boolean> => {
    if (!("Notification" in window)) {
      console.log("This browser does not support notifications")
      return false
    }

    try {
      const permission = await Notification.requestPermission()
      return permission === "granted"
    } catch (error) {
      console.error("Error requesting notification permission:", error)
      return false
    }
  }

  const showBrowserNotification = (title: string, message: string) => {
    if ("Notification" in window && Notification.permission === "granted") {
      const notification = new Notification(title, {
        body: message,
        icon: "/favicon.ico", // You can add a custom icon
        badge: "/favicon.ico",
        tag: "tasko-task-start",
        requireInteraction: false,
        silent: false,
      })

      // Auto close after 5 seconds
      setTimeout(() => {
        notification.close()
      }, 5000)

      // Handle click to focus window
      notification.onclick = () => {
        window.focus()
        notification.close()
      }
    }
  }

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        addNotification,
        removeNotification,
        requestNotificationPermission,
        showBrowserNotification,
      }}
    >
      {children}
    </NotificationContext.Provider>
  )
}
