import {NotFunction} from '../types'

/**
 * 상태를 patch arg 로 넘겨고 값을 얻습니다 patch 함수가 아니라면 바로 값을 반환 합니다
 * @param state
 * @param patch
 */
export const dispatchValue = <S extends NotFunction>(state: S, patch: S | ((state: S) => S)): S => {
  if (typeof patch === 'function') {
    return patch(state)
  }
  return patch
}
