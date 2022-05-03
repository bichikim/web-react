export interface UsePromiseAllOptions {
  onDone?: (value: any) => any
  onError?: (error: any) => any
  onNotUpdated?: () => any
  onUpdated?: () => any
}

const {is} = Object
const {isArray} = Array

const isArrayCompare = (target: any, source: any) => {
  if (isArray(target) && isArray(source)) {
    if (target.length !== source.length) {
      return false
    }
    target.every((item, index) => {
      return is(item, source[index])
    })
  }
  return is(target, source)
}

const isArrayPromise = (target: any): target is Promise<any>[] => {
  if (isArray(target)) {
    return target.every((item) => {
      return item instanceof Promise
    })
  }
  return false
}

export const usePromiseAll = (
  promises: Promise<any>[] | Promise<any>,
  options: UsePromiseAllOptions = {},
) => {
  const {
    onDone,
    onError,
    onNotUpdated,
    onUpdated,
  } = options
  const promisesRef = useRef<any>()
  if (isArrayCompare(promisesRef.current, promises)) {
    onNotUpdated?.()
  } else {
    promisesRef.current = promises
    onUpdated?.()
    if (isArrayPromise(promisesRef.current)) {
      Promise.all(promisesRef.current).then((value) => onDone?.(value)).catch((error) => onError?.(error))
    } else if (promisesRef.current instanceof Promise) {
      promisesRef.current.then((value) => onDone?.(value)).catch((error) => onError?.(error))
    }
  }
}
