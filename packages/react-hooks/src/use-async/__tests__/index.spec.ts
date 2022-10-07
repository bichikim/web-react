import {useAsync} from '../'
import flushPromises from 'flush-promises'
import {renderHook} from '@testing-library/react-hooks'

describe('use-async', () => {
  it('should return state with async function', () => {
    const wrapper = renderHook(
      (props: {name: string}) => useAsync('foo', () => Promise.resolve(props.name)),
      {
        initialProps: {name: 'foo'},
      },
    )
    // todo 작업중
  })
})
