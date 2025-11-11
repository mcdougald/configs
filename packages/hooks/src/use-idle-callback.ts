import { useCallback, useEffect, useRef, useState } from 'react';

type RequestIdleCallbackOptions = {
	timeout: number;
};

type RequestIdleCallbackDeadline = {
	readonly didTimeout: boolean;
	timeRemaining: () => number;
};
type RequestIdleCallbackHandle = number;

/**
 * https://ericlambrecht.github.io/react-timing-hooks/idle-callback-api/useIdleCallback.html
 * @param callback The callback that is invoked as soon as the browser invokes the idle callback
 * @param options Options for requestIdleCallback
 */
const useIdleCallback = <T extends (...args: never[]) => unknown>(
	callback: T,
	options?: RequestIdleCallbackOptions,
): ((...args: Parameters<T>) => void) => {
	if (!window.requestIdleCallback) {
		console.warn('This browser does not support "requestIdleCallback"');
		return callback;
	}

	// eslint-disable-next-line react-hooks/rules-of-hooks
	const ricCallback = useRef<T>(callback);
	// eslint-disable-next-line react-hooks/rules-of-hooks
	const [handle, setHandle] = useState<RequestIdleCallbackHandle | null>(null);

	// eslint-disable-next-line react-hooks/rules-of-hooks
	useEffect(() => {
		ricCallback.current = callback;
	}, [callback]);

	// eslint-disable-next-line react-hooks/rules-of-hooks
	useEffect(() => {
		return () => {
			if (handle) {
				window.cancelIdleCallback(handle);
			}
		};
	}, [handle]);

	// eslint-disable-next-line react-hooks/rules-of-hooks
	return useCallback<(...args: Parameters<T>) => void>(
		(...args: Parameters<T>) => {
			const h = window.requestIdleCallback(
				() => ricCallback.current(...args),
				options,
			);
			setHandle(h);
		},
		[options],
	);
};

export { useIdleCallback };
export type {
	RequestIdleCallbackHandle,
	RequestIdleCallbackOptions,
	RequestIdleCallbackDeadline,
};
