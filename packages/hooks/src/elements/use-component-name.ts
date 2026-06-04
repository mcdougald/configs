import type { ComponentClass, ComponentType } from 'react'

const isClassReactComponent = (C: ComponentType): C is ComponentClass => !!C.prototype?.render

const getComponentName = (comp: ComponentType): string => {
  if (comp.displayName) {
    return comp.displayName
  }
  if (isClassReactComponent(comp)) {
    return comp.prototype.constructor.name
  }
  return comp.name || 'Component'
}

// eslint-disable-next-line @eslint-react/no-unnecessary-use-prefix -- intentional: public hook-style API name retained for backwards compatibility
const useComponentName = (comp: ComponentType) => {
  return getComponentName(comp)
}

export { getComponentName, isClassReactComponent, useComponentName }
