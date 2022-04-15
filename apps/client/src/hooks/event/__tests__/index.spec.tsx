import {fireEvent, render, screen} from '@testing-library/react'
import {renderHook} from '@testing-library/react-hooks'
import {useEvent} from '../'
import React, {useState} from 'react'
describe('event', () => {
  it('should call handle', async () => {
    const Component = () => {
      const [state, setState] = useState(0)
      const onClick = () => {
        setState((value) => value + 1)
      }
      const clickRef = useEvent('click', onClick)
      return (
        <div>
          <div data-testid="state">{state}</div>
          <button ref={clickRef} type="button">click</button>
        </div>
      )
    }

    await render(<Component />)
    expect(screen.getByTestId('state').textContent).toBe('0')
    fireEvent.click(screen.getByText('click'))
    expect(screen.getByTestId('state').textContent).toBe('1')
    fireEvent.click(screen.getByText('click'))
    expect(screen.getByTestId('state').textContent).toBe('2')
  })
  it('should call removeEventListener before delete a component or changing a ref', async () => {
    const fakeElement = {
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
    }
    const fakeElement2 = {
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
    }
    const handle = jest.fn()

    const {result, rerender, unmount} = renderHook(() => ({
      ref: useEvent('click', handle),
    }))
    result.current.ref.current = fakeElement
    rerender()
    expect(fakeElement.addEventListener).toBeCalledTimes(1)
    expect(fakeElement.removeEventListener).toBeCalledTimes(0)
    rerender()
    expect(fakeElement.addEventListener).toBeCalledTimes(1)
    expect(fakeElement.removeEventListener).toBeCalledTimes(0)
    result.current.ref.current = fakeElement2
    rerender()
    expect(fakeElement.removeEventListener).toBeCalledTimes(1)
    expect(fakeElement2.addEventListener).toBeCalledTimes(1)
    expect(fakeElement2.removeEventListener).toBeCalledTimes(0)
    unmount()
    expect(fakeElement2.addEventListener).toBeCalledTimes(1)
    expect(fakeElement2.removeEventListener).toBeCalledTimes(1)
  })
  it('should call addEventListener and removeEventListener after changing options or handle', () => {
    const fakeElement = {
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
    }
    const handle = jest.fn()
    const handle2 = jest.fn()
    const options = {
      ones: false,
    }
    const {result, rerender} = renderHook((props) => ({
      ref: useEvent('click', props.handle, props.options),
    }), {
      initialProps: {handle, options},
    })
    result.current.ref.current = fakeElement
    rerender()
    expect(fakeElement.addEventListener).toBeCalledTimes(1)
    expect(fakeElement.removeEventListener).toBeCalledTimes(0)
    rerender({
      handle,
      options: {
        ones: false,
      },
    })
    expect(fakeElement.addEventListener).toBeCalledTimes(1)
    expect(fakeElement.removeEventListener).toBeCalledTimes(0)
    rerender({
      handle,
      options: {
        ones: true,
      },
    })
    expect(fakeElement.addEventListener).toBeCalledTimes(2)
    expect(fakeElement.removeEventListener).toBeCalledTimes(1)
    rerender({
      handle: handle2,
      options: {
        ones: true,
      },
    })
    expect(fakeElement.addEventListener).toBeCalledTimes(3)
    expect(fakeElement.removeEventListener).toBeCalledTimes(2)
  })
})
