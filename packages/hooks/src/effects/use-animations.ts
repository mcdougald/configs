import { useCallback, useEffect, useRef, useState } from 'react';

export function useAnimations<U extends any[]>(
	animations: { show: () => void; delay: number }[],
	deps: U,
) {
	const [done, setDone] = useState(false);

	useEffect(() => {
		let timer: NodeJS.Timeout | null = null;
		let delayTime = 0;

		for (let i = 0, n = animations.length; i < n; i++) {
			const { show, delay } = animations?.[i] ?? { show: () => {}, delay: 0 };
			timer = setTimeout(() => {
				show();
			}, delayTime + delay);
			delayTime += delay;

			if (i === n) {
				setDone(true);
			}
		}

		return () => {
			if (timer) {
				clearTimeout(timer);
			}
		};
	}, deps);

	return done;
}

export function useAnimationsFn<U extends any[]>(
	animations: { show: () => void; delay: number }[],
	deps: U,
): [() => void, () => void, boolean] {
	const [done, setDone] = useState(false);
	const timer = useRef<NodeJS.Timeout | null>(null);

	const play = useCallback(() => {
		let delayTime = 0;

		for (let i = 0, n = animations.length; i < n; i++) {
			const { show, delay } = animations?.[i] ?? { show: () => {}, delay: 0 };
			timer.current = setTimeout(() => {
				show();
			}, delayTime + delay);
			delayTime += delay;

			if (i === n) {
				setDone(true);
			}
		}
	}, deps);

	const clear = useCallback(() => {
		if (timer.current) {
			clearTimeout(timer.current);
		}
	}, deps);

	return [play, clear, done];
}
