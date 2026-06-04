import type {
  InvalidateQueryFilters,
  MutationFunction,
  MutationKey,
  QueryKey,
  Updater,
  UseMutationOptions
} from '@tanstack/react-query'

import { useMutation, useQueryClient } from '@tanstack/react-query'

/**
 * Ripped from https://github.com/sub-t/next-session-auth/blob/7cd0955af2d2d29ade553e07f5f5105681c812d5/src/features/posts/api/deletePost.ts
 * @param mutationKey
 * @param mutationKey.mutationKey
 * @param mutationFn
 * @param mutationKey.mutationFn
 * @param updateFn
 * @param mutationKey.updateFn
 * @param config
 * @param mutationKey.config
 */
const useOptimisticMutation = <TData = unknown, TError = unknown, TVariables = void, TContext = unknown>({
  mutationKey,
  mutationFn,
  updateFn,
  config
}: {
  config?: Omit<UseMutationOptions<TData, TError, TVariables, TContext>, 'onError' | 'onMutate' | 'onSuccess'>
  mutationFn: MutationFunction<TData, TVariables>
  mutationKey: MutationKey
  updateFn: (previousData: TContext, variables: TVariables) => any
}) => {
  const queryClient = useQueryClient()

  return useMutation<TData, TError, TVariables, TContext | undefined>({
    mutationKey,
    mutationFn,
    onMutate: async (variables) => {
      await queryClient.cancelQueries({ queryKey: mutationKey })

      const previousData = queryClient.getQueryData<TContext | undefined>(mutationKey)

      if (previousData !== undefined) {
        queryClient.setQueryData<TContext>(mutationKey, updateFn(previousData, variables))
      }

      return previousData
    },
    onError: (_, __, previousData) => {
      if (previousData !== undefined) {
        queryClient.setQueryData(mutationKey, previousData)
      }
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: mutationKey })
    },
    ...config
  })
}

const useOptimisticUpdate = <TDataCache>(key: QueryKey) => {
  const queryClient = useQueryClient()

  const prevData = queryClient.getQueryData<TDataCache | undefined>(key)

  const setDataToCache = (newData: Updater<TDataCache | undefined, TDataCache | undefined>) => {
    queryClient.setQueryData(key, newData)
  }

  const invalidateQueries = (filter?: InvalidateQueryFilters) => {
    return queryClient.invalidateQueries({
      queryKey: key,
      ...filter
    })
  }

  const cancelQueries = () => queryClient.cancelQueries({ queryKey: key })

  return { cancelQueries, prevData, setDataToCache, invalidateQueries }
}

export { useOptimisticMutation, useOptimisticUpdate }
