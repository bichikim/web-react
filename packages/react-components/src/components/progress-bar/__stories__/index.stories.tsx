import {ProgressBar} from '../ProgressBar'
import {useEffect, useState} from 'react'

export default {
  component: ProgressBar,
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
      <ProgressBar
        now={now}
        total={total}
        wait={wait}
        style={{
          backgroundColor: 'white',
          height: '100%',
          transformOrigin: 'left',
          transitionTimingFunction: 'linear',
          width: '100%',
        }}
      />
    </div>
  )
}
