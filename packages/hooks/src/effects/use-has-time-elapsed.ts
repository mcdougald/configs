import { useCallback, useEffect, useState } from 'react';

import { useTimeout2 } from './use-timeout';

/** Returns true once a given amount of time has elapsed since the returned callback has been run */
export function useHasTimeElapsed(
	time: number,
	onTimeElapse?: () => void,
): [boolean, () => void, () => void] {
	const [hasTimeElapsed, setHasTimeElapsed] = useState(false);
	const onTimeout = useCallback(() => {
		setHasTimeElapsed(true);
		onTimeElapse?.();
	}, []);
	const { set } = useTimeout2(onTimeout, time);
	const begin = useCallback(() => set(), []);
	const reset = useCallback(() => setHasTimeElapsed(false), []);

	return [hasTimeElapsed, begin, reset];
}

/** Returns true once a given amount of time has elapsed since the component mounted */
export function useHasTimeElapsedSinceMount(
	time: number,
	onTimeElapse?: () => void,
) {
	const [hasTimeElapsed, begin] = useHasTimeElapsed(time, onTimeElapse);
	useEffect(() => {
		begin();
	}, []);

	return hasTimeElapsed;
}
