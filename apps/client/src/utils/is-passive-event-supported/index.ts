import {isSSR} from '../is-ssr'

let _passiveSupported: any = false

// passive feature detection
try {
  if (!isSSR()) {
    // eslint-disable-next-line prefer-destructuring
    const addEventListener: any = window.addEventListener
    addEventListener('test', null, Object.defineProperty(
      {},
      'passive',
      {
        get: function () {
          _passiveSupported = {passive: true}
        },
      },
    ))
  }
} catch {
  // skip
}

export const isPassiveEventSupported = () => _passiveSupported
