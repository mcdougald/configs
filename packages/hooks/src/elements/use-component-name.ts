/* eslint-disable @typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-return */
import type { ComponentClass, ComponentType } from 'react';

const isClassReactComponent = (C: ComponentType): C is ComponentClass =>
	!!C.prototype?.render;

const getComponentName = (comp: ComponentType): string => {
	if (comp.displayName) {
		return comp.displayName;
	}
	if (isClassReactComponent(comp)) {
		return comp.prototype.constructor.name;
	}
	return comp.name || 'Component';
};

const useComponentName = (comp: ComponentType) => {
	return getComponentName(comp);
};

export { useComponentName, isClassReactComponent, getComponentName };
