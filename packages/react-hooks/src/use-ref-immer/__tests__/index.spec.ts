import {useRefImmer} from '../'
import {act, renderHook} from '@testing-library/react-hooks'

describe('useRefImmer', () => {
  it('should return new ref', () => {
    const wrapper = renderHook(() => useRefImmer<Record<string, any>>({foo: 'foo'}))

    expect(wrapper.result.current[0].current).toEqual({foo: 'foo'})

    act(() => {
      wrapper.result.current[1]((state) => {
        state.bar = 'bar'
      })
    })
    expect(wrapper.result.current[0].current).toEqual({bar: 'bar', foo: 'foo'})
  })
})
