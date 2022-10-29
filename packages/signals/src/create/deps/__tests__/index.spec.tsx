import {fireEvent, render} from '@testing-library/react'
import * as React from 'react'
import {deps} from '../'

describe('deps', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should return signals outside of a component', () => {
    const signals = deps({
      bar: 'bar',
      foo: 'foo',
    })

    expect(signals.foo.value).toBe('foo')
    expect(signals.bar.value).toBe('bar')
  })
  it('should return signals inside of a component', () => {
    const rendered = jest.fn()
    const Component = (props: {age: number; name: string}) => {
      const {name, age} = deps(props, {write: true})

      const increaseAge = () => {
        age.value += 1
      }

      rendered()

      return (
        <div>
          <span data-testid="name">{name.value}</span>
          <span data-testid="age">{age.value}</span>
          <button data-testid="increase" onClick={increaseAge}>
            increase
          </button>
        </div>
      )
    }
    const wrapper = render(<Component age={0} name="foo" />)

    expect(rendered).toBeCalledTimes(1)
    expect(wrapper.getByTestId('name').textContent).toBe('foo')
    expect(wrapper.getByTestId('age').textContent).toBe('0')

    wrapper.rerender(<Component age={1} name="foo" />)

    expect(rendered).toBeCalledTimes(2)
    expect(wrapper.getByTestId('name').textContent).toBe('foo')
    expect(wrapper.getByTestId('age').textContent).toBe('1')

    fireEvent.click(wrapper.getByTestId('increase'))

    expect(rendered).toBeCalledTimes(3)
    expect(wrapper.getByTestId('name').textContent).toBe('foo')
    expect(wrapper.getByTestId('age').textContent).toBe('2')

    wrapper.rerender(<Component age={0} name="foo" />)

    expect(rendered).toBeCalledTimes(4)
    expect(wrapper.getByTestId('name').textContent).toBe('foo')
    expect(wrapper.getByTestId('age').textContent).toBe('0')
  })
})
