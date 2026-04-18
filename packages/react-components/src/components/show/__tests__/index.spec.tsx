import {Show} from '../'
import {render, screen} from '@testing-library/react'

describe('Show', () => {
  it('should not render children when the when is false', () => {
    render(
      <Show when={false}>
        hello
        <div data-testid="element1">hello2</div>
        <div data-testid="element2">hello2</div>
      </Show>,
    )
    expect(screen.queryByText('hello')).not.toBeInTheDocument()
    expect(screen.queryByTestId('element1')).not.toBeInTheDocument()
    expect(screen.queryByTestId('element2')).not.toBeInTheDocument()
  })
  it('should render children when the when is true', () => {
    render(
      <Show when={true}>
        hello
        <div data-testid="element1">hello2</div>
        <div data-testid="element2">hello2</div>
      </Show>,
    )
    expect(screen.getByText('hello')).toBeInTheDocument()
    expect(screen.getByTestId('element1')).toBeVisible()
    expect(screen.getByTestId('element2')).toBeVisible()
  })
})
