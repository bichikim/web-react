import {Ref, UseEffect, UseRef} from 'src/types'
import {useEffect, useRef} from 'react.tmp'

export interface CreateIsFirstParts {
  useEffect: UseEffect
  useRef: UseRef
}

export type UseIsFirst = () => Ref<boolean>

export const useIsFirst: UseIsFirst = (): Ref<boolean> => {
  const isFirst = useRef(true)

  useEffect(() => {
    isFirst.current = false
  }, [])

  return isFirst
}
