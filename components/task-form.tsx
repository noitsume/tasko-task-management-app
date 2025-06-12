"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Calendar, HelpCircle } from "lucide-react"
import { useTheme } from "@/context/theme-context"
import { useTranslation } from "@/hooks/use-translation"
import { useTasks } from "@/context/task-context"
import { useTimezone } from "@/context/timezone-context"
import type { Task } from "@/types/task"
import { getDateTimeLocalFormat } from "@/utils/date-helpers"

interface TaskFormProps {
  onClose: () => void
  editingTask: Task | null
}

const MINUTE_FRACTIONS = [
  { value: 0, label: "0" },
  { value: 10, label: "1/6 (10 min)" },
  { value: 15, label: "1/4 (15 min)" },
  { value: 20, label: "1/3 (20 min)" },
  { value: 30, label: "1/2 (30 min)" },
  { value: 45, label: "3/4 (45 min)" },
]

export function TaskForm({ onClose, editingTask }: TaskFormProps) {
  const { t } = useTranslation()
  const { darkMode } = useTheme()
  const { addTask, updateTask } = useTasks()
  const { getTimezoneDisplay } = useTimezone()

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    priority: "sedang" as Task["priority"],
    status: "to-do" as Task["status"],
    dueDate: getDateTimeLocalFormat().slice(0, 16),
    isAutomatic: false,
    isDaily: false,
    hasDeadline: false,
    deadlineHours: 1,
    deadlineMinutes: 0,
  })

  // Initialize form with editing task data if available
  useEffect(() => {
    if (editingTask) {
      setFormData({
        title: editingTask.title,
        description: editingTask.description,
        priority: editingTask.priority,
        status: editingTask.status,
        dueDate: editingTask.dueDate || getDateTimeLocalFormat().slice(0, 16),
        isAutomatic: editingTask.isAutomatic || false,
        isDaily: editingTask.isDaily || false,
        hasDeadline: editingTask.hasDeadline || false,
        deadlineHours: editingTask.deadlineHours || 1,
        deadlineMinutes: editingTask.deadlineMinutes || 0,
      })
    } else {
      // Set default due date for new tasks
      setFormData((prev) => ({
        ...prev,
        dueDate: getDateTimeLocalFormat().slice(0, 16),
      }))
    }
  }, [editingTask])

  // Handle date changes - synchronize between target date and automatic mode date
  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>, isDateTimeLocal = false) => {
    const newDate = e.target.value

    if (isDateTimeLocal) {
      // If changing the datetime-local input (automatic mode)
      // Update both the dueDate and the date input
      setFormData({
        ...formData,
        dueDate: newDate,
      })
    } else {
      // If changing the date input (target date)
      // Preserve the time part from the existing dueDate if it exists
      const existingDate = formData.dueDate || ""
      const timePart = existingDate.includes("T") ? existingDate.split("T")[1] : "00:00"
      const newFullDate = `${newDate}T${timePart}`

      setFormData({
        ...formData,
        dueDate: newFullDate,
      })
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Ensure dueDate is properly formatted before saving
    const finalFormData = { ...formData }

    // If dueDate doesn't have a time component, add it
    if (finalFormData.dueDate && !finalFormData.dueDate.includes("T")) {
      finalFormData.dueDate = `${finalFormData.dueDate}T00:00`
    }

    if (editingTask) {
      updateTask(editingTask.id, finalFormData)
    } else {
      addTask(finalFormData)
    }

    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div
        className={`w-full max-w-md p-6 rounded-lg max-h-[90vh] overflow-y-auto 
        ${darkMode ? "border border-gray-800 bg-[#131313]" : "bg-white border border-gray-200"}`}
      >
        <h2 className="text-xl font-mono font-bold mb-6">{editingTask ? t.editTaskTitle : t.addTaskTitle}</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-mono mb-2">{t.title}</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className={`w-full p-3 rounded-lg font-mono border 
              ${
                darkMode
                  ? "bg-gray-800 border-gray-700 focus:border-gray-600"
                  : "bg-gray-50 border-gray-300 focus:border-gray-400"
              } focus:outline-none`}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-mono mb-2">{t.description}</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className={`w-full p-3 rounded-lg font-mono border h-24 resize-none 
              ${
                darkMode
                  ? "bg-gray-800 border-gray-700 focus:border-gray-600"
                  : "bg-gray-50 border-gray-300 focus:border-gray-400"
              } focus:outline-none`}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-mono mb-2">{t.priority}</label>
              <select
                value={formData.priority}
                onChange={(e) => setFormData({ ...formData, priority: e.target.value as Task["priority"] })}
                className={`w-full p-3 rounded-lg font-mono border 
                ${
                  darkMode
                    ? "bg-gray-800 border-gray-700 focus:border-gray-600"
                    : "bg-gray-50 border-gray-300 focus:border-gray-400"
                } focus:outline-none`}
              >
                <option value="rendah">{t.low}</option>
                <option value="sedang">{t.medium}</option>
                <option value="tinggi">{t.high}</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-mono mb-2">{t.status}</label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value as Task["status"] })}
                className={`w-full p-3 rounded-lg font-mono border 
                ${
                  darkMode
                    ? "bg-gray-800 border-gray-700 focus:border-gray-600"
                    : "bg-gray-50 border-gray-300 focus:border-gray-400"
                } focus:outline-none`}
              >
                <option value="to-do">{t.toDo}</option>
                <option value="in-progress">{t.inProgress}</option>
                <option value="done">{t.done}</option>
              </select>
            </div>
          </div>

          {/* Advanced Features */}
          <div className="space-y-4">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-md font-mono font-bold">{t.features}</h3>
            </div>

            {/* Automatic Mode */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <label className="block text-sm font-mono">{t.automaticMode}</label>
                  <div className="relative group">
                    <HelpCircle className="w-4 h-4 opacity-50 hover:opacity-80 cursor-help transition-opacity" />
                    <div
                      className={`absolute left-1/2 transform -translate-x-1/2 bottom-full mb-2 w-56 p-3 rounded-lg text-xs font-mono opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-50 pointer-events-none
                      ${darkMode ? "bg-gray-900 border border-gray-700 text-gray-200 shadow-xl" : "bg-white border border-gray-300 text-gray-800 shadow-lg"}`}
                    >
                      <div className="text-center leading-relaxed">{t.automaticModeTooltip}</div>
                      {/* Tooltip arrow */}
                      <div
                        className={`absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent
                        ${darkMode ? "border-t-gray-900" : "border-t-white"}`}
                      ></div>
                    </div>
                  </div>
                </div>
                <div className="relative inline-block w-10 align-middle select-none">
                  <input
                    type="checkbox"
                    id="toggle-auto"
                    checked={formData.isAutomatic}
                    onChange={(e) => setFormData({ ...formData, isAutomatic: e.target.checked })}
                    className="sr-only"
                  />
                  <label
                    htmlFor="toggle-auto"
                    className={`block overflow-hidden h-6 rounded-full cursor-pointer transition-colors duration-200 
                    ${formData.isAutomatic ? "bg-blue-500" : darkMode ? "bg-gray-600" : "bg-gray-300"}`}
                  >
                    <span
                      className={`block h-6 w-6 rounded-full bg-white transform transition-transform duration-200 
                      ${formData.isAutomatic ? "translate-x-4" : "translate-x-0"}`}
                    ></span>
                  </label>
                </div>
              </div>

              {formData.isAutomatic && (
                <div>
                  <label className="block text-sm font-mono mb-2">{t.automaticStart}</label>
                  <div className="flex items-center">
                    <Calendar className="w-5 h-5 mr-2 dark:text-gray-400 text-gray-500" />
                    <input
                      type="datetime-local"
                      value={formData.dueDate}
                      onChange={(e) => handleDateChange(e, true)}
                      className={`w-full p-3 rounded-lg font-mono border 
                      ${
                        darkMode
                          ? "bg-gray-800 border-gray-700 focus:border-gray-600"
                          : "bg-gray-50 border-gray-300 focus:border-gray-400"
                      } focus:outline-none`}
                    />
                  </div>
                  <p className="text-xs mt-2 dark:text-gray-400 text-gray-500">
                    {t.automaticDesc} (Timezone: {getTimezoneDisplay()})
                  </p>
                </div>
              )}
            </div>

            {/* Daily Mode */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <label className="block text-sm font-mono">{t.dailyTask}</label>
                  <div className="relative group">
                    <HelpCircle className="w-4 h-4 opacity-50 hover:opacity-80 cursor-help transition-opacity" />
                    <div
                      className={`absolute left-1/2 transform -translate-x-1/2 bottom-full mb-2 w-56 p-3 rounded-lg text-xs font-mono opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-50 pointer-events-none
                      ${darkMode ? "bg-gray-900 border border-gray-700 text-gray-200 shadow-xl" : "bg-white border border-gray-300 text-gray-800 shadow-lg"}`}
                    >
                      <div className="text-center leading-relaxed">{t.dailyTaskTooltip}</div>
                      {/* Tooltip arrow */}
                      <div
                        className={`absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent
                        ${darkMode ? "border-t-gray-900" : "border-t-white"}`}
                      ></div>
                    </div>
                  </div>
                </div>
                <div className="relative inline-block w-10 align-middle select-none">
                  <input
                    type="checkbox"
                    id="toggle-daily"
                    checked={formData.isDaily}
                    onChange={(e) => setFormData({ ...formData, isDaily: e.target.checked })}
                    className="sr-only"
                  />
                  <label
                    htmlFor="toggle-daily"
                    className={`block overflow-hidden h-6 rounded-full cursor-pointer transition-colors duration-200 
                    ${formData.isDaily ? "bg-purple-500" : darkMode ? "bg-gray-600" : "bg-gray-300"}`}
                  >
                    <span
                      className={`block h-6 w-6 rounded-full bg-white transform transition-transform duration-200 
                      ${formData.isDaily ? "translate-x-4" : "translate-x-0"}`}
                    ></span>
                  </label>
                </div>
              </div>
              {formData.isDaily && <p className="text-xs mt-2 dark:text-gray-400 text-gray-500">{t.dailyDesc}</p>}
            </div>

            {/* Deadline Toggle */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <label className="block text-sm font-mono">{t.setDeadline}</label>
                  <div className="relative group">
                    <HelpCircle className="w-4 h-4 opacity-50 hover:opacity-80 cursor-help transition-opacity" />
                    <div
                      className={`absolute left-1/2 transform -translate-x-1/2 bottom-full mb-2 w-56 p-3 rounded-lg text-xs font-mono opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-50 pointer-events-none
                      ${darkMode ? "bg-gray-900 border border-gray-700 text-gray-200 shadow-xl" : "bg-white border border-gray-300 text-gray-800 shadow-lg"}`}
                    >
                      <div className="text-center leading-relaxed">{t.deadlineTooltip}</div>
                      {/* Tooltip arrow */}
                      <div
                        className={`absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent
                        ${darkMode ? "border-t-gray-900" : "border-t-white"}`}
                      ></div>
                    </div>
                  </div>
                </div>
                <div className="relative inline-block w-10 align-middle select-none">
                  <input
                    type="checkbox"
                    id="toggle-deadline"
                    checked={formData.hasDeadline}
                    onChange={(e) => setFormData({ ...formData, hasDeadline: e.target.checked })}
                    className="sr-only"
                  />
                  <label
                    htmlFor="toggle-deadline"
                    className={`block overflow-hidden h-6 rounded-full cursor-pointer transition-colors duration-200 
                    ${formData.hasDeadline ? "bg-orange-500" : darkMode ? "bg-gray-600" : "bg-gray-300"}`}
                  >
                    <span
                      className={`block h-6 w-6 rounded-full bg-white transform transition-transform duration-200 
                      ${formData.hasDeadline ? "translate-x-4" : "translate-x-0"}`}
                    ></span>
                  </label>
                </div>
              </div>

              {formData.hasDeadline && (
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-mono mb-2">{t.hours}</label>
                    <select
                      value={formData.deadlineHours}
                      onChange={(e) => setFormData({ ...formData, deadlineHours: Number.parseInt(e.target.value) })}
                      className={`w-full p-3 rounded-lg font-mono border 
                      ${
                        darkMode
                          ? "bg-gray-800 border-gray-700 focus:border-gray-600"
                          : "bg-gray-50 border-gray-300 focus:border-gray-400"
                      } focus:outline-none`}
                    >
                      {Array.from({ length: 24 }, (_, i) => i + 1).map((hour) => (
                        <option key={hour} value={hour}>
                          {hour} {hour === 1 ? "jam" : "jam"}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-mono mb-2">{t.minutes}</label>
                    <select
                      value={formData.deadlineMinutes}
                      onChange={(e) => setFormData({ ...formData, deadlineMinutes: Number.parseInt(e.target.value) })}
                      className={`w-full p-3 rounded-lg font-mono border 
                      ${
                        darkMode
                          ? "bg-gray-800 border-gray-700 focus:border-gray-600"
                          : "bg-gray-50 border-gray-300 focus:border-gray-400"
                      } focus:outline-none`}
                    >
                      {MINUTE_FRACTIONS.map((fraction) => (
                        <option key={fraction.value} value={fraction.value}>
                          {fraction.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-mono mb-2">{t.dueDate}</label>
            <input
              type="date"
              value={formData.dueDate ? formData.dueDate.split("T")[0] : ""}
              onChange={(e) => handleDateChange(e)}
              className={`w-full p-3 rounded-lg font-mono border 
              ${
                darkMode
                  ? "bg-gray-800 border-gray-700 focus:border-gray-600"
                  : "bg-gray-50 border-gray-300 focus:border-gray-400"
              } focus:outline-none`}
            />
          </div>

          <div className="flex space-x-4 pt-4">
            <button
              type="submit"
              className={`flex-1 py-3 rounded-lg font-mono transition-colors 
              ${darkMode ? "bg-white text-black hover:bg-gray-200" : "bg-black text-white hover:bg-gray-800"}`}
            >
              {editingTask ? t.update : t.save}
            </button>
            <button
              type="button"
              onClick={onClose}
              className={`flex-1 py-3 rounded-lg font-mono border transition-colors 
              ${darkMode ? "border-gray-700 hover:bg-gray-800" : "border-gray-300 hover:bg-gray-100"}`}
            >
              {t.cancel}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
