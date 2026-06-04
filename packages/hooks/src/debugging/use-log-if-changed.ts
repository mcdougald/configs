import { useRef } from 'react'

/**
 * Serializes a value for logging, using JSON for objects and string coercion otherwise.
 * @param {unknown} value - The value to render as a string.
 * @returns {string} A human-readable representation of the value.
 */
function print(value: unknown) {
  return typeof value === 'object' ? JSON.stringify(value) : String(value)
}

/**
 * Development hook that logs to the console whenever the provided value changes between renders.
 * @param {string} name - A label identifying the tracked value in the console output.
 * @param {unknown} value - The value to track across renders.
 * @returns {void}
 */
export function useLogIfChanged(name: string, value: unknown) {
  // eslint-disable-next-line @eslint-react/naming-convention-ref-name -- intentional: descriptive name for the ref holding the previous render's value
  const previous = useRef(value)
  // eslint-disable-next-line react-hooks/refs -- intentional: debug helper compares the current value against the previous-value ref during render
  if (Object.is(previous.current, value)) {
    console.log(`${name} unchanged: ${previous.current === value}`)
  } else {
    console.log(`${name} changed. Old: ${print(previous.current)}, New: ${print(value)} `)
    // eslint-disable-next-line react-hooks/refs -- intentional: debug helper records the new value in the ref so the next render can detect a change
    previous.current = value
  }
}
