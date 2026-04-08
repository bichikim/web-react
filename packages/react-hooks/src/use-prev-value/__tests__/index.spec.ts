import {renderHook, waitFor} from '@testing-library/react'
import {describe, expect, it} from 'vitest'
import {usePrevValue} from '../'

describe('usePrevValue', () => {
  it('should return the previous value', () => {
    const {result} = renderHook(() => usePrevValue(0))
    expect(result.current).toBe(undefined)
  })
  it('should update the previous value', async () => {
    const {result, rerender} = renderHook((props) => usePrevValue(props.value), {
      initialProps: {value: 0},
    })
    expect(result.current).toBe(undefined)

    rerender({value: 1})
    await waitFor(() => {
      expect(result.current).toBe(0)
    })

    rerender({value: 2})
    await waitFor(() => {
      expect(result.current).toBe(1)
    })
  })
})
