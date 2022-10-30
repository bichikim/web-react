import {forwardRef, useEffect, useMemo, useRef} from 'react'
import {composeRefs} from '@winter-love/react-hooks'

export interface ProgressBarProps {
  now?: number
  total?: number
  wait?: number
}

const DEFAULT_WAIT = 4000
const DEFAULT_TOTAL = 5

const getTransform = (now, total) => `scaleX(${now / (total + 1)})`

export const ProgressBar = forwardRef(
  (props: ProgressBarProps & JSX.IntrinsicElements['div'], ref) => {
    const {wait = DEFAULT_WAIT, total = DEFAULT_TOTAL, now = 0, ...rest} = props
    const element = useRef<HTMLDivElement>(null)

    const transition = useMemo(() => {
      return `transform ${wait}ms`
    }, [wait])

    const transform = useMemo(() => getTransform(now, total), [now, total])

    useEffect(() => {
      const _element = element.current
      if (_element) {
        _element.style.transform = getTransform(now + 1, total)
      }
    }, [now, total])

    const style: any = {
      '---transform': transform,
      '---transition': transition,
    }

    return <div key={now} style={style} ref={composeRefs(element, ref)} {...rest}></div>
  },
)
