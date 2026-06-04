import { useEffect, useState } from 'react'

const MOBILE_BREAKPOINT = 768

/**
 * React hook that reports whether the current viewport width is below the mobile breakpoint.
 * @returns {boolean} `true` when the viewport width is less than the mobile breakpoint.
 */
export function useIsMobile() {
  const [isMobile, setIsMobile] = useState<boolean | undefined>()

  useEffect(() => {
    const mql = globalThis.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)
    const onChange = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    }
    mql.addEventListener('change', onChange)
    // eslint-disable-next-line react-hooks/set-state-in-effect, react-you-might-not-need-an-effect/no-external-store-subscription, react-you-might-not-need-an-effect/no-initialize-state, @eslint-react/set-state-in-effect -- intentional: subscribe to matchMedia and read initial viewport width after mount (SSR-safe, requires effect)
    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    return () => {
      mql.removeEventListener('change', onChange)
    }
  }, [])

  return !!isMobile
}
