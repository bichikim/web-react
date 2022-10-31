import {useEffect, useRef, useState} from 'react'

const DEFAULT_DURATION = 100

export interface UseIntervalWheelProps {
  /**
   * 새로 추가되는 시간 간격
   * @default 100
   */
  duration?: number
  /**
   * 반복 여부
   */
  repeat?: boolean
  /**
   * 처음 시작하는 데이터 길이
   * @default 0
   */
  start?: number
  /**
   * 0 보다 크며 정수
   * @default 1
   */
  step?: number
}

export const useIntervalWheel = (list: any[], options: UseIntervalWheelProps = {}) => {
  const {repeat, start = 0, step = 1, duration = DEFAULT_DURATION} = options
  const listRef = useRef([...list])
  const [state, setState] = useState(() => listRef.current.splice(0, start))

  useEffect(() => {
    const flag = setInterval(() => {
      const [item] = listRef.current.splice(0, step)
      if (!item) {
        if (repeat) {
          listRef.current = [...list]
          setState(() => listRef.current.splice(0, start))
          return
        }
        clearInterval(flag)
        return
      }
      setState((state) => {
        return [...state, item]
      })
    }, duration)
    return () => {
      clearInterval(flag)
    }
  }, [listRef, duration, repeat, list, step, start])

  return state
}
