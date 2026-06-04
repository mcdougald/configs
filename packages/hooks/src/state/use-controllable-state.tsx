import { type Dispatch, type SetStateAction, useCallback, useEffect, useMemo, useRef, useState } from 'react'

type UseControllableStateParams<T> = {
  defaultProp?: T | undefined
  onChange?: (state: T) => void
  prop?: T | undefined
}

type SetStateFn<T> = (prevState?: T) => T

/**
 *
 * @param root0
 * @param root0.prop
 * @param root0.defaultProp
 * @param root0.onChange
 */
function useControllableState<T>({ prop, defaultProp, onChange = () => {} }: UseControllableStateParams<T>) {
  const [uncontrolledProp, setUncontrolledProp] = useUncontrolledState({
    defaultProp,
    onChange
  })
  const isControlled = prop !== undefined
  const value = isControlled ? prop : uncontrolledProp
  const handleChange = useCallbackRef(onChange)

  const setValue: Dispatch<SetStateAction<T | undefined>> = useCallback(
    (nextValue) => {
      if (isControlled) {
        const setter = nextValue as SetStateFn<T>
        const value = typeof nextValue === 'function' ? setter(prop) : nextValue
        if (value !== prop) handleChange(value as T)
      } else {
        setUncontrolledProp(nextValue)
      }
    },
    [isControlled, prop, setUncontrolledProp, handleChange]
  )

  return [value, setValue] as const
}

/**
 *
 * @param root0
 * @param root0.defaultProp
 * @param root0.onChange
 */
function useUncontrolledState<T>({ defaultProp, onChange }: Omit<UseControllableStateParams<T>, 'prop'>) {
  const uncontrolledState = useState<T | undefined>(defaultProp)
  const [value] = uncontrolledState
  const prevValueRef = useRef(value)
  const handleChange = useCallbackRef(onChange)

  useEffect(() => {
    if (prevValueRef.current !== value) {
      handleChange(value as T)
      prevValueRef.current = value
    }
  }, [value, prevValueRef, handleChange])

  return uncontrolledState
}

/**
 * A custom hook that converts a callback to a ref to avoid triggering re-renders when passed as a
 * prop or avoid re-executing effects when passed as a dependency
 * @param callback
 */
function useCallbackRef<T extends (...args: any[]) => any>(callback: T | undefined): T {
  const callbackRef = useRef(callback)

  useEffect(() => {
    callbackRef.current = callback
  })

  // https://github.com/facebook/react/issues/19240
  return useMemo(() => ((...args) => callbackRef.current?.(...args)) as T, [])
}

export { useControllableState }
