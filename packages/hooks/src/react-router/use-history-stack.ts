import { useEffect, useState } from 'react'
import { NavigationType, useLocation, useNavigationType } from 'react-router-dom'

export const useHistoryStack = (): string[] => {
  const [stack, setStack] = useState<string[]>([])
  const { pathname } = useLocation()
  const type = useNavigationType()

  useEffect(() => {
    if (type === NavigationType.Pop) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- intentional: syncing the local history stack to external react-router navigation events
      setStack((prev) => prev.slice(0, -1))
    } else if (type === NavigationType.Push) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- intentional: syncing the local history stack to external react-router navigation events
      setStack((prev) => [...prev, pathname])
    } else {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- intentional: syncing the local history stack to external react-router navigation events
      setStack((prev) => [...prev.slice(0, -1), pathname])
    }
  }, [pathname, type])

  return stack
}
