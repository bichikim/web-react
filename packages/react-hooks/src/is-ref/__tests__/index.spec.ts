import {isRef} from '../'
import {useRef} from 'react'
import {renderHook} from '@testing-library/react-hooks'

describe('isRef', () => {
  it('should return true if the value is ref', () => {
    const wrapper = renderHook(() => {
      const myRef = useRef(0)
      return isRef(myRef)
    })

    expect(wrapper.result.current).toBe(true)
  })
  it('should return true if the value is number', () => {
    const wrapper = renderHook(() => {
      return isRef(0)
    })

    expect(wrapper.result.current).toBe(false)
  })
  it('should return false if the value is window', () => {
    const wrapper = renderHook(() => {
      return isRef(window)
    })

    expect(wrapper.result.current).toBe(false)
  })
})
