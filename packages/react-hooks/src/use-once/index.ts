import {useState} from 'react'

/**
 * 한번만 값을 가져오고 (함수면 한번만 실행) 리렌더링을 하더라고 처음 값을 유지 합니다
 * @param value
 * @returns
 */
export const useOnce = <T>(value: T | (() => T)): T => {
  const [onceValue] = useState(value)
  return onceValue
}
