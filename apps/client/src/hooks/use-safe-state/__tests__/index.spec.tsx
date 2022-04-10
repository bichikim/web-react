import {fireEvent, render, screen} from '@testing-library/react'
import React, {useCallback} from 'react'
import {useSafeState} from '../'

describe('use-safe-state', () => {
  it('should toggle value', async () => {
    const rendered = jest.fn()
    const Component = () => {
      const [state, setState] = useSafeState(0)
      const onChange = useCallback(() => {
        setState(state() + 1)
      }, [])
      rendered()
      return (
        <div>
          <button onClick={onChange}>change</button>
          <div data-testid="state">{String(state())}</div>
        </div>
      )
    }
    await render(<Component />)
    expect(rendered).toBeCalledTimes(1)
    expect(screen.getByTestId('state').textContent).toBe('0')
    fireEvent.click(screen.getByText('change'))
    expect(rendered).toBeCalledTimes(2)
    expect(screen.getByTestId('state').textContent).toBe('1')
    fireEvent.click(screen.getByText('change'))
    expect(rendered).toBeCalledTimes(3)
    expect(screen.getByTestId('state').textContent).toBe('2')
  })
})
