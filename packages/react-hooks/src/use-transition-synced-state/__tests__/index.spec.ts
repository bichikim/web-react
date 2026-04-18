/**
 * @vitest-environment jsdom
 */
import {renderHook, waitFor} from '@testing-library/react'
import {act} from 'react'
import {describe, expect, it, vi} from 'vitest'
import {useTransitionSyncedState} from '..'

describe('useTransitionSyncedState', () => {
  it('should initialize state from computeState', () => {
    const computeState = vi.fn<(deps: [number]) => number>().mockImplementation(([dep]) => dep * 2)
    const {result} = renderHook(() => useTransitionSyncedState<number, [number]>(computeState, [2]))

    expect(result.current[0]).toBe(4)
    expect(typeof result.current[2]).toBe('boolean')
    expect(computeState).toHaveBeenCalledTimes(1)
  })

  it('should sync state when deps change', async () => {
    const computeState = vi
      .fn<(deps: [number]) => string>()
      .mockImplementation(([dep]) => `value-${dep}`)
    const {result, rerender} = renderHook(
      ({dep}: {dep: number}) => useTransitionSyncedState<string, [number]>(computeState, [dep]),
      {initialProps: {dep: 1}},
    )

    expect(result.current[0]).toBe('value-1')

    rerender({dep: 2})

    await waitFor(() => {
      expect(result.current[0]).toBe('value-2')
    })
  })

  it('should not re-compute when deps stay the same', () => {
    const computeState = vi.fn<(deps: [number]) => number>().mockImplementation(([dep]) => dep)
    const {result} = renderHook(() => {
      const [n, setN] = useTransitionSyncedState<number, [number]>(computeState, [1])
      return {n, setN}
    })

    act(() => {
      result.current.setN(99)
    })

    expect(result.current.n).toBe(99)
    expect(computeState).toHaveBeenCalledTimes(1)
  })
})
