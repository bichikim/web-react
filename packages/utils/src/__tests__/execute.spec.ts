import {executeWithAny} from '../execute'

describe('execute', () => {
  it('should call the value with args when it is a function and return the result', () => {
    const fn = (a: number, b: number) => a + b
    expect(executeWithAny(fn, [1, 2])).toBe(3)
  })

  it('should return the value unchanged when it is not a function', () => {
    expect(executeWithAny('hello', [])).toBe('hello')
  })
})
