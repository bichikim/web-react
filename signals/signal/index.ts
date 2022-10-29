import {Signal, signal as _signal} from '@preact/signals-react'
import {useMaybeMemo} from '../maybe-memo'

export const signal = <T>(value: T): Signal<T> => {
  // I know
  // eslint-disable-next-line react-hooks/rules-of-hooks
  return useMaybeMemo(() => _signal(value))
}
