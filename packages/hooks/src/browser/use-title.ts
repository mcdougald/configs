import { useEffect, useRef } from 'react'

export interface UseTitleOptions {
  restoreOnUnmount?: boolean
}

const DEFAULT_USE_TITLE_OPTIONS: UseTitleOptions = {
  restoreOnUnmount: false
}

/**
 *
 * @param title
 * @param options
 */
function useTitle(title: string, options: UseTitleOptions = DEFAULT_USE_TITLE_OPTIONS) {
  const prevTitleRef = useRef(document.title)

  if (document.title !== title) document.title = title

  useEffect(
    () => {
      return options?.restoreOnUnmount
        ? () => {
            document.title = prevTitleRef.current
          }
        : undefined
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  )
}

export default useTitle
