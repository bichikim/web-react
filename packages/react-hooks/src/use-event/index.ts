import {MutableRefObject, RefObject, useRef} from 'react'
import isEqual from 'react-fast-compare'
import {useCustomEffect} from 'src/use-custom-effect'
import {useCustomMemo} from 'src/use-custom-memo'
import {isPassiveEventSupported} from 'src/utils'

export interface UseEventOptions {
  immediateStop?: boolean
  ones?: boolean
  passive?: boolean
  prevent?: boolean
  stop?: boolean
}

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

const createHandle = (
  handle: EventHandle,
  active: MutableRefObject<boolean>,
  options: UseEventOptions = {},
) => {
  const {ones = false, prevent = false, stop = false, immediateStop = false} = options
  let _handle = handle

  if (prevent) {
    _handle = wrapPrevent(_handle)
  }

  if (ones) {
    _handle = wrapOnes(_handle, active)
  }

  if (stop) {
    _handle = wrapStop(_handle)
  }

  if (immediateStop) {
    _handle = wrapImmediateStop(_handle)
  }

  return _handle
}

export type EventHandle<Event = any> = (event: Event) => any

const getPassive = (value?: boolean) => {
  if (!value) {
    return
  }
  return isPassiveEventSupported() ? {passive: true} : undefined
}

export const useEvent = (
  target: RefObject<any>,
  event: string,
  handle: EventHandle,
  options: UseEventOptions = {},
) => {
  const onesRef = useRef(false)

  const eventHandle = useCustomMemo(
    () => {
      return createHandle(handle, onesRef, options)
    },
    [handle, options],
    isEqual,
  )

  useCustomEffect(
    () => {
      const currentTarget = target.current
      currentTarget?.addEventListener?.(event, eventHandle, getPassive(options.passive))
      return () => {
        currentTarget?.removeEventListener?.(event, eventHandle)
      }
    },
    [eventHandle, event, options, target.current],
    isEqual,
  )
}
