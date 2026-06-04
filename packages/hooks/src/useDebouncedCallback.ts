import { useCallback, useEffect, useRef } from 'react'

import { useEvent } from './useEvent'

/**
 *
 * @param handler
 * @param delay
 */
export function useDebouncedCallback<TArgs extends unknown[]>(
  handler: (...args: TArgs) => void,
  delay: number
): (...args: TArgs) => void {
  const latestHandler = useEvent(handler)
  const timeoutRef = useRef<null | ReturnType<typeof setTimeout>>(null)

  const clear = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
      timeoutRef.current = null
    }
  }, [])

  useEffect(() => clear, [clear])

  return useCallback(
    (...args: TArgs) => {
      clear()
      timeoutRef.current = setTimeout(() => {
        latestHandler(...args)
      }, delay)
    },
    [clear, delay, latestHandler]
  )
}
