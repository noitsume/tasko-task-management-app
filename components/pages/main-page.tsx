"use client"

import { useState, useEffect } from "react"
import { Globe } from "lucide-react"
import { TaskList } from "@/components/task-list"
import { TaskForm } from "@/components/task-form"
import { TaskDetailModal } from "@/components/modals/task-detail-modal"
import { DescriptionModal } from "@/components/modals/description-modal"
import { useTranslation } from "@/hooks/use-translation"
import { useTimezone } from "@/context/timezone-context"
import { useTheme } from "@/context/theme-context"
import { useTasks } from "@/context/task-context"
import type { Task } from "@/types/task"
import Image from "next/image"

export function MainPage() {
  const { t } = useTranslation()
  const { tasks } = useTasks()
  const { darkMode } = useTheme()
  const { userTimezone, getTimezoneDisplay } = useTimezone()
  const [showForm, setShowForm] = useState(false)
  const [editingTask, setEditingTask] = useState<Task | null>(null)
  const [activeFilter, setActiveFilter] = useState<"all" | "to-do" | "in-progress" | "done">("all")
  const [showDescriptionModal, setShowDescriptionModal] = useState(false)
  const [selectedDescription, setSelectedDescription] = useState("")
  const [showTaskDetailModal, setShowTaskDetailModal] = useState(false)
  const [selectedTask, setSelectedTask] = useState<Task | null>(null)

  // Listen for the custom event to open the task form
  useEffect(() => {
    const handleOpenTaskForm = () => setShowForm(true)
    document.addEventListener("open-task-form", handleOpenTaskForm)
    return () => document.removeEventListener("open-task-form", handleOpenTaskForm)
  }, [])

  const handleShowDescription = (description: string) => {
    setSelectedDescription(description)
    setShowDescriptionModal(true)
  }

  const handleShowTaskDetail = (task: Task) => {
    setSelectedTask(task)
    setShowTaskDetailModal(true)
  }

  const handleEdit = (task: Task) => {
    setEditingTask(task)
    setShowForm(true)
  }

  const filteredTasks = tasks.filter((task) => (activeFilter === "all" ? true : task.status === activeFilter))

  return (
    <div className="ml-16 p-8">
      <div className="text-center mb-12">
        <div className="mb-6">
          <div className="w-24 h-24 mx-auto mb-4 flex items-center justify-center">
            <Image
              src={darkMode ? "/images/tasko-dark.png" : "/images/tasko-light.png"}
              alt="Tasko Logo"
              width={80}
              height={80}
              className="w-20 h-20 object-contain"
              priority
            />
          </div>
        </div>
        <h1 className="text-2xl font-mono mb-2">{t.appName}</h1>
        <p className="text-sm opacity-60 font-mono">{t.tagline}</p>
        {userTimezone && (
          <div className="flex items-center justify-center gap-2 mt-2">
            <Globe className="w-4 h-4 opacity-60" />
            <span className="text-xs font-mono opacity-60">{getTimezoneDisplay()}</span>
          </div>
        )}
      </div>

      <div className="flex justify-center mb-8 space-x-2">
        {(["to-do", "in-progress", "done", "all"] as const).map((filter) => (
          <button
            key={filter}
            onClick={() => setActiveFilter(filter)}
            className={`px-4 py-2 rounded-lg font-mono text-sm transition-colors ${
              activeFilter === filter
                ? "dark:bg-white dark:text-black bg-black text-white"
                : "dark:bg-gray-800 dark:hover:bg-gray-700 bg-gray-200 hover:bg-gray-300"
            }`}
          >
            {filter === "all" ? t.all : filter === "to-do" ? t.toDo : filter === "in-progress" ? t.inProgress : t.done}
          </button>
        ))}
      </div>

      <TaskList
        tasks={filteredTasks}
        onShowDescription={handleShowDescription}
        onShowTaskDetail={handleShowTaskDetail}
        onEdit={handleEdit}
      />

      {showForm && (
        <TaskForm
          onClose={() => {
            setShowForm(false)
            setEditingTask(null)
          }}
          editingTask={editingTask}
        />
      )}

      {showDescriptionModal && (
        <DescriptionModal description={selectedDescription} onClose={() => setShowDescriptionModal(false)} />
      )}

      {showTaskDetailModal && selectedTask && (
        <TaskDetailModal
          task={selectedTask}
          onClose={() => setShowTaskDetailModal(false)}
          onEdit={() => {
            setShowTaskDetailModal(false)
            handleEdit(selectedTask)
          }}
        />
      )}
    </div>
  )
}
