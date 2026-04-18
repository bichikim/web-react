/**
 * @vitest-environment jsdom
 */
import {renderHook, waitFor} from '@testing-library/react'
import {act} from 'react'
import {describe, expect, it, vi} from 'vitest'
import {useSyncedState} from '..'

describe('useSyncedState', () => {
  it('should initialize state from getState', () => {
    const getState = vi.fn<(deps: [number]) => number>().mockImplementation(([dep]) => dep * 2)
    const {result} = renderHook(() => useSyncedState<number, [number]>(getState, [2]))

    expect(result.current[0]).toBe(4)
    expect(getState).toHaveBeenCalledTimes(1)
  })

  it('should sync state when deps change', async () => {
    const getState = vi
      .fn<(deps: [number]) => string>()
      .mockImplementation(([dep]) => `value-${dep}`)
    const {result, rerender} = renderHook(
      ({dep}: {dep: number}) => useSyncedState<string, [number]>(getState, [dep]),
      {
        initialProps: {dep: 1},
      },
    )

    expect(result.current[0]).toBe('value-1')

    act(() => {
      rerender({dep: 2})
    })

    await waitFor(() => {
      expect(result.current[0]).toBe('value-2')
    })
  })

  it('should not re-compute when deps stay the same', () => {
    const getState = vi.fn<(deps: [number]) => number>().mockImplementation(([dep]) => dep)
    const {result} = renderHook(() => useSyncedState<number, [number]>(getState, [1]))

    act(() => {
      result.current[1](99)
    })

    expect(result.current[0]).toBe(99)
    expect(getState).toHaveBeenCalledTimes(1)
  })
})
