import {RefObject, useEffect} from 'react'

export type HiddenType = 'hidden' | 'collapse'

export const useShow = <RefElement>(
  ref: RefObject<RefElement>,
  value: boolean | undefined | null,
  /**
   * 어떻게 숨길지
   * @default collapse
   */
  hiddenType: HiddenType = 'collapse',
) => {
  useEffect(() => {
    const element = ref.current
    if (element instanceof HTMLElement) {
      if (value) {
        element.style.visibility = 'visible'
        return
      }
      element.style.visibility = hiddenType
    }
  }, [value, ref, hiddenType])
}
