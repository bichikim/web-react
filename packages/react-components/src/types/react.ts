import {ReactElement} from 'react'
export type FunctionChildren<Args extends any[] = any[]> = (...args: Args) => ReactElement
