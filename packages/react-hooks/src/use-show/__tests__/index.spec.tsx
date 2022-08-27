/**
 * @jest-environment jsdom
 */
import {render, screen} from '@testing-library/react'
import {useRef} from 'react'
import {HiddenType, useShow} from '../'

describe('useShow', () => {
  it('should show or hide the element', () => {
    interface ComponentProps {
      hiddenType?: HiddenType
      show: boolean
    }

    const Component = (props: ComponentProps) => {
      const ref = useRef(null)
      useShow(ref, props.show, props.hiddenType)
      return (
        <div data-testid="test" ref={ref}>
          hello
        </div>
      )
    }
    const wrapper = render(<Component show={true} />)

    expect(screen.getByTestId('test')).toHaveStyle({
      visibility: 'visible',
    })

    wrapper.rerender(<Component show={false} />)
    expect(screen.getByTestId('test')).toHaveStyle({
      visibility: 'collapse',
    })

    wrapper.rerender(<Component show={false} hiddenType={'hidden'} />)
    expect(screen.getByTestId('test')).toHaveStyle({
      visibility: 'hidden',
    })
  })
})
