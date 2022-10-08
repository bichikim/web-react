import {functionValue, FunctionValue, NotFunction} from 'src/utils'
import {produce} from 'immer'
import {RefObject, useCallback, useRef} from 'react'
import {Recipe, UpdateState} from '../use-immer'

export const useRefImmer = <S extends NotFunction>(
  initialState: FunctionValue<S>,
): [RefObject<S>, UpdateState<S>] => {
  const stateRef = useRef(functionValue(initialState))

  const setState = useCallback((state) => {
    stateRef.current = state(stateRef.current)
  }, [])

  const updateState = useCallback(
    (recipe: Recipe<S>) => {
      setState(produce(recipe))
    },
    [setState],
  )

  return [stateRef, updateState]
}
