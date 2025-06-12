"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

interface TimezoneContextType {
  userTimezone: string
  getTimezoneDisplay: () => string
}

const TimezoneContext = createContext<TimezoneContextType>({
  userTimezone: "",
  getTimezoneDisplay: () => "",
})

export const useTimezone = () => useContext(TimezoneContext)

export function TimezoneProvider({ children }: { children: React.ReactNode }) {
  const [userTimezone, setUserTimezone] = useState<string>("")

  useEffect(() => {
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone
    setUserTimezone(timezone)
  }, [])

  const getTimezoneDisplay = () => {
    if (!userTimezone) return ""

    try {
      const indonesianTimezones: Record<string, string> = {
        "Asia/Jakarta": "Jakarta (WIB)",
        "Asia/Pontianak": "Pontianak (WIB)",
        "Asia/Makassar": "Makassar (WITA)",
        "Asia/Jayapura": "Jayapura (WIT)",
        "Asia/Bangkok": "Jakarta (WIB)",
      }

      if (indonesianTimezones[userTimezone]) {
        return indonesianTimezones[userTimezone]
      }

      const formatter = new Intl.DateTimeFormat("en", {
        timeZone: userTimezone,
        timeZoneName: "short",
      })
      const parts = formatter.formatToParts(new Date())
      const timeZoneName = parts.find((part) => part.type === "timeZoneName")?.value
      const cityName = userTimezone.split("/").pop()?.replace(/_/g, " ")

      return `${cityName} (${timeZoneName})`
    } catch (error) {
      const offset = new Date().getTimezoneOffset()
      if (offset === -420) {
        return "Jakarta (WIB)"
      }
      return userTimezone
    }
  }

  return <TimezoneContext.Provider value={{ userTimezone, getTimezoneDisplay }}>{children}</TimezoneContext.Provider>
}
