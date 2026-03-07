import { useCallback, useEffect, useMemo, useState } from 'react'
import { type FileError, type FileRejection, useDropzone } from 'react-dropzone'
import { storage } from '@/db/firebase'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'

interface FileWithPreview extends File {
  preview?: string
  errors: readonly FileError[]
  downloadURL?: string
}

type UseFirebaseUploadOptions = {
  /**
   * Folder to upload files to in Firebase Storage.
   *
   * Defaults to uploading files to the root of the bucket
   *
   * e.g If specified path is `product_images`, your file will be uploaded as `product_images/file_name`
   */
  path?: string
  /**
   * Allowed MIME types for each file upload (e.g `image/png`, `text/html`, etc). Wildcards are also supported (e.g `image/*`).
   *
   * Defaults to allowing uploading of all MIME types.
   */
  allowedMimeTypes?: string[]
  /**
   * Maximum upload size of each file allowed in bytes. (e.g 1000 bytes = 1 KB)
   */
  maxFileSize?: number
  /**
   * Maximum number of files allowed per upload.
   */
  maxFiles?: number
}

type UseFirebaseUploadReturn = ReturnType<typeof useFirebaseUpload>

const useFirebaseUpload = (options: UseFirebaseUploadOptions) => {
  const {
    path = '',
    allowedMimeTypes = [],
    maxFileSize = Number.POSITIVE_INFINITY,
    maxFiles = 1,
  } = options

  const [files, setFiles] = useState<FileWithPreview[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [errors, setErrors] = useState<{ name: string; message: string }[]>([])
  const [successes, setSuccesses] = useState<string[]>([])

  const isSuccess = useMemo(() => {
    if (errors.length === 0 && successes.length === 0) {
      return false
    }
    if (errors.length === 0 && successes.length === files.length) {
      return true
    }
    return false
  }, [errors.length, successes.length, files.length])

  const onDrop = useCallback(
    (acceptedFiles: File[], fileRejections: FileRejection[]) => {
      const validFiles = acceptedFiles
        .filter((file) => !files.find((x: FileWithPreview) => x.name === file.name))
        .map((file) => {
          ;(file as FileWithPreview).preview = URL.createObjectURL(file)
          ;(file as FileWithPreview).errors = []
          return file as FileWithPreview
        })

      const invalidFiles = fileRejections.map(({ file, errors }) => {
        ;(file as FileWithPreview).preview = URL.createObjectURL(file)
        ;(file as FileWithPreview).errors = errors
        return file as FileWithPreview
      })

      const newFiles = [...files, ...validFiles, ...invalidFiles]

      setFiles(newFiles)
    },
    [files, setFiles]
  )

  const dropzoneProps = useDropzone({
    onDrop,
    noClick: true,
    accept: allowedMimeTypes.reduce((acc, type) => ({ ...acc, [type]: [] }), {}),
    maxSize: maxFileSize,
    maxFiles: maxFiles,
    multiple: maxFiles !== 1,
  })

  const onUpload = useCallback(async () => {
    setLoading(true)

    // Upload files that haven't been successfully uploaded yet
    const filesWithErrors = errors.map((x: any) => x.name)
    const filesToUpload =
      filesWithErrors.length > 0
        ? [
            ...files.filter((f: FileWithPreview) => filesWithErrors.includes(f.name)),
            ...files.filter((f: FileWithPreview) => !successes.includes(f.name)),
          ]
        : files

    const responses = await Promise.all(
      filesToUpload.map(async (file: FileWithPreview) => {
        try {
          const fileExt = file.name.split('.').pop()
          const fileName = `${Math.random().toString(36).substring(2)}_${Date.now()}.${fileExt}`
          const filePath = path ? `${path}/${fileName}` : fileName

          const storageRef = ref(storage, filePath)
          await uploadBytes(storageRef, file)

          const downloadURL = await getDownloadURL(storageRef)

          // Store download URL in file object for retrieval
          ;(file as FileWithPreview).downloadURL = downloadURL

          return { name: file.name, message: undefined, downloadURL }
        } catch (error: any) {
          return { name: file.name, message: error.message || 'Upload failed' }
        }
      })
    )

    const responseErrors = responses.filter((x: any) => x.message !== undefined)
    setErrors(responseErrors)

    const responseSuccesses = responses.filter((x: any) => x.message === undefined)
    const newSuccesses = Array.from(
      new Set([...successes, ...responseSuccesses.map((x: any) => x.name)])
    )
    setSuccesses(newSuccesses)

    setLoading(false)
  }, [files, path, errors, successes])

  useEffect(() => {
    if (files.length === 0) {
      setErrors([])
    }

    // If the number of files doesn't exceed the maxFiles parameter, remove the error 'Too many files' from each file
    if (files.length <= maxFiles) {
      let changed = false
      const newFiles = files.map((file: FileWithPreview) => {
        if (file.errors.some((e: FileError) => e.code === 'too-many-files')) {
          file.errors = file.errors.filter((e: FileError) => e.code !== 'too-many-files')
          changed = true
        }
        return file
      })
      if (changed) {
        setFiles(newFiles)
      }
    }
  }, [files.length, setFiles, maxFiles])

  return {
    files,
    setFiles,
    successes,
    isSuccess,
    loading,
    errors,
    setErrors,
    onUpload,
    maxFileSize: maxFileSize,
    maxFiles: maxFiles,
    allowedMimeTypes,
    ...dropzoneProps,
  }
}

export { useFirebaseUpload, type UseFirebaseUploadOptions, type UseFirebaseUploadReturn }
