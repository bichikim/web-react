import {IsInComponent, Ref, UseMemo, UseRef} from 'src/types'

export interface CreateAutoWorkParts {
  isInComponent: IsInComponent
  useMemo: UseMemo
  useRef: UseRef
}

const createFakeRef = <T>(value: T): Ref<T> => {
  return {
    current: value,
  }
}

/**
 * works as the useMemo if a logic in a component
 * @param parts
 */
export const createMaybeMemo = (parts: CreateAutoWorkParts) => {
  const {isInComponent, useMemo, useRef} = parts

  /**
   * @param deps resend (update) from component
   */
  return <T, D extends Record<string, any>>(recipe: (deps: Ref<D>) => T, deps?: D): T => {
    if (isInComponent()) {
      const depsRef = useRef(deps)
      depsRef.current = deps

      return useMemo(() => {
        return recipe(depsRef)
        // I know I know
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [])
    }
    return recipe(createFakeRef(deps))
  }
}
