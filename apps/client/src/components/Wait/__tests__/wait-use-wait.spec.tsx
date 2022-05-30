import {useWait} from '../use-wait'
import {Wait} from '../'
import {fireEvent, render, screen} from '@testing-library/react'
import flushPromises from 'flush-promises'

describe('wait with use wait', () => {
  it('should wait Promise', async () => {
    const Root = () => {
      const {
        promise,
        reload,
        run,
      } = useWait((data) => Promise.resolve(data ?? 'foo'))
      return (
        <>
          <div data-testid="result">
            <Wait for={promise}>
              {{
                done: (value) => (
                  <span>{value}</span>
                ),
              }}
            </Wait>
          </div>
          <button data-testid="reload" onClick={reload}>reload</button>
          <button data-testid="run" onClick={() => run('bar')}>reload</button>
        </>
      )
    }
    await render(
      <Root />,
    )
    expect(screen.getByTestId('result').textContent).toBe('')
    fireEvent.click(screen.getByTestId('reload'))
    await flushPromises()
    expect(screen.getByTestId('result').textContent).toBe('foo')
    fireEvent.click(screen.getByTestId('run'))
    await flushPromises()
    expect(screen.getByTestId('result').textContent).toBe('bar')
  })
  it('should wait Promise', async () => {
    const rendered = jest.fn()
    const Root = () => {
      const {
        promise,
        reload,
        run,
      } = useWait((data) => Promise.resolve(data ?? 'foo'))
      const {
        promise: promise2,
      } = useWait((data) => Promise.resolve(data ?? 'foo'), {autoStart: true})
      rendered()
      return (
        <>
          <div data-testid="result">
            <Wait for={[promise, promise2]}>
              {{
                done: (value) => (
                  <span>{value}</span>
                ),
                waiting: (
                  <span>waiting</span>
                ),
              }}
            </Wait>
          </div>
          <button data-testid="reload" onClick={reload}>reload</button>
          <button data-testid="run" onClick={() => run('bar')}>reload</button>
        </>
      )
    }
    await render(
      <Root />,
    )
    expect(screen.getByTestId('result').textContent).toBe('waiting')
    expect(rendered).toHaveBeenCalledTimes(1)
    fireEvent.click(screen.getByTestId('reload'))
    await flushPromises()
    expect(rendered).toHaveBeenCalledTimes(2)
    expect(screen.getByTestId('result').textContent).toBe('foofoo')
    fireEvent.click(screen.getByTestId('run'))
    expect(screen.getByTestId('result').textContent).toBe('waiting')
    await flushPromises()
    expect(rendered).toHaveBeenCalledTimes(3)
    expect(screen.getByTestId('result').textContent).toBe('barfoo')
  })
})
