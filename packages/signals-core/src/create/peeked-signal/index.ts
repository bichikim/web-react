import {Signal} from '@winter-love/signals-rebuild'
import {SignalFn} from 'src/types'

export type PeekedSignal = <T>(value: T) => Signal<T>

export interface CreatePeekedSignalParts {
  signal: SignalFn
}

export const createPeekedSignal = (parts: CreatePeekedSignalParts): PeekedSignal => {
  const {signal} = parts
  return (value) => {
    const _signal = signal(value)

    return new Proxy(_signal, {
      get: (target, prop) => {
        if (prop === 'value') {
          return _signal.peek()
        }
        return _signal[prop]
      },
    })
  }
}
