import {computed} from '@winter-love/signals-rebuild'
import {act, renderHook} from '@testing-library/react-hooks'
import {useMemo, useRef} from 'react'
import {createDeps} from 'src/create/deps'
import {createSignals} from '../'

describe('useSignal', () => {
  const isInComponent = jest.fn(() => true)
  const deps = createDeps({
    isInComponent,
    useMemo,
    useRef,
  })
  const signals = createSignals({
    isInComponent,
    useMemo,
    useRef,
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should return signal (no repeat)', () => {
    isInComponent.mockReturnValue(true)
    const wrapper = renderHook(
      (props: {count: number}) => {
        const {count} = deps(props)
        return signals(() => {
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
