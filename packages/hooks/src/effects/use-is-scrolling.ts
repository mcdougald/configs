import { useReducer, useRef } from 'react';
import useIsomorphicLayoutEffect from './use-isomorphic-layout-effect';

const useIsScrolling = (debounce: number) => {
	const rerender = useReducer(() => ({}), {})[1];

	const ref = useRef(false);

	useIsomorphicLayoutEffect(() => {
		let timeout: ReturnType<typeof setTimeout>;

		const cb = () => {
			if (!ref.current) {
				ref.current = true;
				rerender();
			}

			clearTimeout(timeout);

			timeout = setTimeout(() => {
				if (ref.current) {
					ref.current = false;
					rerender();
				}
			}, debounce);
		};

		document.addEventListener('scroll', cb, true);

		return () => {
			clearTimeout(timeout);
			document.removeEventListener('scroll', cb);
		};
	}, [debounce]);

	return ref.current;
};
export default useIsScrolling;
