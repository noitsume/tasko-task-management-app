"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import { FileStorageManager, type StorageData } from "@/lib/file-storage"

interface StorageContextType {
  storageManager: FileStorageManager
  isFileConnected: boolean
  fileName: string
  isSupported: boolean
  createNewFile: () => Promise<boolean>
  openFile: () => Promise<boolean>
  exportData: () => void
  importData: (file: File) => Promise<{ success: boolean; error?: string }>
  saveData: (data: Partial<StorageData>) => Promise<boolean>
  loadData: () => StorageData
  refreshData: () => void
}

const StorageContext = createContext<StorageContextType | undefined>(undefined)

export const useStorage = () => {
  const context = useContext(StorageContext)
  if (!context) {
    throw new Error("useStorage must be used within a StorageProvider")
  }
  return context
}

export function StorageProvider({ children }: { children: React.ReactNode }) {
  const [storageManager] = useState(() => FileStorageManager.getInstance())
  const [isFileConnected, setIsFileConnected] = useState(false)
  const [fileName, setFileName] = useState("No file connected")
  const [isSupported] = useState(() => storageManager.isSupported())
  const [refreshTrigger, setRefreshTrigger] = useState(0)

  useEffect(() => {
    // Load from localStorage as fallback on startup
    if (!isSupported) {
      storageManager.loadFromLocalStorage()
    }

    updateConnectionStatus()
  }, [isSupported, storageManager])

  const updateConnectionStatus = () => {
    setIsFileConnected(storageManager.isFileConnected())
    setFileName(storageManager.getFileName())
  }

  const createNewFile = async (): Promise<boolean> => {
    const success = await storageManager.createNewFile()
    updateConnectionStatus()
    return success
  }

  const openFile = async (): Promise<boolean> => {
    const success = await storageManager.openFile()
    updateConnectionStatus()
    return success
  }

  const exportData = () => {
    storageManager.exportData()
  }

  const importData = async (file: File): Promise<{ success: boolean; error?: string }> => {
    const result = await storageManager.importData(file)
    updateConnectionStatus()

    // Trigger refresh of all contexts if import was successful
    if (result.success) {
      setRefreshTrigger((prev) => prev + 1)
    }

    return result
  }

  const saveData = async (data: Partial<StorageData>): Promise<boolean> => {
    if (isSupported && isFileConnected) {
      return await storageManager.updateData(data)
    } else {
      // Fallback to localStorage
      await storageManager.updateData(data)
      storageManager.saveToLocalStorage()
      return true
    }
  }

  const loadData = (): StorageData => {
    return storageManager.getData()
  }

  const refreshData = () => {
    setRefreshTrigger((prev) => prev + 1)
  }

  return (
    <StorageContext.Provider
      value={{
        storageManager,
        isFileConnected,
        fileName,
        isSupported,
        createNewFile,
        openFile,
        exportData,
        importData,
        saveData,
        loadData,
        refreshData,
      }}
    >
      <div key={refreshTrigger}>{children}</div>
    </StorageContext.Provider>
  )
}
