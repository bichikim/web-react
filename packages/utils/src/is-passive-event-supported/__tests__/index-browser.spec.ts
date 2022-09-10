/**
 * @jest-environment jsdom
 */
import {isPassiveEventSupported} from '../'

describe('isPassiveEventSupported', () => {
  it('should return true in browser environment', () => {
    const result = isPassiveEventSupported()

    expect(result).toBe(true)
  })
})
