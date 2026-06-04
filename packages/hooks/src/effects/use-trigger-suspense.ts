import {
  type QueryKey,
  useSuspenseQuery,
  type UseSuspenseQueryOptions,
  type UseSuspenseQueryResult
} from '@tanstack/react-query'

import { sleep } from '../utils/sleep'

export const useTriggerSuspense = (
  queryKey: QueryKey,
  time: number,
  options?: UseSuspenseQueryOptions<string, Error, string>
): UseSuspenseQueryResult<string> => {
  return useSuspenseQuery<string, Error, string>({
    queryKey,
    queryFn: async (): Promise<string> => {
      await sleep(time)
      return 'fetched'
    },
    staleTime: Number.POSITIVE_INFINITY,
    refetchOnMount: 'always',
    ...options
  })
}
