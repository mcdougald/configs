import { useLayoutEffect, useState } from 'react'

export const useWindowResize = (): number[] => {
  const [size, setSize] = useState([0, 0])

  useLayoutEffect(() => {
    /**
     *
     */
    function updateSize() {
      // eslint-disable-next-line @eslint-react/set-state-in-effect -- intentional: resize handler must sync size state from the browser window
      setSize([window.innerWidth, window.innerHeight])
    }

    window.addEventListener('resize', updateSize)
    updateSize()

    return () => {
      window.removeEventListener('resize', updateSize)
    }
  }, [])

  return size
}
