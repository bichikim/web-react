import {DependencyList, useMemo, useRef} from 'react'

export const useCustomMemo = <T, Deps extends DependencyList>(
  factory: () => T,
  deps: Deps,
  isEqual: (deps: Deps, prevDeps: Deps) => boolean,
): T => {
  const depsRef = useRef<Deps>()

  if (!depsRef.current || !isEqual(deps, depsRef.current)) {
    depsRef.current = deps
  }

  return useMemo(factory, depsRef.current)
}
