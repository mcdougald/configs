import { type RefObject, useEffect, useRef, useState } from 'react';

/*
 * Source code copied from https://github.com/uidotdev/usehooks | MIT License
 * @see https://usehooks.com/usehover
 */
export function useHover<T extends HTMLElement = HTMLElement>(): [
	ref: RefObject<T | null>,
	hovering: boolean,
] {
	const [hovering, setHovering] = useState(false);
	const ref = useRef<T | null>(null);

	useEffect(() => {
		const node = ref.current as unknown as HTMLElement;

		if (!node) return;

		const handleMouseEnter = () => {
			setHovering(true);
		};

		const handleMouseLeave = () => {
			setHovering(false);
		};

		node.addEventListener('mouseenter', handleMouseEnter);
		node.addEventListener('mouseleave', handleMouseLeave);

		// eslint-disable-next-line consistent-return
		return () => {
			node.removeEventListener('mouseenter', handleMouseEnter);
			node.removeEventListener('mouseleave', handleMouseLeave);
		};
	}, []);

	return [ref, hovering];
}
