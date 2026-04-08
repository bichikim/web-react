import {useEffect, useRef} from 'react'
import {getUndefined} from '../utils'

/**
 * 이전 값을 가져오고 리렌더링되면 리렌더링 이전 값을 유지 합니다
 * @param value
 * @returns
 */
export const usePrevValue = <T>(value: T): T | undefined => {
  const valueRef = useRef<T | null>(getUndefined())
  useEffect(() => {
    valueRef.current = value
  }, [value])
  return valueRef.current
}
