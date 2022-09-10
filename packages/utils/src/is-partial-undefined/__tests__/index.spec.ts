import {isPartialUndefined} from '../'

describe('isPartialUndefined', () => {
  it('should return true if one of the values is undefined', () => {
    const result = isPartialUndefined(1, 2, undefined)

    expect(result).toBe(true)
  })
  it('should return false if all of the values are not undefined', () => {
    const result = isPartialUndefined(1, 2, 3)

    expect(result).toBe(false)
  })
})
