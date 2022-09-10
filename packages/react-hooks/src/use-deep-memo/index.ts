import {DependencyList} from 'react'
import isEqual from 'react-fast-compare'
import {useCustomMemo} from '../use-custom-memo'

/**
 * deps 비교를 deep 비교를 합니다
 * @param factory
 * @param deps
 */
export const useDeepMemo = <T, Deps extends DependencyList>(factory: () => T, deps: Deps) => {
  return useCustomMemo(factory, deps, isEqual)
}
