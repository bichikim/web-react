import {Dispatch, SetStateAction, useState} from 'react'
import {useUpdateLayoutEffect} from '../use-update-layout-effect'

export {useUpdateLayoutEffect} from '../use-update-layout-effect'

export const useSyncedState = <T, Deps extends any[]>(
  getState: (deps: Deps) => T,
  deps: Deps,
): [T, Dispatch<SetStateAction<T>>] => {
  const [value, setValue] = useState(() => getState(deps))

  /**
   * 처음 마운트 시에는 업데이트 하지 않고, 이후에는 업데이트 합니다.
   */
  useUpdateLayoutEffect(
    () => {
      setValue(getState(deps))
    },
    // Caller supplies the full dependency list (like useMemo); ESLint cannot verify a non-literal deps array.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    deps,
  )

  return [value, setValue]
}
