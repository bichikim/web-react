/**
 * @jest-environment jsdom
 */

import {render, waitFor} from '@testing-library/react'
import {FC, useRef} from 'react'
import {useMutationObserver} from '../'

describe('useMutationObserver', () => {
  it('should call callback with mutation observer', async () => {
    const callback = jest.fn()

    const Component: FC<{color: string; onCallback: (...args) => any}> = (props) => {
      const ref = useRef()
      useMutationObserver(ref, {attributes: true}, props.onCallback)
      return (
        <div data-testid="test" ref={ref} style={{color: props.color}}>
          nothing
        </div>
      )
    }

    const wrapper = render(<Component color={'red'} onCallback={callback} />)
    wrapper.rerender(<Component color={'blue'} onCallback={callback} />)
    expect(callback).toBeCalledTimes(0)
    await waitFor(() => {
      expect(callback).toBeCalledTimes(1)
    })
  })
})
