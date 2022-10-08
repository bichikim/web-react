import {Signal} from '@winter-love/signals-rebuild'

export type IsSignal = (value) => value is Signal

export const createIsSignal = (): IsSignal => {
  return (value: any): value is Signal => {
    if (typeof value === 'object') {
      return 'peek' in value && 'value' in value && 'subscribe' in value
    }
    return false
  }
}
