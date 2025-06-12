"use client"

import { useState } from "react"
import { Sidebar } from "@/components/sidebar"
import { MainPage } from "@/components/pages/main-page"
import { AboutUsPage } from "@/components/pages/about-us-page"
import { AboutTaskoPage } from "@/components/pages/about-tasko-page"
import { StorageProvider } from "@/context/storage-context"
import { TaskProvider } from "@/context/task-context"
import { LanguageProvider } from "@/context/language-context"
import { ThemeProvider } from "@/context/theme-context"
import { TimezoneProvider } from "@/context/timezone-context"
import { NotificationProvider } from "@/context/notification-context"
import { NotificationToast } from "@/components/notification-toast"
import { NotificationPermissionBanner } from "@/components/notification-permission-banner"
import { StorageManager } from "@/components/storage-manager"

export function TaskManager() {
  const [currentPage, setCurrentPage] = useState<"main" | "about-us" | "about-tasko">("main")

  return (
    <StorageProvider>
      <ThemeProvider>
        <LanguageProvider>
          <TimezoneProvider>
            <NotificationProvider>
              <TaskProvider>
                <div className="min-h-screen transition-colors duration-300 dark:bg-black dark:text-white bg-white text-black">
                  <NotificationPermissionBanner />
                  <Sidebar setCurrentPage={setCurrentPage} />
                  <StorageManager />

                  {currentPage === "main" && <MainPage />}
                  {currentPage === "about-us" && <AboutUsPage setCurrentPage={setCurrentPage} />}
                  {currentPage === "about-tasko" && <AboutTaskoPage setCurrentPage={setCurrentPage} />}

                  <NotificationToast />
                </div>
              </TaskProvider>
            </NotificationProvider>
          </TimezoneProvider>
        </LanguageProvider>
      </ThemeProvider>
    </StorageProvider>
  )
}
