import {useCustomEffect} from '../'
import {renderHook} from '@testing-library/react-hooks'
import isEqual from 'react-fast-compare'

describe('useCustomEffect', () => {
  it('should effect with custom compare', () => {
    const callback = jest.fn()
    const wrapper = renderHook(
      (props) => {
        useCustomEffect(
          () => {
            props.onEffect?.()
          },
          [props.dep],
          isEqual,
        )
      },
      {
        initialProps: {
          dep: {foo: 'foo'},
          onEffect: callback,
        },
      },
    )

    expect(callback).toHaveBeenCalledTimes(1)

    wrapper.rerender({
      dep: {foo: 'foo'},
      onEffect: callback,
    })

    expect(callback).toHaveBeenCalledTimes(1)

    wrapper.rerender({
      dep: {foo: 'bar'},
      onEffect: callback,
    })

    expect(callback).toHaveBeenCalledTimes(2)
  })
})
