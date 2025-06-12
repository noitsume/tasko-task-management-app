"use client"

import type React from "react"

import { useState, useRef } from "react"
import {
  Save,
  FolderOpen,
  Download,
  Upload,
  HardDrive,
  Cloud,
  AlertTriangle,
  ChevronDown,
  ChevronUp,
} from "lucide-react"
import { useStorage } from "@/context/storage-context"
import { useTheme } from "@/context/theme-context"
import { useTranslation } from "@/hooks/use-translation"

export function StorageManager() {
  const { darkMode } = useTheme()
  const { t } = useTranslation()
  const { isFileConnected, fileName, isSupported, createNewFile, openFile, exportData, importData } = useStorage()

  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState("")
  const [errorMessage, setErrorMessage] = useState("")
  const [isExpanded, setIsExpanded] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const showMessage = (msg: string, duration = 3000) => {
    setMessage(msg)
    setErrorMessage("")
    setTimeout(() => setMessage(""), duration)
  }

  const showError = (msg: string, duration = 5000) => {
    setErrorMessage(msg)
    setMessage("")
    setTimeout(() => setErrorMessage(""), duration)
  }

  const handleCreateNew = async () => {
    setIsLoading(true)
    try {
      const success = await createNewFile()
      if (success) {
        showMessage(t.language === "id" ? "File baru berhasil dibuat!" : "New file created successfully!")
      } else {
        showError(
          t.language === "id"
            ? "Gagal membuat file baru. Menggunakan localStorage sebagai fallback."
            : "Failed to create new file. Using localStorage as fallback.",
        )
      }
    } catch {}

    setIsLoading(false)
  }

  const handleOpenFile = async () => {
    setIsLoading(true)
    try {
      const success = await openFile()
      if (success) {
        showMessage(t.language === "id" ? "File berhasil dibuka!" : "File opened successfully!")
        // Refresh page to load new data
        window.location.reload()
      } else {
        showError(
          t.language === "id"
            ? "Gagal membuka file. Coba gunakan fitur Impor sebagai alternatif."
            : "Failed to open file. Try using Import feature as an alternative.",
        )
      }
    } catch {}

    setIsLoading(false)
  }

  const handleExport = () => {
    try {
      exportData()
      showMessage(t.language === "id" ? "Data berhasil diekspor!" : "Data exported successfully!")
    } catch {}

  }

  const handleImport = () => {
    fileInputRef.current?.click()
  }

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    console.log("File selected:", file.name, "Size:", file.size, "Type:", file.type)

    setIsLoading(true)
    try {
      const result = await importData(file)

      if (result.success) {
        showMessage(
          t.language === "id" ? "Data berhasil diimpor dan dimuat!" : "Data imported and loaded successfully!",
        )
        // Data will be automatically refreshed through the context system
      } else {
        const errorMsg = result.error || (t.language === "id" ? "Gagal mengimpor data" : "Failed to import data")
        showError(errorMsg)
      }
    } catch (error) {
      console.error("Import error in component:", error)
      showError(t.language === "id" ? "Error mengimpor data" : "Error importing data")
    }
    setIsLoading(false)

    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  return (
    <div className="fixed bottom-4 right-4 z-40">
      {/* Toggle Button */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className={`mb-2 px-4 py-2 rounded-lg font-mono text-sm transition-all duration-300 shadow-lg
        ${darkMode ? "bg-gray-800 hover:bg-gray-700 text-white border border-gray-700" : "bg-white hover:bg-gray-50 text-gray-900 border border-gray-200"}
        ${isExpanded ? "rounded-b-none" : ""}`}
      >
        <div className="flex items-center space-x-2">
          {isSupported ? <Cloud className="w-4 h-4" /> : <HardDrive className="w-4 h-4" />}
          <span>Import/Export</span>
          {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </div>
      </button>

      {/* Expandable Panel */}
      <div
        className={`overflow-hidden transition-all duration-300 ease-out ${
          isExpanded ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div
          className={`p-4 rounded-lg border shadow-lg max-w-sm rounded-t-none
          ${darkMode ? "bg-gray-800 border-gray-700 text-white" : "bg-white border-gray-200 text-gray-900"}`}
        >
          <div className="flex items-center mb-3">
            {isSupported ? <Cloud className="w-5 h-5 mr-2" /> : <HardDrive className="w-5 h-5 mr-2" />}
            <h3 className="font-mono font-bold text-sm">Import/Export</h3>
          </div>

          {/* Description */}
          <div className="mb-4 p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
            <p className="text-xs font-mono text-blue-400 leading-relaxed">
              {t.language === "id"
                ? "Fitur untuk memindahkan data tugas antar perangkat. Export untuk backup data, Import untuk memulihkan data dari file JSON."
                : "Feature to transfer task data between devices. Export to backup data, Import to restore data from JSON file."}
            </p>
          </div>

          {/* Connection Status */}
          <div className="mb-3">
            <div className={`flex items-center text-xs ${isFileConnected ? "text-green-500" : "text-yellow-500"}`}>
              <div className={`w-2 h-2 rounded-full mr-2 ${isFileConnected ? "bg-green-500" : "bg-yellow-500"}`} />
              {isFileConnected
                ? t.language === "id"
                  ? "Terhubung"
                  : "Connected"
                : t.language === "id"
                  ? "Tidak terhubung"
                  : "Not connected"}
            </div>
            {isFileConnected && <p className="text-xs opacity-70 mt-1 font-mono truncate">{fileName}</p>}
          </div>

          {/* File Operations */}
          <div className="space-y-2">
            {!isSupported && (
              <div className="flex items-center text-xs text-yellow-500 mb-2 p-2 bg-yellow-500/10 rounded">
                <AlertTriangle className="w-3 h-3 mr-1 flex-shrink-0" />
                <span>
                  {t.language === "id"
                    ? "File System API tidak tersedia. Gunakan Ekspor/Impor sebagai alternatif."
                    : "File System API unavailable. Use Export/Import as alternative."}
                </span>
              </div>
            )}

            {isSupported && (
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={handleCreateNew}
                  disabled={isLoading}
                  className={`flex items-center justify-center px-3 py-2 rounded text-xs font-mono transition-colors
                    ${
                      darkMode ? "bg-blue-600 hover:bg-blue-700 text-white" : "bg-blue-500 hover:bg-blue-600 text-white"
                    } disabled:opacity-50`}
                >
                  <Save className="w-3 h-3 mr-1" />
                  {t.language === "id" ? "Baru" : "New"}
                </button>

                <button
                  onClick={handleOpenFile}
                  disabled={isLoading}
                  className={`flex items-center justify-center px-3 py-2 rounded text-xs font-mono transition-colors
                    ${
                      darkMode
                        ? "bg-green-600 hover:bg-green-700 text-white"
                        : "bg-green-500 hover:bg-green-600 text-white"
                    } disabled:opacity-50`}
                >
                  <FolderOpen className="w-3 h-3 mr-1" />
                  {t.language === "id" ? "Buka" : "Open"}
                </button>
              </div>
            )}

            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={handleExport}
                className={`flex items-center justify-center px-3 py-2 rounded text-xs font-mono transition-colors
                ${
                  darkMode
                    ? "bg-purple-600 hover:bg-purple-700 text-white"
                    : "bg-purple-500 hover:bg-purple-600 text-white"
                }`}
              >
                <Download className="w-3 h-3 mr-1" />
                {t.language === "id" ? "Ekspor" : "Export"}
              </button>

              <button
                onClick={handleImport}
                disabled={isLoading}
                className={`flex items-center justify-center px-3 py-2 rounded text-xs font-mono transition-colors
                ${
                  darkMode
                    ? "bg-orange-600 hover:bg-orange-700 text-white"
                    : "bg-orange-500 hover:bg-orange-600 text-white"
                } disabled:opacity-50`}
              >
                <Upload className="w-3 h-3 mr-1" />
                {t.language === "id" ? "Impor" : "Import"}
              </button>
            </div>
          </div>

          {/* Hidden file input */}
          <input
            ref={fileInputRef}
            type="file"
            accept=".json,application/json"
            onChange={handleFileSelect}
            className="hidden"
          />

          {/* Status Message */}
          {message && <div className="mt-3 p-2 rounded text-xs font-mono bg-blue-500/20 text-blue-400">{message}</div>}

          {/* Error Message */}
          {errorMessage && (
            <div className="mt-3 p-2 rounded text-xs font-mono bg-red-500/20 text-red-400 max-h-20 overflow-y-auto">
              {errorMessage}
            </div>
          )}

          {/* Loading indicator */}
          {isLoading && (
            <div className="mt-3 flex items-center justify-center">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-500"></div>
              <span className="ml-2 text-xs">{t.language === "id" ? "Memproses..." : "Processing..."}</span>
            </div>
          )}

          {/* Info */}
          <div className="mt-3 pt-2 border-t border-opacity-20">
            <p className="text-xs opacity-50 font-mono">
              {isSupported
                ? t.language === "id"
                  ? "Data disimpan dalam file JSON eksternal"
                  : "Data saved in external JSON file"
                : t.language === "id"
                  ? "Menggunakan localStorage + Ekspor/Impor"
                  : "Using localStorage + Export/Import"}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
