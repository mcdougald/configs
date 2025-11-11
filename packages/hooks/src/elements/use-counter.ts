import { useEffect, useRef } from 'react';

/**
 * Increments on every render?
 * @returns {number}
 */
export const useCounter = () => {
	const count = useRef(0);
	let currentCount = count.current;
	useEffect(() => {
		count.current = currentCount;
	});
	currentCount += 1;
	return currentCount;
};
