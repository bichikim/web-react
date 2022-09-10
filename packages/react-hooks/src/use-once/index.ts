import {useState} from 'react'

export const useOnce = <T>(handle: () => T): T => {
  return useState(handle)[0]
}
