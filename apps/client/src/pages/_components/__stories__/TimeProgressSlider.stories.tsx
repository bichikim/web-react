import {TimeProgressSlider} from '../TimeProgressSlider'

export default {
  component: TimeProgressSlider,
  title: 'TimeProgressSlider',
}

export const Default = () => {
  const [now, setNow] = useState(0)
  const total = 5
  const images = [
    'https://d2pyzcqibfhr70.cloudfront.net/resource/main/banners/20220118/banner_pc.png',
    'https://d2pyzcqibfhr70.cloudfront.net/resource/main/banners/20220506/web/q8ExJJAyVDAzsrelKgTqLRfduUpK5t30iwuEDRaV.jpg',
    'https://d2pyzcqibfhr70.cloudfront.net/resource/main/banners/20220504/web/XnGvuF2RirpsSUSfbQNXF0Emr0xZfRmtD7QuJAqd.jpg',
    'https://d2pyzcqibfhr70.cloudfront.net/resource/main/banners/20220425/web/zFW9h9tsnr8elgryzlfWPQNoIeTc1fo2cNeSxKEq.jpg',
    'https://d2pyzcqibfhr70.cloudfront.net/resource/main/banners/20220502/web/8winwi4lN5gNx8YLkfvtxbEvLLCeu8aB0jdH1Lmh.jpg',
  ]

  const onChangeNow = useCallback((value: number) => {
    setNow(() => value)
  }, [])

  const next = useCallback(() => {
    setNow((value) => {
      if (value === total - 1) {
        return 0
      }
      return value + 1
    })
  }, [])

  return (
    <div style={{backgroundColor: 'white', height: '500px', width: '1000px'}}>
      <button onClick={next}>next</button>
      <TimeProgressSlider stepNow={now} stepBgImages={images} onChangeNow={onChangeNow} />
    </div>
  )
}
