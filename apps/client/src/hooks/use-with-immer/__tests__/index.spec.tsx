import {fireEvent, render, screen} from '@testing-library/react'
import {useWithImmer} from '../'
import {useSafeState} from '../../use-safe-state'
import React, {useState} from 'react'
describe('useWithImmer', () => {
  it('should be immer setter', async () => {
    const rendered = jest.fn()
    const Component = (props) => {
      const [value, setValue] = useWithImmer(useState({
        age: 0,
        name: 'foo',
      }))
      const onChange = () => {
        setValue((draft) => {
          draft.age += 1
        })
      }
      rendered()
      return (
        <div>
          <button onClick={onChange}>change</button>
          <div data-testid="name">{value.name}</div>
          <div data-testid="age">{value.age}</div>
        </div>
      )
    }

    await render(<Component />)
    expect(rendered).toBeCalledTimes(1)
    expect(screen.getByTestId('name').textContent).toBe('foo')
    expect(screen.getByTestId('age').textContent).toBe('0')
    fireEvent.click(screen.getByText('change'))
    expect(rendered).toBeCalledTimes(2)
    expect(screen.getByTestId('name').textContent).toBe('foo')
    expect(screen.getByTestId('age').textContent).toBe('1')
    fireEvent.click(screen.getByText('change'))
    expect(rendered).toBeCalledTimes(3)
    expect(screen.getByTestId('name').textContent).toBe('foo')
    expect(screen.getByTestId('age').textContent).toBe('2')
  })
  it('should be immer setter with getState', async () => {
    const rendered = jest.fn()
    const Component = (props) => {
      const [value, setValue] = useWithImmer(useSafeState({
        age: 0,
        name: 'foo',
      }))
      const onChange = () => {
        setValue((draft) => {
          draft.age += 1
        })
      }
      rendered()
      return (
        <div>
          <button onClick={onChange}>change</button>
          <div data-testid="name">{value().name}</div>
          <div data-testid="age">{value().age}</div>
        </div>
      )
    }

    await render(<Component />)
    expect(rendered).toBeCalledTimes(1)
    expect(screen.getByTestId('name').textContent).toBe('foo')
    expect(screen.getByTestId('age').textContent).toBe('0')
    fireEvent.click(screen.getByText('change'))
    expect(rendered).toBeCalledTimes(2)
    expect(screen.getByTestId('name').textContent).toBe('foo')
    expect(screen.getByTestId('age').textContent).toBe('1')
    fireEvent.click(screen.getByText('change'))
    expect(rendered).toBeCalledTimes(3)
    expect(screen.getByTestId('name').textContent).toBe('foo')
    expect(screen.getByTestId('age').textContent).toBe('2')
  })
})
