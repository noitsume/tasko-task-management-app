"use client"

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { TaskForm } from "./task-form"
import type { Task, TaskFormData } from "@/types/task"

interface EditTaskDialogProps {
  task: Task | null
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  formData: TaskFormData
  onFormDataChange: (data: TaskFormData) => void
  onSubmit: () => void
}

export function EditTaskDialog({
  task,
  isOpen,
  onOpenChange,
  formData,
  onFormDataChange,
  onSubmit,
}: EditTaskDialogProps) {
  const handleCancel = () => {
    onOpenChange(false)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Edit Task</DialogTitle>
          <DialogDescription>Update your task details below.</DialogDescription>
        </DialogHeader>
        <TaskForm
          formData={formData}
          onFormDataChange={onFormDataChange}
          onSubmit={onSubmit}
          onCancel={handleCancel}
          isEditing={true}
        />
      </DialogContent>
    </Dialog>
  )
}
