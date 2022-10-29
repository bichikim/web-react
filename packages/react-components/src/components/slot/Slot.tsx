import {slotsContext, useSlot} from './use-slots'
import {Children, FunctionChildren} from 'src/types'

export interface SlotProps {
  children: Children | FunctionChildren
  name: string
}

export const Slot = (props: SlotProps) => {
  const {name, children} = props
  const slot = useSlot(name)

  if (!slot) {
    return null
  }

  if (typeof children === 'function') {
    return <slotsContext.Provider value={null}>{children(...slot)}</slotsContext.Provider>
  }

  return <slotsContext.Provider value={null}>{children}</slotsContext.Provider>
}
