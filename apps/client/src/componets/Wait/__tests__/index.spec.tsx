import {render, screen} from '@testing-library/react'
import {Wait} from '../'
import flushPromises from 'flush-promises'

describe('Wait', () => {
  it('should render waiting elements and done elements', async () => {
    let _resolve
    const promise = new Promise((resolve) => {
      _resolve = resolve
    })
    await render(
      <Wait for={promise} >
        {(waiting, value, error) => {
          if (waiting) {
            return (
              <div data-testid="result">waiting</div>
            )
          }
          if (error) {
            return (
              <div data-testid="result">error</div>
            )
          }
          return <div data-testid="result">done</div>
        }}
      </Wait>,
    )
    expect(screen.getByTestId('result').textContent).toBe('waiting')
    _resolve()
    await flushPromises()
    expect(screen.getByTestId('result').textContent).toBe('done')
  })
  it('should render error elements', async () => {
    let _resolve
    let _reject
    const promise = new Promise((resolve, reject) => {
      _resolve = resolve
      _reject = reject
    })
    await render(
      <Wait for={promise} >
        {(waiting, value, error) => {
          if (waiting) {
            return (
              <div data-testid="result">waiting</div>
            )
          }
          if (error) {
            return (
              <div data-testid="result">error</div>
            )
          }
          return <div data-testid="result">done</div>
        }}
      </Wait>,
    )
    expect(screen.getByTestId('result').textContent).toBe('waiting')
    _reject()
    await flushPromises()
    expect(screen.getByTestId('result').textContent).toBe('error')
  })
  it('should render waiting elements and done elements', async () => {
    let _resolve
    let _reject
    const promise = new Promise((resolve, reject) => {
      _resolve = resolve
      _reject = reject
    })
    await render(
      <Wait for={promise} >
        {{
          done: (
            <div data-testid="result">done</div>
          ),
          error: (
            <div data-testid="result">error</div>
          ),
          waiting: (
            <div data-testid="result">waiting</div>
          ),
        }}
      </Wait>,
    )
    expect(screen.getByTestId('result').textContent).toBe('waiting')
    _resolve()
    await flushPromises()
    expect(screen.getByTestId('result').textContent).toBe('done')
  })
  it('should render waiting elements and done elements', async () => {
    let _resolve
    let _reject
    const promise = new Promise((resolve, reject) => {
      _resolve = resolve
      _reject = reject
    })
    await render(
      <Wait for={promise} >
        {{
          done: (value) => (
            <div data-testid="result">done {value}</div>
          ),
          error: (
            <div data-testid="result">error</div>
          ),
          waiting: (
            <div data-testid="result">waiting</div>
          ),
        }}
      </Wait>,
    )
    expect(screen.getByTestId('result').textContent).toBe('waiting')
    _resolve('foo')
    await flushPromises()
    expect(screen.getByTestId('result').textContent).toBe('done foo')
  })
  it('should render waiting elements and error elements', async () => {
    let _resolve
    let _reject
    const promise = new Promise((resolve, reject) => {
      _resolve = resolve
      _reject = reject
    })
    await render(
      <Wait for={promise} >
        {{
          done: (value) => (
            <div data-testid="result">done {value}</div>
          ),
          error: (error) => (
            <div data-testid="result">error {error.message}</div>
          ),
          waiting: (
            <div data-testid="result">waiting</div>
          ),
        }}
      </Wait>,
    )
    expect(screen.getByTestId('result').textContent).toBe('waiting')
    _reject(new Error('I am Error'))
    await flushPromises()
    expect(screen.getByTestId('result').textContent).toBe('error I am Error')
  })
  it('should render elements after it is done', async () => {
    let _resolve
    let _reject
    const promise = new Promise((resolve, reject) => {
      _resolve = resolve
      _reject = reject
    })
    const result = await render(
      <Wait for={promise} >
        <div data-testid="result">done</div>
      </Wait>,
    )
    expect(result.container.textContent).toBe('')
    _resolve()
    await flushPromises()
    expect(screen.getByTestId('result').textContent).toBe('done')
  })
  it('should render a result after it is done', async () => {
    let _resolve
    let _reject
    const promise = new Promise((resolve, reject) => {
      _resolve = resolve
      _reject = reject
    })
    const result = await render(
      <Wait for={promise} >
        {(waiting, value) => waiting || <div data-testid="result">done {value}</div>}
      </Wait>,
    )
    expect(result.container.textContent).toBe('')
    _resolve('foo')
    await flushPromises()
    expect(screen.getByTestId('result').textContent).toBe('done foo')
  })
})
