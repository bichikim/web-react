import {useRef as _useRef, MutableRefObject} from 'react'
import {useOnce} from 'src/use-once'
import {MaybeFunction} from 'src/utils'

export const useRef = <T>(initState: MaybeFunction<T>): MutableRefObject<T> => {
  return _useRef(useOnce(initState))
}
