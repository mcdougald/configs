import { useCallback, useEffect, useRef, useState } from 'react'

// How many pixels from the bottom of the container to enable auto-scroll
const ACTIVATION_THRESHOLD = 50
// Minimum pixels of scroll-up movement required to disable auto-scroll
const MIN_SCROLL_UP_THRESHOLD = 10

/**
 * Keeps a scroll container pinned to the bottom as new content arrives, while
 * respecting deliberate upward scrolling by the user.
 * @param {React.DependencyList} dependencies - Values that, when changed, trigger an auto-scroll to the bottom
 * @returns {{ containerRef: React.RefObject<HTMLDivElement | null>, scrollToBottom: () => void, handleScroll: () => void, shouldAutoScroll: boolean, handleTouchStart: () => void }} Container ref and scroll handlers/state
 */
export function useAutoScroll(dependencies: React.DependencyList) {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const previousScrollTopRef = useRef<null | number>(null)
  const [shouldAutoScroll, setShouldAutoScroll] = useState(true)

  const scrollToBottom = useCallback(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight
    }
  }, [])

  const handleScroll = () => {
    if (containerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = containerRef.current

      const distanceFromBottom = Math.abs(scrollHeight - scrollTop - clientHeight)

      const isScrollingUp = previousScrollTopRef.current ? scrollTop < previousScrollTopRef.current : false

      const scrollUpDistance = previousScrollTopRef.current ? previousScrollTopRef.current - scrollTop : 0

      const isDeliberateScrollUp = isScrollingUp && scrollUpDistance > MIN_SCROLL_UP_THRESHOLD

      if (isDeliberateScrollUp) {
        setShouldAutoScroll(false)
      } else {
        const isScrolledToBottom = distanceFromBottom < ACTIVATION_THRESHOLD
        setShouldAutoScroll(isScrolledToBottom)
      }

      previousScrollTopRef.current = scrollTop
    }
  }

  const handleTouchStart = () => {
    setShouldAutoScroll(false)
  }

  useEffect(() => {
    if (containerRef.current) {
      previousScrollTopRef.current = containerRef.current.scrollTop
    }
  }, [])

  useEffect(() => {
    if (shouldAutoScroll) {
      // eslint-disable-next-line react-you-might-not-need-an-effect/no-event-handler -- intentional: re-pins scroll to bottom whenever caller-provided dependencies change
      scrollToBottom()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps, @eslint-react/exhaustive-deps -- intentional: caller-provided dependency list is spread to trigger auto-scroll on content updates
  }, [scrollToBottom, shouldAutoScroll, ...dependencies])

  return {
    containerRef,
    scrollToBottom,
    handleScroll,
    shouldAutoScroll,
    handleTouchStart
  }
}
