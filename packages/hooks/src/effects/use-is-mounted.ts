import { useCallback, useEffect, useRef, useState } from 'react';

function useIsMounted() {
	const isMounted = useRef(false);

	useEffect(() => {
		isMounted.current = true;

		return () => {
			isMounted.current = false;
		};
	}, []);

	return useCallback(() => isMounted.current, []);
}

export function useIsMountedBoolean() {
	const [mounted, setMounted] = useState(false);

	useEffect(() => setMounted(true), []);

	return mounted;
}

export default useIsMounted;
