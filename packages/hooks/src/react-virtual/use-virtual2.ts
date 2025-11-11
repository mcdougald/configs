// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// https://github.com/tannerlinsley/react-virtual/discussions/212#discussioncomment-1587478
// https://codesandbox.io/s/usevirtualresizeobserver-04-11-2021-75ye2?file=/src/useVirtual.tsx:0-2829

import { useMemo, useRef, useEffect, RefObject } from 'react';

import { type VirtualItem, useVirtual as useVirtualImpl } from 'react-virtual';

export type ScrollAlignment = 'start' | 'center' | 'end' | 'auto';
export interface ScrollToOptions {
	align: ScrollAlignment;
}
export interface ScrollToOffsetOptions extends ScrollToOptions {}
export interface ScrollToIndexOptions extends ScrollToOptions {}

export type Virtualizer = {
	virtualItems: VirtualItem[];
	totalSize: number;
	scrollToOffset: (index: number, options?: ScrollToOffsetOptions) => void;
	scrollToIndex: (index: number, options?: ScrollToIndexOptions) => void;
	measure: () => void;
};

export type { VirtualItem, ScrollToOptions as ReactVirtualScrollToOptions };

// TODO Options type should be exported from react-virtual to replace this
type ReactVirtualOptions<T> = Parameters<typeof useVirtualImpl>[0] & {
	parentRef: RefObject<T>; // this override is needed because Parameters<> cannot handle generics
	scrollToOffset: (index: number, options?: ScrollToOptions) => void;
	scrollToIndex: (index: number, options?: ScrollToOptions) => void;
};

const defaultKeyExtractor = (index: number) => index;

type Options<T> = ReactVirtualOptions<T> & {
	updateSize?: boolean; // when list is hidden by display none, by setting updateSize={false} we can skip RO callbacks
};

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export const useVirtual2 = <T extends HTMLElement>({
	updateSize = true,
	...options
}: // eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
Options<T>): Virtualizer => {
	const measureRefCacheRef = useRef<
		Record<string, (el: HTMLElement | null) => void>
	>({});
	const elCacheRef = useRef<Record<string, Element | null>>({});

	const update = (key: number | string, el: HTMLElement) => {
		if (updateSize) {
			measureRefCacheRef?.current?.[key]?.(el);
		}
	};
	const updateRef = useRef(update);
	updateRef.current = update;

	const roRef = useRef(
		new ResizeObserver((entries) => {
			entries.forEach((entry) => {
				const el = entry.target;
				const attribute = 'data-key';
				const key = el.getAttribute(attribute);

				if (key === null) {
					throw new Error(`Value not found, for '${attribute}' attribute`);
				}

				const htmlEl = el as HTMLElement;

				updateRef.current(key, htmlEl);
			});
		}),
	);

	useEffect(() => {
		const ro = roRef.current;
		return () => {
			ro?.disconnect();
		};
	}, []);

	const { size, keyExtractor = defaultKeyExtractor } = options;

	const cachedMeasureRefWrappers = useMemo(() => {
		const makeMeasureRefWrapperForItem =
			(key: string | number) => (el: HTMLElement | null) => {
				if (elCacheRef.current[key]) {
					roRef.current?.unobserve(elCacheRef.current[key]!);
				}

				if (el) {
					// sync
					updateRef.current(key, el);
					// observe
					roRef.current?.observe(el);
				}

				elCacheRef.current[key] = el;
			};

		const refsAcc: Record<string, (el: HTMLElement | null) => void> = {};

		for (let i = 0; i < size; i++) {
			const key = keyExtractor(i);

			refsAcc[key] = makeMeasureRefWrapperForItem(key);
		}

		return refsAcc;
	}, [size, keyExtractor]);

	const rowVirtualizer = useVirtualImpl(options) as Virtualizer;

	const virtualItems = rowVirtualizer.virtualItems.map((item) => {
		measureRefCacheRef.current[item.key] = item.measureRef;

		const measureRef =
			cachedMeasureRefWrappers[item.key] ?? (() => undefined);

		return {
			...item,
			measureRef,
		};
	});

	return { ...rowVirtualizer, virtualItems };
};

// export type Virtualizer = ReturnType<typeof useVirtual>
