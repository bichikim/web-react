import {signal} from 'alien-signals'
import {produce} from 'immer'
import {untrack} from './utils'

const isFunction = (value: any): value is (...args: any[]) => any => {
  return typeof value === 'function'
}

export const immerSignal = <T>(initialState: T) => {
  const state = signal(initialState)
  return Object.assign((value?: T | ((oldValue?: T) => T)) => {
    if (value === undefined) {
      return state()
    }
    if (isFunction(value)) {
      const nextState = produce(
        untrack(() => state()),
        value,
      )
      return state(nextState)
    }
    return state(value)
  }, state)
}
