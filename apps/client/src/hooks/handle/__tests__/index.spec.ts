import {renderHook} from '@testing-library/react-hooks'
import {useHandle} from '../'

describe('useHandle', () => {
  it('should create handle only once', () => {
    const callback = jest.fn()

    interface Props {
      callback?: (name: string) => void
      name: string
    }

    const {result, rerender} = renderHook(
      (props: Props) =>
        useHandle((props) => {
          props.callback?.(props.name)
        }, props),
      {
        initialProps: {
          callback,
          name: 'foo',
        },
      },
    )

    const handleFirst = result.current
    handleFirst()
    expect(callback.mock.calls[0]).toEqual(['foo'])
    rerender({
      callback,
      name: 'bar',
    })
    const handleSecond = result.current
    expect(handleFirst).toBe(handleSecond)
    handleSecond()
    expect(callback.mock.calls[1]).toEqual(['bar'])
  })
})
