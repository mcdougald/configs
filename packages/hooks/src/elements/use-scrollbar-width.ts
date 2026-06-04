import { useLayoutEffect, useState } from 'react'

// Removed MUI dependency - using native DOM API instead
import { getScrollbarSize } from '../utils/get-scrollbar-size'

/**
 *
 * @param node
 */
export function useScrollbarSize(node: Node | null | undefined): number {
  const [scrollbarSize, setScrollbarSize] = useState(0)

  useLayoutEffect(() => {
    // Get the document from the node, fallback to window.document
    const doc = node?.ownerDocument || (globalThis.window === undefined ? null : globalThis.document)
    if (doc) {
      const nextScrollbarSize = getScrollbarSize(doc)
      if (scrollbarSize !== nextScrollbarSize) {
        setScrollbarSize(nextScrollbarSize)
      }
    }
  })

  return scrollbarSize
}
