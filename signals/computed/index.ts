import {computed as _computed, ReadonlySignal} from '@preact/signals-react'
import {useMaybeMemo} from '../maybe-memo'

export const computed = <T>(compute: () => T): ReadonlySignal<T> => {
  // I know
  // eslint-disable-next-line react-hooks/rules-of-hooks
  return useMaybeMemo(() => _computed(compute))
}
