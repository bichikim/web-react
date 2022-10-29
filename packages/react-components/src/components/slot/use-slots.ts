import {createContext, useContext} from 'react'

export type SlotsContext = Record<string | number, undefined | any[]>
export const slotsContext = createContext(null)

export const useSlot = (name: string | number): undefined | any[] => {
  const slots = useContext(slotsContext)

  return Reflect.get(slots, name)
}
