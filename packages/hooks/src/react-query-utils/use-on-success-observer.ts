import { useEffect, useState } from 'react';

import { QueryObserver, useQueryClient } from '@tanstack/react-query';

const useSubscribe = (key: (string | number)[]) => {
	// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
	const [state] = useState<any>(null);

	const client = useQueryClient();

	const observer = new QueryObserver(client, {
		queryKey: key,
		// onSuccess: (data) => setstate(data),
	});

	useEffect(() => {
		// NOT WORKING
		console.log({ observer });
		// const unsubscribe = observer.subscribe()
		// return () => unsubscribe()
	}, []);

	return {
		// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
		state,
	};
};
export { useSubscribe };
