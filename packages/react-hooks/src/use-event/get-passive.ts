import {supportPassive} from '@web-react/utils'

export const getPassive = (value?: boolean) => {
  if (!value) {
    return
  }
  return supportPassive() ? {passive: true} : false
}
