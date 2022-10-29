import {Ref, UseEffect, UseRef} from 'src/types'
import {useEffect, useRef} from 'react.tmp'

export interface CreatePrevValueParts {
  useEffect: UseEffect
  useRef: UseRef
}

export type UsePrevValue = <T>(value: T) => Ref<T | null>

export const usePrevValue: UsePrevValue = <T>(value: T): Ref<T | null> => {
  const prevRef = useRef<any>(null)

  useEffect(() => {
    prevRef.current = value
  }, [value])

  return prevRef
}
