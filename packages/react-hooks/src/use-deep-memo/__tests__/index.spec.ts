import * as useCustomMemoModule from 'src/use-custom-memo'
import {useDeepMemo} from '../'
import {renderHook} from '@testing-library/react-hooks'
import isEqual from 'react-fast-compare'

describe('useDeepMemo', () => {
  it('should ', () => {
    jest.spyOn(useCustomMemoModule, 'useCustomMemo').mockImplementationOnce(() => {
      return 'return'
    })
    let factory
    const wrapper = renderHook(
      (props) => {
        factory = () => {
          return props.data
        }
        return useDeepMemo(factory, [props.data])
      },
      {
        initialProps: {data: {foo: 'foo'}},
      },
    )

    expect(useCustomMemoModule.useCustomMemo).toHaveBeenCalledWith(factory, [{foo: 'foo'}], isEqual)
    expect(wrapper.result.current).toBe('return')
  })
})
