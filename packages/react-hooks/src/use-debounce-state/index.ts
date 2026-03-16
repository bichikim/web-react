import {Dispatch, useState} from 'react'
import {useTimeout} from '../use-timeout'

export const useDebounceState = <S>(
  initialState: S,
  wait?: number,
): [S, Dispatch<S>, () => void] => {
  const [state, setState] = useState(initialState)

  const [_setState, clear] = useTimeout(setState, wait)

  return [state, _setState, clear]
}
