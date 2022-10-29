import {batch, computed, signal} from 'signal.tmp'
import {renderHook} from '@testing-library/react-hooks'
import {act, fireEvent, render} from '@testing-library/react'
import {useEffect, useMemo, useRef} from 'react'
import {deps} from 'src/create/deps'
import {signals} from '../'

describe('useSignal', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should return signal (no repeat)', () => {
    const rendered = jest.fn()
    const Component = (props: {count: number}) => {
      const {count} = deps(props, {write: true})
      const {double, increase} = signals(() => {
        const increase = () => {
          count.value += 1
        }
        const double = computed(() => {
          return count.value * 2
        })
        return {
          double,
          increase,
        }
      })

      rendered()

      return (
        <div>
          <span data-testid="count">{count.value}</span>
          <span data-testid="double">{double.value}</span>
          <button data-testid="button" onClick={increase}>
            increase
          </button>
        </div>
      )
    }

    const wrapper = render(<Component count={2} />)

    expect(rendered).toBeCalledTimes(1)
    expect(wrapper.getByTestId('count').textContent).toBe('2')
    expect(wrapper.getByTestId('double').textContent).toBe('4')

    fireEvent.click(wrapper.getByTestId('button'))
    expect(rendered).toBeCalledTimes(2)
    expect(wrapper.getByTestId('count').textContent).toBe('3')
    expect(wrapper.getByTestId('double').textContent).toBe('6')

    wrapper.rerender(<Component count={0} />)
    expect(wrapper.getByTestId('count').textContent).toBe('0')
    expect(wrapper.getByTestId('double').textContent).toBe('0')
  })
})
