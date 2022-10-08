import {ReadonlySignal, Signal} from '@winter-love/signals-rebuild'

export declare type WatchSource<T = any> = Signal<T> | ReadonlySignal<T> | (() => T)

export type MultiWatchSources = (WatchSource<unknown> | object)[]

export type MapSources<T, Immediate> = {
  [K in keyof T]: T[K] extends WatchSource<infer V>
    ? Immediate extends true
      ? V | undefined
      : V
    : T[K] extends object
    ? Immediate extends true
      ? T[K] | undefined
      : T[K]
    : never
}

export type OnCleanup = (cleanupFn: () => void) => void

export interface DebuggerEvent {
  // empty
  // todo needs types
  __never__?: never
}

export interface DebuggerOptions {
  onTrack?: (event: DebuggerEvent) => void
  onTrigger?: (event: DebuggerEvent) => void
}

export type Effect = (compute: () => unknown) => () => void

export type IsInComponent = () => boolean

export type UseMemo = <T>(compute: () => T, deps: any[]) => T

export interface Ref<T> {
  current: T
}

export type UseRef = <T>(value: T) => Ref<T>
