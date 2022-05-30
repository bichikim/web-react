import {render, screen} from '@testing-library/react'
import {For} from '../'

describe('For', () => {
  it('should render any list', async () => {
    const list = [
      {
        id: 1,
        title: 'foo',
      },
      {
        id: 2,
        title: 'bar',
      },
    ]
    await render(
      <For list={list} >
        {(item) => (
          <div key={item.id}
            data-testid={`root-${item.id}`}
          >
            <span>{item.id}</span>
            <span>{item.title}</span>
          </div>
        )}
      </For>,
    )
    expect(screen.getByTestId('root-1')).toMatchSnapshot()
    expect(screen.getByTestId('root-2')).toMatchSnapshot()
  })
})
