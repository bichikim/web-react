import {Dispatch, MutableRefObject, RefObject, SetStateAction, useRef} from 'react'
import {useUpdate} from 'react-use'
import {useHandle} from 'src/use-handle'
import {MaybeFunction, toValue} from 'src/utils'

const {is} = Object

export const useSync = <S>(
  value: S,
  isEqual?: (a: S, b: S) => boolean,
  updateCallback?: (value: S) => void,
): MutableRefObject<S> => {
  const _isEqual = isEqual ?? is
  const prevValue = useRef<S>(value)
  const stateRef = useRef<S>(value)

  if (!_isEqual(prevValue.current, value)) {
    prevValue.current = value
    stateRef.current = value
    updateCallback?.(value)
  }

  return stateRef
}

export const useSyncSet = <S>(
  value: S,
  isEqual?: (a: S, b: S) => boolean,
  setCallback?: (value: S) => void,
  updatedValueCallback?: (value: S) => void,
): [RefObject<S>, Dispatch<SetStateAction<S>>] => {
  const _isEqual = isEqual ?? is
  const stateRef = useSync(value, _isEqual, updatedValueCallback)
  const set = useHandle((state: MaybeFunction<S>) => {
    const value = toValue(state, [stateRef.current])
    if (_isEqual(stateRef.current, value)) {
      return
    }
    stateRef.current = value
    setCallback?.(value)
  })

  return [stateRef, set]
}

/**
 * props 와 setState 중 하나의 변경 점을 반환 합니다
 * @param value
 * @param isEqual
 */
export const useSyncState = <S>(
  value: S,
  isEqual?: (a: S, b: S) => boolean,
): [RefObject<S>, Dispatch<SetStateAction<S>>] => {
  const update = useUpdate()
  return useSyncSet(value, isEqual, update)
}
