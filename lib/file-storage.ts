export interface StorageData {
  tasks: any[]
  theme: string
  language: string
  settings: {
    darkMode: boolean
    lastUpdated: string
  }
}

export class FileStorageManager {
  private static instance: FileStorageManager
  private fileHandle: FileSystemFileHandle | null = null
  private data: StorageData = {
    tasks: [],
    theme: "dark",
    language: "id",
    settings: {
      darkMode: true,
      lastUpdated: new Date().toISOString(),
    },
  }
  private _isAvailable = false

  static getInstance(): FileStorageManager {
    if (!FileStorageManager.instance) {
      FileStorageManager.instance = new FileStorageManager()
    }
    return FileStorageManager.instance
  }

  constructor() {
    this._checkAvailability()
  }

  private _checkAvailability(): void {
    try {
      // Check if running in iframe
      const isBrowser = typeof window !== "undefined"

      const isInIframe = isBrowser && window.top !== window

      // Check if File System Access API is available
      const hasFileSystemAccess = isBrowser && "showSaveFilePicker" in window
        typeof window.showOpenFilePicker === "function" && typeof window.showSaveFilePicker === "function"

      this._isAvailable = hasFileSystemAccess && !isInIframe

      if (!this._isAvailable && hasFileSystemAccess && isInIframe) {
        console.warn("File System Access API tidak tersedia dalam iframe")
      }
    } catch (error) {
      console.error("Error checking File System Access API availability:", error)
      this._isAvailable = false
    }
  }

  // Check if File System Access API is supported and available
  isSupported(): boolean {
    return this._isAvailable
  }

  // Create new storage file
  async createNewFile(): Promise<boolean> {
    try {
      if (!this.isSupported() || !window.showSaveFilePicker) {
        throw new Error("File System Access API not supported or not available in this context")
      }

      const fileHandle = await window.showSaveFilePicker({
        suggestedName: "tasko-data.json",
        types: [
          {
            description: "Tasko Data Files",
            accept: { "application/json": [".json"] },
          },
        ],
      })

      this.fileHandle = fileHandle
      await this.saveToFile()
      return true
    } catch (error) {
      console.error("Error creating new file:", error)
      // Fallback to localStorage
      this.saveToLocalStorage()
      return false
    }
  }

  // Open existing storage file
  async openFile(): Promise<boolean> {
    try {
      if (!this.isSupported() || !window.showOpenFilePicker) {
        throw new Error("File System Access API not supported or not available in this context")
      }

      const [fileHandle] = await window.showOpenFilePicker({
        types: [
          {
            description: "Tasko Data Files",
            accept: { "application/json": [".json"] },
          },
        ],
      })

      this.fileHandle = fileHandle
      await this.loadFromFile()
      return true
    } catch (error) {
      console.error("Error opening file:", error)
      return false
    }
  }

  // Load data from file
  async loadFromFile(): Promise<StorageData> {
    try {
      if (!this.fileHandle) {
        throw new Error("No file handle available")
      }

      const file = await this.fileHandle.getFile()
      const text = await file.text()
      const parsedData = JSON.parse(text)

      // Validate and merge with default structure
      this.data = {
        tasks: parsedData.tasks || [],
        theme: parsedData.theme || "dark",
        language: parsedData.language || "id",
        settings: {
          darkMode: parsedData.settings?.darkMode ?? true,
          lastUpdated: parsedData.settings?.lastUpdated || new Date().toISOString(),
        },
      }

      return this.data
    } catch (error) {
      console.error("Error loading from file:", error)
      return this.data
    }
  }

  // Save data to file
  async saveToFile(): Promise<boolean> {
    try {
      if (!this.fileHandle) {
        throw new Error("No file handle available")
      }

      this.data.settings.lastUpdated = new Date().toISOString()

      const writable = await this.fileHandle.createWritable()
      await writable.write(JSON.stringify(this.data, null, 2))
      await writable.close()

      return true
    } catch (error) {
      console.error("Error saving to file:", error)
      // Fallback to localStorage
      this.saveToLocalStorage()
      return false
    }
  }

  // Update specific data and auto-save
  async updateData(updates: Partial<StorageData>): Promise<boolean> {
    this.data = { ...this.data, ...updates }

    if (this.fileHandle && this.isSupported()) {
      return await this.saveToFile()
    } else {
      this.saveToLocalStorage()
      return true
    }
  }

  // Get current data
  getData(): StorageData {
    return this.data
  }

  // Check if file is connected
  isFileConnected(): boolean {
    return this.fileHandle !== null
  }

  // Get file name
  getFileName(): string {
    return this.fileHandle?.name || "No file connected"
  }

  // Fallback to localStorage for unsupported browsers
  saveToLocalStorage(): void {
    try {
      localStorage.setItem("tasko-data", JSON.stringify(this.data))
      console.log("Data saved to localStorage successfully")
    } catch (error) {
      console.error("Error saving to localStorage:", error)
    }
  }

  loadFromLocalStorage(): StorageData {
    try {
      const stored = localStorage.getItem("tasko-data")
      if (stored) {
        const parsedData = JSON.parse(stored)
        this.data = {
          tasks: parsedData.tasks || [],
          theme: parsedData.theme || "dark",
          language: parsedData.language || "id",
          settings: {
            darkMode: parsedData.settings?.darkMode ?? true,
            lastUpdated: parsedData.settings?.lastUpdated || new Date().toISOString(),
          },
        }
        console.log("Data loaded from localStorage successfully")
      }
    } catch (error) {
      console.error("Error loading from localStorage:", error)
    }
    return this.data
  }

  // Generate unique filename with detailed timestamp
  private generateUniqueFilename(): string {
    const now = new Date()

    // Get date components
    const year = now.getFullYear()
    const month = String(now.getMonth() + 1).padStart(2, "0")
    const day = String(now.getDate()).padStart(2, "0")

    // Get time components
    const hours = String(now.getHours()).padStart(2, "0")
    const minutes = String(now.getMinutes()).padStart(2, "0")
    const seconds = String(now.getSeconds()).padStart(2, "0")
    const milliseconds = String(now.getMilliseconds()).padStart(3, "0")

    // Create filename: tasko-backup-2025-06-11-14-30-25-123.json
    return `tasko-backup-${month}-${day}-${year} ${hours}:${minutes}:${seconds}:${milliseconds}.json`
  }

  // Export data for download with unique filename
  exportData(): void {
    const dataStr = JSON.stringify(this.data, null, 2)
    const dataBlob = new Blob([dataStr], { type: "application/json" })
    const url = URL.createObjectURL(dataBlob)

    const link = document.createElement("a")
    link.href = url
    link.download = this.generateUniqueFilename()
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  // Import data from uploaded file with better error handling
  async importData(file: File): Promise<{ success: boolean; error?: string }> {
    try {
      console.log("Starting import process for file:", file.name)

      // Validate file type
      if (!file.name.endsWith(".json") && file.type !== "application/json") {
        throw new Error("File harus berupa file JSON (.json)")
      }

      // Read file content
      const text = await file.text()
      console.log("File content read successfully, length:", text.length)

      if (!text.trim()) {
        throw new Error("File kosong atau tidak valid")
      }

      // Parse JSON
      let parsedData: any
      try {
        parsedData = JSON.parse(text)
        console.log("JSON parsed successfully:", parsedData)
      } catch (parseError) {
        console.error("JSON parse error:", parseError)
        throw new Error("Format JSON tidak valid")
      }

      // Validate data structure
      if (typeof parsedData !== "object" || parsedData === null) {
        throw new Error("Data tidak valid: harus berupa object")
      }

      // Create new data with validation
      const newData: StorageData = {
        tasks: Array.isArray(parsedData.tasks) ? parsedData.tasks : [],
        theme: typeof parsedData.theme === "string" ? parsedData.theme : "dark",
        language: typeof parsedData.language === "string" ? parsedData.language : "id",
        settings: {
          darkMode: typeof parsedData.settings?.darkMode === "boolean" ? parsedData.settings.darkMode : true,
          lastUpdated: new Date().toISOString(),
        },
      }

      console.log("New data structure created:", newData)

      // Update internal data
      this.data = newData

      // Save data
      let saveSuccess = false
      if (this.fileHandle && this.isSupported()) {
        console.log("Attempting to save to file...")
        saveSuccess = await this.saveToFile()
      } else {
        console.log("Saving to localStorage...")
        this.saveToLocalStorage()
        saveSuccess = true
      }

      if (saveSuccess) {
        console.log("Import completed successfully")
        return { success: true }
      } else {
        throw new Error("Gagal menyimpan data setelah import")
      }
    } catch (error) {
      console.error("Import error:", error)
      const errorMessage = error instanceof Error ? error.message : "Error tidak diketahui saat import"
      return { success: false, error: errorMessage }
    }
  }
}
