"use client"

import { useState,useEffect, useRef } from "react"
import { Edit3, Trash2, Calendar, Flag, Hand } from "lucide-react"
import { useTheme } from "@/context/theme-context"
import { useTranslation } from "@/hooks/use-translation"
import { useTasks } from "@/context/task-context"
import { DeadlineCountdown } from "@/components/deadline-countdown"
import type { Task } from "@/types/task"
import { getStatusIcon, getPriorityColor, getPriorityText, getStatusColor, getRelativeTime } from "@/utils/task-helpers"

interface TaskListProps {
  tasks: Task[]
  onShowDescription: (description: string) => void
  onShowTaskDetail: (task: Task) => void
  onEdit: (task: Task) => void
}

export function TaskList({ tasks, onShowDescription, onShowTaskDetail, onEdit }: TaskListProps) {
  const { t } = useTranslation()
  const { darkMode } = useTheme()
  const { deleteTask, progressTaskStatus } = useTasks()

  // State for long press
  const [holdingTask, setHoldingTask] = useState<string | null>(null)
  const [holdProgress, setHoldProgress] = useState(0)
  const [longPressCompleted, setLongPressCompleted] = useState(false)
  const holdTimerRef = useRef<NodeJS.Timeout | null>(null)
  const progressTimerRef = useRef<NodeJS.Timeout | null>(null)
  

  
  const handlePressStart = (taskId: string) => {
    const task = tasks.find((t) => t.id === taskId)
    if (!task || task.status === "done") return

    setLongPressCompleted(false)
    setHoldingTask(taskId)
    setHoldProgress(0)

    progressTimerRef.current = setInterval(() => {
      setHoldProgress((prev) => {
        const newProgress = prev + 30 / 30
        return newProgress >= 100 ? 100 : newProgress
      })
    }, 5)

    holdTimerRef.current = setTimeout(() => {
      progressTaskStatus(taskId)
      setLongPressCompleted(true)
      handlePressEnd()
    }, 1700)
  }

  const handlePressEnd = () => {
    if (holdTimerRef.current) {
      clearTimeout(holdTimerRef.current)
      holdTimerRef.current = null
    }
    if (progressTimerRef.current) {
      clearInterval(progressTimerRef.current)
      progressTimerRef.current = null
    }
    setHoldingTask(null)
    setHoldProgress(0)
  }

  const handleTaskClick = (task: Task) => {
    // Only show detail modal if long press was not completed
    if (!longPressCompleted) {
      onShowTaskDetail(task)
    }
    // Reset the flag after a short delay
    setTimeout(() => {
      setLongPressCompleted(false)
    }, 100)
  }

  const truncateDescription = (text: string, maxLength = 180) => {
    if (text.length <= maxLength) return text
    const truncated = text.substring(0, maxLength).trim()
    const lastSpaceIndex = truncated.lastIndexOf(" ")
    return lastSpaceIndex > 0 ? truncated.substring(0, lastSpaceIndex) : truncated
  }

  const isDescriptionTruncated = (text: string, maxLength = 180) => {
    return text.length > maxLength
  }

  if (tasks.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-6xl mb-4 opacity-20">📝</div>
        <p className="font-mono opacity-60">{t.noTasks}</p>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tasks.map((task) => (
          <div
            key={task.id}
            className={`p-6 rounded-lg border transition-all hover:scale-105 hover:shadow-lg cursor-pointer h-auto min-h-[280px] flex flex-col relative ${
              darkMode
                ? "border-gray-800 hover:border-gray-600 hover:bg-gray-900/50 bg-[#131313]"
                : "bg-gray-50 border-gray-200 hover:border-gray-400 hover:bg-gray-100"
            } ${holdingTask === task.id ? "scale-105 shadow-xl" : ""}`}
            onMouseDown={() => handlePressStart(task.id)}
            onMouseUp={handlePressEnd}
            onMouseLeave={handlePressEnd}
            onTouchStart={() => handlePressStart(task.id)}
            onTouchEnd={handlePressEnd}
            onClick={() => handleTaskClick(task)}
          >
            {/* Progress bar for long press */}
            {holdingTask === task.id && (
              <div className="absolute top-0 left-0 right-0 h-1 bg-gray-200 dark:bg-gray-700 rounded-t-lg overflow-hidden">
                <div
                  className="h-full bg-blue-500 transition-all duration-100 ease-out"
                  style={{ width: `${holdProgress}%` }}
                />
              </div>
            )}

            {/* Hold indicator - only visible for todo and in-progress tasks */}
            {task.status !== "done" && (
              <div className="absolute right-2 top-2 opacity-30 dark:text-gray-400 text-gray-500">
                <Hand className="w-4 h-4" />
              </div>
            )}

            <div className="flex justify-between items-start mb-4">
              <h3 className="font-mono font-bold text-lg truncate pr-2 flex-1">{task.title}</h3>
              <div className="flex space-x-2 flex-shrink-0">
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    onEdit(task)
                  }}
                  className="p-1 rounded transition-colors dark:hover:bg-gray-800 hover:bg-gray-200"
                >
                  <Edit3 size={16} />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    deleteTask(task.id)
                  }}
                  className={`p-1 rounded transition-colors ${
                    darkMode ? "hover:bg-gray-800 text-red-400" : "hover:bg-gray-200 text-red-600"
                  }`}
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>

            <div className="flex-1 mb-4 overflow-hidden">
              <div className="h-20 overflow-hidden">
                <p className="text-sm opacity-80 font-mono break-words leading-relaxed">
                  {truncateDescription(task.description)}
                  {isDescriptionTruncated(task.description) && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        onShowDescription(task.description)
                      }}
                      className="text-blue-400 hover:text-blue-300 ml-1 cursor-pointer font-bold transition-colors duration-200"
                    >
                      ...
                    </button>
                  )}
                </p>
              </div>
            </div>

            <div className="space-y-2 mt-auto">
              <div className="flex items-center space-x-2">
                <Flag size={14} />
                <span className={`text-sm font-mono ${getPriorityColor(task.priority)}`}>
                  {getPriorityText(task.priority)}
                </span>
              </div>

              <div className="flex items-center space-x-2">
                {getStatusIcon(task.status)}
                <span className={`text-sm font-mono ${getStatusColor(task.status)}`}>
                  {task.status === "to-do" ? t.toDo : task.status === "in-progress" ? t.inProgress : t.done}
                </span>
              </div>

              {/* Advanced features indicators */}
              <div className="flex items-center space-x-2 flex-wrap">
                {task.isAutomatic && (
                  <span className="text-xs font-mono px-2 py-1 rounded-full bg-blue-500/20 text-blue-400">Auto</span>
                )}
                {task.isDaily && (
                  <span className="text-xs font-mono px-2 py-1 rounded-full bg-purple-500/20 text-purple-400">
                    Daily
                  </span>
                )}
                {task.hasDeadline && <DeadlineCountdown task={task} />}
              </div>

              {/* Show late/on time for completed tasks */}
              {task.status === "done" && task.isLate !== undefined && (
                <div className="flex items-center space-x-2">
                  <span
                    className={`text-xs font-mono px-2 py-1 rounded-full ${
                      task.isLate ? "bg-red-500/20 text-red-400" : "bg-green-500/20 text-green-400"
                    }`}
                  >
                    {task.isLate ? t.late : t.onTime}
                  </span>
                </div>
              )}

              {/* Show relative time only for automatic tasks that aren't done */}
              {task.dueDate && task.status !== "done" && task.isAutomatic && (
                <div className="flex items-center space-x-2">
                  <Calendar size={14} />
                  <span className="text-xs font-mono opacity-60">
                    {getRelativeTime(task.dueDate, task.isAutomatic)}
                  </span>
                </div>
              )}

              {task.dueDate && (
                <div className="flex items-center space-x-2">
                  <Calendar size={14} />
                  <span className="text-sm font-mono opacity-60">{new Date(task.dueDate).toLocaleDateString()}</span>
                </div>
              )}
            </div>

            {/* Hold instruction */}
            {task.status !== "done" && (
              <div className="text-xs mt-3 text-center dark:text-gray-500 text-gray-400">{t.holdInstruction}</div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
