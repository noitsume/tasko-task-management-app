"use client"

import { X } from "lucide-react"
import { useTheme } from "@/context/theme-context"
import { useTranslation } from "@/hooks/use-translation"

interface DescriptionModalProps {
  description: string
  onClose: () => void
}

export function DescriptionModal({ description, onClose }: DescriptionModalProps) {
  const { darkMode } = useTheme()
  const { t } = useTranslation()

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div
        className={`w-full max-w-2xl p-6 rounded-lg relative max-h-[80vh] overflow-y-auto
        ${darkMode ? "border border-gray-800 bg-[#131313]" : "bg-white border border-gray-200"}`}
      >
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-mono font-bold">{t.description}</h3>
          <button onClick={onClose} className="p-1 rounded transition-colors dark:hover:bg-gray-800 hover:bg-gray-200">
            <X size={20} />
          </button>
        </div>

        <div className="space-y-4">
          <p className="text-sm font-mono whitespace-pre-wrap break-words leading-relaxed">{description}</p>
        </div>
      </div>
    </div>
  )
}
