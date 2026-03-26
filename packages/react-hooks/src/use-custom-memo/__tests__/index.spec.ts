import {useCustomMemo} from '../'
import {renderHook} from '@testing-library/react-hooks'
import isEqual from 'react-fast-compare'
import {vi} from 'vitest'

describe('useCustomMemo', () => {
  it('should return value with a custom compare logic', () => {
    const mockIsEqual = vi.fn(isEqual)
    const callback = vi.fn(() => ({value: 'foo'}))
    const deps = ['myDeps']
    const deps2 = ['myDeps2']
    const wrapper = renderHook(({deps}) => useCustomMemo(callback, deps, mockIsEqual), {
      initialProps: {deps},
    })

    expect(mockIsEqual).not.toHaveBeenCalled()
    expect(callback).toBeCalledTimes(1)
    const first = wrapper.result.current

    wrapper.rerender({
      deps: deps2,
    })

    expect(mockIsEqual).toHaveBeenCalled()
    expect(mockIsEqual).toHaveBeenCalledWith(deps2, deps)
    expect(callback).toBeCalledTimes(2)
    const second = wrapper.result.current
    expect(Object.is(second, first)).toBe(false)

    wrapper.rerender({
      deps: [...deps2],
    })
    expect(callback).toBeCalledTimes(2)
    const third = wrapper.result.current
    expect(Object.is(third, second)).toBe(true)
  })
})
