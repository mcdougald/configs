import { type QueryKey, QueryObserver, type QueryObserverResult, useQueryClient } from '@tanstack/react-query'
import { useLayoutEffect, useState } from 'react'

/**
 * Hook to detect changes to a query.
 * @param {QueryKey} queryKey - The react-query query key to observe for changes.
 * @example useQueryListener hook
 * ```typescript
 * const sampleQuery = useQueryListener('query key');
 *
 * const result = sampleQuery.data;
 * ```
 * @returns {QueryObserverResult<TData, unknown> | undefined} The latest observer result for the query, or undefined before the first emission.
 */
const useQueryListener = <TData>(queryKey: QueryKey) => {
  const [query, setQuery] = useState<QueryObserverResult<TData, unknown>>()
  const queryClient = useQueryClient()
  useLayoutEffect(() => {
    const observer = new QueryObserver<TData, unknown>(queryClient, {
      queryKey,
      queryFn: () => queryClient.getQueryData<TData>(queryKey) as TData
    })
    const unsubscribe = observer.subscribe((result) => {
      setQuery({ ...result })
    })
    return () => {
      unsubscribe()
      observer.destroy()
    }
  }, [queryKey, queryClient])

  return query
}
export { useQueryListener }
