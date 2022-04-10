import {useCallback, useState} from 'react'
export const useSignal = () => {
  const [, setSignal] = useState(false)

  return useCallback(() => {
    setSignal((signal) => !signal)
  }, [])
}
