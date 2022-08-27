/* eslint-disable no-extra-semi,@typescript-eslint/no-extra-semi */
import {freeze} from '../'

describe('freeze', () => {
  it('should return a frozen object', () => {
    const oldEnv = process.env.NODE_ENV

    process.env.NODE_ENV = 'development'

    const foo = freeze({foo: 'foo'})

    const error = () => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // noinspection JSConstantReassignment
      ;(foo as any).foo = ''
    }

    expect(foo).toEqual({foo: 'foo'})

    expect(error).toThrow()

    process.env.NODE_ENV = oldEnv
  })
})
