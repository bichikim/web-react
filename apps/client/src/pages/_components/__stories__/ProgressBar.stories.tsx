import {ProgressBar} from '../ProgressBar'

export default {
  component: ProgressBar,
  title: 'ProgressBar',
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

  useEffect(() => {
    if (now === 0) {
      setNow(1)
    }
  }, [now])

  return (
    <div style={{backgroundColor: 'black', height: '100px', width: '500px'}}>
      <ProgressBar now={now} total={total} wait={wait} />
    </div>
  )
}
