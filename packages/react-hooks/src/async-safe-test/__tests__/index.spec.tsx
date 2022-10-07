import {render} from '@testing-library/react'
import {useEffect, useState} from 'react'
import flushPromises from 'flush-promises'

describe('async safe test', () => {
  it('should work', async () => {
    let _resolve: any
    const fetch = () => {
      return new Promise<string>((resolve) => {
        _resolve = resolve
      })
    }
    const Component = () => {
      const [result, setResult] = useState('')
      useEffect(() => {
        fetch().then((result) => {
          setResult(result)
        })
      }, [])

      console.log(result)
      return <div data-testid="test">{result}</div>
    }

    interface RootProps {
      show: boolean
    }

    const Root = (props: RootProps) => {
      return props.show && <Component />
    }

    const wrapper = render(<Root show={true} />)

    expect(wrapper.getByTestId('test').textContent).toBe('')

    wrapper.rerender(<Root show={false} />)

    _resolve('foo')

    await flushPromises()
  })
})
