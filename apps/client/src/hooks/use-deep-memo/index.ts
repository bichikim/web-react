import isEqual from 'react-fast-compare'
import {useMemo, useRef} from 'react'

export const useDeepMemo = <T>(factory: () => T, deps: Record<any, any>) => {
  const tick = useRef(false)
  const prev = useRef(deps)

  if (!isEqual(deps, prev.current)) {
    tick.current = !tick.current
    prev.current = deps
  }

  return useMemo(factory, [tick.current])
}
