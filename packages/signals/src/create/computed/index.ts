import {WriteComputed, writeComputed} from 'src/create/write-computed'

export const computed = (<T>(compute: (() => T) | WriteComputed<T>) => {
  if (typeof compute === 'function') {
    return computed(compute)
  }
  return writeComputed(compute)
}) as any
