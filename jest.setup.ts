/* eslint-disable @typescript-eslint/ban-ts-comment */
import 'jest-extended'
import '@testing-library/jest-dom'
import React, {useCallback, useRef, useState} from 'react'

globalThis.React = React
// @ts-ignore
globalThis.useState = useState
// @ts-ignore
globalThis.useRef = useRef
// @ts-ignore
globalThis.useCallback = useCallback
