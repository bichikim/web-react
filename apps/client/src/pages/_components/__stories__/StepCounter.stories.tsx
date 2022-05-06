import {StepCounter} from '../StepCounter'

export default {
  component: StepCounter,
  title: 'StepCounter',
}

export const Default = () => {
  return (
    <div style={{backgroundColor: 'black'}}>
      <StepCounter />
    </div>
  )
}

export const Numbers = () => {
  return (
    <div style={{backgroundColor: 'black'}}>
      <StepCounter total={10} now={4} />
    </div>
  )
}
