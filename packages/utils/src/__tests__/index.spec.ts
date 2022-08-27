import * as module from '../'

describe('utils', () => {
  it('should export all', () => {
    expect(typeof module.freeze).toBe('function')
    expect(typeof module.functionValue).toBe('function')
    expect(typeof module.jsonParse).toBe('function')
    expect(typeof module.jsonStringify).toBe('function')
    expect(typeof module.toArray).toBe('function')
  })
})
