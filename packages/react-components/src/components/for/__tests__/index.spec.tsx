/**
 * @jest-environment jsdom
 */
import {For} from '../'
import {render, screen} from '@testing-library/react'

describe('For', () => {
  it('should render list all', async () => {
    render(<For each={[1, 2, 3, 4, 5]}>{(item) => <div data-testid="item">{item}</div>}</For>)

    expect(await screen.findAllByTestId('item')).toMatchSnapshot()
  })
  it('should render fallback', async () => {
    render(
      <For each={[]} fallback={<div data-testid="loading">Loading...</div>}>
        {(item) => <div data-testid="item">{item}</div>}
      </For>,
    )

    expect(await screen.findAllByTestId('loading')).toMatchSnapshot()
  })
})
