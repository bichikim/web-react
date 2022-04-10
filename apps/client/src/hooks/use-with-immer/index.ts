import {produce} from 'immer'
import {Dispatch, SetStateAction, useCallback} from 'react'

export type StateAndAction<T> = [T, Dispatch<SetStateAction<T>>]
export type GetStateAndAction<T> = [() => T, Dispatch<SetStateAction<T>>]
export type UseWithImmerReturn<T> = [T, (recipe: (draft: T) => void) => void ]
export type UseWithImmerReturnWithGet<T> = [() => T, (recipe: (draft: T) => void) => void ]

export function useWithImmer<T>(target: GetStateAndAction<T>): UseWithImmerReturnWithGet<T>
export function useWithImmer<T>(target: StateAndAction<T>): UseWithImmerReturn<T>
export function useWithImmer(target: any[]) {
  const [value, _setValue] = target
  const setValue = useCallback((recipe: (draft: any) => void) => {
    _setValue(
      produce<((draft: any) => void)>(recipe),
    )
  }, [])
  return [value, setValue]
}
