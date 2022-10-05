import {Show} from '../'
import {render, screen} from '@testing-library/react'

describe('Show', () => {
  it('should not be visible with the when is false', () => {
    render(
      <Show when={false}>
        hello
        <div data-testid="element1">hello2</div>
        <div data-testid="element2">hello2</div>
      </Show>,
    )
    expect(screen.getByText('hello')).toMatchSnapshot()
    expect(screen.getByTestId('element1')).not.toBeVisible()
    expect(screen.getByTestId('element2')).not.toBeVisible()
  })
  it('should be visible with the when is true', () => {
    render(
      <Show when={true}>
        hello
        <div data-testid="element1">hello2</div>
        <div data-testid="element2">hello2</div>
      </Show>,
    )
    expect(screen.getByText('hello')).toMatchSnapshot()
    expect(screen.getByTestId('element1')).toBeVisible()
    expect(screen.getByTestId('element2')).toBeVisible()
  })
})
