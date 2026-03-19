import {once} from './once'

const _func = () => null

export const supportPassive = once(() => {
  let supportsPassive = false
  // 특수한 확인용
  try {
    window.addEventListener(
      'test',
      _func,
      Object.defineProperty({}, 'passive', {
        get: function () {
          supportsPassive = true
          return true
        },
      }),
    )
    window.removeEventListener('test', _func)
  } catch {
    // skip
  }

  return supportsPassive
})
