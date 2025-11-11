import { useEffect, useRef } from 'react';

export type UseDebounceFn<T> = (...args: T[]) => void;
export function useDebounceFn<T>(
	debounceFn: UseDebounceFn<T>,
	time = 200,
): UseDebounceFn<T> {
	const timer = useRef<NodeJS.Timeout | undefined>(undefined);
	useEffect(() => () => clearTimeout(timer.current), []);

	return (...args: T[]) => {
		if (timer.current) {
			clearTimeout(timer.current);
		}

		timer.current = setTimeout(() => debounceFn(...args), time);
	};
}
