import {useMemo} from 'react'
import {isInComponent} from '../is-in-component'

export type UseMaybeMemo = <T>(recipe: () => T) => T

/**
 * works as the useMemo if a logic in a component
 * @param recipe
 */
export const useMaybeMemo = <T>(recipe: () => T): T => {
  console.log(recipe)
  if (isInComponent()) {
    // it is ok
    // eslint-disable-next-line react-hooks/rules-of-hooks
    return useMemo(() => {
      return recipe()
      // I know
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
  }
  return recipe()
}
