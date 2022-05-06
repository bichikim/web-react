import {styled} from '@stitches/react'
import {StepCounter} from './StepCounter'
import {ProgressBar} from './ProgressBar'
import {BgImage} from './BgImage'
import {useSyncState} from 'src/hooks/sync-state'

export const ProgressBarContainer = styled('div', {
  backgroundColor: 'rgba(255, 255, 255, 0.4)',
  height: '2px',
  width: '300px',
})

export const Container = styled('div', {
  boxSizing: 'border-box',
  height: '100%',
  overflow: 'hidden',
  padding: '20px',
  position: 'relative',
  width: '100%',
})

export const ImageContainer = styled('div', {
  height: '100%',
  left: 0,
  position: 'absolute',
  top: 0,
  width: '100%',
})

export const ContainerInner = styled('div', {
  height: '100%',
  position: 'relative',
  width: '100%',
})

export const ProgressContainer = styled('div', {
  alignItems: 'center',
  bottom: '0',
  display: 'flex',
  flexDirection: 'row',
  gap: '20px',
  position: 'absolute',
})

export const NavContainer = styled('div', {
  bottom: 0,
  display: 'flex',
  gap: '10px',
  position: 'absolute',
  right: 0,
})

export const NavButton = styled('button', {
  backgroundColor: 'transparent',
  border: '1px solid white',
  borderRadius: '20px',
  color: 'white',
  height: '20px',
  width: '20px',
})

export interface TimeProgressSliderProps {
  onChangeNow?: (value: number) => any
  stepBgImages?: string[]
  stepNow?: number
  stepTotal?: number
  wait?: number
}

interface UseStepTimerProps {
  now?: number
  onChangeNow?: (value: number) => any
  total?: number
  wait?: number
}
const DefaultWait = 4000
const DefaultTotal = 5

const useStepTimer = (props: UseStepTimerProps) => {
  const [now, setNow] = useSyncState(props.now ?? 0)
  const [clearSignal, setClearSignal] = useState(false)
  const {total = DefaultTotal, wait = DefaultWait, onChangeNow} = props

  const _nextStep = useCallback(() => {
    setNow((now) => {
      if (now === total - 1) {
        return 0
      }
      return now + 1
    })
  }, [total])

  const prevStep = useCallback(() => {
    setNow((now) => {
      if (now === 0) {
        return total - 1
      }
      return now - 1
    })
    setClearSignal((value) => !value)
  }, [total])

  const nextStep = useCallback(() => {
    _nextStep()
    setClearSignal((value) => !value)
  }, [_nextStep])

  useEffect(() => {
    onChangeNow?.(now)
  }, [now])

  useEffect(() => {
    const cancelFlag = setInterval(_nextStep, wait)
    return () => {
      clearInterval(cancelFlag)
    }
  }, [props.now, clearSignal])

  return {
    nextStep,
    now,
    prevStep,
  }
}

export const TimeProgressSlider: FC<TimeProgressSliderProps> = (props) => {
  const {stepNow, stepTotal = DefaultTotal, wait, stepBgImages = [], onChangeNow} = props

  const {now, nextStep, prevStep} = useStepTimer({
    now: stepNow,
    onChangeNow,
    total: stepTotal,
    wait,
  })

  return (
    <Container>
      <ImageContainer>
        <BgImage list={stepBgImages} showIndex={now} />
      </ImageContainer>
      <ContainerInner>
        <NavContainer>
          <NavButton onClick={prevStep}>{'<'}</NavButton>
          <NavButton onClick={nextStep}>{'>'}</NavButton>
        </NavContainer>
        <ProgressContainer>
          <StepCounter now={now} total={stepTotal}/>
          <ProgressBarContainer>
            <ProgressBar now={now} total={stepTotal} wait={wait} />
          </ProgressBarContainer>
        </ProgressContainer>
      </ContainerInner>
    </Container>
  )
}
