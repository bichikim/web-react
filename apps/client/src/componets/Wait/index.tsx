import {useSignal} from 'src/hooks/signal'
const {is} = Object
export interface WaitChildren {
  done?: ((value: any) => ReactNode) | ReactNode
  error?: ((error: any) => ReactNode) | ReactNode
  waiting?: ReactNode
}

export interface WaitProps {
  children?: ((waiting: boolean, value: any, error: any) => ReactNode) | WaitChildren | ReactNode
  for: Promise<any> | any
  onDone?: (value?: any) => any
  onError?: (error: any) => any
}

// eslint-disable-next-line max-statements
export const Wait: FPC<WaitProps> = (props) => {
  const {for: waitFor, onDone, onError, children} = props
  const signal = useSignal()
  const valueRef = useRef<any>(null)
  const errorRef = useRef<any>(null)
  const waitRef = useRef(false)
  const waitForRef = useRef<any>()
  if (!is(waitForRef.current, waitFor)) {
    valueRef.current = null
    errorRef.current = null
    waitRef.current = false
    waitForRef.current = waitFor
    if (waitForRef.current instanceof Promise) {
      waitRef.current = true
      waitForRef.current.then((value) => {
        valueRef.current = value
        waitRef.current = false
        errorRef.current = null
        signal()
        onDone?.(value)
      }).catch((error) => {
        const _error = error ?? new Error('unknown error')
        valueRef.current = null
        waitRef.current = false
        errorRef.current = _error
        signal()
        onError?.(_error)
      })
    } else {
      valueRef.current = waitForRef.current
    }
  }

  if (typeof children === 'function') {
    return <>{
      children(waitRef.current, valueRef.current, errorRef.current)
    }</>
  }

  if (typeof children === 'object' && children !== null && 'done' in children) {
    if (errorRef.current) {
      if (children?.error) {
        return <>{typeof children.error === 'function' ? children.error(errorRef.current) : children.error}</>
      }
      return null
    }
    if (waitRef.current) {
      return <>{children?.waiting ?? null}</>
    }
    return <>{typeof children.done === 'function' ? children.done(valueRef.current) : children.done}</>
  }
  if (!waitRef.current) {
    return <>{children}</>
  }
  return null
}
