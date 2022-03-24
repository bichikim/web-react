import {isPassiveEventSupported, isSSR} from 'src/utils'
import {useRef} from 'react'

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

export const withOnes = (handle: EventHandle) => {
  const active = useRef(false)
  return (event: Event) => {
    if (!active.current) {
      active.current = true
      return handle(event)
    }
  }
}

const createHandle = (handle: EventHandle, options: UseEventOptions = {}) => {
  const {
    passive = false,
    prevent = false,
    stop = false,
    ones = false,
  } = options
  let _handle = handle

  if (prevent) {
    _handle = withPrevent(_handle)
  }

  if (stop) {
    _handle = withStop(_handle)
  }

  if (ones) {
    _handle = withOnes(_handle)
  }

  return _handle
}

export type EventHandle<Event = any> = (event: Event) => unknown
export const useEvent = (
  target: any,
  event: string,
  handle: EventHandle,
  options: UseEventOptions = {},
) => {

  const handleRef = useRef()

  useEffect(() => {
    return () => {
      //
    }
  })
}
