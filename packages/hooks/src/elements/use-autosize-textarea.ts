import { type DependencyList, type RefObject, useLayoutEffect, useRef } from 'react'

interface UseAutosizeTextAreaProps {
  borderWidth?: number
  dependencies: DependencyList
  maxHeight?: number
  ref: RefObject<HTMLTextAreaElement | null>
}

/**
 *
 * @param root0
 * @param root0.ref
 * @param root0.maxHeight
 * @param root0.borderWidth
 * @param root0.dependencies
 */
export function useAutosizeTextArea({
  ref,
  maxHeight = Number.MAX_SAFE_INTEGER,
  borderWidth = 0,
  dependencies
}: UseAutosizeTextAreaProps) {
  const originalHeight = useRef<null | number>(null)

  useLayoutEffect(() => {
    if (!ref.current) return

    const currentRef = ref.current
    const borderAdjustment = borderWidth * 2

    if (originalHeight.current === null) {
      originalHeight.current = currentRef.scrollHeight - borderAdjustment
    }

    currentRef.style.removeProperty('height')
    const scrollHeight = currentRef.scrollHeight

    // Make sure we don't go over maxHeight
    const clampedToMax = Math.min(scrollHeight, maxHeight)
    // Make sure we don't go less than the original height
    const clampedToMin = Math.max(clampedToMax, originalHeight.current)

    currentRef.style.height = `${clampedToMin + borderAdjustment}px`
  }, [maxHeight, ref, borderWidth, ...dependencies])
}
