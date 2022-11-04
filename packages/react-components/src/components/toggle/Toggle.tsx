import {toArray} from '@winter-love/utils'
import {ReactNode} from 'react'
import {FunctionChildren} from 'src/types'

export interface ToggleProps {
  children?: (ReactNode | FunctionChildren)[]
  fallback?: ReactNode
  when?: any
}

export const Toggle = (props: ToggleProps) => {
  if (props.when) {
    return (
      <>
        {toArray<any>(props.children).map((child) => {
          if (typeof child === 'function') {
            return child()
          }
          return child
        })}
      </>
    )
  }

  return <>{props.fallback ?? null}</>
}
