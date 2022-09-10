import {useHandle} from 'src/use-handle'
import {RefObject, useEffect, useRef} from 'react'
import {Size} from 'src/utils'

export const useElementResize = (
  ref: RefObject<HTMLElement>,
  callback?: (size: Size) => any | null | undefined,
) => {
  const resizeObserver = useRef<ResizeObserver>()
  const _callback = useHandle(callback)

  useEffect(() => {
    resizeObserver.current = new ResizeObserver((entries) => {
      const {width, height} = entries[0].contentRect
      _callback({height, width})
    })

    resizeObserver.current.observe(ref.current)
    return () => resizeObserver.current.disconnect()
  }, [ref, _callback])
}
