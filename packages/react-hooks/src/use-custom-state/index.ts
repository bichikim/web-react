import {MaybeFunction, toValue} from 'src/utils'
import {SetStateAction, useState} from 'react'
import {useHandle} from 'src/use-handle'

const {is} = Object
export type Dispatch<A> = (value: A, set?: boolean) => void

/**
 * 비교 연산 후 비교 연산이 false 면 아무것도 업데이트 되지 않는다 (setState 를 호출 안한다)
 * @return [get] get 이 함수인 이유는 useState 를 작동하지 않는 로직이 있기 때문 입니다
 * @param initialState
 * @param isEqual
 */
export const useCustomState = <S>(
  initialState: MaybeFunction<S>,
  isEqual?: (a, b) => boolean,
): [S, Dispatch<SetStateAction<S>>] => {
  const [state, setState] = useState(initialState)
  const _isEqual = isEqual ?? is

  /**
   * 비교 연산후 true 면 setState 를 실행 합니다
   */
  const updateRef = useHandle((patch: MaybeFunction<S>) => {
    const value = toValue(patch, [state])
    if (_isEqual(state, value)) {
      return
    }
    setState(value)
  })

  return [state, updateRef]
}
