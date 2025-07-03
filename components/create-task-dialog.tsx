"use client"

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { TaskForm } from "./task-form"
import type { TaskFormData } from "@/types/task"

interface CreateTaskDialogProps {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  formData: TaskFormData
  onFormDataChange: (data: TaskFormData) => void
  onSubmit: () => void
}

export function CreateTaskDialog({
  isOpen,
  onOpenChange,
  formData,
  onFormDataChange,
  onSubmit,
}: CreateTaskDialogProps) {
  const handleCancel = () => {
    onOpenChange(false)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Create New Task</DialogTitle>
          <DialogDescription>Add a new task to your list with all the details.</DialogDescription>
        </DialogHeader>
        <TaskForm formData={formData} onFormDataChange={onFormDataChange} onSubmit={onSubmit} onCancel={handleCancel} />
      </DialogContent>
    </Dialog>
  )
}
