import {useEvent} from 'src/hooks/event'

export const Events: FC = () => {
  const [count, setCount] = useState(0)
  const eventRef = useEvent('click', () => {
    setCount(count + 1)
  })
  const eventOnesRef = useEvent('click', () => {
    setCount(count + 1)
  }, {ones: true})

  return (
    <div>
      <button ref={eventRef}>
        {count}
      </button>
      <button ref={eventOnesRef}>
        {count}
      </button>
    </div>
  )
}
