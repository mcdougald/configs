import type { SVGProps, RefObject } from 'react';

export type ReactSvgProps = SVGProps<SVGSVGElement>;

export type ReactElementOrRef<
	TElement extends HTMLElement | Element | null = HTMLElement | Element | null,
> = RefObject<TElement> | TElement | null | undefined;

export function elementHasOverflowY(element?: HTMLElement | unknown): boolean {
	return elementHasOverflow(element).hasOverflowY;
}

export function elementHasOverflowX(element?: HTMLElement | unknown): boolean {
	return elementHasOverflow(element).hasOverflowX;
}

export function elementHasOverflow(element?: HTMLElement | unknown): {
	hasOverflowY: boolean;
	hasOverflowX: boolean;
} {
	const getElement = () => {
		if (element && typeof element === 'object' && 'current' in element) {
			return element.current as HTMLElement;
		}
		return element;
	};

	const el = getElement();

	if (el instanceof HTMLElement) {
		return {
			hasOverflowY: el.scrollHeight > el.clientHeight,
			hasOverflowX: el.scrollWidth > el.clientWidth,
		};
	}
	return { hasOverflowY: false, hasOverflowX: false };
}

export function calculateOverflow({
	element,
}: {
	element?: HTMLElement | null;
	width: boolean;
}): boolean {
	if (element instanceof HTMLElement) {
		return (
			element.scrollHeight > element.clientHeight ||
			element.scrollWidth > element.clientWidth
		);
	}
	return false;
}

export function getElement<TElement extends HTMLElement | Element | null>(
	elementOrRef: ReactElementOrRef<TElement>,
) {
	if (!elementOrRef) return undefined;

	if (elementOrRef instanceof HTMLElement || elementOrRef instanceof Element) {
		return elementOrRef;
	}

	return elementOrRef.current;
}

export default function canUseDom(): boolean {
	return !!(
		typeof window !== 'undefined' &&
		window.document &&
		window.document.createElement
	);
}
