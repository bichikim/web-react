import {act, render} from '@testing-library/react'
import {createPeekedSignal} from '../'
import {signal} from '@winter-love/signals-rebuild/react'

describe('peek signal', () => {
  it('should not rerender', () => {
    const peekedSignal = createPeekedSignal({
      signal,
    })
    const name = peekedSignal('foo')
    const age = signal(0)
    console.log(name.value)
    const Component = () => {
      return (
        <div>
          <span>{name.value}</span>
          <span>{age.value}</span>
        </div>
      )
    }
    const wrapper = render(<Component />)

    expect(wrapper.container.textContent).toBe('foo0')

    act(() => {
      age.value = 2
    })

    expect(wrapper.container.textContent).toBe('foo2')

    act(() => {
      name.value = 'bar'
    })

    expect(wrapper.container.textContent).toBe('foo2')

    act(() => {
      age.value = 3
    })

    expect(wrapper.container.textContent).toBe('bar3')
  })
})
