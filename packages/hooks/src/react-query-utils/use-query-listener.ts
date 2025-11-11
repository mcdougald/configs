import { useLayoutEffect, useState } from 'react';

import {
	type QueryKey,
	QueryObserver,
	type QueryObserverResult,
	useQueryClient,
} from '@tanstack/react-query';

/**
 * Hook to detect changes to a query
 * @example useQueryListener hook
 * ```typescript
 * const sampleQuery = useQueryListener('query key');
 *
 * const result = sampleQuery.data;
 * ```
 */
const useQueryListener = <TData>(queryKey: QueryKey) => {
	const [query, setQuery] = useState<QueryObserverResult<TData, unknown>>();
	const queryClient = useQueryClient();
	useLayoutEffect(() => {
		const observer = new QueryObserver<TData, unknown>(queryClient, {
			queryKey,
			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
			// @ts-ignore
			queryFn: () => {
				return queryClient.getQueryData(queryKey);
			},
		});
		const unsubscribe = observer.subscribe((query) => {
			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
			// @ts-ignore
			setQuery(Object.assign({}, query));
		});
		return () => {
			unsubscribe();
			observer.destroy();
		};
	}, [queryKey, queryClient]);

	return query;
};
export { useQueryListener };
