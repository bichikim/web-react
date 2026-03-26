import {render} from '@testing-library/react'
import {Toggle} from '../'
import {vi} from 'vitest'

describe('toggle', () => {
  it('should toggle', () => {
    const ran = vi.fn(() => 'bar')

    const wrapper = render(
      <Toggle>
        {() => ran()}
        {'foo'}
      </Toggle>,
    )

    expect(wrapper.container.textContent).toBe('')
    expect(ran).toHaveBeenCalledTimes(0)

    wrapper.rerender(
      <Toggle when>
        {() => ran()}
        {'foo'}
      </Toggle>,
    )

    expect(wrapper.container.textContent).toBe('barfoo')
    expect(ran).toHaveBeenCalledTimes(1)
  })
})
