import {useCount} from '../'
import {renderHook} from '@testing-library/react-hooks'

describe('use-count', () => {
  it('should run with count', () => {
    const wrapper = renderHook(() => {
      return useCount((count) => count)
    })

    expect(wrapper.result.current).toBe(0)

    wrapper.rerender()

    expect(wrapper.result.current).toBe(1)

    wrapper.rerender()

    expect(wrapper.result.current).toBe(2)
  })
})
