import {signal, Signal} from '@winter-love/signals-rebuild'
import {CreateAutoWorkParts, createMaybeMemo} from 'src/create/maybe-memo'

export type SignalFn<T = any> = (value?: T) => Signal<T>

export type DepSignals<T extends Record<string, any>> = {
  [P in keyof T]: Signal<T[P]>
}

export type Deps = <T extends Record<string, any>>(deps: T) => DepSignals<T>

export type CreateDepsParts = CreateAutoWorkParts

export const createDeps = (parts: CreateDepsParts): Deps => {
  const {isInComponent} = parts
  const maybeMemo = createMaybeMemo(parts)
  return <T extends Record<string, any>>(deps: T): DepSignals<T> => {
    const signals = maybeMemo(() => {
      return Object.fromEntries(Object.entries(deps).map(([key, value]) => [key, signal(value)]))
    })
    if (isInComponent()) {
      Object.entries(deps).forEach(([key, value]) => {
        signals[key].value = value
      })
    }

    return signals as any
  }
}
