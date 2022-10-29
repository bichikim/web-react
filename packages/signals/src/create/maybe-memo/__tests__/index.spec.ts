import {useMaybeMemo} from '../'
import {act, renderHook} from '@testing-library/react-hooks'
import {useMemo, useRef} from 'react'

describe('createMaybeMemo', () => {
  const runOnce = jest.fn((callback) => callback)
  const callback = jest.fn()
  const callback2 = jest.fn()
  const rendered = jest.fn()

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should run as hooks in a component', () => {
    const wrapper = renderHook(
      (props) => {
        rendered()
        return useMaybeMemo(
          (depsRef) => {
            const callback = () => {
              depsRef.current.callback()
            }
            return runOnce(callback)
          },
          {callback: props.callback},
        )
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
    const result = useMaybeMemo(
      (depsRef) => {
        const callback = () => {
          depsRef.current.callback()
        }
        return runOnce(callback)
      },
      {callback},
    )
    expect(callback).toBeCalledTimes(0)
    expect(runOnce).toBeCalledTimes(1)

    result()

    expect(callback).toBeCalledTimes(1)
    expect(runOnce).toBeCalledTimes(1)
  })
})
