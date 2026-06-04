import { useCallback, useRef } from 'react'
import { defaultRangeExtractor, type Range } from 'react-virtual'

/**
 * Range extractor that keeps previously rendered items mounted.
 *
 * https://codesandbox.io/s/react-virtual-performance-list-forked-37ze21?file=/src/index.js:1225-1603
 * Items won't unmount. Not sure if applicable since entire list should be rendered
 * @returns {(range: Range) => number[]} A range extractor that returns the union of every index that has ever been rendered.
 */
export const useKeepMountedRangeExtractor = () => {
  const renderedRef = useRef<Set<number>>(new Set())

  return useCallback((range: Range) => {
    renderedRef.current = new Set([...renderedRef.current, ...defaultRangeExtractor(range)])
    return [...renderedRef.current]
  }, [])
}
