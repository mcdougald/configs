type GtagEventArgs = [event: 'event', action: string, params?: Record<string, unknown>]

declare global {
  interface Window {
    gtag?: (...args: ['config' | 'event' | 'set', ...unknown[]]) => void
  }
}

export const gtagEvent = (...args: GtagEventArgs) => {
  if (globalThis.window === undefined || typeof globalThis.gtag !== 'function') {
    return
  }

  globalThis.gtag(...args)
}
