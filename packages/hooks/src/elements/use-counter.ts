import { useEffect, useRef } from 'react'

/**
 * Counts how many times the calling component has rendered.
 * @returns {number} The current render count, starting at 1 on the first render
 */
export const useCounter = () => {
  const countRef = useRef(0)
  // eslint-disable-next-line react-hooks/refs, @eslint-react/refs -- intentional: render-count hook intentionally reads the mutable ref during render to derive the current count
  let currentCount = countRef.current
  useEffect(() => {
    countRef.current = currentCount
  })
  // eslint-disable-next-line react-hooks/immutability -- intentional: local copy is incremented to produce the value returned for this render
  currentCount += 1
  return currentCount
}
