import {batch, computed, Signal} from 'signal.tmp'
import {useMaybeMemo} from 'src/create/maybe-memo'

export interface WriteComputed<T = any> {
  get: () => T
  set: (value: T) => void
}

export const writeComputed = <T>(compute: WriteComputed<T>): Signal<T> => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  return useMaybeMemo(() => {
    const computedRef = computed(compute.get)
    return new Proxy(
      {},
      {
        get(target, prop) {
          if (prop === 'value') {
            return computedRef.value
          }
          return Reflect.get(target, prop)
        },
        set(target, prop, value) {
          if (prop === 'value') {
            batch(() => {
              compute.set(value)
            })
            return true
          }
          return false
        },
      },
    ) as any
  })
}
