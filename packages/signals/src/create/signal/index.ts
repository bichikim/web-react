/* eslint-disable react-hooks/rules-of-hooks */
import {signal as _signal, Signal} from 'signal.tmp'
import {useMaybeMemo} from 'src/create/maybe-memo'

export const signal = (value): Signal => {
  return useMaybeMemo(() => {
    return _signal(value)
  }, [])
}
