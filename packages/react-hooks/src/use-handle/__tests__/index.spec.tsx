/**
 * @vitest-environment jsdom
 */

import {renderHook} from '@testing-library/react'
import {useHandle} from '../'
import {StrictMode} from 'react'
import {describe, expect, it, vi} from 'vitest'

describe('use-handle', () => {
  it('should return the same function instance after re-rendering', () => {
    const callback = vi.fn()
    const {result, rerender} = renderHook(() => useHandle(callback), {
      wrapper: StrictMode,
    })
    const handle = result.current
    rerender()
    expect(handle).toBe(result.current)
  })

  it('should call the new callback when it changes and still return the same function after re-rendering', () => {
    const callbackA = vi.fn()
    const callbackB = vi.fn()
    const {result, rerender} = renderHook(({cb}: {cb: () => void}) => useHandle(cb), {
      initialProps: {cb: callbackA},
      wrapper: StrictMode,
    })
    const handle = result.current
    handle()
    expect(callbackA).toHaveBeenCalledTimes(1)
    expect(callbackB).not.toHaveBeenCalled()

    rerender({cb: callbackB})
    expect(handle).toBe(result.current)
    handle()
    expect(callbackB).toHaveBeenCalledTimes(1)
    expect(callbackA).toHaveBeenCalledTimes(1)
  })
})
