interface ImportMeta {
  readonly hot?: ViteHotContext
  env: {
    BASE_URL: string
    MODE?: string
    SSR?: boolean
  }
}

declare const __DEV__: string | undefined

type FC<Props = {}> = import('react').FC<import('react').PropsWithChildren<Props>>
type FPC<Props = {}> = import('react').FC<Props>
type ReactNode = import('react').ReactNode

interface ViteHotContext {
  readonly data: any

  accept(): void
  accept(cb: (mod: any) => void): void
  accept(dep: string, cb: (mod: any) => void): void
  accept(deps: readonly string[], cb: (mods: any[]) => void): void

  dispose(cb: (data: any) => void): void
  decline(): void
  invalidate(): void

  // `InferCustomEventPayload` provides types for built-in Vite events
  on<T extends string>(
    event: T,
    cb: (payload: any) => void
  ): void
  send<T extends string>(event: T, data?: any): void
}
