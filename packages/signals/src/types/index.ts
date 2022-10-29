import {ReadonlySignal, Signal} from 'signal.tmp'

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

export type EffectCallback = () => void

export type DependencyList = ReadonlyArray<unknown>

export type UseRef = <T>(value: T) => Ref<T>

export type UseEffect = (effect: EffectCallback, deps?: DependencyList) => void

export type SignalFn = <T>(value: T) => Signal<T>

export type BatchFn = <T>(callback: () => T) => T

export type Signals<T extends Record<string, any>> = {
  [K in keyof T]: Signal<T[K]>
}
