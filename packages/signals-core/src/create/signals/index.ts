import {CreateAutoWorkParts, createMaybeMemo} from 'src/create/maybe-memo'

export type CreateSignalsParts = CreateAutoWorkParts

export type SignalsRecipe<T = any> = () => T

export const createSignals = (parts: CreateSignalsParts) => {
  const maybeMemo = createMaybeMemo(parts)

  return <T>(recipe: SignalsRecipe<T>): T => {
    return maybeMemo(() => {
      return recipe()
      // noop f*cking react hook
      // eslint-disable-next-line react-hooks/exhaustive-deps
    })
  }
}
