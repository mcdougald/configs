import {
	type InvalidateQueryFilters,
	type QueryKey,
	type Updater,
	useMutation,
	useQueryClient,
} from '@tanstack/react-query';
import type {
	MutationFunction,
	MutationKey,
	UseMutationOptions,
} from '@tanstack/react-query';

/**
 * Ripped from https://github.com/sub-t/next-session-auth/blob/7cd0955af2d2d29ade553e07f5f5105681c812d5/src/features/posts/api/deletePost.ts
 * @param mutationKey
 * @param mutationFn
 * @param updateFn
 * @param config
 */
const useOptimisticMutation = <TData = unknown, TError = unknown, TVariables = void, TContext = unknown>({
	mutationKey,
	mutationFn,
	updateFn,
	config,
}: {
	mutationKey: MutationKey;
	mutationFn: MutationFunction<TData, TVariables>;
	updateFn: (previousData: TContext, variables: TVariables) => any;
	config?: Omit<
		UseMutationOptions<TData, TError, TVariables, TContext>,
		'onMutate' | 'onError' | 'onSuccess'
	>;
}) => {
	const queryClient = useQueryClient();

	return useMutation<TData, TError, TVariables, TContext | undefined>({
		mutationKey,
		mutationFn,
		onMutate: async (variables) => {
			await queryClient.cancelQueries({ queryKey: mutationKey });

			const previousData =
				queryClient.getQueryData<TContext | undefined>(mutationKey);

			// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
			if (previousData !== undefined) {
				queryClient.setQueryData<TContext>(
					mutationKey,
					updateFn(previousData, variables),
				);
			}

			return previousData;
		},
		onError: (_, __, previousData) => {
			if (previousData !== undefined) {
				queryClient.setQueryData(mutationKey, previousData);
			}
		},
		onSuccess: async () => {
			await queryClient.invalidateQueries({ queryKey: mutationKey });
		},
		...config,
	});
};

const useOptimisticUpdate = <TDataCache>(key: QueryKey) => {
	const queryClient = useQueryClient();

	const prevData = queryClient.getQueryData<TDataCache | undefined>(key);

	const setDataToCache = (
		newData: Updater<TDataCache | undefined, TDataCache | undefined>,
	) => {
		queryClient.setQueryData(key, newData);
	};

	const invalidateQueries = (filter?: InvalidateQueryFilters) => {
		return queryClient.invalidateQueries({
			queryKey: key,
			...filter,
		});
	};

	const cancelQueries = () => queryClient.cancelQueries({ queryKey: key });

	return { cancelQueries, prevData, setDataToCache, invalidateQueries };
};

export { useOptimisticUpdate, useOptimisticMutation };
