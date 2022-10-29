import {State, useHookstate} from '@hookstate/core'
import {useCallback} from 'react'

interface Take {
  memo?: string
  title: string
}

interface NestProps {
  state: State<Take> | Take
}

export const Nest: FC<NestProps> = (props) => {
  const state: State<Take> = useHookstate(props.state as Take)

  const handleChange = useCallback((event) => {
    // 몬가 웃김...
    state.title.set(event.target.value)
  }, [])
  return (
    <div>
      <div>{state.memo.get()}</div>
      <div>{state.title.get()}</div>
      <input onChange={handleChange} />
    </div>
  )
}

export const HookState: FC = () => {
  const state: State<Take[]> = useHookstate([
    {
      memo: 'yeah',
      title: 'foo',
    },
    {
      title: 'bar',
    },
  ] as Take[])
  const onAdd = () => {
    state.merge([
      {
        title: 'unknown',
      },
    ])
  }
  return (
    <div>
      {state.map((item, index) => (
        <Nest state={item} key={index} />
      ))}
      <Nest state={{title: 'example'}} />
      <div>{state.get().length}</div>
      <button onClick={onAdd}>add</button>
    </div>
  )
}
