import {useCallback, useRef} from 'react'
export const useHandle = (handle: any) => {
  const call = useRef(handle)
  call.current = handle
  return useCallback((...args) => {
    const _call = call.current
    if (typeof _call === 'function') {
      return _call(...args)
    }
  }, [])
}
