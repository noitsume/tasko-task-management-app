"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { TabNavigation } from "@/components/tab-navigation"
import { TaskList } from "@/components/task-list"
import { EmptyState } from "@/components/empty-state"
import { CreateTaskDialog } from "@/components/create-task-dialog"
import { EditTaskDialog } from "@/components/edit-task-dialog"
import { useTasks } from "@/hooks/use-tasks"
import { filterAndSortTasks } from "@/utils/task-utils"
import type { Task, TaskFormData } from "@/types/task"

export default function TaskoApp() {
  const { tasks, addTask, updateTask, deleteTask } = useTasks()
  const [activeTab, setActiveTab] = useState<string>("to-do")
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [editingTask, setEditingTask] = useState<Task | null>(null)

  // Form state
  const [formData, setFormData] = useState<TaskFormData>({
    title: "",
    description: "",
    priority: "medium",
    status: "to-do",
  })

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      priority: "medium",
      status: "to-do",
    })
  }

  const handleCreateTask = () => {
    if (!formData.title.trim()) return

    addTask({
      title: formData.title,
      description: formData.description,
      priority: formData.priority,
      status: formData.status,
    })

    resetForm()
    setIsCreateDialogOpen(false)
  }

  const handleEditTask = () => {
    if (!editingTask || !formData.title.trim()) return

    updateTask(editingTask.id, {
      title: formData.title,
      description: formData.description,
      priority: formData.priority,
      status: formData.status,
    })

    resetForm()
    setEditingTask(null)
  }

  const openEditDialog = (task: Task) => {
    setEditingTask(task)
    setFormData({
      title: task.title,
      description: task.description,
      priority: task.priority,
      status: task.status,
    })
  }

  const closeEditDialog = () => {
    setEditingTask(null)
    resetForm()
  }

  const handleOpenCreateDialog = () => {
    setIsCreateDialogOpen(true)
  }

  const filteredTasks = filterAndSortTasks(tasks, activeTab)

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-4xl mx-auto px-4 py-16">
        <Header />
        <TabNavigation activeTab={activeTab} onTabChange={setActiveTab} />

        {filteredTasks.length === 0 ? (
          <EmptyState onAddTask={handleOpenCreateDialog} />
        ) : (
          <TaskList
            tasks={filteredTasks}
            activeTab={activeTab}
            onAddTask={handleOpenCreateDialog}
            onEditTask={openEditDialog}
            onDeleteTask={deleteTask}
          />
        )}

        <CreateTaskDialog
          isOpen={isCreateDialogOpen}
          onOpenChange={setIsCreateDialogOpen}
          formData={formData}
          onFormDataChange={setFormData}
          onSubmit={handleCreateTask}
        />

        <EditTaskDialog
          task={editingTask}
          isOpen={!!editingTask}
          onOpenChange={(open) => !open && closeEditDialog()}
          formData={formData}
          onFormDataChange={setFormData}
          onSubmit={handleEditTask}
        />
      </main>
    </div>
  )
}
