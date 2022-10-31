import {useAsync} from '../'
import flushPromises from 'flush-promises'
import {act, renderHook} from '@testing-library/react-hooks'

describe('use-async', () => {
  it('should return state with async function', async () => {
    const wrapper = renderHook(
      (props: {name: string}) => useAsync('foo', () => Promise.resolve(props.name)),
      {
        initialProps: {name: 'foo'},
      },
    )
    const [state, run] = wrapper.result.current
    expect(state.data).toBe('foo')

    wrapper.rerender({name: 'bar'})

    act(() => {
      run()
    })

    {
      const [state] = wrapper.result.current
      expect(state.data).toBe('foo')
    }

    await flushPromises()

    {
      const [state] = wrapper.result.current
      expect(state.data).toBe('bar')
    }
  })
})
