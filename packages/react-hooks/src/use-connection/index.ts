import {getWindow} from '@winter-love/utils'
import {RefObject, useRef} from 'react'
import {useEvent} from 'src/use-event'

export type OnOfflineHandle = (event: Event) => unknown
export type OnOnlineHandle = (event: Event) => unknown

/**
 * @param handle
 */
export const useOffline = (handle: OnOfflineHandle) => {
  const window = getWindow()
  return useEvent(window, 'offline', handle, {passive: true})
}

/**
 * @param handle
 */
export const useOnline = (handle: OnOnlineHandle) => {
  const window = getWindow()
  return useEvent(window, 'online', handle, {passive: true})
}

export const useConnection = (init: boolean): RefObject<boolean> => {
  const value = useRef(init)

  useOnline(() => {
    value.current = true
  })

  useOffline(() => {
    value.current = false
  })

  return value
}
