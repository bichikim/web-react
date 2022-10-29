import {slotsContext} from './use-slots'

export type SlotsProps = Record<number | string, undefined | any[]>

export const Slots = (props: SlotsProps) => {
  return <slotsContext.Provider value={props}></slotsContext.Provider>
}
