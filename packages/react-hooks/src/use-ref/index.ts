import {useRef as _useRef, MutableRefObject, useState} from 'react'
import {MaybeFunction} from 'src/utils'

export const useRef = <T>(initState: MaybeFunction<T>): MutableRefObject<T> => {
  return _useRef(useState(initState)[0])
}
