import {renderHook, waitFor} from '@testing-library/react'
import {useToggle} from '../'

describe('toggle', () => {
  it('should toggle value', async () => {
    const {result} = renderHook(() => useToggle(false))

    expect(result.current[0]).toBe(false)

    result.current[1]()
    await waitFor(() => {
      expect(result.current[0]).toBe(true)
    })

    result.current[1]()
    await waitFor(() => {
      expect(result.current[0]).toBe(false)
    })
  })
})
