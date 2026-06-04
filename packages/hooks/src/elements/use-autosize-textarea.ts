import { type DependencyList, type RefObject, useLayoutEffect, useRef } from 'react'

interface UseAutosizeTextAreaProps {
  borderWidth?: number
  dependencies: DependencyList
  maxHeight?: number
  ref: RefObject<HTMLTextAreaElement | null>
}

/**
 * Auto-resizes a textarea to fit its content, clamped between its original
 * height and an optional maximum height.
 * @param {UseAutosizeTextAreaProps} root0 - Hook options
 * @param {RefObject<HTMLTextAreaElement | null>} root0.ref - Ref to the textarea element to resize
 * @param {number} [root0.maxHeight] - Maximum height in pixels the textarea may grow to
 * @param {number} [root0.borderWidth] - Border width in pixels, accounted for when sizing
 * @param {DependencyList} root0.dependencies - Values that trigger a re-measure when changed
 * @returns {void} Nothing; the hook mutates the textarea height as a side effect
 */
export function useAutosizeTextArea({
  ref,
  maxHeight = Number.MAX_SAFE_INTEGER,
  borderWidth = 0,
  dependencies
}: UseAutosizeTextAreaProps) {
  const originalHeightRef = useRef<null | number>(null)

  useLayoutEffect(() => {
    if (!ref.current) return

    const currentRef = ref.current
    const borderAdjustment = borderWidth * 2

    originalHeightRef.current ??= currentRef.scrollHeight - borderAdjustment

    currentRef.style.removeProperty('height')
    const scrollHeight = currentRef.scrollHeight

    // Make sure we don't go over maxHeight
    const clampedToMax = Math.min(scrollHeight, maxHeight)
    // Make sure we don't go less than the original height
    const clampedToMin = Math.max(clampedToMax, originalHeightRef.current)

    currentRef.style.height = `${clampedToMin + borderAdjustment}px`
    // eslint-disable-next-line react-hooks/exhaustive-deps, @eslint-react/exhaustive-deps -- intentional: caller-provided dependency list is spread to trigger re-measure on content updates
  }, [maxHeight, ref, borderWidth, ...dependencies])
}
