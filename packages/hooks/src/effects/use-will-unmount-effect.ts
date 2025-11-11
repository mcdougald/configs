import { EffectCallback, useEffect, useLayoutEffect } from 'react';

/** A useEffect which only runs on the cleanup of the last effect */
export function useWillUnmountEffect(callback: ReturnType<EffectCallback>) {
	return useEffect(() => callback, []);
}

/** A useLayoutEffect which only runs on the cleanup of the last effect */
export function useWillUnMountLayoutEffect(
	callback: ReturnType<EffectCallback>,
) {
	return useLayoutEffect(() => callback, []);
}
