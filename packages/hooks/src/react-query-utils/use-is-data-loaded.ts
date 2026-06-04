import { type QueryKey, QueryObserver, useQueryClient } from '@tanstack/react-query'
import { useEffect, useState } from 'react'

/**
 * Check if react-query has already fetched data for a query key.
 *
 * This hook is reactive.
 * @param {QueryKey} queryKey - The react-query query key to observe.
 * @param {{ enabled?: boolean }} options - Options controlling the hook.
 * @param {boolean} [options.enabled] - Whether the hook is active. Defaults to true.
 * @example
 * const isCustomerLoaded = useIsDataLoaded(['customers', 'getOne', { id: customerId }]);
 * @returns {boolean} true if the data is loaded, false otherwise
 */
const useIsDataLoaded = (queryKey: QueryKey, options: { enabled?: boolean } = {}) => {
  const { enabled = true } = options
  const queryClient = useQueryClient()
  const [isDataLoaded, setIsDataLoaded] = useState<boolean>(() => {
    if (!enabled) {
      return false
    }
    return queryClient.getQueryData(queryKey) !== undefined
  })

  // eslint-disable-next-line react-you-might-not-need-an-effect/no-event-handler -- intentional: subscribing to the query cache requires an effect to set up and tear down the observer subscription
  useEffect(() => {
    if (!enabled) return undefined
    if (queryClient.getQueryData(queryKey) === undefined) {
      const observer = new QueryObserver(queryClient, { queryKey })
      const unsubscribe = observer.subscribe((result) => {
        setIsDataLoaded(!result.isLoading)
        unsubscribe()
      })
      return unsubscribe
    }
    return undefined
  }, [enabled, queryClient, queryKey])

  return isDataLoaded
}
export { useIsDataLoaded }
