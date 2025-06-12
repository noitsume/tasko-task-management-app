"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import type { Task } from "@/types/task"
import { getCurrentTimeInUserTimezone } from "@/utils/date-helpers"
import { useNotification } from "@/context/notification-context"
import { useStorage } from "@/context/storage-context"

interface TaskContextType {
  tasks: Task[]
  addTask: (formData: any) => void
  updateTask: (id: string, formData: any) => void
  deleteTask: (id: string) => void
  progressTaskStatus: (taskId: string) => void
  refreshTasks: () => void
}

const TaskContext = createContext<TaskContextType>({
  tasks: [],
  addTask: () => {},
  updateTask: () => {},
  deleteTask: () => {},
  progressTaskStatus: () => {},
  refreshTasks: () => {},
})

export const useTasks = () => useContext(TaskContext)

export function TaskProvider({ children }: { children: React.ReactNode }) {
  const [tasks, setTasks] = useState<Task[]>([])
  const [isInitialized, setIsInitialized] = useState(false)
  const { addNotification, showBrowserNotification } = useNotification()
  const { saveData, loadData } = useStorage()

  // Load tasks from storage on mount and when storage changes
  useEffect(() => {
    const data = loadData()
    console.log("Loading tasks from storage:", data.tasks)
    setTasks(data.tasks || [])
    setIsInitialized(true)
  }, [loadData])

  // Save tasks to storage whenever tasks change (but not on initial load)
  useEffect(() => {
    if (isInitialized) {
      const saveToStorage = async () => {
        console.log("Saving tasks to storage:", tasks)
        await saveData({ tasks })
      }
      saveToStorage()
    }
  }, [tasks, saveData, isInitialized])

  // Check automatic tasks and update status if needed
  useEffect(() => {
    const interval = setInterval(() => {
      const now = getCurrentTimeInUserTimezone()

      setTasks((prevTasks) => {
        const updatedTasks = prevTasks.map((task) => {
          if (task.isAutomatic && task.status === "to-do" && task.dueDate) {
            const dueDate = new Date(task.dueDate)
            if (dueDate <= now) {
              // Schedule notifications to run after state update
              setTimeout(() => {
                const title = "🚀 Task Starting!"
                const message = `"${task.title}" is starting now`

                // Show in-app notification
                addNotification({
                  title,
                  message,
                  type: "info",
                  duration: 6000,
                })

                // Show browser notification
                showBrowserNotification(title, message)
              }, 0)

              return {
                ...task,
                status: "in-progress" as const,
                updatedAt: now.toISOString(),
                inProgressAt: now.toISOString(),
              }
            }
          }
          return task
        })

        return updatedTasks
      })
    }, 1000) // Check every second for real-time updates

    return () => clearInterval(interval)
  }, [addNotification, showBrowserNotification])

  const refreshTasks = () => {
    const data = loadData()
    console.log("Refreshing tasks:", data.tasks)
    setTasks(data.tasks || [])
  }

  const addTask = async (formData: any) => {
    const now = getCurrentTimeInUserTimezone()

    // Ensure dueDate is properly formatted
    let dueDate = formData.dueDate
    if (dueDate && !dueDate.includes("T")) {
      dueDate = `${dueDate}T00:00`
    }

    const newTask: Task = {
      id: Date.now().toString(),
      title: formData.title,
      description: formData.description,
      priority: formData.priority,
      status: formData.status,
      createdAt: now.toISOString(),
      updatedAt: now.toISOString(),
      dueDate: dueDate,
      isAutomatic: formData.isAutomatic,
      isDaily: formData.isDaily,
      hasDeadline: formData.hasDeadline,
      deadlineHours: formData.hasDeadline ? formData.deadlineHours : undefined,
      deadlineMinutes: formData.hasDeadline ? formData.deadlineMinutes : undefined,
    }

    console.log("Adding new task with dueDate:", newTask.dueDate)
    setTasks((prev) => [...prev, newTask])
  }

  const updateTask = async (id: string, formData: any) => {
    const now = getCurrentTimeInUserTimezone()

    // Ensure dueDate is properly formatted
    let dueDate = formData.dueDate
    if (dueDate && !dueDate.includes("T")) {
      dueDate = `${dueDate}T00:00`
    }

    console.log("Updating task with dueDate:", dueDate)

    setTasks((prev) =>
      prev.map((task) =>
        task.id === id
          ? {
              ...task,
              ...formData,
              dueDate: dueDate,
              updatedAt: now.toISOString(),
              deadlineHours: formData.hasDeadline ? formData.deadlineHours : undefined,
              deadlineMinutes: formData.hasDeadline ? formData.deadlineMinutes : undefined,
            }
          : task,
      ),
    )
  }

  const deleteTask = async (id: string) => {
    setTasks((prev) => prev.filter((task) => task.id !== id))
  }

  const progressTaskStatus = async (taskId: string) => {
    const task = tasks.find((t) => t.id === taskId)
    if (!task) return

    const now = getCurrentTimeInUserTimezone()

    if (task.status === "to-do") {
      setTasks((prev) =>
        prev.map((t) =>
          t.id === taskId
            ? {
                ...t,
                status: "in-progress" as const,
                updatedAt: now.toISOString(),
                inProgressAt: now.toISOString(),
              }
            : t,
        ),
      )
    } else if (task.status === "in-progress") {
      const completedAt = now.toISOString()
      let isLate = false

      if (task.hasDeadline && task.deadlineHours && task.deadlineMinutes !== undefined && task.inProgressAt) {
        const deadlineTime = new Date(task.inProgressAt)
        deadlineTime.setHours(
          deadlineTime.getHours() + task.deadlineHours,
          deadlineTime.getMinutes() + task.deadlineMinutes,
        )
        isLate = now > deadlineTime
      }

      if (task.isDaily) {
        let nextDate: Date

        if (task.dueDate) {
          nextDate = new Date(task.dueDate)
        } else {
          nextDate = getCurrentTimeInUserTimezone()
        }

        nextDate.setDate(nextDate.getDate() + 1)

        const newTask: Task = {
          ...task,
          id: Date.now().toString(),
          status: "to-do" as const,
          updatedAt: now.toISOString(),
          dueDate: nextDate.toISOString().slice(0, 16),
          completedAt: undefined,
          isLate: undefined,
          inProgressAt: undefined,
        }

        setTasks((prev) => [
          ...prev.map((t) =>
            t.id === taskId
              ? {
                  ...t,
                  status: "done" as const,
                  updatedAt: now.toISOString(),
                  completedAt,
                  isLate,
                }
              : t,
          ),
          newTask,
        ])
      } else {
        setTasks((prev) =>
          prev.map((t) =>
            t.id === taskId
              ? {
                  ...t,
                  status: "done" as const,
                  updatedAt: now.toISOString(),
                  completedAt,
                  isLate,
                }
              : t,
          ),
        )
      }
    }
  }

  return (
    <TaskContext.Provider value={{ tasks, addTask, updateTask, deleteTask, progressTaskStatus, refreshTasks }}>
      {children}
    </TaskContext.Provider>
  )
}
