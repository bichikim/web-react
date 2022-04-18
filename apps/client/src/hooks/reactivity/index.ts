import {effectScope, reactive} from '@vue/reactivity'
import {memo, PropsWithChildren, useEffect, useRef} from 'react'
import {watchEffect} from '@vue/runtime-core'
import {useSignal} from 'src/hooks/signal'

const {isArray} = Array
export const isObject = (value) => !isArray(value) && value !== null && typeof value === 'object'

function traverse(value: any, seen: Set<unknown> = new Set()) {
  if (!isObject(value) || seen.has(value)) {
    return value
  }

  seen.add(value)
  if (isArray(value)) {
    for (const element of value) {
      traverse(element, seen)
    }
  } else if (value instanceof Map) {
    value.forEach((_, key) => {
      // to register mutation dep for existing keys
      traverse(value.get(key), seen)
    })
  } else if (value instanceof Set) {
    value.forEach((value) => {
      traverse(value, seen)
    })
  } else {
    for (const key of Object.keys(value)) {
      traverse(value[key], seen)
    }
  }
  return value
}

export function useObserver<T>(props, fn: () => T) {
  const __props = {...props}
  const reaction = useRef<any>()
  const renderedNode = useRef<any>()
  const propsRef = useRef<any>()
  const shouldRender = useRef(false)
  if (!reaction.current) {
    const scope = effectScope()
    propsRef.current = scope.run(() => {
      const reactiveProps = reactive(__props)
      watchEffect(() => {
        traverse(reactiveProps)
        shouldRender.current = true
      })
      return reactiveProps
    })
    reaction.current = scope
  }
  const _props = propsRef.current
  Object.keys(__props).forEach((key) => {
    _props[key] = __props[key]
  })
  useEffect(() => {
    return () => {
      reaction.current.stop()
    }
  }, [])

  useEffect(() => {
    shouldRender.current = false
  })

  if (shouldRender.current) {
    renderedNode.current = fn()
  }

  return renderedNode.current
}

export const withReactivity = <P extends Record<string, any>>(
  ComponentType: (props: PropsWithChildren<P>, r: any) => () => JSX.Element,
) => {
  return memo<P>((p, r) => {
    const component = ComponentType(p, r)
    return component ? useObserver(p, component) : null
  })
}

export const useSetup = (setup: (props?: any) => Record<string, any>, props?: Record<string, any>) => {
  const stateRef = useRef<any>()
  const isStateUpdated = useRef<boolean>(false)
  const __props = props ? {...props} : {}
  const propsRef = useRef<any>()
  const scope = useRef(effectScope())
  const signal = useSignal()
  if (!stateRef.current) {
    scope.current.run(() => {
      propsRef.current = reactive(__props)
      const state = reactive(setup(propsRef.current))
      stateRef.current = state
      watchEffect(() => {
        isStateUpdated.current = true
        traverse(state)
        signal()
      })
    })
  }
  if (!isStateUpdated.current && props) {
    const _props = propsRef.current
    Object.keys(__props).forEach((key) => {
      _props[key] = __props[key]
    })
  }

  useEffect(() => {
    isStateUpdated.current = false
  })

  useEffect(() => {
    return () => {
      scope.current.stop()
    }
  }, [])

  return stateRef.current
}
