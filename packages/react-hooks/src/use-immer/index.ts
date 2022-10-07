import {Draft, produce} from 'immer'
import {useCallback} from 'react'
import {freeze, FunctionValue, functionValue, NotFunction} from 'src/utils'
import {useCustomState} from 'src/use-custom-state'

export type Recipe<S extends NotFunction> = (arg: Draft<S>) => void

export type UpdateState<S extends NotFunction> = (recipe: Recipe<S>) => void

/**
 * immer 의 hook
 * @param initialState
 */
export const useImmer = <S extends NotFunction>(
  initialState: FunctionValue<S>,
): [S, UpdateState<S>] => {
  const [state, setState] = useCustomState(() => freeze(functionValue(initialState)))

  const updateState = useCallback(
    (recipe: Recipe<S>) => {
      setState(produce(recipe))
    },
    [setState],
  )

  return [state, updateState]
}
