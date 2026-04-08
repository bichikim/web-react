import {once} from '../once'

describe('once', () => {
  it('should run the callback only once and reuse the result', () => {
    const callback = vi.fn(() => ({value: 1}))
    const run = once(callback)

    const a = run()
    const b = run()

    expect(callback).toHaveBeenCalledTimes(1)
    expect(a).toBe(b)
  })

  it('should run again after cancel is called', () => {
    const callback = vi.fn(() => ({value: Date.now()}))
    const run = once(callback)

    const a = run()
    run.cancel()
    const b = run()

    expect(callback).toHaveBeenCalledTimes(2)
    expect(a).not.toBe(b)
  })
})
