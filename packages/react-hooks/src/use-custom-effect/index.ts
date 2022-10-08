import {DependencyList, EffectCallback, useEffect, useRef} from 'react'

const {is} = Object

/**
 * useEffect 의 deps 를 커스톰 비교로직을 사용합니다
 * @param effect
 * @param deps
 * @param isEqual
 */
export const useCustomEffect = <Deps extends DependencyList>(
  effect: EffectCallback,
  deps: Deps,
  isEqual?: (deps: Deps, prevDeps: Deps) => boolean,
) => {
  const depsRef = useRef<Deps>()

  const _isEqual = isEqual ?? is

  if (!depsRef.current || !_isEqual(deps, depsRef.current)) {
    depsRef.current = deps
  }

  // eslint cannot detect deps
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(effect, depsRef.current)
}
