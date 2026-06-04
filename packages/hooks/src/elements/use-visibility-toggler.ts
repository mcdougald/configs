import type { Dispatch, SetStateAction } from 'react'

import { useCallback, useEffect, useState } from 'react'

type RefType = { current: HTMLElement | null }

type VisibilityTogglerProps = {
  defaultState?: boolean
  refs: Array<HTMLElement | RefType>
}

/**
 *
 * @param root0
 * @param root0.defaultState
 * @param root0.refs
 */
export default function useVisibilityToggler({
  defaultState = false,
  refs
}: VisibilityTogglerProps): [boolean, Dispatch<SetStateAction<boolean>>] {
  const [isOpen, setIsOpen] = useState(defaultState)

  const handleChangePagePosition = useCallback(() => {
    setIsOpen(false)
  }, [])

  const handleMousedown = useCallback(
    ({ target }: MouseEvent) => {
      if (
        target instanceof Node &&
        !refs.some((ref) => {
          if (ref instanceof Node) return ref.contains(target)
          return ref.current && ref.current.contains(target)
        })
      ) {
        setIsOpen(false)
      }
    },
    [refs]
  )

  useEffect(() => {
    if (isOpen) {
      window.addEventListener('scroll', handleChangePagePosition)
      window.addEventListener('resize', handleChangePagePosition)
      globalThis.addEventListener('mousedown', handleMousedown)
    }

    return () => {
      window.removeEventListener('scroll', handleChangePagePosition)
      window.removeEventListener('resize', handleChangePagePosition)
      globalThis.removeEventListener('mousedown', handleMousedown)
    }
  }, [isOpen, handleChangePagePosition, handleMousedown])

  return [isOpen, setIsOpen]
}
