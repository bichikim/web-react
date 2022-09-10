import {FunctionValue} from 'src/utils'
import {useSyncState} from '../use-sync-state'
import {useCallback} from 'react'

export type UseToggleReturn = [boolean, () => unknown]
export const useToggle = (value: FunctionValue<boolean>): UseToggleReturn => {
  const [toggle, setToggle] = useSyncState(value)
  const onToggle = useCallback(() => {
    setToggle((toggle) => !toggle)
  }, [])
  return [toggle, onToggle]
}
