import {useCustomState} from '../'
import {act, renderHook} from '@testing-library/react-hooks'
import isEqual from 'react-fast-compare'

describe('useCustomState', () => {
  it('should update state with a isEqual', () => {
    const rendered = jest.fn()
    const wrapper = renderHook(() => {
      rendered()
      return useCustomState({foo: 'foo'}, isEqual)
    })

    act(() => {
      expect(wrapper.result.current[0].foo).toBe('foo')
    })

    expect(rendered).toBeCalledTimes(1)
    const prev = wrapper.result.current[0]
    act(() => {
      wrapper.result.current[1]((state) => ({...state, foo: 'bar'}))
    })
    expect(rendered).toBeCalledTimes(2)
    const prev2 = wrapper.result.current[0]
    expect(Object.is(prev, prev2)).toBe(false)
    expect(prev2.foo).toBe('bar')

    act(() => {
      wrapper.result.current[1]((state) => ({...state}))
    })
    expect(rendered).toBeCalledTimes(2)
    const prev3 = wrapper.result.current[0]
    expect(Object.is(prev2, prev3)).toBe(true)
    expect(prev3.foo).toBe('bar')
  })
})
