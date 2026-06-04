import { useCallback, useEffect, useState } from 'react'

export const useHash = () => {
  const [hash, setHash] = useState(() => globalThis.location.hash)

  const hashChangeHandler = useCallback(() => {
    setHash(globalThis.location.hash)
  }, [])

  useEffect(() => {
    globalThis.addEventListener('hashchange', hashChangeHandler)
    return () => {
      globalThis.removeEventListener('hashchange', hashChangeHandler)
    }
  }, [hashChangeHandler])

  const updateHash = useCallback(
    (newHash: string) => {
      if (newHash !== hash) globalThis.location.hash = newHash
    },
    [hash]
  )

  return [hash, updateHash]
}
