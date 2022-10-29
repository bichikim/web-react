import {MutableRefObject, useRef} from 'react'
import isEqual from 'react-fast-compare'
import {isRef} from 'src/is-ref'
import {MaybeRefObject} from 'src/types'
import {useCustomEffect} from 'src/use-custom-effect'
import {useCustomMemo} from 'src/use-custom-memo'
import {useHandle} from 'src/use-handle'
import {isSupportPassive} from 'src/utils'

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

const useEventHandle = (handle: EventHandle, options: UseEventOptions = {}) => {
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

export type EventHandle<Event = any> = (event: Event) => any

const getPassive = (value?: boolean) => {
  if (!value) {
    return
  }
  return isSupportPassive() ? {passive: true} : false
}

export const useEvent = (
  target: MaybeRefObject<HTMLElement | Window>,
  event: string,
  handle: EventHandle,
  options: UseEventOptions = {},
) => {
  const currentTarget = isRef(target) ? target.current : target
  const _handle = useHandle((event) => {
    return handle(event)
  })

  const eventHandle = useEventHandle(_handle, options)

  useCustomEffect(
    () => {
      currentTarget?.addEventListener?.(event, eventHandle, getPassive(options.passive))
      return () => {
        currentTarget?.removeEventListener?.(event, eventHandle)
      }
    },
    [eventHandle, event, options, currentTarget],
    isEqual,
  )
}
