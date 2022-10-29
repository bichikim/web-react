import {Dispatch, SetStateAction, useRef} from 'react'
import {useUpdate} from 'react-use'
import {useHandle} from 'src/use-handle'
import {MaybeFunction, toValue} from 'src/utils'

const {is} = Object

/**
 * props 와 setState 중 하나의 변경 점을 반환 합니다
 * @param value
 * @param isEqual
 */
export const useSyncState = <S>(
  value: MaybeFunction<S>,
  isEqual?: (a: S, b: S) => boolean,
): [S, Dispatch<SetStateAction<S>>] => {
  const _isEqual = isEqual ?? is
  const _value = toValue(value)
  const update = useUpdate()
  const prevValue = useRef<S>(_value)
  const stateRef = useRef<S>(_value)

  if (!_isEqual(prevValue.current, _value)) {
    prevValue.current = _value
    stateRef.current = _value
  }

  const set = useHandle((state: MaybeFunction<S>) => {
    const value = toValue(state, [stateRef.current])
    if (_isEqual(stateRef.current, value)) {
      return
    }
    stateRef.current = value
    update()
  })

  return [stateRef.current, set]
}
