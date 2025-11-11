import { useConst } from '../state/use-const';
import { useLatest } from '../state/use-latest';

/** Any function, for use in `extends` */
export type AnyFunction = (...args: never[]) => unknown;
/**
 * Returns a stable reference to the last version of the passed function.
 */
export const useFunction = <_Callback extends AnyFunction>(
	callback: _Callback,
): _Callback => {
	const callbackRef = useLatest(callback);

	return useConst(
		() =>
			((...args: Parameters<_Callback>) => {
				// eslint-disable-next-line @typescript-eslint/no-unsafe-return
				return callbackRef.current(...args);
			}) as _Callback,
	);
};
