import {renderHook, waitFor} from '@testing-library/react'
import {StrictMode} from 'react'
import {useCleanUp} from '../index'
import {describe, expect, it, vi} from 'vitest'

describe('useCleanUp', () => {
  it('should return the initial value', () => {
    const initCleanUp = vi.fn()
    const {result} = renderHook(() => useCleanUp(initCleanUp))

    expect(initCleanUp).not.toHaveBeenCalled()

    result.current[0]()
    expect(initCleanUp).toHaveBeenCalled()
  })

  it('should update clean up', async () => {
    const cleanUpFunc = vi.fn()
    const {result} = renderHook(() => useCleanUp(), {
      wrapper: StrictMode,
    })

    result.current[1](cleanUpFunc)
    await waitFor(() => {
      result.current[0]()
      expect(cleanUpFunc).toHaveBeenCalled()
    })
  })

  it('should not change the clean up and update clean up after rerender', async () => {
    const {rerender, result} = renderHook(() => useCleanUp(), {
      wrapper: StrictMode,
    })

    const [cleanUp, updateCleanUp] = result.current
    rerender()

    expect(cleanUp).toBe(result.current[0])
    expect(updateCleanUp).toBe(result.current[1])
  })

  it('should run the registered cleanup at most once ', async () => {
    const cleanUpFunc = vi.fn()
    const {result} = renderHook(() => useCleanUp(cleanUpFunc), {
      wrapper: StrictMode,
    })

    result.current[0]()
    expect(cleanUpFunc).toHaveBeenCalledTimes(1)
    result.current[0]()
    expect(cleanUpFunc).toHaveBeenCalledTimes(1)
  })

  it('should run the registered cleanup at most once even if the cleanup callback throws', () => {
    const cleanUpFunc = vi.fn(() => {
      throw new Error('test')
    })
    // StrictMode는 마운트 직후 effect cleanup으로 cleanUp()을 먼저 호출합니다.
    // 클린업이 throw하면 그 시점에 처리되지 않은 예외로 테스트가 깨지므로 여기서는 wrapper를 쓰지 않습니다.
    const {result} = renderHook(() => useCleanUp(cleanUpFunc))

    expect(() => result.current[0]()).toThrow('test')
    expect(cleanUpFunc).toHaveBeenCalledTimes(1)
    expect(() => result.current[0]()).not.toThrow()
    expect(cleanUpFunc).toHaveBeenCalledTimes(1)
  })

  it('should clean up before unmount', () => {
    const cleanUpFn = vi.fn()
    const {unmount} = renderHook(() => useCleanUp(cleanUpFn))

    expect(cleanUpFn).not.toHaveBeenCalled()
    unmount()
    expect(cleanUpFn).toHaveBeenCalledTimes(1)
  })
})
