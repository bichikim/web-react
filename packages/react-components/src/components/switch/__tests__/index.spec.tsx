import {Condition, DefaultCondition, Switch} from '../'
import {fireEvent, render} from '@testing-library/react'
import {useState} from 'react'

describe('Switch', () => {
  it('should render condition', () => {
    const Component = () => {
      const [value, setValue] = useState('foo')

      return (
        <>
          <div data-testid="value">
            <Switch value={value}>
              <Condition when={'foo'}>hi foo</Condition>
              <Condition when={'bar'}>hi bar</Condition>
              <DefaultCondition>hi default</DefaultCondition>
            </Switch>
          </div>
          <button role="button-bar" onClick={() => setValue('bar')}>
            click
          </button>
          <button role="button-john" onClick={() => setValue('john')}>
            click
          </button>
        </>
      )
    }
    const wrapper = render(<Component />)

    expect(wrapper.getByTestId('value').textContent).toBe('hi foo')

    fireEvent.click(wrapper.getByRole('button-bar'))

    expect(wrapper.getByTestId('value').textContent).toBe('hi bar')

    fireEvent.click(wrapper.getByRole('button-john'))

    expect(wrapper.getByTestId('value').textContent).toBe('hi default')
  })
})
