import { useEffect, useRef } from 'react'

import { useRenderCount } from '../elements/use-render-count'

export const useDebug = (componentName: string, props: Record<string, unknown>) => {
  const componentDisplayName = `<${componentName} />`

  const renderCount = useRenderCount()

  // eslint-disable-next-line @eslint-react/naming-convention-ref-name -- intentional: descriptive name for the persisted changed-props diff used by the logging effect
  const changedProps = useRef<Record<string, { current: unknown; previous: unknown }>>({})
  // eslint-disable-next-line @eslint-react/naming-convention-ref-name -- intentional: descriptive name for the persisted previous-props snapshot used to diff renders
  const previousProps = useRef<Record<string, unknown>>(props)
  // eslint-disable-next-line @eslint-react/naming-convention-ref-name, react-hooks/purity -- intentional: debug helper seeds the ref with the initial render timestamp to measure time between renders
  const lastRenderTimestamp = useRef(Date.now())

  const propKeys = Object.keys({ ...props, ...previousProps })

  // eslint-disable-next-line react-hooks/refs -- intentional: debug helper diffs the current props against the persisted previous-props ref during render
  const nextChangedProps: Record<string, { current: unknown; previous: unknown }> = {}
  for (const key of propKeys) {
    if (props[key] === previousProps.current[key]) continue
    nextChangedProps[key] = { previous: previousProps.current[key], current: props[key] }
  }
  // eslint-disable-next-line react-hooks/refs -- intentional: debug helper stores the computed prop diff in a ref so the effect can log it
  changedProps.current = nextChangedProps

  const info = {
    renderCount,
    changedProps: changedProps.current,
    // eslint-disable-next-line react-hooks/refs -- intentional: debug helper reads the persisted last-render timestamp to compute elapsed time
    timeSinceLastRender: Date.now() - lastRenderTimestamp.current,
    lastRenderTimestamp: lastRenderTimestamp.current
  }

  useEffect(() => {
    previousProps.current = props
    lastRenderTimestamp.current = Date.now()
    // console.log('[debug-info]', componentName, info);

    console.group(
      componentDisplayName,
      `Rerenders: ${info.renderCount}, Last Rerender ${info.timeSinceLastRender}ms, Last Rerender Time: ${new Date(
        info.lastRenderTimestamp
      ).toISOString()}`
    )
    if (Object.keys(changedProps.current).length > 0) {
      console.group('Changed props')
      console.table(changedProps.current)
      console.groupEnd()
    }
    console.groupEnd()
  })

  // eslint-disable-next-line react-hooks/refs -- intentional: debug helper returns the per-render info snapshot (including ref-derived diff) for inspection
  return info
}

export default useDebug
