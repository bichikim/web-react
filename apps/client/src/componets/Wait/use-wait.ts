import {RefObject} from 'react'

const {is} = Object

export interface UseWaitProps<D> {
  autoStart?: boolean
  data?: D
}

export interface UseWaitReturn<T, D> {
  promise: RefObject<null | Promise<T>>
  reload: () => any
  run: (data: D) => any
}

export const useWait = <T, D>(
  fetch: (data: D) => Promise<T>,
  options: UseWaitProps<D> = {},
): UseWaitReturn<T, D> => {
  const {autoStart = false, data} = options
  const dataRef = useRef(data)
  const fetchRef = useRef<(data?: any) => Promise<T>>()
  const promiseRef = useRef<null | Promise<any>>(null)
  if (!is(fetchRef.current, fetch)) {
    fetchRef.current = fetch
    if (autoStart) {
      promiseRef.current = fetchRef.current(dataRef.current)
    }
  }

  const run = useCallback((data?: D) => {
    if (fetchRef.current) {
      promiseRef.current = fetchRef.current(data ?? dataRef.current)
    }
  }, [])

  const reload = useCallback(() => {
    run()
  }, [])

  return {
    promise: promiseRef,
    reload,
    run,
  }
}
