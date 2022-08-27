/* eslint-disable @typescript-eslint/ban-types */
import type {PureObject} from 'src/utils'

export type ReactComponent<Props extends PureObject> =
  | import('react').ComponentType<Props>
  | import('react').ForwardRefExoticComponent<Props>

export type FC<Props = {}> = import('react').FC<import('react').PropsWithChildren<Props>>
export type FCC<Props = {}> = import('react').FC<
  import('react').PropsWithChildren<Props & {className?: string}>
>
export type FFC<Props = {}, ChildrenProps = {}> = import('react').FC<
  Props & {children?: (props: ChildrenProps) => import('react').ReactNode}
>
export type FPC<Props = {}> = import('react').FC<Props>
