"use client"

import { X, Flag, Calendar, Edit3, Trash2 } from "lucide-react"
import { useTheme } from "@/context/theme-context"
import { useTranslation } from "@/hooks/use-translation"
import { useTasks } from "@/context/task-context"
import { DeadlineCountdown } from "@/components/deadline-countdown"
import type { Task } from "@/types/task"
import { getStatusColor, getPriorityColor, getPriorityText } from "@/utils/task-helpers"

interface TaskDetailModalProps {
  task: Task
  onClose: () => void
  onEdit: () => void
}

export function TaskDetailModal({ task, onClose, onEdit }: TaskDetailModalProps) {
  const { t } = useTranslation()
  const { darkMode } = useTheme()
  const { deleteTask } = useTasks()

  const handleDelete = () => {
    deleteTask(task.id)
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div
        className={`w-full max-w-2xl p-6 rounded-lg relative 
        ${darkMode ? "border border-gray-800 bg-[#131313]" : "bg-white border border-gray-200"}`}
      >
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-mono font-bold">{task.title}</h3>
          <button onClick={onClose} className="p-1 rounded transition-colors dark:hover:bg-gray-800 hover:bg-gray-200">
            <X size={20} />
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <h4 className="text-sm font-mono font-bold mb-2 opacity-70">{t.description}</h4>
            <div className="max-h-48 overflow-y-auto">
              <p className="text-sm font-mono whitespace-pre-wrap break-words leading-relaxed">{task.description}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <h4 className="text-sm font-mono font-bold mb-2 opacity-70">{t.priority}</h4>
              <div className="flex items-center space-x-2">
                <Flag size={16} />
                <span className={`text-sm font-mono ${getPriorityColor(task.priority)}`}>
                  {getPriorityText(task.priority)}
                </span>
              </div>
            </div>

            <div>
              <h4 className="text-sm font-mono font-bold mb-2 opacity-70">{t.status}</h4>
              <div className="flex items-center space-x-2">
                <div className={`w-3 h-3 rounded-full ${getStatusColor(task.status).replace("text-", "bg-")}`} />
                <span className={`text-sm font-mono ${getStatusColor(task.status)}`}>
                  {task.status === "to-do" ? t.toDo : task.status === "in-progress" ? t.inProgress : t.done}
                </span>
              </div>
            </div>

            {task.dueDate && (
              <div>
                <h4 className="text-sm font-mono font-bold mb-2 opacity-70">{t.dueDate}</h4>
                <div className="flex items-center space-x-2">
                  <Calendar size={16} />
                  <span className="text-sm font-mono opacity-80">{new Date(task.dueDate).toLocaleDateString()}</span>
                </div>
              </div>
            )}
          </div>

          {/* Advanced features display */}
          <div className="space-y-3">
            {task.isAutomatic && (
              <div className="flex items-center space-x-2">
                <span className="text-xs font-mono px-2 py-1 rounded-full bg-blue-500/20 text-blue-400">
                  {t.automaticMode}
                </span>
              </div>
            )}

            {task.isDaily && (
              <div className="flex items-center space-x-2">
                <span className="text-xs font-mono px-2 py-1 rounded-full bg-purple-500/20 text-purple-400">
                  {t.dailyTask}
                </span>
              </div>
            )}

            {task.hasDeadline && (
              <div className="flex items-center space-x-2">
                <DeadlineCountdown task={task} />
              </div>
            )}

            {task.status === "done" && task.isLate !== undefined && (
              <div className="flex items-center space-x-2">
                <span
                  className={`text-xs font-mono px-2 py-1 rounded-full 
                  ${task.isLate ? "bg-red-500/20 text-red-400" : "bg-green-500/20 text-green-400"}`}
                >
                  {task.isLate ? t.late : t.onTime}
                </span>
              </div>
            )}
          </div>

          <div className="pt-4 border-t border-opacity-20">
            <p className="text-xs font-mono opacity-50">
              {t.language === "id" ? "Dibuat pada" : "Created on"}: {new Date(task.createdAt).toLocaleDateString()}
            </p>
          </div>

          <div className="flex space-x-3 pt-4">
            <button
              onClick={onEdit}
              className="flex items-center space-x-2 px-4 py-2 rounded-lg font-mono text-sm transition-colors 
              dark:bg-blue-600 dark:hover:bg-blue-700 bg-blue-500 hover:bg-blue-600 text-white"
            >
              <Edit3 size={16} />
              <span>{t.language === "id" ? "Edit" : "Edit"}</span>
            </button>
            <button
              onClick={handleDelete}
              className="flex items-center space-x-2 px-4 py-2 rounded-lg font-mono text-sm transition-colors 
              dark:bg-red-600 dark:hover:bg-red-700 bg-red-500 hover:bg-red-600 text-white"
            >
              <Trash2 size={16} />
              <span>{t.language === "id" ? "Hapus" : "Delete"}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
