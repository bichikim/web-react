import {FunctionValue} from '../function-value'
import {useSyncState} from '../sync-state'
import {useCallback} from 'react'

export type UseToggleReturn = [boolean, () => unknown]
export const useToggle = (value: FunctionValue<boolean>): UseToggleReturn => {
  const [toggle, setToggle] = useSyncState(value, {
    defaultValue: false,
  })
  const onToggle = useCallback(() => {
    setToggle((toggle) => !toggle)
  }, [])
  return [toggle, onToggle]
}
