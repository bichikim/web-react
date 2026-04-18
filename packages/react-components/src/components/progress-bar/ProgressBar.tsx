import {
  forwardRef,
  useEffect,
  useMemo,
  useRef,
  type ComponentPropsWithoutRef,
  type CSSProperties,
} from 'react'
import {composeRefs} from '@web-react/react-hooks'

export interface ProgressBarProps {
  now?: number
  total?: number
  wait?: number
}

const DEFAULT_WAIT = 4000
const DEFAULT_TOTAL = 5

const getTransform = (now, total) => `scaleX(${now / (total + 1)})`

export const ProgressBar = forwardRef(
  (props: ProgressBarProps & ComponentPropsWithoutRef<'div'>, ref) => {
    const {wait = DEFAULT_WAIT, total = DEFAULT_TOTAL, now = 0, style: styleProp, ...rest} = props
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

    const style: CSSProperties = {
      ...styleProp,
      transform,
      transition,
    }

    return <div key={now} style={style} ref={composeRefs(element, ref)} {...rest}></div>
  },
)
