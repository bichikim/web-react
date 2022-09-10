import {useRef, useState} from 'react'
import defaultIsEqual from 'react-fast-compare'
import {useDebounce} from 'react-use'

/**
 * 오브젝트 내용 값이 1개라도 변경 되지 않았다면 새 오브젝트를 만들지 않습니다
 * @param target
 * @param isEqual
 */
export const useCompareUpdate = <T>(
  target: T,
  isEqual: (a: any, b: any) => boolean = defaultIsEqual,
) => {
  const valueRef = useRef<T>()
  if (valueRef.current && isEqual(valueRef.current, target)) {
    return valueRef.current
  }
  valueRef.current = target
  return valueRef.current
}

const DEFAULT_WAIT = 75

/**
 * 실험 기능 입니다 사용하지 마세요
 * setTimeout 을 사용하는 debounce 로 비교 로직을 싱행하여 랜더링 프로세스를 방해 하지 않기위한 생각 + debounce 로 너무 많이 일어난 값은 변경 확인 지연
 */
export const useAsyncFastCompare = (
  target,
  isEqual: (a: any, b: any) => boolean = defaultIsEqual,
  wait: number = DEFAULT_WAIT,
) => {
  const [value, setValue] = useState(target)

  useDebounce(
    () => {
      console.log('called')
      if (isEqual(value, target)) {
        setValue(target)
      }
    },
    wait,
    [target],
  )

  return value
}
