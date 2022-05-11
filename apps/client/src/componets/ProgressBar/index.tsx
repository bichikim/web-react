import {useSyncState} from 'src/hooks/sync-state'
import {ProgressBarStyled} from './ProgressBarStyled'

export interface ProgressBarProps {
  now?: number
  total?: number
  wait?: number
}

const DEFAULT_WAIT = 4000
const DEFAULT_TOTAL = 5

export const ProgressBar: FPC<ProgressBarProps> = (props) => {
  const [now, setNow] = useSyncState(props.now ?? 0)
  const {wait = DEFAULT_WAIT, total = DEFAULT_TOTAL} = props

  const transition = useMemo(() => {
    return `transform ${wait}ms`
  }, [wait, now])

  const transform = useMemo(() => `scaleX(${now / (total + 1)})`, [now, total])

  useEffect(() => {
    setNow((value) => value + 1)
  }, [props.now])

  const style: any = {
    '---transform': transform,
    '---transition': transition,
  }

  return (
    <ProgressBarStyled key={props.now} style={style}>
    </ProgressBarStyled>
  )
}

