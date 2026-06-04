import { type RefObject, useRef } from 'react'

/**
 * Returns a ref object that always holds the latest provided value.
 * @template _Value
 * @param {_Value} providedValue - The value to keep current inside the ref.
 * @returns {Readonly<RefObject<_Value>>} A ref whose `current` always reflects the latest value.
 */
export const useLatest = <_Value>(providedValue: _Value): Readonly<RefObject<_Value>> => {
  const ref = useRef(providedValue)

  // eslint-disable-next-line react-hooks/refs, @eslint-react/refs -- intentional: useLatest must write the newest value to ref.current on every render so consumers always read the latest value
  ref.current = providedValue

  return ref
}
