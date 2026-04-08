import {getDocument, getHtmlElement, getWindow} from '../global'

describe('global', () => {
  it('should return window, document, and HTMLElement in a browser environment', () => {
    expect(getWindow()).toBe(window)
    expect(getDocument()).toBe(document)
    expect(getHtmlElement()).toBe(HTMLElement)
  })
})
