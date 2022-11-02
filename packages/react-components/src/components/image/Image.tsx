import {useMemo} from 'react'
import {useHandle, useImmer} from '@winter-love/react-hooks'

export interface ImageProps {
  alt?: string
  fallbackSrc?: string
  src?: string
  width?: number
}

export interface ImageState {
  loadError: boolean
}

export const Image = (props: ImageProps & JSX.IntrinsicElements['img']) => {
  const {alt, src, fallbackSrc, width, ...rest} = props
  const [state, setState] = useImmer({
    loadError: false,
  })

  const _src = useMemo(() => {
    if (src && !state.loadError) {
      return src
    }
    return fallbackSrc
  }, [src, state, fallbackSrc])

  const handleError = useHandle(() => {
    setState((draft) => {
      draft.loadError = true
    })
  })

  return <img src={_src} alt={alt} onError={handleError} width={width} {...rest} />
}
