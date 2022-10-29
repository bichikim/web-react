import {act, renderHook} from '@testing-library/react-hooks'
import {computed} from '../'
import {signal} from '../../signal'

it('should computed the value in a component', () => {
  const age = signal(0)
  const wrapper = renderHook(() => {
    const double = computed(() => age.value * 2)
    const inc = () => {
      age.value += 1
    }
    return {
      double,
      inc,
    }
  })

  expect(wrapper.result.current.double.value).toBe(0)

  act(() => {
    wrapper.result.current.inc()
  })

  expect(wrapper.result.current.double.value).toBe(2)
})

it('should computed the value', () => {
  const age = signal(0)
  const double = computed(() => age.value * 2)
  const inc = () => {
    age.value += 1
  }

  expect(double.value).toBe(0)
  inc()

  expect(double.value).toBe(2)
})
