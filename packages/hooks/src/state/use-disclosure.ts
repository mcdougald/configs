import { useCallback, useState } from 'react'

/**
 * Manages a boolean open/closed state with stable open, close, and toggle handlers.
 *
 * https://github.com/pattern-ui/pattern/blob/7134432cc0/packages/pattern-hooks/src/use-disclosure/use-disclosure.ts
 * @param {boolean} [initial] - The initial open state. Defaults to `false`.
 * @returns {{ isOpen: boolean; open: () => void; close: () => void; toggle: () => void }} The current open state and handlers to control it.
 */
export const useDisclosure = (initial = false) => {
  const [isOpen, setIsOpen] = useState(initial)

  const open = useCallback(() => {
    setIsOpen(true)
  }, [])
  const close = useCallback(() => {
    setIsOpen(false)
  }, [])
  const toggle = useCallback(() => {
    setIsOpen((state) => !state)
  }, [])

  return { isOpen, open, close, toggle }
}
