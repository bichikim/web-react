import {functionValue} from '../'

describe('function value', () => {
  it('should return value', () => {
    const result = functionValue('foo')
    expect(result).toBe('foo')
  })
  it('should return value with function', () => {
    const result = functionValue(() => 'foo')
    expect(result).toBe('foo')
  })
})
