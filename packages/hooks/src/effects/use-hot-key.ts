'use client'
import { useEffect } from 'react'

/**
 *
 * @param callback
 * @param key
 */
export function useHotKey(callback: () => void, key: string): void {
  useEffect(() => {
    /**
     *
     * @param e
     */
    function handler(e: KeyboardEvent) {
      if (e.key === key && (e.metaKey || e.ctrlKey)) {
        // e.preventDefault();
        callback()
      }
    }

    globalThis.addEventListener('keydown', handler)
    return () => {
      globalThis.removeEventListener('keydown', handler)
    }
  }, [key])
}
