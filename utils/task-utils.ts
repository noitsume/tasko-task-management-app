import type { Task } from "@/types/task"
import { priorityOrder } from "@/constants/task-constants"

export function filterAndSortTasks(tasks: Task[], activeTab: string): Task[] {
  let filtered = tasks
  if (activeTab !== "all") {
    filtered = tasks.filter((task) => task.status === activeTab)
  }

  return filtered.sort((a, b) => {
    const priorityDiff = priorityOrder[b.priority] - priorityOrder[a.priority]
    if (priorityDiff !== 0) return priorityDiff
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  })
}
