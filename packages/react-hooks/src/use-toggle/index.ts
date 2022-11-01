import {useSyncState} from '../use-sync-state'
import {RefObject, useCallback} from 'react'

export type UseToggleReturn = [RefObject<boolean>, () => void]
export const useToggle = (value: boolean): UseToggleReturn => {
  const [toggle, setToggle] = useSyncState<boolean>(value)
  const onToggle = useCallback(() => {
    setToggle((toggle) => !toggle)
  }, [setToggle])
  return [toggle, onToggle]
}
