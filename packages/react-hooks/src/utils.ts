import {DEV} from 'esm-env'

export type ToValueResult<T> = T extends (...args: any[]) => any ? ReturnType<T> : T

export type PureObject = Record<string, any>

export type MaybeFunction<T> = T | (() => T)

export const toValue = <T>(value: T, args: any[] = []): ToValueResult<T> => {
  if (typeof value === 'function') {
    return value(...args)
  }

  return value as unknown as ToValueResult<T>
}

export const getWindow = (): Window | null => {
  return window === undefined ? null : window
}

export const once = <T>(callback: () => T): (() => T) => {
  let result: T | undefined
  return () => {
    if (result) {
      return result
    }
    result = callback()
    return result
  }
}

export const isSupportPassive = once(() => {
  let supportsPassive = false
  const func = () => null
  // 특수한 확인용
  try {
    window.addEventListener(
      'test',
      func,
      Object.defineProperty({}, 'passive', {
        get: function () {
          supportsPassive = true
          return true
        },
      }),
    )
    window.removeEventListener('test', func)
  } catch {
    // skip
  }

  return supportsPassive
})

export interface Size {
  height: number
  width: number
}

export type StorageKind = 'local' | 'session'

export const parseJson = <S>(value: string, defaultValue: S): S | null => {
  if (typeof value !== 'string') {
    return defaultValue
  }
  try {
    return JSON.parse(value)
  } catch {
    return defaultValue
  }
}

export const stringifyJson = <S>(value: S, defaultJsonString: string = ''): string => {
  try {
    return JSON.stringify(value)
  } catch {
    return defaultJsonString
  }
}

export const getStorageItem = <S>(storage: StorageKind, key: string, defaultValue: S): S => {
  const window = getWindow()
  if (window === null) {
    return defaultValue
  }
  if (storage === 'local') {
    return parseJson(window.localStorage.getItem(key), defaultValue)
  }
  return parseJson(window.sessionStorage.getItem(key), defaultValue)
}

export const setStorageItem = <S>(storage: StorageKind, key: string, defaultValue: S): void => {
  const window = getWindow()
  if (window === null) {
    return
  }
  if (storage === 'local') {
    window.localStorage.setItem(key, stringifyJson(defaultValue))
  } else {
    window.sessionStorage.setItem(key, stringifyJson(defaultValue))
  }
}

export const freeze = <S>(value: S): S => {
  if (DEV) {
    return Object.freeze(value)
  }

  return value
}
