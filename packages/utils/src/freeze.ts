import {DEV} from 'esm-env'

/**
 * 객체를 동결하는 함수
 * DEV 환경에서만 동결
 * @param value 동결할 객체
 * @returns 동결된 객체
 */
export const freeze = <S>(value: S): S => {
  if (DEV) {
    return Object.freeze(value)
  }

  return value
}
