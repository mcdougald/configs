import { useEffect, useState } from 'react';

import { useLocation, useNavigationType } from 'react-router-dom';

export const useHistoryStack = (): string[] => {
	const [stack, setStack] = useState<string[]>([]);
	const { pathname } = useLocation();
	const type = useNavigationType();
	console.log(stack);

	useEffect(() => {
		if (type === 'POP') {
			setStack((prev) => prev.slice(0, prev.length - 1));
		} else if (type === 'PUSH') {
			setStack((prev) => [...prev, pathname]);
		} else {
			setStack((prev) => [...prev.slice(0, prev.length - 1), pathname]);
		}
	}, [pathname, type]);

	return stack;
};
