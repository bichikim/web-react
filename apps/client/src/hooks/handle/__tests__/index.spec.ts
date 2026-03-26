import {renderHook} from '@testing-library/react-hooks'
import {useHandle} from '../'
import {vi} from 'vitest'

describe('useHandle', () => {
  it('should create handle only once', () => {
    const callback = vi.fn()

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
