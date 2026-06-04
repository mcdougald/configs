import type { RefObject, SVGProps } from 'react'

export type ReactSvgProps = SVGProps<SVGSVGElement>

export type ReactElementOrRef<TElement extends Element | HTMLElement | null = Element | HTMLElement | null> =
  | null
  | RefObject<TElement>
  | TElement
  | undefined

/**
 * Determines whether an element (or ref) overflows vertically.
 * @param {unknown} element - An `HTMLElement`, a ref-like object, or any other value.
 * @returns {boolean} `true` when the element overflows on the Y axis.
 */
export function elementHasOverflowY(element?: unknown): boolean {
  return elementHasOverflow(element).hasOverflowY
}

/**
 * Determines whether an element (or ref) overflows horizontally.
 * @param {unknown} element - An `HTMLElement`, a ref-like object, or any other value.
 * @returns {boolean} `true` when the element overflows on the X axis.
 */
export function elementHasOverflowX(element?: unknown): boolean {
  return elementHasOverflow(element).hasOverflowX
}

/**
 * Determines whether an element (or ref) overflows on either axis.
 * @param {unknown} element - An `HTMLElement`, a ref-like object, or any other value.
 * @returns {{ hasOverflowX: boolean; hasOverflowY: boolean }} The overflow state for each axis.
 */
export function elementHasOverflow(element?: unknown): {
  hasOverflowX: boolean
  hasOverflowY: boolean
} {
  const resolveElement = () => {
    if (element && typeof element === 'object' && 'current' in element) {
      return element.current as HTMLElement
    }
    return element
  }

  const el = resolveElement()

  if (el instanceof HTMLElement) {
    return {
      hasOverflowY: el.scrollHeight > el.clientHeight,
      hasOverflowX: el.scrollWidth > el.clientWidth
    }
  }
  return { hasOverflowY: false, hasOverflowX: false }
}

/**
 * Calculates whether the given element overflows on either axis.
 * @param {object} root0 - The argument object.
 * @param {HTMLElement | null | undefined} root0.element - The element to measure.
 * @param {boolean} root0.width - Reserved flag (currently unused) for axis selection.
 * @returns {boolean} `true` when the element overflows on either axis.
 */
export function calculateOverflow({ element }: { element?: HTMLElement | null; width: boolean }): boolean {
  if (element instanceof HTMLElement) {
    return element.scrollHeight > element.clientHeight || element.scrollWidth > element.clientWidth
  }
  return false
}

/**
 * Resolves a DOM element from either a direct element or a React ref object.
 * @param {ReactElementOrRef<TElement>} elementOrRef - An element, a ref object, `null`, or `undefined`.
 * @returns {TElement | undefined | null} The resolved element, or `undefined`/`null` when unavailable.
 */
export function getElement<TElement extends Element | HTMLElement | null>(elementOrRef: ReactElementOrRef<TElement>) {
  if (!elementOrRef) return

  if (elementOrRef instanceof HTMLElement || elementOrRef instanceof Element) {
    return elementOrRef
  }

  return elementOrRef.current
}

/**
 * Detects whether the code is running in a browser-like environment with DOM access.
 * @returns {boolean} `true` when `window` and `document` are available.
 */
export default function canUseDom(): boolean {
  return typeof window !== 'undefined' && typeof document !== 'undefined'
}
