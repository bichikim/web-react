import {getStorageItem, setStorageItem, StorageKind} from '@web-react/utils'
import {useHandle} from 'src/use-handle'
import {useSyncedState} from 'src/use-synced-state'
import {useUpdateEffect} from 'react-use'
import {Dispatch, SetStateAction} from 'react'

export const useStorage = (
  key: string,
  storage: StorageKind = 'localStorage',
): [string | null, Dispatch<SetStateAction<string | null>>] => {
  const [value, setValue] = useSyncedState<string | null, [string, StorageKind]>(
    ([key, storage]) => getStorageItem(storage, key),
    [key, storage],
  )

  const updateValue = useHandle((value: string | null) => {
    setStorageItem(storage, key, value)
  })

  useUpdateEffect(() => {
    updateValue(value)
  }, [updateValue, value])

  return [value, setValue]
}
