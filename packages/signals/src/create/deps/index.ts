/* eslint-disable react-hooks/rules-of-hooks */
import {Signal, signal} from 'signal.tmp'
import {useChangeCall} from 'src/create/change-call'
import {useIsFirst} from 'src/create/is-first'
import {isInComponent} from 'src/create/is-in-component'
import {useMaybeMemo} from 'src/create/maybe-memo'

export type DepSignals<T extends Record<string, any>> = {
  [P in keyof T]: Signal<T[P]>
}

export type Deps = <T extends Record<string, any>>(deps: T, options?: DepsOptions) => DepSignals<T>

export interface DepsOptions {
  compare?: (current: any, previous: any) => boolean
  /**
   * @default false
   */
  write?: boolean
}

export const deps = <T extends Record<string, any>>(
  deps: T,
  options: DepsOptions = {},
): DepSignals<T> => {
  const {write = false, compare} = options

  const signals = useMaybeMemo(() => {
    return Object.fromEntries(Object.entries(deps).map(([key, value]) => [key, signal(value)]))
  })

  const _isInComponent = isInComponent()

  if (_isInComponent && write) {
    const isFirst = useIsFirst()
    Object.entries(deps).forEach(([key, value]) => {
      useChangeCall(
        value,
        () => {
          if (isFirst.current) {
            return
          }
          signals[key].value = value
        },
        compare,
      )
    })
  } else if (_isInComponent) {
    Object.entries(deps).forEach(([key, value]) => {
      signals[key].value = value
    })
  }

  return signals as any
}
