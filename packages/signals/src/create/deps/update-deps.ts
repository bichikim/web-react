import {Signal} from 'signal.tmp'
import {UseChangeCall} from 'src/create/change-call'
import {UseIsFirst} from 'src/create/is-first'
import {IsInComponent} from 'src/types'

export interface CreateUpdateDeps {
  isInComponent: IsInComponent
  useChangeCall: UseChangeCall
  useIsFirst: UseIsFirst
}

export type UseUpdateDeps = <R extends Record<string, Signal>>(
  signals: Record<string, Signal>,
  deps: Record<keyof R, any>,
) => R

export const createUpdateDeps = (parts: CreateUpdateDeps) => {
  const {isInComponent, useChangeCall, useIsFirst} = parts

  return <R extends Record<string, Signal>>(
    signals: Record<string, Signal>,
    deps: Record<keyof R, any>,
  ) => {
    if (isInComponent()) {
      const isFirst = useIsFirst()
      Object.entries(deps).forEach(([key, value]) => {
        useChangeCall(value, () => {
          if (isFirst.current) {
            return
          }
          signals[key].value = value
        })
      })
    }
    return signals
  }
}
