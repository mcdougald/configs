import type { RefObject, SVGProps } from 'react'

export type ReactSvgProps = SVGProps<SVGSVGElement>

export type ReactElementOrRef<TElement extends Element | HTMLElement | null = Element | HTMLElement | null> =
  | null
  | RefObject<TElement>
  | TElement
  | undefined

/**
 *
 * @param element
 */
export function elementHasOverflowY(element?: HTMLElement | unknown): boolean {
  return elementHasOverflow(element).hasOverflowY
}

/**
 *
 * @param element
 */
export function elementHasOverflowX(element?: HTMLElement | unknown): boolean {
  return elementHasOverflow(element).hasOverflowX
}

/**
 *
 * @param element
 */
export function elementHasOverflow(element?: HTMLElement | unknown): {
  hasOverflowX: boolean
  hasOverflowY: boolean
} {
  const getElement = () => {
    if (element && typeof element === 'object' && 'current' in element) {
      return element.current as HTMLElement
    }
    return element
  }

  const el = getElement()

  if (el instanceof HTMLElement) {
    return {
      hasOverflowY: el.scrollHeight > el.clientHeight,
      hasOverflowX: el.scrollWidth > el.clientWidth
    }
  }
  return { hasOverflowY: false, hasOverflowX: false }
}

/**
 *
 * @param root0
 * @param root0.element
 * @param root0.width
 */
export function calculateOverflow({ element }: { element?: HTMLElement | null; width: boolean }): boolean {
  if (element instanceof HTMLElement) {
    return element.scrollHeight > element.clientHeight || element.scrollWidth > element.clientWidth
  }
  return false
}

/**
 *
 * @param elementOrRef
 */
export function getElement<TElement extends Element | HTMLElement | null>(elementOrRef: ReactElementOrRef<TElement>) {
  if (!elementOrRef) return

  if (elementOrRef instanceof HTMLElement || elementOrRef instanceof Element) {
    return elementOrRef
  }

  return elementOrRef.current
}

/**
 *
 */
export default function canUseDom(): boolean {
  return !!(globalThis.window !== undefined && globalThis.document && globalThis.document.createElement)
}
