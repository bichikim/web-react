import {useMemo} from 'react'

/**
 * preact signal 을 쓰기 위한 훅
 * @param recipe
 */
export const useSignals = <T>(recipe: () => T): T => {
  return useMemo(() => {
    return recipe()
    // noop f*cking react hook
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
}
