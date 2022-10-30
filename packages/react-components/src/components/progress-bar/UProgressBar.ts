import {styled} from 'src/style'
import {ProgressBar} from './ProgressBar'

export const UProgressBar = styled(ProgressBar, {
  $$color: 'white',
  $$transform: 'scaleX(0)',
  $$transition: 'transform 2000ms',
  backgroundColor: '$$color',
  height: '100%',
  transform: '$$transform',
  transformOrigin: 'left',
  transition: '$$transition',
  transitionTimingFunction: 'linear',
  width: '100%',
})
