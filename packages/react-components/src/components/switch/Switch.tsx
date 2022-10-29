import {Children} from 'src/types'
import {switchContext} from './use-switch'

export interface SwitchProps {
  children?: Children
  value: undefined | null | boolean | string | number
}

export const Switch = (props: SwitchProps) => {
  const {value, children} = props

  return <switchContext.Provider value={value}>{children}</switchContext.Provider>
}
