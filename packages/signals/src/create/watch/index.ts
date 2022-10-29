/* eslint-disable react-hooks/rules-of-hooks */
import {effect} from 'signal.tmp'
import {isSignal} from 'src/create/is-signal'
import {useMaybeMemo} from 'src/create/maybe-memo'
import {DebuggerOptions, MapSources, MultiWatchSources, OnCleanup, WatchSource} from 'src/types'

export type WatchCallback<V = any, OV = any> = (value: V, oldValue: OV, onCleanup: OnCleanup) => any

export interface WatchOptionsBase extends DebuggerOptions {
  flush?: 'pre' | 'post' | 'sync'
}

export interface WatchOptions<Immediate = boolean> extends WatchOptionsBase {
  immediate?: Immediate
}

export type WatchStopHandle = () => void

export interface Watch {
  <T extends MultiWatchSources, Immediate extends Readonly<boolean> = false>(
    sources: [...T],
    cb: WatchCallback<MapSources<T, false>, MapSources<T, Immediate>>,
    options?: WatchOptions<Immediate>,
  ): WatchStopHandle

  //
  <T extends Readonly<MultiWatchSources>, Immediate extends Readonly<boolean> = false>(
    source: T,
    cb: WatchCallback<MapSources<T, false>, MapSources<T, Immediate>>,
    options?: WatchOptions<Immediate>,
  ): WatchStopHandle

  //
  <T, Immediate extends Readonly<boolean> = false>(
    source: WatchSource<T>,
    cb: WatchCallback<T, Immediate extends true ? T | undefined : T>,
    options?: WatchOptions<Immediate>,
  ): WatchStopHandle

  //
  <T extends object, Immediate extends Readonly<boolean> = false>(
    source: T,
    cb: WatchCallback<T, Immediate extends true ? T | undefined : T>,
    options?: WatchOptions<Immediate>,
  ): WatchStopHandle
}

export const watch: Watch = (sources, callback, options: WatchOptions = {}) => {
  return useMaybeMemo(
    (depsRef) => {
      const callback = (current, old) => {
        depsRef.current.callback(current, old)
      }
      const {flush, immediate, onTrack, onTrigger} = options
      if (flush || onTrack || onTrigger) {
        console.warn('flush, deep, onTrack and onTrigger are not supported')
      }
      let old = Array.isArray(sources) ? [] : undefined
      let next = Boolean(immediate)
      const readSource = (sources) => {
        if (Array.isArray(sources)) {
          return sources.map((item) => item.value)
        }
        if (typeof sources === 'function') {
          return sources()
        }
        if (isSignal(sources)) {
          return sources.value
        }
      }
      let compute = () => {
        const _sources = readSource(sources)
        if (next) {
          callback(_sources, old)
        }
        old = _sources
        next = true
      }
      effect(() => compute())

      return () => {
        compute = () => {
          // empty
        }
      }
    },
    {callback},
  )
}
