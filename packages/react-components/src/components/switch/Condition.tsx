import {switchContext, SwitchValue, useSwitch} from './use-switch'
import {Children, SWITCH_DEFAULT} from 'src/types'

export interface ConditionProps {
  children?: Children
  when: SwitchValue
}
export const Condition = (props: ConditionProps) => {
  const {when, children} = props

  const isShow = useSwitch(when)

  return <switchContext.Provider value={null}>{isShow ? children : null}</switchContext.Provider>
}

export interface DefaultConditionProps {
  children?: Children
}

export const DefaultCondition = (props: DefaultConditionProps) => {
  const {children} = props

  const isShow = useSwitch(SWITCH_DEFAULT)

  return <switchContext.Provider value={null}>{isShow ? children : null}</switchContext.Provider>
}
