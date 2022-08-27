import {styled} from '@stitches/react'
import {useSyncState} from 'src/_hooks'

export const ProgressBarStyled = styled('div', {
  $$transform: 'scaleX(0)',
  $$transition: 'scaleX 2s',
  backgroundColor: 'white',
  height: '100%',
  transform: '$$transform',
  transformOrigin: 'left',
  transition: '$$transition',
  transitionTimingFunction: 'linear',
  width: '100%',
})
export interface ProgressBarProps {
  now?: number
  total?: number
  wait?: number
}

const DEFAULT_WAIT = 4000
const DEFAULT_TOTAL = 5
const NEXT_ANIMATION_DURATION = 175

export const ProgressBar: FPC<ProgressBarProps> = (props) => {
  const [now, setNow] = useSyncState(props.now ?? 0)
  const isTransform = useRef(false)
  const {wait = DEFAULT_WAIT, total = DEFAULT_TOTAL} = props
  const transition = useMemo(() => {
    if (now === 0 || !isTransform.current) {
      return 'transform 0s'
    }
    return `transform ${wait}ms`
  }, [wait, now, isTransform.current])
  isTransform.current = true
  const transform = useMemo(() => `scaleX(${now / total})`, [now, total])

  useEffect(() => {
    const clearFlag = setTimeout(() => {
      setNow((value) => value + 1)
    }, NEXT_ANIMATION_DURATION)
    return () => {
      clearTimeout(clearFlag)
    }
  }, [props.now])

  const style: any = {
    '---transform': transform,
    '---transition': transition,
  }

  return <ProgressBarStyled key={props.now} style={style}></ProgressBarStyled>
}
