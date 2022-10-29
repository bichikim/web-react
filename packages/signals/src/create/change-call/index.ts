import {usePrevValue} from '../prev-value'

const {is} = Object

export type UseChangeCall = <T>(
  value: T,
  callback: () => void,
  compare?: (current, old) => boolean,
) => void

export const useChangeCall: UseChangeCall = <T>(
  value: T,
  callback: () => void,
  compare: (current, old) => boolean = is,
) => {
  const prevValue = usePrevValue(value)

  if (!compare(value, prevValue.current)) {
    callback()
  }
}
