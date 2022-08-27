import {isPassiveEventSupported} from '../'

describe('isPassiveEventSupported', () => {
  it('should return false in node environment', () => {
    const result = isPassiveEventSupported()

    expect(result).toBe(false)
  })
})
