import React, {useCallback, useRef, useState, useMemo, useEffect} from 'react'

globalThis.React = React
// @ts-ignore
globalThis.useState = useState
// @ts-ignore
globalThis.useRef = useRef
// @ts-ignore
globalThis.useCallback = useCallback
globalThis.useMemo = useMemo
globalThis.useEffect = useEffect
