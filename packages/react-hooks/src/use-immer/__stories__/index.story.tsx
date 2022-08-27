import {useEffect, useRef} from 'react'
import {useImmer} from '../'
export default {
  title: 'use-immer',
}

export const Default = () => {
  const [state, updateState] = useImmer({
    age: 100,
    name: 'foo',
  })

  const prevState = useRef(state)

  const updateName = () => {
    updateState((draft) => {
      draft.name = `${draft.name}1`
    })
  }

  const updateNothing = () => {
    updateState((draft) => {
      draft.name = 'foo'
    })
  }

  useEffect(() => {
    prevState.current = state
  })

  // 같을 경우 업데이트를 안한다 (그런데 바뀌고 같아도 한번은 업데이트 하는 문제가 있다)
  console.log('updated')

  return (
    <div>
      <span>{state.name}</span>
      <span>{String(Object.is(state, prevState.current))}</span>
      <button onClick={updateName}>updateName</button>
      <button onClick={updateNothing}>updateNothing</button>
    </div>
  )
}
