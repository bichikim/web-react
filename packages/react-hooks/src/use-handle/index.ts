import {useCallback, useRef} from 'react'

/**
 * deps 와 상관없이 변경하지 않지만 변경된 대상 함수를 호출 합니다
 * @param handle
 */
export const useHandle = (handle: any) => {
  const handleRef = useRef(handle)
  handleRef.current = handle
  return useCallback((...args) => {
    const handle = handleRef.current
    if (typeof handle === 'function') {
      return handle(...args)
    }
  }, [])
}
