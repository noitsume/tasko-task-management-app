// Complete type declarations for File System Access API
interface FileSystemHandle {
  readonly kind: "file" | "directory"
  readonly name: string
  isSameEntry(other: FileSystemHandle): Promise<boolean>
  queryPermission(descriptor?: FileSystemHandlePermissionDescriptor): Promise<PermissionState>
  requestPermission(descriptor?: FileSystemHandlePermissionDescriptor): Promise<PermissionState>
}

interface FileSystemFileHandle extends FileSystemHandle {
  readonly kind: "file"
  getFile(): Promise<File>
  createWritable(options?: FileSystemCreateWritableOptions): Promise<FileSystemWritableFileStream>
}

interface FileSystemDirectoryHandle extends FileSystemHandle {
  readonly kind: "directory"
  getFileHandle(name: string, options?: FileSystemGetFileOptions): Promise<FileSystemFileHandle>
  getDirectoryHandle(name: string, options?: FileSystemGetDirectoryOptions): Promise<FileSystemDirectoryHandle>
  removeEntry(name: string, options?: FileSystemRemoveOptions): Promise<void>
  resolve(possibleDescendant: FileSystemHandle): Promise<string[] | null>
  keys(): AsyncIterableIterator<string>
  values(): AsyncIterableIterator<FileSystemHandle>
  entries(): AsyncIterableIterator<[string, FileSystemHandle]>
  [Symbol.asyncIterator](): AsyncIterableIterator<[string, FileSystemHandle]>
}

interface FileSystemWritableFileStream extends WritableStream {
  write(data: FileSystemWriteChunkType): Promise<void>
  seek(position: number): Promise<void>
  truncate(size: number): Promise<void>
  close(): Promise<void>
}

interface FileSystemHandlePermissionDescriptor {
  mode?: "read" | "readwrite"
}

interface FileSystemCreateWritableOptions {
  keepExistingData?: boolean
}

interface FileSystemGetFileOptions {
  create?: boolean
}

interface FileSystemGetDirectoryOptions {
  create?: boolean
}

interface FileSystemRemoveOptions {
  recursive?: boolean
}

type FileSystemWriteChunkType = BufferSource | Blob | string | WriteParams

interface WriteParams {
  type: "write" | "seek" | "truncate"
  data?: BufferSource | Blob | string
  position?: number
  size?: number
}

interface FilePickerAcceptType {
  description?: string
  accept: Record<string, string[]>
}

interface OpenFilePickerOptions {
  types?: FilePickerAcceptType[]
  excludeAcceptAllOption?: boolean
  multiple?: boolean
  id?: string
  startIn?: FileSystemHandle | WellKnownDirectory
}

interface SaveFilePickerOptions {
  suggestedName?: string
  types?: FilePickerAcceptType[]
  excludeAcceptAllOption?: boolean
  id?: string
  startIn?: FileSystemHandle | WellKnownDirectory
}

interface DirectoryPickerOptions {
  id?: string
  mode?: "read" | "readwrite"
  startIn?: FileSystemHandle | WellKnownDirectory
}

type WellKnownDirectory = "desktop" | "documents" | "downloads" | "music" | "pictures" | "videos"

declare global {
  interface Window {
    showOpenFilePicker?: (options?: OpenFilePickerOptions) => Promise<FileSystemFileHandle[]>
    showSaveFilePicker?: (options?: SaveFilePickerOptions) => Promise<FileSystemFileHandle>
    showDirectoryPicker?: (options?: DirectoryPickerOptions) => Promise<FileSystemDirectoryHandle>
  }
}

export {}
