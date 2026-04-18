/**
 * @vitest-environment jsdom
 */
import {renderHook, waitFor} from '@testing-library/react'
import {afterEach, describe, expect, it, vi} from 'vitest'
import {useStorage} from '..'

describe('useStorage', () => {
  afterEach(() => {
    vi.restoreAllMocks()
    localStorage.clear()
  })

  it('should initialize state from storage', () => {
    vi.spyOn(Storage.prototype, 'getItem').mockReturnValue('stored')
    const {result} = renderHook(() => useStorage('k1'))
    expect(result.current[0]).toBe('stored')
    expect(Storage.prototype.getItem).toHaveBeenCalledWith('k1')
  })

  it('should update storage value', async () => {
    vi.spyOn(Storage.prototype, 'getItem').mockReturnValue('stored')
    vi.spyOn(Storage.prototype, 'setItem')
    const {result} = renderHook(() => useStorage('k'))
    expect(result.current[0]).toBe('stored')

    // set value
    result.current[1]('new')

    await waitFor(() => {
      expect(result.current[0]).toBe('new')
    })
    expect(Storage.prototype.setItem).toHaveBeenCalledWith('k', 'new')
  })

  it('should return the stored value for the new key when the key changes', async () => {
    const items: Record<string, string> = {k1: 'a', k2: 'b'}
    vi.spyOn(Storage.prototype, 'getItem').mockImplementation((key: string) => items[key] ?? null)
    vi.spyOn(Storage.prototype, 'setItem')

    const {result, rerender} = renderHook(
      ({storageKey}: {storageKey: string}) => useStorage(storageKey),
      {initialProps: {storageKey: 'k1'}},
    )
    expect(result.current[0]).toBe('a')
    expect(Storage.prototype.getItem).toHaveBeenCalledWith('k1')

    rerender({storageKey: 'k2'})

    await waitFor(() => {
      expect(result.current[0]).toBe('b')
    })
    expect(Storage.prototype.getItem).toHaveBeenCalledWith('k2')
  })
})
