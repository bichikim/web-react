import {signal, signals} from '@winter-love/signals/react'
import {UserInfo} from './UserInfo'

const mainLogic = () => {
  const name = signal('foo')
  const age = signal(0)

  const increase = () => (age.value += 1)

  return {
    age,
    increase,
    name,
  }
}

export const MainPage = () => {
  const {name, age, increase} = signals(mainLogic)
  return (
    <>
      <span>{name.value}</span>
      <span>{age.value}</span>
      <button onClick={increase}>increase</button>
      <UserInfo name={name.value} age={age.value} />
    </>
  )
}
