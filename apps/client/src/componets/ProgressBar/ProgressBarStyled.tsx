import {styled} from '@stitches/react'

export const ProgressBarStyled = styled('div', {
  $$color: 'white',
  $$transform: 'scaleX(0)',
  $$transition: 'scaleX 2s',
  backgroundColor: '$$color',
  height: '100%',
  transform: '$$transform',
  transformOrigin: 'left',
  transition: '$$transition',
  transitionTimingFunction: 'linear',
  width: '100%',
})
