import { useCallback, useEffect } from 'react';

import { debounce as debounceFn } from 'lodash-es';

/**
 * https://codesandbox.io/s/idle-timer-hooks-ndjji?file=/src/idleTimerHooks.js
 * @returns {{removeListeners: () => void}}
 */
function useOnIdle({
	debounce,
	events,
	onAction,
	onIdle,
	idleTimeout,
	stop,
}: {
	debounce: number;
	events: string[];
	onAction: () => void;
	onIdle: () => void;
	idleTimeout: number;
	stop?: boolean;
}) {
	// const actionCallBack = useCallback(debounceFn(debounce, true, onAction), []);
	const actionCallBack = useCallback(
		debounceFn(onAction, debounce, { leading: true }),
		[],
	);
	// const idleCallBack = useCallback(debounceFn(idleTimeout, false, onIdle), []);
	const idleCallBack = useCallback(
		debounceFn(onIdle, idleTimeout, {
			leading: true,
		}),
		[],
	);

	const removeListeners = useCallback(() => {
		events.forEach((event: any) => {
			document.removeEventListener(event, actionCallBack);
			document.removeEventListener(event, idleCallBack);
		});
	}, [events, actionCallBack, idleCallBack]);

	useEffect(() => {
		if (!stop) {
			events.forEach((event: any) => {
				document.addEventListener(event, actionCallBack);
				document.addEventListener(event, idleCallBack);
			});
		}
		return removeListeners;
	}, [actionCallBack, events, idleCallBack, removeListeners, stop]);

	return { removeListeners };
}
export { useOnIdle };
