import {dispatchValue} from '../'

describe('dispatchValue', () => {
  it('should dispatch value', () => {
    const state = {foo: 'foo', john: 'john'}

    const value = dispatchValue(state, (state) => {
      return {...state, foo: 'bar'}
    })

    expect(value).toEqual({
      foo: 'bar',
      john: 'john',
    })
  })
  it('should dispatch value with value', () => {
    const state = {foo: 'foo', john: 'john'}

    const value = dispatchValue(state, {...state, foo: 'bar'})

    expect(value).toEqual({
      foo: 'bar',
      john: 'john',
    })
  })
})
