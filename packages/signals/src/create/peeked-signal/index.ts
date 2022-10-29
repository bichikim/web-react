import {Signal} from 'signal.tmp'
import {SignalFn} from 'src/types'

export type PeekedSignal = <T>(value: T) => Signal<T>

export interface CreatePeekedSignalParts {
  signal: SignalFn
}

/**
 * @deprecated peek 을 value 로 만들 필요가 아직 없다
 * @param parts
 */
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
