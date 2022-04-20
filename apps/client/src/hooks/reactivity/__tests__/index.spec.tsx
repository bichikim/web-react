import {fireEvent, render, screen} from '@testing-library/react'
import {renderHook} from '@testing-library/react-hooks'
import {ref} from '@vue/reactivity'
import flushPromises from 'flush-promises'
import React from 'react'
import {useSetup} from '../'

describe('reactivity', () => {
  it('should react state', () => {
    const {result} = renderHook(() => {
      return useSetup(() => {
        const age = ref(0)
        const increase = () => {
          age.value += 1
        }

        return {
          age,
          increase,
        }
      })
    })

    expect(result.current.age).toBe(0)
    result.current.increase()
    expect(result.current.age).toBe(1)
  })
  it('should react state and render the state', async () => {
    const rendered = jest.fn()
    const Component = () => {
      const state = useSetup(() => {
        const age = ref(0)
        const tall = ref(0)
        const increase = () => {
          age.value += 1
        }

        const increaseTall = () => {
          tall.value += 1
        }

        return {
          age,
          increase,
          increaseTall,
          tall,
        }
      })

      rendered()

      return (
        <>
          <div data-testid="age">
            {state.age}
          </div>
          <div data-testid="tall">
            {state.tall}
          </div>
          <button
            data-testid="increase"
            onClick={state.increase}
          >increase
          </button>
          <button
            data-testid="increaseTall"
            onClick={state.increaseTall}
          >increase
          </button>
        </>
      )
    }
    await render(<Component />)

    expect(screen.getByTestId('age').textContent).toBe('0')
    expect(rendered).toBeCalledTimes(1)
    fireEvent.click(screen.getByTestId('increase'))
    await flushPromises()
    expect(rendered).toBeCalledTimes(2)
    expect(screen.getByTestId('age').textContent).toBe('1')
    fireEvent.click(screen.getByTestId('increase'))
    fireEvent.click(screen.getByTestId('increase'))
    fireEvent.click(screen.getByTestId('increaseTall'))
    await flushPromises()
    expect(rendered).toBeCalledTimes(3)
    expect(screen.getByTestId('age').textContent).toBe('3')
    expect(screen.getByTestId('tall').textContent).toBe('1')
  })
})
