import {getUndefined} from '../utils'
import {describe, expect, it} from 'vitest'

describe('getUndefined', () => {
  it('should return undefined', () => {
    expect(getUndefined()).toBe(undefined)
  })
})
