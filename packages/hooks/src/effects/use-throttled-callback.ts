import { useCallback, useEffect, useRef } from 'react';

type ThrottledCallbackOptions = {
	leading?: boolean;
	trailing?: boolean;
};

export default function useThrottledCallback<
	// Conscious Any, we don't know which arguments will fly
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	Fn extends (...args: any[]) => void,
>(
	callback: Fn,
	deps: unknown[],
	ms = 200,
	options: ThrottledCallbackOptions = { leading: true, trailing: true },
): (...args: Parameters<Fn>) => void {
	const timeout = useRef<NodeJS.Timeout>(undefined);
	const nextCallback = useRef<() => void>(undefined);
	const hasNextCallback = useRef<boolean>(false);

	useEffect(() => {
		return function cleanUp() {
			clearTimeout(timeout.current);
		};
	}, []);

	return useCallback((...args) => {
		if (!timeout.current) {
			// Perform at start of timer
			if (options.leading) {
				callback(...args);
			} else {
				nextCallback.current = () => callback(...args);
				hasNextCallback.current = true;
			}

			const timeoutCallback = () => {
				// If there is a trailing, then we perform the last collker caused during the timer
				if (options.trailing && hasNextCallback.current) {
					hasNextCallback.current = false;
					if (nextCallback.current) {
						nextCallback.current();
					}
					timeout.current = setTimeout(timeoutCallback, ms);
				} else {
					timeout.current = undefined;
				}
			};

			timeout.current = setTimeout(timeoutCallback, ms);
		} else {
			nextCallback.current = () => callback(...args);
			hasNextCallback.current = true;
		}

		// Does not know how to determine that the dependencies are sprouted from the ropes
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, deps);
}
