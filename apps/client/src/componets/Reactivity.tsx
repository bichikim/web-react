import {computed, ref, toRefs} from '@vue/reactivity'
import {useSetup, withReactivity} from 'src/hooks/reactivity'

export const ReactivityItem: FC<{value: any}> = (props) => {
  const state = useSetup((props) => {
    const {value} = toRefs(props)
    const age = ref(0)
    const ageX = computed(() => {
      return age.value + (value?.value ?? 0)
    })
    const increase = () => {
      age.value += 1
    }
    return {
      age,
      ageX,
      increase,
    }
  }, props)

  return (
    <div>
      <div>{state.age}</div>
      <div>{state.ageX}</div>
      <button onClick={() => state.increase()}>increase</button>
    </div>
  )
}

export const ReactivityItem2 = withReactivity<{value: any}>((props) => {
  return () => (
    <div>
      <div>{props.value}</div>
    </div>
  )
})

export const Reactivity: FC = () => {
  const [value, setValue] = useState(0)
  const [value2, setValue2] = useState(0)
  const increase = () => {
    setValue((value) => value + 1)
  }
  const increase2 = () => {
    setValue2((value) => value + 1)
  }
  return (
    <div>
      <button onClick={increase}>increase</button>
      <button onClick={increase2}>increase2</button>
      <div>{value2}</div>
      <ReactivityItem2 value={value} />
      <ReactivityItem value={value}>
      </ReactivityItem>
    </div>
  )
}

