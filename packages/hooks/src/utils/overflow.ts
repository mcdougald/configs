import { type RefObject } from 'react'

import { getElement } from './html'

export interface OverflowData {
  hasOverflow: boolean
  hasOverflowX: boolean
  hasOverflowY: boolean
  isScrollAtBottomBoundary: boolean
  isScrollAtLeftBoundary: boolean
  isScrollAtRightBoundary: boolean
  isScrollAtTopBoundary: boolean
  isScrollAtXBoundary: boolean
  isScrollAtYBoundary: boolean
}

/**
 * Computes overflow and scroll-boundary information for an element or ref.
 * @param {HTMLElement | null | RefObject<HTMLElement>} elementRef - The element or ref to inspect.
 * @returns {OverflowData} Overflow flags and scroll-boundary state for the element.
 */
export function getOverflowData(elementRef?: HTMLElement | null | RefObject<HTMLElement>): OverflowData {
  const element = getElement(elementRef)

  const {
    scrollWidth = Number.NaN,
    scrollHeight = Number.NaN,
    scrollTop = Number.NaN,
    scrollLeft = Number.NaN,
    clientWidth = Number.NaN,
    clientHeight = Number.NaN
  } = element ?? {}

  const hasOverflowX = scrollWidth > clientWidth

  const hasOverflowY = scrollHeight > clientHeight

  const hasOverflow = hasOverflowX || hasOverflowY

  const isScrollAtTopBoundary = scrollTop === 0

  const isScrollAtBottomBoundary = scrollHeight - scrollTop === clientHeight

  const isScrollAtLeftBoundary = scrollLeft === 0

  const isScrollAtRightBoundary = scrollWidth - scrollLeft === clientWidth

  const isScrollAtXBoundary = isScrollAtLeftBoundary && isScrollAtRightBoundary

  const isScrollAtYBoundary = isScrollAtTopBoundary && isScrollAtBottomBoundary

  return {
    hasOverflowX,
    hasOverflowY,
    hasOverflow,
    isScrollAtTopBoundary,
    isScrollAtBottomBoundary,
    isScrollAtLeftBoundary,
    isScrollAtRightBoundary,
    isScrollAtXBoundary,
    isScrollAtYBoundary
  }
}
