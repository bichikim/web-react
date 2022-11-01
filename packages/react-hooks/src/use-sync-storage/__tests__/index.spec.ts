import {renderHook} from '@testing-library/react-hooks'
import {useSyncStorage} from '../'

describe('use-sync-storage', () => {
  it('should use sync', () => {
    const key = '__key__ '
    const wrapper = renderHook(
      (props) => {
        return useSyncStorage(key, props.name, 'local')
      },
      {
        initialProps: {name: 'foo'},
      },
    )

    expect(wrapper.result.current).toBe('foo')

    expect(localStorage.getItem(key)).toBe('"foo"')

    wrapper.rerender({name: 'bar'})

    expect(localStorage.getItem(key)).toBe('"bar"')

    expect(wrapper.result.current).toBe('bar')
  })
  it('should use sync (default)', () => {
    const key = '__key__ '
    localStorage.setItem(key, '"john"')
    const wrapper = renderHook(
      (props) => {
        return useSyncStorage(key, props.name, 'local')
      },
      {
        initialProps: {name: 'foo'},
      },
    )

    expect(wrapper.result.current).toBe('john')

    expect(localStorage.getItem(key)).toBe('"john"')

    wrapper.rerender({name: 'bar'})

    expect(localStorage.getItem(key)).toBe('"bar"')

    expect(wrapper.result.current).toBe('bar')
  })
})
