import { type RefObject, useEffect, useState } from 'react';

/*
Examples
const ref = useRef();
const inViewport = useIntersection(ref, '0px'); // Trigger as soon as the element becomes visible
const inViewport = useIntersection(ref, '-200px'); // Trigger if 200px is visible from the element

if (inViewport) {
   console.log('in viewport:', ref.current);
}
 */

// export const useIntersection = (element: MutableRefObject<undefined> | Element, rootMargin: string) => {
//   const [isVisible, setState] = useState(false);
//
//   useEffect(() => {
//     const observer = new IntersectionObserver(
//       ([entry]) => {
//         setState(entry.isIntersecting);
//       },
//       { rootMargin }
//     );
//
//     // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
//     element && observer.observe(<Element>element);
//
//     // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
//     return () => observer.unobserve(<Element>element);
//   }, [element, rootMargin]);
//
//   return isVisible;
// };

/**
 * https://github.com/streamich/react-use/blob/master/docs/useIntersection.md
 * @param ref
 * @param options
 */
export const useIntersection = (
	ref: RefObject<HTMLElement>,
	options: IntersectionObserverInit,
): IntersectionObserverEntry | null => {
	const [intersectionObserverEntry, setIntersectionObserverEntry] =
		useState<IntersectionObserverEntry | null>(null);

	useEffect(() => {
		if (ref.current && typeof IntersectionObserver === 'function') {
			const handler = (entries: IntersectionObserverEntry[]) => {
				setIntersectionObserverEntry(entries?.[0] ?? null);
			};

			const observer = new IntersectionObserver(handler, options);
			observer.observe(ref.current);

			return () => {
				setIntersectionObserverEntry(null);
				observer.disconnect();
			};
		}
		// eslint-disable-next-line @typescript-eslint/no-empty-function
		return () => {};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [ref.current, options.threshold, options.root, options.rootMargin]);

	return intersectionObserverEntry;
};
