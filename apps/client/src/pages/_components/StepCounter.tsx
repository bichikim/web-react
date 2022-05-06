import {styled} from '@stitches/react'

export const StepCounterContainer = styled('div', {
  color: 'white',
})

export interface StepCounterProps {
  now?: number
  total?: number
}

export const StepCounter: FPC<StepCounterProps> = (props) => {
  return (
    <StepCounterContainer>
      <span>{props.now ? props.now + 1 : 1}</span>
      <span>/</span>
      <span>{props.total ?? 0}</span>
    </StepCounterContainer>
  )
}
