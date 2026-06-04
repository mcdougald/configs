import { useEffect, useRef } from 'react'

/**
 * Based on https://usehooks.com/useWhyDidYouUpdate/
 * @param {string} name - A key to identify the console group.
 * @param {Record<string, unknown>} props - The props object to persist and compare across renders.
 * @returns {void}
 */
export function useWhyDidYouUpdate(name: string, props: Record<string, unknown>) {
  // eslint-disable-next-line @eslint-react/naming-convention-ref-name -- intentional: descriptive name for the ref holding the previous render's props
  const previousProps = useRef<Record<string, unknown>>({})

  // eslint-disable-next-line react-you-might-not-need-an-effect/no-event-handler -- intentional: this debug hook logs prop diffs on every render as a development side effect
  useEffect(() => {
    const { current } = previousProps
    const allKeys = Object.keys({ ...current, ...props })
    const changesObj: Record<string, unknown> = {}
    for (const key of allKeys) {
      if (current[key] !== props[key]) {
        changesObj[key] = {
          from: current[key],
          to: props[key]
        }
      }
    }

    console.group(`%c[why-did-you-update] %c${name}`, 'font-weight: bold;', 'color: dodgerblue; font-weight: bold;')
    if (Object.keys(changesObj).length > 0) {
      console.table(changesObj)
    } else {
      console.log('Something else changed.')
    }
    console.groupEnd()

    previousProps.current = props
  })
}
