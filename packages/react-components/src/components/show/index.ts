import {ReactElement} from 'react'

export interface ShowProps {
  children?: ReactElement
  fallback?: ReactElement
  when?: boolean | undefined | null
}

export const Show = (props: ShowProps): ReactElement => {
  if (props.when) {
    return props.children
  }
  return props.fallback ?? null
}
