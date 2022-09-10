import {useCustomEffect} from 'src/use-custom-effect'
import {useDeepEffect} from '../'
import {renderHook} from '@testing-library/react-hooks'
import isEqual from 'react-fast-compare'

jest.mock('src/use-custom-effect', () => ({
  useCustomEffect: jest.fn(),
}))

describe('useDeepEffect', () => {
  it('should call useCustomCompareEffect', () => {
    const callback = jest.fn()
    renderHook(() => useDeepEffect(callback, []))
    expect(useCustomEffect).toHaveBeenCalledWith(callback, [], isEqual)
  })
})
