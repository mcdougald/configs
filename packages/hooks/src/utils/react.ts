import {
  Children,
  type FC,
  isValidElement,
  type JSXElementConstructor,
  type PropsWithChildren,
  type ReactNode
} from 'react'

export const getChild = (
  Component: ReactNode
  // eslint-disable-next-line @typescript-eslint/no-explicit-any -- component props are unknown at this boundary; any matches React's JSXElementConstructor signature
): JSXElementConstructor<any> | null => {
  if (isValidElement(Component)) {
    const { type } = Component
    return typeof type === 'string' ? null : type
  }
  return null
}

export const findComponentInChildren = <T>(children: ReactNode, component: FC<PropsWithChildren<T>>): ReactNode => {
  // eslint-disable-next-line @eslint-react/no-children-to-array -- intentionally normalizing children to a flat array for lookup
  return Children.toArray(children).find((child) => getChild(child) === component)
}
