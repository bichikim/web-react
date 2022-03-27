import {useDeepMemo} from 'src/hooks/use-deep-memo'

export const DeepMemo: FC = () => {
  const [objectState, setObjectState] = useState({
    foo: 'foo',
  })
  const name = useDeepMemo(() => {
    console.log('ran memo')
    return objectState.foo
  }, [objectState])

  const changeObject = () => {
    setObjectState({
      ...objectState,
    })
  }
  const changeName = () => {
    setObjectState({
      ...objectState,
      foo: `${objectState.foo}o`,
    })
  }

  console.log('render', objectState.foo)

  return (
    <div>
      <div>{name}</div>
      <button onClick={changeObject}>change object</button>
      <button onClick={changeName}>change name</button>
    </div>
  )
}
