import { type EffectCallback, useEffect, useLayoutEffect } from 'react'

/**
 * A useEffect which only runs on the cleanup of the last effect
 * @param callback
 */
export function useWillUnmountEffect(callback: ReturnType<EffectCallback>) {
  useEffect(() => callback, [])
}

/**
 * A useLayoutEffect which only runs on the cleanup of the last effect
 * @param callback
 */
export function useWillUnMountLayoutEffect(callback: ReturnType<EffectCallback>) {
  useLayoutEffect(() => callback, [])
}
