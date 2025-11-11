import { type MutableRefObject, useEffect, useMemo, useState } from 'react';

const options = {
	root: null,
	rootMargin: '-1600px',
	threshold: 0.25,
};

/**
 * Hook for large page performance - https://codesandbox.io/s/scrollspy-react-vcke3?file=/src/hooks.js
 * @param ref
 */
export function useOnScreen<T extends Element>(
	ref: MutableRefObject<T>,
): boolean {
	// State and setter for storing whether element is visible
	const [isIntersecting, setIntersecting] = useState<boolean>(false);

	const observer = useMemo(
		() =>
			new IntersectionObserver(
				([entry]) => setIntersecting(entry?.isIntersecting ?? false),
				options,
			),
		[ref],
	);

	useEffect(() => {
		observer.observe(ref.current);
		// Remove the observer as soon as the component is unmounted
		return () => {
			observer.disconnect();
		};
	}, []);

	return isIntersecting;
}
