import {useCompareUpdate} from '../'
import {renderHook} from '@testing-library/react-hooks'

describe('useCompareUpdate', () => {
  it('should not return a new object', () => {
    const {result, rerender} = renderHook((props) => useCompareUpdate(props.options), {
      initialProps: {
        options: {
          foo: {
            bar: 'bar',
          },
        },
      },
    })

    const previous = result.current

    rerender({
      options: {
        foo: {
          bar: 'bar',
        },
      },
    })

    expect(Object.is(result.current, previous)).toBe(true)
  })
  it('should return a new object', () => {
    const {result, rerender} = renderHook((props) => useCompareUpdate(props.options), {
      initialProps: {
        options: {
          foo: {
            bar: 'bar',
          },
        },
      },
    })

    const previous = result.current

    rerender({
      options: {
        foo: {
          bar: 'john',
        },
      },
    })

    expect(Object.is(result.current, previous)).toBe(false)
  })
})
