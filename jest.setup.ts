/* eslint-disable @typescript-eslint/ban-ts-comment */
import 'jest-extended'
// import 'reflect-metadata'
import '@testing-library/jest-dom'
// @ts-ignore
import React, {
  useCallback,
  useContext,
  useDebugValue,
  useId,
  useReducer,
  useRef,
  useState,
} from 'react'
//
globalThis.React = React
// @ts-ignore
globalThis.useState = useState
// @ts-ignore
globalThis.useRef = useRef
// @ts-ignore
globalThis.useCallback = useCallback
// @ts-ignore
globalThis.useContext = useContext
// @ts-ignore
globalThis.useDebugValue = useDebugValue
// @ts-ignore
globalThis.useReducer = useReducer
// @ts-ignore
globalThis.useId = useId
