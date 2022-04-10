import {fireEvent, render, screen} from '@testing-library/react'
import React, {FC, useState, useCallback} from 'react'
import {useSyncState} from '../'
import {useHandle} from '../../use-handle'

describe('signal', () => {
  it('should rerender ones', async () => {
    const rendered = jest.fn()
    const Component = (props) => {
      const [value, setValue] = useSyncState(props.value)
      const onChange = () => {
        setValue(`${value()}o`)
      }
      rendered()
      return (
        <div>
          <button onClick={onChange}>change</button>
          <div data-testid="value">{value()}</div>
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
  it('should rerender ones with an inner setFunction', async () => {
    const rendered = jest.fn()
    const Component = (props) => {
      const [value, setValue] = useSyncState(props.value)
      const onChange = () => {
        setValue(`${value()}o`)
      }
      rendered()
      return (
        <div>
          <button onClick={onChange}>change</button>
          <div data-testid="value">{value()}</div>
        </div>
      )
    }

    const Root = () => {
      const [value, setValue] = useState('foo')
      const onChange = () => {
        setValue((value) => `${value}o`)
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
  it('should be safe in callback that will not change itself', async () => {
    const rendered = jest.fn()
    const Component = (props) => {
      const [value, setValue] = useSyncState<string>('foo')
      const onChange = useCallback(() => {
        setValue(`${value()}o`)
      }, [])
      rendered()
      return (
        <div>
          <button onClick={onChange}>change</button>
          <div data-testid="value">{value()}</div>
        </div>
      )
    }
    await render(<Component />)
    expect(rendered).toBeCalledTimes(1)
    expect(screen.getByTestId('value').textContent).toBe('foo')
    fireEvent.click(screen.getByText('change'))
    expect(rendered).toBeCalledTimes(2)
    expect(screen.getByTestId('value').textContent).toBe('fooo')
    fireEvent.click(screen.getByText('change'))
    expect(rendered).toBeCalledTimes(3)
    expect(screen.getByTestId('value').textContent).toBe('foooo')
  })
  it('should rerender ones with deep', async () => {
    const rendered = jest.fn()

    interface Props {
      bar?: string
      foo: string
      onChangeBar?: (value: string) => void
    }

    const Component: FC<Props> = (props: any) => {
      const [state, setState] = useSyncState(props, {deep: true})
      const onChangeBar = useHandle(props.onChangeBar)
      const onChange = () => {
        setState((state) => {
          const bar = `${state.bar}o`
          onChangeBar(bar)
          return {
            ...state,
            bar,
          }
        })
      }
      rendered()
      return (
        <div>
          <button onClick={onChange}>change</button>
          <div data-testid="foo">{state().foo}</div>
          <div data-testid="bar">{state().bar}</div>
        </div>
      )
    }
    Component.defaultProps = {
      bar: 'bar',
    }

    interface RootState {
      bar?: string
      foo: string
      john: string
    }

    const Root = () => {
      const [state, setState] = useState<RootState>({
        bar: undefined,
        foo: 'foo',
        john: 'john',
      })
      const onChangeFoo = () => {
        setState((state) => ({
          ...state,
          foo: `${state.foo}o`,
        }))
      }
      const onChangeJohn = () => {
        setState((state) => ({
          ...state,
          john: `${state.john}o`,
        }))
      }
      const onChangeBar = (value?: string) => {
        setState((state) => ({
          ...state,
          bar: value,
        }))
      }
      return (
        <div>
          <button onClick={onChangeJohn}>rootChangeJohn</button>
          <button onClick={onChangeFoo}>rootChangeFoo</button>
          <div>{state.john}</div>
          <Component foo={state.foo} bar={state.bar} onChangeBar={onChangeBar} />
        </div>
      )
    }

    await render(<Root />)
    expect(rendered).toBeCalledTimes(1)
    expect(screen.getByTestId('foo').textContent).toBe('foo')
    expect(screen.getByTestId('bar').textContent).toBe('bar')
    fireEvent.click(screen.getByText('change'))
    expect(rendered).toBeCalledTimes(2)
    expect(screen.getByTestId('foo').textContent).toBe('foo')
    expect(screen.getByTestId('bar').textContent).toBe('baro')
    fireEvent.click(screen.getByText('change'))
    expect(rendered).toBeCalledTimes(3)
    expect(screen.getByTestId('foo').textContent).toBe('foo')
    expect(screen.getByTestId('bar').textContent).toBe('baroo')
    fireEvent.click(screen.getByText('rootChangeJohn'))
    expect(rendered).toBeCalledTimes(4)
    expect(screen.getByTestId('foo').textContent).toBe('foo')
    expect(screen.getByTestId('bar').textContent).toBe('baroo')
    fireEvent.click(screen.getByText('rootChangeFoo'))
    expect(rendered).toBeCalledTimes(5)
    expect(screen.getByTestId('foo').textContent).toBe('fooo')
    expect(screen.getByTestId('bar').textContent).toBe('baroo')
  })
})
