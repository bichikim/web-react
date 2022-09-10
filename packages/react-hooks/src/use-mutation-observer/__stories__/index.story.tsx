import {useRef, useState} from 'react'
import {useMutationObserver} from '../'

export default {
  title: 'Hooks/useMutationObserver',
}

export const Default = () => {
  const ref = useRef(null)
  const [state, setState] = useState([])
  useMutationObserver(ref, {attributes: true}, (list) => {
    setState((state) => [
      ...state,
      ...list.map(({attributeName, type}) => ({
        attributeName,
        type,
      })),
    ])
  })
  const [color, setColor] = useState('blue')
  const updateColor = () => {
    if (color === 'blue') {
      setColor('red')
      return
    }
    setColor('blue')
  }

  return (
    <div ref={ref} style={{color: color}}>
      hello <button onClick={updateColor}>change</button>
      <div>{JSON.stringify(state)}</div>
    </div>
  )
}
