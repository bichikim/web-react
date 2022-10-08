import {createDeps} from '../'
import {renderHook} from '@testing-library/react-hooks'
import {useMemo, useRef} from 'react'

describe('deps', () => {
  const isInComponent = jest.fn(() => true)
  const deps = createDeps({
    isInComponent,
    useMemo,
    useRef,
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should return signals outside of a component', () => {
    isInComponent.mockReturnValue(false)
    const signals = deps({
      bar: 'bar',
      foo: 'foo',
    })

    expect(signals.foo.value).toBe('foo')
    expect(signals.bar.value).toBe('bar')
  })
  it('should return signals inside of a component', () => {
    isInComponent.mockReturnValue(true)
    const wrapper = renderHook(
      (props: {bar: string; foo: string}) => {
        return deps({
          bar: props.bar,
          foo: props.foo,
        })
      },
      {
        initialProps: {
          bar: 'bar',
          foo: 'foo',
        },
      },
    )
    const current = wrapper.result.current

    expect(current.foo.value).toBe('foo')
    expect(current.bar.value).toBe('bar')

    wrapper.rerender({
      bar: 'bar1',
      foo: 'foo1',
    })

    expect(current.foo.value).toBe('foo1')
    expect(current.bar.value).toBe('bar1')
  })
})
