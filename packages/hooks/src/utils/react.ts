import {
	Children,
	type FC,
	type JSXElementConstructor,
	type PropsWithChildren,
	type ReactNode,
	isValidElement,
} from 'react';

export const getChild = (
	Component: ReactNode,
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
): JSXElementConstructor<any> => {
	if (isValidElement(Component)) {
		const { type } = Component;
		if (typeof type === 'string') {
			// @ts-ignore
			return null;
		} else {
			return type;
		}
	}
	// @ts-ignore
	return null;
};

export const findComponentInChildren = <T>(
	children: ReactNode,
	component: FC<PropsWithChildren<T>>,
): ReactNode => {
	if (!component) {
		return null;
	}
	return Children.toArray(children).find(
		(child) => getChild(child) === component,
	);
};
