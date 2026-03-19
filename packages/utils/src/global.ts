/**
 * window global 객채가 없는 경우를 생각하는 window 객체를 반환
 * @returns
 */
export const getWindow = (): Window | null => {
  return typeof window === 'undefined' ? null : window
}

export const getDocument = (): Document | null => {
  return typeof document === 'undefined' ? null : document
}

export const getHtmlElement = (): typeof HTMLElement | null => {
  return typeof HTMLElement === 'undefined' ? null : HTMLElement
}
