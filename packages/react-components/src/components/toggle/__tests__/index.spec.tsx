import {render} from '@testing-library/react'
import {Toggle} from '../'

describe('toggle', () => {
  it('should toggle', () => {
    const wrapper = render(<Toggle>foo</Toggle>)

    expect(wrapper.container.textContent).toBe('')

    wrapper.rerender(<Toggle when>foo</Toggle>)

    expect(wrapper.container.textContent).toBe('foo')
  })
})
