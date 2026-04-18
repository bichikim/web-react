import {useEffect, useMemo, useState} from 'react'

export interface UserInfoProps {
  age: number
  name: string
}

export const HUserInfo = ({age, name}: UserInfoProps) => {
  const [localAge, setLocalAge] = useState(age)
  const increase = () => setLocalAge((oldAge) => oldAge + 1)
  const fullInfo = useMemo(() => `${name} ${localAge}`, [localAge, name])

  useEffect(() => {
    setLocalAge(age)
  }, [age])

  return (
    <div>
      <span>{fullInfo}</span>
      <button onClick={increase}>increase</button>
    </div>
  )
}

export const UserInfo = HUserInfo
