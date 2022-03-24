import {FunctionValue} from '../function-value'
import {useSyncState} from '../sync-state'

export type UseToggleReturn = [boolean, () => unknown]
export const useToggle = (value: FunctionValue<boolean>): UseToggleReturn => {
  const [toggle, setToggle] = useSyncState(value)
  const onToggle = () => {
    setToggle(!toggle)
  }
  return [toggle, onToggle]
}
