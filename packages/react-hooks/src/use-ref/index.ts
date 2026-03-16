import {useRef as _useRef, MutableRefObject, useState} from 'react'

export const useRef = <T>(initState: T): MutableRefObject<T> => {
  return _useRef(useState(initState)[0])
}
