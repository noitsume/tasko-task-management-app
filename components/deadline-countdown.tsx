"use client"

import { useState, useEffect } from "react"
import type { Task } from "@/types/task"
import { getCurrentTimeInUserTimezone } from "@/utils/date-helpers"

interface DeadlineCountdownProps {
  task: Task
  className?: string
}

export function DeadlineCountdown({ task, className = "" }: DeadlineCountdownProps) {
  const [timeRemaining, setTimeRemaining] = useState<string>("")
  const [isOverdue, setIsOverdue] = useState(false)

  useEffect(() => {
    // Check if task has deadline and required properties
    if (!task.hasDeadline || !task.deadlineHours || task.deadlineMinutes === undefined) {
      return
    }

    const updateCountdown = () => {
      const now = getCurrentTimeInUserTimezone()

      if (task.status === "to-do") {
        setTimeRemaining(`Deadline: ${task.deadlineHours}h ${task.deadlineMinutes}m`)
        setIsOverdue(false)
      } else if (task.status === "in-progress" && task.inProgressAt) {
        const startTime = new Date(task.inProgressAt)
        const deadlineTime = new Date(startTime)

        // Safe access to deadline properties with type guards
        const deadlineHours = task.deadlineHours || 0
        const deadlineMinutes = task.deadlineMinutes || 0

        deadlineTime.setHours(deadlineTime.getHours() + deadlineHours, deadlineTime.getMinutes() + deadlineMinutes)

        const diffMs = deadlineTime.getTime() - now.getTime()

        if (diffMs <= 0) {
          setTimeRemaining("Deadline passed!")
          setIsOverdue(true)
        } else {
          const totalSeconds = Math.floor(diffMs / 1000)
          const hours = Math.floor(totalSeconds / 3600)
          const minutes = Math.floor((totalSeconds % 3600) / 60)
          const seconds = totalSeconds % 60

          if (hours > 0) {
            setTimeRemaining(`${hours}h ${minutes}m ${seconds}s`)
          } else if (minutes > 0) {
            setTimeRemaining(`${minutes}m ${seconds}s`)
          } else {
            setTimeRemaining(`${seconds}s`)
          }
          setIsOverdue(false)
        }
      } else {
        setTimeRemaining("")
        setIsOverdue(false)
      }
    }

    // Update immediately
    updateCountdown()

    // Update every second
    const interval = setInterval(updateCountdown, 1000)

    return () => clearInterval(interval)
  }, [task])

  if (!timeRemaining) return null

  return (
    <span
      className={`text-xs font-mono px-2 py-1 rounded-full transition-colors duration-200 ${
        isOverdue
          ? "bg-red-500/20 text-red-400 animate-pulse"
          : task.status === "to-do"
            ? "bg-orange-500/20 text-orange-400"
            : "bg-blue-500/20 text-blue-400"
      } ${className}`}
    >
      {timeRemaining}
    </span>
  )
}
