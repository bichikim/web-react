/**
 * @jest-environment jsdom
 */
import {useElementIntersection} from '../'
import {renderHook} from '@testing-library/react-hooks'

describe('useElementIntersection', () => {
  it('should ', () => {
    const threshold = 0.5
    const observe = jest.fn()
    const disconnect = jest.fn()
    const observer = jest.fn(() => ({
      disconnect,
      observe,
    }))

    window.IntersectionObserver = observer as any

    const element = document.createElement('div')
    const callback = jest.fn()

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
