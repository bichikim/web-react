import {useHandle} from '../'
import {fireEvent, render, screen} from '@testing-library/react'
import React, {FC, useCallback, useEffect, useRef, useState} from 'react'

describe('use-handle', () => {
  it('should not return new function with changing any value', async () => {
    const rendered = jest.fn((...args) => args)
    interface ComponentProps {
      age?: number
      onChange?: () => void
    }
    const Component: FC<ComponentProps> = (props) => {
      const [state, setState] = useState(0)
      const onChange = useHandle(props.onChange)
      const prev = useRef(onChange)
      const onIncrease = () => {
        setState((value) => value + 1)
      }
      rendered(prev.current === onChange)
      useEffect(() => {
        prev.current = onChange
      })
      return (
        <div>
          <button onClick={onIncrease}>increase</button>
          <button onClick={onChange}>change</button>
          <div data-testid="state">{String(state)}</div>
          <div data-testid="age">{String(props.age)}</div>
        </div>
      )
    }
    const Root = () => {
      const [state, setState] = useState(0)
      const onChange = () => {
        setState((value) => value + 1)
      }
      return (
        <Component onChange={onChange} age={state} />
      )
    }
    await render(<Root />)
    expect(rendered).toBeCalledTimes(1)
    expect(rendered.mock.calls[0]).toEqual([true])
    expect(screen.getByTestId('age').textContent).toBe('0')
    fireEvent.click(screen.getByText('change'))
    expect(rendered).toBeCalledTimes(2)
    expect(rendered.mock.calls[1]).toEqual([true])
    expect(screen.getByTestId('state').textContent).toBe('0')
    expect(screen.getByTestId('age').textContent).toBe('1')
    fireEvent.click(screen.getByText('increase'))
    expect(rendered).toBeCalledTimes(3)
    expect(rendered.mock.calls[2]).toEqual([true])
    expect(screen.getByTestId('state').textContent).toBe('1')
    expect(screen.getByTestId('age').textContent).toBe('1')
  })
})
