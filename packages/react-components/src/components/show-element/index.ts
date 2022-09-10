import {createElement as h, ReactElement} from 'react'

export interface ShowProps {
  children?: ReactElement
  when?: boolean | undefined | null
}

export const ShowElement = (props: ShowProps): ReactElement => {
  const {when, children} = props

  return h(
    'div',
    {
      style: {visibility: when ? 'collapse' : 'visible'},
    },
    children,
  )
}
