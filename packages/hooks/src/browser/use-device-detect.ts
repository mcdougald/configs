'use client'

import { useCallback, useEffect, useState } from 'react'

interface DeviceDetect {
  isMobileUserAgent: boolean
  isMobileViewport: boolean
}

export const useDeviceDetect = (): DeviceDetect => {
  const userAgent = typeof navigator === 'undefined' ? 'SSR' : navigator.userAgent
  const deviceProperties = detectDevice(userAgent)
  const [isMobileViewport, setIsMobileViewport] = useState(false)

  const onWindowSizeChanged = useCallback(() => {
    // eslint-disable-next-line @eslint-react/set-state-in-effect -- intentional: resize handler must sync viewport state from the browser window
    setIsMobileViewport(window.innerWidth < 640)
  }, [])

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- intentional: must read initial window size after mount to detect viewport
    onWindowSizeChanged()
    window.addEventListener('resize', onWindowSizeChanged, true)

    return () => {
      window.removeEventListener('resize', onWindowSizeChanged, true)
    }
  }, [onWindowSizeChanged])

  return {
    isMobileViewport,
    isMobileUserAgent: deviceProperties.isMobile()
  }
}

const detectDevice = (userAgent: string) => {
  const isAndroid = (): boolean => /Android/i.test(userAgent)
  const isIos = (): boolean => /iPhone|iPad|iPod/i.test(userAgent)
  const isOpera = (): boolean => /Opera Mini/i.test(userAgent)
  const isWindows = (): boolean => /IEMobile/i.test(userAgent)
  const isSSR = (): boolean => /SSR/i.test(userAgent)

  const isMobile = (): boolean => isAndroid() || isIos() || isOpera() || isWindows()
  const isDesktop = (): boolean => !isMobile() && !isSSR()
  return {
    isMobile,
    isDesktop,
    isAndroid,
    isIos,
    isSSR
  }
}
