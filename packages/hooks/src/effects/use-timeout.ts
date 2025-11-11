import { useCallback, useEffect, useRef, useState } from 'react';

import { useWillUnmountEffect } from './use-will-unmount-effect';

export interface IUseTimeoutReturn<T = void> {
	/** Set the timeout, optionally give a callback which will override the one set at hook level */
	set: (callback?: () => T, time?: number) => Promise<T>;

	/** Clear the timeout before its time has finished */
	clear: () => void;

	/** Has the timeout been triggered, but not elapsed */
	waiting: boolean;
}

/**
 * set up a timeout which is cleared automatically when the component unmounts
 * @param time the time to pass before the callback is fired
 * @param callback the callback to run after the given time
 */
export function useTimeout2<T = void>(
	callback?: () => T,
	time?: number,
): IUseTimeoutReturn<T> {
	const timeout = useRef<string | number | NodeJS.Timeout | undefined>(
		undefined,
	);

	const [waiting, setWaiting] = useState(false);

	const resolvePromise = useRef<(value: T | PromiseLike<T>) => void>(undefined);

	const clear = useCallback(() => {
		clearTimeout(timeout.current);
		resolvePromise.current?.(undefined as any as T);
		resolvePromise.current = undefined;
	}, []);

	const set = useCallback(
		(overrideCallback?: () => T, overrideTime?: number) => {
			clear();

			return new Promise<T>((resolve) => {
				setWaiting(true);
				resolvePromise.current = resolve;

				timeout.current = setTimeout(() => {
					setWaiting(false);
					const value = (overrideCallback ?? callback)?.();
					resolve(value as T);
				}, overrideTime ?? time);
			});
		},
		[time, callback],
	);

	useWillUnmountEffect(clear);

	return { set, clear, waiting };
}

export function useTimeout(callback: () => void, delay: number | null) {
	const savedCallback = useRef(callback);

	// Remember the latest callback if it changes.
	useEffect(() => {
		savedCallback.current = callback;
	}, [callback]);

	// Set up the timeout.
	useEffect(() => {
		// Don't schedule if no delay is specified.
		if (delay === null) {
			return;
		}

		const id = setTimeout(() => savedCallback.current(), delay);

		return () => clearTimeout(id);
	}, [delay]);
}
