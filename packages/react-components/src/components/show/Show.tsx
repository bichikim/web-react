import {Fragment, type ReactElement, type ReactNode} from 'react'

export interface ShowProps {
  children?: ReactNode
  when?: boolean | undefined | null | string | number
}

export const Show = (props: ShowProps): ReactElement => {
  const {when, children} = props

  if (!when) {
    return <Fragment />
  }

  return <>{children}</>
}
