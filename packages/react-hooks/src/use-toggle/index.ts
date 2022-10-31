import {MaybeFunction} from 'src/utils'
import {useSyncState} from '../use-sync-state'
import {useCallback} from 'react'

export type UseToggleReturn = [boolean, () => unknown]
export const useToggle = (value: MaybeFunction<boolean>): UseToggleReturn => {
  const [toggle, setToggle] = useSyncState(value)
  const onToggle = useCallback(() => {
    setToggle((toggle) => !toggle)
  }, [setToggle])
  return [toggle, onToggle]
}
