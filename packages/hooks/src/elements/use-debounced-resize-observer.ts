import { debounce } from 'lodash-es';
import { useMemo, useState } from 'react';

import useResizeObserver from 'use-resize-observer';

type ObservedSize = {
	width: number | undefined;
	height: number | undefined;
};
type HookResponse = {
	ref: (instance: Element | null) => void;
};

/**
 * https://codesandbox.io/s/scrollable-virtualized-list-with-dynamic-row-height-213sl6?file=/src/App.tsx
 * @param wait
 */
export default (wait = 100): HookResponse & ObservedSize => {
	const [size, setSize] = useState<ObservedSize>({
		height: undefined,
		width: undefined,
	});
	const onResize = useMemo(
		() => debounce(setSize, wait, { leading: true }),
		[wait],
	);
	const { ref } = useResizeObserver({ onResize });

	return { ref, ...size };
};
