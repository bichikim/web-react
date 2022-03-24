import {fireEvent, render, screen} from '@testing-library/react'
import React, {useState} from 'react'
import {useSyncState} from '../'

describe('signal', () => {
  it('should rerender ones', async () => {
    const rendered = jest.fn()
    const Component = (props) => {
      const [value, setValue] = useSyncState(props.value)
      const onChange = () => {
        setValue(`${value}o`)
      }
      rendered()
      return (
        <div>
          <button onClick={onChange}>change</button>
          <div data-testid="value">{value}</div>
        </div>
      )
    }

    const Root = () => {
      const [value, setValue] = useState('foo')
      const onChange = () => {
        setValue(`${value}o`)
      }
      return (
        <div>
          <button onClick={onChange}>rootChange</button>
          <Component value={value} />
        </div>
      )
    }

    await render(<Root />)
    expect(rendered).toBeCalledTimes(1)
    expect(screen.getByTestId('value').textContent).toBe('foo')
    fireEvent.click(screen.getByText('change'))
    expect(rendered).toBeCalledTimes(2)
    expect(screen.getByTestId('value').textContent).toBe('fooo')
    fireEvent.click(screen.getByText('change'))
    expect(rendered).toBeCalledTimes(3)
    expect(screen.getByTestId('value').textContent).toBe('foooo')
    fireEvent.click(screen.getByText('rootChange'))
    expect(rendered).toBeCalledTimes(4)
    expect(screen.getByTestId('value').textContent).toBe('fooo')
  })
})
