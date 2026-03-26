/**
 * @vitest-environment jsdom
 */
import {act} from '@testing-library/react'
import {renderHook} from '@testing-library/react-hooks'
import {RenderHookResult} from '@testing-library/react-hooks/src/types'
import {useRef} from 'react'
import {useEvent, UseEventOptions} from '../'
import {vi} from 'vitest'

describe('useEvent', () => {
  interface ComponentProps {
    handle?: (event: any) => any
    options?: UseEventOptions
  }

  let handle: (event: any) => any
  let wrapper: RenderHookResult<ComponentProps, void>

  class FakeElement {
    handler: ((event: any) => void) | null
    fakeEvent = {
      preventDefault: vi.fn(),
      stopImmediatePropagation: vi.fn(),
      stopPropagation: vi.fn(),
    }
    addEventListener = vi.fn((eventName: string, handler: () => void): void => {
      this.handler = handler
    })
    removeEventListener = vi.fn((): void => {
      this.handler = null
    })

    triggerHandler() {
      // noinspection JSPotentiallyInvalidUsageOfThis
      this.handler?.(this.fakeEvent)
    }
  }

  let fakeElement: FakeElement

  beforeEach(() => {
    fakeElement = new FakeElement()
    handle = vi.fn()
    wrapper = renderHook<ComponentProps, void>(
      ({options, handle}) => {
        const ref = useRef(fakeElement as any)

        useEvent(ref, 'click', handle, options)
      },
      {
        initialProps: {
          handle,
        },
      },
    )
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  it('should call the handle', async () => {
    expect(handle).toBeCalledTimes(0)
    act(() => {
      fakeElement.triggerHandler()
    })
    expect(handle).toBeCalledTimes(1)
    act(() => {
      fakeElement.triggerHandler()
    })
    expect(handle).toBeCalledTimes(2)
  })
  it('should call the handle once with the ones option', async () => {
    wrapper.rerender({
      handle,
      options: {ones: true},
    })
    expect(handle).toBeCalledTimes(0)
    act(() => {
      fakeElement.triggerHandler()
    })
    expect(handle).toBeCalledTimes(1)
    act(() => {
      fakeElement.triggerHandler()
    })
    expect(handle).toBeCalledTimes(1)
  })
  it('should call the handle and call preventDefault with the prevent option', async () => {
    wrapper.rerender({
      handle,
      options: {prevent: true},
    })
    expect(handle).toBeCalledTimes(0)
    act(() => {
      fakeElement.triggerHandler()
    })
    expect(fakeElement.fakeEvent.preventDefault).toBeCalledTimes(1)
    expect(handle).toBeCalledTimes(1)
    act(() => {
      fakeElement.triggerHandler()
    })
    expect(fakeElement.fakeEvent.preventDefault).toBeCalledTimes(2)
    expect(handle).toBeCalledTimes(2)
  })
  it('should call the handle and call stopPropagation with the stop option', async () => {
    wrapper.rerender({
      handle,
      options: {stop: true},
    })
    expect(handle).toBeCalledTimes(0)
    act(() => {
      fakeElement.triggerHandler()
    })
    expect(fakeElement.fakeEvent.stopPropagation).toBeCalledTimes(1)
    expect(handle).toBeCalledTimes(1)
    act(() => {
      fakeElement.triggerHandler()
    })
    expect(fakeElement.fakeEvent.stopPropagation).toBeCalledTimes(2)
    expect(handle).toBeCalledTimes(2)
  })
  it('should call the handle and call stopImmediatePropagation with the immediateStop option', async () => {
    wrapper.rerender({
      handle,
      options: {immediateStop: true},
    })
    expect(handle).toBeCalledTimes(0)
    act(() => {
      fakeElement.triggerHandler()
    })
    expect(fakeElement.fakeEvent.stopImmediatePropagation).toBeCalledTimes(1)
    expect(handle).toBeCalledTimes(1)
    act(() => {
      fakeElement.triggerHandler()
    })
    expect(fakeElement.fakeEvent.stopImmediatePropagation).toBeCalledTimes(2)
    expect(handle).toBeCalledTimes(2)
  })
  it('should call the handle and call addEventListener with the passive option with the passive option', async () => {
    wrapper.rerender({
      handle,
      options: {passive: true},
    })
    expect(handle).toBeCalledTimes(0)
    act(() => {
      fakeElement.triggerHandler()
    })
    const [, __, options] = fakeElement.addEventListener.mock.calls[1] as any
    expect(options).toEqual({
      passive: true,
    })
    expect(handle).toBeCalledTimes(1)
    act(() => {
      fakeElement.triggerHandler()
    })
    expect(handle).toBeCalledTimes(2)
  })
  it('should call removeEventListener before deleting a component or changing a ref', async () => {
    const fakeElement: any = {
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    }
    const fakeElement2: any = {
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    }
    const handle = vi.fn()

    const {rerender, unmount} = renderHook(
      ({fakeElement}) => {
        const ref = useRef(fakeElement)
        ref.current = fakeElement
        useEvent(ref, 'click', handle)
      },
      {
        initialProps: {
          fakeElement,
        },
      },
    )
    expect(fakeElement.addEventListener).toBeCalledTimes(1)
    expect(fakeElement.removeEventListener).toBeCalledTimes(0)
    rerender({
      fakeElement,
    })
    expect(fakeElement.addEventListener).toBeCalledTimes(1)
    expect(fakeElement.removeEventListener).toBeCalledTimes(0)
    rerender({
      fakeElement: fakeElement2,
    })
    expect(fakeElement.removeEventListener).toBeCalledTimes(1)
    expect(fakeElement2.addEventListener).toBeCalledTimes(1)
    expect(fakeElement2.removeEventListener).toBeCalledTimes(0)
    unmount()
    expect(fakeElement2.addEventListener).toBeCalledTimes(1)
    expect(fakeElement2.removeEventListener).toBeCalledTimes(1)
  })
  it('should call addEventListener and removeEventListener after changing options or handle', () => {
    const fakeElement = {
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    }
    const handle = vi.fn()
    const handle2 = vi.fn()
    const options = {
      ones: false,
    }
    const {rerender} = renderHook(
      (props) => {
        const {fakeElement} = props
        const ref = useRef(fakeElement)
        ref.current = fakeElement
        useEvent(ref, 'click', props.handle, props.options)
      },
      {
        initialProps: {fakeElement, handle, options},
      },
    )
    expect(fakeElement.addEventListener).toBeCalledTimes(1)
    expect(fakeElement.removeEventListener).toBeCalledTimes(0)
    rerender({
      fakeElement,
      handle,
      options: {
        ones: false,
      },
    })
    expect(fakeElement.addEventListener).toBeCalledTimes(1)
    expect(fakeElement.removeEventListener).toBeCalledTimes(0)
    rerender({
      fakeElement,
      handle,
      options: {
        ones: true,
      },
    })
    expect(fakeElement.addEventListener).toBeCalledTimes(2)
    expect(fakeElement.removeEventListener).toBeCalledTimes(1)
    rerender({
      fakeElement,
      handle: handle2,
      options: {
        ones: true,
      },
    })
    expect(fakeElement.addEventListener).toBeCalledTimes(2)
    expect(fakeElement.removeEventListener).toBeCalledTimes(1)
  })
})
