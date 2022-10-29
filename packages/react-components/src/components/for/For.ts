import {createElement, Fragment, ReactElement} from 'react'
import {FunctionChildren} from 'src/types'

export type FunctionLoopChildrenWithProps<Props> = FunctionChildren<
  [Props, number, readonly Props[]]
>

export interface ForProps<T = any> {
  children?: FunctionLoopChildrenWithProps<T>
  each?: readonly T[]
  fallback?: ReactElement
}

export const For = <T>(props: ForProps<T>): ReactElement => {
  const {children, each = [], fallback} = props

  if (each.length === 0) {
    return fallback
  }

  return (
    children &&
    createElement(
      Fragment,
      {},
      each.map((item, index, list: readonly T[]) => {
        return children(item, index, list)
      }),
    )
  )
}
