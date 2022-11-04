import {useRef} from 'react'
import {useElementIntersectionState} from '../'

export default {
  title: 'Use/useElementIntersectionState',
}

export const Default = () => {
  const elementRef = useRef(null)
  const state = useElementIntersectionState(elementRef)

  return (
    <div style={{height: '800px', overflowX: 'hidden', overflowY: 'scroll'}}>
      <div style={{backgroundColor: 'green', height: '1500px'}}></div>
      <div ref={elementRef} style={{height: '200px', width: '200px'}}>
        {String(state)}
      </div>
    </div>
  )
}
