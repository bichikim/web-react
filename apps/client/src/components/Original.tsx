const Counter: FC = ({children}) => {
  return <div>{children}</div>
}

export const Original: FPC = () => {
  const [count, setCount] = useState(1)
  const [count2, setCount2] = useState(1)

  const onIncrease = () => setCount((value) => value + 1)
  const onIncrease2 = () => setCount2((value) => value + 1)

  return (
    <div>
      <div>hello</div>
      <Counter>{count}</Counter>
      <Counter>{count2}</Counter>
      <button onClick={onIncrease}>increase</button>
      <button onClick={onIncrease2}>increase2</button>
    </div>
  )
}
