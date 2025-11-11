import { useMemo, useRef } from 'react';

import type { Table } from '@tanstack/react-table';
import { useVirtual } from 'react-virtual';

/**
 * https://codesandbox.io/s/react-typescript-forked-6j1gs8?file=/src/common/hooks/useVirtualTable.ts:0-936
 * @param table
 */
export const useVirtualTable = <T>(table: Table<T>) => {
	const tableContainerRef = useRef<HTMLDivElement>(null);

	const { rows } = table.getRowModel();
	const rowVirtualizer = useVirtual({
		parentRef: tableContainerRef,
		size: rows.length,
		overscan: 15,
	});
	const { virtualItems: virtualRows, totalSize } = rowVirtualizer;

	const paddingTop = virtualRows.length > 0 ? virtualRows?.[0]?.start || 0 : 0;

	const paddingBottom =
		virtualRows.length > 0
			? totalSize - (virtualRows?.[virtualRows.length - 1]?.end || 0)
			: 0;

	return useMemo(
		() => ({
			paddingBottom,
			paddingTop,
			totalSize,
			virtualRows,
			tableContainerRef,
		}),
		[paddingBottom, paddingTop, totalSize, virtualRows, tableContainerRef],
	);
};
