import { debounce } from 'lodash-es'
import { useMemo, useState } from 'react'
import useResizeObserver from 'use-resize-observer'

type ObservedSize = {
  height: number | undefined
  width: number | undefined
}
type HookResponse = {
  ref: (instance: Element | null) => void
}

/**
 * Observes an element's size with a debounced callback.
 *
 * https://codesandbox.io/s/scrollable-virtualized-list-with-dynamic-row-height-213sl6?file=/src/App.tsx
 * @param {number} wait - Debounce wait time in milliseconds
 * @returns {HookResponse & ObservedSize} A callback ref plus the observed width and height
 */
const useDebouncedResizeObserver = (wait = 100): HookResponse & ObservedSize => {
  const [size, setSize] = useState<ObservedSize>({
    height: undefined,
    width: undefined
  })
  const onResize = useMemo(() => debounce(setSize, wait, { leading: true }), [wait])
  const { ref } = useResizeObserver({ onResize })

  return { ref, ...size }
}

export default useDebouncedResizeObserver
