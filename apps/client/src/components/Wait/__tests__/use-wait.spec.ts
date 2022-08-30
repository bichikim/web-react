import {renderHook} from '@testing-library/react-hooks'
import {useWait} from '../use-wait'
import flushPromises from 'flush-promises'

describe('use-wait', () => {
  it('should return promise with autoStart', async () => {
    const callback = jest.fn()
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
    _resolve()
    await flushPromises()
    expect(callback).toHaveBeenCalled()
  })
  it('should return promise', async () => {
    const callback = jest.fn()
    let _resolve
    const {result} = renderHook(() => {
      return useWait(
        () =>
          new Promise((resolve) => {
            _resolve = resolve
          }),
      )
    })
    result.current.reload()
    expect(result.current.promise).not.toBeNull()
    result.current.promise.then(callback)
    expect(callback).not.toHaveBeenCalled()
    _resolve()
    await flushPromises()
    expect(callback).toHaveBeenCalled()
  })
  it('should rerun promise ', async () => {
    const callback = jest.fn()
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
    result.current.reload()
    result.current.promise?.then(callback)
    expect(callback).not.toHaveBeenCalled()
    _resolve()
    await flushPromises()
    expect(callback).toHaveBeenCalledTimes(1)
    _resolve()
    await flushPromises()
    expect(callback).toHaveBeenCalledTimes(1)
    result.current.reload()
    result.current.promise?.then(callback)
    _resolve()
    await flushPromises()
    expect(callback).toHaveBeenCalledTimes(2)
  })
})
