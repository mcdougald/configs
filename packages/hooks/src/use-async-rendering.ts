'use client'
import { useEffect, useState } from 'react'

const useMountTransition = (isMounted: boolean, unmountDelay: number) => {
  const [hasTransitionedIn, setHasTransitionedIn] = useState(false)

  useEffect(() => {
    let timeoutId: NodeJS.Timeout | number | string | undefined

    if (isMounted && !hasTransitionedIn) {
      setHasTransitionedIn(true)
    } else if (!isMounted && hasTransitionedIn) {
      timeoutId = setTimeout(() => {
        setHasTransitionedIn(false)
      }, unmountDelay)
    }

    return () => {
      clearTimeout(timeoutId)
    }
  }, [hasTransitionedIn, isMounted, unmountDelay])

  return hasTransitionedIn
}

export { useMountTransition }
