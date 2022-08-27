import {css, styled} from '@stitches/react'
import {CSSTransition, SwitchTransition} from 'react-transition-group'

export const BgImageContainer = styled('div', {
  height: '100%',
  position: 'relative',
  width: '100%',
})

export const BgImageItem = styled('img', {
  height: '100%',
  left: 0,
  objectFit: 'cover',
  position: 'absolute',
  top: 0,
  width: '100%',
})

const fade = css({
  $$transition: 'opacity 1s',
  '&.enter': {
    opacity: 0,
  },
  '&.enter-active': {
    opacity: 1,
    transition: 'opacity 200ms',
  },
  '&.exit': {
    opacity: 0,
  },
  '&.exit-active': {
    opacity: 1,
    transition: 'opacity 200ms',
  },
})()

export interface BgImageProps {
  list: string[]
  showIndex: number
}

export const BgImage: FPC<BgImageProps> = (props) => {
  const {list, showIndex} = props
  const imgSrc = useMemo(() => {
    return list[showIndex]
  }, [showIndex, list])

  return (
    <BgImageContainer>
      <SwitchTransition mode="in-out">
        <CSSTransition
          key={showIndex}
          addEndListener={(node, done) => node.addEventListener('transitionend', done, false)}
          classNames={{
            enter: `${fade} enter`,
            enterActive: `${fade} enter-active`,
            exit: `${fade} exit`,
            exitActive: `${fade} exit-active`,
          }}
        >
          <BgImageItem className={fade} src={imgSrc} alt={`background-image-${showIndex}`} />
        </CSSTransition>
      </SwitchTransition>
    </BgImageContainer>
  )
}
