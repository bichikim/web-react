import {Signal} from 'signal.tmp'

export type IsSignal = (value) => value is Signal

export const isSignal = (value: any): value is Signal => {
  if (typeof value === 'object') {
    return 'peek' in value && 'value' in value && 'subscribe' in value
  }
  return false
}
