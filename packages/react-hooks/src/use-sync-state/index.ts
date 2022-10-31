import {Dispatch, SetStateAction, useCallback, useRef} from 'react'
import {useUpdate} from 'react-use'
import {useHandle} from 'src/use-handle'
import {MaybeFunction, toValue} from 'src/utils'

const {is} = Object

export const useSync = <S>(
  value: S,
  isEqual?: (a: S, b: S) => boolean,
  callback?: (value: S) => void,
): [() => S, Dispatch<SetStateAction<S>>] => {
  const _isEqual = isEqual ?? is
  const prevValue = useRef<S>(value)
  const stateRef = useRef<S>(value)

  if (!_isEqual(prevValue.current, value)) {
    prevValue.current = value
    stateRef.current = value
  }

  const set = useHandle((state: MaybeFunction<S>) => {
    const value = toValue(state, [stateRef.current])
    if (_isEqual(stateRef.current, value)) {
      return
    }
    stateRef.current = value
    callback?.(value)
  })

  const get = useCallback(() => {
    return stateRef.current
  }, [])

  return [get, set]
}

/**
 * props 와 setState 중 하나의 변경 점을 반환 합니다
 * @param value
 * @param isEqual
 */
export const useSyncState = <S>(
  value: S,
  isEqual?: (a: S, b: S) => boolean,
): [S, Dispatch<SetStateAction<S>>] => {
  const update = useUpdate()
  const [get, set] = useSync(value, isEqual, update)
  return [get(), set]
}
