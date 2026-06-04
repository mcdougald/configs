import { useState } from 'react'

import useSafeLayoutEffect from '../effects/use-isomorphic-layout-effect'
/**
 * Хук для получения IntersectionObserver.
 * Подгружает полифилл в тех браузерах, где IntersectionObserver не поддерживается.
 */
const useIntersectionObserver = (): typeof IntersectionObserver | undefined => {
  const [IntersectionObserverConstructor, setIntersectionObserverConstructor] = useState<typeof IntersectionObserver>()

  useSafeLayoutEffect(() => {
    if ('IntersectionObserver' in globalThis) {
      setIntersectionObserverConstructor(() => globalThis.IntersectionObserver)
    } else {
      // @ts-ignore
      import('intersection-observer').then(() => {
        setIntersectionObserverConstructor(() => globalThis.IntersectionObserver)
      })
    }
  }, [])

  return IntersectionObserverConstructor
}

export default useIntersectionObserver
