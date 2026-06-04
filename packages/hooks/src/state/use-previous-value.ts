import { useEffect, useRef } from 'react'

/**
 * Returns the value from the previous render, or `undefined` on the first render.
 * @template T
 * @param {T} value - The current value to track.
 * @returns {T | undefined} The value from the previous render.
 */
export function usePreviousValue<T>(value: T): T | undefined {
  const ref = useRef<T | undefined>(undefined)

  useEffect(() => {
    ref.current = value
  }, [value])

  // eslint-disable-next-line react-hooks/refs, @eslint-react/refs -- intentional: returning the previous render's value requires reading ref.current during render in this usePrevious pattern
  return ref.current
}
