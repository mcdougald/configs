import { useEffect, useRef } from 'react'

export interface UseTitleOptions {
  restoreOnUnmount?: boolean
}

const DEFAULT_USE_TITLE_OPTIONS: UseTitleOptions = {
  restoreOnUnmount: false
}

/**
 * React hook that sets `document.title`, optionally restoring the previous title on unmount.
 * @param {string} title - The document title to apply.
 * @param {UseTitleOptions} [options] - Behavior options; set `restoreOnUnmount` to restore the prior title when the component unmounts.
 * @returns {void}
 */
function useTitle(title: string, options: UseTitleOptions = DEFAULT_USE_TITLE_OPTIONS) {
  const prevTitleRef = useRef(document.title)

  // eslint-disable-next-line react-hooks/immutability, @eslint-react/globals -- intentional: synchronously update document.title so the title reflects the latest render without a flash
  if (document.title !== title) document.title = title

  useEffect(
    () => {
      return options.restoreOnUnmount
        ? () => {
            document.title = prevTitleRef.current
          }
        : undefined
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps -- intentional: title is applied during render; the effect only registers the unmount restore once
    []
  )
}

export default useTitle
