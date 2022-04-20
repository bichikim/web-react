import {memo, PropsWithChildren} from 'react'
import isEqual from 'react-fast-compare'

export const compareMemo = <P extends Record<string, any>>(
  component: (props: PropsWithChildren<P>, r: any) => JSX.Element,
) => memo<P>(component, isEqual)
