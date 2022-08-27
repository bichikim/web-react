import {effectScope, reactive, readonly, UnwrapNestedRefs} from '@vue/reactivity'
import {watch, watchEffect, WatchOptions} from '@vue/runtime-core'
import {memo, PropsWithChildren, useEffect, useRef} from 'react'
import {useUpdate} from 'react-use'

const {isArray} = Array
export const isObject = (value) => !isArray(value) && value !== null && typeof value === 'object'

export {watch, watchEffect}

export * from '@vue/reactivity'

export function traverse(value: any, seen: Set<unknown> = new Set()) {
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

export function useObserver<P extends Record<string, any>>(
  props: P,
  maybeRef: any,
  component: (props: PropsWithChildren<P>, r: any) => JSX.Element,
  watchOptions?: WatchOptions,
) {
  const __props = {...props}
  const signal = useUpdate()
  const reaction = useRef<any>()
  const renderedNode = useRef<any>()
  const propsRef = useRef<any>()
  const shouldRender = useRef(true)
  if (shouldRender.current) {
    renderedNode.current = component(props, maybeRef)
  }
  if (!reaction.current) {
    const scope = effectScope()
    propsRef.current = scope.run(() => {
      const reactiveProps = reactive(__props)
      watch(
        reactiveProps,
        () => {
          signal()
          shouldRender.current = true
        },
        {
          deep: true,
          ...watchOptions,
        },
      )
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

  return renderedNode.current
}

export const withReactivity = <P extends Record<string, any>>(
  component: (props: PropsWithChildren<P>, maybeRef: any) => JSX.Element,
  watchOptions?: WatchOptions,
) => {
  return memo<P>((props, maybeRef) => {
    return component ? useObserver(props, maybeRef, component, watchOptions) : null
  })
}

export const useSetup = <T extends Record<string, any>>(
  setup: (props?: any) => T,
  props?: Record<string, any>,
  watchOptions?: WatchOptions,
): UnwrapNestedRefs<T> => {
  const stateRef = useRef<any>()
  const isStateUpdated = useRef<boolean>(false)
  const __props = props ? {...props} : {}
  const propsRef = useRef<any>()
  const scope = useRef(effectScope())
  const signal = useUpdate()
  if (!stateRef.current) {
    scope.current.run(() => {
      propsRef.current = readonly(reactive(__props))
      const state = reactive(setup(propsRef.current))
      stateRef.current = state
      watch(
        () => Object.values(state),
        () => {
          isStateUpdated.current = true
          signal()
        },
        {
          deep: true,
          ...watchOptions,
        },
      )
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
