import { useEffect, useState } from 'react'

type ConnectionType = 'bluetooth' | 'cellular' | 'ethernet' | 'mixed' | 'none' | 'other' | 'unknown' | 'wifi' | 'wimax'

// http://wicg.github.io/netinfo/#effectiveconnectiontype-enum
type EffectiveConnectionType = '2g' | '3g' | '4g' | 'slow-2g'

// http://wicg.github.io/netinfo/#networkinformation-interface
interface NetworkInformation extends EventTarget {
  // http://wicg.github.io/netinfo/#downlink-attribute (megabits)
  readonly downlink?: number
  // http://wicg.github.io/netinfo/#downlinkmax-attribute (megabits)
  readonly downlinkMax?: number
  // http://wicg.github.io/netinfo/#effectivetype-attribute
  readonly effectiveType?: EffectiveConnectionType
  // http://wicg.github.io/netinfo/#handling-changes-to-the-underlying-connection
  onchange?: EventListener
  // http://wicg.github.io/netinfo/#rtt-attribute (milliseconds)
  readonly rtt?: number
  // http://wicg.github.io/netinfo/#savedata-attribute
  readonly saveData?: boolean
  // http://wicg.github.io/netinfo/#type-attribute
  readonly type?: ConnectionType
}

interface NetworkState {
  downlink?: number
  downlinkMax?: number
  effectiveType?: EffectiveConnectionType
  online: boolean
  rtt?: number
  saveData?: boolean
  since?: Date
  type?: ConnectionType
}

const getNetworkConnection = (): NetworkInformation | undefined => {
  // `navigator.connection` is part of the Network Information API but is not in the standard DOM lib types.
  const nav = navigator as Navigator & { connection?: NetworkInformation }
  return nav.connection ?? undefined
}

const getNetworkConnectionInfo = (): Pick<
  NetworkInformation,
  'downlink' | 'downlinkMax' | 'effectiveType' | 'rtt' | 'saveData' | 'type'
> => {
  const connection: NetworkInformation | undefined = getNetworkConnection()

  return {
    rtt: connection?.rtt,
    type: connection?.type,
    saveData: connection?.saveData,
    downlink: connection?.downlink,
    downlinkMax: connection?.downlinkMax,
    effectiveType: connection?.effectiveType
  }
}

export const useNetwork = (): NetworkState => {
  const [state, setState] = useState<NetworkState>(() => {
    return {
      since: undefined,
      online: navigator.onLine,
      ...getNetworkConnectionInfo()
    }
  })

  useEffect(() => {
    const handleOnline = (): void => {
      setState((previousState) => ({
        ...previousState,
        online: true,
        since: new Date()
      }))
    }

    const handleOffline = (): void => {
      setState((previousState) => ({
        ...previousState,
        online: false,
        since: new Date()
      }))
    }

    const handleConnectionChange = (): void => {
      setState((previousState) => ({
        ...previousState,
        ...getNetworkConnectionInfo()
      }))
    }

    globalThis.addEventListener('online', handleOnline)
    globalThis.addEventListener('offline', handleOffline)

    const connection = getNetworkConnection()

    connection?.addEventListener('change', handleConnectionChange)

    return () => {
      globalThis.removeEventListener('online', handleOnline)
      globalThis.removeEventListener('offline', handleOffline)

      connection?.removeEventListener('change', handleConnectionChange)
    }
  }, [])

  return state
}
