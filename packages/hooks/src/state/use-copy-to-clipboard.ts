import { useCallback, useState } from 'react'
import { toast } from 'sonner'

/**
 * Copies text to the clipboard and tracks the most recently copied value, with an
 * optional auto-reset timeout and success toast.
 * @returns {{ text: string | null; copy: (value: string, options?: { timeout?: number; withToast?: boolean }) => Promise<boolean>; isCopied: boolean }} The last copied text, a copy function, and whether a value is currently considered copied.
 */
export function useCopyToClipboard() {
  const [text, setText] = useState<null | string>(null)

  const copy = useCallback(async (value: string, options: { timeout?: number; withToast?: boolean } = {}) => {
    const { timeout = 3000, withToast = false } = options

    // navigator.clipboard is undefined outside of secure contexts, despite the DOM types
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition -- runtime guard: clipboard is unavailable in non-secure contexts even though the type is non-nullable
    if (!navigator.clipboard) {
      console.warn('Clipboard not supported')
      return false
    }

    try {
      await navigator.clipboard.writeText(value)
      setText(value)

      if (timeout) {
        setTimeout(() => {
          setText(null)
        }, timeout)
      }

      if (withToast) {
        toast.success('Copied to clipboard')
      }

      return true
    } catch (error) {
      console.warn('Copy failed', error)
      setText(null)
      return false
    }
  }, [])

  return { text, copy, isCopied: text !== null }
}
