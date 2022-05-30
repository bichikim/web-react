import {useSignal} from 'src/hooks/signal'
import {usePromiseAll} from './use-promise-all'

export interface WaitNode {
  done?: ((value: any) => ReactNode) | ReactNode
  error?: ((error: any) => ReactNode) | ReactNode
  waiting?: ReactNode
}

export type WaitChildren = ((waiting: boolean, value: any, error: any) => ReactNode) | WaitNode | ReactNode

export interface WaitProps {
  children?: WaitChildren
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
  usePromiseAll(
    waitFor,
    {
      onDone: (value) => {
        valueRef.current = value
        waitRef.current = false
        errorRef.current = null
        signal()
        onDone?.(value)
      },
      onError: (error) => {
        const _error = error ?? new Error('unknown error')
        valueRef.current = null
        waitRef.current = false
        errorRef.current = _error
        signal()
        onError?.(_error)
      },
      onUpdated: () => {
        valueRef.current = null
        errorRef.current = null
        waitRef.current = true
      },
    },
  )

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
