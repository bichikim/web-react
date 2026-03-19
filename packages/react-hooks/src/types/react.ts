export type ReactComponent<Props extends Record<string, any>> =
  | import('react').ComponentType<Props>
  | import('react').ForwardRefExoticComponent<Props>

export type FC<Props = Record<string, any>> = import('react').FC<
  import('react').PropsWithChildren<Props>
>
export type FCC<Props = Record<string, any>> = import('react').FC<
  import('react').PropsWithChildren<Props & {className?: string}>
>
export type FFC<
  Props = Record<string, any>,
  ChildrenProps = Record<string, any>,
> = import('react').FC<Props & {children?: (props: ChildrenProps) => import('react').ReactNode}>
export type FPC<Props = Record<string, any>> = import('react').FC<Props>

export type MaybeRefObject<T> =
  | T
  | any
  | {
      readonly current?: T | null
    }
