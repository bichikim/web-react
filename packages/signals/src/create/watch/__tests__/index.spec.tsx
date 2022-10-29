import {watch} from '../'
import {signal} from 'src/create/signal'
import {} from '@winter-love/signals-rebuild'
import {fireEvent, render} from '@testing-library/react'

describe('watch', () => {
  it('should watch', () => {
    const callback = jest.fn()
    const Component = () => {
      const age = signal(0)
      watch(age, callback)

      const increase = () => {
        age.value += 1
      }
      return (
        <div>
          <span data-testid="age">{age.value}</span>
          <button data-testid="button" onClick={increase}>
            increase
          </button>
        </div>
      )
    }

    const wrapper = render(<Component />)

    expect(wrapper.getByTestId('age').textContent).toBe('0')
    fireEvent.click(wrapper.getByTestId('button'))
    expect(wrapper.getByTestId('age').textContent).toBe('1')
  })
})
