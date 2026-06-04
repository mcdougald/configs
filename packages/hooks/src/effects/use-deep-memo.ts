import { isEqual } from 'lodash-es'
import { useRef } from 'react'

/**
 * Memoize a result using deep equality. This hook has two advantages over
 * React.useMemo: it uses deep equality to compare memo keys, and it guarantees
 * that the memo function will only be called if the keys are unequal.
 * React.useMemo cannot be relied on to do this, since it is only a performance
 * optimization (see https://reactjs.org/docs/hooks-reference.html#usememo).
 * @template TKey - The type of the dependency key.
 * @template TValue - The type of the memoized value.
 * @param {() => TValue} memoFn - Factory function whose result is memoized; only invoked when `key` changes by deep equality.
 * @param {TKey} key - The dependency key compared by deep equality to decide when to recompute.
 * @returns {TValue} The memoized value.
 */
// eslint-disable-next-line @typescript-eslint/no-unnecessary-type-parameters -- TKey ties the key argument's type to the ref cache for correct inference
export function useDeepMemo<TKey, TValue>(memoFn: () => TValue, key: TKey): TValue {
  const ref = useRef<{ key: TKey; value: TValue }>(undefined)

  // eslint-disable-next-line react-hooks/refs, @eslint-react/refs -- intentional: deep-equality memo cache read/write during render, mirroring useMemo semantics
  if (!ref.current || !isEqual(key, ref.current.key)) {
    // eslint-disable-next-line @eslint-react/refs -- intentional: deep-equality memo cache write during render
    ref.current = { key, value: memoFn() }
  }

  // eslint-disable-next-line @eslint-react/refs -- intentional: returning memoized value read from cache during render
  return ref.current.value
}
