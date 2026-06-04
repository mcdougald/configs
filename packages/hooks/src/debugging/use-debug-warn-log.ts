import { type DependencyList, useEffect, useRef } from 'react'

/**
 * This hook is a development helper to try and figure out why components
 * may be re-rendering (and how many times). Internally it uses React's useEffect hook,
 * and logs a useful warning message to the JS console when the memo is invalidated.
 * @param {DependencyList} deps - The array of dependencies that will be passed directly to useEffect.
 * @param {string} [label] - Label to help you differentiate between different instances in the JS console.
 * @param {object} [context] - Additional context to be displayed alongside the log message.
 * @returns {void}
 * @example
 *   const somethingThatMayCauseReRenders = () => {}
 *   const usefulContext = 42
 *
 *   useDebugWarnLog([somethingThatMayCauseReRenders], "FooComponent::barLabel", { usefulContext })
 *   // [useDebugWarnLog::FooComponent::barLabel] deps changed, will cause re-render (count: 1), { usefulContext }
 */
export const useDebugWarnLog = (deps: DependencyList, label?: string, context?: object) => {
  const countRef = useRef(0)

  useEffect(() => {
    countRef.current += 1

    const prefix = label ? `[useDebugWarnLog::${label}]` : '[useDebugWarnLog]'
    displayWarning(`${prefix} (count: ${countRef.current})`, `deps changed, will cause re-render`, context)
    // We are consciously using a dynamic props pattern here as it is a helper
    // eslint-disable-next-line react-hooks/exhaustive-deps -- intentional: this debug helper spreads caller-provided deps to detect what changed; the dynamic deps array is the intended design
  }, [...deps, label])
}

const warningStyles = 'color: var(--warning, #F39C12)'

const displayWarning = (title: string, msg: string, context?: object) => {
  console.groupCollapsed(`%c${title}`, warningStyles)
  console.log(msg, context)
  console.groupCollapsed('click to show stacktrace')
  console.warn('stacktrace')
  console.groupEnd()
  console.groupEnd()
}
