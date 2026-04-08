import * as utils from '../index'

describe('index exports', () => {
  it('should export main utilities from the barrel', () => {
    expect(utils.toArray).toBeTypeOf('function')
    expect(utils.executeWithAny).toBeTypeOf('function')
    expect(utils.freeze).toBeTypeOf('function')
    expect(utils.getWindow).toBeTypeOf('function')
    expect(utils.parseJson).toBeTypeOf('function')
    expect(utils.once).toBeTypeOf('function')
    expect(utils.getStorage).toBeTypeOf('function')
    expect(utils.supportPassive).toBeTypeOf('function')
    expect(utils.isFunction).toBeTypeOf('function')
  })
})
