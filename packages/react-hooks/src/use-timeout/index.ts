import {useCallback, useRef} from 'react'

const DEFAULT_WAIT = 200

/**
 * Debounced Set Function 과 Debounced clear function 을 반환 합니다
 * @param callback 기다린 후 호출합니다
 * @param wait 기다리는 시간 입니다
 */
export const useTimeout = (callback: (...args: any[]) => any, wait: number = DEFAULT_WAIT) => {
  const timeout = useRef<ReturnType<typeof setTimeout>>()
  const callbackRef = useRef(callback)
  callbackRef.current = callback

  const set = useCallback(
    (...args) => {
      if (timeout.current) {
        clearTimeout(timeout.current)
      }

      timeout.current = setTimeout(() => {
        callbackRef.current(...args)
      }, wait)
    },
    [wait],
  )

  const clear = useCallback(() => {
    if (timeout.current) {
      clearTimeout(timeout.current)
    }
  }, [])

  return [set, clear]
}
