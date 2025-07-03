export interface Task {
  id: string
  title: string
  description: string
  priority: "low" | "medium" | "high"
  status: "to-do" | "in-progress" | "done"
  createdAt: Date
}

export interface TaskFormData {
  title: string
  description: string
  priority: Task["priority"]
  status: Task["status"]
}
