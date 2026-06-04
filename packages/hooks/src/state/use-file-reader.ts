import { useEffect, useState } from 'react'

type ReadAsMethod = 'readAsArrayBuffer' | 'readAsBinaryString' | 'readAsDataURL' | 'readAsText'

type UseFileReaderProps = {
  method: ReadAsMethod
  onLoad?: (result: unknown) => void
}

export const useFileReader = (options: UseFileReaderProps) => {
  const { method, onLoad } = options
  const [file, setFile] = useState<File | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<DOMException | null>(null)
  const [result, setResult] = useState<ArrayBuffer | null | string>(null)

  useEffect(() => {
    if (!file && result) {
      setResult(null)
    }
  }, [file, result])

  useEffect(() => {
    if (!file) {
      return
    }

    const reader = new FileReader()
    reader.addEventListener('loadstart', () => {
      setLoading(true)
    })
    reader.onloadend = () => {
      setLoading(false)
    }
    reader.onerror = () => {
      setError(reader.error)
    }

    reader.addEventListener('load', (e: ProgressEvent<FileReader>) => {
      setResult(e.target?.result ?? null)
      if (onLoad) {
        onLoad(e.target?.result ?? null)
      }
    })
    reader[method](file)
  }, [file, method, onLoad])

  return [{ result, error, file, loading }, setFile] as const
}
