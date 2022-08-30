import {render, screen} from '@testing-library/react'
import React, {useRef} from 'react'
import {useOnce} from '../'

describe('once', () => {
  it('should render once', async () => {
    const Component = (props) => {
      const age = useRef(props.age)

      useOnce(() => {
        age.current += 1
      })

      return <div data-testid="age">{age.current}</div>
    }
    const {rerender} = await render(<Component age={0} />)

    expect(screen.getByTestId('age').textContent).toBe('1')
    rerender(<Component age={5} />)
    expect(screen.getByTestId('age').textContent).toBe('1')
  })
})
