import {proxy, useSnapshot} from 'valtio'
import {useState} from 'react'

export interface ValtioProps {
  count?: 0
}

const state2 = proxy({
  count: 0,
})

export const Item = () => {
  const [state] = useState(() =>
    proxy({
      count: 0,
    }),
  )

  const snap = useSnapshot(state)
  const snap2 = useSnapshot(state2)

  return (
    <div>
      {snap.count}
      {snap2.count}
      <button onClick={() => (state.count += 1)}>button</button>
      <button onClick={() => (state2.count += 1)}>button2</button>
    </div>
  )
}

export const Page = () => {
  return (
    <>
      <Item></Item>
      <Item></Item>
    </>
  )
}

export default Page
