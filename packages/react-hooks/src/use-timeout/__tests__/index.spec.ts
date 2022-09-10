import {useTimeout} from '../'
import {useFakeTimers} from 'sinon'
import {renderHook} from '@testing-library/react-hooks'

describe('useTimeout', () => {
  it('should timeout', async () => {
    const clock = useFakeTimers()
    const callback = jest.fn()
    const wrapper = renderHook(() => useTimeout(callback, 1000))
    clock.tick(1000)
    expect(callback).not.toHaveBeenCalled()
    {
      const [set] = wrapper.result.current

      set('foo', 'bar')
    }

    clock.tick(1000)
    expect(callback).toHaveBeenCalledWith('foo', 'bar')
    callback.mockClear()

    {
      const [set] = wrapper.result.current

      set('foo', 'bar')
    }

    clock.tick(500)

    {
      const [set] = wrapper.result.current

      set('foo')
    }
    clock.tick(500)
    expect(callback).not.toHaveBeenCalled()
    clock.tick(500)
    expect(callback).toHaveBeenCalledWith('foo')
    callback.mockClear()

    {
      const [set] = wrapper.result.current

      set('john')
    }
    clock.tick(500)
    expect(callback).not.toHaveBeenCalled()
    {
      const [, clear] = wrapper.result.current

      clear()
    }
    clock.tick(1000)
    expect(callback).not.toHaveBeenCalled()
    clock.restore()
  })
})
