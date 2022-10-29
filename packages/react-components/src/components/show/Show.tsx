import {Children, cloneElement, isValidElement, ReactElement, ReactNode} from 'react'

export interface ShowProps {
  children?: ReactNode
  when?: boolean | undefined | null | string | number
}

export const Show = (props: ShowProps): ReactElement => {
  const {when, children} = props

  return (
    <>
      {Children.toArray(children).map((child) => {
        if (isValidElement(child)) {
          return cloneElement(child, {style: when ? undefined : {display: 'none'}})
        }
        return child
      })}
    </>
  )
}
