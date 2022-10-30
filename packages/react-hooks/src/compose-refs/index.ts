import {MutableRefObject, RefCallback} from 'react'

export type Ref<T> = RefCallback<T> | MutableRefObject<T>

const setRef = <T>(ref: Ref<T> | undefined, node: T) => {
  if (typeof ref === 'function') {
    ref(node)
  } else if (ref) {
    ref.current = node
  }
}

export const composeRefs = <T>(...refs: (Ref<T> | undefined)[]) => {
  return (node: T) => refs.forEach((ref) => setRef(ref, node))
}
