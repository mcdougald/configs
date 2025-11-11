/* eslint-disable @typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-return,@typescript-eslint/no-explicit-any */

// copied from https://github.com/TanStack/react-virtual/blob/061075751c3fad630710c0f7794e587a6cf9dda0/src/useRect.js (20. May 2022) (modified)
//github.com/SAP/ui5-webcomponents-react/blob/9e876789b2a25661e6b0a946c421bbeb882c07f8/packages/main/src/internal/useRect.ts
import {
	useEffect,
	useLayoutEffect,
	useReducer,
	useRef,
	useState,
} from 'react';

const useIsomorphicLayoutEffect =
	typeof window !== 'undefined' ? useLayoutEffect : useEffect;

function rectReducer(
	state: { height: any; width: any },
	action: { rect: any },
) {
	// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-assignment
	const rect = action.rect;
	if (state.height !== rect.height || state.width !== rect.width) {
		return rect;
	}
	return state;
}

/**
 * https://github.com/SAP/ui5-webcomponents-react/blob/6476e7334aff784537ed9a4663b4effd661bd4f6/packages/main/src/internal/useRect.ts*
 * @param nodeRef
 * @param initialRect
 */
export function useRect(
	nodeRef: { current: any },
	initialRect = { width: 0, height: 0 },
) {
	const [element, setElement] = useState(nodeRef.current);
	const [rect, dispatch] = useReducer(rectReducer, initialRect);
	const initialRectSet = useRef(false);

	useIsomorphicLayoutEffect(() => {
		if (nodeRef.current !== element) {
			setElement(nodeRef.current);
		}
	});

	useIsomorphicLayoutEffect(() => {
		if (element && !initialRectSet.current) {
			initialRectSet.current = true;
			dispatch({
				rect: { width: element.offsetWidth, height: element.offsetHeight },
			});
		}
	}, [element]);

	useEffect(() => {
		if (!element) {
			return;
		}

	const observer = new ResizeObserver((_entries) => {
			dispatch({
				rect: { width: element.offsetWidth, height: element.offsetHeight },
			});
		});

		observer.observe(element as Element);

		return () => {
			observer.disconnect();
		};
	}, [element]);

	// eslint-disable-next-line @typescript-eslint/no-unsafe-return
	return rect;
}
