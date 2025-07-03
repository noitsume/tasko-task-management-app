"use client"

import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { TaskCard } from "./task-card"
import type { Task } from "@/types/task"

interface TaskListProps {
  tasks: Task[]
  activeTab: string
  onAddTask: () => void
  onEditTask: (task: Task) => void
  onDeleteTask: (taskId: string) => void
}

export function TaskList({ tasks, activeTab, onAddTask, onEditTask, onDeleteTask }: TaskListProps) {
  const getTabTitle = (tab: string) => {
    if (tab === "all") return "All Tasks"
    return tab.replace("-", " ").replace(/\b\w/g, (l) => l.toUpperCase())
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-900">
          {getTabTitle(activeTab)}
          <span className="ml-2 text-sm font-normal text-gray-500">({tasks.length})</span>
        </h2>
        <Button size="sm" onClick={onAddTask} className="bg-black hover:bg-gray-800 text-white">
          <Plus className="w-4 h-4 mr-2" />
          Add Task
        </Button>
      </div>

      <div className="space-y-3">
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} onEdit={onEditTask} onDelete={onDeleteTask} />
        ))}
      </div>
    </div>
  )
}
