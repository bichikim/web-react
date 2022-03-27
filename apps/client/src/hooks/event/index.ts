import {isPassiveEventSupported} from 'src/utils'
import {MutableRefObject, useRef} from 'react'

export interface UseEventOptions {
  immediateStop?: boolean
  ones?: boolean
  passive?: boolean
  prevent?: boolean
  stop?: boolean
}

export const withPrevent = (handle: EventHandle) => (event: Event) => {
  event?.preventDefault?.()
  return handle(event)
}

export const withStop = (handle: EventHandle) => (event: Event) => {
  event?.stopPropagation?.()
  return handle(event)
}

export const withImmediateStop = (handle: EventHandle) => (event: Event) => {
  event?.stopImmediatePropagation?.()
  return handle(event)
}

export const withOnes = (handle: EventHandle, active: MutableRefObject<boolean>) => {
  return (event: Event) => {
    if (!active.current) {
      active.current = true
      return handle(event)
    }
  }
}

const createHandle = (handle: EventHandle, active: MutableRefObject<boolean>, options: UseEventOptions = {}) => {
  const {
    ones = false,
    prevent = false,
    stop = false,
    immediateStop = false,
  } = options
  let _handle = handle

  if (prevent) {
    _handle = withPrevent(_handle)
  }

  if (ones) {
    _handle = withOnes(_handle, active)
  }

  if (stop) {
    _handle = withStop(_handle)
  }

  if (immediateStop) {
    _handle = withImmediateStop(_handle)
  }

  return _handle
}

export type EventHandle<Event = any> = (event: Event) => unknown
export const useEvent = (
  event: string,
  handle: EventHandle,
  options: UseEventOptions = {},
) => {

  const target = useRef<undefined | any>()
  const onesRef = useRef(false)

  useEffect(() => {
    const _handle = createHandle(handle, onesRef, options)
    target.current?.addEventListener?.(event, _handle, options.passive ? isPassiveEventSupported() : undefined)
    return () => {
      target.current?.removeEventListener?.(event, _handle)
    }
  })

  return target
}
