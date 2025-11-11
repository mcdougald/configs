import { useCallback, useState } from 'react';

/**
 * https://github.com/pattern-ui/pattern/blob/7134432cc0/packages/pattern-hooks/src/use-disclosure/use-disclosure.ts
 * @param initialState
 * @param callbacks
 */
export const useDisclosure = (initial = false) => {
	const [isOpen, setIsOpen] = useState(initial);

	const open = useCallback(() => setIsOpen(true), []);
	const close = useCallback(() => setIsOpen(false), []);
	const toggle = useCallback(() => setIsOpen((state) => !state), []);

	return { isOpen, open, close, toggle };
};
