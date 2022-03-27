import {useSignal} from '../signal'
import {FunctionValue, functionValue, NotFunction} from '../function-value'
import isEqual from 'react-fast-compare'
import {useRef} from 'react'

const compare = (value1: any, value2: any): boolean => {
  return Object.is(value1, value2)
}

const deepCompare = (value1: any, value2: any): boolean => {
  return isEqual(value1, value2)
}

export type UseSyncStateReturn<T extends NotFunction> = [T, (value: T) => unknown]

export const useSyncState = <T extends NotFunction>(
  value: FunctionValue<T>,
  deep: boolean = false,
): UseSyncStateReturn<T> => {
  const _value = functionValue(value)
  const onSignal = useSignal()
  const prevPropValue = useRef<T>(_value)
  const valueRef = useRef<T>(_value)
  const _compare = deep ? deepCompare : compare

  if (!_compare(_value, prevPropValue.current)) {
    valueRef.current = _value
    prevPropValue.current = _value
  }

  const setValue = (value: T) => {
    valueRef.current = value
    onSignal()
  }

  return [valueRef.current, setValue]
}
