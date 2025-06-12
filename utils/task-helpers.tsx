import { CheckCircle2, Clock, AlertCircle } from "lucide-react"
import type { Task } from "@/types/task"
import { getCurrentTimeInUserTimezone } from "./date-helpers"

export const getPriorityColor = (priority: string) => {
  switch (priority) {
    case "tinggi":
      return "text-red-400"
    case "sedang":
      return "text-yellow-400"
    case "rendah":
      return "text-green-400"
    default:
      return "text-gray-400"
  }
}

export const getStatusColor = (status: string) => {
  switch (status) {
    case "done":
      return "text-green-400"
    case "in-progress":
      return "text-blue-400"
    case "to-do":
      return "text-gray-400"
    default:
      return "text-gray-400"
  }
}

export const getPriorityText = (priority: string) => {
  switch (priority) {
    case "tinggi":
      return "High"
    case "sedang":
      return "Medium"
    case "rendah":
      return "Low"
    default:
      return priority
  }
}

export const getStatusIcon = (status: Task["status"]) => {
  switch (status) {
    case "done":
      return <CheckCircle2 className="w-4 h-4 text-green-400" />
    case "in-progress":
      return <Clock className="w-4 h-4 text-blue-400" />
    case "to-do":
      return <AlertCircle className="w-4 h-4 text-gray-400" />
  }
}

export const getDeadlineTime = (task: Task) => {
  if (!task.hasDeadline || !task.deadlineHours || task.deadlineMinutes === undefined) return ""

  const now = getCurrentTimeInUserTimezone()

  if (task.status === "to-do") {
    return `Deadline: ${task.deadlineHours}h ${task.deadlineMinutes}m`
  } else if (task.status === "in-progress" && task.inProgressAt) {
    const startTime = new Date(task.inProgressAt)
    const deadlineTime = new Date(startTime)
    deadlineTime.setHours(
      deadlineTime.getHours() + task.deadlineHours,
      deadlineTime.getMinutes() + task.deadlineMinutes,
    )

    const diffMs = deadlineTime.getTime() - now.getTime()

    if (diffMs <= 0) {
      return "Deadline passed!"
    }

    const diffMins = Math.floor(diffMs / (1000 * 60))
    const diffHours = Math.floor(diffMins / 60)
    const remainingMins = diffMins % 60

    if (diffHours > 0) {
      return `Remaining: ${diffHours}h ${remainingMins}m`
    } else {
      return `Remaining: ${remainingMins}m`
    }
  }

  return ""
}

export const getRelativeTime = (dateString?: string, isAutomatic = false) => {
  if (!dateString || !isAutomatic) return ""

  const now = getCurrentTimeInUserTimezone()
  const dueDate = new Date(dateString)
  const diffMs = dueDate.getTime() - now.getTime()

  if (diffMs < 0) {
    const pastDiffMs = Math.abs(diffMs)
    const pastDiffMins = Math.floor(pastDiffMs / (1000 * 60))
    const pastDiffHours = Math.floor(pastDiffMins / 60)
    const pastDiffDays = Math.floor(pastDiffHours / 24)

    if (pastDiffDays > 0) {
      return `Started ${pastDiffDays} day${pastDiffDays > 1 ? "s" : ""} ago`
    } else if (pastDiffHours > 0) {
      return `Started ${pastDiffHours} hour${pastDiffHours > 1 ? "s" : ""} ago`
    } else {
      return `Started ${pastDiffMins} min${pastDiffMins > 1 ? "s" : ""} ago`
    }
  }

  const diffMins = Math.floor(diffMs / (1000 * 60))
  const diffHours = Math.floor(diffMins / 60)
  const diffDays = Math.floor(diffHours / 24)

  if (diffDays > 0) {
    return `In ${diffDays} day${diffDays > 1 ? "s" : ""}`
  } else if (diffHours > 0) {
    return `In ${diffHours} hour${diffHours > 1 ? "s" : ""}`
  } else {
    return `In ${diffMins} min${diffMins > 1 ? "s" : ""}`
  }
}
