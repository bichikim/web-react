/* eslint-disable import/no-named-as-default-member */
import React from 'react'
import {useCustomMemo} from '../'
import {renderHook} from '@testing-library/react-hooks'
import isEqual from 'react-fast-compare'

describe('useCustomMemo', () => {
  it('should return value with a custom compare logic', () => {
    jest.spyOn(React, 'useMemo').mockReturnValue('foo')
    const mockIsEqual = jest.fn(isEqual)
    const callback = jest.fn()
    const deps = ['myDeps']
    const deps2 = ['myDeps2']
    const wrapper = renderHook(({deps}) => useCustomMemo(callback, deps, mockIsEqual), {
      initialProps: {deps},
    })

    expect(mockIsEqual).not.toHaveBeenCalled()
    expect(React.useMemo).toHaveBeenCalledWith(callback, deps)
    jest.spyOn(React, 'useMemo').mockClear()

    wrapper.rerender({
      deps: deps2,
    })

    expect(mockIsEqual).toHaveBeenCalled()
    expect(mockIsEqual).toHaveBeenCalledWith(deps2, deps)
    expect(React.useMemo).toHaveBeenCalledWith(callback, deps2)
    jest.spyOn(React, 'useMemo').mockClear()

    wrapper.rerender({
      deps: [...deps2],
    })
    expect(React.useMemo).toHaveBeenCalledWith(callback, deps2)
    // check same object address
    expect(Object.is((React.useMemo as jest.Mock).mock.calls[0][1], deps2)).toBe(true)

    jest.spyOn(React, 'useMemo').mockRestore()
  })
})
