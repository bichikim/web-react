declare module 'react.tmp' {
  import React, * as R from 'react'
  export default React
  export type * from 'react'
  export const useMemo = R.useMemo
  export const useState = R.useState
  export const useEffect = R.useEffect
  export const useRef = R.useRef
  export const useId = R.useId
  export const useCallback = R.useCallback
  export const useEffect = R.useEffect
}

declare module 'signal.tmp' {
  export * from '@winter-love/signals-rebuild/react'
}
