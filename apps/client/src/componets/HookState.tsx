import {State, useState} from '@hookstate/core'

interface Take {
  memo?: string
  title: string
}

interface NestProps {
  state: State<Take> | Take
}
export const Nest: FC<NestProps> = (props) => {
  const state: State<Take> = useState(props.state as Take)
  return (
    <div>
      <div>
        {state.memo.get()}
      </div>
      <div>
        {state.title.get()}
      </div>
      <input value={state.title.get()} onChange={(event) => state.title.set(event.target.value)} />
    </div>
  )
}

export const HookState: FC = () => {
  const state: State<Take[]> = useState([
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
      {
        state.map((item) => (
          <Nest state={item} />
        ))
      }
      <Nest state={{title: 'example'}} />
      <div>{state.get().length}</div>
      <button onClick={onAdd}>add</button>
    </div>
  )
}
