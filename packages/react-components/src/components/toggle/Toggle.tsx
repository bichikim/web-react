import {Children} from 'src/types'

export interface ToggleProps {
  children?: Children
  fallback?: Children
  when?: boolean | undefined | null
}

export const Toggle = (props: ToggleProps) => {
  if (props.when) {
    return <>{props.children}</>
  }
  return <>{props.fallback ?? null}</>
}
