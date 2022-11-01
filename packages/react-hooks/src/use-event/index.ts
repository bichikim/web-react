import {isRef} from 'src/is-ref'
import {MaybeRefObject} from 'src/types'
import {useDeepEffect} from 'src/use-deep-effect'
import {useHandle} from 'src/use-handle'
import {getPassive} from './get-passive'
import {EventHandle, useEventHandle, UseEventOptions} from './use-event-handle'

export * from './use-event-handle'

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

  useDeepEffect(() => {
    currentTarget?.addEventListener?.(event, eventHandle, getPassive(options.passive))
    return () => {
      currentTarget?.removeEventListener?.(event, eventHandle)
    }
  }, [eventHandle, event, options, currentTarget])
}
