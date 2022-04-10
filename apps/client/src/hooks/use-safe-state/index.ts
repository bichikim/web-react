import {Dispatch, SetStateAction, useCallback, useRef, useState} from 'react'

export type useSafeStateReturn<S> = [() => S, Dispatch<SetStateAction<S>>]
export const useSafeState = <S>(initialState: S | (() => S)): useSafeStateReturn<S> => {
  const [state, setState] = useState(initialState)
  const stateRef = useRef(state)
  stateRef.current = state
  const getState = useCallback(() => {
    return stateRef.current
  }, [])
  return [getState, setState]
}
