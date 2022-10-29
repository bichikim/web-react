import {switchContext, SwitchValue, useSwitch} from './use-switch'
import {Children} from 'src/types'

export interface ConditionProps {
  children?: Children
  when: SwitchValue
}
export const Condition = (props: ConditionProps) => {
  const {when, children} = props

  const isShow = useSwitch(when)

  return <switchContext.Provider value={null}>{isShow ? children : null}</switchContext.Provider>
}
