import {RefObject} from 'react'

export const isRef = (value: any): value is RefObject<any> => {
  return typeof value === 'object' && 'current' in value && Object.keys(value).length === 1
}
