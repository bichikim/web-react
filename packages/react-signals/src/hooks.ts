import {Dispatch, useEffect, useRef, useSyncExternalStore} from 'react'
import {getUndefined, Signal, untrack} from './utils'
import {effect, signal} from 'alien-signals'
import {useHandle, useOnce} from '@web-react/react-hooks'

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

export const useCreateSignal = <T>(initialValue: T) => {
  return useOnce(() => signal(initialValue))
}

export const useSignal = <T>(initialValue: T): [T, Dispatch<T | ((oldValue?: T) => T)>] => {
  const valueSignal = useCreateSignal(initialValue)
  return [useSignalValue(valueSignal), useSignalSetter(valueSignal)]
}

export const useSignalValue = <T>(valueSignal: Signal<T>): T => {
  return useSyncExternalStore(
    (onStoreChange) =>
      // return = unsubscribe
      effect(() => {
        // subscribe
        valueSignal()
        onStoreChange()
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
 * @param valueSignal signal
 * @returns
 */
export const useSignalSetter = <T>(valueSignal: Signal<T>): Dispatch<T | ((oldValue?: T) => T)> => {
  return useHandle((value: T | ((oldValue?: T) => T)) => {
    // update via updater function
    if (isFunction(value)) {
      const oldValue = untrack(() => valueSignal())
      valueSignal(value(oldValue))
      return
    }
    // update via value
    valueSignal(value)
  })
}
