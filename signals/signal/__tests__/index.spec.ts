import {signal} from '../'
import {act, renderHook} from '@testing-library/react-hooks'

it('should be signal in a component', () => {
  const wrapper = renderHook(() => {
    const age = signal(0)
    const inc = () => {
      age.value += 1
    }
    return {
      age,
      inc,
    }
  })

  expect(wrapper.result.current.age.value).toBe(0)

  act(() => {
    wrapper.result.current.inc()
  })

  expect(wrapper.result.current.age.value).toBe(1)
})

it('should be signal', () => {
  const age = signal(0)
  const inc = () => {
    age.value += 1
  }

  expect(age.value).toBe(0)

  inc()

  expect(age.value).toBe(1)
})
