import {useCallback, useRef} from 'react'

/**
 * deps 와 상관없이 변경하지 않지만 변경된 대상 함수를 호출 합니다
 * @param handle
 */
export const useHandle = <Args extends any[], Return>(
  handle: (...args: Args) => Return,
): ((...args: Args) => Return) => {
  const handleRef = useRef<(...args: Args) => Return>(handle)
  handleRef.current = handle
  return useCallback(
    (...args: Args) => {
      return handleRef.current(...args)
    },
    [handleRef],
  )
}
