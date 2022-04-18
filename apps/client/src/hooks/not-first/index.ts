import {useRef} from 'react'

export const useNotFirst = <T>(handle: () => any): T | undefined => {
  const flag = useRef(false)
  const result = useRef<T>()
  if (flag.current) {
    result.current = handle()
  } else {
    flag.current = true
  }
  return result.current
}
