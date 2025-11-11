import { useCallback, useEffect, useRef } from 'react';

import {
	type Range,
	type Options as VirtualOptions,
	useVirtual,
} from 'react-virtual';

interface BufferedRange {
	start: number;
	end: number;
}

const extractBufferendRange = (
	{ start, end, overscan, size }: Range,
	current: BufferedRange,
): Array<number> => {
	const rangeStart =
		start - current.start > overscan * 4 || start - current.start < overscan
			? Math.max(0, start - overscan * 2)
			: current.start;

	const rangeEnd =
		current.end - end > overscan * 4 || current.end - end < overscan
			? Math.min(size, 1 + end + overscan * 2)
			: 1 + current.end;

	return Array.from(
		{ length: rangeEnd - rangeStart },
		(_, i) => rangeStart + i,
	);
};

export const useBufferedVirtual = <T>(
	options: VirtualOptions<T>,
): ReturnType<typeof useVirtual> => {
	const currentRangeRef = useRef<BufferedRange>(undefined);
	const rangeExtractor = useCallback((range: Range) => {
		return extractBufferendRange(
			range,
			currentRangeRef.current ?? { start: range.start, end: range.end },
		);
	}, []);

	const result = useVirtual({
		rangeExtractor,
		...options,
	});

	const virtualItemsStart = result.virtualItems[0]?.index ?? 0;
	const lastVirtualIndex = result.virtualItems.length - 1;
	const virtualItemsEnd =
		result.virtualItems[lastVirtualIndex]?.index ?? lastVirtualIndex;

	useEffect(() => {
		currentRangeRef.current = {
			start: virtualItemsStart,
			end: virtualItemsEnd,
		};
	}, [virtualItemsEnd, virtualItemsStart]);

	return result;
};
