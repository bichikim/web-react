import {getWindow} from './global'
import {parseJson, stringifyJson} from './json'

export type StorageKind = 'localStorage' | 'sessionStorage'

export const getStorage = (storage: StorageKind): Storage | null => {
  const window = getWindow()
  if (window === null) {
    return null
  }
  return window[storage] ?? null
}

export const getStorageItem = (storage: StorageKind, key: string): string | null => {
  const storageInstance = getStorage(storage)

  if (storageInstance === null) {
    return null
  }

  const item = storageInstance.getItem(key)

  return item
}

export const getStorageItemWithObject = <S>(storage: StorageKind, key: string): S | null => {
  const item = getStorageItem(storage, key)
  if (item === null) {
    return null
  }
  return parseJson<S>(item)
}

export const setStorageItem = (storage: StorageKind, key, value: string | null): boolean => {
  const storageInstance = getStorage(storage)

  if (storageInstance === null) {
    return false
  }

  if (value === null) {
    storageInstance.removeItem(key)
    return true
  }

  storageInstance.setItem(key, value)

  return true
}

export const setStorageItemWithObject = <S>(
  storage: StorageKind,
  key: string,
  value: S,
): boolean => {
  const item = stringifyJson(value)
  if (item === null) {
    return false
  }
  return setStorageItem(storage, key, item)
}
