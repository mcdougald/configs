'use client'

import { useCallback, useEffect, useState } from 'react'

/**
 *
 * @param key
 */
function getItemFromLocalStorage(key: string) {
  const item = globalThis?.localStorage.getItem(key)
  if (item) return JSON.parse(item)

  return null
}

/**
 *
 * @param key
 * @param initialValue
 */
export function useLocalStorage<T>(key: string, initialValue: T): [T, React.Dispatch<React.SetStateAction<T>>] {
  const [storedValue, setStoredValue] = useState(initialValue)

  useEffect(() => {
    // initialize
    if (globalThis.window !== undefined) {
      const stored = getItemFromLocalStorage(key)
      if (stored !== null) setStoredValue(stored)
    }
  }, [key])

  const setValue: React.Dispatch<React.SetStateAction<T>> = useCallback(
    (value) => {
      if (typeof value === 'function') {
        setStoredValue((prev: T) => {
          const newValue = value(prev)
          // Save to localStorage
          globalThis.localStorage.setItem(key, JSON.stringify(newValue))
          return newValue
        })
      } else {
        setStoredValue(value)
        // Save to localStorage
        globalThis.localStorage.setItem(key, JSON.stringify(value))
      }
      return setStoredValue
    },
    [key, setStoredValue]
  )

  return [storedValue, setValue]
}
