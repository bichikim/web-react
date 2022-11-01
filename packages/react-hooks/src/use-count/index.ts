import {useEffect, useRef} from 'react'

export const useCount = (runner: (count: number) => any) => {
  const count = useRef(0)

  useEffect(() => {
    count.current += 1
  })

  return runner(count.current)
}
