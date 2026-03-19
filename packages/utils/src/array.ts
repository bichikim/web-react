import {isArray} from './validate'

export const toArray = <T>(array: T | T[]): T[] => {
  if (isArray(array)) {
    return array
  }
  return [array]
}
