import {NotFunction} from 'src/types'

export type FunctionValue<T extends NotFunction> = T | (() => T)

/**
 * 함수 형 값 또는 값을 값으로 반환 합니다
 * @param value
 */
export const functionValue = <T extends NotFunction>(value: FunctionValue<T>) => {
  return typeof value === 'function' ? value() : value
}
