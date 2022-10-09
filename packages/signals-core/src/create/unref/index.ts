import {IsSignal} from 'src/create/is-signal'
import {Signal} from '@winter-love/signals-rebuild'

export type UnSignal = <T>(value: T | Signal<T>) => T

export interface CreateUnrefParts {
  isSignal: IsSignal
}

export const createUnref = (parts: CreateUnrefParts): UnSignal => {
  const {isSignal} = parts
  return (value: any) => {
    if (isSignal(value)) {
      return value.value
    }
    return value
  }
}
