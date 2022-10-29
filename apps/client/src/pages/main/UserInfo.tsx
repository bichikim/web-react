import {computed, deps, signals} from '@winter-love/signals/react'

export interface UserInfoProps {
  age: string
  name: string
}

export const UserInfo = (props) => {
  const {name, age} = deps(props, {write: true})

  const {fullInfo, increase} = signals(() => {
    const fullInfo = computed(() => `${name.value} ${age.value}`)

    const increase = () => (age.value += 1)

    return {
      fullInfo,
      increase,
    }
  })

  return (
    <div>
      <span>{fullInfo.value}</span>
      <button onClick={increase}>increase</button>
    </div>
  )
}
