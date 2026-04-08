import {isArray, isFunction} from '../validate'

describe('validate', () => {
  it('should return true from isFunction for function values', () => {
    expect(isFunction(() => null)).toBe(true)
    expect(isFunction(function named() {})).toBe(true)
  })

  it('should return false from isFunction for non-function values', () => {
    expect(isFunction(null)).toBe(false)
    expect(isFunction({})).toBe(false)
  })

  it('should return true from isArray for array values', () => {
    expect(isArray([])).toBe(true)
    expect(isArray([1, 2, 3])).toBe(true)
  })

  it('should return false from isArray for non-array values', () => {
    expect(isArray('x')).toBe(false)
    expect(isArray({length: 1})).toBe(false)
  })
})
