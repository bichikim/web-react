import {UProgressBar} from '../UProgressBar'
import {useEffect, useState} from 'react'

export default {
  component: UProgressBar,
  title: 'Components/ProgressBar',
}

export const Default = () => {
  const [now, setNow] = useState(0)
  const wait = 4000
  const total = 5

  useEffect(() => {
    const cancelFlag = setInterval(() => {
      setNow((now) => {
        if (now === total) {
          return 0
        }
        return now + 1
      })
    }, wait)
    return () => {
      clearInterval(cancelFlag)
    }
  }, [])

  return (
    <div style={{backgroundColor: 'black', height: '100px', width: '500px'}}>
      <UProgressBar now={now} total={total} wait={wait} />
    </div>
  )
}
