import {Dispatch, useCallback, useEffect, useRef, useState, useSyncExternalStore} from 'react'
import {Signal, untrack} from './utils'
import {effect, signal} from 'alien-signals'

export const useOnce = <T>(value: T | (() => T)): T => {
  const [onceValue] = useState(value)
  return onceValue
}

export const usePrevValue = <T>(value: T): T | undefined => {
  const valueRef = useRef<T | undefined>()
  useEffect(() => {
    valueRef.current = value
  }, [value])
  return valueRef.current
}

export const useCreateSignal = <T>(initialValue: T) => {
  return useOnce(() => signal(initialValue))
}

export const useSignal = <T>(initialValue: T): [T, Dispatch<T | ((oldValue?: T) => T)>] => {
  const valueSignal = useCreateSignal(initialValue)
  return [useSignalValue(valueSignal), useSignalSetter(valueSignal)]
}

export const useSignalValue = <T>(valueSignal: Signal<T>): T => {
  return useSyncExternalStore(
    (callback) =>
      // return = unsubscribe
      effect(() => {
        // subscribe
        valueSignal()
        callback()
      }),
    () => untrack(() => valueSignal()),
    () => untrack(() => valueSignal()),
  )
}

const isFunction = (value: any): value is (...args: any[]) => any => {
  return typeof value === 'function'
}

/**
 *
 * @param valueSignal signal (리렌더링에 새로운 값을 주면 안됩니다)
 * @returns
 */
export const useSignalSetter = <T>(valueSignal: Signal<T>): Dispatch<T | ((oldValue?: T) => T)> => {
  return useCallback(
    (value: T | ((oldValue?: T) => T)) => {
      if (isFunction(value)) {
        const oldValue = untrack(() => valueSignal())
        valueSignal(value(oldValue))
        return
      }
      valueSignal(value)
    },
    [valueSignal],
  )
}
