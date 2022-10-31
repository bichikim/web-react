import {useState} from 'react.tmp'
import {batch} from 'signal.tmp'

export const useSetup = <T>(handle: () => T): T => {
  return useState(() => batch(() => handle()))[0]
}
