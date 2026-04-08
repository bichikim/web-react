import {toArray} from '../array'

describe('array', () => {
  it('should return the same array reference when the input is already an array', () => {
    const value = [1, 2, 3]
    expect(toArray(value)).toBe(value)
  })

  it('should wrap a non-array value in a single-element array', () => {
    expect(toArray('a')).toEqual(['a'])
  })
})
