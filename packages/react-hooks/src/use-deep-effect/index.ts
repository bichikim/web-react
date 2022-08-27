import {DependencyList, EffectCallback} from 'react'
import isEqual from 'react-fast-compare'
import {useCustomEffect} from 'src/use-custom-effect'

/**
 * useEffect 의 deps 를 deep 비교를 합니다
 * @param effect
 * @param deps
 */
export const useDeepEffect = (effect: EffectCallback, deps: DependencyList): void => {
  useCustomEffect(effect, deps, isEqual)
}
