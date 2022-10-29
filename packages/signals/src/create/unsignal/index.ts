import {IsSignal, isSignal} from 'src/create/is-signal'
import {Signal} from 'signal.tmp'

export type UnSignal = <T>(value: T | Signal<T>) => T

export interface CreateUnrefParts {
  isSignal: IsSignal
}

export const createUnref = (value: any) => {
  if (isSignal(value)) {
    return value.value
  }
  return value
}
