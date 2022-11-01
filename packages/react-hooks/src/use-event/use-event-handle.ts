import {MutableRefObject, useRef} from 'react'
import isEqual from 'react-fast-compare'
import {useCustomMemo} from 'src/use-custom-memo'

export interface UseEventOptions {
  immediateStop?: boolean
  ones?: boolean
  passive?: boolean
  prevent?: boolean
  stop?: boolean
}

export type EventHandle<Event = any> = (event: Event) => any

export const wrapPrevent = (handle: EventHandle) => (event: Event) => {
  event?.preventDefault?.()
  return handle(event)
}

export const wrapStop = (handle: EventHandle) => (event: Event) => {
  event?.stopPropagation?.()
  return handle(event)
}

export const wrapImmediateStop = (handle: EventHandle) => (event: Event) => {
  event?.stopImmediatePropagation?.()
  return handle(event)
}

export const wrapOnes = (handle: EventHandle, active: MutableRefObject<boolean>) => {
  return (event: Event) => {
    if (!active.current) {
      active.current = true
      return handle(event)
    }
  }
}

export const useEventHandle = (handle: EventHandle, options: UseEventOptions = {}) => {
  const onesRef = useRef(false)

  return useCustomMemo(
    () => {
      let _handle = handle
      const {ones = false, prevent = false, stop = false, immediateStop = false} = options

      if (prevent) {
        _handle = wrapPrevent(_handle)
      }

      if (ones) {
        _handle = wrapOnes(_handle, onesRef)
      }

      if (stop) {
        _handle = wrapStop(_handle)
      }

      if (immediateStop) {
        _handle = wrapImmediateStop(_handle)
      }
      return _handle
    },
    [handle, options],
    isEqual,
  )
}
