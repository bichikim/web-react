import {act, renderHook} from '@testing-library/react-hooks'
import flushPromises from 'flush-promises'
import {useWait} from '../use-wait'
import {vi} from 'vitest'

describe('use-wait', () => {
  it('should return promise with autoStart', async () => {
    const callback = vi.fn()
    let _resolve
    const {result} = renderHook(() => {
      return useWait(
        () =>
          new Promise((resolve) => {
            _resolve = resolve
          }),
        {autoStart: true},
      )
    })
    expect(typeof result.current.promise).not.toBeNull()
    result.current.promise?.then(callback)
    expect(callback).not.toHaveBeenCalled()
    await act(async () => {
      _resolve()
    })
    await flushPromises()
    expect(callback).toHaveBeenCalled()
  })
  it('should return promise', async () => {
    const callback = vi.fn()
    let _resolve
    const {result} = renderHook(() => {
      return useWait(
        () =>
          new Promise((resolve) => {
            _resolve = resolve
          }),
      )
    })
    await act(async () => {
      result.current.reload()
    })
    expect(result.current.promise).not.toBeNull()
    result.current.promise.then(callback)
    expect(callback).not.toHaveBeenCalled()
    await act(async () => {
      _resolve()
    })
    await flushPromises()
    expect(callback).toHaveBeenCalled()
  })
  it('should rerun promise ', async () => {
    const callback = vi.fn()
    let _resolve
    const {result} = renderHook(() => {
      return useWait(
        () =>
          new Promise((resolve) => {
            _resolve = resolve
          }),
      )
    })
    expect(result.current.promise).not.toBeNull()
    await act(async () => {
      result.current.reload()
    })
    result.current.promise?.then(callback)
    expect(callback).not.toHaveBeenCalled()
    await act(async () => {
      _resolve()
    })
    await flushPromises()
    expect(callback).toHaveBeenCalledTimes(1)
    await act(async () => {
      _resolve()
    })
    await flushPromises()
    expect(callback).toHaveBeenCalledTimes(1)
    await act(async () => {
      result.current.reload()
    })
    result.current.promise?.then(callback)
    await act(async () => {
      _resolve()
    })
    await flushPromises()
    expect(callback).toHaveBeenCalledTimes(2)
  })
})
