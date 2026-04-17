import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react'

globalThis.React = React
// @ts-ignore
globalThis.useState = useState
// @ts-ignore
globalThis.useRef = useRef
// @ts-ignore
globalThis.useCallback = useCallback
globalThis.useMemo = useMemo
globalThis.useEffect = useEffect
