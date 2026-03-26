import {Draft, produce} from 'immer'
import {useCallback} from 'react'
import {executeWithAny, freeze} from '@web-react/utils'
import {useCustomState} from 'src/use-custom-state'

export type Recipe<S> = (arg: Draft<S>) => void

export type UpdateState<S> = (recipe: Recipe<S>) => void

/**
 * immer 의 hook
 * @param initialState
 */
export const useImmer = <S>(initialState: S): [S, UpdateState<S>] => {
  const [state, setState] = useCustomState(() => freeze(executeWithAny(initialState, [])))

  const updateState = useCallback(
    (recipe: Recipe<S>) => {
      setState(produce(recipe))
    },
    [setState],
  )

  return [state, updateState]
}
