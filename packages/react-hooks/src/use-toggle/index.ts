import {useCallback, useState} from 'react'

export type UseToggleReturn = [boolean, () => void]
export const useToggle = (initialState: boolean | (() => boolean)): UseToggleReturn => {
  const [toggle, setToggle] = useState(initialState)

  const onToggle = useCallback(() => {
    setToggle((toggle) => !toggle)
  }, [setToggle])

  return [toggle, onToggle]
}
