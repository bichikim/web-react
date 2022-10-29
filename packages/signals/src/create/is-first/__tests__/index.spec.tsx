import {useIsFirst} from '../'
import {render} from '@testing-library/react'
import {useEffect, useRef} from 'react'

describe('is first', () => {
  it('should return true when first rendering', () => {
    const Component = () => {
      const isFirst = useIsFirst()
      return (
        <div>
          <span>{isFirst.current ? 'true' : 'false'}</span>
        </div>
      )
    }

    const wrapper = render(<Component />)

    expect(wrapper.container.textContent).toBe('true')

    wrapper.rerender(<Component />)

    expect(wrapper.container.textContent).toBe('false')

    wrapper.rerender(<Component />)

    expect(wrapper.container.textContent).toBe('false')
  })
})
