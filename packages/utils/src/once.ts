import type {FunctionWithCancel} from './types'
import {freeze} from './freeze'

/**
 * 한번만 실행 되는 함수 입니다
 * @param callback
 * @returns T 를 리턴하는 함수
 * @returns {cancel: () => void} 저장된 리턴 값을 제거하여 다시 함수 실행이되도록 합니다
 */
export const once = <T extends (...args: any[]) => any>(callback: T): FunctionWithCancel<T> => {
  let result: any
  return freeze(
    Object.assign(
      (...args: Parameters<T>): ReturnType<T> => {
        if (result) {
          return result
        }
        result = callback(...args)
        return result
      },
      {
        cancel: () => {
          result = undefined
        },
      },
    ),
  )
}
