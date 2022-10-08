import {isInComponent} from '../index'
import {renderHook} from '@testing-library/react-hooks'
import {signals} from 'src/react/signals'

describe('is-in-component', () => {
  it('should return true for a component', () => {
    const wrapper = renderHook(() => isInComponent())
    expect(wrapper.result.current).toBe(true)
  })
  it('should return false for a outside component', () => {
    expect(isInComponent()).toBe(false)
  })
  it('should return true for the signals', () => {
    const wrapper = renderHook(() => {
      return signals(() => {
        return isInComponent()
      })
    })
    expect(wrapper.result.current).toBe(true)
  })
})
