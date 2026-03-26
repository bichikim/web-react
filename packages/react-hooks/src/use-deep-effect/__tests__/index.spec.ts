import {useCustomEffect} from 'src/use-custom-effect'
import {useDeepEffect} from '../'
import {renderHook} from '@testing-library/react-hooks'
import isEqual from 'react-fast-compare'
import {vi} from 'vitest'

vi.mock('src/use-custom-effect', () => ({
  useCustomEffect: vi.fn(),
}))

describe('useDeepEffect', () => {
  it('should call useCustomCompareEffect', () => {
    const callback = vi.fn()
    renderHook(() => useDeepEffect(callback, []))
    expect(useCustomEffect).toHaveBeenCalledWith(callback, [], isEqual)
  })
})
