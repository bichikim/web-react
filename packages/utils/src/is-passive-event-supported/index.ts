import {isSSR} from 'src/is-ssr'

export const createIsPassiveEventSupported = () => {
  let _passiveSupported: any = false
  // passive feature detection

  const reader = () => _passiveSupported
  try {
    if (isSSR()) {
      return reader
    }
    const object = Object.defineProperty({}, 'passive', {
      get: function () {
        _passiveSupported = true
        return null
      },
    })
    const _window: any = window
    _window.addEventListener('test', null, object)
    _window.removeEventListener('test', null, object)
  } catch {
    // skip
  }
  return reader
}

export const isPassiveEventSupported = createIsPassiveEventSupported()
