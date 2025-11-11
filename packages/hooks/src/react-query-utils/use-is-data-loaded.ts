import { useEffect, useState } from 'react';

import {
	type QueryKey,
	QueryObserver,
	useQueryClient,
} from '@tanstack/react-query';

/**
 * Check if react-query has already fetched data for a query key.
 *
 * This hook is reactive.
 *
 * @example
 * const isCustomerLoaded = useIsDataLoaded(['customers', 'getOne', { id: customerId }]);
 *
 * @returns {boolean} true if the data is loaded, false otherwise
 */
const useIsDataLoaded = (
	queryKey: QueryKey,
	options: { enabled?: boolean } = {},
) => {
	const { enabled = true } = options;
	const queryClient = useQueryClient();
	const [isDataLoaded, setDataLoaded] = useState<boolean>(() => {
		if (!enabled) {
			return false;
		}
		return queryClient.getQueryData(queryKey) !== undefined;
	});

	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-ignore
	useEffect(() => {
		if (!enabled) return;
		if (queryClient.getQueryData(queryKey) === undefined) {
			const observer = new QueryObserver(queryClient, { queryKey });
			const unsubscribe = observer.subscribe((result) => {
				setDataLoaded(!result.isLoading);
				unsubscribe();
			});
			return unsubscribe;
		}
	}, [enabled, queryClient, queryKey]);

	return isDataLoaded;
};
export { useIsDataLoaded };
