import {useUpdate} from 'react-use'
const {is} = Object

export interface UseWaitProps<D> {
  autoStart?: boolean
  data?: D
}

export interface UseWaitReturn<T, D> {
  promise: Promise<T>
  reload: () => any
  run: (data: D) => any
}

export interface ReuseAblePromise<T> {
  reject: (error: T) => any
  resolve: (value: T) => any
}

export const useWait = <T, D>(
  fetch: (data: D) => Promise<T>,
  options: UseWaitProps<D> = {},
): UseWaitReturn<T, D> => {
  const {autoStart = false, data} = options
  const update = useUpdate()
  const dataRef = useRef(data)
  const fetchRef = useRef<(data?: any) => Promise<T>>()
  const promiseRef = useRef<Promise<any>>(
    new Promise<any>(() => {
      // empty
    }),
  )

  const run = useCallback((data?: D, signal: boolean = true) => {
    promiseRef.current = new Promise((resolve, reject) => {
      if (!fetchRef.current) {
        return
      }
      if (data) {
        dataRef.current = data
      }
      fetchRef
        .current(dataRef.current)
        .then((value) => {
          resolve(value)
        })
        .catch((error) => {
          reject(error)
        })
    })

    if (signal) {
      update()
    }
  }, [])

  if (!is(fetchRef.current, fetch)) {
    fetchRef.current = fetch
    if (autoStart) {
      run(undefined, false)
    }
  }

  const reload = useCallback(() => {
    run()
  }, [])

  return {
    promise: promiseRef.current,
    reload,
    run,
  }
}
