import {render} from '@testing-library/react'
import {usePrevValue} from '../'

describe('prev-value', () => {
  it('should return prev value', () => {
    const Component = (props: {name: string}) => {
      const prevValue = usePrevValue(props.name)
      return (
        <div>
          <span data-testid="prev-value">{prevValue.current}</span>
          <span data-testid="value">{props.name}</span>
        </div>
      )
    }

    const wrapper = render(<Component name="foo" />)

    expect(wrapper.getByTestId('prev-value').textContent).toBe('')
    expect(wrapper.getByTestId('value').textContent).toBe('foo')

    wrapper.rerender(<Component name="bar" />)

    expect(wrapper.getByTestId('prev-value').textContent).toBe('foo')
    expect(wrapper.getByTestId('value').textContent).toBe('bar')
  })
})
