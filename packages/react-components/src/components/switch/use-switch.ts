import {createContext, useContext} from 'react'
import {BooleanAble, SWITCH_DEFAULT} from 'src/types'

export type SwitchValue = BooleanAble
export type SwitchContext = {
  hasCondition: boolean
  value: SwitchValue
}

export const switchContext = createContext<SwitchContext>(null)

export const useSwitch = (value: SwitchValue) => {
  const context = useContext(switchContext)
  if (value === SWITCH_DEFAULT && !context.hasCondition) {
    return true
  }
  const isShow = Object.is(value, context.value)

  if (isShow) {
    context.hasCondition = true
  }

  return isShow
}
