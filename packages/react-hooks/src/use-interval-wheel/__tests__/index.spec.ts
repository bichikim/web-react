import {useIntervalWheel} from '../'
import {act, renderHook} from '@testing-library/react-hooks'
import {useFakeTimers} from 'sinon'

describe('useIntervalWheel', () => {
  it('should return list continuously', () => {
    const clock = useFakeTimers()

    const list = [
      'foo1',
      'foo2',
      'foo3',
      'foo4',
      'foo5',
      'foo6',
      'foo7',
      'foo8',
      'foo9',
      'foo10',
      'foo11',
      'foo12',
      'foo13',
      'foo14',
      'foo15',
      'foo16',
      'foo17',
    ]
    const wrapper = renderHook(({list}) => useIntervalWheel(list, {start: 3}), {
      initialProps: {
        list,
      },
    })

    expect(wrapper.result.current).toEqual(['foo1', 'foo2', 'foo3'])

    act(() => {
      clock.tick(100)
    })

    expect(wrapper.result.current).toEqual(['foo1', 'foo2', 'foo3', 'foo4'])

    act(() => {
      clock.tick(100)
    })

    expect(wrapper.result.current).toEqual(['foo1', 'foo2', 'foo3', 'foo4', 'foo5'])

    clock.restore()
  })
})
