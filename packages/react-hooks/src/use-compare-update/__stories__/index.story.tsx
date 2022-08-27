import {useMemo, useRef, useState} from 'react'
import {useCompareUpdate} from '../'

export default {
  title: 'use-fast-compare',
}

export const Default = () => {
  const [state, setState] = useState({
    foo: {
      bar: 'bar',
    },
  })

  const fastCompareCounter = useRef(0)
  const memoCounter = useRef(0)

  const changeState = () => {
    setState((state) => ({
      foo: {
        bar: `${state.foo.bar}1`,
      },
    }))
  }

  const changeNewState = () => {
    setState((state) => ({
      ...state,
    }))
  }

  const fastCompareValue = useCompareUpdate(state)
  const memoValue = useMemo(() => {
    return state
  }, [state])

  if (Object.is(fastCompareValue, state)) {
    fastCompareCounter.current += 1
  }

  if (Object.is(memoValue, state)) {
    memoCounter.current += 1
  }

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <span>{fastCompareCounter.current}</span>
      <span>{memoCounter.current}</span>
      <span>{JSON.stringify(fastCompareValue)}</span>
      <span>{JSON.stringify(memoValue)}</span>
      <button onClick={changeState}>changeState</button>
      <button onClick={changeNewState}>changeNewState</button>
    </div>
  )
}
