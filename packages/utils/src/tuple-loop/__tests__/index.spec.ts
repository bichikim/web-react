import {tupleLoop} from '../'

describe('tupleLoop', () => {
  it('should call callback a function with loop logic', () => {
    const logic = (a, b) => a + b
    const result = tupleLoop(
      (target, iteratee) => Array.prototype.map.call(target, iteratee) as any,
      logic,
      [1, 2, 3],
      [3, 4, 5],
    )

    expect(result).toEqual([4, 6, 8])
  })
  it('should call callback a function with loop logic and many args', () => {
    const logic = (a, b, c) => a + b + c
    const result = tupleLoop(
      (target, iteratee) => Array.prototype.map.call(target, iteratee) as any,
      logic,
      [1, 2, 3],
      [3, 4, 5],
      [1, 2, 3],
    )

    expect(result).toEqual([5, 8, 11])
  })
  it('should call callback a function with loop every logic and many args', () => {
    const logic = (a, b, c) => a === b && b === c
    const result = tupleLoop(
      (target, iteratee) => Array.prototype.every.call(target, iteratee) as any,
      logic,
      [1, 2, 3],
      [1, 2, 3],
      [1, 2, 3],
    )

    expect(result).toEqual(true)
  })
})
