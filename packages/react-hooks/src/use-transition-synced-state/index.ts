import {Dispatch, SetStateAction, useState, useTransition} from 'react'
import {useUpdateEffect} from 'react-use'

export const useTransitionSyncedState = <T, Deps extends any[]>(
  computeState: (deps: Deps) => T,
  deps: Deps,
): [T, Dispatch<SetStateAction<T>>, boolean] => {
  const [value, setValue] = useState(() => computeState(deps))
  const [isPending, startTransition] = useTransition()

  useUpdateEffect(
    () => {
      startTransition(() => {
        setValue(computeState(deps))
      })
    },
    // Caller supplies the full dependency list (like useMemo); ESLint cannot verify a non-literal deps array.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    deps,
  )

  return [value, setValue, isPending]
}
