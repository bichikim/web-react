import {act, renderHook} from '@testing-library/react-hooks'
import {useConnection} from '../'

describe('use-connection', () => {
  beforeEach(() => {
    jest.spyOn(window, 'addEventListener').mockClear()
  })
  afterEach(() => {
    jest.spyOn(window, 'addEventListener').mockClear()
  })
  it('should change connection state', () => {
    const spy = jest.spyOn(window, 'addEventListener')

    const wrapper = renderHook(() => {
      return useConnection(true)
    })

    const onlineHandler: any = spy.mock.calls[1][1]
    const offlineHandler: any = spy.mock.calls[2][1]

    expect(wrapper.result.current.current).toBe(true)

    act(() => {
      offlineHandler()
    })

    expect(wrapper.result.current.current).toBe(false)

    act(() => {
      onlineHandler()
    })

    expect(wrapper.result.current.current).toBe(true)
  })
})
