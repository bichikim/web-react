import {computed, ref} from '@vue/reactivity'
import {useSetup} from 'reactivue'

export const VuePage = (props) => {
  const setup = useSetup(() => {
    const count = ref(0)
    const increment = () => (count.value += 1)

    const decoCount = computed(() => {
      return `**${count.value}**`
    })
    return {count, decoCount, increment}
  }, props)
  return (
    <div>
      <button onClick={setup.increment}>{setup.count}</button>
      <span>{setup.decoCount}</span>
    </div>
  )
}
