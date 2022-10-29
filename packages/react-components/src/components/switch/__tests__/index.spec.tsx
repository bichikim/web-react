import {Condition, Switch} from '../'
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
            </Switch>
          </div>
          <button role="button" onClick={() => setValue('bar')}>
            click
          </button>
        </>
      )
    }
    const wrapper = render(<Component />)

    expect(wrapper.getByTestId('value').textContent).toBe('hi foo')

    fireEvent.click(wrapper.getByRole('button'))

    expect(wrapper.getByTestId('value').textContent).toBe('hi bar')
  })
})
