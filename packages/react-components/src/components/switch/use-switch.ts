import {createContext, useContext} from 'react'
import {BooleanAble} from 'src/types'

export type SwitchValue = BooleanAble
export type SwitchContext = SwitchValue

export const switchContext = createContext<SwitchContext>(null)

export const useSwitch = (value: SwitchValue) => {
  const context = useContext(switchContext)
  return Object.is(value, context)
}
