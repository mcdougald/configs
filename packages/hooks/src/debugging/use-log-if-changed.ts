import { useRef } from 'react'

/**
 *
 * @param value
 */
function print(value: any) {
  return typeof value === 'object' ? JSON.stringify(value) : `${value}`
}

/**
 *
 * @param name
 * @param value
 */
export function useLogIfChanged<T>(name: string, value: T) {
  const previous = useRef(value)
  if (Object.is(previous.current, value)) {
    console.log(`${name} unchanged: ${previous.current === value}`)
  } else {
    console.log(`${name} changed. Old: ${print(previous.current)}, New: ${print(value)} `)
    previous.current = value
  }
}
