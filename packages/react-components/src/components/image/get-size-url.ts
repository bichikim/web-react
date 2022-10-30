import {resolveUrl} from '@winter-love/utils'

export const getSizeUrl = (src: string, width: number, multiply: number = 1) => {
  // 0 = auto
  return resolveUrl(src, `${width * multiply}x0`)
}
