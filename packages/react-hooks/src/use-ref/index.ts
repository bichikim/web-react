import {useRef as _useRef, MutableRefObject, useMemo} from 'react'
import {MaybeFunction, toValue} from 'src/utils'

export const useRef = <T>(initState: MaybeFunction<T>): MutableRefObject<T> => {
  return _useRef(
    useMemo(() => {
      return toValue(initState)
      // nope
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []),
  )
}
