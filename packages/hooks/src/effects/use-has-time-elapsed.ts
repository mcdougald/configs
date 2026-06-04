import { useCallback, useEffect, useState } from 'react'

import { useTimeout2 } from './use-timeout'

/**
 * Returns true once a given amount of time has elapsed since the returned callback has been run.
 * @param {number} time - The amount of time, in milliseconds, to wait before considering the time elapsed.
 * @param {() => void} [onTimeElapse] - Optional callback invoked once the time has elapsed.
 * @returns {[boolean, () => void, () => void]} A tuple of the elapsed flag, a `begin` function that starts the timer, and a `reset` function that resets the elapsed flag.
 */
export function useHasTimeElapsed(time: number, onTimeElapse?: () => void): [boolean, () => void, () => void] {
  const [hasTimeElapsed, setHasTimeElapsed] = useState(false)
  const onTimeout = useCallback(() => {
    setHasTimeElapsed(true)
    onTimeElapse?.()
    // eslint-disable-next-line react-hooks/exhaustive-deps, @eslint-react/exhaustive-deps -- intentional: stable callback; onTimeElapse intentionally not tracked to keep identity stable
  }, [])
  const { set } = useTimeout2(onTimeout, time)
  // eslint-disable-next-line react-hooks/exhaustive-deps, @eslint-react/exhaustive-deps -- intentional: stable callback; `set` from useTimeout2 intentionally not tracked
  const begin = useCallback(() => set(), [])
  const reset = useCallback(() => {
    setHasTimeElapsed(false)
  }, [])

  return [hasTimeElapsed, begin, reset]
}

/**
 * Returns true once a given amount of time has elapsed since the component mounted.
 * @param {number} time - The amount of time, in milliseconds, to wait before considering the time elapsed.
 * @param {() => void} [onTimeElapse] - Optional callback invoked once the time has elapsed.
 * @returns {boolean} Whether the time has elapsed since mount.
 */
export function useHasTimeElapsedSinceMount(time: number, onTimeElapse?: () => void) {
  const [hasTimeElapsed, begin] = useHasTimeElapsed(time, onTimeElapse)
  useEffect(() => {
    begin()
    // eslint-disable-next-line react-hooks/exhaustive-deps, @eslint-react/exhaustive-deps -- intentional: run once on mount only
  }, [])

  return hasTimeElapsed
}
