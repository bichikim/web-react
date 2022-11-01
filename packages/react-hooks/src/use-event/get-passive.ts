import {isSupportPassive} from 'src/utils'

export const getPassive = (value?: boolean) => {
  if (!value) {
    return
  }
  return isSupportPassive() ? {passive: true} : false
}
