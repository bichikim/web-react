import {useSyncState} from 'src/_hooks'

export interface SyncMeProps {
  value?: string
}

export const SyncMe = (props: SyncMeProps) => {
  const [value, setValue] = useSyncState(props.value)

  const onChange = () => {
    setValue(`${value}o`)
  }

  return (
    <div>
      <button onClick={onChange}>change</button>
      {value}
    </div>
  )
}

export const PropsSyncText = () => {
  const [value, setValue] = useState('foo')
  const onChange = () => {
    setValue(`${value}o`)
  }
  return (
    <div>
      <button onClick={onChange}>change</button>
      <SyncMe value={value} />
    </div>
  )
}
