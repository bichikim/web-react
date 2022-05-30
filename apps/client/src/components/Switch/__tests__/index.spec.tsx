import {Switch} from '../'
import {render, screen} from '@testing-library/react'

describe('Switch', () => {
  it('should render yes if it is true', async () => {
    await render(
      <div data-testid="root">
        <Switch when={true}>
          {() => ({
            no: 'No I am not',
            yes: 'Yes I am',
          })}
        </Switch>
      </div>,
    )
    expect(screen.getByTestId('root').textContent).toBe('Yes I am')
  })
  it('should render yes if it is true with an object children', async () => {
    await render(
      <div data-testid="root">
        <Switch when={true}>
          {{
            no: 'No I am not',
            yes: 'Yes I am',
          }}
        </Switch>
      </div>,
    )
    expect(screen.getByTestId('root').textContent).toBe('Yes I am')
  })
  it('should render children if it is true', async () => {
    await render(
      <div data-testid="root">
        <Switch when={true}>
          <div>
            <span>Yes </span>
            <strong>I </strong>
            <span>am</span>
          </div>
        </Switch>
      </div>,
    )
    expect(screen.getByTestId('root').textContent).toBe('Yes I am')
  })
  it('should not render children if it is false', async () => {
    await render(
      <div data-testid="root">
        <Switch when={false}>
          <div>
            <span>Yes </span>
            <strong>I </strong>
            <span>am</span>
          </div>
        </Switch>
      </div>,
    )
    expect(screen.getByTestId('root').textContent).toBe('')
  })
  it('should render no if it is false', async () => {
    await render(
      <div data-testid="root">
        <Switch when={false}>
          {() => ({
            no: 'No I am not',
            yes: 'Yes I am',
          })}
        </Switch>
      </div>,
    )
    expect(screen.getByTestId('root').textContent).toBe('No I am not')
  })
  it('should render no without no children', async () => {
    await render(
      <div data-testid="root">
        <Switch when={false}>
          {() => ({
            yes: 'Yes I am',
          })}
        </Switch>
      </div>,
    )
    expect(screen.getByTestId('root').textContent).toBe('')
  })
  it('should render without none children', async () => {
    await render(
      <div data-testid="root">
        <Switch when={false} />
      </div>,
    )
    expect(screen.getByTestId('root').textContent).toBe('')
  })
  it('should render yes with element', async () => {
    await render(
      <div data-testid="root">
        <Switch when={true}>
          {() => ({
            yes: (
              <div>
                <span>Yes </span>
                <strong>I </strong>
                <span>am</span>
              </div>
            ),
          })}
        </Switch>
      </div>,
    )
    expect(screen.getByTestId('root').textContent).toBe('Yes I am')
  })
  it('should render yes with React component', async () => {
    const Yes = () => {
      return (
        <div>
          <span>Yes </span>
          <strong>I </strong>
          <span>am</span>
        </div>
      )
    }
    await render(
      <div data-testid="root">
        <Switch when={true}>
          {() => ({
            no: 'No I am not',
            yes: <Yes />,
          })}
        </Switch>
      </div>,
    )
    expect(screen.getByTestId('root').textContent).toBe('Yes I am')
  })
})
