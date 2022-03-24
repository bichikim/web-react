import {fireEvent, render, screen} from '@testing-library/react'
import React from 'react'
import {useSignal} from '../'

describe('signal', () => {
  it('should rerender ones', async () => {
    const rendered = jest.fn()
    const Component = () => {
      const onSignal = useSignal()
      rendered()
      return (
        <button onClick={onSignal}>signal</button>
      )
    }

    await render(<Component />)
    expect(rendered).toBeCalledTimes(1)
    fireEvent.click(screen.getByText('signal'))
    expect(rendered).toBeCalledTimes(2)
  })
})
