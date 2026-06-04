'use client'
import { useEffect, useState } from 'react'

export { useMediaQuery } from 'react-responsive'
/**
 * Detects the current device class from the viewport width.
 * @returns {'desktop' | 'mobile' | 'tablet' | null} The device class, or `null` when running outside a browser (SSR).
 */
function getDevice(): 'desktop' | 'mobile' | 'tablet' | null {
  if (typeof window === 'undefined') return null

  if (globalThis.matchMedia('(max-width: 640px)').matches) return 'mobile'
  if (globalThis.matchMedia('(min-width: 641px) and (max-width: 1024px)').matches) return 'tablet'
  return 'desktop'
}

/**
 * Reads the current viewport dimensions.
 * @returns {{ height: number; width: number } | null} The viewport width and height, or `null` when running outside a browser (SSR).
 */
function getDimensions() {
  if (typeof window === 'undefined') return null

  return { width: window.innerWidth, height: window.innerHeight }
}

/**
 * Place to use Media Query for Responsive design.
 * @returns {{ device: 'desktop' | 'mobile' | 'tablet' | null; width: number | undefined; height: number | undefined; isMobile: boolean; isTablet: boolean; isDesktop: boolean }} The current device class, viewport dimensions, and convenience boolean flags.
 */
export function useDeviceMediaQuery() {
  // eslint-disable-next-line @eslint-react/use-state -- intentional: lazily seed state from the browser viewport so SSR renders match the first client read
  const [device, setDevice] = useState<'desktop' | 'mobile' | 'tablet' | null>(getDevice())
  // eslint-disable-next-line @eslint-react/use-state -- intentional: lazily seed state from the browser viewport so SSR renders match the first client read
  const [dimensions, setDimensions] = useState<null | {
    height: number
    width: number
  }>(getDimensions())

  useEffect(() => {
    const checkDevice = () => {
      // eslint-disable-next-line @eslint-react/set-state-in-effect -- intentional: resize handler must sync device/dimensions state from the browser
      setDevice(getDevice())
      // eslint-disable-next-line @eslint-react/set-state-in-effect -- intentional: resize handler must sync device/dimensions state from the browser
      setDimensions(getDimensions())
    }

    // Initial detection
    // eslint-disable-next-line react-you-might-not-need-an-effect/no-external-store-subscription, react-you-might-not-need-an-effect/no-initialize-state -- intentional: subscribe to window resize and read initial viewport after mount (SSR-safe)
    checkDevice()

    // Listener for windows resize
    window.addEventListener('resize', checkDevice)

    // Cleanup listener
    return () => {
      window.removeEventListener('resize', checkDevice)
    }
  }, [])

  return {
    device,
    width: dimensions?.width,
    height: dimensions?.height,
    isMobile: device === 'mobile',
    isTablet: device === 'tablet',
    isDesktop: device === 'desktop'
  }
}

/**
 * React hook that tracks whether a CSS media query currently matches.
 * @param {string} query - The media query string to evaluate (e.g. `'(max-width: 640px)'`).
 * @returns {boolean} `true` while the media query matches.
 */
export function useMediaQueryString(query: string) {
  const [value, setValue] = useState(false)

  useEffect(() => {
    /**
     * Updates the matched state when the media query result changes.
     * @param {MediaQueryListEvent} event - The change event emitted by the MediaQueryList.
     * @returns {void}
     */
    function onChange(event: MediaQueryListEvent) {
      setValue(event.matches)
    }

    const result = matchMedia(query)
    result.addEventListener('change', onChange)
    // eslint-disable-next-line react-hooks/set-state-in-effect, react-you-might-not-need-an-effect/no-adjust-state-on-prop-change, react-you-might-not-need-an-effect/no-external-store-subscription, @eslint-react/set-state-in-effect -- intentional: subscribe to matchMedia and read its initial match value after mount
    setValue(result.matches)

    return () => {
      result.removeEventListener('change', onChange)
    }
  }, [query])

  return value
}
