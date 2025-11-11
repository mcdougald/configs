import {
	type QueryKey,
	type UseSuspenseQueryOptions,
	type UseSuspenseQueryResult,
	useSuspenseQuery,
} from '@tanstack/react-query';

import { sleep } from '../utils/sleep';

export const useTriggerSuspense = (
	queryKey: QueryKey,
	time: number,
	options?: UseSuspenseQueryOptions<string, Error, string, QueryKey>,
): UseSuspenseQueryResult<string, Error> => {
	return useSuspenseQuery<string, Error, string, QueryKey>({
		queryKey,
		queryFn: async (): Promise<string> => {
			await sleep(time);
			return 'fetched';
		},
		staleTime: Number.POSITIVE_INFINITY,
		refetchOnMount: 'always',
		...options,
	});
};
