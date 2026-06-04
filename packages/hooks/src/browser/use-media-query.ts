'use client'
import { useEffect, useState } from 'react'

export { useMediaQuery } from 'react-responsive'
/**
 *
 */
function getDevice(): 'desktop' | 'mobile' | 'tablet' | null {
  if (globalThis.window === undefined) return null

  return globalThis.matchMedia('(max-width: 640px)').matches
    ? 'mobile'
    : globalThis.matchMedia('(min-width: 641px) and (max-width: 1024px)').matches
      ? 'tablet'
      : 'desktop'
}

/**
 *
 */
function getDimensions() {
  if (globalThis.window === undefined) return null

  return { width: window.innerWidth, height: window.innerHeight }
}

/**
 * Place to use Media Query for Responsive design
 */
export function useDeviceMediaQuery() {
  const [device, setDevice] = useState<'desktop' | 'mobile' | 'tablet' | null>(getDevice())
  const [dimensions, setDimensions] = useState<null | {
    height: number
    width: number
  }>(getDimensions())

  useEffect(() => {
    const checkDevice = () => {
      setDevice(getDevice())
      setDimensions(getDimensions())
    }

    // Initial detection
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
 *
 * @param query
 */
export function useMediaQueryString(query: string) {
  const [value, setValue] = useState(false)

  useEffect(() => {
    /**
     *
     * @param event
     */
    function onChange(event: MediaQueryListEvent) {
      setValue(event.matches)
    }

    const result = matchMedia(query)
    result.addEventListener('change', onChange)
    setValue(result.matches)

    return () => {
      result.removeEventListener('change', onChange)
    }
  }, [query])

  return value
}
