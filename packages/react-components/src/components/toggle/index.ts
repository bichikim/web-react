import {ReactElement} from 'react'

export interface ToggleProps {
  children?: ReactElement
  fallback?: ReactElement
  when?: boolean | undefined | null
}

export const Toggle = (props: ToggleProps): ReactElement => {
  if (props.when) {
    return props.children
  }
  return props.fallback ?? null
}
