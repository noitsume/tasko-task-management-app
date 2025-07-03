"use client"

import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"

interface EmptyStateProps {
  onAddTask: () => void
}

export function EmptyState({ onAddTask }: EmptyStateProps) {
  return (
    <div className="text-center py-16">
      <div className="mb-8">
        <div className="w-32 h-24 mx-auto mb-6 bg-gray-100 rounded-lg flex items-center justify-center relative">
          <div className="absolute inset-2 bg-white rounded border-2 border-dashed border-gray-300 flex items-center justify-center">
            <div className="space-y-1">
              <div className="w-8 h-1 bg-gray-300 rounded"></div>
              <div className="w-6 h-1 bg-gray-300 rounded"></div>
              <div className="w-10 h-1 bg-gray-300 rounded"></div>
            </div>
          </div>
          <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-orange-200 rounded-full flex items-center justify-center">
            <Plus className="w-3 h-3 text-orange-600" />
          </div>
        </div>
      </div>
      <p className="text-gray-600 mb-8">No tasks yet. Add your first task!</p>
      <Button onClick={onAddTask} className="bg-black hover:bg-gray-800 text-white px-8">
        <Plus className="w-4 h-4 mr-2" />
        Add Task
      </Button>
    </div>
  )
}
