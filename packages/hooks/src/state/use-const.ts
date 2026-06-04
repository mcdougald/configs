import { useRef } from 'react'

const EMPTY_VALUE = {}

/**
 * Initializes and retains a value across renders, calling the factory
 * function only once.
 * @template _Value
 * @param {() => _Value} factory - Factory invoked exactly once to produce the constant value.
 * @returns {_Value} The stable value produced on the first render.
 */
export const useConst = <_Value>(factory: () => _Value): _Value => {
  const ref = useRef(EMPTY_VALUE as _Value)

  // eslint-disable-next-line react-hooks/refs, @eslint-react/refs -- intentional: lazy-init-once pattern requires reading/writing ref.current during render to call the factory only once
  if (ref.current === EMPTY_VALUE) {
    // eslint-disable-next-line react-hooks/refs, @eslint-react/refs -- intentional: lazy-init-once pattern stores the factory result during render
    ref.current = factory()
  }

  // eslint-disable-next-line react-hooks/refs, @eslint-react/refs -- intentional: returns the once-initialized stable value
  return ref.current
}
