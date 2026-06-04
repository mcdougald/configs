import { QueryObserver, useQueryClient } from '@tanstack/react-query'
import { useEffect, useState } from 'react'

const useSubscribe = (key: Array<number | string>) => {
  const [state] = useState<unknown>(null)

  const client = useQueryClient()

  const observer = new QueryObserver(client, {
    queryKey: key
    // onSuccess: (data) => setstate(data),
  })

  useEffect(() => {
    // NOT WORKING
    console.log({ observer })
    // const unsubscribe = observer.subscribe()
    // return () => unsubscribe()
    // eslint-disable-next-line react-hooks/exhaustive-deps, @eslint-react/exhaustive-deps -- intentional: this effect should run only once on mount; `observer` is recreated every render and including it would cause the effect to re-run on every render
  }, [])

  return {
    state
  }
}
export { useSubscribe }
