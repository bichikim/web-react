import {effect, signal} from 'alien-signals'
import {batch, getUndefined, untrack} from '../utils'
import {describe, expect, it, vi} from 'vitest'

describe('untrack', () => {
  it('should read signal value without creating a subscription', () => {
    const state = signal(0)
    const subscriber = vi.fn()

    const stop = effect(() => {
      subscriber(untrack(() => state()))
    })

    expect(subscriber).toHaveBeenCalledTimes(1)

    state(1)

    expect(subscriber).toHaveBeenCalledTimes(1)
    stop()
  })
})

describe('batch', () => {
  it('should notify subscribers once for batched updates', () => {
    const first = signal(0)
    const second = signal(0)
    const subscriber = vi.fn()

    const stop = effect(() => {
      subscriber([first(), second()])
    })

    expect(subscriber).toHaveBeenCalledTimes(1)

    batch(() => {
      first(1)
      second(1)
    })

    expect(subscriber).toHaveBeenCalledTimes(2)
    expect(subscriber).toHaveBeenLastCalledWith([1, 1])
    stop()
  })
})

describe('getUndefined', () => {
  it('should return undefined', () => {
    expect(getUndefined()).toBeUndefined()
  })
})
