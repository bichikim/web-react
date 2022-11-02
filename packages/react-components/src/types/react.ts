import {ReactNode} from 'react'

export type FunctionChildren<Args extends any[] = any[]> = (...args: Args) => ReactNode

export type Children = ReactNode
