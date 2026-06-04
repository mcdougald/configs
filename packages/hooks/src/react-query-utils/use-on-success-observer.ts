import { QueryObserver, useQueryClient } from '@tanstack/react-query'
import { useEffect, useState } from 'react'

const useSubscribe = (key: Array<number | string>) => {
  const [state] = useState<any>(null)

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
  }, [])

  return {
    state
  }
}
export { useSubscribe }
