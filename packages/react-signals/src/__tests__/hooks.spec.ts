import {renderHook, waitFor} from '@testing-library/react'
import {useSignal, useSignalValue} from '../hooks'
import {signal} from 'alien-signals'

describe('useSignal', () => {
  it('should return the initial value', () => {
    const {result} = renderHook(() => useSignal(0))
    expect(result.current[0]).toBe(0)
  })
  it('should update the value', async () => {
    const {result} = renderHook(() => useSignal(0))
    expect(result.current[0]).toBe(0)
    result.current[1](1)
    await waitFor(() => {
      expect(result.current[0]).toBe(1)
    })
    result.current[1](2)
    await waitFor(() => {
      expect(result.current[0]).toBe(2)
    })
  })
  it('should update the value via updater function', async () => {
    const {result} = renderHook(() => useSignal(0))
    expect(result.current[0]).toBe(0)
    result.current[1]((oldValue) => oldValue + 1)
    await waitFor(() => {
      expect(result.current[0]).toBe(1)
    })
    result.current[1]((oldValue) => oldValue + 1)
    await waitFor(() => {
      expect(result.current[0]).toBe(2)
    })
  })
})

describe('useSignalValue', () => {
  it('should return the initial value', async () => {
    const valueSignal = signal(0)
    const {result} = renderHook(() => useSignalValue(valueSignal))
    expect(result.current).toBe(0)
  })
  it('should update the value', async () => {
    const valueSignal = signal(0)
    const {result} = renderHook(() => useSignalValue(valueSignal))
    expect(result.current).toBe(0)
    valueSignal(1)
    await waitFor(() => {
      expect(result.current).toBe(1)
    })
  })
})
