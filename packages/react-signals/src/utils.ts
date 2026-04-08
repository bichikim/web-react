import {endBatch, setActiveSub, startBatch} from 'alien-signals'

export interface Signal<T> {
  (): T
  (value: T): void
}

export interface ReadonlySignal<T> {
  (): T
}

export const untrack = <T>(callback: () => T): T => {
  // disconnect sub before callback
  const sub = setActiveSub()

  // call callback
  const result = callback()

  // reconnect sub after callback
  setActiveSub(sub)

  // return result
  return result
}

export const batch = <T>(callback: () => T): T => {
  startBatch()
  const result = callback()
  endBatch()
  return result
}

export const getUndefined = (): undefined => {
  return undefined
}
