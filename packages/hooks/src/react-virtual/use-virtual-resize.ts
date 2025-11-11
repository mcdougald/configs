import { useEffect, useMemo, useRef } from 'react';

import { type Options, useVirtual as useVirtualImpl } from 'react-virtual';

type VirtualInstance = ReturnType<typeof useVirtualImpl>;
type ScrollToOptions = Parameters<VirtualInstance['scrollToOffset']>[1];
type ScrollToOffsetOptions = ScrollToOptions;
type ScrollToIndexOptions = ScrollToOptions;

const defaultKeyExtractor = (index: number) => index;

/**
 * This is an alternative to the ItemMeasurer. It dynamically resizes the virtual items
 * https://codesandbox.io/s/dynamic-resize-observer-xsms9?file=/src/index.js
 * @param options
 */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export const useVirtualResize: (options: Options<any>) => {
	totalSize: number;
	scrollToIndex: (index: number, options?: ScrollToIndexOptions) => void;
	measure: () => void;
	scrollToOffset: (index: number, options?: ScrollToOffsetOptions) => void;
	virtualItems: {
		size: number;
		measureRef: any;
		start: number;
		index: number;
		end: number;
		key: number;
	}[];
} = (options: Options<any>) => {
	const measureRefCacheRef = useRef({});
	const elCacheRef = useRef({});

	const rowVirtualizer = useVirtualImpl(options);

	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-ignore
	const {
		size,
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		dataKeyAttribute = 'data-key',
		keyExtractor = defaultKeyExtractor,
	} = options;

	const roRef = useRef(
		new ResizeObserver((entries) => {
			entries.forEach((entry) => {
				const el = entry.target;
				// eslint-disable-next-line @typescript-eslint/ban-ts-comment
				// @ts-ignore
				// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
				const key = el.getAttribute(dataKeyAttribute);

				if (key === null) {
					// eslint-disable-next-line @typescript-eslint/restrict-template-expressions
					throw new Error(
						// eslint-disable-next-line @typescript-eslint/restrict-template-expressions
						`Value not found, for '${dataKeyAttribute}' attribute`,
					);
				}

				// eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/ban-ts-comment
				// @ts-ignore
				// eslint-disable-next-line @typescript-eslint/no-unsafe-call
				measureRefCacheRef.current[key](el);
			});
		}),
	);

	useEffect(() => {
		const ro = roRef.current;
		return () => {
			ro.disconnect();
		};
	}, []);

	const cachedMeasureRefWrappers = useMemo(() => {
		const obj = {};
		for (let i = 0; i < size; i++) {
			const key = keyExtractor(i);

			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
			// @ts-ignore
			obj[key] = (el) => {
				// eslint-disable-next-line @typescript-eslint/ban-ts-comment
				// @ts-ignore
				if (elCacheRef.current[key]) {
					// eslint-disable-next-line @typescript-eslint/ban-ts-comment
					// @ts-ignore
					// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
					roRef.current.unobserve(elCacheRef.current[key]);
				}

				if (el) {
					// sync
					// eslint-disable-next-line @typescript-eslint/ban-ts-comment
					// @ts-ignore
					// eslint-disable-next-line @typescript-eslint/no-unsafe-call
					measureRefCacheRef.current[key](el);
					// observe
					// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
					roRef.current.observe(el);
				}

				// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment,@typescript-eslint/ban-ts-comment
				// @ts-ignore
				// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
				elCacheRef.current[key] = el;
			};
		}
		return obj;
	}, [size, keyExtractor]);

	const virtualItems = rowVirtualizer.virtualItems.map((item) => {
		const key = keyExtractor(item.index);
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		measureRefCacheRef.current[key] = item.measureRef;

		return {
			...item,
			key,
			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
			// @ts-ignore
			// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
			measureRef: cachedMeasureRefWrappers[key],
		};
	});

	return { ...rowVirtualizer, virtualItems };
};
