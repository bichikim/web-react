import {useCallback, useRef} from 'react'
export type HandleFn<P, Args extends any[] = any[], R = any> = (props: P, ...args: Args) => R

export const useHandle = <P, Args extends any[] = any[], R = any>(
  fn: HandleFn<P, Args, R>,
  props: P,
): ((...args: Args) => R) => {
  const propsRef = useRef<any>()
  propsRef.current = props
  const functionRef = useRef<any>()
  functionRef.current = fn

  return useCallback((...args) => {
    return functionRef.current(propsRef.current, ...args)
  }, [])
}
