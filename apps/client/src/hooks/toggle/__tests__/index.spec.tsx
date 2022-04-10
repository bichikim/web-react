import {fireEvent, render, screen} from '@testing-library/react'
import React from 'react'
import {useToggle} from '../'

describe('toggle', () => {
  it('should toggle value', async () => {
    const rendered = jest.fn()
    const Component = (props) => {
      const [value, setToggle] = useToggle(props.value)
      const onChange = () => {
        setToggle()
      }
      rendered()
      return (
        <div>
          <button onClick={onChange}>change</button>
          <div data-testid="value">{String(value())}</div>
        </div>
      )
    }
    await render(<Component />)
    expect(rendered).toBeCalledTimes(1)
    expect(screen.getByTestId('value').textContent).toBe('false')
    fireEvent.click(screen.getByText('change'))
    expect(rendered).toBeCalledTimes(2)
    expect(screen.getByTestId('value').textContent).toBe('true')
    fireEvent.click(screen.getByText('change'))
    expect(rendered).toBeCalledTimes(3)
    expect(screen.getByTestId('value').textContent).toBe('false')
  })
})
