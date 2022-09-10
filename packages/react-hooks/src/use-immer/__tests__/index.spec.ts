import {useImmer} from '../'
import {act, renderHook} from '@testing-library/react-hooks'

describe('use-immer', () => {
  it('should update and render with only changed state', () => {
    const rendered = jest.fn()
    const wrapper = renderHook(() => {
      rendered()
      return useImmer(() => ({foo: 'foo'}))
    })

    {
      const [state, setState] = wrapper.result.current
      expect(state).toEqual({foo: 'foo'})
      expect(rendered).toBeCalledTimes(1)
      act(() => {
        setState((draft) => {
          draft.foo = 'foo'
        })
      })
    }
    {
      const [state, setState] = wrapper.result.current
      expect(state).toEqual({foo: 'foo'})
      expect(rendered).toBeCalledTimes(1)
      act(() => {
        setState((draft) => {
          draft.foo = 'bar'
        })
      })
    }
    {
      const [state, setState] = wrapper.result.current
      expect(state).toEqual({foo: 'bar'})
      expect(rendered).toBeCalledTimes(2)
      act(() => {
        setState((draft) => {
          draft.foo = 'bar'
        })
      })
    }
    {
      const [state, setState] = wrapper.result.current
      expect(state).toEqual({foo: 'bar'})
      expect(rendered).toBeCalledTimes(2)
      act(() => {
        setState((draft) => {
          draft.foo = 'foo'
        })
      })
    }
    {
      const [state, setState] = wrapper.result.current
      expect(state).toEqual({foo: 'foo'})
      expect(rendered).toBeCalledTimes(3)
      act(() => {
        setState((draft) => {
          draft.foo = 'foo'
        })
      })
    }
  })
})
