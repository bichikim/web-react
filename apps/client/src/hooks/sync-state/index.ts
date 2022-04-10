import {useSignal} from '../signal'
import {FunctionValue, functionValue, NotFunction} from '../function-value'
import isEqual from 'react-fast-compare'
import {Dispatch, SetStateAction, useCallback, useRef} from 'react'

const compare = (value1: any, value2: any): boolean => {
  return Object.is(value1, value2)
}

const deepCompare = (value1: any, value2: any): boolean => {
  return isEqual(value1, value2)
}

export type UseSyncStateReturn<T extends NotFunction> = [() => T, Dispatch<SetStateAction<T>>]
export interface UseSyncStateOptions<T> {
  /**
   * @default false
   */
  deep?: boolean
  defaultValue?: T
}
export const useSyncState = <T extends NotFunction>(
  value: FunctionValue<T>,
  options: UseSyncStateOptions<T> = {},
): UseSyncStateReturn<T> => {
  const {deep, defaultValue} = options
  const _value = functionValue(value, defaultValue)
  const onSignal = useSignal()
  const prevPropValue = useRef<T>(_value)
  const valueRef = useRef<T>(_value)
  const _compare = deep ? deepCompare : compare

  const getValue = useCallback(() => {
    return valueRef.current
  }, [])

  if (!_compare(_value, prevPropValue.current)) {
    valueRef.current = _value
    prevPropValue.current = _value
  }

  const setValue = useCallback((value: T | ((value: T) => T)) => {
    if (typeof value === 'function') {
      valueRef.current = value(valueRef.current)
    } else {
      valueRef.current = value
    }
    onSignal()
  }, [])

  return [getValue, setValue]
}
