import {renderHook} from '@testing-library/react-hooks'
import isEqual from 'react-fast-compare'
import {useCustomLayoutEffect} from 'src/use-custom-layout-effect'

describe('useCustomLayoutEffect', () => {
  it('should effect with custom compare', () => {
    const callback = jest.fn()
    const wrapper = renderHook(
      (props) => {
        useCustomLayoutEffect(
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
