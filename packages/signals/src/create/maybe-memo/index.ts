import {useMemo, useRef} from 'react.tmp'
import {isInComponent} from 'src/create/is-in-component'
import {Ref} from 'src/types'

const createFakeRef = <T>(value: T): Ref<T> => {
  return {
    current: value,
  }
}

export type UseMaybeMemo = <T, D extends Record<string, any>>(
  recipe: (deps: Ref<D>) => T,
  deps?: D,
) => T

/**
 * works as the useMemo if a logic in a component
 * @param recipe
 * @param deps
 */
export const useMaybeMemo = <T, D extends Record<string, any>>(
  recipe: (deps: Ref<D>) => T,
  deps?: D,
): T => {
  if (isInComponent()) {
    // it is ok
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const depsRef = useRef(deps)
    depsRef.current = deps

    // it is ok
    // eslint-disable-next-line react-hooks/rules-of-hooks
    return useMemo(() => {
      return recipe(depsRef)
      // I know I know
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
  }
  return recipe(createFakeRef(deps))
}
