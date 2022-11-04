import {Children} from 'src/types'
import {switchContext} from './use-switch'
import {useMemo} from 'react'

export interface SwitchProps {
  children?: Children
  value: undefined | null | boolean | string | number
}

export const Switch = (props: SwitchProps) => {
  const {value, children} = props

  const context = useMemo(() => {
    return {
      hasCondition: false,
      value,
    }
  }, [value])

  return <switchContext.Provider value={context}>{children}</switchContext.Provider>
}
