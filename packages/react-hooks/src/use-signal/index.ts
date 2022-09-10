import {useCallback, useState} from 'react'

/**
 * react-use 의 useUpdate 를 사용하세요
 * @deprecated
 */
export const useSignal = () => {
  const [, setSignal] = useState(false)

  return useCallback(() => {
    setSignal((signal) => !signal)
  }, [])
}
