import type { DependencyList } from 'react'

import { useCallback, useEffect, useRef } from 'react'

/**
 *
 * @param callback
 * @param deps
 */
export default function usePersistCallback<ARG extends unknown[], RET>(
  callback: (...args: ARG) => RET,
  deps?: DependencyList
): (...args: ARG) => RET {
  const callbackRef = useRef(callback)

  useEffect(() => {
    callbackRef.current = callback
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)

  const persistCallback = useCallback((...args: ARG) => callbackRef.current?.(...args), [])

  if (!callback) {
    // @ts-ignore
    return null
  }

  return persistCallback
}
