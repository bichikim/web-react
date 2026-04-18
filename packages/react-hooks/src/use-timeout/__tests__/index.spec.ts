import {useTimeout} from '../'
import {renderHook} from '@testing-library/react-hooks'
import {vi} from 'vitest'
import {StrictMode} from 'react'

describe('useTimeout', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })
  afterEach(() => {
    vi.useRealTimers()
  })
  it('should call after timeout', async () => {
    const callback = vi.fn()
    const {result} = renderHook(() => useTimeout(callback, 1000), {
      wrapper: StrictMode,
    })

    result.current[0]('foo', 'bar')
    expect(callback).not.toHaveBeenCalled()
    vi.advanceTimersByTime(1000)
    expect(callback).toHaveBeenCalledWith('foo', 'bar')
  })

  it('should call last callback if called multiple times', async () => {
    const callback = vi.fn()
    const {result} = renderHook(() => useTimeout(callback, 1000), {
      wrapper: StrictMode,
    })

    result.current[0]('foo', 'bar')
    expect(callback).not.toHaveBeenCalled()
    vi.advanceTimersByTime(500)
    expect(callback).not.toHaveBeenCalled()
    result.current[0]('foo', 'bar')
    vi.advanceTimersByTime(1000)
    expect(callback).toHaveBeenCalledWith('foo', 'bar')
  })

  it('should not call callback after clean up', async () => {
    const callback = vi.fn()
    const {result} = renderHook(() => useTimeout(callback, 1000), {
      wrapper: StrictMode,
    })

    result.current[0]('foo', 'bar')
    expect(callback).not.toHaveBeenCalled()
    vi.advanceTimersByTime(500)

    // clean up
    result.current[1]()
    vi.advanceTimersByTime(1000)
    expect(callback).not.toHaveBeenCalled()
  })

  it('should call callback after unmount', async () => {
    const callback = vi.fn()
    const {result, unmount} = renderHook(() => useTimeout(callback, 1000), {
      wrapper: StrictMode,
    })

    result.current[0]('foo', 'bar')
    expect(callback).not.toHaveBeenCalled()
    unmount()
    vi.advanceTimersByTime(1000)
    expect(callback).not.toHaveBeenCalled()
  })

  it('should change execute and clean up function after rerender', async () => {
    const callback = vi.fn()
    const {rerender, result} = renderHook(() => useTimeout(callback, 1000), {
      wrapper: StrictMode,
    })

    const [execute, cleanUp] = result.current
    rerender()
    expect(execute).toBe(result.current[0])
    expect(cleanUp).toBe(result.current[1])
  })
})
