import {immerSignal} from '../immer'
import {describe, expect, it} from 'vitest'

describe('immerSignal', () => {
  it('should return the initial state when called without arguments', () => {
    const state = immerSignal({count: 0})

    expect(state()).toEqual({count: 0})
  })

  it('should replace state when direct value is provided', () => {
    const state = immerSignal({count: 0})

    state({count: 10})

    expect(state()).toEqual({count: 10})
  })

  it('should update state immutably when updater function is provided', () => {
    const state = immerSignal({count: 0, nested: {enabled: false}})

    const prevState = state()
    state((draft) => {
      draft.count += 1
      draft.nested.enabled = true
      return draft
    })

    const nextState = state()
    expect(nextState).toEqual({count: 1, nested: {enabled: true}})
    expect(nextState).not.toBe(prevState)
    expect(nextState.nested).not.toBe(prevState.nested)
  })
})
