import {useChangeCall} from '../'
import {render} from '@testing-library/react'
import {useEffect, useRef} from 'react'

describe('change-call', () => {
  it('should call when value is changed', () => {
    const callback = jest.fn()
    const Component = (props: {name: string}) => {
      useChangeCall(props.name, callback)

      return <div data-testid="value">{props.name}</div>
    }

    const wrapper = render(<Component name="foo" />)

    expect(callback).toBeCalledTimes(1)
    expect(wrapper.getByTestId('value').textContent).toBe('foo')

    wrapper.rerender(<Component name="bar" />)

    expect(wrapper.getByTestId('value').textContent).toBe('bar')
    expect(callback).toBeCalledTimes(2)
  })
})
