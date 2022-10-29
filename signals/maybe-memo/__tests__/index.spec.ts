import {useMaybeMemo} from '../'
import {act, renderHook} from '@testing-library/react-hooks'
import {useMemo, useRef} from 'react'

describe('createMaybeMemo', () => {
  const setup = () => {
    const callback = jest.fn()
    const callback2 = jest.fn()
    const rendered = jest.fn()
    const runOnce = jest.fn((callback) => callback)
    return {
      callback,
      callback2,
      rendered,
      runOnce,
    }
  }

  it('should run as hooks in a component', () => {
    const {runOnce, rendered, callback, callback2} = setup()
    const wrapper = renderHook(
      (props) => {
        const callbackRef = useRef(props.callback)
        callbackRef.current = props.callback
        rendered()
        return useMaybeMemo(() => {
          return runOnce(() => callbackRef.current())
        })
      },
      {
        initialProps: {
          callback,
        },
      },
    )

    expect(runOnce).toBeCalledTimes(1)
    expect(rendered).toBeCalledTimes(1)
    expect(callback).toBeCalledTimes(0)

    wrapper.rerender({
      callback,
    })

    expect(runOnce).toBeCalledTimes(1)
    expect(rendered).toBeCalledTimes(2)
    expect(callback).toBeCalledTimes(0)

    act(() => {
      wrapper.result.current()
    })

    expect(runOnce).toBeCalledTimes(1)
    expect(rendered).toBeCalledTimes(2)
    expect(callback).toBeCalledTimes(1)

    wrapper.rerender({
      callback: callback2,
    })

    expect(runOnce).toBeCalledTimes(1)
    expect(rendered).toBeCalledTimes(3)
    expect(callback).toBeCalledTimes(1)
    expect(callback2).toBeCalledTimes(0)

    act(() => {
      wrapper.result.current()
    })

    expect(runOnce).toBeCalledTimes(1)
    expect(rendered).toBeCalledTimes(3)
    expect(callback).toBeCalledTimes(1)
    expect(callback2).toBeCalledTimes(1)
  })
  it('should run as a function not in a component', () => {
    const {runOnce, rendered, callback, callback2} = setup()
    const result = useMaybeMemo(() => {
      return runOnce(callback)
    })
    expect(callback).toBeCalledTimes(0)
    expect(runOnce).toBeCalledTimes(1)

    result()

    expect(callback).toBeCalledTimes(1)
    expect(runOnce).toBeCalledTimes(1)
  })
})
