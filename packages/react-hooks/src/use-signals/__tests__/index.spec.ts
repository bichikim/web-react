import {computed, useSignal} from '@preact/signals-react'
import {act, renderHook} from '@testing-library/react-hooks'
import {useSignals} from '../'
import {useRef} from 'react'

const useUpdate = (value) => {
  const old = useRef()
  if (!Object.is(value, old)) {
    old.current = value
  }
  return old.current
}

describe('useSignal', () => {
  it('should return signal (no repeat)', () => {
    const wrapper = renderHook(
      (props: {count: number}) => {
        const count = useSignal(0)
        count.value = props.count
        return useSignals(() => {
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
      },
      {initialProps: {count: 2}},
    )
    const increase = wrapper.result.current.increase
    expect(wrapper.result.current.double.value).toBe(4)
    act(() => {
      wrapper.result.current.increase()
    })
    expect(wrapper.result.current.double.value).toBe(6)
    expect(wrapper.result.current.increase).toBe(increase)

    wrapper.rerender({count: 0})
    expect(wrapper.result.current.double.value).toBe(0)
    expect(wrapper.result.current.increase).toBe(increase)
    act(() => {
      wrapper.result.current.increase()
    })
    expect(wrapper.result.current.double.value).toBe(2)
    expect(wrapper.result.current.increase).toBe(increase)
  })
})
