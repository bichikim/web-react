import {resolveUrl, toQueryString} from '@winter-love/utils'

export const getSizeQueryUrl = (src: string, width: number, multiply: number = 1) => {
  return resolveUrl(src, toQueryString({width: width * multiply}))
}
