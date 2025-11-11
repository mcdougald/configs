import type { DependencyList, EffectCallback } from 'react';

import { isEqual } from 'lodash-es';
import useCustomCompareEffect from './use-custom-compare-effect';

const isPrimitive = (val: any) => val !== Object(val);

const useDeepCompareEffect = (effect: EffectCallback, deps: DependencyList) => {
	// eslint-disable-next-line turbo/no-undeclared-env-vars
	if (process.env.NODE_ENV !== 'production') {
		if (!(deps instanceof Array) || !deps.length) {
			console.warn(
				'`useDeepCompareEffect` should not be used with no dependencies. Use React.useEffect instead.',
			);
		}

		if (deps.every(isPrimitive)) {
			console.warn(
				'`useDeepCompareEffect` should not be used with dependencies that are all primitive values. Use React.useEffect instead.',
			);
		}
	}

	useCustomCompareEffect(effect, deps, isEqual);
};

export default useDeepCompareEffect;
