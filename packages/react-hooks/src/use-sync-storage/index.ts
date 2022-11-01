import {getStorageItem, setStorageItem, StorageKind} from '@winter-love/utils'
import {useEffect} from 'react'
import {useCount} from 'src/use-count'

export const useSyncStorage = <S>(key: string, value: S, storage: StorageKind = 'local') => {
  const _value = useCount((count) => {
    if (count === 0) {
      return getStorageItem(storage, key, value)
    }
    return value
  })

  useEffect(() => {
    setStorageItem(storage, key, _value)
  })

  return _value
}
