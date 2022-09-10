import {useDebounceState} from '../'
import * as useTimeoutModule from 'src/use-timeout'
import {act, renderHook} from '@testing-library/react-hooks'

// jest.mock('src/use-timeout', () => {
//   return {
//     useTimeout: jest.fn(),
//   }
// })

describe('useDebounceState', () => {
  it('should change call after wait', () => {
    const setState = jest.fn()
    const clear = jest.fn()
    let updateState: (...args) => any
    const wait = 200
    jest.spyOn(useTimeoutModule, 'useTimeout').mockImplementation((_updateState, _wait) => {
      updateState = _updateState
      expect(typeof _updateState).toBe('function')
      expect(_wait).toBe(wait)
      return [setState, clear]
    })

    const wrapper = renderHook(() => useDebounceState('foo', wait))
    expect(useTimeoutModule.useTimeout).toHaveBeenCalledTimes(1)
    expect(wrapper.result.current[0]).toBe('foo')
    expect(wrapper.result.current[1]).toBe(setState)
    expect(wrapper.result.current[2]).toBe(clear)
    act(() => {
      updateState('bar')
    })
    expect(wrapper.result.current[0]).toBe('bar')
  })
})
