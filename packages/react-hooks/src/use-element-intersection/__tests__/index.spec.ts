/**
 * @vitest-environment jsdom
 */
import {useElementIntersection} from '../'
import {renderHook} from '@testing-library/react-hooks'
import {vi} from 'vitest'

describe('useElementIntersection', () => {
  it('should ', () => {
    const threshold = 0.5
    const observe = vi.fn()
    const disconnect = vi.fn()
    const observer = vi.fn(() => ({
      disconnect,
      observe,
    }))

    window.IntersectionObserver = observer as any

    const element = document.createElement('div')
    const callback = vi.fn()

    const wrapper = renderHook(() => {
      return useElementIntersection(element, callback, {threshold})
    })

    expect(observe).toHaveBeenCalledTimes(1)
    expect(observe).toHaveBeenCalledWith(element)
    expect(observer).toHaveBeenCalledTimes(1)
    expect(observer).toHaveBeenCalledWith(expect.any(Function), {threshold})

    wrapper.unmount()

    expect(disconnect).toHaveBeenCalledTimes(1)
  })
})
