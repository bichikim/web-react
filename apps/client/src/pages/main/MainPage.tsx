import {useState} from 'react'
import {UserInfo} from './UserInfo'

export const MainPage = () => {
  const [name] = useState('foo')
  const [age, setAge] = useState(0)
  const increase = () => setAge((oldAge) => oldAge + 1)

  return (
    <>
      <span>{name}</span>
      <span>{age}</span>
      <button onClick={increase}>increase</button>
      <UserInfo name={name} age={age} />
    </>
  )
}
