import { useCallback, useRef } from 'react';

import { type Range, defaultRangeExtractor } from 'react-virtual';

/**
 * https://codesandbox.io/s/react-virtual-performance-list-forked-37ze21?file=/src/index.js:1225-1603
 * Items won't unmount. Not sure if applicable since entire list should be rendered
 */
export const useKeepMountedRangeExtractor = () => {
	const renderedRef = useRef<Set<number>>(new Set());

	return useCallback(
		(range: Range) => {
			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
			// @ts-ignore
			renderedRef.current = new Set([
				...renderedRef.current,
				...defaultRangeExtractor(range),
			]);
			return Array.from(renderedRef.current);
		},
		[renderedRef],
	);
};
