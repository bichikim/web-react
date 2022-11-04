import {useState} from 'react'
import {isRef} from 'src/is-ref'
import {MaybeRefObject} from 'src/types'
import {useDeepEffect} from 'src/use-deep-effect'
import {useDeepMemo} from 'src/use-deep-memo'
import {useHandle} from 'src/use-handle'

const defaultThreshold = 0.05

export const useElementIntersection = (
  element: MaybeRefObject<HTMLElement>,
  callback?: IntersectionObserverCallback,
  options: IntersectionObserverInit = {},
) => {
  const updateState: IntersectionObserverCallback = useHandle((entries, observer) => {
    callback?.(entries, observer)
  })

  const intersectionObserver = useDeepMemo(() => {
    return new IntersectionObserver(updateState, {
      threshold: defaultThreshold,
      ...options,
    })
  }, [options])

  useDeepEffect(() => {
    const _element = isRef(element) ? element.current : element
    if (_element) {
      intersectionObserver.observe(_element)
    }
    return () => {
      intersectionObserver.disconnect()
    }
  }, [intersectionObserver, element])
}

export const useElementIntersectionState = (
  element: MaybeRefObject<HTMLElement>,
  options: IntersectionObserverInit = {},
) => {
  const [show, setShow] = useState(false)

  useElementIntersection(
    element,
    (entries) => {
      const shouldShow = entries.some((entry) => {
        return entry.intersectionRatio > defaultThreshold
      })

      setShow(() => shouldShow)
    },
    options,
  )

  return show
}
