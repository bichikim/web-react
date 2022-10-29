/* eslint-disable react-hooks/rules-of-hooks */
import {batch} from 'signal.tmp'
import {useMaybeMemo} from 'src/create/maybe-memo'

export type SignalsRecipe<T = any> = () => T

export const signals = <T>(recipe: SignalsRecipe<T>): T => {
  return useMaybeMemo(() => {
    return batch(() => recipe())
    // noop f*cking react hook
    // eslint-disable-next-line react-hooks/exhaustive-deps
  })
}
