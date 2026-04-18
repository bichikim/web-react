import {useEffect, useLayoutEffect} from 'react'
import {useFirstMountState} from 'react-use'

export const useUpdateLayoutEffect: typeof useEffect = (effect, deps) => {
  const isFirstMount = useFirstMountState()

  useLayoutEffect(() => {
    if (!isFirstMount) {
      return effect()
    }
    // Mirror useUpdateEffect: the dependency list is only `deps` from the caller.
    // - Listing `effect` would often re-run every render (unstable function identity).
    // - Listing `isFirstMount` would re-fire after the first render and break skip-first-mount.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)
}
