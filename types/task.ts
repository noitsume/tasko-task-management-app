export interface Task {
  id: string
  title: string
  description: string
  priority: "rendah" | "sedang" | "tinggi"
  status: "to-do" | "in-progress" | "done"
  dueDate?: string
  createdAt: string
  updatedAt: string
  isAutomatic: boolean
  isDaily: boolean
  hasDeadline: boolean
  deadlineHours?: number
  deadlineMinutes?: number
  completedAt?: string
  isLate?: boolean
  inProgressAt?: string
}
