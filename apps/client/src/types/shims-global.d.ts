interface ImportMeta {
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
