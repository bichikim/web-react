import {composeRefs, useComposeRefs} from '../index'
import {render} from '@testing-library/react'
import {useEffect, useRef} from 'react'

describe('composeRefs', () => {
  it('should pass refs', () => {
    let refA = null
    let refB = null

    const Component = () => {
      const _refA = useRef(null)
      const _refB = useRef(null)

      useEffect(() => {
        refA = _refA.current
        refB = _refB.current
      }, [])

      return <div ref={composeRefs(_refA, _refB)}></div>
    }

    render(<Component />)

    expect(refA).not.toBeNull()
    expect(refB).not.toBeNull()
  })
})

describe('useComposeRefs', () => {
  it('should pass refs', () => {
    let refA = null
    let refB = null

    const Component = () => {
      const _refA = useRef(null)
      const _refB = useRef(null)

      const ref = useComposeRefs(_refA, _refB)

      useEffect(() => {
        refA = _refA.current
        refB = _refB.current
      }, [])

      return <div ref={ref}></div>
    }

    render(<Component />)

    expect(refA).not.toBeNull()
    expect(refB).not.toBeNull()
  })
})
