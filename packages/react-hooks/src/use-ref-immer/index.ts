import {MaybeFunction, NotFunction} from 'src/utils'
import {produce} from 'immer'
import {RefObject, useCallback} from 'react'
import {Recipe, UpdateState} from '../use-immer'
import {useRef} from 'src/use-ref'

export const useRefImmer = <S extends NotFunction>(
  initialState: MaybeFunction<S>,
): [RefObject<S>, UpdateState<S>] => {
  const stateRef = useRef(initialState)

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
