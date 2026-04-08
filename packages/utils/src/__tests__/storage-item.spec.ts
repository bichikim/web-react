import {
  getStorage,
  getStorageItem,
  getStorageItemWithObject,
  setStorageItem,
  setStorageItemWithObject,
} from '../storage-item'

describe('storage-item', () => {
  beforeEach(() => {
    localStorage.clear()
    sessionStorage.clear()
  })

  it('should return the storage instance for localStorage and sessionStorage', () => {
    expect(getStorage('localStorage')).toBe(localStorage)
    expect(getStorage('sessionStorage')).toBe(sessionStorage)
  })

  it('should persist and read string values via setStorageItem and getStorageItem', () => {
    expect(setStorageItem('localStorage', 'k', 'v')).toBe(true)
    expect(getStorageItem('localStorage', 'k')).toBe('v')
  })

  it('should remove the key when setStorageItem is called with null', () => {
    localStorage.setItem('k', 'v')
    expect(setStorageItem('localStorage', 'k', null)).toBe(true)
    expect(getStorageItem('localStorage', 'k')).toBeNull()
  })

  it('should serialize and deserialize objects via the object helpers', () => {
    const value = {name: 'bichi'}
    expect(setStorageItemWithObject('localStorage', 'obj', value)).toBe(true)
    expect(getStorageItemWithObject<typeof value>('localStorage', 'obj')).toEqual(value)
  })

  it('should return null from getStorageItemWithObject when JSON parsing fails', () => {
    localStorage.setItem('broken', '{')
    expect(getStorageItemWithObject('localStorage', 'broken')).toBeNull()
  })

  it('should return false from setStorageItemWithObject when serialization fails', () => {
    const circular: any = {}
    circular.self = circular
    expect(setStorageItemWithObject('localStorage', 'circular', circular)).toBe(false)
  })
})
