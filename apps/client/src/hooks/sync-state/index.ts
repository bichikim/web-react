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

export type UseSyncStateReturn<T extends NotFunction> = [T, Dispatch<SetStateAction<T>>]

export type UpdateStrategy = 'replace' | 'assign'

export interface UseSyncStateOptions<T> {
  /**
   * compare deep
   * @see react-fast-compare
   * @default false
   */
  deep?: boolean
  defaultValue?: T
  /**
   * how to update props changing
   * @default replace
   */
  updateStrategy?: UpdateStrategy
}
export const useSyncState = <T extends NotFunction>(
  props: FunctionValue<T>,
  options: UseSyncStateOptions<T> = {},
): UseSyncStateReturn<T> => {
  const {deep, defaultValue, updateStrategy} = options
  const _props = functionValue(props, defaultValue)
  const onSignal = useSignal()
  const prevPropValue = useRef<any>()
  const valueRef = useRef<any>(_props)
  const _compare = deep ? deepCompare : compare

  if (!_compare(_props, prevPropValue.current)) {
    if (typeof _props === 'object' && updateStrategy === 'assign') {
      valueRef.current = {
        ...valueRef.current,
        ..._props,
      }
    } else {
      valueRef.current = _props
    }

    prevPropValue.current = valueRef.current
  }

  const setValue = useCallback((value: T | ((value: T) => T)) => {
    if (typeof value === 'function') {
      valueRef.current = value(valueRef.current)
    } else {
      valueRef.current = value
    }
    onSignal()
  }, [])

  return [valueRef.current, setValue]
}
