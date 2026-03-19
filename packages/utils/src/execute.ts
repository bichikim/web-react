import {isFunction} from './validate'

/**
 * 타입이 함수라면 함수를 실행하고 아니라면 그대로 반환
 * @param value
 * @param args
 * @returns
 */
export function executeWithAny<T, Args extends any[]>(
  value: T | ((...args: Args) => T),
  args: Args,
): T {
  if (isFunction(value)) {
    return value(...args)
  }

  return value
}
