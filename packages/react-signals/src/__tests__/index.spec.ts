import * as reactSignals from '../index'
import {describe, expect, it} from 'vitest'

describe('index exports', () => {
  it('should re-export public APIs', () => {
    expect(reactSignals).toMatchObject({
      batch: expect.any(Function),
      getUndefined: expect.any(Function),
      immerSignal: expect.any(Function),
      untrack: expect.any(Function),
      useCreateSignal: expect.any(Function),
      usePrevValue: expect.any(Function),
      useSignal: expect.any(Function),
      useSignalSetter: expect.any(Function),
      useSignalValue: expect.any(Function),
    })
  })
})
