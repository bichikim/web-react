/**
 * @jest-environment jsdom
 */
import {isSSR} from '../'

describe('isSSR in SSR', () => {
  it('should return true', () => {
    const result = isSSR()

    expect(result).toBe(false)
  })
})
