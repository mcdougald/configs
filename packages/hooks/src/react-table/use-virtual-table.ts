import type { Table } from '@tanstack/react-table'

import { useMemo, useRef } from 'react'
import { useVirtual } from 'react-virtual'

/**
 * Computes virtualized row data and padding offsets for a TanStack table so only
 * visible rows are rendered.
 *
 * https://codesandbox.io/s/react-typescript-forked-6j1gs8?file=/src/common/hooks/useVirtualTable.ts:0-936
 * @param {Table<T>} table - The TanStack table instance whose rows should be virtualized.
 * @returns {{ paddingBottom: number; paddingTop: number; totalSize: number; virtualRows: ReturnType<typeof useVirtual>['virtualItems']; tableContainerRef: React.RefObject<HTMLDivElement | null> }} The virtualized rows, padding offsets, total size, and the container ref to attach to the scroll element.
 */
export const useVirtualTable = <T>(table: Table<T>) => {
  const tableContainerRef = useRef<HTMLDivElement>(null)

  const { rows } = table.getRowModel()
  const rowVirtualizer = useVirtual({
    parentRef: tableContainerRef,
    size: rows.length,
    overscan: 15
  })
  const { virtualItems: virtualRows, totalSize } = rowVirtualizer

  const paddingTop = virtualRows.length > 0 ? (virtualRows[0]?.start ?? 0) : 0

  const paddingBottom = virtualRows.length > 0 ? totalSize - (virtualRows.at(-1)?.end ?? 0) : 0

  return useMemo(
    () => ({
      paddingBottom,
      paddingTop,
      totalSize,
      virtualRows,
      tableContainerRef
    }),
    [paddingBottom, paddingTop, totalSize, virtualRows, tableContainerRef]
  )
}
