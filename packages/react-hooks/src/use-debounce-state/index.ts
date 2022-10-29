import {MaybeFunction, NotFunction} from 'src/utils'
import {Dispatch, useState} from 'react'
import {useTimeout} from '../use-timeout'

export const useDebounceState = <S extends NotFunction>(
  initialState: MaybeFunction<S>,
  wait?: number,
): [S, Dispatch<S>, () => void] => {
  const [state, setState] = useState(initialState)

  const [_setState, clear] = useTimeout(setState, wait)

  return [state, _setState, clear]
}
