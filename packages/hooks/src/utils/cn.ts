import type { cva } from 'class-variance-authority'

import { type ClassValue, clsx } from 'clsx'
import { isValidElement, type ReactElement, type ReactNode } from 'react'
import { twMerge } from 'tailwind-merge'

export type PickSelect<T, K extends keyof T> = T[K]
export type Without<T, U> = Partial<Record<Exclude<keyof T, keyof U>, never>>
export type XOR<T, U> = T | U extends object ? (T & Without<U, T>) | (U & Without<T, U>) : T | U

export type Anatomy = Record<string, ReturnType<typeof cva>>

// export type ComponentAnatomy<T extends Anatomy> = {
//     [K in keyof T as `${string & K}Class`]?: string
// }

export type ComponentAnatomy<T extends Anatomy> = {
  [K in keyof T as K extends 'root' ? never : `${K & string}Class`]?: string
}

/**
 * @param config
 * @example
 * const ComponentAnatomy = defineStyleAnatomy({
 *    label: cva(null, {
 *       variants: {
 *          intent: {
 *             "success": "",
 *             "alert": "",
 *          },
 *       },
 *    }),
 *    ...
 * })
 *
 * type ComponentProps = ComponentWithAnatomy<typeof ComponentAnatomy>
 *
 * const MyComponent = React.forwardRef((props, forwardedRef) => {
 *   const { controlClass, ...rest }: ComponentProps = props
 *
 *   return (
 *      <div
 *          className={cn(ComponentAnatomy.control({ intent: "success" }, controlClass))}
 *          ref={forwardedRef}
 *      />
 *   )
 * })
 */
export function defineStyleAnatomy<A extends Anatomy = Anatomy>(config: A) {
  return config
}

/**
 *
 * @param {...any} inputs
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 *
 * @param {...any} inputs
 */
export function cx(...inputs: ClassValue[]) {
  return clsx(...inputs)
}

/**
 * Checks if the given element is a React element.
 * @param element - The element to check.
 * @returns Whether the element is a React element.
 */
export const isReactElement = (element: ReactNode): element is ReactElement => {
  return isValidElement(element)
}

/**
 * Typeguard function that checks if the given element is a
 * React element with a className prop.
 * @param element
 * @returns Whether the element is a React element with a className prop.
 */
export const isElementWithClassName = (element: ReactNode): element is ReactElement<{ className?: string }> => {
  return (
    isValidElement(element) && typeof (element as ReactElement<{ className?: string }>).props.className === 'string'
  )
}

/**
 * Typeguard function that checks if the given element is a
 * React element with a children prop.
 * @param element
 * @returns Whether the element is a React element with a children prop.
 */
export const isElementWithChildren = (element: ReactNode): element is ReactElement<{ children?: ReactNode }> => {
  return isValidElement(element) && (element as ReactElement<{ children?: ReactNode }>).props.children !== undefined
}
