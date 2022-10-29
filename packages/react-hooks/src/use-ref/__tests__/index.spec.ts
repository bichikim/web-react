import {useRef} from '../index'
import {renderHook} from '@testing-library/react-hooks'

describe('use-ref', () => {
  it('should return ', () => {
    const initState = jest.fn(() => 'foo')
    const wrapper = renderHook(() => {
      return useRef(initState)
    })

    expect(initState).toHaveBeenCalledTimes(1)

    expect(wrapper.result.current.current).toBe('foo')

    wrapper.rerender()

    expect(initState).toHaveBeenCalledTimes(1)

    expect(wrapper.result.current.current).toBe('foo')
  })
})
